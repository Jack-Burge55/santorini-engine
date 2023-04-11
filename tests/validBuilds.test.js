import validBuilds from "../src/utilities/validBuilds.js";

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