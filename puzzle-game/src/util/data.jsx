import puzzle1 from "../assets/puzzle1.png";
import puzzle2 from "../assets/puzzle2.jpg";
import puzzle3 from "../assets/puzzle3.jpg";
import puzzle4 from "../assets/puzzle4.jpg";
import puzzle5 from "../assets/puzzle5.jpg";
import puzzle6 from "../assets/puzzle6.png";
import puzzle7 from "../assets/puzzle7.png";
import puzzle8 from "../assets/puzzle8.png";
import puzzle9 from "../assets/puzzle9.png";

export const puzzles = {
  puzzle1: {
    id: "puzzle1",
    title: "Grandmother Playing Shamisen",
    description: "A peaceful moment of a grandmother playing traditional music.",
    image: puzzle1,
  },

  puzzle2: {
    id: "puzzle2",
    title: "Garden Blossoms",
    description: "A calm garden scene with flowers and sunlight.",
    image: puzzle2,
  },

  puzzle3: {
    id: "puzzle3",
    title: "Morning Tea",
    description: "A quiet tea moment in a warm home.",
    image: puzzle3,
  },

  puzzle4: {
    id: "puzzle4",
    title: "Autumn Leaves",
    description: "Falling maple leaves in a peaceful autumn garden.",
    image: puzzle4,
  },

  puzzle5: {
    id: "puzzle5",
    title: "Window Light",
    description: "Soft sunlight shining through a traditional window.",
    image: puzzle5,
  },

  puzzle6: {
    id: "puzzle6",
    title: "Quiet Village",
    description: "A calm countryside home surrounded by nature.",
    image: puzzle6,
  },

  puzzle7: {
    id: "puzzle7",
    title: "Music Lesson",
    description: "A relaxing moment learning traditional music.",
    image: puzzle7,
  },

  puzzle8: {
    id: "puzzle8",
    title: "Spring Flowers",
    description: "Blooming flowers bringing color to the garden.",
    image: puzzle8,
  },

  puzzle9: {
    id: "puzzle9",
    title: "Playful Cat",
    description: "A calm interior with warm light and quiet atmosphere.",
    image: puzzle9,
  },
};

export const getRandomPuzzle = () => {
  const values = Object.values(puzzles);

  const index = Math.floor(Math.random() * values.length);
  
  return values[index];
};