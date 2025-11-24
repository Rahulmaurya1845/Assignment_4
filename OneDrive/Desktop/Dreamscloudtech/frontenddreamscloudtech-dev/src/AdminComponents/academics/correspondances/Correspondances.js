import React, { useState, useEffect } from "react";
import CorrespondanceTable from "./CorrespndanceTable";
import { Link, useHistory } from "react-router-dom";
import axios from "../../../store/axios";
import { errorAlert } from "../../../utils";

const tableHeadings = [
  { id: "createdAt", name: "Created At" },
  { id: "subject", name: "Subject" },
  { id: "signature", name: "Created By" },
];

function Corresponses() {
  const [name, setname] = useState("");
  const [classID, setClassID] = useState("");
  const [correspondance, setcorrespondance] = useState([]);
  const [storeData, setstoreData] = useState([]);
  const [loading, setloading] = useState(false);
  const history = useHistory();

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    setloading(true);
    axios.get("/correspondance").then((res) => {
      setloading(false);
      const data = res.data;
      setcorrespondance(data);
      setstoreData(data);
    });
  }, []);

  useEffect(() => {
    axios.get("/students").then((res) => {
      const capitalizedData = res.data.map((student) => ({
        ...student,
        name: capitalizeFirstLetter(student.name),
      }));
      setStudents(capitalizedData);
    });
  }, []);

  useEffect(() => {
    if (classID) {
      const filtered = students.filter(
        (student) => student.classID === classID
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents([]);
    }
  }, [classID, students]);

  function capitalizeFirstLetter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleDeleteCorrespondance = (id) => {
    const ans = window.confirm("Are you sure you want to delete?");
    if (ans) {
      axios.delete(`/correspondance/delete/${id}`).then((res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
          return;
        }
        setcorrespondance(
          correspondance.filter((item) => item._id !== id)
        );
      });
    }
  };

  const handleEditCorrespondance = (id) => {
    history.push(`/academics/correspondance/edit/${id}`);
  };

  const handleViewCorrespondance = (id) => {
    history.push(`/academics/correspondance/view/${id}`);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setname("");
    setClassID("");
    setcorrespondance(storeData);
    setFilteredStudents([]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let results = storeData;
    let certificates = correspondance;

    if (classID) {
      const classStudentNames = filteredStudents.map((s) => s.name);
      certificates = certificates.filter((item) => item.classID === classID);

      // results = results.filter((item) =>
      //   classStudentNames.includes(item.name)
      // );
    }

    if (name) {
      // results = results.filter((item) =>
      //   item.name.toLowerCase().includes(name.toLowerCase())
      // );

      certificates = certificates.filter(
        (item) => item.name && item.name.name.toLowerCase() === name.toLowerCase()
      );
    }

    setcorrespondance(certificates);
  };

  return (
    <div>
      <div className="row mb-3">
        <div className="col-md-12">
          <h4 className="mb-3">Certificate</h4>
          <form onSubmit={handleSearch} onReset={handleReset}>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label>Class</label>
                <select
                  className="form-control"
                  value={classID}
                  onChange={(e) => setClassID(e.target.value)}
                >
                  <option value="">Select Class</option>
                  <option value="p-nur">Pre-Nursery</option>
                  <option value="nur">Nursery</option>
                  <option value="l.kg">L.KG</option>
                  <option value="u.kg">U.KG</option>
                  <option value="i-a">1st Section-A</option>
                  <option value="i-b">1st Section-B</option>
                  <option value="i-c">1st Section-C</option>
                  <option value="ii-a">2nd Section-A</option>
                  <option value="ii-b">2nd Section-B</option>
                  <option value="ii-c">2nd Section-C</option>
                  <option value="iii-a">3rd Section-A</option>
                  <option value="iii-b">3rd Section-B</option>
                  <option value="iii-c">3rd Section-C</option>
                  <option value="iv-a">4th Section-A</option>
                  <option value="iv-b">4th Section-B</option>
                  <option value="iv-c">4th Section-C</option>
                  <option value="v-a">5th Section-A</option>
                  <option value="v-b">5th Section-B</option>
                  <option value="v-c">5th Section-C</option>
                  <option value="vi-a">6th Section-A</option>
                  <option value="vi-b">6th Section-B</option>
                  <option value="vi-c">6th Section-C</option>
                  <option value="vii-a">7th Section-A</option>
                  <option value="vii-b">7th Section-B</option>
                  <option value="vii-c">7th Section-C</option>
                  <option value="viii-a">8th Section-A</option>
                  <option value="viii-b">8th Section-B</option>
                  <option value="viii-c">8th Section-C</option>
                  <option value="ix-a">9th Section-A</option>
                  <option value="ix-b">9th Section-B</option>
                  <option value="ix-c">9th Section-C</option>
                  <option value="x-a">10th Section-A</option>
                  <option value="x-b">10th Section-B</option>
                  <option value="x-c">10th Section-C</option>
                </select>
              </div>

              <div className="form-group col-md-4">
                <label>Student</label>
                <select
                  className="form-control"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  disabled={!filteredStudents.length}
                >
                  <option value="">Select Student</option>
                  {filteredStudents.map((student) => (
                    <option key={student._id} value={student.name}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group col-md-4 d-flex align-items-end">
                <button type="submit" className="btn btn-primary mr-2">
                  Search
                </button>
                <button type="reset" className="btn btn-secondary">
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="d-flex justify-content-end mb-3">
        <Link
          to="/academics/correspondance/add"
          className="btn btn-outline-info btn__lg"
        >
          Add New Certificate
        </Link>
      </div>

      <CorrespondanceTable
        handleEdit={handleEditCorrespondance}
        handleDelete={handleDeleteCorrespondance}
        data={correspondance}
        handleViewCorrespondance={handleViewCorrespondance}
        tableHeader={tableHeadings}
      />
    </div>
  );
}

export default Corresponses;
