// this helper function takes in a location on the board, 
// and returns the height
// e.g. [2, 3] and 
//      [[0, 0, 0, 0, 0],
//       [0, 4, 0, 3, 0],
//       [0, 0, 21, 12, 0],
//       [0, 2, 0, 1, 0],
//       [0, 0, 0, 20, 11]]
// would return: 2

const getTileHeight = (tileLocation, grid) => {
    return grid[tileLocation[0]][tileLocation[1]] % 10
}

export default getTileHeight
