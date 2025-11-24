import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddQuestion = () => {
  const { id } = useParams(); // quiz id from route
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answerIndex, setAnswerIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    if (!question || options.some((opt) => !opt)) {
      setMessage("Please fill all fields.");
      return;
    }

    setLoading(true);
    try {
      
      const res = await axios.post(
  `${process.env.REACT_APP_API_URL}/quiz/${id}/add-question`,
  {
          question,
          options,
          answer: options[answerIndex],
        }
      );

      if (res.data.success) {
        // setMessage("✅ Question added successfully!");
        alert("✅ Question added successfully!");
        setQuestion("");
        setOptions(["", "", "", ""]);
        setAnswerIndex(0);
      } else {
        // setMessage("❌ Failed to add question.");
        alert("❌ Failed to add question."); 
      }
    } catch (err) {
      console.error(err);
    //   setMessage("❌ Error adding question.");
      alert("❌ Error adding question."); 
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ marginBottom: "20px", color: "black" }}>Add Question</h2>

      {/* Question */}
      <textarea
        placeholder="Enter question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {/* Options */}
      {options.map((opt, idx) => (
        <input
          key={idx}
          placeholder={`Option ${idx + 1}`}
          value={opt}
          onChange={(e) => handleOptionChange(idx, e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
      ))}

      {/* Correct Answer Selection */}
      <div style={{ margin: "15px 0" }}>
        <p style={{ marginBottom: "5px" }}>Correct Answer</p>
        {options.map((_, idx) => (
          <label key={idx} style={{ marginRight: "15px" }}>
            <input
              type="radio"
              checked={answerIndex === idx}
              onChange={() => setAnswerIndex(idx)}
            />{" "}
            {idx + 1}
          </label>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          background: "#4da6ff",
          color: "#fff",
          padding: "10px 15px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        {loading ? "Adding..." : "Add Question"}
      </button>

      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
};

export default AddQuestion;
