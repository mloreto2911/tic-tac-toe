import React, { useState } from "react";
import "./App.css";


function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [showNameForm, setShowNameForm] = useState(true);
  const [winner, setWinner] = useState(null); // New state for winner

  const handleCellClick = (index) => {
    if (board[index] === null && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      const newWinner = checkWinner(newBoard);
      setWinner(newWinner);
    }
  };

  const renderCell = (index) => {
    return (
      <div
        className={`border shadow-lg hover:shadow-2xl rounded-md border-gray-500 w-28 h-28 flex items-center justify-center text-8xl font-bold cursor-pointer ${
          board[index] === "X" ? "text-red-500" : "text-blue-500"
        }`}
        onClick={() => handleCellClick(index)}
      >
        {board[index]}
      </div>
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null); // Reset winner state
  };

  const checkWinner = () => {
    // Check for all possible winning combinations
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
  
    // Check if all cells have been filled
    if (board.every((cell) => cell !== null)) {
      return "draw";
    }
  
    // Return null when there is no winner
    return null;
  };
  
  
  const handleStartGame = () => {
    if (player1Name.trim() === "" || player2Name.trim() === "") {
      alert("Please enter the names of both players.");
    } else {
      setShowNameForm(false);
      setWinner(null); // Reset winner state when starting a new game
    }
  };

  return (
    <div className="box flex flex-col items-center text-center mt-16">
      {showNameForm ? (
        <div>
          <h1 className="text-5xl font-bold mb-5">Tic-Tac-Toe</h1>
          <input
            type="text"
            placeholder="Player 1 Name"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
            className="mb-2 p-2 border rounded"
          />
          <br />
          <input
            type="text"
            placeholder="Player 2 Name"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
            className="mb-2 p-2 border rounded"
          />
          <br />
          <br />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleStartGame}
          >
            Start Game
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-5">
            {player1Name} vs. {player2Name}
          </h1>
          <p className="text-xl mb-2 font-bold">Current Turn: {currentPlayer === "X" ? player1Name : player2Name}</p>
          <div className="grid grid-cols-3 gap-2">
            {board.map((_, index) => (
              <div key={index}>{renderCell(index)}</div>
            ))}
          </div>
          {winner && (
            <div className="mt-3">
              {winner === "draw" ? (
                <p className="text-lg font-bold">It's a draw!</p>
              ) : (
                <p className="text-lg text-center font-bold ">
                  {winner === "X" ? player1Name : player2Name} wins!
                </p>
              )}
              <button
                className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={resetGame}
              >
                Play Again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;