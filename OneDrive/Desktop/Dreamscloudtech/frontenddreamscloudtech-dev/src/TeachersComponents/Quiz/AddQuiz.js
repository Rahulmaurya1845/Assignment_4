
import React, { useState, useEffect} from "react";
import axios from "axios";

const AddQuiz = () => {
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    subject: "",
    totalTime: "",
    date: "",
    classID: "",
  });
  const [classes, setClasses] = useState([]);

  useEffect(() => {
  const fetchClasses = async () => {
    try {
      
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/classes`);
      setClasses(res.data); // assuming res.data is an array of class objects
    } catch (err) {
      console.error("Error fetching classes", err);
    }
  };

  fetchClasses();
}, []);

  const handleChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/quiz/create`, quiz);
      if (res.data.success) {
        alert("Quiz Created Successfully!");
        setQuiz({ title: "", description: "", subject: "", totalTime: "", date: "" });
      } else {
        alert("Error creating quiz");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "15px",
          width: "100%",
          maxWidth: "850px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
            fontSize: "22px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          ➕ Add New Quiz
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "black",
              }}
            >
              Quiz Title
            </label>
            <input
              type="text"
              name="title"
              value={quiz.title}
              onChange={handleChange}
              placeholder="Enter quiz title"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "16px",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
  <label
    style={{
      display: "block",
      marginBottom: "8px",
      fontWeight: "600",
      color: "black",
    }}
  >
    Select Class
  </label>
  <select
    name="classID"
    value={quiz.classID}
    onChange={handleChange}
    style={{
      width: "100%",
      padding: "12px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "16px",
    }}
    required
  >
    <option value="">-- Select Class --</option>
    {classes.map((cls) => (
      <option key={cls._id} value={cls.name}>
        {cls.name}
      </option>
    ))}
  </select>
</div>

          {/* Description */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "black",
              }}
            >
              Description
            </label>
            <textarea
              name="description"
              value={quiz.description}
              onChange={handleChange}
              placeholder="Enter quiz description"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                minHeight: "100px",
                fontSize: "16px",
              }}
              required
            ></textarea>
          </div>

          {/* Subject */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "black",
              }}
            >
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={quiz.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "16px",
              }}
              required
            />
          </div>

          {/* Total Time */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "black",
              }}
            >
              Total Time (minutes)
            </label>
            <input
              type="number"
              name="totalTime"
              value={quiz.totalTime}
              onChange={handleChange}
              placeholder="Enter time limit in minutes"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "16px",
              }}
              required
            />
          </div>

          {/* Date */}
          <div style={{ marginBottom: "30px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "black",
              }}
            >
              Quiz Date
            </label>
            <input
              type="date"
              name="date"
              value={quiz.date}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "16px",
              }}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "#4da6ff",
              color: "#fff",
              fontSize: "18px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.opacity = "0.9")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            Create Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuiz;

