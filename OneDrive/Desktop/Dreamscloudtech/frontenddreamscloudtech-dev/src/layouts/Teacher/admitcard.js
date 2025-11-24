// import React, { useEffect, useState, useRef } from 'react';
// import axios from '../../store/axios';
// import './admitcard.css';

// const AdmitCards = () => {
//     const [students, setStudents] = useState([]);
//     const [filteredStudents, setFilteredStudents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // School info
//     const [schoolName, setSchoolName] = useState("Enter School Name");
//     const [address, setAddress] = useState("");

//     // Filters
//     const [classID, setClassID] = useState("");
//     const [rollNo, setRollNo] = useState("");
//     const [searchName, setSearchName] = useState("");

//     const [classList, setClassList] = useState([]);

//     const printRef = useRef();

//     useEffect(() => {
//         axios.get(`/school`).then((res) => {
//             const data = res?.data;
//             setSchoolName(data?.fullName || "Enter School Name");
//             setAddress(data?.address || "");
//         });

//         axios.get('/students').then((res) => {
//             setStudents(res.data);
//             setFilteredStudents(res.data);
//             setLoading(false);
//         }).catch(err => {
//             setError(err.message);
//             setLoading(false);
//         });

//         axios.get('/classes').then((res) => {
//             setClassList(res.data);
//         });
//     }, []);

//     const handleSearch = (e) => {
//         e.preventDefault();
//         const filtered = students.filter(student => {
//             const matchClass = classID ? student.classID === classID : true;
//             const matchRoll = rollNo ? student.userID?.toLowerCase().includes(rollNo.toLowerCase()) : true;
//             const matchName = searchName
//                 ? `${student.name} ${student.surname}`.toLowerCase().includes(searchName.toLowerCase())
//                 : true;
//             return matchClass && matchRoll && matchName;
//         });
//         setFilteredStudents(filtered);
//     };

//     const handleReset = () => {
//         setClassID("");
//         setRollNo("");
//         setSearchName("");
//         setFilteredStudents(students);
//     };

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div className="admitCardsContainer">
//             <h1>Student Admit Cards</h1>

//             {/* Search Filters */}
//             <form className="content__container row mb-4" onSubmit={handleSearch}>
//                 <div className="col-sm-4">
//                     <label htmlFor="classID">Class</label>
//                     <select
//                         className="form-select"
//                         value={classID}
//                         onChange={(e) => setClassID(e.target.value)}
//                     >
//                         <option value="">All</option>
//                         {classList.slice().reverse().map((cls) => (
//                             <option value={cls.classCode} key={cls._id}>{cls.name}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="col-sm-4">
//                     <label htmlFor="rollNo">Roll No</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         value={rollNo}
//                         onChange={(e) => setRollNo(e.target.value)}
//                         placeholder="Search by Roll No"
//                     />
//                 </div>
//                 <div className="col-sm-4">
//                     <label htmlFor="name">Student Name</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         value={searchName}
//                         onChange={(e) => setSearchName(e.target.value)}
//                         placeholder="Search by Name"
//                     />
//                 </div>
//                 <div className="col-sm-12 mt-3 d-flex">
//                     <button type="submit" className="btn blue__btn mr-2">Search</button>
//                     <button type="button" className="btn red__btn" onClick={handleReset}>Reset</button>
//                 </div>
//             </form>

//             {/* Print Button */}
//             <button onClick={() => window.print()} className="printButton">
//                 Print All
//             </button>

//             {/* Printable Section */}
//             <div ref={printRef} className="printSection">
//                 {filteredStudents.length === 0 && <div>No students found.</div>}
//                 {filteredStudents.map(student => (
//                     <div key={student._id} className="admitCardOuter">
//                         <div className="admitCard">
//                             <div className="admitCardTop">
//                                 <img src={process.env.REACT_APP_SCHOOL_LOGO} alt="School logo" className="Image1" />
//                                 <div className="schoolDetails">
//                                     <h2>{schoolName}</h2>
//                                     <h4>{address}</h4>
//                                 </div>
//                             </div>

//                             <div className="admitCardMiddle">
//                                 <h3>Student Details</h3>
//                                 <div className="details">
//                                     <div className="leftDetails">
//                                         <p>Name :</p>
//                                         <p>Class :</p>
//                                         <p>Roll No :</p>
//                                         <p>Father's Name :</p>
//                                         <p>Contact No. :</p>
//                                     </div>
//                                     <div className="rightDetails">
//                                         <p>{student.name} {student.surname}</p>
//                                         <p>{student.classID?.toUpperCase()}</p>
//                                         <p>{student.userID || 'N/A'}</p>
//                                         <p>{student.guadian?.[0]?.name || 'Not provided'}</p>
//                                         <p>{student.mobilenumber || 'Not provided'}</p>
//                                     </div>
//                                     <img
//                                         src={student.image || 'https://i.ibb.co/7JDyjf0/image-2-removebg-preview.png'}
//                                         alt="Student"
//                                         className="studentImage"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="admitCardBottom">
//                                 <h4>Address : {student.physicalAddress || student.postalAddress || 'Not provided'}</h4>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AdmitCards;
