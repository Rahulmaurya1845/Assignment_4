import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import { selectYearGroup } from "../../store/slices/schoolSlice";
import axios from "../../store/axios";
import PrintIcon from "@material-ui/icons/Print";
import Search from "./Search";
import "./report-card.css";

function ReportCard() {
  const [results, setresults] = useState([]);
  const currentUser = useSelector(selectUser);
  const [user, setuser] = useState({});
  const [show, setshow] = useState(false);
  const [year, setyear] = useState("");
  const years = useSelector(selectYearGroup);
  const [term, setterm] = useState("");
  const [loading, setloading] = useState(false);
  const [selectedterm, setselectedterm] = useState("");
  const [selectedyear, setselectedyear] = useState("");
  const [school, setschool] = useState([]);

  useEffect(() => {
    axios.get("/school").then((res) => {
      setschool(res.data);
    });
  }, []); 

  useEffect(() => {
    const getData = async () => {
      let student = await axios.get(`/students/student/${currentUser?.userID}`);
      setuser(student.data.student);
    };
    getData();
  }, [currentUser]);

  const handlePrint = () => {
    window.print();
  };

  const getTotal = (exams, work) => {
    if (!work && !exams) {
      return "-";
    }
    return Number(exams || 0) + Number(work || 0);
  };

  const getGrade = (classwork, exam) => {
    if (!classwork && !exam) {
      return "-";
    }
    let num = getTotal(classwork, exam);
    if (num >= 75 && num <= 100) {
      return "A";
    } else if (num >= 70 && num <= 74) {
      return "B";
    } else if (num >= 65 && num <= 69) {
      return "C";
    } else if (num >= 60 && num <= 64) {
      return "D";
    } else if (num >= 55 && num <= 59) {
      return "D";
    } else if (num >= 50 && num <= 54) {
      return "D";
    } else if (num >= 45 && num <= 49) {
      return "E";
    } else if (num >= 40 && num <= 44) {
      return "E";
    } else if (num >= 0 && num <= 39) {
      return "F";
    } else {
      return null;
    }
  };

  const getInterpretation = (classwork, exam) => {
    if (!classwork && !exam) {
      return "-";
    }
    let num = getTotal(classwork, exam);
    num = Number(num);
    if (num > 75 && num <= 100) {
      return "EXCELLENT";
    } else if (num >= 70 && num <= 74) {
      return "VERY GOOD";
    } else if (num >= 65 && num <= 69) {
      return "GOOD";
    } else if (num >= 60 && num <= 64) {
      return "SATISFACTORY";
    } else if (num >= 55 && num <= 59) {
      return "SATISFACTORY";
    } else if (num >= 50 && num <= 54) {
      return "SATISFACTORY";
    } else if (num >= 45 && num <= 49) {
      return "PASS";
    } else if (num >= 40 && num <= 44) {
      return "PASS";
    } else if (num >= 0 && num <= 39) {
      return "FAIL";
    } else {
      return null;
    }
  };

  const handleSearch = async (e) => {
    setloading(true);
    e.preventDefault();
    await axios
      .get(`/sba/student/${currentUser?.userID}/${year}/${term}`)
      .then((res) => {
        setloading(false);
        setshow(true);
        setselectedterm(term);
        setselectedyear(year);
        setresults(res.data.docs);
      });
  };

  return (
    <div className="unique-report">
      <div className="unique-report__search">
        <Search
          yearGroup={years}
          academicYear={year}
          setacademicYear={setyear}
          term={term}
          setterm={setterm}
          loading={loading}
          handleSearch={handleSearch}
        />
      </div>
      {show && (
        <div className="unique-report__container bg-white">
          <div id="section-to-print" className="unique-report__card">
            <div className="unique-report__header">
              <div className="unique-report__logo">
                {/* <img src="https://i.ibb.co/N9Qd3Y0/th-removebg-preview.png" alt="School Logo" /> */}
                <h1>{school?.fullName}</h1>
              </div>
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
                  <span>{selectedyear}</span>
                </div>
                <div className="unique-report__info-item">
                  <span>TERM:</span>
                  <span>{selectedterm}</span>
                </div>
                <div className="unique-report__info-item">
                  <span>CLASS:</span>
                  <span>{user?.classID.toUpperCase()}</span>
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
                        <td>
                          {getTotal(res?.examPercentage, res.classWorkPercentage)}
                        </td>
                        <td>
                          {getGrade(res?.examPercentage, res.classWorkPercentage)}
                        </td>
                        <td>
                          {getInterpretation(
                            res?.examPercentage,
                            res.classWorkPercentage
                          )}
                        </td>
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
      )}
    </div>
  );
}

export default ReportCard;

