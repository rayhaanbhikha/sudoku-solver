class Box {
  constructor(i, j, value, sudokuPuzzle) {
    this.i = i;
    this.j = j;
    this._value = Number(value);
    this.sudokuPuzzle = sudokuPuzzle;
    // this.value = this.sudokuPuzzle[i][j];

    // top boxes
    if (this.i >= 0 && this.i <= 2) {
      this.minI = 0;
      this.maxI = 2;
      if (this.j >= 0 && this.j <= 2) {
        this.minJ = 0;
        this.maxJ = 2;
      } else if (this.j > 2 && this.j <= 5) {
        this.minJ = 3;
        this.maxJ = 5;
      } else {
        this.minJ = 6;
        this.maxJ = 8;
      }
      // middle boxes
    } else if (this.i > 2 && this.i <= 5) {
      this.minI = 3;
      this.maxI = 5;
      if (this.j >= 0 && this.j <= 2) {
        this.minJ = 0;
        this.maxJ = 2;
        this.quadrant = 4;
      } else if (this.j > 2 && this.j <= 5) {
        this.minJ = 3;
        this.maxJ = 5;
      } else {
        this.minJ = 6;
        this.maxJ = 8;
      }
    } else {
      this.minI = 6;
      this.maxI = 8;
      if (this.j >= 0 && this.j <= 2) {
        this.minJ = 0;
        this.maxJ = 2;
        this.quadrant = 7;
      } else if (this.j > 2 && this.j <= 5) {
        this.minJ = 3;
        this.maxJ = 5;
      } else {
        this.minJ = 6;
        this.maxJ = 8;
      }
    }
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = Number(newValue);
  }

  computePossibleValues() {
    const valuesThatAlreadyExist = new Set();
    // read column.
    for (let i = 0; i < this.sudokuPuzzle.length; i++) {
      if (i === this.i) continue;
      const element = this.sudokuPuzzle[i][this.j].value
      if(element !== 0) valuesThatAlreadyExist.add(element);
    }

    // read row.
    for (let j = 0; j < this.sudokuPuzzle.length; j++) {
      if (j === this.j) continue;
      const element = this.sudokuPuzzle[this.i][j].value;
      if(element !== 0) valuesThatAlreadyExist.add(element);
    }

    // read inner cube.
    for (let i = this.minI; i <= this.maxI; i++) {
      for (let j = this.minJ; j <= this.maxJ; j++) {
        if (j === this.j || i === this.i) continue;
        const element = this.sudokuPuzzle[i][j].value;
        if(element !== 0) valuesThatAlreadyExist.add(element);
      }
    }

    const possibleValues = [];
    // compute possible values;
    for (let i = 1; i <= 9; i++) {
      if (!valuesThatAlreadyExist.has(i)) {
        possibleValues.push(i);
      }
    }
    // console.log(valuesThatAlreadyExist, possibleValues);
    return possibleValues;
  }
}
module.exports = {
  Box
}