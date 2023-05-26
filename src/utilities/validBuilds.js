// this helper function takes in the player location and the board, 
// and returns an array with all valid build tiles
// e.g. [[0, 0, 0, 0, 0],
//       [0, 4, 0, 3, 0],
//       [0, 0, 21, 0, 0],
//       [0, 2, 10, 1, 0],
//       [0, 0, 0, 20, 11]]
// and player location [2, 2] would return the array:
//     [[1, 2], [1, 3], [2, 1], [2, 3], [3, 1], [3, 4]]


const validBuilds = (builderLocation, grid) => {
    // get all adjacent tiles on 5x5 grid
    const adjacentTiles = []
    for (let i = builderLocation[0] - 1; i < builderLocation[0] + 2; i++) {
        for (let j = builderLocation[1] - 1; j < builderLocation[1] + 2; j++) {
            if (!(i === builderLocation[0] && j === builderLocation[1]) && (i >=0 && i <= 4)  && (j >=0 && j <= 4)) {
                adjacentTiles.push([i, j])
            }
        }
    }
    // filter adjacentTiles by validity to build on them
    const validBuildsArray = adjacentTiles.filter(tile => {
        const gridTile = grid[tile[0]][tile[1]]
        return (gridTile < 4)
    })
    return validBuildsArray;
}

export default validBuilds
