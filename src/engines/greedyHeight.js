import validMoves from "../utilities/validMoves.js"
import validBuilds from "../utilities/validBuilds.js";
import getTileHeight from "../utilities/getTileHeight.js";

// This engine picks a builder of its own able to move up on its turn if possible, else try to move to stay elevated. This engine then performs a random build

const greedyHeight = (playerValue, grid) => {
    // get useful variables
    const validMovesObject = validMoves(playerValue, grid)

    // get all builders with at least one possible move
    const filteredValidMovesObjectKeys = Object.keys(validMovesObject).filter(moveKey=> {
        return validMovesObject[moveKey].validMoves.length !== 0
    })

    // check losing status
    if (filteredValidMovesObjectKeys.length === 0) {
        return [-1, grid];
    }

    // get best possible height gain move for any builder 
    let bestHeightGain = -4
    let bestHeightMoves = []
    filteredValidMovesObjectKeys.forEach(builderKey => {
            validMovesObject[builderKey].validMoves.forEach(move => {
                const moveHeight = getTileHeight(move, grid)
                const currentLocation = validMovesObject[builderKey].location
                if (moveHeight === bestHeightGain) {
                    bestHeightMoves.push([move, currentLocation])
                }
                if (moveHeight > bestHeightGain) {
                    bestHeightGain = moveHeight
                    bestHeightMoves = [[move, currentLocation]]
                }
            })
        }
    )
    const randomMoveIndex = Math.floor(Math.random() * bestHeightMoves.length)
    const currentLocation = bestHeightMoves[randomMoveIndex][1]
    const selectedMove = bestHeightMoves[randomMoveIndex][0]

    // update grid after move
    grid[currentLocation[0]][currentLocation[1]] -= playerValue
    grid[selectedMove[0]][selectedMove[1]] += playerValue

    // check winning status
    if (grid[selectedMove[0]][selectedMove[1]] === (playerValue + 3)) {
        return [1, grid]
    }

    // get and perform random eligible build
    const builderBuildset = validBuilds([selectedMove[0], selectedMove[1]], grid)
    const randomBuild = builderBuildset[Math.floor(Math.random() * builderBuildset.length)]
    grid[randomBuild[0]][randomBuild[1]] += 1

    return [0, grid]
}

export default greedyHeight
