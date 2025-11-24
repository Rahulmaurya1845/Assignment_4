import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const QuizDetail = () => {
  const { id } = useParams(); 
  const history = useHistory();
  const [quiz, setQuiz] = useState(null);
  const [activeTab, setActiveTab] = useState("questions");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/quiz/${id}`);
        if (res.data.success) {
          setQuiz(res.data.docs);
        }
      } catch (err) {
        console.error("Error fetching quiz:", err);
      }
    };
    fetchQuiz();
  }, [id]);

  if (!quiz) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Quiz Card */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: "0 0 8px 0", color: "#333" }}>{quiz.title}</h2>
        <p style={{ margin: "0 0 12px 0", color: "#666" }}>
          {quiz.description}
        </p>
        <p style={{ margin: "0 0 8px 0", color: "#666" }}>
         ❓questions : {quiz.questions?.length || 0} 
        </p>
        <p style={{ margin: "0 0 12px 0", color: "#666" }}>
          👥 students played : {quiz.participants?.length || 0} 
        </p>

        {/* Add Question Button */}
        <button
          style={{
            backgroundColor: "#4da6ff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "10px 16px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px",
          }}
          onClick={() => history.push(`/Quiz/AddQuestion/${quiz._id}`)}
        >
          + Add new question
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "2px solid #ddd" }}>
        <div
          onClick={() => setActiveTab("questions")}
          style={{
            flex: 1,
            textAlign: "center",
            padding: "10px",
            cursor: "pointer",
            fontWeight: activeTab === "questions" ? "bold" : "normal",
            borderBottom:
              activeTab === "questions" ? "3px solid #4da6ff" : "none",
            color: activeTab === "questions" ? "#4da6ff" : "#555",
          }}
        >
          Questions
        </div>
        <div
          onClick={() => setActiveTab("students")}
          style={{
            flex: 1,
            textAlign: "center",
            padding: "10px",
            cursor: "pointer",
            fontWeight: activeTab === "students" ? "bold" : "normal",
            borderBottom:
              activeTab === "students" ? "3px solid #4da6ff" : "none",
            color: activeTab === "students" ? "#4da6ff" : "#555",
          }}
        >
          Students
        </div>
      </div>

      {/* Tab Content */}
      <div style={{ marginTop: "20px" }}>
        {/* Questions */}
        {activeTab === "questions" && (
          <>
            {quiz.questions?.length > 0 ? (
              quiz.questions.map((q, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#f9f9f9",
                    padding: "15px",
                    marginBottom: "15px",
                    borderRadius: "10px",
                  }}
                >
                  <p style={{ fontWeight: "600", color: "#333" }}>
                    Q{idx + 1}. {q.question}
                  </p>
                  {q.options?.map((opt, i) => (
                    <div
                      key={i}
                      style={{
                        background: "#eaf4ff",
                        padding: "8px",
                        borderRadius: "6px",
                        marginBottom: "8px",
                      }}
                    >
                      {i + 1}. {opt}
                    </div>
                  ))}
                  <p style={{ color: "green", marginTop: "8px" }}>
                    Correct answer: {q.answer}
                  </p>
                </div>
              ))
            ) : (
              <p style={{ color: "#888", fontStyle: "italic", textAlign: "center" }}>
                No questions available in this quiz.
              </p>
            )}
          </>
        )}

        {/* Students */}
        {activeTab === "students" && (
          <>
            {quiz.participants?.length > 0 ? (
              quiz.participants.map((s, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#fff",
                    padding: "15px",
                    marginBottom: "12px",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                  }}
                >
                  <div>
                    <p style={{ margin: 0, fontWeight: "600", color: "#333" }}>
                      {s.name}
                    </p>
                    <p style={{ margin: "4px 0", color: "#555" }}>
                      Class: {s.classID || "N/A"}
                    </p>
                    <p style={{ margin: "4px 0", fontSize: "12px", color: "#888" }}>
                      Played: {s.date ? new Date(s.date).toLocaleDateString("en-GB") : "N/A"}
                    </p>
                    <p style={{ margin: "4px 0", fontSize: "12px", color: "#888" }}>
                      Take time:{" "}
                        {typeof s.takeTime === "number"
                         ? s.takeTime < 60
                         ? `${s.takeTime} seconds`
                          : `${Math.floor(s.takeTime / 60)} min ${s.takeTime % 60} sec`
                          : "N/A"}
                      </p>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#4da6ff",
                      color: "#fff",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      fontWeight: "bold",
                      minWidth: "50px",
                      textAlign: "center",
                    }}
                  >
                    {s.score} ({ quiz.questions.length})
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: "#888", fontStyle: "italic", textAlign: "center" }}>
                 No students have attempted this quiz yet.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuizDetail;

