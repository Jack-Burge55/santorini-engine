import getBuilderLocations from "../getBuilderLocations.js"

describe('getBuilderLocations', () => {
  it('should return an array of builder locations given player value', () => {
    const grid = [[0, 0, 0, 0, 0],
    [0, 4, 0, 3, 0],
    [0, 32, 21, 0, 0],
    [0, 2, 10, 1, 0],
    [0, 0, 0, 20, 11]]
    const playerValue = 20
    const locations = [[2, 2], [4, 3]]
    expect(getBuilderLocations(playerValue, grid)).toEqual(locations)
  })

  it('should return an array of builder locations given player value and 1 builder', () => {
    const grid = [[0, 0, 0, 0, 0],
    [0, 4, 0, 3, 0],
    [0, 0, 1, 0, 0],
    [0, 2, 10, 1, 0],
    [0, 0, 0, 20, 11]]
    const playerValue = 20
    const locations = [[4, 3]]
    expect(getBuilderLocations(playerValue, grid)).toEqual(locations)
  })

  it('should return an empty array of builder locations given player value and no builders', () => {
    const grid = [[0, 0, 0, 0, 0],
    [0, 4, 0, 3, 0],
    [0, 0, 1, 0, 0],
    [0, 2, 10, 1, 0],
    [0, 0, 0, 0, 11]]
    const playerValue = 20
    const locations = []
    expect(getBuilderLocations(playerValue, grid)).toEqual(locations)
  })
})