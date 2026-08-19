/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>;
  export default component;
}

declare module "virtual:pocketjs-upstream" {
  import type { UpstreamMeta } from "../plugins/pocketjs-docs";
  const meta: UpstreamMeta;
  export default meta;
}

declare module "*?doc" {
  import type { RenderedDoc } from "../plugins/pocketjs-docs";
  const doc: RenderedDoc;
  export default doc;
}

declare module "*?code" {
  import type { RenderedCode } from "../plugins/pocketjs-docs";
  const code: RenderedCode;
  export default code;
}
