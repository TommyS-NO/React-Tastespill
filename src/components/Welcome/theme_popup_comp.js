import React from "react";
import "./theme_popup_style.css";

function ThemePopup({ onThemeSelect }) {
  const themes = [
    { name: "Oktoberfest", style: { backgroundColor: "#ff9933" } },
    { name: "Halloween", style: { backgroundColor: "#ff5722" } },
    {
      name: "Breast Cancer Awareness Month",
      style: { backgroundColor: "#ff6699" },
    },
    { name: "Fall", style: { backgroundColor: "#ff9900" } },
  ];

  return (
    <div className="theme-popup">
      <h2>Choose a Theme</h2>
      <div className="theme-buttons">
        {themes.map((theme) => (
          <button
            key={theme.name}
            style={theme.style}
            onClick={() => onThemeSelect(theme.name)}
          >
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemePopup;
