import validMoves from "../utilities/validMoves.js"
import validBuilds from "../utilities/validBuilds.js";

// This engine picks a random builder of its own with a valid move, performs this and then picks a random build

// set initial variables
const grid = [[0, 0, 0, 0, 0],
[0, 0, 12, 3, 0],
[0, 0, 0, 20,2],
[0, 20, 0, 20, 20],
[10, 0, 0, 20, 0]]
const playerValue = 10

// get useful variables
const validMovesObject = validMoves(playerValue, grid)
const validMovesObjectKeys = Object.keys(validMovesObject)

// get all builders with at least one possible move
const filteredValidMovesObjectKeys = validMovesObjectKeys.filter(moveKey=> {
    return validMovesObject[moveKey].validMoves.length !== 0
})

// update with losing status
if (filteredValidMovesObjectKeys.length === 0) {
    console.log("loses");
}

// get random eligible builder 
const randomBuilder = Math.floor(Math.random() * filteredValidMovesObjectKeys.length)
const builderLocation = validMovesObject[randomBuilder].location
const builderMoveset = validMovesObject[randomBuilder].validMoves

// get random eligible move for that builder
const randomMove = builderMoveset[Math.floor(Math.random() * builderMoveset.length)]

// check winning move
if (grid[randomMove[0]][randomMove[1]] === 3) {
    console.log("wins")
}

// update grid after move
grid[builderLocation[0]][builderLocation[1]] -= playerValue
grid[randomMove[0]][randomMove[1]] += playerValue

// get and perform random eligible build
const builderBuildset = validBuilds([randomMove[0], randomMove[1]], grid)
const randomBuild = builderBuildset[Math.floor(Math.random() * builderBuildset.length)]
grid[randomBuild[0]][randomBuild[1]] += 1

console.log(grid);
