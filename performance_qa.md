# Performance QA

## Baseline

The pre-optimization production build emitted one main JavaScript bundle at 974.82 kB minified (271.58 kB gzip) and a 134.40 kB CSS bundle. The build also reported a large-chunk warning.

## Changes

Route pages are now loaded with `React.lazy` and a lightweight Suspense fallback. The global page transition no longer imports `framer-motion`; it uses a CSS transition instead, while the mobile drawer keeps CSS transitions and native pointer handlers. The unused `framer-motion` dependency was removed, React Query now avoids unnecessary focus/reconnect refetches, and below-the-fold marketing sections use `content-visibility: auto` with an intrinsic size. Vite manual chunks separate React, data, UI, icons, charts, and route code for browser caching.

## Verification build

The optimized build emits a 41.70 kB application entry, route chunks such as Home at 37.94 kB and Discovery at 26.45 kB, a 99.51 kB data vendor, a 15.71 kB icons vendor, and no motion vendor. The remaining 523.43 kB React vendor is shared runtime code. `pnpm check`, all 12 Vitest tests, and `pnpm build` passed. Desktop and 375px mobile previews for the homepage, hosting, and order routes rendered without layout regression.

Font loading is optimized with `preconnect`, a high-priority stylesheet preload, `display=swap`, and only the Cairo / Space Grotesk weights used by the CSS. The site does not use raster image assets in the marketing surface; its cloud, server, orbital, and grid visuals are CSS/SVG icon compositions, so there is no image payload to lazy-load or compress.
