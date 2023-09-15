import React from "react";
import Layout from "./Layout/Layout";
import Main from "./components/Main/main_comp";
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
