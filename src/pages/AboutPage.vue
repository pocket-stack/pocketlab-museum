<script setup lang="ts">
import SectionHead from "@/components/SectionHead.vue";
import { devices } from "@/data/devices";
import { availableDocs, upstream } from "@/data/upstream";
import { isoDay } from "@/lib/format";
import { aboutSeo, usePageSeo } from "@/lib/seo";
import { SITE, devicePath } from "@/lib/site";

usePageSeo(aboutSeo(devices));

const photoCredits = devices.map((d) => ({ device: d, credit: d.hero.credit }));

const block = "border border-line-2 bg-panel px-[1.3rem] pt-5 pb-[1.3rem] [&_code]:text-[0.85em] [&_code]:text-ink";
const blockH = "mb-[0.8rem] font-mono text-[0.68rem] font-medium tracking-[0.14em] text-cyan uppercase";
const blockList = "list-disc pl-[1.1rem] text-[0.92rem] text-ink-2 marker:text-muted [&_li]:my-[0.35rem]";
const blockSrc = "mt-[0.9rem] border-t border-dashed border-line-2 pt-[0.8rem] text-[0.82rem] text-muted";
const step = "grid grid-cols-[3rem_minmax(0,1fr)] gap-4 bg-bg-2 px-[1.2rem] py-[1.1rem] [&_code]:text-[0.85em] [&_code]:text-ink [&_h3]:mb-1 [&_h3]:text-base [&_h3]:font-semibold [&_p]:text-[0.9rem] [&_p]:text-ink-2";
const stepN = "pt-[0.2rem] font-mono text-[0.8rem] text-cyan";
const th = "bg-panel px-[0.8rem] py-[0.55rem] text-left font-mono text-[0.64rem] font-medium tracking-[0.14em] text-muted uppercase border-b border-line-2";
const td = "border-t border-line px-[0.8rem] py-[0.55rem] align-top text-ink-2 [&_a]:text-ink-2 [&_a:hover]:text-cyan";
</script>

