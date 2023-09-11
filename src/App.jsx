import React from "react";
import Header from "./components/Header/header_comp";
import Footer from "./components/Footer/footer_comp";
import Main from "./components/Main/main_comp";
import "./App.css";
import "./Global.css";

function App() {
  return (
    <div className="app">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
