import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "../../store/axios";

function EmploymentTab({ user }) {
  const [campus, setCampus] = useState("");

  useEffect(() => {
    if (user?.campusID) {
      axios.get(`/campuses/${user?.campusID}`).then((res) => {
        setCampus(res.data.docs.name);
      });
    }
  }, [user]);

  const containerStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    maxWidth: "900px",
    margin: "10px auto",
    fontFamily: "Arial, sans-serif",
    alignItems: "center",
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  };

  const labelStyle = {
    fontWeight: "bold",
    color: "#333",
    flex: "1",
    textAlign: "left",
  };

  const valueStyle = {
    color: "#555",
    flex: "1",
    textAlign: "left",
    fontSize: "14px",
    marginLeft: "50px",
  };

  return (
    <div style={containerStyle}>
      <div className="row justify-content-center align-items-center">
        <div className="col-6">
          <div style={rowStyle}>
            <span style={labelStyle}>Position Role:</span>
            <span style={valueStyle}>{user?.position || "N/A"}</span>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>Department:</span>
            <span style={valueStyle}>{user?.department || "N/A"}</span>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>Campus:</span>
            <span style={valueStyle}>{campus || "N/A"}</span>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>Employment Date:</span>
            <span style={valueStyle}>
              {user?.employmentDate
                ? moment(user?.employmentDate).format("DD MMMM YYYY")
                : "N/A"}
            </span>
          </div>
        </div>

        <div className="col-6">
          <div style={rowStyle}>
            <span style={labelStyle}>Qualification:</span>
            <span style={valueStyle}>{user?.qualifications || "N/A"}</span>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>Years of Experience:</span>
            <span style={valueStyle}>{user?.years || "N/A"}</span>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>Bank:</span>
            <span style={valueStyle}>{user?.bank || "N/A"}</span>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>Account Number:</span>
            <span style={valueStyle}>{user?.accountNumber || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmploymentTab;

