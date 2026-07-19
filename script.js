console.log("hello Odin");

function keyToString(key) {
    return `${key[0]},${key[1]}`
}
function stringToKey(string) {
    const key = []
    key[0] = parseInt(string.slice(0,1))
    key[1] = parseInt(string.slice(2))
    return key
}

function keytoChess(arrayOfKeys) {
    const chessKeys = []
    const letters = {0:"A", 1:"B", 2:"C", 3:"D", 4:"E", 5:"F", 6:"G", 7:'H' }
    arrayOfKeys.forEach(key => {
        const newKey = [letters[key[0]],key[1]+1]
        chessKeys.push(newKey)
    });
    return chessKeys
}

function chessToKey(arrayOfKeysChess) {
    const letters = { "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5, "G": 6, "H": 7 };

    return arrayOfKeysChess.map(keyChess => {
        const first = keyChess.charAt(0);
        const second = parseInt(keyChess.charAt(1), 10); 
        return [letters[first], second - 1];
    });
}


function nextMoves([x,y]) {
    const nextPositions = [[x+2,y+1],[x+2,y-1],[x-2,y+1],[x-2,y-1],[x+1,y+2],[x+1,y-2],[x-1,y+2],[x-1,y-2],]
    const valid = nextPositions.filter((position) => position[0] >= 0 && position[0] <= 7 && position[1] >= 0 && position[1] <= 7)
    return valid
}


function knightMoves([startX,startY],[endX,endY]) {
    let parentsAdress = {}
    let visited = new Set()
    let current = [startX,startY]
    visited.add(keyToString(current))

    let queue = [[startX,startY]]
    
    while (queue.length !== 0) {
        current = queue.shift()
        if (keyToString(current) === keyToString([endX,endY])) {
            
            let resultPath = []
            let orderedResultPath = []
            resultPath.push(keyToString(current))
            current = parentsAdress[keyToString(current)]
            
            while (current !== undefined ) {
                resultPath.push(current)
                current = parentsAdress[current]  
            }

            while (resultPath.length > 0) {

                orderedResultPath.push(stringToKey(resultPath.pop()))
            }

            const numOfMove = orderedResultPath.length - 1 
            const result = orderedResultPath.map(value => `[${value}]`)

            return {message: `You've made it in ${numOfMove} move(s) => ${result}` , movement: numOfMove, path: orderedResultPath }
        }   
        const nextCurrentMoves = nextMoves(current)
        nextCurrentMoves.forEach(childPosition => {
            if (!visited.has(keyToString(childPosition))) {
                visited.add(keyToString(childPosition))
                parentsAdress[keyToString(childPosition)] = keyToString(current)
                queue.push(childPosition)   
            }
            
        });
        
    }
}

console.log(knightMoves([0,0],[7,7]));


function knightMovesChess([startXY,  endXY]) {
    const inputStart = chessToKey([startXY])
    const inputEnd = chessToKey([endXY])

    const result = knightMoves(...inputStart, ...inputEnd)
    const resultPath = result.path
    const chessPath = keytoChess(result.path)
    const numOfMove = result.movement

    const messagePath = chessPath.map(value => `[${value}]`)
    return {message: `You've made it in ${numOfMove} move(s) => ${messagePath}` , movement: numOfMove, path: chessPath }
}

console.log(knightMovesChess(["A1","H8"]));
