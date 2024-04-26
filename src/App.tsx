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
import { Badge, Box, Grid, Link, Stack, Typography } from "@mui/material";
import { StyledTextAreaAudosize } from "./WebFontStyles";
import { getFontUrl } from "./getFontUrl";
import { version } from "../package.json";

function App() {
  const [bcp47, setBcp47] = React.useState("und");
  const [lgName, setLgName] = React.useState("");
  const [fontName, setFontName] = React.useState("");
  const [fontUrl, setFontUrl] = React.useState("");
  const [rtl, setRtl] = React.useState(false);
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

  return (
    <div className="App">
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
            <h2>mui-language-picker demo<span style={{fontWeight: 'normal', fontSize:'small'}}>: ({version})</span></h2>
            
          </Box>
          <div className="card">
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
  );
}

export default App;
