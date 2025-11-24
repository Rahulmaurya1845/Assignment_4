import React, { useState, useEffect } from "react";
import axios from "../../../store/axios";

import { useSelector } from "react-redux";
import { selectCampuses } from "../../../store/slices/schoolSlice";
// import Excel from "../../../components/tables/ExcelExport";

function EnrollmentStatics() {
  const [school, setschool] = useState({});
  const [data, setdata] = useState([]);
  const campuses = useSelector(selectCampuses);

  useEffect(() => {
    axios.get("/school").then((res) => {
      setschool(res.data);
    });
  }, []);

  useEffect(() => {
    const getData = async () => {
      let students = await (await axios.get("/students")).data;
      axios.get(`/classes`).then((res) => {
        setdata(
          res.data.map((e) => {
            let classStudents = students.filter(
              (i) => i.classID === e.classCode
            );
            let female = classStudents.filter((i) => i.gender === "female")
              .length;
            let male = classStudents.filter((i) => i.gender === "male").length;
            return {
              ...e,
              female,
              male,
              total: classStudents.length,
              unspecified: classStudents.length - (male + female),
              campus: campuses.find((i) => i._id === e.campusID)?.name,
            };
          })
        );
      });
    };

    getData();
  }, [campuses]);

  const handlePrint = () => {
    window.print();
  };

  const columns = [
    { id: "name", name: "Class" },
    { id: "campus", name: "Campus" },
    { id: "male", name: "Male" },
    { id: "female", name: "Female" },
    { id: "unspecified", name: "Unspecified" },
    { id: "total", name: "Total" },
  ];
  data.reverse();
  return (
    <>
    <style>
    {`
      @media print {
        body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
           thead, thead tr, thead th {
            background-color: #4fb1f6 !important;
            color: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        table {
          width: 100% !important;
          border-collapse: collapse !important;
          font-family: Arial, sans-serif !important;
          box-shadow: none !important; /* shadows don’t render on print */
          
        }
        th, td {
          padding: 10px !important;
          border: 1px solid #ddd !important;
        }
        thead {
          background-color: #4fb1f6 !important;
          color: white !important;
        }
        tr:nth-child(even) {
          background-color: #EEF7FF !important;
        }
        tr:nth-child(odd) {
          background-color: white !important;
        }
        tr:hover {
          background-color: #d8ecff !important;
        }
      }
    `}
  </style>
      <div className="content__container" id="section-to-print">
        <div className="text-center">
          {/* <img width="100px" src={getImgSrc(school?.profileUrl)} alt="" /> */}
          <h5>
            <strong>{school?.fullName}</strong>
          </h5>
          <h6>{school?.motto}</h6>

          <h5 className="my-4">ENROLLMENT STATISTICS</h5>
        </div>
        <table
         style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          fontFamily: "Arial, sans-serif",
        }}
        >
          <thead 
           style={{ backgroundColor: "#4fb1f6", color: "white" }}
          >
            <tr>
              <th style={{ padding: "12px", border: "1px solid #ddd" }} scope="col">Class</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }} scope="col">Campus</th>
             
              <th style={{ padding: "12px", border: "1px solid #ddd" }} scope="col">Male</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }} scope="col">Female</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }} scope="col">UnSpecified</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }} scope="col">Total</th>
            </tr>
          </thead>
          <tbody >
            {data &&
              data.map((e, index) => (
                <tr key={e._id}
                style={{
                  textAlign: "center",
                  backgroundColor: index % 2 === 0 ? "white" : "#EEF7FF",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(ev) =>
                  (ev.currentTarget.style.backgroundColor = "#d8ecff")
                }
                onMouseLeave={(ev) =>
                  (ev.currentTarget.style.backgroundColor =
                    index % 2 === 0 ? "white" : "#EEF7FF")
                }
                >
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{e?.name}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{e?.campus}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{e?.male}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{e?.female}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{e?.unspecified}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{e?.total}</td>
                </tr>
              ))}
            <tr  style={{ fontWeight: "bold", backgroundColor: "white", color: "black" }}
      >
              <th  style={{ padding: "12px", border: "1px solid #ddd" }}>Total</th>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}></td>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>{data.reduce((v, i) => v + i.male, 0)}</td>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>{data.reduce((v, i) => v + i.female, 0)}</td>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>{data.reduce((v, i) => v + i.unspecified, 0)}</td>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>{data.reduce((v, i) => v + i.total, 0)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="my-3 text-center">
        <button onClick={handlePrint} className="btn blue__btn mr-2">
          Print
        </button>
        {/* <Excel data={data} columns={columns} /> */}
      </div>
    </>
  );
}

export default EnrollmentStatics;

