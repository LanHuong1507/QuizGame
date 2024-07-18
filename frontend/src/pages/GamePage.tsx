import React, { useEffect, useState } from 'react';
import { fetchQuestions } from '../services/ApiService';
import { QuestionData, OptionKey } from '../services/types';
import './GamePage.css'; // Import the CSS file

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

    useEffect(() => {
        fetchQuestionsFromApi();
    }, []);

    const fetchQuestionsFromApi = async () => {
        try {
            const data = await fetchQuestions();
            setQuestions(data);
            setAnswerStatus(new Array(data.length).fill({ selectedAnswer: null, isCorrect: null }));
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleSelectAnswer = (answer: string) => {
        const isCorrect = answer === questions[currentQuestionIndex].correctAnswer;
        const newAnswerStatus = [...answerStatus];
        newAnswerStatus[currentQuestionIndex] = { selectedAnswer: answer, isCorrect };
        setAnswerStatus(newAnswerStatus);
        setShowNextButton(true);

        if (isCorrect) {
            setScore((prevScore) => prevScore + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setShowNextButton(false);
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            setShowResults(true); // Show results when on the last question
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setShowNextButton(answerStatus[currentQuestionIndex - 1].selectedAnswer !== null);
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleRestartQuiz = () => {
        setShowResults(false);
        setCurrentQuestionIndex(0);
        setAnswerStatus(new Array(questions.length).fill({ selectedAnswer: null, isCorrect: null }));
        setShowNextButton(false);
        setScore(0);
    };

    return (
        <div className="game-page">
            <h1>Game Page</h1>
            {!showResults && questions.length > 0 && currentQuestionIndex < questions.length && (
                <div>
                    <p>{questions[currentQuestionIndex].questionText}</p>
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
                                    disabled={answerStatus[currentQuestionIndex].selectedAnswer !== null}
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
