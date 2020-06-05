import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { makeGivens, bfCallback, bruteForce } from './sudoku.js';

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function Square(props) {
  return (
    <td
      className={props.selected ? "square selected" : "square"}
      onClick={props.onClick}
      key={props.val}>
      {props.value}
    </td>
  );
}

function Undo(props) {
  return (
    <button
      className="undo"
      onClick={props.onClick}>
      Undo
    </button>
  )
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        selected={this.props.selected === i}
        onClick={() => this.props.squareClick(i)}
        val={i} />
    );
  }

  makeRows() {
    const rows = [];
    for (var i = 0; i < 9; i++) {
      const row = [];
      for (var j = 0; j < 9; j++) {
        row.push(this.renderSquare(i * 9 + j));
      }
      rows.push(<tr key={i}>{row}</tr>);
    }
    return rows;
  }

  render() {
    return (
      <div>
        <table className="board">
          <tbody>
            {this.makeRows()}
          </tbody>
        </table>
      </div>
    )
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [Array(81).fill(null)],
      selected: null,
      stepNumber: 0,
    };
    this.keyIn = this.keyIn.bind(this);
    //this.bfSolveCallback = this.keyIn.bind(this);
  }

  squareClick(i) {
    this.setState({
      selected: i,
    });
  }

  undoClick() {
    console.log('undo');
    this.setState(state => {
      const newStep = state.stepNumber === 0 ? 0 : state.stepNumber - 1;
      return {
        stepNumber: newStep,
        history: state.history.slice(0, newStep + 1),
      }
    });
  }

  keyIn(e) {
    if (!e) {
      return;
    }
    if (!isNaN(e.key) && e.key !== '0') {
      console.log('key in');
      this.setState(state => {
        const squares = state.history[state.stepNumber].slice();
        squares[state.selected] = parseInt(e.key);
        return {
          history: state.history.concat([squares]),
          stepNumber: state.stepNumber + 1,
        };
      });
    } else if (e.key === 'Backspace') {
      this.setState(state => {
        const squares = state.history[state.stepNumber].slice();
        squares[state.selected] = null;
        return {
          history: state.history.concat([squares]),
          stepNumber: state.stepNumber + 1,
        }
      });
    }
  }

  updateNums(newNums) {
    //sleep(50);
    this.setState(state => ({
      history: state.history.concat([newNums]),
      stepNumber: state.stepNumber + 1,
    }));
  }

  bfSolveCallback() {
    console.log('starting solve');
    bfCallback({
      nums: this.state.history[this.state.stepNumber],
      givens: makeGivens(this.state.history[this.state.stepNumber]),
    },
      x => this.updateNums(x));
  }

  bfSolve() {
    console.log('solving');
    const solved = bruteForce({
      nums: this.state.history[this.state.stepNumber],
      givens: makeGivens(this.state.history[this.state.stepNumber]),
    })
    this.setState(state => ({
      history: state.history.concat([solved]),
      stepNumber: state.stepNumber + 1,
    }));
  }

  clear() {
    this.setState({
      history: [Array(81).fill(null)],
      selected: null,
      stepNumber: 0,
    });
  }

  componentDidMount() {
    window.addEventListener("keydown", this.keyIn);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.keyIn);
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.history[this.state.history.length - 1]}
            selected={this.state.selected}
            squareClick={(i) => this.squareClick(i)}
          />
        </div>
        <Undo onClick={() => this.undoClick()} />
        <button
          className="clear"
          onClick={() => this.clear()}>
          Clear
        </button>
        <button
          className="solve"
          onClick={() => this.bfSolve()}>
          Solve
        </button>
      </div>
    )
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
