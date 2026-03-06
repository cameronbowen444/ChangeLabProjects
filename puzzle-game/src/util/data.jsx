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
  puzzle1: puzzle1,
  puzzle2: puzzle2,
  puzzle3: puzzle3,
  puzzle4: puzzle4,
  puzzle5: puzzle5,
  puzzle6: puzzle6,
  puzzle7: puzzle7,
  puzzle8: puzzle8,
  puzzle9: puzzle9
};
export const getRandomPuzzle = () => {
  const values = Object.values(puzzles);

  const index = Math.floor(Math.random() * values.length);
  
  return values[index];
};