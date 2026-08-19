// plugins/pocketjs-docs.ts — the bridge between the museum and the upstream
// PocketJS checkout in external/pocketjs.
//
// Three import forms are served, all resolved at build time so the browser
// never ships markdown-it or shiki:
//
//   import doc  from "/external/pocketjs/docs/IPHONE2G.md?doc";   // RenderedDoc
//   import code from "/external/pocketjs/apps/hero/app.tsx?code"; // RenderedCode
//   import meta from "virtual:pocketjs-upstream";                  // UpstreamMeta
//
// Markdown is parsed with markdown-it into a token stream and post-processed at
// the token level (headings → anchors/TOC, links/images → absolute upstream
// URLs, fenced code → shiki). No regular expression ever looks at the source
// text of a document: the upstream files stay the single source of truth and
// are rendered as written.

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import MarkdownIt from "markdown-it";
import type { MarkdownIt as MarkdownItInstance, RendererRule, Token } from "markdown-it";
import anchor from "markdown-it-anchor";
import container from "markdown-it-container";
import { createHighlighter, type Highlighter } from "shiki";
import type { Plugin } from "vite";

/* ------------------------------------------------------------------------ */
/* Public types (mirrored in src/data/upstream.ts for the browser side)      */
/* ------------------------------------------------------------------------ */

export interface TocEntry {
  level: 2 | 3;
  id: string;
  text: string;
}

export interface RenderedDoc {
  /** Path relative to the upstream repository root, e.g. "docs/IPHONE2G.md". */
  path: string;
  /** Text of the first H1 (or the file name when the document has none). */
  title: string;
  /** Rendered body HTML with the leading H1 removed. */
  html: string;
  toc: TocEntry[];
  /** Number of words in the rendered document (reading-time hints). */
  words: number;
  githubUrl: string;
  rawUrl: string;
  rev: string;
}

export interface RenderedCode {
  path: string;
  lang: string;
  lines: number;
  html: string;
  githubUrl: string;
  rev: string;
}

export interface UpstreamMeta {
  repo: string;
  url: string;
  rev: string;
  shortRev: string;
  /** ISO-8601 committer date of the pinned upstream commit. */
  date: string;
  subject: string;
}

export interface PocketDocsOptions {
  /** Absolute path of the upstream checkout (the git submodule). */
  upstreamDir: string;
  /** GitHub "owner/repo" used to build absolute links. */
  repo: string;
  /** Public website of the upstream project — site-absolute links resolve here. */
  siteUrl: string;
  /** Shiki theme name. */
  theme?: string;
}

/* ------------------------------------------------------------------------ */
/* Shiki                                                                     */
/* ------------------------------------------------------------------------ */

const LANGS = [
  "tsx",
  "typescript",
  "jsx",
  "javascript",
  "json",
  "jsonc",
  "bash",
  "rust",
  "c",
  "cpp",
  "cmake",
  "toml",
  "html",
  "css",
  "vue",
  "makefile",
  "yaml",
  "xml",
  "diff",
  "objective-c",
  "python",
  "swift",
  "ini",
  "asm",
  "console",
] as const;

const LANG_ALIAS: Record<string, string> = {
  ts: "typescript",
  js: "javascript",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  shellscript: "bash",
  rs: "rust",
  h: "c",
  cc: "cpp",
  "c++": "cpp",
  objc: "objective-c",
  m: "objective-c",
  mm: "objective-c",
  plist: "xml",
  yml: "yaml",
  py: "python",
  text: "text",
  txt: "text",
  plain: "text",
  plaintext: "text",
  log: "text",
  pro: "makefile",
  mk: "makefile",
  s: "asm",
};

const EXT_LANG: Record<string, string> = {
  ".tsx": "tsx",
  ".ts": "typescript",
  ".jsx": "jsx",
  ".js": "javascript",
  ".mjs": "javascript",
  ".json": "json",
  ".jsonc": "jsonc",
  ".sh": "bash",
  ".rs": "rust",
  ".c": "c",
  ".h": "c",
  ".cpp": "cpp",
  ".cc": "cpp",
  ".hpp": "cpp",
  ".m": "objective-c",
  ".toml": "toml",
  ".html": "html",
  ".css": "css",
  ".vue": "vue",
  ".yaml": "yaml",
  ".yml": "yaml",
  ".xml": "xml",
  ".plist": "xml",
  ".py": "python",
  ".swift": "swift",
  ".cmake": "cmake",
  ".ini": "ini",
  ".s": "asm",
  ".S": "asm",
  ".md": "markdown",
};

