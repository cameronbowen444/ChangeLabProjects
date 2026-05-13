import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const InstructionsModal = ({ isOpen, onClose }) => {
  const dialog = useRef(null);

  useEffect(() => {
    if (!dialog.current) return;

    if (isOpen) {
      dialog.current.showModal();
    } else if (dialog.current.open) {
      dialog.current.close();
    }
  }, [isOpen]);

  return createPortal(
    <dialog ref={dialog} className="instructions-modal" onClose={onClose}>
      <motion.div
        className="instructions-content"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <h2>Instructions</h2>

        <div className="instructions-text">
          <p>1. Choose a puzzle from the dropdown menu.</p>
          <p>2. Drag the pieces around the board.</p>
          <p>3. Pieces that belong together will connect and move as one group.</p>
          <p>4. Use the hint button to briefly see the full image.</p>
          <p>5. Use restart to shuffle the current puzzle again.</p>
        </div>

        <button className="instructions-close" onClick={onClose}>
          Close
        </button>
      </motion.div>
    </dialog>,
    document.getElementById("instructions")
  );
};

export default InstructionsModal;