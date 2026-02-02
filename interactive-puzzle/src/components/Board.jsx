import React, { useState } from 'react'
import {JigsawPuzzle} from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import puzzle from '../assets/puzzle.png'
import Modal from './Modal';

const Board = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
    <Modal isOpen={isOpen} onClose={handleClose} />
    <div className='board'>
      <JigsawPuzzle
        imageSrc={puzzle}
        rows={5}
        columns={5}
        onSolved={() => setTimeout(() => {
          setIsOpen(true);
        })}
      />
    </div>
    </>
  )
}

export default Board;