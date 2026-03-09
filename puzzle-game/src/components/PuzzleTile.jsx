import React, { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { motion } from "framer-motion";
const ItemTypes = { TILE: "TILE" };

const PuzzleTile = ({
  slotIndex,
  pieceId,
  draggingSlot,
  setDraggingSlot,
  swapClusterToSlot,
  puzzle,
  boardSize,
  GRID,
  tileW,
  tileH,
  groups,
  positions,
}) => {
  const col = pieceId % GRID;
  const row = Math.floor(pieceId / GRID);
  const x = col * tileW;
  const y = row * tileH;

  const groupId = groups.groupIdOf[slotIndex];
  const groupMembers = groups.members.get(groupId) || [slotIndex];
  const inGroup = groupMembers.length > 1;

  const sameGroup = (i) => groups.groupIdOf[i] === groupId;

  const getBorders = (i) => {
    if (!inGroup)
      return { top: false, bottom: false, left: false, right: false };

    const row = Math.floor(i / GRID);
    const col = i % GRID;

    const top = row > 0 ? i - GRID : null;
    const bottom = row < GRID - 1 ? i + GRID : null;
    const left = col > 0 ? i - 1 : null;
    const right = col < GRID - 1 ? i + 1 : null;

    return {
      top: top === null || !sameGroup(top),
      bottom: bottom === null || !sameGroup(bottom),
      left: left === null || !sameGroup(left),
      right: right === null || !sameGroup(right),
    };
  };

  const borders = getBorders(slotIndex);

  // DRAG
  const [{ isDragging }, dragRef, preview] = useDrag(
    () => ({
      type: ItemTypes.TILE,
      item: () => {
        setDraggingSlot(slotIndex);
        const groupPieces = groupMembers.map((s) => ({
          slot: s,
          pieceId: positions[s],
        }));
        return {
          fromSlot: slotIndex,
          groupId,
          groupPieces, // DragLayer
          tileW,
          tileH,
          GRID,
          puzzle,
          boardSize,
        };
      },
      end: () => setDraggingSlot(null),
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [
      slotIndex,
      groupId,
      groupMembers,
      positions,
      tileW,
      tileH,
      GRID,
      puzzle,
      boardSize,
    ],
  );

  // hide the default single-tile preview
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  /// DROP
  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: ItemTypes.TILE,
      drop: (item) => {
        swapClusterToSlot(item.fromSlot, slotIndex);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
      }),
    }),
    [slotIndex, swapClusterToSlot],
  );

  const ref = (node) => dragRef(dropRef(node));

  const draggingGroupId =
    draggingSlot != null ? groups.groupIdOf[draggingSlot] : null;

  const isDraggingGroup =
    draggingGroupId != null && draggingGroupId === groupId;

  return (
    <motion.div
      ref={ref}
      className={`puzzle-piece
        ${inGroup ? "puzzle-piece-solved" : ""}
        ${isDraggingGroup ? "puzzle-piece-dragging" : ""}
        ${isOver ? "puzzle-piece-over" : ""}
      `}
      initial={false}
      animate={{
        x: Math.round((slotIndex % GRID) * tileW),
        y: Math.round(Math.floor(slotIndex / GRID) * tileH),
        scale: inGroup ? 1 : 0.93,
      }}
      transition={{
        x: { type: "spring", stiffness: 260, damping: 28, mass: 1.1 },
        y: { type: "spring", stiffness: 260, damping: 28, mass: 1.1 },
        scale: { duration: 0.2, ease: "easeOut" },
      }}
      style={{
        width: inGroup ? tileW + 1 : tileW,
        height: inGroup ? tileH + 1 : tileH,
        zIndex: isDraggingGroup ? 999 : isOver ? 50 : 1,
        backgroundImage: `url('${puzzle}')`,
        backgroundSize: `${boardSize.w}px ${boardSize.h}px`,
        backgroundPosition: `-${x}px -${y}px`,
        opacity: isDraggingGroup ? 0 : 1,
        ...(inGroup && {
          borderTop: borders.top ? "1.5px solid black" : "none",
          borderBottom: borders.bottom ? "1.5px solid black" : "none",
          borderLeft: borders.left ? "1.5px solid black" : "none",
          borderRight: borders.right ? "1.5px solid black" : "none",
        }),
      }}
    />
  );
};

export default PuzzleTile;
