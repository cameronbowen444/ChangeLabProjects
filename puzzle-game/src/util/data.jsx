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
    name: "あの夏の音",
    title: "That Sound of Summer",
    description: "A peaceful moment of a grandmother playing traditional music.",
    image: puzzle1,
  },

  puzzle2: {
    id: "puzzle2",
    name: "一緒に庭で",
    title: "Together in the Garden",
    description: "A calm garden scene with flowers and sunlight.",
    image: puzzle2,
  },

  puzzle3: {
    id: "puzzle3",
    name: "日本情緒の午後",
    title: "A very Japanese afternoon",
    description: "A quiet tea moment in a warm home.",
    image: puzzle3,
  },

  puzzle4: {
    id: "puzzle4",
    name: "遠い城の庭園",
    title: "Garden of a Faraway Castle",
    description: "Falling maple leaves in a peaceful autumn garden.",
    image: puzzle4,
  },

  puzzle5: {
    id: "puzzle5",
    name: "庭のあの鶴",
    title: "That Crane from the Garden",
    description: "Soft sunlight shining through a traditional window.",
    image: puzzle5,
  },

  puzzle6: {
    id: "puzzle6",
    name: "静かな神の湖",
    title: "Quiet Lake of the Gods",
    description: "A calm countryside home surrounded by nature.",
    image: puzzle6,
  },

  puzzle7: {
    id: "puzzle7",
    name: "文化の夜",
    title: "Cultural Night",
    description: "A relaxing moment learning traditional music.",
    image: puzzle7,
  },

  puzzle8: {
    id: "puzzle8",
    name: "子供の時",
    title: "When I was a Child...",
    description: "Blooming flowers bringing color to the garden.",
    image: puzzle8,
  },

  puzzle9: {
    id: "puzzle9",
    name: "秋生まれの猫",
    title: "A cat born in Fall",
    description: "A calm interior with warm light and quiet atmosphere.",
    image: puzzle9,
  },
};

export const getRandomPuzzle = () => {
  const values = Object.values(puzzles);

  const index = Math.floor(Math.random() * values.length);
  
  return values[index];
};