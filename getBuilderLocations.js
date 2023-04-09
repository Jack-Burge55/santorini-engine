

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