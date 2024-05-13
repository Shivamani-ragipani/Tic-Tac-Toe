import {useState} from 'react';

export default function Player({initialName, symbol, isActive, onChangeName}){

    const [playerName , setplayerName] = useState(initialName);
    const [IsEditing, setIsEditing] = useState(false);

    function HandleEditClick(){
        setIsEditing((editing) => !editing);

        if(IsEditing){
        onChangeName(symbol, playerName);
        }
    }

    function HandleChangeName(event){
        setplayerName(event.target.value);
    }
    let editPlayerName = <span className="player-name">{playerName}</span>;

     if(IsEditing){
        editPlayerName = (<input type="text" required value={playerName} onChange={HandleChangeName}/>);
    }

    return ( 
    
    <li className={isActive ? 'active' : undefined}>
    <span className="player">
    {editPlayerName}
        <span className="player-symbol">{symbol}</span>
        </span>
    <button onClick={HandleEditClick}>{IsEditing?'Save':'Edit'}</button>
  </li>
    );
}