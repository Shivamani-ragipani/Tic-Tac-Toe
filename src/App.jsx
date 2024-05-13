import { useState } from 'react';
import Player from './Components/Player.jsx';
import GameBoard from './Components/GameBoard.jsx';
import Log from './Components/Log.jsx';
import GameOver from './Components/GameOver.jsx'
import { WINNING_COMBINATIONS } from './Components/Winning_Combinations.js';


const initialGame = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameturns){
  let currentPlayer = 'X';

      if(gameturns.length>0 && gameturns[0].player === 'X'){
        currentPlayer = 'O';
      }

      return currentPlayer;
}

function App() {
  const [players, setplayers] = useState({
    'X': 'player 1',
    'O': 'player 2',
  });
  const [gameturns, setGameturns] = useState([]);
//const [ ActivePlayer, setactiveplayer]  = useState('X');




  const ActivePlayer = deriveActivePlayer(gameturns);

  function HandleSelectSquare2(rowIndex, colIndex) {
   // setactiveplayer((curActiveplayer) => curActiveplayer === 'X' ? 'O' : 'X');  
    setGameturns(prevTurns => {
     const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{ square: {row: rowIndex, col: colIndex}, player: currentPlayer},...prevTurns];

      return updatedTurns;
    });
  
  }
  let gameboard = [...initialGame.map(array => [...array])];

  for(const turn of gameturns){
      const { square, player } = turn;
      const { row, col } =square;

      gameboard[row][col] = player;
  }
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameboard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameboard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameboard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  function HandleRestart(){
    setGameturns([]);
  }

  let hasdraw = gameturns.length == 9 && !winner;

  function HandlePlayerNameChange(symbol, newName){
    setplayers(prevplayers => {
      return {
        ...prevplayers ,
        [symbol]: newName
      };
    });
  }
  
  return (
    <>
    <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
       <Player initialName="player 1" symbol="X" isActive={ActivePlayer === 'X'} onChangeName = {HandlePlayerNameChange} />
       <Player initialName="player 2" symbol="O" isActive={ActivePlayer === 'O'} onChangeName = {HandlePlayerNameChange} />
        
      </ol>
      {(winner || hasdraw) && <GameOver winner={winner} onRestart={HandleRestart}/>}
    <GameBoard onselectSquare={HandleSelectSquare2} 
    board={ gameboard }  />
    </div>
    
    <Log turns={ gameturns }/>
    </main>
    </>
  );
}

export default App
