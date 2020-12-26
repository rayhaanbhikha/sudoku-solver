const fs = require('fs');
const { Box } = require('./box');


const sudokuPuzzle = fs.readFileSync('../sudoku.txt', { encoding: 'utf-8' }).split('\n').map(r => r.split(' '));

const printSudoku = (sudokuPuzzle) => {
  for (let i = 0; i < sudokuPuzzle.length; i++) {
    if (i % 3 === 0) {
      console.log('');
    }
    for (let j = 0; j < sudokuPuzzle.length; j++) {
      if (j % 3 === 0) {
        process.stdout.write(' ');
      }
      const { value } = sudokuPuzzle[i][j];
      if (value === 0) {
        process.stdout.write(`_\ `)
      } else {
        process.stdout.write(`${value}\ `)
      }
    }
    console.log('');
  }
  console.log('');
}

const emptyIndexes = [];

// init grid.
const grid = []
for (let i = 0; i < sudokuPuzzle.length; i++) {
  const row = [];
  for (let j = 0; j < sudokuPuzzle.length; j++) {
    const element = sudokuPuzzle[i][j];
    if (element === '0') {
      emptyIndexes.push({ i, j });
    }
    row.push(new Box(i, j, element, grid));
  }
  grid.push(row);
}

// console.log(emptyIndexes);
printSudoku(grid);

// do {
//   const emptyIndex = emptyIndexes.shift();
//   const { i, j } = emptyIndex;
//   const box = grid[i][j];
//   const possibleVals = box.computePossibleValues()
//   if (possibleVals.length === 1) {
//     box.value = possibleVals[0];
//   } else {
//     emptyIndexes.push(emptyIndex);
//   }
// } while (emptyIndexes.length !== 0);

// console.log()

// console.log(box.computePossibleValues());
