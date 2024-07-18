import React from 'react';
import './StartPage.css'; // Import CSS file for styling

interface StartPageProps {
  onStartGame: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStartGame }) => {
  return (
    <div className="start-page">
      <div className="start-page-content">
        <h1>Welcome to the Quiz Game!</h1>
        <p>Click the button below to start the game.</p>
        <button className="start-button" onClick={onStartGame}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default StartPage;