function normalizeLang(raw: string, loaded: ReadonlySet<string>): string {
  const first = raw.trim().split(/\s+/)[0]?.toLowerCase() ?? "";
  const lang = LANG_ALIAS[first] ?? first;
  return loaded.has(lang) ? lang : "text";
}

/* ------------------------------------------------------------------------ */
/* Helpers                                                                   */
/* ------------------------------------------------------------------------ */

/** GitHub-compatible heading slugs so upstream in-page anchors keep working. */
export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function readUpstreamMeta(upstreamDir: string, repo: string): UpstreamMeta {
  const git = (...args: string[]) =>
    execFileSync("git", ["-C", upstreamDir, ...args], { encoding: "utf8" }).trim();
  let rev = "unknown";
  let date = "";
  let subject = "";
  try {
    rev = git("rev-parse", "HEAD");
    date = git("log", "-1", "--format=%cI");
    subject = git("log", "-1", "--format=%s");
  } catch {
    // A checkout without git metadata (e.g. an exported tarball) still builds;
    // links then point at the default branch.
    rev = "main";
  }
  return {
    repo,
    url: `https://github.com/${repo}`,
    rev,
    shortRev: rev === "main" ? "main" : rev.slice(0, 7),
    date,
    subject,
  };
}

/** Resolve an upstream-relative link target to an absolute URL. */
function resolveUpstreamHref(opts: {
  href: string;
  docPath: string;
  repo: string;
  rev: string;
  siteUrl: string;
  asset: boolean;
}): string {
  const { href, docPath, repo, rev, siteUrl, asset } = opts;
  if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("//") || href.startsWith("#")) {
    return href; // absolute URL, protocol-relative, or in-page anchor
  }
  if (href.startsWith("/")) {
    // Site-absolute paths belong to the upstream website (docs, blog, assets).
    return new URL(href, siteUrl).toString();
  }
  const [target, hash] = href.split("#", 2);
  const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(docPath), target));
  const base = asset
    ? `https://raw.githubusercontent.com/${repo}/${rev}/${resolved}`
    : `https://github.com/${repo}/blob/${rev}/${resolved}`;
  return hash ? `${base}#${hash}` : base;
}

/* ------------------------------------------------------------------------ */
/* Markdown renderer                                                         */
/* ------------------------------------------------------------------------ */

interface RenderContext {
  docPath: string;
  toc: TocEntry[];
  title: string | null;
}

const FRAMEWORK_LABELS: Record<string, string> = {
  solid: "Solid",
  "vue-vapor": "Vue Vapor",
  "vue-sfc": "Vue SFC",
  octane: "Octane",
};

