// this helper function takes in a grid, 
// and returns a boolean for if the game is over
// e.g. [[0, 0, 0, 0, 0],
//       [0, 4, 0, 3, 0],
//       [0, 0, 21, 0, 0],
//       [0, 2, 10, 1, 0],
//       [0, 0, 0, 20, 11]]
// would return: false

const isGameOver = (grid) => {
    let gameOver = false
    grid.forEach(row => {
        row.forEach(rowIndex => {
            if (rowIndex >3 && rowIndex % 10 === 3) {
                gameOver = true
            }
        })
    })
    return gameOver
}

export default isGameOver
