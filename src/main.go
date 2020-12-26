package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"time"
)

func main() {

	dir, err := os.Getwd()
	if err != nil {
		panic(err)
	}
	pathToSudokuPuzzle := filepath.Join(dir, "sudoku.txt")

	data, err := ioutil.ReadFile(pathToSudokuPuzzle)
	if err != nil {
		panic(err)
	}

	sudokuGrid := NewSudokuGrid(data)

	sudokuGrid.print()

	start := time.Now()
	solve(sudokuGrid, sudokuGrid.getEmptyIndexes())
	elapsedTime := time.Now().Sub(start)

	fmt.Println(elapsedTime.Milliseconds())

	sudokuGrid.print()
}

func solve(sudokuGrid *SudokuGrid, emptyIndexes []Index) bool {
	if len(emptyIndexes) == 0 {
		return true
	}

	emptyIndex := emptyIndexes[0]
	emptyIndexes = emptyIndexes[1:]

	possibleValues := sudokuGrid.getPossibleValues(emptyIndex.i, emptyIndex.j)

	if len(possibleValues) == 0 {
		emptyIndexes = append([]Index{emptyIndex}, emptyIndexes...)
		return false
	}

	for _, possibleValue := range possibleValues {
		sudokuGrid.grid[emptyIndex.i][emptyIndex.j] = possibleValue
		if solve(sudokuGrid, emptyIndexes) {
			return true
		}
	}

	sudokuGrid.grid[emptyIndex.i][emptyIndex.j] = sudokuGrid.emptyValue
	emptyIndexes = append([]Index{emptyIndex}, emptyIndexes...)
	return false
}
