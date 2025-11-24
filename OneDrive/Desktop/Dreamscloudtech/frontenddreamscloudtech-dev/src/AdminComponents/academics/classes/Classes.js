// import React, { useState, useEffect } from "react";
// import ClassTable from "../../shared/ListTable01";
// import Search from "../../shared/Search8";
// import { Link } from "react-router-dom";
// import axios from "../../../store/axios";
// import { useHistory } from "react-router-dom";
// import { errorAlert } from "../../../utils";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   selectCampuses,
//   setClasses,
//   selectStaff,
// } from "../../../store/slices/schoolSlice";

// const tableHeadings = [
//   { id: "classCode", name: "ID" },
//   { id: "name", name: "Class" },
//   { id: "campusID", name: "Campus" },
//   { id: "group", name: "Group" },
//   { id: "division", name: "Division" },
//   { id: "prefect", name: "Prefect" },
//   { id: "teacherID", name: "Class Teacher" },
//   { id: "sba", name: "S.B.A Config" },
//   { id: "sbaStaff", name: "SBA Staff" },
// ];

// function Classes() {
//   const [name, setname] = useState("");
//   const [campus, setcampus] = useState("");
//   const [teacher, setteacher] = useState("");
//   const [classes, setclasses] = useState([]);
//   const [storeData, setstoreData] = useState([]);
//   const staff = useSelector(selectStaff);
//   const [loading, setloading] = useState(false);
//   const campuses = useSelector(selectCampuses);
//   const history = useHistory();
//   const dispatch = useDispatch();

//   // Pagination states
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     setloading(true);
//     axios.get("/classes").then((res) => {
//       setloading(false);
//       let data = res.data;
//       let classesData = data.map((e) => {
//         return {
//           ...e,
//           num: 0,
//           sba: e.sba ? "set" : "not set",
//           teacherID:
//             (staff.find((i) => i.userID === e.teacherID)?.name || "-") +
//             " " +
//             (staff.find((i) => i.userID === e.teacherID)?.surname || ""),
//           campusID: campuses.find((i) => i._id === e.campusID)?.name,
//         };
//       });
//       setclasses(classesData);
//       setstoreData(classesData);
//     });
//   }, [staff, campuses]);

//   const inputFields = [
//     {
//       type: "text",
//       label: "Search Name",
//       value: name,
//       name: "name",
//       onChange: setname,
//     },
//     {
//       type: "text",
//       label: "Search Campus",
//       value: campus,
//       name: "campus",
//       onChange: setcampus,
//     },
//     {
//       type: "text",
//       label: "Search Teacher",
//       value: teacher,
//       name: "teacher",
//       onChange: setteacher,
//     },
//   ];

//   const handleDeleteClass = (id) => {
//     const ans = window.confirm("are you sure you want to delete");
//     if (ans) {
//       axios.delete(`/classes/delete/${id}`).then(async (res) => {
//         if (res.data.error) {
//           errorAlert(res.data.error);
//           return 0;
//         }
//         const newClasses = classes.filter((course) => course._id !== id);
//         setclasses(newClasses);
//         dispatch(setClasses(newClasses));
//         let deleted = classes.find((course) => course._id === id);
//         await axios.post("/activitylog/create", {
//           activity: ` ${deleted?.name} class was deleted`,
//           user: "admin",
//         });
//         await axios.post(`/fees/delete/name`, { name });
//       });
//     }
//   };

//   const handleEditClass = (id) => {
//     history.push(`/academics/classes/edit/${id}`);
//   };

//   const handleReset = (e) => {
//     e.preventDefault();
//     setname("");
//     setcampus("");
//     setteacher("");
//     setclasses(storeData);
//     setPage(0); // reset pagination
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     let newClasses = storeData;

//     if (name) {
//       newClasses = newClasses.filter(
//         (i) =>
//           i?.name.toLowerCase().includes(name?.toLowerCase()) ||
//           i?.classCode.toLowerCase().includes(name?.toLowerCase())
//       );
//     }
//     if (campus) {
//       newClasses = newClasses.filter((i) =>
//         i?.campusID.toLowerCase().includes(campus?.toLowerCase())
//       );
//     }
//     if (teacher) {
//       newClasses = newClasses.filter((i) =>
//         i?.teacherID.toLowerCase().includes(teacher?.toLowerCase())
//       );
//     }

//     setclasses(newClasses);
//     setPage(0); // reset pagination when searching
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // Slice data according to pagination
//   const paginatedClasses = classes.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   return (
//     <div>
//       <Search
//         title="Search classes "
//         inputFields={inputFields}
//         handleSearch={handleSearch}
//         handleReset={handleReset}
//       />
//       <div>
//         <ClassTable
//           handleEdit={handleEditClass}
//           loading={loading}
//           handleDelete={handleDeleteClass}
//           data={paginatedClasses}
//           tableHeader={tableHeadings}
//           count={classes.length}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           handleChangePage={handleChangePage}
//           handleChangeRowsPerPage={handleChangeRowsPerPage}
//         />
//       </div>
//     </div>
//   );
// }
// export default Classes;

