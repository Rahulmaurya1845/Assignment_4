import React, { useState, useEffect, Suspense } from "react";
import axios from "../../../store/axios";
import { selectClasses } from "../../../store/slices/schoolSlice";
import { useSelector } from "react-redux";
import { errorAlert } from "../../../utils";
import Loading from "../../../Loading";
import { studentStatus } from "../../../data";
import pdfMake from "pdfmake/build/pdfmake";
import ExcelExporter from "src/expoters/ExcelExporter";
import Search from "src/AdminComponents/shared/Search";

const StudentsTable = React.lazy(() => import("../../shared/TableListUsers"));

const headCells = [
  { id: "userID", numeric: false, disablePadding: false, label: "StudentID" },
  { id: "photoUrl", numeric: false, disablePadding: false, label: "Photo" },
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  { id: "fatherName", numeric: false, disablePadding: false, label: "Father's Name" },
  { id: "motherName", numeric: false, disablePadding: false, label: "Mother's Name" },
  { id: "dormitory", disablePadding: false, label: "Bus Route" },
  { id: "class", disablePadding: false, label: "Class" },
  { id: "Gender", disablePadding: false, label: "Gender" },
];

function AllStudents() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [classID, setClass] = useState("");
  const [status, setStatus] = useState("");
  const [students, setStudents] = useState([]);
  const [gender, setGender] = useState("");
  const [dormitory, setDormitory] = useState("");
  const [registeredDate, setRegisteredDate] = useState("");
  const classes = useSelector(selectClasses);
  const [loading, setLoading] = useState(false);
  const [dormitories, setDormitories] = useState({});

  const classesOptions = classes.map((e) => ({
    name: e.name,
    id: e.classCode,
  }));
  classesOptions.reverse();

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  useEffect(() => {
    setLoading(true);

    let dormitoryExists = false;
    const localDorms = localStorage.getItem("dormitoriesData");
    if (localDorms) {
      try {
        const parsedDorms = JSON.parse(localDorms);
        if (parsedDorms && Object.keys(parsedDorms).length > 0) {
          setDormitories(parsedDorms);
          dormitoryExists = true;
        }
      } catch (err) {
        dormitoryExists = false;
      }
    }

    axios
      .get("/students")
      .then((res) => {
        const capitalizedData = res.data.map((student) => ({
          ...student,
          classID: student.classID.toUpperCase(),
          gender: capitalizeFirstLetter(student.gender),
          status: capitalizeFirstLetter(student.status),
        }));

        const maleStudents = capitalizedData.filter(
          (student) => student.gender.toLowerCase() === "male"
        );

        setStudents(maleStudents);
        localStorage.setItem("studentsData", JSON.stringify(capitalizedData));

        if (!dormitoryExists) {
          const dormitoryPromises = capitalizedData.map((student) =>
            axios
              .get(`/dormitories/${student.dormitoryID}`)
              .then((res) => {
                if (res.data.success && res.data.docs) {
                  return { id: student.dormitoryID, name: res.data.docs.name };
                } else {
                  return { id: student.dormitoryID, name: "No Bus Service" };
                }
              })
              .catch(() => ({ id: student.dormitoryID, name: "No Bus Service" }))
          );

          Promise.all(dormitoryPromises).then((dormitoryResults) => {
            const dormitoryMap = {};
            dormitoryResults.forEach((dorm) => {
              dormitoryMap[dorm.id] = dorm.name;
            });
            setDormitories(dormitoryMap);
            localStorage.setItem("dormitoriesData", JSON.stringify(dormitoryMap));
          });
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getGuardianName = (student, relationship) => {
    const guardian = student.guadian.find(
      (g) => g.relationship === relationship
    );
    return guardian === undefined
      ? "N/A"
      : `${guardian.name} ${guardian.lastname}`;
  };

  const handleReset = (e) => {
    e.preventDefault();
    setName("");
    setId("");
    setClass("");
    setStatus("");
    setDormitory("");
    setRegisteredDate(""); // <--- Reset this too
  };

  const inputFields = [
    // {
    //   type: "text",
    //   value: id,
    //   label: "Search by Student ID",
    //   name: "ID",
    //   onChange: setId,
    // },
    // {
    //   type: "text",
    //   label: "Search by Name",
    //   value: name,
    //   name: "Name",
    //   onChange: setName,
    // },
    // {
    //   type: "text",
    //   label: "Search by Bus Route",
    //   value: dormitory,
    //   name: "Bus",
    //   onChange: setDormitory,
    // },
    {
      type: "select",
      options: classesOptions,
      label: "Search by Class",
      value: classID,
      name: "class",
      onChange: setClass,
    },
    // {
    //   type: "select",
    //   options: studentStatus,
    //   label: "Search by Status",
    //   value: status,
    //   name: "status",
    //   onChange: setStatus,
    // },
    // New dropdown:
    {
      type: "select",
      options: [
        { name: "All", id: "" },
        { name: "Today", id: "today" },
        { name: "Yesterday", id: "yesterday" },
      ],
      label: "Filter by Registration Date",
      value: registeredDate,
      name: "registeredDate",
      onChange: setRegisteredDate,
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    let newStudents = JSON.parse(localStorage.getItem("studentsData")) || [];

    if (classID) {
      newStudents = newStudents.filter(
        (i) => i.classID.toLowerCase() === classID.toLowerCase()
      );
    }

    if (name) {
      const searchName = name.toLowerCase();
      newStudents = newStudents.filter((i) => {
        const fullName = `${i.name.toLowerCase()} ${i.surname.toLowerCase()}`;
        return (
          i.name.toLowerCase().includes(searchName) ||
          i.surname.toLowerCase().includes(searchName) ||
          fullName.includes(searchName)
        );
      });
    }

    if (id) {
      const exactMatch = newStudents.find(
        (i) => i.userID.toLowerCase() === id.toLowerCase()
      );

      if (exactMatch) {
        newStudents = [exactMatch];
      } else {
        newStudents = newStudents.filter((i) =>
          i.userID.toLowerCase().includes(id.toLowerCase())
        );
      }
    }

    if (status) {
      newStudents = newStudents.filter((i) =>
        i.status.toLowerCase().includes(status.toLowerCase())
      );
    }

    if (gender) {
      newStudents = newStudents.filter((i) =>
        i.gender.toLowerCase().includes(gender.toLowerCase())
      );
    }

    if (dormitory) {
      newStudents = newStudents.filter((i) =>
        dormitories[i.dormitoryID]
          ?.toLowerCase()
          .includes(dormitory.toLowerCase())
      );
    }

    // New: Filter by registration date
    if (registeredDate) {
      const today = new Date();
      const todayDay = today.getDate();
      const todayMonth = today.getMonth();
      const todayYear = today.getFullYear();

      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const yesterdayDay = yesterday.getDate();
      const yesterdayMonth = yesterday.getMonth();
      const yesterdayYear = yesterday.getFullYear();

      newStudents = newStudents.filter((student) => {
        if (!student.date) return false;

        const studentDate = new Date(student.createdAt);
        const sDay = studentDate.getDate();
        const sMonth = studentDate.getMonth();
        const sYear = studentDate.getFullYear();

        if (
          registeredDate === "today" &&
          sDay === todayDay &&
          sMonth === todayMonth &&
          sYear === todayYear
        ) {
          return true;
        }

        if (
          registeredDate === "yesterday" &&
          sDay === yesterdayDay &&
          sMonth === yesterdayMonth &&
          sYear === yesterdayYear
        ) {
          return true;
        }

        return registeredDate === "";
      });
    }




    setStudents(newStudents);
  };

  console.log(students);
  const handleDelete = (i) => {
    let ans = window.confirm(`Are sure you want to delete user ${i}`);
    if (ans) {
      axios.delete(`/user/delete/${i}`).then((res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
        }
        setStudents(students.filter((e) => e.userID !== i));
      });
    }
  };

  const exportToExcel = () => {
    ExcelExporter({
      heading: [
        "ID",
        "Name",
        "Class",
        "Gender",
        "Father's Name",
        "Mother's Name",
      ],
      content: students.map((item) => ({
        userID: item.userID,
        name: `${item.name} ${item.surname}`,
        classID: item.classID,
        gender: item.gender,
        fatherName: getGuardianName(item, "Father"),
        motherName: getGuardianName(item, "Mother"),
      })),
      fileName: "Students",
    });
  };

  return (
    <div>
      <Search
        title=""
        exportToExcel={exportToExcel}
        handleReset={handleReset}
        handleSearch={handleSearch}
        inputFields={inputFields}
      />
      <Suspense fallback={<Loading />}>
        <StudentsTable
          route="students"
          handleDelete={handleDelete}
          students={students}
          noData="No students in the database yet"
          headCells={headCells}
          dormitories={dormitories}
        />
      </Suspense>
    </div>
  );
}

export default AllStudents;
