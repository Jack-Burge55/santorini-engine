import boardEvaluator from "../utilities/boardEvaluator.js";
import possibleGridsArray from "../utilities/possibleGridsArray.js"
import isGameOver from "../utilities/isGameOver.js"

const minimax = (playerValue, grid) => {
    const [otherPlayer] = [10, 20].filter(e => e !== playerValue)
    
    const minimaxFunction = (minimaxObject, depth, alpha, beta, maximise) => {
        if (isGameOver(minimaxObject) || depth === 0) {
            return [boardEvaluator(playerValue, minimaxObject), minimaxObject]
        }
        
        if (maximise) {
            let maxEval = -Infinity
            let history
            possibleGridsArray(playerValue, minimaxObject).forEach(child => {
                const tempEval = minimaxFunction(child, depth - 1, alpha, beta, false)[0]
                if (tempEval > maxEval) {
                    maxEval = tempEval
                    history = child
                }
                alpha = Math.max(alpha, tempEval)
                if (beta <= alpha) return
            })
            return [maxEval, history]
        }
        else {
            let minEval = Infinity
            let history
            possibleGridsArray(otherPlayer, minimaxObject).forEach(child => {
                const tempEval = minimaxFunction(child, depth - 1, alpha, beta, true)[0]
                if (tempEval < minEval) {
                    minEval = tempEval
                    history = child
                }
                beta = Math.min(beta, tempEval)
                if (beta <= alpha) return
            })
            return [minEval, history]
        }
    }

    // update grid
    grid = minimaxFunction(grid, 3, -Infinity, Infinity, true)[1]

    // check winning status
    if (isGameOver(grid)) {
        return [1, grid]
    }

    return [0, grid]
}

export default minimax
