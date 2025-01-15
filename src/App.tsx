import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {
  LangTag,
  LanguagePicker,
  languagePickerStrings_en,
  getLangTag,
  getRtl,
  getFamily,
} from "mui-language-picker";
import React from "react";
import {
  Badge,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { StyledTextAreaAudosize } from "./WebFontStyles";
import { getFontUrl } from "./getFontUrl";
import { version } from "../package.json";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { isDark } from "./isDark";
import MmsData from "./assets/mmsLangs";

const darkTheme = createTheme({
  palette: {
    mode: isDark() ? "dark" : "light",
  },
});

function App() {
  const [bcp47, setBcp47] = React.useState("und");
  const [lgName, setLgName] = React.useState("");
  const [fontName, setFontName] = React.useState("");
  const [fontUrl, setFontUrl] = React.useState("");
  const [rtl, setRtl] = React.useState(false);
  const mmsLang = React.useRef<Set<string>>(new Set());
  const [filtered, setFiltered] = React.useState(false);
  const [noScript, setNoScript] = React.useState(false);
  const [noFont, setNoFont] = React.useState(false);
  const [tagData, setTagData] = useState<JSX.Element | null>(null);
  const [familyData, setFamilyData] = useState<JSX.Element | null>(null);

  const handleBcp47 = (bcp47: string) => {
    setBcp47(bcp47);
    console.log(`bcp47: ${bcp47}`);
  };

  const handleName = (name: string) => {
    setLgName(name);
    console.log(`name: ${name}`);
  };

  const handleFontName = (fontName: string) => {
    setFontName(fontName);
    console.log(`fontName: ${fontName}`);
    setFamilyData(<>{JSON.stringify(getFamily(fontName), null, 2)}</>);
    const url = getFontUrl(fontName);
    console.log(`fontUrl: ${url}`);
    setFontUrl(url);
  };

  const handleRtl = (rtl: boolean) => {
    setRtl(rtl);
    console.log(`rtl: ${rtl}`);
  };

  const handleInfo = (tag: LangTag) => {
    console.log(`tag information: ${JSON.stringify(tag, null, 2)}`);
    setTagData(<>{JSON.stringify(tag, null, 2)}</>);
  };

  const displayName = (name: string, tag?: LangTag) => {
    return tag?.localname ? `${tag?.localname} / ${name}` : tag?.name || name;
  };

  const handleFilter = (code: string) => {
    const tag = getLangTag(code);
    if (['Zxxx', 'Sgnw', 'Brai'].includes(tag?.script ?? '')) return false;
    if (tag?.tag?.split('-')?.[0] === 'zh') return true;
    const iso639_3 = tag?.iso639_3;
    return mmsLang.current.has(iso639_3 ?? "und");
  };

  React.useEffect(() => {
    const tag = getLangTag(bcp47);
    console.log(`------\ntag changed: ${JSON.stringify(tag, null, 2)}`);
    console.log(`------\nrtl based on tag: ${getRtl(bcp47)}`);
  }, [bcp47]);

  React.useEffect(() => {
    const family = getFamily(fontName);
    console.log(
      `------\nfont family changed: ${JSON.stringify(family, null, 2)}`
    );
  }, [fontName]);

  React.useEffect(() => {
    mmsLang.current = new Set(
      MmsData.filter(i => i.is_mms_asr === true).map(d => d.iso)
    );
    console.log(
      `${mmsLang.current.size} unique mms asr langs loaded, ${MmsData.length} total`
    );
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App" style={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <pre>
              {lgName
                ? "Language Name: " + lgName + (rtl ? " (RTL)" : " (LTR)")
                : ""}
              <br />
              {tagData}
            </pre>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ width: "400px" }}>
              <a href="https://vitejs.dev" target="_blank">
                <img src="/vite.svg" className="logo" alt="Vite logo" />
              </a>
              <a href="https://reactjs.org" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
              <br />
              <h2>
                mui-language-picker demo
                <span style={{ fontWeight: "normal", fontSize: "small" }}>
                  : ({version})
                </span>
              </h2>
            </Box>
            <div className="card">
              <Stack>
                <LanguagePicker
                  value={bcp47}
                  setCode={handleBcp47}
                  name={lgName}
                  setName={handleName}
                  font={fontName}
                  setFont={handleFontName}
                  setDir={handleRtl}
                  setInfo={handleInfo}
                  displayName={displayName}
                  filter={filtered? handleFilter: undefined}
                  required
                  noScript={noScript}
                  noFont={noFont}
                  t={languagePickerStrings_en}
                />
                {fontName && (
                  <Stack spacing={1} sx={{ m: 2 }}>
                    <Badge
                      badgeContent={
                        <Link
                          href="https://keyman.com/"
                          target="_blank"
                          color="inherit"
                        >
                          i
                        </Link>
                      }
                      color="primary"
                      sx={{ alignSelf: "center" }}
                    >
                      <Typography variant="h6" component="span">
                        Type some text here:
                      </Typography>
                    </Badge>
                    <StyledTextAreaAudosize
                      family={fontName}
                      url={fontUrl}
                      lang={bcp47 || "und"}
                      sx={{
                        p: 1,
                        direction: rtl ? "rtl" : "ltr",
                        fontFamily: fontName,
                        fontSize: "x-large",
                      }}
                    />
                  </Stack>
                )}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filtered}
                      onChange={(_e, checked) => setFiltered(checked)}
                    />
                  }
                  label="Apply MMS filter"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={noScript}
                      onChange={(_e, checked) => setNoScript(checked)}
                    />
                  }
                  label="No script selection"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={noFont}
                      onChange={(_e, checked) => setNoFont(checked)}
                    />
                  }
                  label="No font selection"
                />
              </Stack>
            </div>
          </Grid>
          <Grid item xs={3}>
            <pre>
              {fontName ? "Font Family Name: " + fontName : ""}
              <br />
              {familyData}
            </pre>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
