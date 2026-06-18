---
name: vite-8013-emotion-pin
description: Why vite is pinned to exactly 8.0.13 in this demo (emotion/MUI regression)
metadata:
  type: project
---

`vite` is pinned to exactly `8.0.13` (not `^`) in package.json on purpose.

**Why:** Vite 8.0.14–8.0.16 have an upstream Rolldown dep-optimizer code-splitting regression (vitejs/vite issue #22499). With MUI 7 + @emotion/react, the optimized `CssBaseline` chunk emits a call to `init_emotion_react_browser_development_esm()` without importing/defining it, crashing the dev server in the browser with `ReferenceError: init_emotion_react_browser_development_esm is not defined`. `optimizeDeps.include` of emotion does NOT fix it; downgrading to 8.0.13 does.

**How to apply:** Keep the exact pin until a Vite release > 8.0.16 ships the fix for #22499, then it can move back to a `^8.0.x` range. Verify a candidate version by clearing `node_modules/.vite`, running `npx vite optimize --force`, and confirming no chunk calls `init_emotion_react_browser_development_esm()` without defining or importing it.
