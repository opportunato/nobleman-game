import React from 'react';

const Modal = ({ children, onClose }) => (
  <div className="xx-modal">
    <div className="xx-modal__body">
      { children }
    </div>
    <div
      className="xx-modal__overlay"
      onClick={onClose}
    />
  </div>
);

export default Modal;
