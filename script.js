import { knightMoves, knightMovesChess } from "./knight.js";

console.log("hello Odin");

console.log(knightMoves([0, 0], [7, 7]).message);
console.log(knightMoves([0, 0], [9, 7]).message);
console.log(knightMovesChess(["A1", "H8"]).message);
console.log(knightMovesChess(["A1", "J8"]).message);
