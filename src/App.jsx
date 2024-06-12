import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurns){
  let currentActivePlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentActivePlayer = 'O';
  }
  return currentActivePlayer;

}

let players = {
  X : "Player 1",
  O : "Player 2"
}


function setPlayerName(playerName, symbol){
  players = {
    ...players,
    [symbol] : playerName
  }
}

function findWinner(gameBoard){
  for(const combination of WINNING_COMBINATIONS){
    const firstSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column];
    if(firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol){
      return players[firstSymbol];
    }
  }
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...initialGameBoard.map(innerArray => [...innerArray])]
    for(const turn of gameTurns){
        const {square, player} = turn;
        const {rowIndex, colIndex} = square;
        gameBoard[rowIndex][colIndex] = player;
    }
  return gameBoard;
}


function App() {
  let winner;
  function handleRematch(){
    setGameTurns(() => []);
  }
  const [gameTurns, setGameTurns] = useState([]);
  const currentActivePlayer = deriveActivePlayer(gameTurns);
  const handleSquareSelect = (rowIndex, colIndex)=>{
    setGameTurns((prevTurns)=>{
      const currentActivePlayer = deriveActivePlayer(prevTurns);
      return [{square : {rowIndex : rowIndex, colIndex : colIndex}, player : currentActivePlayer}, ...prevTurns];
    });
  }

  let gameBoard = deriveGameBoard(gameTurns);
  winner = findWinner(gameBoard);

  const hasDraw = gameTurns.length == 9 && !winner;

  return (
    <main>
      <div id = "game-container">
        <ol id="players" className="highlight-player">
          <Player initialName = {players.X} setPlayer = {setPlayerName} activeStatus={currentActivePlayer === 'X' ? "active" : null} symbol = "X"/>
          <Player initialName = {players.O} setPlayer = {setPlayerName} activeStatus={currentActivePlayer === 'O' ? "active" : null} symbol = "O"/>
        </ol>
        {(hasDraw || winner) && <GameOver winner = {winner} onRematch = {()=> handleRematch()}/>}
        <GameBoard onSelectSquare={handleSquareSelect} board = {gameBoard}/>
      </div>
      <Log turns = {gameTurns} players={players}/>
    </main>
  )
}

export default App
