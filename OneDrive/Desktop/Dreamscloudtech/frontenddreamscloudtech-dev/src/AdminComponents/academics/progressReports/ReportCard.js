// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "../../../store/axios";
// import PrintIcon from "@material-ui/icons/Print";
// import './report-card.css'

// function ReportCard() {
//   const { id, year, term } = useParams();
//   const [results, setresults] = useState([]);
//   const [user, setuser] = useState({});
//   const [school, setschool] = useState([]);

//   function getCapitalize(str) {
//     if (!str) return '';
//     return str
//       .split(' ')
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(' ');
//   }

//   useEffect(() => {
//     axios.get("/school").then((res) => {
//       setschool(res.data);
//     });
//   }, []);

//   useEffect(() => {
//     const getData = async () => {
//       let student = await axios.get(`/students/student/${id}`);
//       setuser(student.data.student);
//       await axios.get(`sba/student/${id}/${year}/${term}`).then((res) => {
//         setresults(res.data.docs);
//         console.log(res.data.docs);
//       });
//     };
//     getData();
//   }, [id, year, term]);

//   const handlePrint = () => {
//     window.print();
//   };

//   const getTotal = (exams, work) => {
//     if (!work && !exams) {
//       return "-";
//     }
//     return Number(exams || 0) + Number(work || 0);
//   };

//   const getGrade = (classwork, exam) => {
//     if (!classwork && !exam) {
//       return "-";
//     }
//     let num = getTotal(classwork, exam);
//     if (num >= 75 && num <= 100) {
//       return "A1";
//     } else if (num >= 70 && num <= 74) {
//       return "B2";
//     } else if (num >= 65 && num <= 69) {
//       return "B3";
//     } else if (num >= 60 && num <= 64) {
//       return "C4";
//     } else if (num >= 55 && num <= 59) {
//       return "C5";
//     } else if (num >= 50 && num <= 54) {
//       return "C6";
//     } else if (num >= 45 && num <= 49) {
//       return "D7";
//     } else if (num >= 40 && num <= 44) {
//       return "E8";
//     } else if (num >= 0 && num <= 39) {
//       return "F9";
//     } else {
//       return null;
//     }
//   };

//   const getInterpretation = (classwork, exam) => {
//     if (!classwork && !exam) {
//       return "-";
//     }
//     let num = getTotal(classwork, exam);
//     num = Number(num);
//     if (num > 75 && num <= 100) {
//       return "Excellent";
//     } else if (num >= 70 && num <= 74) {
//       return "Vert good";
//     } else if (num >= 65 && num <= 69) {
//       return "Good";
//     } else if (num >= 60 && num <= 64) {
//       return "Credit";
//     } else if (num >= 55 && num <= 59) {
//       return "Credit";
//     } else if (num >= 50 && num <= 54) {
//       return "Credit";
//     } else if (num >= 45 && num <= 49) {
//       return "Pass";
//     } else if (num >= 40 && num <= 44) {
//       return "Pass";
//     } else if (num >= 0 && num <= 39) {
//       return "Failure";
//     } else {
//       return null;
//     }
//   };

//   return (
//     <>
//       {/* <div className="d-flex justify-content-end mb-2">
//         <button onClick={handlePrint} className="btn blue__btn">
//           <PrintIcon />
//           Print
//         </button>
//       </div> */}
//       {/* <div id="section-to-print">
//         <div className="text-center mb-4">
//           <h3 style={{}}>{school?.fullName}</h3>
//           <p>
//             <strong style={{ fontSize: "17px" }}>{school?.motto}</strong>
//           </p>
//           <h5>Report Card</h5>
//         </div>
//         <div className="mb-3">
//           <div className="d-flex text-left ">
//             <h6 className="mb-0 mr-5" >
//               Name: {user?.name} {user?.middleName} {user?.surname} - {id}
//             </h6>
//             <h6 className="mb-0 mr-5">
//               Class: {user?.classID ? user.classID.toUpperCase() : "N/A"}
//             </h6>
//             <h6 className="d-flex flex-column ml-auto text-right">
//               Year: {year}
//             </h6>
//             <h6 className="mb-0 text-right ml-5 mr-2">
//               Term: {term}
//             </h6>
//           </div>
//         </div>
//         <table className="table table-bordered2">
//           <thead>
//             <tr> 
//               <th scope="col">Courses</th>
//               <th scope="col">Classwork</th>
//               <th scope="col">Classwork Percentage</th>
//               <th scope="col">Exam</th>
//               <th scope="col">Exam Percentage</th>
//               <th scope="col">Total %</th>
//               <th scope="col">Grade</th>
//               <th scope="col">Interpretation</th>
//               <th scope="col">Position</th>
//             </tr>
//           </thead>
//           <tbody>
//             {results.length > 0 ? (
//               results.map((res) => (
//                 <tr key={res?._id}>
//                   <td>{getCapitalize(res?.course)}</td>
//                   <td>{res.classWork || "-"}</td>
//                   <td>{res.classWorkPercentage || "-"}</td>
//                   <td>{res?.exam || "-"}</td>
//                   <td>{res?.examPercentage || "-"}</td>
//                   <td>
//                     {getTotal(res?.examPercentage, res.classWorkPercentage)}
//                   </td>
//                   <td>
//                     {getGrade(res?.examPercentage, res.classWorkPercentage)}
//                   </td>
//                   <td>
//                     {getInterpretation(
//                       res?.examPercentage,
//                       res.classWorkPercentage
//                     )}
//                   </td>
//                   <td>{res?.position || 0} </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={9} className="text-center text-danger">
//                   <h5>No data yet</h5>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div> */}
    

