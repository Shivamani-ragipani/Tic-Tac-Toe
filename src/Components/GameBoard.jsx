import {useState} from "react";

const initialGame = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];


export default function GameBoard({onselectSquare, board}){
    //  const [gameboard, setgameboard] = useState(initialGame);

    //  let game = initialGame;
     
    //  function HandleSelectSquare(rowIndex, colIndex){
    //     setgameboard((prevGameBoard) => {
    //         const updateGameboard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         updateGameboard[rowIndex][colIndex] = activeplayersymbol;
    //         return updateGameboard;
    //     });

    //     onselectSquare();

    // }


   
  
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => 
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => (
                    <li key={colIndex}>
                        <button onClick={() => onselectSquare(rowIndex,colIndex)} disabled={playerSymbol != null}>{playerSymbol}</button>
                    </li> 
                    ) )}
                </ol>
            </li>  
            )}
        </ol>
    );
}