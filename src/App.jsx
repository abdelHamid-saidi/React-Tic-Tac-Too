// App.jsx
import React, { useState, useEffect } from 'react';
import './styles/loader.css';
import Loader from './components/Loader';
import PlayerChoice from './components/PlayerChoice';
import Board from './components/Board';

const App = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerMark, setPlayerMark] = useState('x');
  const [gameMode, setGameMode] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const backHandler = () => {
      setGameStarted(false);
      setPlayerMark('x');
      setGameMode(null);
    };
    window.addEventListener('backToChoice', backHandler);
    return () => window.removeEventListener('backToChoice', backHandler);
  }, []);

  const handleChoice = (mark, mode) => {
    setPlayerMark(mark);
    setGameMode(mode);
    setGameStarted(true);
  };

  return (
    <div className="app-container">
      {showLoader && <Loader />}
      {!showLoader && !gameStarted && <PlayerChoice onChoice={handleChoice} />}
      {!showLoader && gameStarted && <Board mark={playerMark} mode={gameMode} />}
    </div>
  );
};

export default App;
