// src/lib/inline-code.ts — curated prose may carry `backtick spans`; they
// render as <code>, everything else is escaped. Upstream documents never pass
// through here — they are rendered by plugins/pocketjs-docs.ts.

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function inlineCode(text: string): string {
  return text
    .split("`")
    .map((part, i) => (i % 2 === 1 ? `<code>${escapeHtml(part)}</code>` : escapeHtml(part)))
    .join("");
}
