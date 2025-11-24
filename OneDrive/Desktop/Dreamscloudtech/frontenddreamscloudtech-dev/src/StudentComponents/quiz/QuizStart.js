

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

function QuizStart() {
  const { id } = useParams();
  const history = useHistory();

  const [quiz, setQuiz] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [startTime, setStartTime] = useState(null); // 🕒 Track quiz start time
  const [studentName, setStudentName] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    fetchQuiz();
    return () => clearInterval(timerRef.current);
  }, []);
  
  // Fetch student info
// useEffect(() => {
//   const user = JSON.parse(localStorage.getItem("user"));
//    if (user?.userID) {
    
//     axios
//       .get(`http://localhost:5001/api/student/${user.userID}`)
//       .then((res) => {
//         if (res.data.success) {
//           const { name, surname } = res.data.student;
//           setStudentName(`${name} ${surname}`);
//         }
//       })
//       .catch((err) => console.error("Failed to fetch student info", err));
//   }
// }, []);
useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.name) {
    setStudentName(user.name);
  }
}, []);
  const fetchQuiz = async () => {
    try {
      // const res = await axios.get(`http://localhost:5001/api/quiz/${id}`);
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/quiz/${id}`);
      if (res.data.success) {
        setQuiz(res.data.docs);
        // const totalSeconds = res.data.docs.totalTime * 60; // ⬅️ use totalTime field
        // setTimeLeft(totalSeconds);
        // setStartTime(Date.now()); // store quiz start timestamp
        // startTimer(totalSeconds);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
  if (quiz && quiz.totalTime) {
    const totalSeconds = quiz.totalTime * 60;
    setTimeLeft(totalSeconds);
    setStartTime(Date.now());
    startTimer(totalSeconds); // ✅ Timer starts only after quiz is ready
  }
}, [quiz]);

  const startTimer = (duration) => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          // finishQuiz();
          finishQuiz(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleNext = () => {
    if (!selectedOption) return alert("Select an answer!");
    if (selectedOption === quiz.questions[currentIndex].answer) {
      setScore((prev) => prev + 1);
    }
    setSelectedOption("");
    if (currentIndex + 1 < quiz.questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  // const finishQuiz = async () => {
  //   clearInterval(timerRef.current);
  const finishQuiz = async (fromTimeout = false) => {
  clearInterval(timerRef.current);
  if (!quiz || !quiz.questions) {
    alert("Quiz data not loaded. Please try again.");
    return;
  }

    // calculate time taken (in seconds)
    const endTime = Date.now();
    const takeTime = Math.floor((endTime - startTime) / 1000);

    
    const user = JSON.parse(localStorage.getItem("user"));
    // const userID = user?.userID || "Unknown";
    // const userName = user?.name || "Unknown Student";
    // const name = user?.name || "Unknown Student";
    const fullName = `${user?.name || ""} ${user?.surname || ""}`.trim();
    const classID = user?.classID || "Unknown";

    
      await axios.post(`${process.env.REACT_APP_API_URL}/quiz/${id}/add-participant`, {
      // userID: userName,
      // userID: "Student Name",
      //  userID,
      name: fullName,
      classID,
      score,
      takeTime,
    });

    // alert(
    //   `Quiz finished!\nYour score: ${score}/${quiz.questions.length}\nTime taken: ${takeTime} seconds`
    // );
    const message = fromTimeout
    ? `⏰ Time's up!\nYour score: ${score}/${quiz.questions.length}\nTime taken: ${takeTime} seconds`
    : `Quiz finished!\nYour score: ${score}/${quiz.questions.length}\nTime taken: ${takeTime} seconds`;

  alert(message);
    history.push("/quiz");
  };

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return <p>Loading quiz or no questions available...</p>;
  }

  const question = quiz.questions[currentIndex];

  return (
    <div style={{ maxWidth: "600px", margin: "15px auto", padding: "20px", backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "4px" }}>The quiz program</h2>
      <p style={{ textAlign: "center", color: "gray", marginTop: "0px" }}>
        {quiz.description || ""}
      </p>

      {/* Timer */}
      <p style={{ textAlign: "center", fontWeight: "bold", margin: "10px 0" }}>
        ⏱ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
      </p>

      {/* Progress */}
      <p style={{ fontWeight: "bold", marginTop: "20px" }}>
        Question {currentIndex + 1}/{quiz.questions.length}
      </p>

      {/* Progress Bar */}
      <div style={{ height: "6px", width: "100%", background: "#e0e0e0", borderRadius: "4px", marginBottom: "15px" }}>
        <div
          style={{
            height: "6px",
            width: `${((currentIndex + 1) / quiz.questions.length) * 100}%`,
            background: "#2196f3",
            borderRadius: "4px",
          }}
        ></div>
      </div>

      {/* Question */}
      <h3 style={{ marginBottom: "15px" }}>{question.question}</h3>

      {/* Options */}
      {question.options.map((opt, idx) => (
        <label
          key={idx}
          htmlFor={opt}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginBottom: "10px",
            cursor: "pointer",
            backgroundColor: selectedOption === opt ? "#e3f2fd" : "#fff",
            transition: "0.2s",
          }}
        >
          <input
            type="radio"
            id={opt}
            name="option"
            value={opt}
            checked={selectedOption === opt}
            onChange={(e) => setSelectedOption(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          {opt}
        </label>
      ))}

      {/* Next Button */}
      <button
        onClick={handleNext}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#2196f3",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        {currentIndex + 1 === quiz.questions.length ? "Finish Quiz" : "Next"}
      </button>
    </div>
  );
}

export default QuizStart;
