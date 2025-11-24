import React, { useState, useEffect, Suspense } from "react";
// import Search from "./Search";
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
  const classes = useSelector(selectClasses);
  // const [storeData, setStoreData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dormitories, setDormitories] = useState({});

  const classesOptions = classes.map((e) => ({
    name: e.name,
    id: e.classCode,
  }));
  classesOptions.reverse();
  // const capitalizeFirstLetter = (str) => {
  //   if (!str) return '';
  //   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  // };

  const capitalizeFirstLetter = (str) => {
    if (!str) return '';

    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  useEffect(() => {
    setLoading(true);

    // 1a. Check for existing dormitory data in local storage
    let dormitoryExists = false;
    const localDorms = localStorage.getItem("dormitoriesData");
    if (localDorms) {
      try {
        const parsedDorms = JSON.parse(localDorms);
        // Only consider it valid if the object has keys
        if (parsedDorms && Object.keys(parsedDorms).length > 0) {
          setDormitories(parsedDorms);
          dormitoryExists = true;
        }
      } catch (err) {
        dormitoryExists = false;
      }
    }

    // 2. Fetch current student data from the API in the background
  axios.get("/students")
    .then((res) => {
      console.log("Fetched students:", res.data); // ✅ Check here

      const processed = res.data.map(student => ({
        ...student,
        gender: student.gender?.toLowerCase(),
        // status: capitalizeFirstLetter(student.status),
        classID: student.classID?.toUpperCase(),
      }));

      const maleStudents = processed.filter(s => s.gender === "male");
      console.log("Filtered male students:", maleStudents); // ✅ Check here

      setStudents(maleStudents);

      // 5. Fetch dormitory data only if valid data is not already in local storage
      if (!dormitoryExists) {
        const dormitoryPromises = maleStudents.map(student =>
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
          // Save dormitory data to local storage
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

  const downloadPdf = async () => {
    const docDefinition = {
      pageOrientation: "landscape",
      content: [
        {
          text: "Students List",
          style: "header",
          alignment: "center",
          margin: [0, 0, 0, 20],
        },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", 60, 60, "*", "*"],
            body: [
              [
                { text: "Roll No", style: "tableHeader", minHeight: 40 },
                { text: "Name", style: "tableHeader", minHeight: 40 },
                { text: "Class", style: "tableHeader", minHeight: 40 },
                { text: "Gender", style: "tableHeader", minHeight: 40 },
                { text: "Father Name", style: "tableHeader", minHeight: 40 },
                { text: "Mother Name", style: "tableHeader", minHeight: 40 },
              ],
              ...students.map((student, idx) => [
                {
                  text: student.userID ?? "N/A",
                  style: `${idx % 2 === 0 ? "box1" : "box2"}`,
                },
                {
                  text: `${student.name} ${student.surname}` ?? "N/A",
                  style: `${idx % 2 === 0 ? "box1" : "box2"}`,
                },
                {
                  text: student.classID ?? "N/A",
                  style: `${idx % 2 === 0 ? "box1" : "box2"}`,
                },
                {
                  text: student.gender ?? "N/A",
                  style: `${idx % 2 === 0 ? "box1" : "box2"}`,
                },
                {
                  text: getGuardianName(student, "Father") ?? "N/A",
                  style: `${idx % 2 === 0 ? "box1" : "box2"}`,
                },
                {
                  text: getGuardianName(student, "Mother") ?? "N/A",
                  style: `${idx % 2 === 0 ? "box1" : "box2"}`,
                },
              ]),
            ],
          },
          layout: {
            hLineColor: () => "#CECECE",
            vLineColor: () => "#CECECE",
            hLineWidth: function (i, node) {
              return 0.2; // 1pt horizontal lines
            },
            vLineWidth: function (i, node) {
              return 0.2; // 1pt vertical lines
            },
          },
        },
      ],
      styles: {
        header: { fontSize: 18, bold: true },
        tableHeader: {
          fillColor: "#4fb1f6",
          color: "#ffffff",
          bold: true,
          alignment: "center",
          margin: [8, 8, 8, 8],
        },
        box1: {
          fillColor: "#ffffff",
          color: "#000000",
          alignment: "center",
          margin: [8, 8, 8, 8],
        },
        box2: {
          fillColor: "#CECECE",
          color: "#000000",
          alignment: "center",
          margin: [8, 8, 8, 8],
        },
      },
      defaultStyle: {
        fontSize: 12,
        alignment: "center",
        margin: [8, 8, 8, 8],
      },
    };

    try {
      pdfMake.createPdf(docDefinition).download("students.pdf");
    } catch (error) {
      console.error(error);
    }
  };

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
    // setStudents(storeData);
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
  ];



  const handleSearch = (e) => {
    e.preventDefault();

    console.log("Search criteria:", {
      id,
      name,
      classID,
      status,
      gender,
      dormitory,
    });
    let newStudents = [...students];

    // Filter by class if a class is selected.
    if (classID) {
      // If your dropdown returns an object, adjust here (e.g. classID.id)
      newStudents = newStudents.filter(
        (i) => i.classID.toLowerCase() === classID.toLowerCase()
      );
    }

    // Filter by name if provided.
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

    // Filter by student ID if provided.
    if (id) {
      const exactMatch = newStudents.find(
        (i) => i.userID.toLowerCase() === id.toLowerCase()
      );

      if (exactMatch) {
        newStudents = [exactMatch]; // Return only the exact match.
      } else {
        newStudents = newStudents.filter((i) =>
          i.userID.toLowerCase().includes(id.toLowerCase())
        );
      }
    }

    // Filter by status if provided.
    if (status) {
      newStudents = newStudents.filter((i) =>
        i.status.toLowerCase().includes(status.toLowerCase())
      );
    }

    // Filter by gender if provided.
    if (gender) {
      newStudents = newStudents.filter((i) =>
        i.gender.toLowerCase().includes(gender.toLowerCase())
      );
    }

    // Filter by dormitory if provided.
    if (dormitory) {
      newStudents = newStudents.filter((i) =>
        dormitories[i.dormitoryID]
          ?.toLowerCase()
          .includes(dormitory.toLowerCase())
      );
    }

    console.log("Filtered students:", newStudents);
    setStudents(newStudents);
  };

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
      heading: ["ID","Name", "Class","Gender", "Father's Name", "Mother's Name"],
      content: students.map((item) => ({
        userID: item.userID,
        name: `${item.name} ${item.surname}`,
        classID: item.classID,
        gender: item.gender,
        fatherName: getGuardianName(item, "Father"),
        motherName: getGuardianName(item, "Mother"),
      })),
      fileName: "Students",
    })
  };

  return (
    <div>
      {/* {loading && <Loading />} */}
      <Search
        title=""
        exportToExcel={exportToExcel}
        downloadPdf={downloadPdf}
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
