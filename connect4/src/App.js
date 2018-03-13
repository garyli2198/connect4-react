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
      player: 'Red',
      winner: ''
    }
    this.initialState = this.state;
  }

  restart(){
    window.location.reload();
  }

  update_col(col) {
    if(this.state.winner === ''){
      let copyArray = this.state.board.slice();
      for (let r = 5; r >= 0; r--) {
        if (copyArray[r][col] === 0) {
          copyArray[r][col] = (this.state.player === 'Red') ? 1 : 2;
          let win = this.checkWinner(this.state.board);
          if(win !== ''){
            this.setState({winner:win});
            return;
          }
          this.setState({ board: copyArray, player: (this.state.player === 'Red') ? 'Black' : 'Red' });
          return;
        }
      }
    }
  }

  //helper function
  check(a, b, c, d) {
    return a !== 0 && a === b && a === c && a === d;
  }


  checkWinner(board) {

    //vertical victories
    for (let c = 0; c < 7; c++) {
      for (let r = 0; r < 3; r++) {
        if (this.check(board[r][c], board[r + 1][c], board[r + 2][c], board[r + 3][c])) {
          if (board[r][c] === 1) {
            return "Red wins!"
          } else {
            return "Black wins!"
          }
        }
      }

    }

    //horizontal victories
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (this.check(board[r][c], board[r][c + 1], board[r][c + 2], board[r][c + 3])) {
          if (board[r][c] === 1) {
            return "Red wins!"
          } else {
            return "Black wins!"
          }
        }
      }
    }

    //diagonal right victories
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        if (this.check(board[r][c], board[r + 1][c + 1], board[r + 2][c + 2], board[r + 3][c + 3])) {
          if (board[r][c] === 1) {
            return "Red wins!"
          } else {
            return "Black wins!"
          }
        }
      }
    }

    //diagonal left victories
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (this.check(board[r][c], board[r - 1][c + 1], board[r - 2][c + 2], board[r - 3][c + 3])) {
          if (board[r][c] === 1) {
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
          contender = <div key={(row.toString() + ' ' + col.toString())} onClick={() => { this.update_col(col) }} className="red_tile tile fadeIn"></div>
        } else if (board[row][col] === 2) {
          contender = <div key={(row.toString() + ' ' + col.toString())} onClick={() => { this.update_col(col) }} className="black_tile tile fadeIn"></div>
        }
        rows.push(contender);
      }
    }


    if (this.state.winner !== "") {
      return (
        <div>
          <div id="winner">
            {this.state.winner}
          </div>
          <div id="table">
            {rows}
          </div>
          <button id="restart" onClick={this.restart}>Restart</button>
        </div>
      )
    }
    return (
      <div>
        <div id="turn">
          {this.state.player}'s turn
        </div>
        <div id="table">
          {rows}
        </div>
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
