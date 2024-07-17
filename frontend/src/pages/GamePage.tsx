import React, { useEffect, useState } from 'react';
import { fetchQuestions } from '../services/ApiService';
import { QuestionData } from '../services/types';
import './GamePage.css';

const GamePage = () => {
    const [questions, setQuestions] = useState<QuestionData[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showNextButton, setShowNextButton] = useState<boolean>(false);
    const [showPreviousButton, setShowPreviousButton] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [score, setScore] = useState<number>(0);
    const [isLastQuestion, setIsLastQuestion] = useState<boolean>(false);

    useEffect(() => {
        fetchQuestionsFromApi();
    }, []);

    const fetchQuestionsFromApi = async () => {
        try {
            const data = await fetchQuestions();
            setQuestions(data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleSelectAnswer = (answer: string) => {
        setSelectedAnswer(answer);
        const correctAnswer = questions[currentQuestionIndex].correctAnswer;

        if (answer === correctAnswer) {
            setFeedback('Correct!');
            setScore(prevScore => prevScore + 1);
        } else {
            setFeedback('Wrong!');
        }

        setShowNextButton(true);
        setShowPreviousButton(currentQuestionIndex > 0);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex + 1 < questions.length) {
            setSelectedAnswer(null);
            setFeedback(null);
            setShowNextButton(false);
            setShowPreviousButton(currentQuestionIndex + 1 > 0);
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            setIsLastQuestion(true);
        }
    };

    const handlePreviousQuestion = () => {
        setSelectedAnswer(null);
        setFeedback(null);
        setShowNextButton(false);
        setShowPreviousButton(currentQuestionIndex - 1 > 0);
        setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    };

    const getButtonClass = (option: string) => {
        if (selectedAnswer) {
            if (option === questions[currentQuestionIndex].correctAnswer) {
                return 'option-button correct';
            } else if (option === selectedAnswer) {
                return 'option-button wrong';
            }
        }
        return 'option-button';
    };

    return (
        <div className="game-container">
            <h1 className="game-title">Game Page</h1>
            {questions.length > 0 && currentQuestionIndex < questions.length && (
                <div>
                    <p className="question-text">{questions[currentQuestionIndex].questionText}</p>
                    <ul className="options-list">
                        <li>
                            <button className={getButtonClass(questions[currentQuestionIndex].optionA)} onClick={() => handleSelectAnswer(questions[currentQuestionIndex].optionA)}>
                                {questions[currentQuestionIndex].optionA}
                            </button>
                        </li>
                        <li>
                            <button className={getButtonClass(questions[currentQuestionIndex].optionB)} onClick={() => handleSelectAnswer(questions[currentQuestionIndex].optionB)}>
                                {questions[currentQuestionIndex].optionB}
                            </button>
                        </li>
                        <li>
                            <button className={getButtonClass(questions[currentQuestionIndex].optionC)} onClick={() => handleSelectAnswer(questions[currentQuestionIndex].optionC)}>
                                {questions[currentQuestionIndex].optionC}
                            </button>
                        </li>
                        <li>
                            <button className={getButtonClass(questions[currentQuestionIndex].optionD)} onClick={() => handleSelectAnswer(questions[currentQuestionIndex].optionD)}>
                                {questions[currentQuestionIndex].optionD}
                            </button>
                        </li>
                    </ul>
                    {selectedAnswer && <p className="feedback-text">{feedback}</p>}
                    <div className="navigation-buttons">
                        {showPreviousButton && (
                            <button className="nav-button previous-button" onClick={handlePreviousQuestion}>Previous</button>
                        )}
                        {showNextButton && (
                            <button className="nav-button next-button" onClick={handleNextQuestion}>Next</button>
                        )}
                    </div>
                </div>
            )}
            {isLastQuestion && (
                <div className="results-container">
                    <h2>Quiz Completed</h2>
                    <p className="score-text">Your Score: {score} / {questions.length}</p>
                </div>
            )}
            {questions.length === 0 && <p className="loading-text">Loading questions...</p>}
        </div>
    );
};

export default GamePage;
