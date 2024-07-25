import React, { useState } from 'react';
import './App.css';
import StartPage from './components/StartPage/StartPage';
import GamePage from './components/GamePage/GamePage';
import ResultPage from './components/ResultPage/ResultPage';

const App: React.FC = () => {
  const [showGame, setShowGame] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleStartGame = () => {
    setShowGame(true);
    setShowResult(false);
  };

  const handleQuizComplete = (finalScore: number, questionsCount: number, totalPoints: number, correctAnswers: number) => {
    setScore(finalScore);
    setTotalQuestions(questionsCount);
    setTotalPoints(totalPoints);
    setCorrectAnswers(correctAnswers);
    setShowGame(false);
    setShowResult(true);
  };

  const handleRestartQuiz = () => {
    setShowGame(false);
    setShowResult(false);
    setScore(0);
    setTotalQuestions(0);
    setTotalPoints(0);
    setCorrectAnswers(0);
  };

  const handleReturnHome = () => {
    // Implement return home functionality
  };

  return (
    <div className="App">
      {!showGame && !showResult && (
        <StartPage onStartGame={handleStartGame} />
      )}
      {showGame && (
        <GamePage onQuizComplete={handleQuizComplete} />
      )}
      {showResult && (
        <ResultPage 
          score={score} 
          totalQuestions={totalQuestions} 
          totalPoints={totalPoints} 
          correctAnswers={correctAnswers} 
          onRestart={handleRestartQuiz} 
          onReturnHome={handleReturnHome} 
        />
      )}
    </div>
  );
};

export default App;
