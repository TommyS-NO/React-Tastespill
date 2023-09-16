import React from "react";
import "./modal_style.css";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Lukk</button>
      </div>
    </div>
  );
}
export default Modal;