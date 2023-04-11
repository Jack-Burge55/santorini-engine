import validMoves from "../src/utilities/validMoves.js";

describe('validMoves', () => {
    it('should return an object of builders with locations and an array of valid moves', () => {
        const grid = [[0, 0, 0, 0, 0],
        [0, 4, 0, 3, 0],
        [0, 0, 21, 0, 0],
        [0, 2, 10, 1, 0],
        [0, 0, 0, 20, 11]]
        const playerValue = 20
      const validMoveObject =
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
      expect(validMoves(playerValue, grid)).toEqual(validMoveObject)
    })

    it('should return an object of builders with locations and an array of valid moves, including winning move', () => {
      const grid = [[0, 0, 0, 0, 0],
      [0, 4, 0, 3, 0],
      [0, 0, 22, 0, 0],
      [0, 2, 10, 1, 0],
      [0, 0, 0, 20, 11]]
      const playerValue = 20
    const validMoveObject =
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
    expect(validMoves(playerValue, grid)).toEqual(validMoveObject)
  })
  })