import React, { useState, useEffect } from "react";
import ClassTable from "../../shared/ListTable01";
import Search from "../../shared/Search8";
import { useHistory } from "react-router-dom";
import axios from "../../../store/axios";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCampuses,
  setClasses,
  selectStaff,
} from "../../../store/slices/schoolSlice";
import { errorAlert } from "../../../utils";

const tableHeadings = [
  { id: "classCode", name: "ID" },
  { id: "name", name: "Class" },
  { id: "campusID", name: "Campus" },
  { id: "group", name: "Group" },
  { id: "division", name: "Division" },
  { id: "prefect", name: "Prefect" },
  { id: "teacherID", name: "Class Teacher" },
  { id: "sba", name: "S.B.A Config" },
  { id: "sbaStaff", name: "SBA Staff" },
];

function Classes() {
  const [name, setname] = useState("");
  const [campus, setcampus] = useState("");
  const [teacher, setteacher] = useState("");
  const [classes, setclasses] = useState([]);
  const [storeData, setstoreData] = useState([]);
  const [students, setStudents] = useState([]);  // State for students data

  const staff = useSelector(selectStaff);
  const campuses = useSelector(selectCampuses);
  const [loading, setloading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  // Fetch students once on mount
  useEffect(() => {
    axios
      .get("/students")
      .then((res) => {
        setStudents(res.data || []);
      })
      .catch(() => setStudents([]));
  }, []);

  // Fetch classes and replace IDs with names when staff, campuses, students are available
  useEffect(() => {
    if (staff.length === 0 || campuses.length === 0 || students.length === 0) {
      return; // Wait till all data are loaded
    }

    setloading(true);
    axios.get("/classes").then((res) => {
      setloading(false);
      let data = res.data;
      let classesData = data.map((cls) => {
        // Teacher full name from staff userID
        const teacherMember = staff.find((s) => s.userID === cls.teacherID) || {};
        const teacherName = `${teacherMember.name || "-"} ${teacherMember.surname || ""}`.trim();

        // Prefect full name from students by ID
        const prefectStudent =
          students.find((st) => st._id === cls.prefect || st.userID === cls.prefect) || {};
        const prefectName = `${prefectStudent.name || "-"} ${prefectStudent.surname || ""}`.trim();

        // SBA Staff names (cls.sbaStaff can be array or string)
        let sbaStaffNames = "-";
        if (cls.sbaStaff) {
          if (Array.isArray(cls.sbaStaff)) {
            sbaStaffNames = cls.sbaStaff
              .map((id) => {
                const staffMem = staff.find((st) => st.userID === id);
                return staffMem ? `${staffMem.name} ${staffMem.surname}`.trim() : null;
              })
              .filter(Boolean)
              .join(", ");
          } else {
            const staffMem = staff.find((st) => st.userID === cls.sbaStaff);
            sbaStaffNames = staffMem ? `${staffMem.name} ${staffMem.surname}`.trim() : "-";
          }
        }

        // Campus name lookup
        const campusName = campuses.find((c) => c._id === cls.campusID)?.name || "";

        return {
          ...cls,
          sba: cls.sba ? "set" : "not set",
          teacherID: teacherName,
          prefect: prefectName,
          campusID: campusName,
          sbaStaff: sbaStaffNames,
        };
      });

      setclasses(classesData);
      setstoreData(classesData);
    });
  }, [staff, campuses, students]);

  const inputFields = [
    {
      type: "text",
      label: "Search Name",
      value: name,
      name: "name",
      onChange: setname,
    },
    {
      type: "text",
      label: "Search Campus",
      value: campus,
      name: "campus",
      onChange: setcampus,
    },
    {
      type: "text",
      label: "Search Teacher",
      value: teacher,
      name: "teacher",
      onChange: setteacher,
    },
  ];

  const handleDeleteClass = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      axios.delete(`/classes/delete/${id}`).then(async (res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
          return;
        }
        const newClasses = classes.filter((c) => c._id !== id);
        setclasses(newClasses);
        dispatch(setClasses(newClasses));
        const deleted = classes.find((c) => c._id === id);
        await axios.post("/activitylog/create", {
          activity: `${deleted?.name} class was deleted`,
          user: "admin",
        });
        await axios.post(`/fees/delete/name`, { name: deleted?.name });
      });
    }
  };

  const handleEditClass = (id) => {
    history.push(`/academics/classes/edit/${id}`);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setname("");
    setcampus("");
    setteacher("");
    setclasses(storeData);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let filtered = storeData;

    if (name) {
      filtered = filtered.filter(
        (i) =>
          i?.name.toLowerCase().includes(name.toLowerCase()) ||
          i?.classCode.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (campus) {
      filtered = filtered.filter((i) =>
        i?.campusID.toLowerCase().includes(campus.toLowerCase())
      );
    }
    if (teacher) {
      filtered = filtered.filter((i) =>
        i?.teacherID.toLowerCase().includes(teacher.toLowerCase())
      );
    }

    setclasses(filtered);
  };

  return (
    <div>
      <Search
        title="Search classes"
        inputFields={inputFields}
        handleSearch={handleSearch}
        handleReset={handleReset}
      />
      <div>
        <ClassTable
          handleEdit={handleEditClass}
          loading={loading}
          handleDelete={handleDeleteClass}
          data={classes}
          tableHeader={tableHeadings}
          count={classes.length}
        />
      </div>
    </div>
  );
}

export default Classes;