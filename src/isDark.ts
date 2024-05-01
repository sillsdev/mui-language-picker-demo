// return true if browser is in dark mode
export const isDark = () =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;