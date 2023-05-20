import validBuilds from "../utilities/validBuilds.js";

// This engine picks a random builder of its own with a valid move, performs this and then picks a random build

const randomPlay = (playerValue, grid, validMovesObject) => {

    // get random eligible builder 
    const randomBuilder = Object.keys(validMovesObject)[Math.floor(Math.random() * Object.keys(validMovesObject).length)]
    const builderLocation = validMovesObject[randomBuilder].location
    const builderMoveset = validMovesObject[randomBuilder].validMoves

    // get random eligible move for that builder
    const selectedMove = builderMoveset[Math.floor(Math.random() * builderMoveset.length)]

    // update grid after move
    grid[builderLocation[0]][builderLocation[1]] -= playerValue
    grid[selectedMove[0]][selectedMove[1]] += playerValue

    // check winning status
    if (grid[selectedMove[0]][selectedMove[1]] === (playerValue + 3)) {
        return [1, grid]
    }

    // get and perform random eligible build
    const builderBuildset = validBuilds([selectedMove[0], selectedMove[1]], grid)
    const selectedBuild = builderBuildset[Math.floor(Math.random() * builderBuildset.length)]
    grid[selectedBuild[0]][selectedBuild[1]] += 1

    return [0, grid]
}

export default randomPlay
