"use strict";
import { Tile } from "./tile.js";

/**
 * Board class, which stores the game board and all related methods
 * @implements {Tile}
 */
export class Board {
  /**
   * Constructor creates a board, setting all necessary variables and creating a 2D array to store the tiles based on user input.
   * PRECONDITION: rows, columns, and numMines are within the correct ranges
   * POSTCONDITION: arr is now populated with tiles; rows, columns, minesTotal, winner, loser, minesNotFlagged, numFlags, noMineTiles, all have set values.
   * @param {number} numMines Number of mines on the board.
   * @param {number} rows Number of rows (height) on the board.
   * @param {number} columns Number of columns (length) on the board.
   */
  constructor(numMines, rows, columns) {
    /** Number of rows (height) on the board. Range: 2-45
     * @type {number} */
    this.rows = Number(rows);

    /** Number of columns (length) on the board. Range: 2-45
     * @type {number} */
    this.columns = Number(columns);

    /** Number of mines on the board. Range: 1-2024 (Depending on board size)
     * @type {number} */
    this.minesTotal = Number(numMines);

    /** 2D array storing all tile objects on the board.
     * @type {Tile[]} */
    this.arr = [];

    /** Number of mines that the user has flagged. Must be equal to minesTotal to win the game.
     * @type {number} */
    this.minesFlagged = 0;

    /** Flag that indicates if the player has won the game.
     * @type {boolean} */
    this.winner = false;

    /** Flag that indicates if the player has lost the game.
     * @type {boolean} */
    this.loser = false;

    /** Variable to keep track of mines left that haven't been flagged.
     *@type {number}*/
    this.minesNotFlagged = this.minesTotal;

    /** Variable to keep track of  number of  flags.
     *@type {number}*/
    this.numFlags = this.minesTotal;

    /** Variable to keep track of tiles without a mine in it.
     *@type {number}*/
    this.noMineTiles = rows * columns - numMines;

    for (let i = 0; i < rows; i++) {
      this.arr[i] = [];
      for (let j = 0; j < columns; j++) {
        this.arr[i][j] = new Tile(); // Adding default tiles
      }
    }
  }

  /**
   * This function plant the Mines inside the arr. The Number of Mines are given by player. Using Math.random() to ramdomly plant the Mines.
   * POSTCONDITION: A number of random tiles specified by minesTotal are now set to be mines.
   */
  plantMine() {
    let numMines = this.minesTotal;
    while (numMines > 0) {
      let i = Math.floor(Math.random() * this.rows); // Assign random i no larger than numRows
      let j = Math.floor(Math.random() * this.columns); // Assign random j no larger than numColumns
      if (this.arr[i][j].getMine() == false) {
        this.arr[i][j].setMine(true); // Reassign mine to equal true
        numMines = numMines - 1;
      }
    }
  }

