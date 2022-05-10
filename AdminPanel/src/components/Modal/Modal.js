import React from "react";

import "./Modal.css";

const Modal = ({
  children,
  onCloseModal = () => {},
  displayModal = false,
  maxWidth = "480px",
}) => {
  const modifiedChild = [];
  React.Children.forEach(children, (child) => {
    modifiedChild.push(
      React.cloneElement(child, {
        onCloseModal,
      })
    );
  });

  const modalShowStyle = { display: displayModal ? "flex" : "none" };
  return (
    <div
      style={modalShowStyle}
      onClick={(e) => {
        e.stopPropagation();
        onCloseModal();
      }}
      className="modal"
    >
      <div
        style={{ maxWidth: maxWidth }}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {modifiedChild}
      </div>
    </div>
  );
};

export default Modal;
