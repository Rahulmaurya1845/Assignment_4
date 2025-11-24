
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";


function QuizDashboard() {
  const [quizzes, setQuizzes] = useState([]);
   const [hoveredId, setHoveredId] = useState(null); 
    const history = useHistory();;

  useEffect(() => {
    axios
       
     .get(`${process.env.REACT_APP_API_URL}/quiz`)
      .then((res) => setQuizzes(res.data))
      .catch((err) => console.error(err));
  }, []);
  const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this quiz?")) {
    try {
      
      await axios.delete(`${process.env.REACT_APP_API_URL}/quiz/${id}`);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
      alert("✅ Quiz deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete quiz");
    }
  }
};

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    padding: "16px",
    marginBottom: "16px",
    position: "relative",
    maxWidth: "900px",
    margin: "0 auto 20px auto",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "600",
    marginLeft: "8px",
    color: "black",
  };

  const descStyle = {
    fontSize: "13px",
    color: "#555",
    marginBottom: "12px",
  };

  const statsStyle = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    color: "#666",
    marginBottom: "12px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#e0e0e0",
    color: "#333",
    fontWeight: "500",
    cursor: "pointer",
  };

  const addBtnStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#2196f3",
    color: "#fff",
    fontSize: "28px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f7f9fc", minHeight: "100vh" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px", color: "black", textAlign: "center" }}>
        Quiz Dashboard
      </h2>

      {quizzes.map((quiz) => (
         <div key={quiz._id} style={cardStyle}
           onMouseEnter={() => setHoveredId(quiz._id)}
          onMouseLeave={() => setHoveredId(null)}
          >
          {/* Header */}
          <div style={headerStyle}>
            
            <h3 style={titleStyle}>{quiz.title || "Quiz"}</h3>
            {/* <button
        onClick={() => handleDelete(quiz._id)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "transparent",
          border: "none",
          color: "red",
          fontSize: "20px",
          cursor: "pointer",
        }}
        title="Delete Quiz"
      >
        🗑️
      </button> */}
      {hoveredId === quiz._id && (
              <button
                onClick={() => handleDelete(quiz._id)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  // background: "transparent",
                  background: "red",
                  borderRadius: "50%",
                  border: "none",
                  color: "red",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
                title="Delete Quiz"
              >
                🗑️ 
                
              </button>
            )}
      
          </div>

          {/* Description */}
          <p style={descStyle}>{quiz.description || ""}</p>

          {/* Stats */}
          <div style={statsStyle}>
             <span>🏫 {quiz.classID || "No Class"}</span>
            <span>📚 {quiz.subject || "N/A"}</span>
            <span>❓ {quiz.questions?.length || 0}</span>
            <span>👥 {quiz.participants?.length || 0}</span>
            <span>⏱ {quiz.totalTime || 0} min</span>
          </div>

          {/* Button */}
          <button
            style={buttonStyle}
             onClick={() => history.push(`/Quiz/Detail/${quiz._id}`)}
             
          >
            View Details
          </button>
        </div>
      ))}

      {/* Floating Add Button */}
      <button
        style={addBtnStyle}
        // onClick={() => (window.location.href = "/Quiz/create")}
         onClick={() => history.push("/quiz/AddQuiz")}
      >
        +
      </button>
    </div>
  );
}

export default QuizDashboard;
