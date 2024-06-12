export default function Log({turns, players}){
    return(
        <ol id="log">
          {turns.map((turn, turnIndex) => <li key={`${turn.square.rowIndex}${turn.square.colIndex}`} >{1 + turnIndex}.     {players[turn.player]} selected {turn.square.rowIndex}, {turn.square.colIndex}</li>)}
        </ol>
    );
}