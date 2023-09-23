import React, { useState } from "react";
import Layout from "./Layout/Layout";
import Main from "./containers/Main/Main";
import "./App.css";
import "./Global.css";

const App = () => {
  const [view, setView] = useState("main");

  return (
    <div className="app">
      <Layout />
      <Main currentView={view} changeView={setView} />
      <Layout />
    </div>
  );
};

export default App;
