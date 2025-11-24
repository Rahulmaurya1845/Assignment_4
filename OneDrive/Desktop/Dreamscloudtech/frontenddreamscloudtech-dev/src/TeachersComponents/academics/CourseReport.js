import React, { useState, useEffect } from "react";
import Table from "./ReportTable";
import { useParams } from "react-router-dom";
import axios from "../../store/axios";
import PrintIcon from "@material-ui/icons/Print";
import Loading from "../../Loading";
import Search from "./Search";

function PrintStyles() {
  return (
    <style>
      {`
        @media print {
          body {
            background-color: #ffffff !important;
          }
           .print-adjust {
    margin-right: 0 !important;
  }
        }
      `}
    </style>
  );
}

function CourseReport() {
  const [students, setstudents] = useState([]);
  const { id, classID } = useParams();
  const [loading, setloading] = useState(false);
  const [term, setterm] = useState("");
  const [academicYear, setacademicYear] = useState("");
  const [show, setshow] = useState(false);
  const [showterm, setshowterm] = useState("");
  const [showyear, setshowyear] = useState("");
  const [school, setschool] = useState([]);

  useEffect(() => {
    axios.get("/school").then((res) => {
      setschool(res.data);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setshow(false);
    if (term && academicYear) {
      setloading(true);
      axios
        .get(`/sba/${classID}/${id}/${academicYear}/${term}`)
        .then((result) => {
          setloading(false);
          let data = result.data.docs;
          setshow(true);
          setshowterm(term);
          setshowyear(academicYear);
          setstudents(data.students);
        });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  console.log(students);

  return (
    <>

      {show && (
        <div className="content__container mb-5" style={{ background: "#eef7ff" }}>
          {loading && <Loading />}
          <PrintStyles />
          <button onClick={handlePrint} className="btn blue__btn float-right">

            Print <PrintIcon />
          </button>
          <div className=" mb-0" id="section-to-print">
            <div className="text-center mb-4" >
              <h3 style={{ color: "red" }}>{school?.fullName}</h3>
              <p>
                <h5 style={{ color: "#1e9fef" }}>{school?.motto}</h5>
              </p>
              <p className="print-adjust" style={{ marginRight: "100px", marginTop: -6 }}>
                <h5>Report</h5>
              </p>
            </div>

            <div className="row ml-5" style={{ marginTop: "30px", marginBottom: "10px" }}>
              <h6 className="col  ">Class: {classID.toUpperCase()}</h6>
              <h6 className="col " >Course: {id}</h6>
              <h6 className="col  ">Year: {showyear}</h6>
              <h6 className="col "  >Term: {showterm}</h6>
            </div>
            <Table rows={students} classID={classID} course={id} />
          </div>
        </div>
      )}
      <Search
        term={term}
        setterm={setterm}
        academicYear={academicYear}
        setacademicYear={setacademicYear}
        loading={loading}
        handleSearch={handleSearch}
      />
    </>
  );
}

export default CourseReport;
