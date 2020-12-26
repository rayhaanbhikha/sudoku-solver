const fs = require('fs');

const sudokuGrid = fs.readFileSync('../sudoku.txt', { encoding: 'utf-8' }).split('\n').map(r => r.split(' ').map(num => Number(num)));
const sudokuGridSol = fs.readFileSync('../sudoku-solution.txt', { encoding: 'utf-8' }).split('\n').map(r => r.split(' ').map(num => Number(num)));

const emptyValue = 0;

const defaultValues = [1,2,3,4,5,6,7,8,9];

const printSudoku = (sudokuGrid) => {
  for (let i = 0; i < sudokuGrid.length; i++) {
    if (i % 3 === 0) {
      console.log('');
    }
    for (let j = 0; j < sudokuGrid.length; j++) {
      if (j % 3 === 0) {
        process.stdout.write(' ');
      }
      const element = sudokuGrid[i][j];
      if (element === '0') {
        process.stdout.write(`_\ `)
      } else {
        process.stdout.write(`${element}\ `)
      }
    }
    console.log('');
  }
  console.log('');
}

const getPossibleValues = (sudokuGrid, row, col) => {
  const valuesThatAlreadyExist = new Set(defaultValues);

  // read column.
  for (let i = 0; i < sudokuGrid.length; i++) {
    if (i !== row) {
      const element = sudokuGrid[i][col]
      if(element !== emptyValue) valuesThatAlreadyExist.delete(element);
    }
    if (i !== col) {
      const element = sudokuGrid[row][i];
      if(element !== emptyValue) valuesThatAlreadyExist.delete(element);
    }
  }

  let cube = {}
  if (row >= 0 && row <= 2) {
    cube.rowMin = 0;
  } else if (row >= 3 && row <= 5) {
    cube.rowMin = 3;
  } else {
    cube.rowMin = 6;
  }

  if (col >= 0 && col <= 2) {
    cube.colMin = 0;
  } else if (col >= 3 && col <= 5) {
    cube.colMin = 3;
  } else {
    cube.colMin = 6;
  }

  cube.rowMax = cube.rowMin + 2;
  cube.colMax = cube.colMin + 2;

  // read inner cube.
  for (let i = cube.rowMin; i <= cube.rowMax; i++) {
    for (let j = cube.colMin; j <= cube.colMax; j++) {
      if (j === col || i === row) continue;
      const element = sudokuGrid[i][j];
      if(element !== emptyValue) valuesThatAlreadyExist.delete(element);
    }
  }

  return valuesThatAlreadyExist;
}

const getEmptyIndexes = (sudokuGrid) => {
  const emptyIndexes = [];
  for (let i = 0; i < sudokuGrid.length; i++) {
    for (let j = 0; j < sudokuGrid.length; j++) {
      if (sudokuGrid[i][j] === emptyValue) emptyIndexes.push({ i, j });
    }    
  }
  return emptyIndexes;
}

const emptyIndexes = getEmptyIndexes(sudokuGrid);
printSudoku(sudokuGrid);

function checkSolution(grid, solGrid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] !== solGrid[i][j]) return false;
    }    
  }
  return true;
}

function solve(sudokuGrid, emptyIndexes) {
  if (emptyIndexes.length === 0) return true;

  const emptyIndex = emptyIndexes.shift();
  const { i, j } = emptyIndex;
  const possibleValues = getPossibleValues(sudokuGrid, i, j);

  const reset = () => {
    sudokuGrid[i][j] = emptyValue;
    emptyIndexes.unshift(emptyIndex);
  }

  if (possibleValues.length === 0) {
    reset();
    return false;
  }

  for (const possibleValue of possibleValues) {
    sudokuGrid[i][j] = possibleValue;
    if (solve(sudokuGrid, emptyIndexes)) return true;
  }

  reset();
  return false;
}

const label = 'sudoku puzzle';
console.time(label);
solve(sudokuGrid, emptyIndexes);
console.timeEnd(label);

console.log(checkSolution(sudokuGrid, sudokuGridSol));
