// import React, { useEffect, useState, useRef } from "react";
// import axios from "../../store/axios";
// import "./admitcard.css";

// const AdmitCards = () => {
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // School info
//   const [schoolName, setSchoolName] = useState("Enter School Name");
//   const [address, setAddress] = useState("");

//   // Filters
//   const [classID, setClassID] = useState("");
//   const [rollNo, setRollNo] = useState("");
//   const [searchName, setSearchName] = useState("");

//   const [classList, setClassList] = useState([]);

//   const printRef = useRef();

//   useEffect(() => {
//     axios.get(`/school`).then((res) => {
//       const data = res?.data;
//       setSchoolName(data?.fullName || "Enter School Name");
//       setAddress(data?.address || "");
//     });

//     axios
//       .get("/students")
//       .then((res) => {
//         setStudents(res.data);
//         setFilteredStudents(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });

//     axios.get("/classes").then((res) => {
//       setClassList(res.data);
//     });
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     const filtered = students.filter((student) => {
//       const matchClass = classID ? student.classID === classID : true;
//       const matchRoll = rollNo
//         ? student.userID?.toLowerCase().includes(rollNo.toLowerCase())
//         : true;
//       const matchName = searchName
//         ? `${student.name} ${student.surname}`
//             .toLowerCase()
//             .includes(searchName.toLowerCase())
//         : true;
//       return matchClass && matchRoll && matchName;
//     });
//     setFilteredStudents(filtered);
//   };

//   const handleReset = () => {
//     setClassID("");
//     setRollNo("");
//     setSearchName("");
//     setFilteredStudents(students);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="admitCardsContainer">
//       <h1>Student Admit Cards</h1>

//       {/* Search Filters */}
//       <form className="content__container row mb-4" onSubmit={handleSearch}>
//         <div className="col-sm-4">
//           <label htmlFor="classID">Class</label>
//           <select
//             className="form-select"
//             value={classID}
//             onChange={(e) => setClassID(e.target.value)}
//           >
//             <option value="">All</option>
//             {classList
//               .slice()
//               .reverse()
//               .map((cls) => (
//                 <option value={cls.classCode} key={cls._id}>
//                   {cls.name}
//                 </option>
//               ))}
//           </select>
//         </div>
//         <div className="col-sm-4">
//           <label htmlFor="rollNo">Roll No</label>
//           <input
//             type="text"
//             className="form-control"
//             value={rollNo}
//             onChange={(e) => setRollNo(e.target.value)}
//             placeholder="Search by Roll No"
//           />
//         </div>
//         <div className="col-sm-4">
//           <label htmlFor="name">Student Name</label>
//           <input
//             type="text"
//             className="form-control"
//             value={searchName}
//             onChange={(e) => setSearchName(e.target.value)}
//             placeholder="Search by Name"
//           />
//         </div>
//         <div className="col-sm-12 mt-3 d-flex">
//           <button type="submit" className="btn blue__btn mr-2">
//             Search
//           </button>
//           <button type="button" className="btn red__btn" onClick={handleReset}>
//             Reset
//           </button>
//         </div>
//       </form>

//       {/* Print Button */}
//       <button onClick={() => window.print()} className="printButton">
//         Print All
//       </button>

//       {/* Printable Section */}
//       <div ref={printRef} className="printSection">
//         {filteredStudents.length === 0 && <div>No students found.</div>}
//         {filteredStudents.map((student) => (
//           <div key={student._id} className="admitCardOuter">
//             <div className="admitCard">
//               <div className="admitCardTop">
//                 <img
//                   src={process.env.REACT_APP_SCHOOL_LOGO}
//                   alt="School logo"
//                   className="Image1"
//                 />
//                 <div className="schoolDetails">
//                   <h2>{schoolName}</h2>
//                   <h4>{address}</h4>
//                 </div>
//               </div>

//               <div className="admitCardMiddle">
//                 <h3>Student Details</h3>
//                 <div className="details">
//                   <div className="leftDetails">
//                     <p>Name :</p>
//                     <p>Class :</p>
//                     <p>Roll No :</p>
//                     <p>Father's Name :</p>
//                     <p>Contact No. :</p>
//                   </div>
//                   <div className="rightDetails">
//                     <p>
//                       {student.name} {student.surname}
//                     </p>
//                     <p>{student.classID?.toUpperCase()}</p>
//                     <p>{student.userID || "N/A"}</p>
//                     <p>{student.guadian?.[0]?.name || "Not provided"}</p>
//                     <p>{student.mobilenumber || "Not provided"}</p>
//                   </div>
//                   <img
//                     src={
//                       student.image ||
//                       "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
//                     }
//                     alt="Student"
//                     className="studentImage"
//                   />
//                 </div>
//               </div>

//               <div className="admitCardBottom">
//                 <h4>
//                   Address :{" "}
//                   {student.physicalAddress ||
//                     student.postalAddress ||
//                     "Not provided"}
//                 </h4>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdmitCards;

import React, { useEffect, useState, useRef } from "react";
import axios from "../../store/axios";
import "./admitcard.css";
import mainimg from "../../layouts/Admin/img12.jpg";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";

const AdmitCards = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [schoolName, setSchoolName] = useState("Enter School Name");
  const [address, setAddress] = useState("");

  const printRef = useRef();
  const user = useSelector(selectUser);

  useEffect(() => {
    // Fetch school info
    axios.get(`/school`).then((res) => {
      const data = res?.data;
      setSchoolName(data?.fullName || "Enter School Name");
      setAddress(data?.address || "");
    });

    // Fetch logged-in student only
    if (user?.userID) {
      axios
        .get(`/students/student/${user.userID}`)
        .then((res) => {
          setStudent(res.data.student);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching student:", err);
          setError("Failed to load student data");
          setLoading(false);
        });
    } else {
      setError("User not logged in");
      setLoading(false);
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!student) return <div>No student data found.</div>;

  const father = student.guadian?.find((g) => g.relationship === "Father");

  // ✅ Handle Cloudinary image fallback properly
  const studentImage =
    student?.profileUrl && student.profileUrl.trim() !== ""
      ? student.profileUrl
      : mainimg;

  return (
    <div className="admitCardsContainer">
      {/* ✅ Centered heading */}
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        My Admit Card
      </h1>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={() => window.print()} className="printButton">
          Print Admit Card
        </button>
      </div>

      {/* Printable section */}
      <div ref={printRef} className="printSection">
        <div className="admitCardOuter">
          <div className="admitCard">
            <div className="admitCardTop">
              <img
                src={process.env.REACT_APP_SCHOOL_LOGO || mainimg}
                alt="School logo"
                className="Image1"
              />
              <div className="schoolDetails">
                <h2>{schoolName}</h2>
                <h4>{address}</h4>
              </div>
            </div>

            <div className="admitCardMiddle">
              <h3>Student Details</h3>
              <div className="details">
                <div className="leftDetails">
                  <p>Name :</p>
                  <p>Class :</p>
                  <p>Roll No :</p>
                  <p>Father's Name :</p>
                  <p>Contact No. :</p>
                </div>

                <div className="rightDetails">
                  <p>
                    {student.name} {student.middleName} {student.surname}
                  </p>
                  <p>{student.classID?.toUpperCase()}</p>
                  <p>{student.userID || "N/A"}</p>
                  <p>{father?.name || "Not provided"}</p>
                  <p>{student.mobilenumber || "Not provided"}</p>
                </div>

                {/* ✅ Proper student image */}
                <img
                  src={studentImage}
                  alt="Student"
                  className="studentImage"
                  onError={(e) => (e.target.src = mainimg)}
                />
              </div>
            </div>

            <div className="admitCardBottom">
              <h4>
                Address :{" "}
                {student.physicalAddress ||
                  student.postalAddress ||
                  "Not provided"}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmitCards;
