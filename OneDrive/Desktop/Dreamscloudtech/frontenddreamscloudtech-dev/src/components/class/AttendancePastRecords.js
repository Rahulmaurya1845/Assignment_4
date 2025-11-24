import React, { useState, useEffect } from "react";
import Search from "../../AdminComponents/shared/Search12";
import Table from "../../AdminComponents/shared/AttendanceTable";
import { Link } from "react-router-dom";
import axios from "../../store/axios";
import { useParams } from "react-router-dom";
import History from "../../AdminComponents/attendance/StudentAttendance/StudentsAttendanceHistory1"
function Attendance() {
  const [date, setDate] = useState("");
  const [attendanceData, setattendanceData] = useState([]);
  const [storedata, setstoredata] = useState([]);
  const { id } = useParams();

  const handleSearch = (e) => {
    setDate(e);
    console.log(e);
    console.log(storedata);
    let searchData = storedata.filter(
      (i) => new Date(i.createdAt).toISOString().slice(0, 10) === e
    );
    console.log(searchData);
    setattendanceData(searchData);
  };

  useEffect(() => {
    axios.get("/attendance/students").then((res) => {

      let classData = res.data.filter((e) => e.classID === id);

      setstoredata(classData);
      setattendanceData(classData);
    });
  }, [id]);

  const inputFields = [
    {
      type: "date",
      label: "Search by Date",
      value: date,
      name: "date",
      onChange: handleSearch,
    },

  ];

  return (
    <History />

  );
}

export default Attendance;
