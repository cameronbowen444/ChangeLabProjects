import React, { useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import {motion} from 'framer-motion'

const Modal = ({ isOpen, onClose }) => {
  const dialog = useRef(null);

  useEffect(() => {
    if (!dialog.current) return;

    if (isOpen) {
      dialog.current.showModal();

      const timer = setTimeout(() => {
        onClose();
      }, 1800);

      return () => clearTimeout(timer);
    } else if (dialog.current.open) {
      dialog.current.close();
    }
  }, [isOpen, onClose]);

  const confettiPieces = useMemo(() => {
    return Array.from({ length: 90 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 0.3,
      duration: 1.4 + Math.random() * 0.8,
      x: (Math.random() - 0.5) * 450,
      y: 220 + Math.random() * 200,
      rotate: Math.random() * 720 - 360,
      size: 6 + Math.random() * 10,
    }));
  }, [isOpen]);

  return createPortal(
    <dialog ref={dialog} className="modal" onClose={onClose}>
      <div className="modal-content">
        <div className="confetti-wrap">
          {confettiPieces.map((piece) => (
            <motion.span
              key={piece.id}
              className="confetti-piece"
              style={{ left: piece.left }}
              initial={{ y: 0, x: 0, rotate: 0, opacity: 0 }}
              animate={{
                y: piece.y,
                x: piece.x,
                rotate: piece.rotate,
                opacity: [0, 1, 1, 1, 0],
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 1, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.0, ease: "easeOut" }}
        >
          Puzzle Completed!
        </motion.h2>
      </div>
    </dialog>,
    document.getElementById("modal"),
  );
};

export default Modal;
