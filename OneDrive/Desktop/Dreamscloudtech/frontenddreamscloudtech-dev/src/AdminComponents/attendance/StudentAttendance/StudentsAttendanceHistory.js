import React, { useState, useEffect } from "react";
import Search from "../../shared/Search3";
import Table from "../../shared/AttendanceTable";
import { Link } from "react-router-dom";
import axios from "../../../store/axios";
import { useSelector } from "react-redux";
import { selectClasses } from "../../../store/slices/schoolSlice";

function Attendance() {
  const [classID, setClassID] = useState("");
  const [date, setDate] = useState("");
  const [userID, setUserID] = useState("");
  const [month, setMonth] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const classes = useSelector(selectClasses);

  const handleSearch = (e) => {
    e.preventDefault();

    let newClasses = [...storeData];

    if (classID) {
      newClasses = newClasses.filter((i) =>
        i?.classID?.toLowerCase().includes(classID?.toLowerCase())
      );
    }

    if (userID) {
      newClasses = newClasses.filter((i) =>
        i?.users.some(user => user?.userID?.toLowerCase().includes(userID.toLowerCase()))
      );
    }

    if (date) {
      const selectedDate = new Date(date).toISOString().split("T")[0]; // Format date as YYYY-MM-DD
      newClasses = newClasses.filter((i) => {
        const createdAt = new Date(i?.createdAt).toISOString().split("T")[0];
        return createdAt === selectedDate;
      });
    }

    if (month) {
      const [year, monthIndex] = month.split("-");
      newClasses = newClasses.filter((i) => {
        const createdDate = new Date(i?.createdAt);
        const createdYear = createdDate.getFullYear();
        const createdMonth = createdDate.getMonth() + 1; // Months are zero-indexed
        return createdYear === parseInt(year) && createdMonth === parseInt(monthIndex);
      });
    }

    setAttendanceData(newClasses);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setClassID("");
    setDate("");
    setUserID("");
    setMonth("");
    setAttendanceData(storeData);
  };

  useEffect(() => {
    axios.get("/attendance/students").then((res) => {
      setAttendanceData(res.data);
      setStoreData(res.data);
    });
  }, []);

  const inputFields = [
    {
      type: "select",
      label: "Search by Class",
      value: classID,
      options: classes.slice().reverse().map((e) => ({
        id: e.classCode,
        name: e.name,
      })),
      name: "classID",
      onChange: setClassID,
    },
    {
      type: "text",
      label: "Search by User ID",
      value: userID,
      name: "userID",
      onChange: setUserID,
    },
    {
      type: "date",
      label: "Search by Date",
      value: date,
      name: "date",
      onChange: setDate,
    },
    {
      type: "text",
      label: "Search by (YYYY-MM)",
      value: month,
      name: "month",
      onChange: setMonth,
    },
  ];

  return (
    <div>
      <Search
        handleSearch={handleSearch}
        handleReset={handleReset}
        title="Student's Attendance"
        inputFields={inputFields}
      />
      {/* <div className="content__container"> */}
      {/* <div className="d-flex justify-content-between mb-3">
          <h3>Attendance Record</h3>
          <Link to="/attendance/students/register" className="btn blue__btn">
            Register Attendance
          </Link>
        </div> */}
      <Table attendanceData={attendanceData} />
      {/* </div> */}
    </div>
  );
}

export default Attendance;
