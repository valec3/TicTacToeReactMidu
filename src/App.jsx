import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS, WINNER_COMBINATIONS } from "./constants";
import { Winner } from "./components/Winner";
import { saveLocalStorage,resetLocalStorage } from "./localStorage/index.js";


function App() {

  // ESTADOS
  const [board,setBoard] = useState(()=>{
    const boardFromLocalStorage = window.localStorage.getItem("board");
    if (boardFromLocalStorage!=undefined) return JSON.parse(boardFromLocalStorage);
    return Array(9).fill(null)
  });
  const [turn,setTurn] = useState(()=>{
      const turnFromLocalStorage = window.localStorage.getItem("turn");
      return turnFromLocalStorage ? turnFromLocalStorage :TURNS.X;
    });
  const [winner,setWinner] = useState(()=>{
    const winnerFromStorage = window.localStorage.getItem("winner");
    return winnerFromStorage ? winnerFromStorage : null;
  });

  // FUNCIONES
  const checkWinner = (boardToCheck)=>{
    // Comprobar si hay ganador
    let winner = null;
    WINNER_COMBINATIONS.forEach((combo)=>{
      const [a,b,c] = combo;
      if(boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]){
        winner = boardToCheck[a]; /*retornar ganador */
      }
    })
    return winner;
  }
  
  const checkEndGame = (newBoard)=>{ 
    // Comprobar si hay empate
    return newBoard.every((cell)=> cell!==null ); /*Si todas las casillas estan ocupadas */
  }

  const updateBoard = (index)=>{
    // comprobar si hay ganador o si la casilla ya esta ocupada
    if(board[index]!==null || winner!==null){
      console.log("No se puede actualizar");
      return;
    }
    // No mutar nunca el estado o las props
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    
    // Comprobar si hay ganador despues de actualizar el tablero
    const newWinner = checkWinner(newBoard);
    if(newWinner!==null){
      /*Los componentes en react son async*/
      confetti();
      setWinner(newWinner); /*Leyendo el estado, todavia no se ha acttualizado */
    } else if(checkEndGame(newBoard)){
      setWinner(false); /*Empate */
    }

    //Guardar la partida en el localstorage
    saveLocalStorage({board:newBoard,turn:newTurn,winner:newWinner});
  }

  const resetGame = ()=>{
    // Reiniciar el juego
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetLocalStorage();
}

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Resetear juego</button>
      <section className="game">
        {
          board.map((_,index)=>{
            return(
              <Square 
              key={"n"+index} 
              index={index} 
              updateBoard={updateBoard}>
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

        {/* Pantalla para mostrar ganador */}
        <Winner winner={winner} resetGame={resetGame}/>

    </main>
  )
}

export default App
