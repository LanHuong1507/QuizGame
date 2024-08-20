import React, { useState } from 'react';
import StartPage from './components/StartPage/StartPage';
import GamePage from './components/GamePage/GamePage';
import ResultPage from './components/ResultPage/ResultPage';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<'START' | 'PLAY' | 'RESULT'>('START');
  const [categoryId, setCategoryId] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [finalScore, setFinalScore] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  const startGame = (selectedCategoryId: number, name: string) => {
    setCategoryId(selectedCategoryId);
    setUserName(name);
    setGameState('PLAY');
  };

  const handleQuizComplete = (score: number, questions: number, points: number, correct: number) => {
    setFinalScore(score);
    setTotalQuestions(questions);
    setTotalPoints(points);
    setCorrectAnswers(correct);
    setGameState('RESULT');
  };

  return (
    <div className="App">
      {gameState === 'START' && <StartPage onStartGame={startGame} />}
      {gameState === 'PLAY' && (
        <GamePage
          categoryId={categoryId}
          userName={userName} // Pass userName to GamePage
          onQuizComplete={handleQuizComplete}
        />
      )}
      {gameState === 'RESULT' && (
        <ResultPage
          score={finalScore}
          totalQuestions={totalQuestions}
          totalPoints={totalPoints}
          correctAnswers={correctAnswers}
          userName={userName} // Pass userName to ResultPage
        />
      )}
    </div>
  );
};

export default App;
