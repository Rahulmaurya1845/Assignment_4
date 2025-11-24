import React, { useState, useEffect } from "react";
import StudentsTable from "./Table1";
import axios from "../../store/axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import { selectStaff, selectCampuses } from "../../store/slices/schoolSlice";

const headCells = [
  { id: "userID", numeric: false, disablePadding: false, label: "StudentID" },
  { id: "photoUrl", numeric: false, disablePadding: false, label: "Photo" },
  { id: "name", numeric: false, disablePadding: true, label: "Name" },

  { id: "surname", numeric: true, disablePadding: true, label: "Last Name" },
  { id: "status", numeric: true, disablePadding: true, label: "Bus Route" },


  { id: "Gender", numeric: true, disablePadding: false, label: "Gender" },

];

function AllClasses({ id }) {
  const [students, setstudents] = useState([]);
  const [classDetails, setclassDetails] = useState({});
  const [dormitory, setDormitory] = useState("");
  const [dormitories, setDormitories] = useState({});
  const staff = useSelector(selectStaff);
  const campus = useSelector(selectCampuses);
  const user = useSelector(selectUser);

  const classTeacher = staff.find((e) => e.userID === classDetails?.teacherID);

  const classcampus = campus.find((e) => e._id === classDetails?.campusID);
  const prefect = students.find((e) => e.userID === classDetails?.prefect);

  useEffect(() => {
    const getData = async () => {
      await axios.get(`/classes/classCode/${id}`).then((res) => {
        setclassDetails(res.data.docs);
      });
      await axios
        .get(`/students/class/${id}`)
        .then((res) => {
          setstudents(res.data.users);
        })
        .catch((err) => { });
    };
    const dormitoryPromises = students?.map(student =>
      axios.get(`/dormitories/${student.dormitoryID}`)
        .then(res => {
          if (res.data.success && res.data.docs) {
            return { id: student.dormitoryID, name: res.data.docs.name };
          } else {
            return { id: student.dormitoryID, name: "No Bus Service" };
          }
        })
        .catch(() => ({ id: student.dormitoryID, name: "No Bus Service" }))
    );

    Promise.all(dormitoryPromises).then(dormitoryResults => {
      const dormitoryMap = {};
      dormitoryResults.forEach(dorm => {
        dormitoryMap[dorm.id] = dorm.name;
      });
      setDormitories(dormitoryMap);
    });
    getData();
  }, [id]);

  return (
    <div>
      <div className={`${user?.role === "student" ? "mb-5" : "mb-1"}`}>

        <h3 className="mb-4 text-center" style={{ color: "black" }}>Class {classDetails?.name}</h3>
        <div className="content__container " style={{ background: "#eef7ff" }}>

          <div className="d-flex flex-wrap justify-content-between" >
            <div className="mb-4 text-center">
              <h6 style={{ color: "#1e9fef" }}>Total Number of Students</h6>
              <h5>
                {students?.length > 0 ? (
                  students?.length
                ) : (
                  <span className="text-danger">no students yet </span>
                )}
              </h5>
            </div>
            <div className="mb-4 text-center">
              <h6 style={{ color: "#1e9fef" }}>Class Teacher</h6>
              <h5>
                {classTeacher?.name + " " + classTeacher?.surname || (
                  <span className="text-danger">not appointed yet </span>
                )}
              </h5>
            </div>
            <div className="mb-4 text-center">
              <h6 style={{ color: "#1e9fef" }}>Class Prefect</h6>
              <h5>
                {prefect?.name + " " + prefect?.surname || (
                  <span className="text-danger">not appointed yet </span>
                )}
              </h5>
            </div>
            <div className="mb-4 text-center">
              <h6 style={{ color: "#1e9fef" }}>Campus</h6>
              <h5>
                {classcampus?.name || (
                  <span className="text-danger">not appointed yet </span>
                )}
              </h5>
            </div>
          </div>
        </div>
      </div>
      {user?.role !== "student" && (
        <>
          <div className="float-right mb-4">
            <Link
              className="btn green__btn mt-3"
              to={`/academics/classes/attendance/record/${id}`}
            >
              Register Today's Attendance
            </Link>
            <Link
              className="btn red__btn ml-2 mt-3"
              to={`/academics/classes/attendance/${id}`}
            >
              View Attendance Records
            </Link>
            <Link
              className="btn bblue__btn ml-2 mt-3"
              to={`/academics/combinedreports/${id}`}
            >
              Combined Report
            </Link>
          </div>
          <h3 className={`${user?.role === "student" ? "my-5" : "my-3"}`}>Class Students</h3>
        </>
      )}
      <StudentsTable
        route="students"
        students={students}
        noActions={true}
        headCells={headCells}
        dormitories={dormitories}
      />
    </div>
  );
}

export default AllClasses;
