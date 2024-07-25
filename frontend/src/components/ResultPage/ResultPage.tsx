import React from 'react';
import './ResultPage.css';

interface ResultPageProps {
  score: number;
  totalQuestions: number;
  totalPoints: number;
  correctAnswers: number;  // Include correctAnswers
  onRestart: () => void;
  onReturnHome: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({
  score,
  totalQuestions,
  totalPoints,
  correctAnswers,  // Destructure correctAnswers
  onRestart,
  onReturnHome,
}) => {
  const percentage = (score / totalPoints) * 100;
  let feedbackMessage = '';

  if (percentage === 100) {
    feedbackMessage = 'Excellent! Perfect Score!';
  } else if (percentage >= 75) {
    feedbackMessage = 'Great Job! You did really well!';
  } else if (percentage >= 50) {
    feedbackMessage = 'Good effort! Keep practicing!';
  } else {
    feedbackMessage = 'Keep trying! You can do it!';
  }

  return (
    <div className="result-page">
      <h1>Quiz Results</h1>
      <div className="result-summary">
        <p className="score">Your Score: {score} out of {totalPoints}</p> {/* Display total score */}
        <p className="correct-answers">Correct Answers: {correctAnswers} out of {totalQuestions}</p> {/* Display correct answers */}
        <p className="percentage">Percentage: {percentage.toFixed(2)}%</p>
      </div>
      <div className="feedback">
        <p>{feedbackMessage}</p>
      </div>
      <div className="result-actions">
        <button onClick={onRestart} className="btn">
          Restart Quiz
        </button>
        <button onClick={onReturnHome} className="btn">
          Return Home
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
