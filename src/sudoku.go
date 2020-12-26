package main

import (
	"fmt"
	"strconv"
	"strings"
)

type Index struct {
	i, j int
}

type SudokuGrid struct {
	grid       [][]int
	emptyValue int
}

func NewSudokuGrid(data []byte) *SudokuGrid {
	grid := make([][]int, 0)

	for _, row := range strings.Split(string(data), "\n") {

		gridRow := make([]int, 0)
		for _, element := range strings.Split(row, " ") {
			num, err := strconv.Atoi(element)
			if err != nil {
				panic(err)
			}
			gridRow = append(gridRow, num)
		}
		grid = append(grid, gridRow)
	}
	return &SudokuGrid{grid: grid}
}

func (s SudokuGrid) getEmptyIndexes() []Index {
	emptyIndexes := make([]Index, 0)
	for i, row := range s.grid {
		for j, element := range row {
			if element == s.emptyValue {
				emptyIndexes = append(emptyIndexes, Index{i, j})
			}
		}
	}
	return emptyIndexes
}

func (s SudokuGrid) print() {
	for i, row := range s.grid {
		if i%3 == 0 {
			fmt.Println(" ")
		}
		for j, element := range row {
			// fmt.Println(element)
			if j%3 == 0 {
				fmt.Print(" ")
			}
			if element == s.emptyValue {
				fmt.Print("_ ")
			} else {
				fmt.Print(fmt.Sprintf("%d ", element))
			}
		}
		fmt.Println(" ")
	}
	fmt.Println(" ")
}

func (s SudokuGrid) getPossibleValues(row, col int) []int {
	possibleValues := make(map[int]bool)

	for i := range s.grid {
		if i != row {
			element := s.grid[i][col]
			if element != s.emptyValue {
				possibleValues[element] = true
			}
		}
		if i != col {
			element := s.grid[row][i]
			if element != s.emptyValue {
				possibleValues[element] = true
			}
		}
	}

	cube := struct {
		rowMin, rowMax int
		colMin, colMax int
	}{}

	switch {
	case row >= 0 && row <= 2:
		cube.rowMin = 0
		break
	case row >= 3 && row <= 5:
		cube.rowMin = 3
		break
	default:
		cube.rowMin = 6
	}

	switch {
	case col >= 0 && col <= 2:
		cube.colMin = 0
		break
	case col >= 3 && col <= 5:
		cube.colMin = 3
		break
	default:
		cube.colMin = 6
	}

	cube.rowMax = cube.rowMin + 2
	cube.colMax = cube.colMin + 2

	for i := cube.rowMin; i <= cube.rowMax; i++ {
		for j := cube.colMin; j <= cube.colMax; j++ {
			element := s.grid[i][j]
			if element == s.emptyValue || i == row || j == col {
				continue
			}
			possibleValues[element] = true
		}
	}

	possibleValuesInt := make([]int, 0)
	for i := 1; i <= 9; i++ {
		if _, ok := possibleValues[i]; !ok {
			possibleValuesInt = append(possibleValuesInt, i)
		}
	}

	return possibleValuesInt
}
