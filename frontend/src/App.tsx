import React, { useState } from 'react';
import './App.css'; // Your CSS file for styling
import StartPage from './components/StartPage/StartPage';
import GamePage from './components/GamePage/GamePage';

const App: React.FC = () => {
  const [showGame, setShowGame] = useState(false);

  const handleStartGame = () => {
    setShowGame(true);
  };

  return (
    <div className="App">
      {!showGame ? (
        <StartPage onStartGame={handleStartGame} />
      ) : (
        <GamePage onRestart={() => setShowGame(false)} />
      )}
    </div>
  );
};

export default App;
