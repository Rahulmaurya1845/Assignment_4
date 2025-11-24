import React, { useState } from 'react';
import './QuizCreationStyles.css';

const QuizCreation = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctOption, setCorrectOption] = useState(null);

    const handleAddQuestion = () => {
        if (currentQuestion.trim() && correctOption !== null && options.every(option => option.trim())) {
            const newQuestion = {
                question: currentQuestion,
                options: options,
                correctOption: correctOption,
            };
            setQuestions([...questions, newQuestion]);
            setCurrentQuestion('');
            setOptions(['', '', '', '']);
            setCorrectOption(null);
        } else {
            alert('Please fill out all fields and select a correct option.');
        }
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const saveQuiz = () => {
        localStorage.setItem('quizData', JSON.stringify(questions));
        alert('Quiz saved successfully!');
    };

    return (
        <div className="quiz-creation-container">
            <h2>Create Quiz</h2>
            <div>
                <label>Question: </label>
                <input
                    className="quiz-creation-input"
                    type="text"
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                />
            </div>
            <div className="quiz-creation-options">
                {options.map((option, index) => (
                    <div className="quiz-creation-option" key={index}>
                        <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                        />
                        <input
                            type="radio"
                            name="correctOption"
                            checked={correctOption === index}
                            onChange={() => setCorrectOption(index)}
                        />
                        <label>Correct</label>
                    </div>
                ))}
            </div>
            <div className="quiz-creation-buttons">
                <button className="quiz-creation-button" onClick={handleAddQuestion}>Add Question</button>
                <button className="quiz-creation-button" onClick={saveQuiz}>Save Quiz</button>
            </div>

            <h3>Questions List</h3>
            <ul className="quiz-creation-questions-list">
                {questions.map((q, index) => (
                    <li key={index}>{q.question}</li>
                ))}
            </ul>
        </div>
    );
};

export default QuizCreation;
