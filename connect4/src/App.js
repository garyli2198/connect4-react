import React, { Component } from 'react';
import './App.css';

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: [[0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]],
      player: 'red',
    }
  }

  update_col(col) {
    let copyArray = this.state.board.slice();
    for (let r = 5; r >= 0; r--) {
      if (copyArray[r][col] === 0) {
        copyArray[r][col] = (this.state.player === 'red') ? 1 : 2;
        this.setState({ board: copyArray, player: (this.state.player === 'red') ? 'black' : 'red' });
        return;
      }
    }
  }

  //helper function
  check(i, j, k, l) {
    return i !== 0 && i === j && i === k && i === l;
  }
  

  checkWinner(board) {
    
    //vertical victories
    for (let c = 0; c < 6; c++) {
      for (let r = 0; r < 4; r++) {
        if (this.check(board[c][r], board[c][r + 1], board[c][r + 2], board[c][r + 3])) {
          if (board[c][r] === 1) {
            return "Red wins!"
          } else {
            return "Black wins!"
          }
        }
      }

    }

    //horizontal victories
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 3; c++) {
        if (this.check(board[c][r], board[c + 1][r], board[c + 2][r], board[c + 3][r])) {
          if (board[c][r] === 1) {
            return "Red wins!"
          } else {
            return "Black wins!"
          }
        }
      }
    }

    //diagonal right victories
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (this.check(board[c][r], board[c + 1][r + 1], board[c + 2][r + 2], board[c + 3][r + 3])) {
          if (board[c][r] === 1) {
            return "Red wins!"
          } else {
            return "Black wins!"
          }
        }
      }
    }

    //diagonal left victories
    for (let r = 0; r < 4; r++) {
      for (let c = 3; c < 6; c++) {
        if (this.check(board[c][r], board[c - 1][r + 1], board[c - 2][r + 2], board[c - 3][r + 3])) {
          if (board[c][r] === 1) {
            return "Red wins!"
          } else {
            return "Black wins!"
          }
        }
      }

    }

    return "";
  }
  render() {

    let { board } = this.state;
    let rows = [];
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        let contender = <div key={(row.toString() + ' ' + col.toString())} onClick={() => { this.update_col(col) }} className="null_tile tile"></div>;
        if (board[row][col] === 1) {
          contender = <div key={(row.toString() + ' ' + col.toString())} onClick={() => { this.update_col(col) }} className="red_tile tile"></div>
        } else if (board[row][col] === 2) {
          contender = <div key={(row.toString() + ' ' + col.toString())} onClick={() => { this.update_col(col) }} className="black_tile tile"></div>
        }
        rows.push(contender);
      }
    }
    console.log(board)
    let winner = board === undefined ? "" : this.checkWinner(board);
    if (winner !== "") {
      return (
        <div>
          {winner}
        </div>
      )
    }
    return (
      <div id="table">
        {rows}
      </div>
    )
  }
}



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Connect 4</h1>
        </header>
        <Board />
      </div>
    );
  }
}

export default App;
