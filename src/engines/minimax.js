import validBuilds from "../utilities/validBuilds.js";
import boardEvaluator from "../utilities/boardEvaluator.js";

const minimax = (playerValue, grid, validMovesObject) => {

    // let's just do 1 level analysis for now...
    let currentBestMoveEvaluation = -5000
    let selectedBuilder
    let selectedMove
    let selectedBuild

    Object.keys(validMovesObject).forEach(builderKey => {
        const builderLocation = validMovesObject[builderKey].location
        validMovesObject[builderKey].validMoves.forEach(move => {
            const tempGridAfterMove = JSON.parse(JSON.stringify(grid));
            tempGridAfterMove[builderLocation[0]][builderLocation[1]] -= playerValue
            tempGridAfterMove[move[0]][move[1]] += playerValue
            validBuilds(move, tempGridAfterMove).forEach(build => {
                const tempGridAfterBuild = JSON.parse(JSON.stringify(tempGridAfterMove));
                tempGridAfterBuild[build[0]][build[1]]++
                const totalMoveEvaluation = boardEvaluator(playerValue, tempGridAfterBuild)
                if (totalMoveEvaluation > currentBestMoveEvaluation) {
                    currentBestMoveEvaluation = totalMoveEvaluation
                    selectedBuilder = builderKey
                    selectedMove = move
                    selectedBuild = build
                }
            })
        })
    })

    const builderLocation = validMovesObject[selectedBuilder].location

    // update grid after move
    grid[builderLocation[0]][builderLocation[1]] -= playerValue
    grid[selectedMove[0]][selectedMove[1]] += playerValue

    // check winning status
    if (grid[selectedMove[0]][selectedMove[1]] === (playerValue + 3)) {
        return [1, grid]
    }

    // get and perform build
    grid[selectedBuild[0]][selectedBuild[1]] += 1

    return [0, grid]
}

export default minimax
