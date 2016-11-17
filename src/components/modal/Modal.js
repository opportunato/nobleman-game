import React from 'react';

const Modal = ({ children }) => (
  <div className="xx-modal">
    <div className="xx-modal__body">
      { children }
    </div>
    <div className="xx-modal__overlay" />
  </div>
);

export default Modal;
