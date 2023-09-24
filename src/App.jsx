import React, { useState } from "react";
import Layout from "./containers/Layout/Layout";
import Main from "./containers/Main/Main";

import "./global.scss";

const App = () => {
  const [view, setView] = useState("main");
  const [globalTheme, setGlobalTheme] = useState("main");

  return (
    <div className={`app bg-${globalTheme}`}>
      <Layout />
      <Main
        currentView={view}
        changeView={setView}
        setGlobalTheme={setGlobalTheme}
      />
      <Layout />
    </div>
  );
};

export default App;
