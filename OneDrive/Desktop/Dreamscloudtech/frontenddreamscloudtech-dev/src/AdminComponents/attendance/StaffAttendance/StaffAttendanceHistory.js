

import React, { useState, useEffect } from "react";
import Search from "../../shared/Search5";
import Table from "../../shared/AttendanceTable";
import { Link } from "react-router-dom";
import axios from "../../../store/axios";

function Attendance() {
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [storeData, setStoreData] = useState([]);

  useEffect(() => {
    axios.get("/attendance/staff").then((res) => {
      setAttendanceData(res.data);
      setStoreData(res.data);
    });
  }, []);

  const handleSearch = () => {
    let filteredData = [...storeData];

    if (date) {
      const selectedDate = new Date(date);
      filteredData = filteredData.filter((record) => {
        const createdAt = new Date(record.createdAt);
        // Match the date
        return (
          createdAt.getFullYear() === selectedDate.getFullYear() &&
          createdAt.getMonth() === selectedDate.getMonth() &&
          createdAt.getDate() === selectedDate.getDate()
        );
      });
    }

    if (month) {
      const [year, monthIndex] = month.split("-");
      filteredData = filteredData.filter((record) => {
        const createdAt = new Date(record.createdAt);
        return (
          createdAt.getFullYear() === parseInt(year) &&
          createdAt.getMonth() + 1 === parseInt(monthIndex) // Months are zero-indexed
        );
      });
    }

    setAttendanceData(filteredData);
  };

  const handleReset = () => {
    setDate("");
    setMonth("");
    setAttendanceData(storeData);
  };

  const inputFields = [
    {
      type: "date",
      label: "Select Date",
      value: date,
      name: "date",
      onChange: (value) => setDate(value),
    },
    {
      type: "text",
      label: "Search by (YYYY-MM)",
      value: month,
      name: "month",
      onChange: (value) => setMonth(value),
    },
  ];

  return (
    <div>
      <Search
        handleSearch={handleSearch}
        handleReset={handleReset}
        title="Staff's Attendance"
        inputFields={inputFields}
      />
      <div className="">
        <Table isStaff={true} attendanceData={attendanceData} />
      </div>
    </div>
  );
}

export default Attendance;
