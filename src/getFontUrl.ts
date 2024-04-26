import { getFamily, getRtl } from 'mui-language-picker';

export const getFontUrl = (fontFamily: string) => {
    const fontData = getFamily(fontFamily);
    const fontDefault =
      fontData?.defaults?.woff2 ||
      fontData?.defaults?.woff ||
      fontData?.defaults?.ttf;
    return fontDefault
      ? fontData?.files?.[fontDefault]?.flourl ??
          fontData?.files?.[fontDefault]?.url ??
          ''
      : '';
  };