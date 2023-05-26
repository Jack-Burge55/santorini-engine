import validMoves from "../utilities/validMoves.js";
import validBuilds from "../utilities/validBuilds.js";

// this helper function takes in a player value and grid, 
// and returns an array of all possible grids after move and build
// e.g. player value = 20 and grid = 
// [[0, 0, 0, 0, 0],
//   [0, 4, 0, 3, 0],
//   [0, 0, 1, 0, 0],
//   [0, 2, 10, 1, 0],
//   [20, 4, 4, 0, 11]]
// and would return the array:
//     [[..], [...], [...], [...]]

const possibleGridsArray = (playerValue, grid) => {
    const gridArray = []
    const validMovesObject = validMoves(playerValue, grid)
    Object.keys(validMovesObject).forEach(builderKey => {
        const builderLocation = validMovesObject[builderKey].location
        validMovesObject[builderKey].validMoves.forEach(move => {
            const tempGridAfterMove = JSON.parse(JSON.stringify(grid));
            tempGridAfterMove[builderLocation[0]][builderLocation[1]] -= playerValue
            tempGridAfterMove[move[0]][move[1]] += playerValue
            validBuilds(move, tempGridAfterMove).forEach(build => {
                const tempGridAfterBuild = JSON.parse(JSON.stringify(tempGridAfterMove));
                tempGridAfterBuild[build[0]][build[1]]++
                gridArray.push(tempGridAfterBuild)
            })
        })
    })
    return gridArray
}

export default possibleGridsArray
