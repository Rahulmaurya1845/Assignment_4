import React, { useState, useEffect } from "react";
import Search from "../../shared/Search6";
import StaffTable from "../../shared/TableListUsers1";
import axios from "../../../store/axios";
import { errorAlert } from "../../../utils";
// import Loading from "../../Loading";
import { pdf } from "../../../components/tables/pdf";
import { Link } from "react-router-dom";

const headCells = [
  { id: "userID", numeric: false, disablePadding: false, label: "Teacher ID" },
  { id: "photoUrl", numeric: false, disablePadding: false, label: "Photo" },
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
  { id: "position", disablePadding: false, label: "Position" },
  { id: "gender", disablePadding: false, label: "Gender" },
];

function AllStaff() {
  const [name, setname] = useState("");
  const [userID, setuserID] = useState("");
  const [staff, setstaff] = useState([]);
  const [storeData, setstoreData] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    axios
      .get("/teachers")
      .then((res) => {
        setloading(false);
        const capitalizedData = res.data.map((teacher) => ({
          ...teacher,
          gender: capitalizeFirstLetter(teacher.gender),
          position: capitalizeFirstLetter(teacher.position),
        }));

       
        const femaleStaff = capitalizedData.filter(
          (teacher) => teacher.gender.toLowerCase() === "female"
        );

        setstaff(femaleStaff);
        setstoreData(femaleStaff);
      })
      .catch((err) => {
        setloading(false);
      });
  }, []);

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";

    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const generatePDF = () => {
    const headers = [
      { key: "userID", label: "UserID" },
      { key: "name", label: "Name" },
      { key: "surname", label: "SurName" },
      { key: "gender", label: "Gender" },
      { key: "classID", label: "Class" },
    ];

    pdf({ data: staff, headers, filename: "feMaleStaff" });
  };

  const handleDelete = (i) => {
    let ans = window.confirm(`Are sure you want to delete user ${i}`);
    if (ans) {
      axios.delete(`/teachers/delete/${i}`).then((res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
        }
        setstaff(staff.filter((e) => e.userID !== i));
      });
    }
  };

  const handleWithdraw = (i) => {
    let ans = window.confirm(
      `Are you sure you want to withdraw this staff member ${i}`
    );

    if (ans) {
      axios.put(`/teachers/update/${i}`, { withdraw: true }).then((res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
        }
        setstaff(staff.filter((e) => e.userID !== i));
      });
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setstaff(storeData); // Reset to original female staff only
    setname("");
    setuserID("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let newStaff = storeData;

    if (name) {
      newStaff = newStaff.filter(
        (i) =>
          i.name.toLowerCase().includes(name.toLowerCase()) ||
          i.surname.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (userID) {
      newStaff = newStaff.filter((i) =>
        i.userID.toLowerCase().includes(userID.toLowerCase())
      );
    }

    setstaff(newStaff);
  };

  const inputFields = [
    {
      type: "text",
      label: "Search by Name",
      name: "Name",
      value: name,
      onChange: setname,
    },
    {
      type: "text",
      label: "Search by UserID",
      name: "userID",
      value: userID,
      onChange: setuserID,
    },
  ];

  return (
    <>
      {/* {loading && <Loading />} */}
      <Search
        inputFields={inputFields}
        handleSearch={handleSearch}
        handleReset={handleReset}
      />
      <StaffTable
        route="staff"
        loading={loading}
        noData="No female staff members yet"
        students={staff}
        handleWithdraw={handleWithdraw}
        handleDelete={handleDelete}
        headCells={headCells}
      />
    </>
  );
}

export default AllStaff;
