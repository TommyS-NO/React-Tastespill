import React from "react";
import Layout from "./Layout/Layout";
import Main from "./containers/Main/Main";
import "./App.css";
import "./Global.css";

function App() {
  return (
    <div className="app">
      <Layout />
      <Main />
      <Layout />
    </div>
  );
}

export default App;
