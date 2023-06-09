import getBuilderLocations from "../src/utilities/getBuilderLocations.js"
import validBuilds from "../src/utilities/validBuilds.js";
import validMoves from "../src/utilities/validMoves.js";
import getTileHeight from "../src/utilities/getTileHeight.js";
import boardEvaluator from "../src/utilities/boardEvaluator.js";
import possibleGridsArray from "../src/utilities/possibleGridsArray.js";
import isGameOver from "../src/utilities/isGameOver.js";

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

describe('validBuilds', () => {
    it('should return an array of valid tiles to build', () => {
        const grid = [[0, 0, 0, 0, 0],
        [0, 4, 0, 3, 0],
        [0, 0, 21, 0, 0],
        [0, 2, 10, 1, 0],
        [0, 0, 0, 20, 11]]
      const playerLocation = [3, 2]
      const validBuildArray = [[2, 1], [2, 3], [3, 1], [3, 3], [4, 1], [4, 2]]
      expect(validBuilds(playerLocation, grid)).toEqual(validBuildArray)
    })
  })

describe('validMoves', () => {
  it('should return an object of builders with locations and an array of valid moves', () => {
      const grid = [[0, 0, 0, 0, 0],
      [0, 4, 0, 3, 0],
      [0, 0, 21, 0, 0],
      [0, 2, 10, 1, 0],
      [0, 0, 0, 20, 11]]
      const playerValue = 20
    const validMovesObject =
      {
          0: {
              "location": [2, 2],
              "validMoves": [[1, 2], [2, 1], [2, 3], [3, 1], [3, 3]]
          },
          1: {
              "location": [4, 3],
              "validMoves": [[3, 3], [3, 4], [4, 2]]
          },
      } 
    expect(validMoves(playerValue, grid)).toEqual(validMovesObject)
  })

  it('should return an object of builders with locations and an array of valid moves, including winning move', () => {
    const grid = [[0, 0, 0, 0, 0],
    [0, 4, 0, 3, 0],
    [0, 0, 22, 0, 0],
    [0, 2, 10, 1, 0],
    [0, 0, 0, 20, 11]]
    const playerValue = 20
  const validMovesObject =
    {
        0: {
            "location": [2, 2],
            "validMoves": [[1, 2], [1, 3], [2, 1], [2, 3], [3, 1], [3, 3]]
        },
        1: {
            "location": [4, 3],
            "validMoves": [[3, 3], [3, 4], [4, 2]]
        },
    } 
  expect(validMoves(playerValue, grid)).toEqual(validMovesObject)
  })

  it('should not return a key value pair for a builder with no current valid moves', () => {
    const grid = [[0, 0, 0, 0, 0],
    [0, 4, 0, 3, 0],
    [0, 0, 20, 0, 0],
    [0, 2, 10, 3, 2],
    [0, 0, 0, 2, 20]]
    const playerValue = 20
  const validMovesObject =
    {
        0: {
            "location": [2, 2],
            "validMoves": [[1, 2], [2, 1], [2, 3]]
        }
    } 
  expect(validMoves(playerValue, grid)).toEqual(validMovesObject)
  })
})

describe('getTileHeight', () => {
  it('should return correct height of tile', () => {
      const grid = [[0, 0, 0, 0, 0],
      [0, 4, 0, 3, 0],
      [0, 0, 21, 0, 0],
      [0, 2, 10, 1, 0],
      [0, 0, 0, 20, 11]]
    const tileLocation = [3, 1]
    expect(getTileHeight(tileLocation, grid)).toEqual(2)
  })

  it('should return correct height of tile if occupied by builder', () => {
    const grid = [[0, 0, 0, 0, 0],
    [0, 4, 0, 3, 0],
    [0, 0, 21, 0, 0],
    [0, 2, 10, 1, 0],
    [0, 0, 0, 20, 11]]
  const tileLocation = [4, 4]
  expect(getTileHeight(tileLocation, grid)).toEqual(1)
})
})

describe('boardEvaluator', () => {
  it('should return an evaluation given the player value and grid', () => {
      const grid = [[0, 0, 0, 0, 0],
      [0, 4, 0, 3, 0],
      [0, 0, 21, 0, 0],
      [0, 2, 10, 1, 0],
      [0, 0, 0, 20, 11]]
      const result = boardEvaluator(20, grid)
    expect(result).toBeGreaterThanOrEqual(65)
    expect(result).toBeLessThanOrEqual(66)
  })
})

describe('isGameOver', () => {
  it('should return a false boolean if the grid has no builder on a 3 height tower', () => {
      const grid = [[0, 0, 0, 0, 0],
      [0, 4, 0, 3, 0],
      [0, 0, 21, 0, 0],
      [0, 2, 10, 1, 0],
      [0, 0, 0, 20, 11]]
    expect(isGameOver(grid)).toEqual(false)
  })

  it('should return a true boolean if the grid has no builder on a 3 height tower', () => {
    const grid = [[0, 0, 0, 0, 0],
    [0, 4, 0, 3, 0],
    [0, 0, 23, 0, 0],
    [0, 2, 11, 1, 0],
    [0, 0, 0, 20, 11]]
  expect(isGameOver(grid)).toEqual(true)
})
})

describe('possibleGridsArray', () => {
  it('should return an array of possible grids after move and build given player value and grid', () => {
      const grid = [[0, 0, 0, 0, 0],
      [0, 4, 0, 3, 0],
      [0, 0, 1, 0, 0],
      [0, 2, 10, 1, 0],
      [20, 4, 4, 0, 11]]
      const expectedArray = [
        [
          [ 0, 0, 0, 0, 0 ],
          [ 0, 4, 0, 3, 0 ],
          [ 1, 0, 1, 0, 0 ],
          [ 20, 2, 10, 1, 0 ],
          [ 0, 4, 4, 0, 11 ]
        ],
        [
          [ 0, 0, 0, 0, 0 ],
          [ 0, 4, 0, 3, 0 ],
          [ 0, 1, 1, 0, 0 ],
          [ 20, 2, 10, 1, 0 ],
          [ 0, 4, 4, 0, 11 ]
        ],
        [
          [ 0, 0, 0, 0, 0 ],
          [ 0, 4, 0, 3, 0 ],
          [ 0, 0, 1, 0, 0 ],
          [ 20, 3, 10, 1, 0 ],
          [ 0, 4, 4, 0, 11 ]
        ],
        [
          [ 0, 0, 0, 0, 0 ],
          [ 0, 4, 0, 3, 0 ],
          [ 0, 0, 1, 0, 0 ],
          [ 20, 2, 10, 1, 0 ],
          [ 1, 4, 4, 0, 11 ]
        ]
      ]
    expect(possibleGridsArray(20, grid)).toEqual(expectedArray)
  })

  it('should return an empty array of possible grids after move and build given trapped player value and grid', () => {
    const grid = [[0, 0, 0, 0, 0],
    [0, 4, 0, 3, 0],
    [0, 0, 1, 0, 0],
    [4, 2, 10, 1, 0],
    [20, 4, 4, 0, 11]]
  expect(possibleGridsArray(20, grid)).toEqual([])
})
})
