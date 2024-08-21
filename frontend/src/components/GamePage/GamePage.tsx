import React, { useEffect, useState } from 'react';
import { fetchQuestions, saveScore } from '../../services/ApiService';
import { QuestionData, OptionKey } from '../../services/types';
import './GamePage.css';

interface AnswerStatus {
  selectedAnswer: string | null;
  isCorrect: boolean | null;
}

interface GamePageProps {
  categoryId: number;
  userName: string;
  onQuizComplete: (finalScore: number, totalQuestions: number, totalPoints: number, correctAnswers: number) => void;
}

const getUniqueRandomQuestions = (questions: QuestionData[]): QuestionData[] => {
  const getRandomQuestions = (questions: QuestionData[], count: number): QuestionData[] => {
    return questions.sort(() => 0.5 - Math.random()).slice(0, count);
  };

  const easyQuestions = getRandomQuestions(questions.filter(q => q.level === 'EASY'), 10);
  const mediumQuestions = getRandomQuestions(questions.filter(q => q.level === 'MEDIUM'), 10);
  const hardQuestions = getRandomQuestions(questions.filter(q => q.level === 'HARD'), 5);
  const expertQuestions = getRandomQuestions(questions.filter(q => q.level === 'EXPERT'), 5);

  const selectedQuestions = [...easyQuestions, ...mediumQuestions, ...hardQuestions, ...expertQuestions];

  return selectedQuestions.sort(() => 0.5 - Math.random()); // Shuffle the combined list again
};

const GamePage: React.FC<GamePageProps> = ({ categoryId, userName, onQuizComplete }) => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus[]>([]);
  const [showNextButton, setShowNextButton] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [timers, setTimers] = useState<number[]>([]);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [isAnswerLocked, setIsAnswerLocked] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuestionsFromApi = async () => {
      try {
        const allQuestions = await fetchQuestions(categoryId);
        const selectedQuestions = getUniqueRandomQuestions(allQuestions);
        setQuestions(selectedQuestions);
        setAnswerStatus(new Array(selectedQuestions.length).fill({ selectedAnswer: null, isCorrect: null }));
        setTimers(new Array(selectedQuestions.length).fill(20));
        setTimerRunning(true);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestionsFromApi();
  }, [categoryId]);

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

  const handleSelectAnswer = (answer: string) => {
    if (!isAnswerLocked) {
      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = answer === currentQuestion.correctAnswer;
      const newAnswerStatus = [...answerStatus];
      newAnswerStatus[currentQuestionIndex] = { selectedAnswer: answer, isCorrect };
      setAnswerStatus(newAnswerStatus);
      setShowNextButton(false);
      setTimerRunning(false);

      if (isCorrect) {
        setScore((prevScore) => prevScore + (currentQuestion.point || 0));
        setCorrectAnswers((prevCorrect) => prevCorrect + 1);
      }

      setIsAnswerLocked(true);
      setTimeout(handleNextQuestion, 1000);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setIsAnswerLocked(true);
      setShowNextButton(true);
      setTimerRunning(false);
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setIsAnswerLocked(false);
      setShowNextButton(false);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimerRunning(true);
    } else {
      const totalPoints = questions.reduce((total, question) => total + (question.point || 0), 0);
      onQuizComplete(score, questions.length, totalPoints, correctAnswers);

      saveScore(userName, categoryId, score)
        .then(() => console.log('Score saved successfully'))
        .catch(error => console.error('Error saving score:', error));
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
        return status.isCorrect ? 'option-button correct' : 'option-button incorrect';
      }
      if (currentAnswer === questions[currentQuestionIndex].correctAnswer) {
        return 'option-button correct';
      }
    }

    return 'option-button';
  };

  const getLevelClass = (level: string): string => {
    switch (level) {
      case 'EASY':
        return 'level-easy';
      case 'MEDIUM':
        return 'level-medium';
      case 'HARD':
        return 'level-hard';
      case 'EXPERT':
        return 'level-expert';
      default:
        return '';
    }
  };

  return (
    <div className='body'>
      <div className="game-page">
        {questions.length > 0 && currentQuestionIndex < questions.length && (
          <div className="question-container">
            <div className={`level-badge ${getLevelClass(questions[currentQuestionIndex].level)}`}>
              {questions[currentQuestionIndex].level.toUpperCase()}
            </div>

            <h1 className="question-text">{questions[currentQuestionIndex].questionText}</h1>
            <div className="timer">{formatTime(timers[currentQuestionIndex])}</div>
            <ul className="options">
              {(['optionA', 'optionB', 'optionC', 'optionD'] as OptionKey[]).map((optionKey) => (
                <li key={optionKey}>
                  <button
                    className={getButtonClass(optionKey)}
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
