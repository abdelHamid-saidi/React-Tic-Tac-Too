// Board.jsx
import { useState, useEffect } from 'react';
import { House } from 'lucide-react';

const Board = ({ mark, mode }) => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState('x');
  const [winner, setWinner] = useState(null);
  const [winningCombo, setWinningCombo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState({ x: 0, o: 0, tries: 0 });

  const playerMark = mark;
  const cpuMark = playerMark === 'x' ? 'o' : 'x';

  useEffect(() => {
    const handleBackToChoice = () => {
      setBoard(initialBoard);
      setTurn('x');
      setWinner(null);
      setWinningCombo([]);
      setShowModal(false);
      setScore({ x: 0, o: 0, tries: 0 });
    };
    window.addEventListener('backToChoice', handleBackToChoice);
    return () => window.removeEventListener('backToChoice', handleBackToChoice);
  }, []);

  useEffect(() => {
    if (mode === 'cpu' && turn === cpuMark && !winner) {
      const timeout = setTimeout(() => {
        const best = findBestMove(board, cpuMark);
        if (best !== -1) {
          const updated = [...board];
          updated[best] = cpuMark;
          setBoard(updated);
          setTurn(playerMark);
        }
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [board, turn, mode, cpuMark, playerMark, winner]);

  const handleClick = (index) => {
    if (board[index] || winner || (mode === 'cpu' && turn !== playerMark)) return;
    const updatedBoard = [...board];
    updatedBoard[index] = turn;
    setBoard(updatedBoard);
    setTurn(turn === 'x' ? 'o' : 'x');
  };

  useEffect(() => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setWinningCombo(combo);
        setScore(prev => ({
          ...prev,
          [board[a]]: prev[board[a]] + 1,
          tries: prev.tries + 1
        }));
        setTimeout(() => setShowModal(true), 700);
        return;
      }
    }

    if (!board.includes(null)) {
      setWinner('draw');
      setWinningCombo([]);
      setScore(prev => ({ ...prev, tries: prev.tries + 1 }));
      setTimeout(() => setShowModal(true), 700);
    }
  }, [board]);

  const resetGame = () => {
    setBoard(initialBoard);
    setTurn('x');
    setWinner(null);
    setWinningCombo([]);
    setShowModal(false);
  };

  const getCellStyle = (index) => {
    if (winningCombo.includes(index)) {
      return {
        backgroundColor: winner === 'x' ? '#31c4be' : '#f1b336',
        boxShadow: winner === 'x'
          ? '0px 4px 0px #1d7673'
          : '0px 4px 0px #a77b23'
      };
    }
    return {};
  };

  const getImageSrc = (cell, index) => {
    if (winningCombo.includes(index)) {
      return `/${cell}g.png`;
    }
    return `/${cell}.png`;
  };

  function evaluate(b) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (const [a, b1, c] of lines) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        return b[a] === cpuMark ? 10 : -10;
      }
    }
    return 0;
  }

  function isMovesLeft(b) {
    return b.includes(null);
  }

  function minimax(b, depth, isMaximizing) {
    const score = evaluate(b);
    if (score === 10 || score === -10) return score;
    if (!isMovesLeft(b)) return 0;

    if (isMaximizing) {
      let best = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (b[i] === null) {
          b[i] = cpuMark;
          best = Math.max(best, minimax(b, depth + 1, false));
          b[i] = null;
        }
      }
      return best;
    } else {
      let best = Infinity;
      for (let i = 0; i < 9; i++) {
        if (b[i] === null) {
          b[i] = playerMark;
          best = Math.min(best, minimax(b, depth + 1, true));
          b[i] = null;
        }
      }
      return best;
    }
  }

  function findBestMove(b, aiMark) {
    let bestVal = -Infinity;
    let bestMove = -1;
    for (let i = 0; i < 9; i++) {
      if (b[i] === null) {
        b[i] = aiMark;
        const moveVal = minimax(b, 0, false);
        b[i] = null;
        if (moveVal > bestVal) {
          bestVal = moveVal;
          bestMove = i;
        }
      }
    }
    return bestMove;
  }

  return (
    <div className="container" id="cont2" style={{ opacity: 1, display: 'grid' }}>
      <div id="hed">
        <img src="/xo.png" style={{ width: '40px' }} alt="XO logo" />
        <div id="turn">
          <img src={`/${turn}.png`} style={{ height: '55%', marginRight: '5px' }} id="trnim" alt="Turn" />
          TURN
        </div>
        <button id="retun" onClick={() => window.dispatchEvent(new CustomEvent('backToChoice'))}>
          <House style={{ width: '15px', height: '15px', color: '#11232d', paddingTop: '5px' }} />
        </button>
      </div>

      <div id="tabl">
        {board.map((cell, i) => (
          <button key={i} className="blc" onClick={() => handleClick(i)} style={getCellStyle(i)}>
            {cell && (
              <img
                src={getImageSrc(cell, i)}
                className="imgs"
                alt={cell}
                style={{ opacity: 1 }}
              />
            )}
          </button>
        ))}
      </div>

      <div id="foot">
        <div id="xs">
          <h4 id="xsx">X</h4>
          <h2 id="xss">{score.x}</h2>
        </div>
        <div id="s">
          <h4>TRIES</h4>
          <h2 id="ss">{score.tries}</h2>
        </div>
        <div id="os">
          <h4 id="oso">O</h4>
          <h2 id="oss">{score.o}</h2>
        </div>
      </div>

      {showModal && winner && (
        <div className="blr" style={{ display: 'flex', opacity: 1, transition: 'opacity 0.5s ease' }}>
          <div className="ntf">
            <div id="won2">
              {winner !== 'draw' ? (
                <>
                  <img src={`/${winner}.png`} id="xox" />
                  <p
                    style={{ color: winner === 'x' ? '#31c4be' : '#f1b336' }}
                  >
                    TAKES THE ROUND
                  </p>
                </>
              ) : (
                <p style={{ color: '#a9bfca' }}>IT'S A DRAW</p>
              )}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <button id="qit" onClick={() => window.dispatchEvent(new CustomEvent('backToChoice'))}>QUIT</button>
              <button id="nxt" onClick={resetGame}>NEXT ROUND</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Board;
