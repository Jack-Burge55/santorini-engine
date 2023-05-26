// this helper function takes in the player value and the board, 
// and returns an array of valid builder locations
// e.g. [[0, 0, 0, 0, 0],
//       [0, 4, 0, 3, 0],
//       [0, 0, 21, 0, 0],
//       [0, 2, 10, 1, 0],
//       [0, 0, 0, 20, 11]]
// and player value = 20 would return: [[2, 2], [4, 3]]

const getBuilderLocations = (playerValue, grid) => {
    const locations = []
    grid.forEach((row, indexX) => {
        row.forEach((rowElement, indexY) => {
            if (playerValue <= rowElement && rowElement <= playerValue + 9) {
                locations.push([indexX, indexY])
            }
        })
    });
    return locations  
}

export default getBuilderLocations
