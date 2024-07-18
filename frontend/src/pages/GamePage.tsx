import React, { useEffect, useState } from 'react';
import { fetchQuestions } from '../services/ApiService';
import { QuestionData, OptionKey } from '../services/types';
import './GamePage.css'; 

interface AnswerStatus {
    selectedAnswer: string | null;
    isCorrect: boolean | null;
}

const GamePage: React.FC = () => {
    const [questions, setQuestions] = useState<QuestionData[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [answerStatus, setAnswerStatus] = useState<AnswerStatus[]>([]);
    const [showNextButton, setShowNextButton] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(15); 
    const [timerRunning, setTimerRunning] = useState<boolean>(false);

    
    useEffect(() => {
        fetchQuestionsFromApi();
    }, []);

   
    const fetchQuestionsFromApi = async () => {
        try {
            const data = await fetchQuestions();
            setQuestions(data);
            setAnswerStatus(new Array(data.length).fill({ selectedAnswer: null, isCorrect: null }));
            setTimer(15); 
            setTimerRunning(true); 
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    
    useEffect(() => {
        let countdown: NodeJS.Timeout | null = null;

        if (timerRunning) {
            countdown = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer === 0) {
                        clearInterval(countdown!);
                        handleNextQuestion();
                        return 0;
                    }
                    return prevTimer - 1;
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
        const isCorrect = answer === questions[currentQuestionIndex].correctAnswer;
        const newAnswerStatus = [...answerStatus];
        newAnswerStatus[currentQuestionIndex] = { selectedAnswer: answer, isCorrect };
        setAnswerStatus(newAnswerStatus);
        setShowNextButton(true);
        setTimerRunning(false); // Stop the timer for the current question
    
        if (isCorrect) {
            setScore((prevScore) => prevScore + 1);
        }
    
        // Wait for a brief moment before moving to the next question
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setShowNextButton(false); // Hide the next button temporarily
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                setTimer(15); // Reset timer for the next question
                setTimerRunning(true); // Start the timer for the next question
            } else {
                setShowResults(true); // Show results when on the last question
                setShowNextButton(true);
            }
        }, 1000); // Adjust the delay time as needed
    };
    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setShowNextButton(true); // Hide the next button temporarily
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
            setTimer(15); // Reset timer for the previous question
            setTimerRunning(true); // Start the timer for the previous question

        }
    };
    
    
    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setShowNextButton(false); // Hide the next button temporarily
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setTimer(15); // Reset timer for the next question
            setTimerRunning(true); // Start the timer for the next question
        } else {
            setShowResults(true); // Show results when on the last question
            setShowNextButton(true);
        }
    };
    

    
    const handleRestartQuiz = () => {
        setShowResults(false);
        setCurrentQuestionIndex(0);
        setAnswerStatus(new Array(questions.length).fill({ selectedAnswer: null, isCorrect: null }));
        setShowNextButton(false);
        setScore(0);
        setTimer(15); 
        setTimerRunning(true); 
    };


    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
        return `${minutes}:${formattedSeconds}`;
    };

    return (
        <div className="game-page">
            <h1>KNOWLEDGE QUIZ WEB</h1>
            {!showResults && questions.length > 0 && currentQuestionIndex < questions.length && (
                <div>
                    <h2>{questions[currentQuestionIndex].questionText}</h2>
                    <div className="timer">{formatTime(timer)} remaining</div> {/* Display the formatted timer */}
                    <ul className="options">
                        {(['optionA', 'optionB', 'optionC', 'optionD'] as OptionKey[]).map((optionKey) => (
                            <li key={optionKey}>
                                <button
                                    className={`option-button ${
                                        answerStatus[currentQuestionIndex].selectedAnswer !== null &&
                                        (questions[currentQuestionIndex][optionKey] === questions[currentQuestionIndex].correctAnswer
                                            ? 'correct'
                                            : answerStatus[currentQuestionIndex].selectedAnswer === questions[currentQuestionIndex][optionKey]
                                            ? 'incorrect selected'
                                            : '')
                                    }`}
                                    onClick={() => handleSelectAnswer(questions[currentQuestionIndex][optionKey])}
                                    disabled={answerStatus[currentQuestionIndex].selectedAnswer !== null || !timerRunning}
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
            {!showResults && questions.length === 0 && <p>Loading questions...</p>}
            {showResults && (
                <div className="results">
                    <h2>Quiz Complete</h2>
                    <p>Your Score: {score} out of {questions.length}</p>
                    <button onClick={handleRestartQuiz}>Restart Quiz</button>
                </div>
            )}
        </div>
    );
};

export default GamePage;
