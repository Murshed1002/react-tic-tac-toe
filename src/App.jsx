import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
function App() {

  const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);

  const handleSquareSelect = (rowIndex, colIndex)=>{
    setGameTurns((prevTurns)=>{
      if(prevTurns.length == 0){
        return [{square : {rowIndex : rowIndex, colIndex : colIndex}, player : activePlayer}]
      }
      return [{square : {rowIndex : rowIndex, colIndex : colIndex}, player : activePlayer}, ...prevTurns];
    });
    setActivePlayer(currentActivePlayer => currentActivePlayer === "X" ? "O" : "X");
  }

  return (
    <main>
      <div id = "game-container">
        <ol id="players" className="highlight-player">
          <Player activeStatus={activePlayer === "X" ? "active" : null} symbol = "X"/>
          <Player activeStatus={activePlayer === "O" ? "active" : null} symbol = "O"/>
        </ol>
        <GameBoard onSelectSquare={handleSquareSelect} turns = {gameTurns}/>
      </div>
      <Log turns = {gameTurns} />  
    </main>
  )
}

export default App
