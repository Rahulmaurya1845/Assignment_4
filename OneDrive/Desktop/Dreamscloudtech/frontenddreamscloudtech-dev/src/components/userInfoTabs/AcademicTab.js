import React, { useState, useEffect } from "react";
import axios from "../../store/axios";
import { selectFees } from "../../store/slices/schoolSlice";
import { useSelector } from "react-redux";
import { getCapitalize } from "../../utils";

function AcademicTab({ user }) {
  const [section, setsection] = useState("");
  const [fees, setfees] = useState("");
  const [campus, setcampus] = useState("");
  const [scholarship, setscholarship] = useState("");
  const [dormitory, setdormitory] = useState(""); // Added state for dormitory
  const feesSelector = useSelector(selectFees);

  useEffect(() => {
    if (user?.fees) {
      let type = feesSelector.find((e) => e.code === user?.fees);
      setfees(type?.name.toUpperCase()); // Capitalize fee category
    }

    if (user?.scholarship) {
      axios.get(`/scholarships/${user?.scholarship}`).then((res) => {
        setscholarship(res.data?.doc?.name);
      });
    }

    if (user?.campusID) {
      axios.get(`/campuses/${user?.campusID}`).then((res) => {
        setcampus(res.data?.docs?.name);
      });
    }

    if (user?.section) {
      axios.get(`/sections/${user?.section}`).then((res) => {
        setsection(res.data.doc?.name);
      });
    }

    if (user?.dormitoryID) {
      axios.get(`/dormitories/${user?.dormitoryID}`).then((res) => {
        setdormitory(res.data?.docs?.name); // Fetch and set dormitory name from the `docs` key
      });
    }
  }, [user, feesSelector]);

  const containerStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    maxWidth: "900px",
    margin: "20px auto",
    marginTop: "30px",
    fontFamily: "Arial, sans-serif",
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
      <div className="row">
        <div className="col-6">
          <div style={rowStyle}>
            <span style={labelStyle}>Class/Section:</span>
            <span style={valueStyle}>{section || "-"}</span>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>Student Status:</span>
            <span style={valueStyle}>{getCapitalize(user?.status || "N/A")}</span>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>Campus:</span>
            <span style={valueStyle}>{campus || "N/A"}</span>
          </div>
        </div>

        <div className="col-6">
          {user?.status === ("border" || "freshBorder") && (
            <div style={rowStyle}>
              <span style={labelStyle}>Bus Route:</span>
              <span style={valueStyle}>{dormitory || "N/A"}</span>
            </div>
          )}
          <div style={rowStyle}>
            <span style={labelStyle}>Scholarship:</span>
            <span style={valueStyle}>{scholarship || "N/A"}</span>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>Fees Category:</span>
            <span style={valueStyle}>{fees || "-"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcademicTab;
