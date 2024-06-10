import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function GameBoard({onSelectSquare, turns}){
    let gameBoard = [...initialGameBoard.map(innerArray => [...innerArray])]
    for(const turn of turns){
        const {square, player} = turn;
        const {rowIndex, colIndex} = square;
        gameBoard[rowIndex][colIndex] = player;
    }
    // const handleSymbolChange = (rowIndex, colIndex)=>{
    //     let isUpdated = gameBoard[rowIndex][colIndex] === null ? true : false;
    
    //     setGameBoard((prevGameBoard) => {
    //         const updatedGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         if(updatedGameBoard[rowIndex][colIndex] === null){
    //             updatedGameBoard[rowIndex][colIndex] = activePlayer;
    //         }
            
    //         return updatedGameBoard;
    //     });
    //     console.log(isUpdated);
    //     if(isUpdated){
    //         onSelectSquare();
    //     }
    // }
    return(
        <ol id="game-board">
           {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                    <button onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                </li>)}
            </ol>
           </li>)}
        </ol>
    );
}