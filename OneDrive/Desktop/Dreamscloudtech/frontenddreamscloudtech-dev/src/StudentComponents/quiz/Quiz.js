
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function QuizApp() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
     
     const res = await axios.get(`${process.env.REACT_APP_API_URL}/quiz`);
      setQuizzes(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleStart = (quizId) => {
    history.push(`/quiz/${quizId}`);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f7fb",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "black" }}>
        Quiz
      </h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        quizzes.map((quiz) => {
          const played = quiz.participants && quiz.participants.length > 0;
          const score =
            played && quiz.participants[0]?.score !== undefined
              ? quiz.participants[0].score
              : 0;

          return (
            <div
              key={quiz._id}
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                marginBottom: "20px",
                padding: "15px",
                maxWidth: "850px",
                margin: "0 auto 20px auto",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <h3 style={{ margin: 0 }}>{quiz.title}</h3>
               
                {/* <span style={{ fontSize: "14px", color: "#888" }}>{quiz.subject || "Unknown Subject"}</span> */}
              </div>
              

              {/* Description */}
              <p style={{ margin: "5px 0 10px 0", color: "#555" }}>
                {quiz.description}
              </p>

              {/* Meta info */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  color: "#666",
                  marginBottom: "10px",
                }}
              >
                <span>🏫 {quiz.classID || "No Class"}</span>
                <span>📚 {quiz.subject || "N/A"}</span>
                <span>❓ {quiz.questions?.length || 0}</span>
                <span>👥 {quiz.participants?.length || 0}</span>
                <span>⏱ {quiz.totalTime || "0 min"} min</span>
              </div>

              {/* Button */}
              {played ? (
                <button
                  disabled
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#d9d9d9",
                    color: "#555",
                    fontWeight: "bold",
                    cursor: "not-allowed",
                  }}
                >
                  Already Played →
                </button>
              ) : (
                <button
                  onClick={() => handleStart(quiz._id)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#2196f3",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Start →
                </button>
              )}

              {/* Footer only for played quizzes */}
              {played && (
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "14px",
                    display: "flex",
                    justifyContent: "space-between",
                    color: "green",
                  }}
                >
                  <span>Quiz Completed</span>
                  <span>
                    Score: {score}/{quiz.questions?.length || 1}
                  </span>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default QuizApp;

