import validMoves from "./utilities/validMoves.js";
import validBuilds from "./utilities/validBuilds.js";
const grid = [[0, 0, 0, 0, 0],
[0, 4, 0, 3, 0],
[0, 0, 21, 0, 0],
[0, 2, 10, 1, 0],
[0, 0, 0, 20, 11]]
const playerValue = 20
console.log(validMoves(playerValue, grid));
console.log(validBuilds([1, 2], grid))
