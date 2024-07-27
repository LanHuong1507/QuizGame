// src/App.tsx
import React, { useState } from 'react';
import './App.css';
import StartPage from './components/StartPage/StartPage';
import GamePage from './components/GamePage/GamePage';
import ResultPage from './components/ResultPage/ResultPage';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'start' | 'game' | 'result'>('start');
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleStartGame = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setCurrentView('game');
  };

  const handleQuizComplete = (finalScore: number, questionsCount: number, totalPoints: number, correctAnswers: number) => {
    setScore(finalScore);
    setTotalQuestions(questionsCount);
    setTotalPoints(totalPoints);
    setCorrectAnswers(correctAnswers);
    setCurrentView('result');
  };

  const handleRestartQuiz = () => {
    setCurrentView('start');
    setScore(0);
    setTotalQuestions(0);
    setTotalPoints(0);
    setCorrectAnswers(0);
  };

  const handleReturnHome = () => {
    setCurrentView('start');
  };

  return (
    <div className="App">
      {currentView === 'start' && (
        <StartPage onStartGame={handleStartGame} />
      )}
      {currentView === 'game' && selectedCategory !== null && (
        <GamePage
          categoryId={selectedCategory}
          onQuizComplete={handleQuizComplete}
        />
      )}
      {currentView === 'result' && (
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
