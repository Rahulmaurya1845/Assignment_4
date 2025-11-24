import React, { useState } from 'react';
import './DefaultQuizStyles.css';

const DefaultQuiz = () => {
    const defaultQuestions = [
        {
            question: 'What is the capital of France?',
            options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
            correctOption: 2,
        },
        {
            question: 'Who wrote "To Kill a Mockingbird"?',
            options: ['Harper Lee', 'Mark Twain', 'F. Scott Fitzgerald', 'Ernest Hemingway'],
            correctOption: 0,
        },
        {
            question: 'What is the smallest planet in our solar system?',
            options: ['Venus', 'Earth', 'Mercury', 'Mars'],
            correctOption: 2,
        },
        {
            question: 'What is the chemical symbol for water?',
            options: ['O2', 'H2O', 'CO2', 'NaCl'],
            correctOption: 1,
        },
        {
            question: 'Who developed the theory of relativity?',
            options: ['Isaac Newton', 'Galileo Galilei', 'Nikola Tesla', 'Albert Einstein'],
            correctOption: 3,
        },
    ];

    const [answers, setAnswers] = useState(Array(defaultQuestions.length).fill(null));
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerChange = (qIndex, optionIndex) => {
        const newAnswers = [...answers];
        newAnswers[qIndex] = optionIndex;
        setAnswers(newAnswers);
    };

    const calculateResult = () => {
        let calculatedScore = 0;
        defaultQuestions.forEach((question, index) => {
            if (question.correctOption === answers[index]) {
                calculatedScore += 1;
            }
        });
        setScore(calculatedScore);
        setShowResult(true);
    };

    return (
        <div className="default-quiz-container">
            <h2>General Knowledge Quiz</h2>
            {!showResult ? (
                <div>
                    {defaultQuestions.map((question, qIndex) => (
                        <div className="default-quiz-question" key={qIndex}>
                            <h4>{question.question}</h4>
                            {question.options.map((option, oIndex) => (
                                <div className="default-quiz-option" key={oIndex}>
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
                    <button className="default-quiz-button" onClick={calculateResult}>Submit Quiz</button>
                </div>
            ) : (
                <div className="default-quiz-result">
                    <h3>Quiz Completed!</h3>
                    <p>Your Score: {score} / {defaultQuestions.length}</p>
                </div>
            )}
        </div>
    );
};

export default DefaultQuiz;