//     </>
//   );
// }

// export default ReportCard;






import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../store/axios";
import PrintIcon from "@material-ui/icons/Print";
import "./report-card.css";

function ReportCard() {
  const { id, year, term } = useParams();
  const [results, setresults] = useState([]);
  const [user, setuser] = useState({});
  const [school, setschool] = useState([]);

  useEffect(() => {
    axios.get("/school").then((res) => {
      setschool(res.data);
    });
  }, []);

  useEffect(() => {
    const getData = async () => {
      let student = await axios.get(`/students/student/${id}`);
      setuser(student.data.student);
      let res = await axios.get(`/sba/student/${id}/${year}/${term}`);
      setresults(res.data.docs);
    };
    getData();
  }, [id, year, term]);

  const handlePrint = () => {
    window.print();
  };

  const getTotal = (exams, work) => (exams || 0) + (work || 0);

  const getGrade = (classwork, exam) => {
    let num = getTotal(classwork, exam);
    if (num >= 75) return "A";
    if (num >= 70) return "B";
    if (num >= 65) return "C";
    if (num >= 60) return "D";
    if (num >= 50) return "E";
    return "F";
  };

  const getInterpretation = (classwork, exam) => {
    let num = getTotal(classwork, exam);
    if (num >= 75) return "EXCELLENT";
    if (num >= 70) return "VERY GOOD";
    if (num >= 65) return "GOOD";
    if (num >= 60) return "SATISFACTORY";
    if (num >= 50) return "PASS";
    return "FAIL";
  };

  return (
    <div className="unique-report">
      <div className="unique-report__container bg-white">
        <div id="section-to-print" className="unique-report__card">
          <div className="unique-report__header">
            <h1>{school?.fullName}</h1>
            <h2>REPORT CARD</h2>
          </div>

          <div className="unique-report__info">
            <div className="unique-report__info-group">
              <div className="unique-report__info-item">
                <span>NAME OF STUDENT:</span>
                <span>{user?.name} {user?.middleName} {user?.surname}</span>
              </div>
              <div className="unique-report__info-item">
                <span>STUDENT ID:</span>
                <span>{user?.userID}</span>
              </div>
            </div>
            <div className="unique-report__info-group">
              <div className="unique-report__info-item">
                <span>SCHOOL YEAR:</span>
                <span>{year}</span>
              </div>
              <div className="unique-report__info-item">
                <span>TERM:</span>
                <span>{term}</span>
              </div>
              <div className="unique-report__info-item">
                <span>CLASS:</span>
                <span>{user?.classID?.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div className="unique-report__grades">
            <table>
              <thead>
                <tr>
                  <th>SUBJECT</th>
                  <th>CLASSWORK</th>
                  <th>CLASSWORK %</th>
                  <th>EXAM</th>
                  <th>EXAM %</th>
                  <th>TOTAL %</th>
                  <th>GRADE</th>
                  <th>INTERPRETATION</th>
                  <th>POSITION</th>
                </tr>
              </thead>
              <tbody>
                {results.length > 0 ? (
                  results.map((res) => (
                    <tr key={res?._id}>
                      <td>{res?.course.toUpperCase()}</td>
                      <td>{res.classWork || "-"}</td>
                      <td>{res.classWorkPercentage || "-"}</td>
                      <td>{res?.exam || "-"}</td>
                      <td>{res?.examPercentage || "-"}</td>
                      <td>{getTotal(res?.examPercentage, res.classWorkPercentage)}</td>
                      <td>{getGrade(res?.examPercentage, res.classWorkPercentage)}</td>
                      <td>{getInterpretation(res?.examPercentage, res.classWorkPercentage)}</td>
                      <td>{res?.position}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="unique-report__no-data">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="unique-report__footer">
            <div className="unique-report__behavior">
              <h3>BEHAVIOR</h3>
              <div className="unique-report__behavior-items">
                <div className="unique-report__behavior-item">
                  <input type="checkbox" id="diligent" />
                  <label htmlFor="diligent">DILIGENT</label>
                </div>
                <div className="unique-report__behavior-item">
                  <input type="checkbox" id="responsible" />
                  <label htmlFor="responsible">RESPONSIBLE</label>
                </div>
                <div className="unique-report__behavior-item">
                  <input type="checkbox" id="respectful" />
                  <label htmlFor="respectful">RESPECTFUL</label>
                </div>
                <div className="unique-report__behavior-item">
                  <input type="checkbox" id="resourceful" />
                  <label htmlFor="resourceful">RESOURCEFUL</label>
                </div>
                <div className="unique-report__behavior-item">
                  <input type="checkbox" id="attentive" />
                  <label htmlFor="attentive">ATTENTIVE</label>
                </div>
              </div>
            </div>

            <div className="unique-report__grading">
              <h3>GRADING SYSTEM</h3>
              <div className="unique-report__grading-items">
                <div className="unique-report__grading-item">
                  <span>A: EXCELLENT</span>
                  <span>B: VERY GOOD</span>
                  <span>C: GOOD</span>
                  <span>D: SATISFACTORY</span>
                  <span>E: PASS</span>
                  <span>F: FAIL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="unique-report__print">
          <button onClick={handlePrint} className="unique-report__print-btn">
            <PrintIcon />
            Print Report Card
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportCard;
