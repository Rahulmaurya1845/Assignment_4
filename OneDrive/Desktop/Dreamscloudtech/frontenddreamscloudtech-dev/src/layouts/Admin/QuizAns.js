import React, { useState, useEffect } from 'react';
import './QuizAnsweringStyles.css';

const QuizAnswering = () => {
    const [quizData, setQuizData] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const savedQuiz = JSON.parse(localStorage.getItem('quizData'));
        if (savedQuiz) {
            setQuizData(savedQuiz);
            setAnswers(Array(savedQuiz.length).fill(null)); // Initialize answers array
        }
    }, []);

    const handleAnswerChange = (qIndex, optionIndex) => {
        const newAnswers = [...answers];
        newAnswers[qIndex] = optionIndex;
        setAnswers(newAnswers);
    };

    const calculateResult = () => {
        let calculatedScore = 0;
        quizData.forEach((question, index) => {
            if (question.correctOption === answers[index]) {
                calculatedScore += 1;
            }
        });
        setScore(calculatedScore);
        setShowResult(true);
    };

    return (
        <div className="quiz-answering-container">
            <h2>Answer Quiz</h2>
            {!showResult ? (
                <div>
                    {quizData.map((question, qIndex) => (
                        <div className="quiz-answering-question" key={qIndex}>
                            <h4>{question.question}</h4>
                            {question.options.map((option, oIndex) => (
                                <div className="quiz-answering-option" key={oIndex}>
                                    <input
                                        type="radio"
                                        name={`question-${qIndex}`}
                                        checked={answers[qIndex] === oIndex}
                                        onChange={() => handleAnswerChange(qIndex, oIndex)}
                                    />
                                    <label>{option}</label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button className="quiz-answering-button" onClick={calculateResult}>Submit Quiz</button>
                </div>
            ) : (
                <div className="quiz-answering-result">
                    <h3>Quiz Completed!</h3>
                    <p>Your Score: {score} / {quizData.length}</p>
                </div>
            )}
        </div>
    );
};

export default QuizAnswering;