<template>
  <section class="border-b border-line pt-[clamp(2.5rem,6vw,4.5rem)] pb-[clamp(2rem,4vw,3rem)]">
    <div class="wrap">
      <span class="mlabel mb-4 block text-cyan">// about the museum</span>
      <h1 class="mb-4 max-w-[22ch] text-[clamp(2rem,5vw,3.4rem)] font-bold tracking-[-0.03em]">
        A permanent collection, kept honest by a build.
      </h1>
      <p class="max-w-[62ch] text-[1.06rem] text-ink-2 [&_a]:text-cyan [&_a:hover]:underline">
        The Pocket Museum is the catalogue of every machine
        <a :href="SITE.pocketjs.url" target="_blank" rel="noreferrer">PocketJS</a> runs on. It belongs to
        <a :href="SITE.lab.url" target="_blank" rel="noreferrer">Pocket Lab</a>, whose landing page carries a short
        version of this collection; this site is the long version, with hardware, bring-up documents and example code
        per machine.
      </p>
    </div>
  </section>

  <section class="sect" id="policy">
    <div class="wrap">
      <SectionHead index="00" title="Where the content comes from" label="two owners, one page" />
      <div class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-4">
        <div :class="block">
          <h3 :class="blockH">Curated here</h3>
          <ul :class="blockList">
            <li>Hardware specifications — processor, clock, memory, panel, storage, body, release date — with sources.</li>
            <li>Product photographs, each with author and licence (credits below).</li>
            <li>The plaque text: what the machine was and why it is in the collection.</li>
            <li>The status and execution-path labels, which follow upstream's evidence tables.</li>
          </ul>
          <p :class="blockSrc">Lives in <code>src/data/devices/*.ts</code> of the museum repository.</p>
        </div>
        <div :class="block">
          <h3 :class="blockH">Owned upstream</h3>
          <ul :class="blockList">
            <li>Toolchains, build and deploy steps, acceptance rules — the host READMEs and <code>docs/*.md</code>.</li>
            <li>Target profiles — read from <code>contracts/spec/platforms.ts</code>.</li>
            <li>Board definitions — <code>vapor/boards/*.json</code>.</li>
            <li>Blog titles and dates — <code>site/nav.ts</code>; screenshots — <code>site/assets/blog/</code>.</li>
            <li>Example code — the demo apps and runtime sources themselves.</li>
          </ul>
          <p :class="blockSrc">
            Rendered verbatim from the git submodule <code>external/pocketjs</code>, pinned at
            <a class="text-cyan hover:underline" :href="`${upstream.url}/tree/${upstream.rev}`" target="_blank" rel="noreferrer"
              ><code>{{ upstream.shortRev }}</code></a
            ><template v-if="upstream.date"> ({{ isoDay(upstream.date) }})</template>.
          </p>
        </div>
      </div>
      <p class="mt-6 max-w-[80ch] text-ink-2 [&_strong]:font-semibold [&_strong]:text-ink">
        The rule is simple: <strong>the museum never rewrites a bring-up document.</strong> Markdown is parsed into a token
        stream at build time; headings get anchors, relative links resolve to the repository at the pinned revision, code
        is highlighted — and nothing about the text changes. When a machine lacks a document upstream, its page says
        so instead of inventing one. {{ availableDocs.length }} upstream documents are in this build's render set.
      </p>
    </div>
  </section>

  <section class="sect" id="add">
    <div class="wrap">
      <SectionHead index="01" title="How to add an exhibit" label="four steps" />
      <ol class="grid gap-px border border-line-2 bg-line-2">
        <li :class="step">
          <span :class="stepN">01</span>
          <div>
            <h3>Land the bring-up upstream first</h3>
            <p>
              A host README or a <code>docs/&lt;MACHINE&gt;.md</code> in pocket-stack/pocketjs is the source of truth for
              toolchain, build, deploy and acceptance. The museum only points at it.
            </p>
          </div>
        </li>
        <li :class="step">
          <span :class="stepN">02</span>
          <div>
            <h3>Update the submodule</h3>
            <p><code>bun run upstream:update</code> moves <code>external/pocketjs</code> to the current main and stages it.</p>
          </div>
        </li>
        <li :class="step">
          <span :class="stepN">03</span>
          <div>
            <h3>Write the exhibit</h3>
            <p>
              Add <code>src/data/devices/&lt;slug&gt;.ts</code> with the hardware sheet, a freely licensed photograph
              in <code>src/assets/devices/</code>, the upstream document paths and example files, and register it in
              <code>src/data/devices.ts</code>. If a document lives in a new directory, add the glob to
              <code>src/data/upstream.ts</code>.
            </p>
          </div>
        </li>
        <li :class="step">
          <span :class="stepN">04</span>
          <div>
            <h3>Build</h3>
            <p>
              <code>bun run check</code> type-checks and prerenders every page. A missing document, a broken path or a
              wrong type fails the build rather than the visitor.
            </p>
          </div>
        </li>
      </ol>
    </div>
  </section>

  <section class="sect" id="credits">
    <div class="wrap">
      <SectionHead index="02" title="Photo credits" label="every product photograph" />
      <div class="overflow-x-auto border border-line-2 bg-bg-2">
        <table class="w-full min-w-[720px] border-collapse text-[0.84rem]">
          <thead>
            <tr>
              <th :class="th" scope="col">Exhibit</th>
              <th :class="th" scope="col">Photograph</th>
              <th :class="th" scope="col">Author</th>
              <th :class="th" scope="col">Licence</th>
              <th :class="th" scope="col">Note</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="{ device, credit } in photoCredits" :key="device.slug">
              <td :class="td"><router-link :to="devicePath(device.slug)" class="!text-cyan hover:underline">{{ device.shortName }}</router-link></td>
              <td :class="td">
                <a v-if="credit.sourceUrl" :href="credit.sourceUrl" target="_blank" rel="noreferrer">{{ credit.source }}</a>
                <template v-else>{{ credit.source }}</template>
              </td>
              <td :class="td">{{ credit.author || "—" }}</td>
              <td :class="td">
                <a v-if="credit.licenseUrl" :href="credit.licenseUrl" target="_blank" rel="noreferrer">{{ credit.license }}</a>
                <template v-else>{{ credit.license }}</template>
              </td>
              <td :class="[td, 'text-[0.78rem] !text-muted']">{{ credit.note ?? "" }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="mt-[0.9rem] text-[0.82rem] text-muted">
        Screenshots and device captures on exhibit pages come from the PocketJS repository (MIT) and are credited to
        their upstream path in place. Motion Lab studies are by yui540 and are not reproduced here.
      </p>
    </div>
  </section>

  <section class="sect border-b-0" id="colophon">
    <div class="wrap">
      <SectionHead index="03" title="Colophon" label="how it is built" />
      <dl class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] overflow-hidden border border-line-2 bg-bg-2">
        <div
          v-for="c in [
            ['Stack', 'Vue 3, Vite, vue-router and vite-ssg for static pages; Tailwind CSS v4 compiled at build time; markdown-it and shiki at build time. No runtime CSS or JS framework beyond Vue.'],
            ['Type', 'Space Grotesk for display and body, IBM Plex Mono for labels, specifications and code — the Pocket Lab pairing.'],
            ['Colour', 'Near-black navy surfaces on a 56 px bench grid; cyan for interaction, green for shipping, amber for time.'],
          ]"
          :key="c[0]"
          class="-mr-px -mb-px min-w-0 border-r border-b border-line-2 px-[1.1rem] py-4"
        >
          <dt class="mlabel">{{ c[0] }}</dt>
          <dd class="mt-1.5 text-[0.9rem] text-ink-2">{{ c[1] }}</dd>
        </div>
        <div class="-mr-px -mb-px min-w-0 border-r border-b border-line-2 px-[1.1rem] py-4">
          <dt class="mlabel">Source</dt>
          <dd class="mt-1.5 text-[0.9rem] text-ink-2 [&_code]:text-[0.85em] [&_code]:text-ink">
            <a class="text-cyan hover:underline" :href="SITE.repo.url" target="_blank" rel="noreferrer">{{ SITE.repo.name }}</a> ·
            design notes in <code>DESIGN.md</code>, working rules in <code>CLAUDE.md</code>.
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>
