import React, { useEffect, useState } from 'react';
import { fetchQuestions } from '../../services/ApiService';
import { QuestionData, OptionKey } from '../../services/types';
import './GamePage.css';

interface AnswerStatus {
  selectedAnswer: string | null;
  isCorrect: boolean | null;
}

interface GamePageProps {
  onQuizComplete: (finalScore: number, totalQuestions: number, totalPoints: number, correctAnswers: number) => void;
}

const GamePage: React.FC<GamePageProps> = ({ onQuizComplete }) => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus[]>([]);
  const [showNextButton, setShowNextButton] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0); // Track the number of correct answers
  const [timers, setTimers] = useState<number[]>([]);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [isAnswerLocked, setIsAnswerLocked] = useState<boolean>(false);

  useEffect(() => {
    fetchQuestionsFromApi();
  }, []);

  useEffect(() => {
    let countdown: NodeJS.Timeout | null = null;

    if (timerRunning) {
      countdown = setInterval(() => {
        setTimers((prevTimers) => {
          const newTimers = [...prevTimers];
          if (newTimers[currentQuestionIndex] === 0) {
            clearInterval(countdown!);
            handleNextQuestion();
            return newTimers;
          }
          newTimers[currentQuestionIndex] -= 1;
          return newTimers;
        });
      }, 1000);
    }

    return () => {
      if (countdown) {
        clearInterval(countdown);
      }
    };
  }, [timerRunning, currentQuestionIndex]);

  const fetchQuestionsFromApi = async () => {
    try {
      const data = await fetchQuestions();
      setQuestions(data);
      setAnswerStatus(new Array(data.length).fill({ selectedAnswer: null, isCorrect: null }));
      setTimers(new Array(data.length).fill(15)); // Initialize timers for each question
      setTimerRunning(true);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleSelectAnswer = (answer: string) => {
    if (!isAnswerLocked) {
      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = answer === currentQuestion.correctAnswer;
      const newAnswerStatus = [...answerStatus];
      newAnswerStatus[currentQuestionIndex] = { selectedAnswer: answer, isCorrect };
      setAnswerStatus(newAnswerStatus);
      setShowNextButton(true);
      setTimerRunning(false); // Stop the timer when an answer is selected

      if (isCorrect) {
        setScore((prevScore) => prevScore + (currentQuestion.point || 0));
        setCorrectAnswers((prevCorrect) => prevCorrect + 1); // Increment correct answers count
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setIsAnswerLocked(true); // Lock the answer when going back
      setShowNextButton(true);
      setTimerRunning(false); // Stop the timer
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setIsAnswerLocked(false); // Unlock the answer when moving forward
      setShowNextButton(false); // Hide the next button until an answer is selected
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimerRunning(true); // Start the timer for the next question
    } else {
      const totalPoints = questions.reduce((total, question) => total + (question.point || 0), 0);
      onQuizComplete(score, questions.length, totalPoints, correctAnswers); // Pass totalPoints and correctAnswers to onQuizComplete
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
  };

  const getButtonClass = (optionKey: OptionKey): string => {
    const currentAnswer = questions[currentQuestionIndex][optionKey];
    const status = answerStatus[currentQuestionIndex];

    if (status.selectedAnswer !== null) {
      if (currentAnswer === status.selectedAnswer) {
        return status.isCorrect ? 'correct' : 'incorrect selected';
      }
      if (currentAnswer === questions[currentQuestionIndex].correctAnswer) {
        return 'correct';
      }
    }

    return '';
  };

  return (
    <div className="body">
      <div className="game-page">
        {questions.length > 0 && currentQuestionIndex < questions.length && (
          <div>
            <h1>{questions[currentQuestionIndex].questionText}</h1>
            <div className="timer">{formatTime(timers[currentQuestionIndex])}</div>
            <ul className="options">
              {(['optionA', 'optionB', 'optionC', 'optionD'] as OptionKey[]).map((optionKey) => (
                <li key={optionKey}>
                  <button
                    className={`option-button ${getButtonClass(optionKey)}`}
                    onClick={() => handleSelectAnswer(questions[currentQuestionIndex][optionKey])}
                    disabled={isAnswerLocked && answerStatus[currentQuestionIndex].selectedAnswer !== questions[currentQuestionIndex][optionKey]}
                  >
                    {questions[currentQuestionIndex][optionKey]}
                  </button>
                </li>
              ))}
            </ul>
            <div className="navigation">
              <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                Previous Question
              </button>
              <span className="question-number">
                {currentQuestionIndex + 1} of {questions.length}
              </span>
              <button onClick={handleNextQuestion} disabled={!showNextButton}>
                {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePage;
