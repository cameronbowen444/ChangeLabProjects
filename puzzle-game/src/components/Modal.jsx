import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose }) => {
  const dialog = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [isOpen]);

  return createPortal(
    <dialog ref={dialog} className="modal" onClose={onClose}>
      <div className="modal-content">
        <h2>You Won!</h2>
        <p>Completed Time: 0:00</p>
        <form action="dialog">
          <button onClick={onClose}>Next Puzzle</button>
        </form>
      </div>
    </dialog>,
    document.getElementById("modal"),
  );
};

export default Modal;
