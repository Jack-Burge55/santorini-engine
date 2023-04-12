import randomPlay from "./engines/randomPlay.js";

let grid = [
[3, 3, 3, 0, 0],
[3, 10, 3, 0, 0],
[3, 3, 3, 0, 0],
[0, 0, 0, 0, 0],
[0, 0, 0, 20, 0]]
const playerValue = 10
let turnOutcome
turnOutcome = randomPlay(playerValue, grid);
"player wins"
if (turnOutcome[0] === 1) {
    console.log(playerValue, "wins! Final grid below:");
    console.log(turnOutcome[1]);
}
if (turnOutcome[0] === -1) {
    console.log(playerValue, "is eliminated! Final grid below:");
    console.log(grid);
}
if (turnOutcome[0] === 0) {
    grid = turnOutcome[1]
    console.log("Current grid below:");
    console.log(grid);
}
