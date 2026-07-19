# Knight's Travails

A JavaScript solution to [The Odin Project's Knight's Travails](https://www.theodinproject.com/lessons/javascript-knights-travails) exercise: find the shortest sequence of moves for a knight to travel between two squares on a standard 8x8 chessboard.

## Overview

A knight's possible moves form an implicit graph — each square is a node, and each legal knight move is an edge. Finding the _shortest_ path between two squares is a classic **Breadth-First Search (BFS)** problem: unlike Depth-First Search, BFS explores the board level by level (all squares reachable in 1 move, then 2 moves, etc.), which guarantees that the first time the target square is reached, it has been reached via the shortest possible path.

## How it works

### Core algorithm (`knightMoves`)

1. **Generate valid moves** (`nextMoves`) — from any `[x, y]` position, compute the 8 possible knight moves and filter out any that fall off the board (coordinates outside `0-7`).
2. **BFS traversal** — starting from the initial position, explore the board level by level using a queue, tracking visited squares in a `Set` to avoid revisiting them.
3. **Path reconstruction** — rather than storing the full path at every queue entry (memory-expensive), each newly discovered square records its parent in a lookup object (`parentsAdress`). Once the target is reached, the path is reconstructed by walking backward through parent references to the start, then reversing the result.
4. **Key conversion** (`keyToString` / `stringToKey`) — since JavaScript arrays can't be compared by value or used directly as reliable object keys, each `[x, y]` position is converted to a string (`"x,y"`) for use as a key in the visited set and parent lookup.

### Chess notation bonus (`knightMovesChess`)

The lesson's bonus section asks for support of standard chess notation (e.g. `"A1"`, `"H8"`) instead of raw coordinates. Rather than modifying the core BFS function, a separate wrapper handles the conversion:

- `chessToKey` — converts chess notation (`"A1"`) to board coordinates (`[0, 0]`)
- `keytoChess` — converts board coordinates back to chess notation
- `knightMovesChess` — converts chess input to coordinates, runs the existing `knightMoves`, then converts the resulting path back to chess notation

This keeps `knightMoves` focused on a single responsibility (pathfinding on coordinates) while notation conversion stays isolated and doesn't risk introducing bugs into the core algorithm.

> **Note on multiple shortest paths:** the board can have more than one shortest path between two squares. This solution returns the first one BFS finds — which is guaranteed to be _a_ shortest path, though not necessarily the only one.

## Usage

```javascript
// Using board coordinates
knightMoves([0, 0], [7, 7]);
// => {
//      message: "You've made it in 6 move(s) => [0,0],[2,1],[4,2],[6,3],[4,4],[6,5],[7,7]",
//      movement: 6,
//      path: [[0,0],[2,1],[4,2],[6,3],[4,4],[6,5],[7,7]]
//    }

// Using chess notation
knightMovesChess(["A1", "H8"]);
// => {
//      message: "You've made it in 6 move(s) => [A,1],[C,2],[E,3],[G,4],[E,5],[G,6],[H,8]",
//      movement: 6,
//      path: [['A',1],['C',2],['E',3],['G',4],['E',5],['G',6],['H',8]]
//    }
```

## Functions

| Function                         | Description                                                          |
| -------------------------------- | -------------------------------------------------------------------- |
| `nextMoves([x, y])`              | Returns all valid knight moves from a given position                 |
| `keyToString([x, y])`            | Converts a position to a string key (`"x,y"`)                        |
| `stringToKey(string)`            | Converts a string key back to a position array                       |
| `knightMoves(start, end)`        | Runs BFS and returns the shortest path between two board positions   |
| `chessToKey(["A1", ...])`        | Converts chess notation to board coordinates                         |
| `keytoChess([[0,0], ...])`       | Converts board coordinates to chess notation                         |
| `knightMovesChess([start, end])` | Wrapper around `knightMoves` that accepts and returns chess notation |
