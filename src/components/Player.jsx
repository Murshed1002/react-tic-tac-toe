import { useState } from "react";
export default function Player({symbol, activeStatus, initialName, setPlayer}){

    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setisEditing] = useState(false);

    const handleChange = ({target})=>{
        setPlayerName(target.value);
    }

    if(!isEditing){
        setPlayer(playerName, symbol);
    }
    const handleClick = ()=>{
        setisEditing((isEditing) => !isEditing); // best practice to pass inside fucntion which will gurantee always giving the latest state instead of scheduling the state update
    }
    return (
        <li className={activeStatus}>
           
           <span className="player">
            {isEditing ? <input value={playerName} placeholder="Enter players name" type="text" onChange={handleChange}/> : <span className="player-name">{playerName}</span>}
            <span className="player-symbol">{symbol}</span>
           </span>
           <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}