import React from 'react';
import Board from '../components/Board'

export default class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history : [{squares: Array(9).fill(null), xIsnext : true}],
            currentIndex : 0,
            winner: false
        }
    }

    handleClick(i) {
        let currentHistory = this.state.history[this.state.currentIndex];
        let squares = [...currentHistory.squares];

        if (this.state.winner || squares[i]) {
            return;
        }

        squares[i] = currentHistory.xIsnext ? "X" : "O";

        let history = this.state.history.slice(0, this.state.currentIndex + 1);

        history.push({ squares, xIsnext: !currentHistory.xIsnext })

        this.setState({
            history,
            winner  : this.calculateWinner(squares),
            currentIndex: this.state.currentIndex + 1 
        });
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];
        
        return lines.some(item => {
            return  squares[item[0]] && 
                    squares[item[0]] === squares[item[1]] && 
                    squares[item[1]]=== squares[item[2]]
        })
    }

    renderHistory() {
        return [...this.state.history].map((square, index) => {
            return (
                <li key={index}>
                    <button onClick={() => { this.goToMove(index) }}>
                        {index ? `Go to move #${index}` : 'Go to move start'}
                    </button>
                </li>
            )
        })
    }

    goToMove(index) {
        let winner = (index === this.state.history.length - 1) && this.state.winner 
        
        this.setState({
            currentIndex: index,
            winner,
        })
    }

    render() {        
        let currentHistory = this.state.history[this.state.currentIndex]
        let currentPlayer = currentHistory.xIsnext

        let status = this.state.winner ? `Winner: ${ currentPlayer ? "O" : "X"}` : `Next Player: ${currentPlayer ? "X" : "O"}`
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        handleClick = { this.handleClick.bind(this) }
                        squares = { currentHistory.squares }
                    />
                </div>
                <div className="game-info">
                    <div>{ status }</div>
                    <ol>
                        { this.renderHistory() }
                    </ol>
                </div>
            </div>
        )
    }
}