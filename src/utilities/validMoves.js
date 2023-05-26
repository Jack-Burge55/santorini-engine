import getBuilderLocations from "./getBuilderLocations.js"

// this helper function takes in the player value and the board, 
// and returns an object with placement as key and all valid movement tiles
// in an array as value for each valid builder
// e.g. [[0, 0, 0, 0, 0],
//       [0, 4, 0, 3, 0],
//       [0, 0, 21, 0, 0],
//       [0, 2, 10, 1, 0],
//       [0, 0, 0, 20, 11]]
// and player value = 20 would return the object:
//     {
//         0: {
//             "location": [2, 2],
//             "validMoves": [[1, 2], [2, 1], [2, 3], [3, 1], [3, 3]]
//         },
//         1: {
//             "location": "[4, 3]",
//             "validMoves": [[3, 3], [3, 4], [4, 2]]
//         },
//      }


const validMoves = (playerValue, grid) => {
    const validMovesObject = {}
    const builderLocations = getBuilderLocations(playerValue, grid);
    // for each builder
    builderLocations.forEach((location, builderIndex) => {
        // get all adjacent tiles on 5x5 grid
        const adjacentTiles = []
        for (let i = location[0] - 1; i < location[0] + 2; i++) {
            for (let j = location[1] - 1; j < location[1] + 2; j++) {
                if (!(i === location[0] && j === location[1]) && (i >=0 && i <= 4)  && (j >=0 && j <= 4)) {
                    adjacentTiles.push([i, j])
                }
            }
        }
        // then filter adjacentTiles by validity to move to them
        const validAdjacent = adjacentTiles.filter(tile => {
            const gridTile = grid[tile[0]][tile[1]]
            return ((gridTile < 4 && (gridTile - (grid[location[0]][location[1]] - playerValue)) < 2))
        })
        // and add builder locations and valid moves to validMovesObject if moves available
        if (validAdjacent.length) {
            validMovesObject[builderIndex] = {
                "location": location,
                "validMoves": validAdjacent
            }
        }
    })
    return validMovesObject;
}

export default validMoves
