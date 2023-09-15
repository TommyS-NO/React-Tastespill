import React from "react";
import "./header_style.css";
import "./footer_style.css";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <header className="header">
        <h1>Tastespill</h1>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <p>© 2023 Tastespill. Alle rettigheter reservert.</p>
      </footer>
    </div>
  );
};

export default Layout;
