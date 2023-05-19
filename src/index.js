import randomPlay from "./engines/randomPlay.js";
import greedyHeight from "./engines/greedyHeight.js";

const gamesCount = 10
const winCount = {
    10: 0,
    20: 0,
    30: 0
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
    const playerEngines = {
        10: randomPlay,
        20: greedyHeight
    }
    let remainingPlayers = Object.keys(playerEngines).map(e => parseInt(e))

    while (!winner) {
        const turnOutcome = playerEngines[currentPlayer](currentPlayer, grid);
        console.log("------------------------------------");
        // if winning turn occured
        if (turnOutcome[0] === 1) {
            winner = currentPlayer
            console.log(currentPlayer, "wins! Final grid below:");
            console.log(turnOutcome[1]);
            winCount[currentPlayer]++
        }
        // if player eliminated
        if (turnOutcome[0] === -1) {
            const removedPlayer = remainingPlayers.indexOf(currentPlayer)
            remainingPlayers.splice(removedPlayer, 1)
            if (remainingPlayers.length === 1) {
                winner = remainingPlayers[0]
                console.log(remainingPlayers[0], "wins! Final grid below:");
            } else {
                console.log(currentPlayer, "is eliminated! Grid below:");
            }
            console.log(grid);
            currentPlayerIndex = currentPlayerIndex % remainingPlayers.length
            currentPlayer = remainingPlayers[currentPlayerIndex]
        }
        // if uneventful turn
        if (turnOutcome[0] === 0) {
            grid = turnOutcome[1]
            console.log("Current grid below:");
            console.log(grid);
            currentPlayerIndex = (currentPlayerIndex + 1) % remainingPlayers.length
            currentPlayer = remainingPlayers[currentPlayerIndex]
        }
    }
}

console.log(winCount);
