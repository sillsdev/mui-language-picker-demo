import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {
  LanguagePicker,
  ILanguagePickerStrings,
  languagePickerStrings_en,
  LangTag,
} from "mui-language-picker";
import React from "react";

function App() {
  const [bcp47, setBcp47] = React.useState("und");
  const [lgName, setLgName] = React.useState("");
  const [fontName, setFontName] = React.useState("");

  const handleBcp47 = (bcp47: string) => {
    setBcp47(bcp47)
    console.log(`bcp47: ${bcp47}`)
  }

  const handleName = (name: string) => {
    setLgName(name)
    console.log(`name: ${name}`)
  }

  const handleFontName = (fontName: string) => {
    setFontName(fontName)
    console.log(`fontName: ${fontName}`)
  }

  const handleInfo = (tag: LangTag) => {
    console.log(`tag information: ${JSON.stringify(tag, null, 2)}`)
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <LanguagePicker
          value={bcp47}
          setCode={handleBcp47}
          name={lgName}
          setName={handleName}
          font={fontName}
          setFont={handleFontName}
          setInfo={handleInfo}
          t={languagePickerStrings_en}
        />
      </div>
    </div>
  );
}

export default App;