function createMarkdown(options: {
  highlighter: Highlighter;
  theme: string;
  repo: string;
  rev: string;
  siteUrl: string;
  getContext: () => RenderContext;
}): MarkdownItInstance {
  const { highlighter, theme, repo, rev, siteUrl, getContext } = options;
  const loadedLangs = new Set(highlighter.getLoadedLanguages());

  const md = new MarkdownIt({
    // Upstream reference docs are plain GFM; raw HTML is escaped on purpose so
    // placeholders such as `<name>` in prose cannot be swallowed as tags.
    html: false,
    linkify: true,
    typographer: false,
  });

  /* Headings: GitHub-style ids, collect the TOC, remember the H1. */
  md.use(anchor, {
    slugify,
    tabIndex: false,
    permalink: anchor.permalink.linkInsideHeader({
      symbol: "#",
      placement: "after",
      class: "doc-anchor",
      ariaHidden: true,
    }),
    callback(token: Token, info: { slug: string; title: string }) {
      const ctx = getContext();
      const level = Number(token.tag.slice(1));
      if (level === 1 && ctx.title === null) {
        ctx.title = info.title;
      } else if (level === 2 || level === 3) {
        ctx.toc.push({ level, id: info.slug, text: info.title });
      }
    },
  });

  /* `:::framework-code` containers (used by the upstream website docs): a
     group of fenced blocks, one per framework, rendered as CSS-only tabs. */
  md.use(container, "framework-code", {
    render(tokens: Token[], idx: number): string {
      const token = tokens[idx];
      if (token.nesting === 1) {
        const meta = (token.meta ?? {}) as { variants?: string[]; group?: string };
        const variants: string[] = meta.variants ?? [];
        const group: string = meta.group ?? "fw";
        const inputs = variants
          .map(
            (fw, i) =>
              `<input class="fw-radio" type="radio" name="${group}" id="${group}-${fw}" data-framework="${fw}"${i === 0 ? " checked" : ""}>`,
          )
          .join("");
        const tabs = variants
          .map(
            (fw) =>
              `<label class="fw-tab" for="${group}-${fw}" data-framework="${fw}">${escapeHtml(FRAMEWORK_LABELS[fw] ?? fw)}</label>`,
          )
          .join("");
        return `<div class="fw-code">${inputs}<div class="fw-tabs" role="tablist">${tabs}</div><div class="fw-panels">`;
      }
      return `</div></div>\n`;
    },
  });

  let frameworkGroup = 0;
  md.core.ruler.push("pocket_framework_code", (state) => {
    const tokens = state.tokens;
    for (let i = 0; i < tokens.length; i++) {
      const open = tokens[i];
      if (open.type !== "container_framework-code_open") continue;
      const variants: string[] = [];
      for (let j = i + 1; j < tokens.length; j++) {
        const t = tokens[j];
        if (t.type === "container_framework-code_close") break;
        if (t.type !== "fence") continue;
        const words = t.info.trim().split(/\s+/);
        const fw = words.find((w) => w in FRAMEWORK_LABELS);
        if (!fw) continue;
        t.meta = { ...((t.meta ?? {}) as Record<string, unknown>), framework: fw };
        variants.push(fw);
      }
      open.meta = { variants, group: `fw-${frameworkGroup++}` };
    }
  });

  /* Remove the leading H1: the museum renders the title itself. */
  md.core.ruler.push("pocket_strip_title", (state) => {
    const tokens = state.tokens;
    // Only the document's opening H1 is stripped; a later H1 stays in place.
    if (tokens[0]?.type !== "heading_open" || tokens[0].tag !== "h1") return;
    const close = tokens.findIndex((t) => t.type === "heading_close");
    if (close !== -1) tokens.splice(0, close + 1);
  });

  /* Links and images resolve against the upstream repository. */
  const defaultLinkOpen: RendererRule =
    md.renderer.rules.link_open ?? ((tokens, idx, opts, _env, self) => self.renderToken(tokens, idx, opts));
  md.renderer.rules.link_open = (tokens, idx, opts, env, self) => {
    const token = tokens[idx];
    const rawHref = token.attrGet("href");
    if (rawHref !== null && rawHref !== undefined) {
      const href = String(rawHref);
      const ctx = getContext();
      const abs = resolveUpstreamHref({ href, docPath: ctx.docPath, repo, rev, siteUrl, asset: false });
      token.attrSet("href", abs);
      if (!abs.startsWith("#")) {
        token.attrSet("target", "_blank");
        token.attrSet("rel", "noreferrer");
      }
    }
    return defaultLinkOpen(tokens, idx, opts, env, self);
  };

  const defaultImage: RendererRule =
    md.renderer.rules.image ?? ((tokens, idx, opts, _env, self) => self.renderToken(tokens, idx, opts));
  md.renderer.rules.image = (tokens, idx, opts, env, self) => {
    const token = tokens[idx];
    const rawSrc = token.attrGet("src");
    if (rawSrc !== null && rawSrc !== undefined) {
      const ctx = getContext();
      token.attrSet("src", resolveUpstreamHref({ href: String(rawSrc), docPath: ctx.docPath, repo, rev, siteUrl, asset: true }));
      token.attrSet("loading", "lazy");
    }
    return defaultImage(tokens, idx, opts, env, self);
  };

  /* Tables scroll inside their own box. */
  md.renderer.rules.table_open = () => '<div class="doc-table"><table>';
  md.renderer.rules.table_close = () => "</table></div>";

  /* Fenced code → shiki. */
  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx];
    const lang = normalizeLang(token.info, loadedLangs);
    const code = token.content.replace(/\n$/, "");
    const html = highlighter.codeToHtml(code, { lang, theme });
    const block = `<div class="doc-code" data-lang="${escapeHtml(lang)}">${html}</div>`;
    const fw = (token.meta as { framework?: string } | undefined)?.framework;
    return fw ? `<div class="fw-panel" data-framework="${escapeHtml(fw)}">${block}</div>\n` : `${block}\n`;
  };

  return md;
}

