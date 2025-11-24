import React, { useState, useEffect } from "react";
import AcademicYearModel from "./AcademicYearModal";
import axios from "../../store/axios";
import { errorAlert, successAlert } from "../../utils";
import {
  selectacademicYear,
  setAcademicYear,
} from "../../store/slices/schoolSlice";
import { useSelector, useDispatch } from "react-redux";
import "./AcademicYear.css"; // Import the CSS file

function AcademicYear({ isEdit }) {
  const [open, setOpen] = useState(false);
  const [from, setfrom] = useState("");
  const [term, setterm] = useState("");
  const [loading, setloading] = useState(false);
  const academicYear = useSelector(selectacademicYear);
  const dispatch = useDispatch();
  const [years, setyears] = useState([]);

  useEffect(() => {
    axios.get("/yeargroup").then((res) => {
      setyears(res.data);
    });
  }, []);

  const handleSubmit = () => {
    setloading(true);
    axios
      .post(`/academicyear/set/admin`, {
        currentYear: `${from}`,
        currentTerm: term,
      })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return;
        }
        setOpen(false);
        successAlert("Successfully set");
        dispatch(setAcademicYear(res.data.docs));
        setfrom("");
        setterm("");
      })
      .catch(() => {
        setloading(false);
        errorAlert("Error");
      });
  };

  return (
    <div className="academic-year-container">
      <div className="academic-year-heading">Current Academic Year</div>
      <div className="academic-year-details">
        <div className="academic-year-section">
          <span className="academic-year-label">Year</span>
          <span className="academic-year-value">
            {academicYear?.error ? "Not Set" : academicYear?.currentYear}
          </span>
        </div>
        <div className="academic-year-section">
          <span className="academic-year-label">Term</span>
          <span className="academic-year-value">
            {academicYear?.error ? "Not Set" : academicYear?.currentTerm}
          </span>
        </div>
        {isEdit && (
          <button
            onClick={() => setOpen(true)}
            className="academic-year-button"
          >
            {academicYear?.error ? "Set" : "Change"}
          </button>
        )}
      </div>
      <AcademicYearModel
        from={from}
        setfrom={setfrom}
        open={open}
        term={term}
        years={years}
        loading={loading}
        handleSubmit={handleSubmit}
        setterm={setterm}
        setOpen={setOpen}
      />
    </div>
  );
}

export default AcademicYear;
