import validMoves from "../utilities/validMoves.js"
import validBuilds from "../utilities/validBuilds.js";

// This engine picks a random builder of its own with a valid move, performs this and then picks a random build

const randomPlay = (playerValue, grid) => {
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

    // get random eligible builder 
    const randomBuilder = filteredValidMovesObjectKeys[Math.floor(Math.random() * filteredValidMovesObjectKeys.length)]
    const builderLocation = validMovesObject[randomBuilder].location
    const builderMoveset = validMovesObject[randomBuilder].validMoves

    // get random eligible move for that builder
    const randomMove = builderMoveset[Math.floor(Math.random() * builderMoveset.length)]

    // update grid after move
    grid[builderLocation[0]][builderLocation[1]] -= playerValue
    grid[randomMove[0]][randomMove[1]] += playerValue

    // check winning status
    if (grid[randomMove[0]][randomMove[1]] === (playerValue + 3)) {
        return [1, grid]
    }

    // get and perform random eligible build
    const builderBuildset = validBuilds([randomMove[0], randomMove[1]], grid)
    const randomBuild = builderBuildset[Math.floor(Math.random() * builderBuildset.length)]
    grid[randomBuild[0]][randomBuild[1]] += 1

    return [0, grid]
}

export default randomPlay
