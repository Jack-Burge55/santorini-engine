import getTileHeight from "./getTileHeight.js";
import validMoves from "./validMoves.js";

// this helper function takes in the player value and the board
// and returns an integer evaluation
// e.g. player value = 20 and a grid 
//      [[0, 0, 0, 0, 0],
//       [0, 4, 0, 3, 0],
//       [0, 0, 21, 0, 0],
//       [0, 2, 10, 1, 0],
//       [0, 0, 0, 20, 11]]
// would return between 65 and 66

const boardEvaluator = (playerValue, grid) => {

    // set score variables for board rating
    // NOTE: Score variables could be optimised
    const winScore = 2000
    const currentHeightScoreModifier = 500
    const moveUpScore = 75
    const moveLevelScore = 5
    // boardRating begins between 0 and 1 to break draws thus preventing tendency towards top left moves
    let boardRating = Math.random()

    // get array of players
    let largestValue = 0
    grid.forEach(row => {
        const largestInRow = Math.max(...row)
        if (largestInRow > largestValue) {
            largestValue = largestInRow
        }
    })
    largestValue = Math.floor( largestValue / 10) * 10
    const players = []
    for (let i = 10; i <= largestValue; i = i + 10) {
        players.push(i)
    }

    players.forEach(uniquePlayer => {
        const playerValidMoves = validMoves(uniquePlayer, grid)
        Object.keys(playerValidMoves).forEach(builderKey => {
            const builderHeight = getTileHeight(playerValidMoves[builderKey].location, grid);
            // consider player and enemy builder positions and wins
            boardRating += (uniquePlayer === playerValue ? (builderHeight === 3 ? winScore : builderHeight * currentHeightScoreModifier) : (builderHeight === 3 ? -winScore : builderHeight * -currentHeightScoreModifier))
            // consider player and enemy builder possible move height differences
            playerValidMoves[builderKey].validMoves.forEach(move => {
                const potentialMoveHeightDifference = getTileHeight(move, grid) - builderHeight
                if (potentialMoveHeightDifference === 1) {
                    boardRating += (uniquePlayer === playerValue ? moveUpScore : -moveUpScore)
                } else if (potentialMoveHeightDifference === 0) {
                    boardRating += (uniquePlayer === playerValue ? moveLevelScore : -moveLevelScore)
                }
            })
        })
    });

    return boardRating  

}

export default boardEvaluator
