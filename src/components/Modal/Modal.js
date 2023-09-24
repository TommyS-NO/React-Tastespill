import React from "react";
import "./Modal.scss";
import "./../../themes.scss";

const Modal = ({ isOpen, onClose, children, canClose = true }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay" onClick={canClose ? onClose : null}>
      <div className="modal bg-main" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
