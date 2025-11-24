import React, { useState, useEffect } from "react";
import Search from "../../shared/Search13";
import Table from "../../shared/AttendanceTable";
import { Link } from "react-router-dom";
import axios from "../../../store/axios";
import { useSelector } from "react-redux";
import { selectClasses } from "../../../store/slices/schoolSlice"
import { useParams } from "react-router-dom";;


function Attendance() {
  const [classID, setClassID] = useState("");
  const [date, setDate] = useState("");
  const [userID, setUserID] = useState("");
  const [month, setMonth] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const classes = useSelector(selectClasses);

  const { id } = useParams();
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
      const selectedDate = new Date(date).toISOString().split("T")[0];
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
        const createdMonth = createdDate.getMonth() + 1;
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
      let classData = res.data.filter((e) => e.classID === id);
      setAttendanceData(classData);
      setStoreData(classData);
    });
  }, []);

  const inputFields = [

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
        id={id}
      />

      <Table attendanceData={attendanceData} />

    </div>
  );
}

export default Attendance;