  /**
   * This function change each tile's adjNum.
   * POSTCONDITION: All tiles that aren't mines have their adjacent number set to the number of mines adjacent to that tile on the game board.
   */
  plantAdjNum() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (this.arr[i][j].getMine() == false) {
          let tempAdjNum = 0;
          //"if, elseif" tiles on the edge of the board so we don't search outside the board. Starting top left and moving clockwise.

          //Top left tile
          if (i == 0 && j == 0) {
            //Right block check.
            if (this.arr[i][j + 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //Lower right block check.
            if (this.arr[i + 1][j + 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //Lower block check.
            if (this.arr[i + 1][j].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
          }
          //TopRow && 0<column<this.arr[j].length-1
          else if (i == 0 && j > 0 && j < this.arr[i].length - 1) {
            //Right block check.
            if (this.arr[i][j + 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //Lower right block check.
            if (this.arr[i + 1][j + 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //Lower block check.
            if (this.arr[i + 1][j].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //Lower left block check.
            if (this.arr[i + 1][j - 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //left block check.
            if (this.arr[i][j - 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
          }
          //Top Right tile
          else if (i == 0 && j == this.arr[i].length - 1) {
            //Lower block check.
            if (this.arr[i + 1][j].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //Lower left block check.
            if (this.arr[i + 1][j - 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //left block check.
            if (this.arr[i][j - 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
          }
          //Right column 0<i<this.arr[j].length-1
          else if (
            i > 0 &&
            j == this.arr[i].length - 1 &&
            i < this.arr.length - 1
          ) {
            //Upper left block check.
            if (this.arr[i - 1][j - 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //Upper block check.
            if (this.arr[i - 1][j].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //Lower block check.
            if (this.arr[i + 1][j].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //Lower left block check.
            if (this.arr[i + 1][j - 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //left block check.
            if (this.arr[i][j - 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
          }
          //Bottom right tile
          else if (i == this.arr.length - 1 && j == this.arr[i].length - 1) {
            //Upper left block check.
            if (this.arr[i - 1][j - 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //Upper block check.
            if (this.arr[i - 1][j].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //left block check.
            if (this.arr[i][j - 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
          }
          //Bottom row 0<j<this.arr[i].length-1
          else if (
            i == this.arr.length - 1 &&
            j > 0 &&
            j < this.arr[i].length - 1
          ) {
            //Upper left block check.
            if (this.arr[i - 1][j - 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //Upper block check.
            if (this.arr[i - 1][j].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //Upper right block check.
            if (this.arr[i - 1][j + 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //Right block check.
            if (this.arr[i][j + 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //left block check.
            if (this.arr[i][j - 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
          }
          //Bottom left tile
          else if (i == this.arr.length - 1 && j == 0) {
            //Upper block check.
            if (this.arr[i - 1][j].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //Upper right block check.
            if (this.arr[i - 1][j + 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //Right block check.
            if (this.arr[i][j + 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
          }
          //Left column 0<i<this.arr[j].length
          else if (i > 0 && j == 0 && i < this.arr.length - 1) {
            //Upper block check.
            if (this.arr[i - 1][j].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //Upper right block check.
            if (this.arr[i - 1][j + 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //Right block check.
            if (this.arr[i][j + 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //Lower right block check.
            if (this.arr[i + 1][j + 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //Lower block check.
            if (this.arr[i + 1][j].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
          }
          //Every tile inside of the outer rows and columns
          else if (
            i > 0 &&
            j > 0 &&
            i < this.arr.length - 1 &&
            j < this.arr[i].length - 1
          ) {
            //Upper left block check.
            if (this.arr[i - 1][j - 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //Upper block check.
            if (this.arr[i - 1][j].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //Upper right block check.
            if (this.arr[i - 1][j + 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //Right block check.
            if (this.arr[i][j + 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //Lower right block check.
            if (this.arr[i + 1][j + 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //Lower block check.
            if (this.arr[i + 1][j].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //Lower left block check.
            if (this.arr[i + 1][j - 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
            //left block check.
            if (this.arr[i][j - 1].getMine() == true) {
              tempAdjNum = tempAdjNum + 1;
            }
          }
          this.arr[i][j].setAdjacent(tempAdjNum);
        }
      }
    }
  }

  /**
   * This function changes one tile's flagged status, changes the number of flags and sets winner to true if all flags have been placed on all mines.
   * PRECONDITION: The tile is revealed.
   * POSTCONDITION: The tile clicked on either has a flag or doesn't, numFlags increments or decrements, minesNotFlagged increments or decrements (if a mine was the tile clicked on) and if the conditions are met for winning the game, set winner to true.
   * @param {number} row Row of tile being flagged.
   * @param {number} column Column of tile being flagged.
   * @return {boolean|null} The status of the tile - true for flagged, false for not flagged, null if nothing can be done
   */
  setFlag(row, column) {
    //Executes if tile is not currently flagged, revealed, and there are enough flags to place
    if (
      this.arr[row][column].flagged == false &&
      this.arr[row][column].getRevealed() == false &&
      this.numFlags > 0
    ) {
      this.arr[row][column].flagged = true;
      this.numFlags = this.numFlags - 1;
      /**
       *@desc decrease how many mines are left without a flag.
       */
      if (this.arr[row][column].isMine == true)
        this.minesNotFlagged = this.minesNotFlagged - 1;

      if (this.minesNotFlagged == 0 && this.numFlags == 0) this.winner = true; //Check if all mines are flagged

      return true;
    }
    //Executes if they already have flagged and want to remove the flag.
    else if (
      this.arr[row][column].flagged == true &&
      this.arr[row][column].getRevealed() == false
    ) {
      this.arr[row][column].flagged = false; //Remove flag
      this.numFlags = this.numFlags + 1;
      /**
       *@desc increase how many mines are left without a flag if player removes flag from a mine.
       */
      if (this.arr[row][column].isMine == true)
        this.minesNotFlagged = this.minesNotFlagged + 1;

      if (this.minesNotFlagged == 0 && this.numFlags == 0) this.winner = true; //Check if all mines are flagged

      return false;
    }
    //Executes if all the flags have been used or the tile has already been revealed
    else {
      return null;
    }
  }

  /**
   * When the status of the game is Win or Lose, call this function to reveal all the blocks.
   * POSTCONDITION: Every tile is set to be revealed.
   */
  showAllMine() {
    for (var i = 0; i < this.arr.length; i++) {
      for (var j = 0; j < this.arr[i].length; j++) {
        this.arr[i][j].revealed = true;
      }
    }
  }

  /**
   * This is a recursive function that will execute any one of block on the block been clicked. It will change all the tile's revealed = true, who have number 0. Even the tile set with flagged.
   * POSTCONDITION: If a mine was clicked, set loser to true. If a number not 0 was clicked, set just that tile to be revealed. If a 0 was clicked, every adjacent tile not a mine is revealed. All spaces that were flagged that are now revealed are not flagged anymore.
   */
  revealBombs() {
    let i = 2;
    let interval = setInterval(function(){
        if(i == 0){
            clearInterval(interval)
        }
        document.getElementById('cheatButton').innerHTML = i.toString()
        i = i - 1
    }, 1000)
    document.getElementById('cheatButton').innerHTML = '3'
    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          if (this.arr[i][j].getMine()) {
            document.getElementById(i * this.columns + j).style.backgroundColor =
              "Red";
          }
        }
      }
    setTimeout(this.resetCheatMode, 3000, this.rows * this.columns);
  }

  /**
   * Resets the coloring on bombs that were revealed while cheat mode was active.
   * @param {number} numOfCells The number of cells to reset. This should always be the number of cells in the board.
   */
  resetCheatMode(numOfCells) {

    for (let i = 0; i < numOfCells; i++) {
      document.getElementById(i).style.backgroundColor = "";
    }
  }

  /**
   * Reveal values and bombs (if applicable) when a user clicks on a cell.
   * @param {number} i The vertical index, starting at 0 from the top of the board, around which to reveal. 
   * @param {*} j The horizontal index, starting at 0 from the left of the board, around which to reveal.
   */
  clickReveal(i, j) {
    let self = this;

    if (this.arr[i][j].getMine() == true) {
      this.arr[i][j].revealed = true;
      this.loser = true; //If the click by player and it was a bomb, the game is over.
    } else {
      if (this.arr[i][j].flagged == true) {
        this.setFlag(i, j);
      }

      if (this.arr[i][j].adjNum > 0 && this.arr[i][j].adjNum < 9) {
        if (this.arr[i][j].revealed == false) {
          if (this.arr[i][j].flagged == true) {
            this.setFlag(i, j);
          }
          this.arr[i][j].revealed = true;
        }
      } else if (this.arr[i][j].adjNum == 0) {
        if (this.arr[i][j].revealed == false) {
          if (this.arr[i][j].flagged == true) {
            this.setFlag(i, j);
          }
          this.arr[i][j].revealed = true;

          if (
            i > 0 &&
            j > 0 &&
            i < this.arr.length - 1 &&
            j < this.arr[i].length - 1
          ) {
            //Upper left block check.
            if (this.arr[i - 1][j - 1].adjNum == 0) {
              self.clickReveal(i - 1, j - 1);
            } else if (
              this.arr[i - 1][j - 1].adjNum < 9 &&
              this.arr[i - 1][j - 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i - 1, j - 1);
              }

              this.arr[i - 1][j - 1].revealed = true;
            }
            //Upper block check.
            if (this.arr[i - 1][j].adjNum == 0) {
              self.clickReveal(i - 1, j);
            } else if (
              this.arr[i - 1][j].adjNum < 9 &&
              this.arr[i - 1][j].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i - 1, j);
              }

              this.arr[i - 1][j].revealed = true;
            }
            //Upper right block check.
            if (this.arr[i - 1][j + 1].adjNum == 0) {
              self.clickReveal(i - 1, j + 1);
            } else if (
              this.arr[i - 1][j + 1].adjNum < 9 &&
              this.arr[i - 1][j + 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i - 1, j + 1);
              }

              this.arr[i - 1][j + 1].revealed = true;
            }
            //left block check.
            if (this.arr[i][j - 1].adjNum == 0) {
              self.clickReveal(i, j - 1);
            } else if (
              this.arr[i][j - 1].adjNum < 9 &&
              this.arr[i][j - 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i, j - 1);
              }

              this.arr[i][j - 1].revealed = true;
            }
            //Right block check.
            if (this.arr[i][j + 1].adjNum == 0) {
              self.clickReveal(i, j + 1);
            } else if (
              this.arr[i][j + 1].adjNum < 9 &&
              this.arr[i][j + 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i, j + 1);
              }

              this.arr[i][j + 1].revealed = true;
            }
            //Lower left block check.
            if (this.arr[i + 1][j - 1].adjNum == 0) {
              self.clickReveal(i + 1, j - 1);
            } else if (
              this.arr[i + 1][j - 1].adjNum < 9 &&
              this.arr[i + 1][j - 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i + 1, j - 1);
              }

              this.arr[i + 1][j - 1].revealed = true;
            }
            //Lower block check.
            if (this.arr[i + 1][j].adjNum == 0) {
              self.clickReveal(i + 1, j);
            } else if (
              this.arr[i + 1][j].adjNum < 9 &&
              this.arr[i + 1][j].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i + 1, j);
              }

              this.arr[i + 1][j].revealed = true;
            }
            //Lower right block check.
            if (this.arr[i + 1][j + 1].adjNum == 0) {
              self.clickReveal(i + 1, j + 1);
            } else if (
              this.arr[i + 1][j + 1].adjNum < 9 &&
              this.arr[i + 1][j + 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i + 1, j + 1);
              }

              this.arr[i + 1][j + 1].revealed = true;
            }
          }
          //check speical left column without two corner blocks							//fixed
          else if (i > 0 && i < this.arr.length - 1 && j == 0) {
            //Upper block check.
            if (this.arr[i - 1][j].adjNum == 0) {
              self.clickReveal(i - 1, j);
            } else if (
              this.arr[i - 1][j].adjNum < 9 &&
              this.arr[i - 1][j].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i - 1, j);
              }

              this.arr[i - 1][j].revealed = true;
            }
            //Upper right block check.
            if (this.arr[i - 1][j + 1].adjNum == 0) {
              self.clickReveal(i - 1, j + 1);
            } else if (
              this.arr[i - 1][j + 1].adjNum < 9 &&
              this.arr[i - 1][j + 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i - 1, j + 1);
              }

              this.arr[i - 1][j + 1].revealed = true;
            }
            //Right block check.
            if (this.arr[i][j + 1].adjNum == 0) {
              self.clickReveal(i, j + 1);
            } else if (
              this.arr[i][j + 1].adjNum < 9 &&
              this.arr[i][j + 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i, j + 1);
              }

              this.arr[i][j + 1].revealed = true;
            }
            //Lower block check.
            if (this.arr[i + 1][j].adjNum == 0) {
              self.clickReveal(i + 1, j);
            } else if (
              this.arr[i + 1][j].adjNum < 9 &&
              this.arr[i + 1][j].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i + 1, j);
              }

              this.arr[i + 1][j].revealed = true;
            }
            //Lower right block check.
            if (this.arr[i + 1][j + 1].adjNum == 0) {
              self.clickReveal(i + 1, j + 1);
            } else if (
              this.arr[i + 1][j + 1].adjNum < 9 &&
              this.arr[i + 1][j + 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i + 1, j + 1);
              }

              this.arr[i + 1][j + 1].revealed = true;
            }
          }
          //check speical Lower row
          else if (
            i == this.arr.length - 1 &&
            j > 0 &&
            j < this.arr[i].length - 1
          ) {
            //fixed
            //Upper left block check.
            if (this.arr[i - 1][j - 1].adjNum == 0) {
              self.clickReveal(i - 1, j - 1);
            } else if (
              this.arr[i - 1][j - 1].adjNum < 9 &&
              this.arr[i - 1][j - 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i - 1, j - 1);
              }

              this.arr[i - 1][j - 1].revealed = true;
            }
            //Upper block check.
            if (this.arr[i - 1][j].adjNum == 0) {
              self.clickReveal(i - 1, j);
            } else if (
              this.arr[i - 1][j].adjNum < 9 &&
              this.arr[i - 1][j].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i - 1, j);
              }

              this.arr[i - 1][j].revealed = true;
            }
            //Upper right block check.
            if (this.arr[i - 1][j + 1].adjNum == 0) {
              self.clickReveal(i - 1, j + 1);
            } else if (
              this.arr[i - 1][j + 1].adjNum < 9 &&
              this.arr[i - 1][j + 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i - 1, j + 1);
              }

              this.arr[i - 1][j + 1].revealed = true;
            }
            //left block check.
            if (this.arr[i][j - 1].adjNum == 0) {
              self.clickReveal(i, j - 1);
            } else if (
              this.arr[i][j - 1].adjNum < 9 &&
              this.arr[i][j - 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i, j - 1);
              }

              this.arr[i][j - 1].revealed = true;
            }
            //Right block check.
            if (this.arr[i][j + 1].adjNum == 0) {
              self.clickReveal(i, j + 1);
            } else if (
              this.arr[i][j + 1].adjNum < 9 &&
              this.arr[i][j + 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i, j + 1);
              }

              this.arr[i][j + 1].revealed = true;
            }
          }
          //check speical right column
          else if (
            i > 0 &&
            i < this.arr.length - 1 &&
            j == this.arr[i].length - 1
          ) {
            //fixed
            //Upper left block check.
            if (this.arr[i - 1][j - 1].adjNum == 0) {
              self.clickReveal(i - 1, j - 1);
            } else if (
              this.arr[i - 1][j - 1].adjNum < 9 &&
              this.arr[i - 1][j - 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i - 1, j - 1);
              }

              this.arr[i - 1][j - 1].revealed = true;
            }
            //Upper block check.
            if (this.arr[i - 1][j].adjNum == 0) {
              self.clickReveal(i - 1, j);
            } else if (
              this.arr[i - 1][j].adjNum < 9 &&
              this.arr[i - 1][j].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i - 1, j);
              }

              this.arr[i - 1][j].revealed = true;
            }
            //left block check.
            if (this.arr[i][j - 1].adjNum == 0) {
              self.clickReveal(i, j - 1);
            } else if (
              this.arr[i][j - 1].adjNum < 9 &&
              this.arr[i][j - 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i, j - 1);
              }

              this.arr[i][j - 1].revealed = true;
            }
            //Lower left block check.
            if (this.arr[i + 1][j - 1].adjNum == 0) {
              self.clickReveal(i + 1, j - 1);
            } else if (
              this.arr[i + 1][j - 1].adjNum < 9 &&
              this.arr[i + 1][j - 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i + 1, j - 1);
              }

              this.arr[i + 1][j - 1].revealed = true;
            }
            //Lower block check.
            if (this.arr[i + 1][j].adjNum == 0) {
              self.clickReveal(i + 1, j);
            } else if (
              this.arr[i + 1][j].adjNum < 9 &&
              this.arr[i + 1][j].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i + 1, j);
              }

              this.arr[i + 1][j].revealed = true;
            }
          }
          //check speical Upper row												//fixed
          else if (i == 0 && j > 0 && j < this.arr[i].length - 1) {
            //left block check.
            if (this.arr[i][j - 1].adjNum == 0) {
              self.clickReveal(i, j - 1);
            } else if (
              this.arr[i][j - 1].adjNum < 9 &&
              this.arr[i][j - 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i, j - 1);
              }

              this.arr[i][j - 1].revealed = true;
            }
            //Right block check.
            if (this.arr[i][j + 1].adjNum == 0) {
              self.clickReveal(i, j + 1);
            } else if (
              this.arr[i][j + 1].adjNum < 9 &&
              this.arr[i][j + 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i, j + 1);
              }

              this.arr[i][j + 1].revealed = true;
            }
            //Lower left block check.
            if (this.arr[i + 1][j - 1].adjNum == 0) {
              self.clickReveal(i + 1, j - 1);
            } else if (
              this.arr[i + 1][j - 1].adjNum < 9 &&
              this.arr[i + 1][j - 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i + 1, j - 1);
              }

              this.arr[i + 1][j - 1].revealed = true;
            }
            //Lower block check.
            if (this.arr[i + 1][j].adjNum == 0) {
              self.clickReveal(i + 1, j);
            } else if (
              this.arr[i + 1][j].adjNum < 9 &&
              this.arr[i + 1][j].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i + 1, j);
              }

              this.arr[i + 1][j].revealed = true;
            }
            //Lower right block check.
            if (this.arr[i + 1][j + 1].adjNum == 0) {
              self.clickReveal(i + 1, j + 1);
            } else if (
              this.arr[i + 1][j + 1].adjNum < 9 &&
              this.arr[i + 1][j + 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i + 1, j + 1);
              }

              this.arr[i + 1][j + 1].revealed = true;
            }
          }
          //Upper left corner
          else if (i == 0 && j == 0) {
            //Right block check.
            if (this.arr[i][j + 1].adjNum == 0) {
              self.clickReveal(i, j + 1);
            } else if (
              this.arr[i][j + 1].adjNum < 9 &&
              this.arr[i][j + 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i, j + 1);
              }

              this.arr[i][j + 1].revealed = true;
            }
            //Lower block check.
            if (this.arr[i + 1][j].adjNum == 0) {
              self.clickReveal(i + 1, j);
            } else if (
              this.arr[i + 1][j].adjNum < 9 &&
              this.arr[i + 1][j].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i + 1, j);
              }

              this.arr[i + 1][j].revealed = true;
            }
            //Lower right block check.
            if (this.arr[i + 1][j + 1].adjNum == 0) {
              self.clickReveal(i + 1, j + 1);
            } else if (
              this.arr[i + 1][j + 1].adjNum < 9 &&
              this.arr[i + 1][j + 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i + 1, j + 1);
              }

              this.arr[i + 1][j + 1].revealed = true;
            }
          }
          //Upper right corner
          else if (i == 0 && j == this.arr[i].length - 1) {
            //left block check.
            if (this.arr[i][j - 1].adjNum == 0) {
              self.clickReveal(i, j - 1);
            } else if (
              this.arr[i][j - 1].adjNum < 9 &&
              this.arr[i][j - 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i, j - 1);
              }

              this.arr[i][j - 1].revealed = true;
            }
            //Lower left block check.
            if (this.arr[i + 1][j - 1].adjNum == 0) {
              self.clickReveal(i + 1, j - 1);
            } else if (
              this.arr[i + 1][j - 1].adjNum < 9 &&
              this.arr[i + 1][j - 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i + 1, j - 1);
              }

              this.arr[i + 1][j - 1].revealed = true;
            }
            //Lower block check.
            if (this.arr[i + 1][j].adjNum == 0) {
              self.clickReveal(i + 1, j);
            } else if (
              this.arr[i + 1][j].adjNum < 9 &&
              this.arr[i + 1][j].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i + 1, j);
              }

              this.arr[i + 1][j].revealed = true;
            }
          }
          //Lower left corner
          else if (i == this.arr.length - 1 && j == 0) {
            //Upper block check.
            if (this.arr[i - 1][j].adjNum == 0) {
              self.clickReveal(i - 1, j);
            } else if (
              this.arr[i - 1][j].adjNum < 9 &&
              this.arr[i - 1][j].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i - 1, j);
              }

              this.arr[i - 1][j].revealed = true;
            }
            //Upper right block check.
            if (this.arr[i - 1][j + 1].adjNum == 0) {
              self.clickReveal(i - 1, j + 1);
            } else if (
              this.arr[i - 1][j + 1].adjNum < 9 &&
              this.arr[i - 1][j + 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i - 1, j + 1);
              }

              this.arr[i - 1][j + 1].revealed = true;
            }
            //Right block check.
            if (this.arr[i][j + 1].adjNum == 0) {
              self.clickReveal(i, j + 1);
            } else if (
              this.arr[i][j + 1].adjNum < 9 &&
              this.arr[i][j + 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i, j + 1);
              }

              this.arr[i][j + 1].revealed = true;
            }
          }
          //Lower right corner
          else if (i == this.arr.length - 1 && j == this.arr[i].length - 1) {
            //Upper left block check.
            if (this.arr[i - 1][j - 1].adjNum == 0) {
              self.clickReveal(i - 1, j - 1);
            } else if (
              this.arr[i - 1][j - 1].adjNum < 9 &&
              this.arr[i - 1][j - 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i - 1, j - 1);
              }

              this.arr[i - 1][j - 1].revealed = true;
            }
            //Upper block check.
            if (this.arr[i - 1][j].adjNum == 0) {
              self.clickReveal(i - 1, j);
            } else if (
              this.arr[i - 1][j].adjNum < 9 &&
              this.arr[i - 1][j].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i - 1, j);
              }

              this.arr[i - 1][j].revealed = true;
            }
            //left block check.
            if (this.arr[i][j - 1].adjNum == 0) {
              self.clickReveal(i, j - 1);
            } else if (
              this.arr[i][j - 1].adjNum < 9 &&
              this.arr[i][j - 1].revealed == false
            ) {
              if (this.arr[i][j].flagged == true) {
                this.setFlag(i, j - 1);
              }

              this.arr[i][j - 1].revealed = true;
            }
          }
        }
      }
    }
  }

  /**
   * Checks the revealed status of a tile on the game board specified by the coordinates.
   * @param {number} row Row coordinate for checked tile.
   * @param {number} column Column coordinate for checked tile.
   * @return {boolean} Revealed status of the tile being checked.
   */
  isTileRevealed(row, column) {
    return this.arr[row][column].revealed;
  }

  /**
   * Finds the number of mines adjacent to the checked tile.
   * @param {number} row Row coordinate for checked tile.
   * @param {number} column Column coordinate for checked tile.
   * @return {boolean} Mines adjacent to the tile being checked.
   */
  getTileAdj(row, column) {
    return this.arr[row][column].getAdjacent();
  }
}