/* ------------------------------------------------------------------------ */
/* The Vite plugin                                                           */
/* ------------------------------------------------------------------------ */

const VIRTUAL_META = "virtual:pocketjs-upstream";
const RESOLVED_META = "\0" + VIRTUAL_META;

export function pocketjsDocs(options: PocketDocsOptions): Plugin {
  const upstreamDir = path.resolve(options.upstreamDir);
  const theme = options.theme ?? "vitesse-dark";
  const meta = readUpstreamMeta(upstreamDir, options.repo);

  let highlighter: Highlighter | null = null;
  let md: MarkdownItInstance | null = null;
  let context: RenderContext = { docPath: "", toc: [], title: null };

  async function ensureRenderer(): Promise<{ md: MarkdownItInstance; highlighter: Highlighter }> {
    if (!highlighter) {
      highlighter = await createHighlighter({ themes: [theme], langs: [...LANGS] });
    }
    if (!md) {
      md = createMarkdown({
        highlighter,
        theme,
        repo: options.repo,
        rev: meta.rev,
        siteUrl: options.siteUrl,
        getContext: () => context,
      });
    }
    return { md, highlighter };
  }

  function upstreamRelative(file: string): string | null {
    const rel = path.relative(upstreamDir, file);
    if (rel.startsWith("..") || path.isAbsolute(rel)) return null;
    return rel.split(path.sep).join("/");
  }

  function splitQuery(id: string): { file: string; query: string } {
    const q = id.indexOf("?");
    return q === -1 ? { file: id, query: "" } : { file: id.slice(0, q), query: id.slice(q + 1) };
  }

  return {
    name: "pocketjs-docs",
    enforce: "pre",

    resolveId(id) {
      if (id === VIRTUAL_META) return RESOLVED_META;
      return null;
    },

    async load(id) {
      if (id === RESOLVED_META) {
        return `export default ${JSON.stringify(meta)};`;
      }

      const { file, query } = splitQuery(id);
      const params = new URLSearchParams(query);
      const isDoc = params.has("doc");
      const isCode = params.has("code");
      if (!isDoc && !isCode) return null;

      const rel = upstreamRelative(file);
      if (!rel) {
        this.error(`pocketjs-docs: ${file} is outside the upstream checkout ${upstreamDir}`);
      }
      const source = readFileSync(file, "utf8");
      const githubUrl = `https://github.com/${options.repo}/blob/${meta.rev}/${rel}`;
      const rawUrl = `https://raw.githubusercontent.com/${options.repo}/${meta.rev}/${rel}`;
      const renderer = await ensureRenderer();

      if (isDoc) {
        context = { docPath: rel, toc: [], title: null };
        const html = renderer.md.render(source);
        const doc: RenderedDoc = {
          path: rel,
          title: context.title ?? path.basename(rel),
          html,
          toc: context.toc,
          words: source.split(/\s+/).filter(Boolean).length,
          githubUrl,
          rawUrl,
          rev: meta.rev,
        };
        return `export default ${JSON.stringify(doc)};`;
      }

      const ext = path.extname(rel);
      const requested = params.get("code");
      const loaded = new Set(renderer.highlighter.getLoadedLanguages());
      const lang = requested ? normalizeLang(requested, loaded) : normalizeLang(EXT_LANG[ext] ?? "text", loaded);
      const text = source.replace(/\n$/, "");
      const code: RenderedCode = {
        path: rel,
        lang,
        lines: text.split("\n").length,
        html: renderer.highlighter.codeToHtml(text, { lang, theme }),
        githubUrl,
        rev: meta.rev,
      };
      return `export default ${JSON.stringify(code)};`;
    },
  };
}

export default pocketjsDocs;
