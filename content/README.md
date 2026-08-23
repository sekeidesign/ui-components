# content/

One folder per post: `content/<slug>/index.mdx`. The folder name is the URL
slug. `lib/timeline.ts` reads the frontmatter of every `index.mdx` with
gray-matter — no compilation — and that listing IS the timeline. Ordering comes
from `date`, so nothing is ordered by hand.

Adding a post: make the folder, write `index.mdx`. That's it. A bad or missing
required field fails the build with the file path, rather than silently
mis-sorting.

## Frontmatter

| Field | Required | Default | Notes |
|---|---|---|---|
| `title` | yes | — | |
| `date` | yes | — | `yyyy-mm-dd`. The sort key. |
| `kind` | yes | — | `experiment` \| `writing` \| `note` \| `launch` \| `photo` |
| `tags` | no | `[]` | Rendered as chips |
| `excerpt` | no | — | Feed copy. Notes don't use it — their body shows in full. |
| `draft` | no | `false` | Visible in dev, excluded from production |
| `hasPage` | no | `true`, or `false` for notes | Whether `/p/<slug>` exists |
| `link` | no | — | Absolute http(s) URL. Renders an outbound button. |
| `linkLabel` | no | link hostname | |
| `cover` | no | — | Path under `public/`, must start with `/` |
| `coverAspect` | no | `16 / 9` | CSS aspect-ratio |
| `sourceUrl` | no | — | "View source" link on the preview box |

Live preview fields (experiments):

| Field | Default | Notes |
|---|---|---|
| `preview` | `none` | `live` requires a `Preview.tsx` in the folder |
| `previewCost` | `light` | `light` stays mounted offscreen; `heavy` unmounts. Use `heavy` for canvas/WebGL/video or a continuously running animation. |
| `previewHeight` | `240` | Reserved px. Prevents the feed jumping when a heavy preview unmounts. |
| `previewClassName` | — | Raw Tailwind for the preview box, e.g. `p-0 items-start` |

## Kinds

- **experiment** — live demo in the feed, prose on its page. Needs `Preview.tsx`
  exporting a default component. `scripts/generate-previews.mjs` picks it up
  automatically on `pnpm dev` / `pnpm build`; run `pnpm content:sync` if you add
  one while dev is already running.
- **writing** — case studies and articles. Excerpt plus optional cover in the
  feed, full prose on its page.
- **note** — a short update. Body renders inline in the feed and it gets no page.
- **launch** — an app or project going live. Cover plus outbound link.
- **photo** — reserved.
