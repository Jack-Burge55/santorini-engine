import validMoves from "./utilities/validMoves.js";

import randomPlay from "./engines/randomPlay.js";
import greedyHeight from "./engines/greedyHeight.js";
import minimax from "./engines/minimax.js";

const gamesCount = 20
const winCount = {
    10: 0,
    20: 0
}
const playerEngines = {
    10: greedyHeight,
    20: minimax
}

for (let i = 0; i < gamesCount; i++) {

    let grid = [
        [0, 0, 0, 0, 0],
        [0, 20, 0, 20, 0],
        [0, 0, 0, 0, 0],
        [0, 10, 0, 10, 0],
        [0, 0, 0, 0, 0]]

    let winner
    let currentPlayer = 10
    let currentPlayerIndex = 0

    let remainingPlayers = Object.keys(playerEngines).map(e => parseInt(e))

    while (!winner) {
        // get useful variables
        const validMovesObject = validMoves(currentPlayer, grid)
        const engineName = playerEngines[currentPlayer].name

        // check losing status
        if (Object.keys(validMovesObject).length === 0) {
            const removedPlayer = remainingPlayers.indexOf(currentPlayer)
            remainingPlayers.splice(removedPlayer, 1)
            if (remainingPlayers.length === 1) {
                winner = remainingPlayers[0]
                console.log(remainingPlayers[0], `wins using engine ${engineName}! Final grid below:`);
            } else {
                console.log(currentPlayer, `is eliminated using engine ${engineName}! Grid below:`);
            }
            console.log(grid);
            currentPlayerIndex = currentPlayerIndex % remainingPlayers.length
            currentPlayer = remainingPlayers[currentPlayerIndex]
        }
        else {
            const turnOutcome = playerEngines[currentPlayer](currentPlayer, grid, validMovesObject);
            console.log("------------------------------------");
            // if uneventful turn
            if (turnOutcome[0] === 0) {
                grid = turnOutcome[1]
                console.log("Current grid below:");
                console.log(grid);
                currentPlayerIndex = (currentPlayerIndex + 1) % remainingPlayers.length
                currentPlayer = remainingPlayers[currentPlayerIndex]
            }
            // if winning turn occured
            if (turnOutcome[0] === 1) {
                winner = currentPlayer
                console.log(currentPlayer, `wins using engine ${engineName}! Final grid below:`);
                console.log(turnOutcome[1]);
                winCount[currentPlayer]++
            }
        }
    }
}

console.log(winCount);
