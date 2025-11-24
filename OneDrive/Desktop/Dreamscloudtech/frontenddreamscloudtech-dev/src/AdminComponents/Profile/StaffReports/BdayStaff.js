import React, { useState, useEffect } from "react";
import axios from "../../../store/axios";
import { errorAlert } from "../../../utils";
import StaffTable from "../../shared/TableListUsers1";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const headCells = [
  { id: "userID", numeric: false, disablePadding: false, label: "Teacher ID" },
  { id: "photoUrl", numeric: false, disablePadding: false, label: "Photo" },
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
  { id: "position", disablePadding: false, label: "Position" },
  { id: "gender", disablePadding: false, label: "Gender" },
];

function AllStaff() {
  const [name, setName] = useState("");
  const [userID, setUserID] = useState("");
  const query = useQuery();
  const defaultFilter = query.get("filter") || "Today";
  const [birthdayFilter, setBirthdayFilter] = useState(defaultFilter);

  const [staff, setStaff] = useState([]);
  const [storeData, setStoreData] = useState([]); // Keeps unfiltered data
  const [loading, setLoading] = useState(false);

useEffect(() => {
  setLoading(true);
  axios.get("/teachers")
    .then((res) => {
      setLoading(false);
      const formatted = res.data.map((item) => ({
        ...item,
        gender: capitalize(item.gender),
        position: capitalize(item.position),
      }));
      setStoreData(formatted);
      setStaff(getFilteredByBirthday(formatted, defaultFilter));
    })
    .catch(() => setLoading(false));
}, [defaultFilter]);


  const capitalize = (str) =>
    str
      ? str
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ")
      : "";

  const getFilteredByBirthday = (data, filter) => {
    if (!filter) return data;
    const today = new Date();
    let targetDate = new Date(today);
    if (filter === "Tomorrow") targetDate.setDate(today.getDate() + 1);
    if (filter === "Yesterday") targetDate.setDate(today.getDate() - 1);

    const d = targetDate.getDate();
    const m = targetDate.getMonth() + 1;

    return data.filter((i) => {
      if (!i.dateofBirth) return false;
      const dob = new Date(i.dateofBirth);
      return dob.getDate() === d && dob.getMonth() + 1 === m;
    });
  };

  const handleSearch = () => {
    let filtered = [...storeData];
    if (name) {
      filtered = filtered.filter((i) =>
        (i.name || "").toLowerCase().includes(name.toLowerCase()) ||
        (i.surname || "").toLowerCase().includes(name.toLowerCase())
      );
    }
    if (userID) {
      filtered = filtered.filter((i) =>
        (i.userID || "").toLowerCase().includes(userID.toLowerCase())
      );
    }
    if (birthdayFilter) {
      filtered = getFilteredByBirthday(filtered, birthdayFilter);
    }
    setStaff(filtered);
  };

  const handleReset = () => {
    setName("");
    setUserID("");
    setBirthdayFilter("Today");
    setStaff(getFilteredByBirthday(storeData, "Today"));
  };

  const handleDelete = (id) => {
    if (!window.confirm(`Delete staff ${id}?`)) return;
    axios.delete(`/teachers/delete/${id}`).then((res) => {
      if (res.data.error) return errorAlert(res.data.error);
      setStaff(staff.filter((s) => s.userID !== id));
    });
  };

  const handleWithdraw = (id) => {
    if (!window.confirm(`Withdraw staff ${id}?`)) return;
    axios.put(`/teachers/update/${id}`, { withdraw: true }).then((res) => {
      if (res.data.error) return errorAlert(res.data.error);
      setStaff(staff.filter((s) => s.userID !== id));
    });
  };

  return (
    <>
      <form className="mb-0 content__container" style={{ backgroundColor: "#EEF7FF" }}>
        <h3 className="mb-3">Staff Search</h3>
        <div className="d-flex align-items-center mb-4">
          <div className="d-flex align-items-center gap-2 flex-grow-1">
            <div className="flex-grow-1 me-2 mb-1">
              <label className="form-label">Search by Name</label>
              <input
                type="text"
                className="form-control py-3"
                value={name}
                placeholder="Search by Name"
                onChange={(e) => setName(e.target.value)}
                style={{ backgroundColor: "#ffffff" }}
              />
            </div>
            <div className="flex-grow-1 me-2 mb-1">
              <label className="form-label">Search by UserID</label>
              <input
                type="text"
                className="form-control py-3"
                value={userID}
                placeholder="Search by UserID"
                onChange={(e) => setUserID(e.target.value)}
                style={{ backgroundColor: "#ffffff" }}
              />
            </div>
            <div className="flex-grow-1 me-2 mb-1">
              <label className="form-label">Birthday Filter</label>
              <select
                className="form-select form-select-sm py-2"
                value={birthdayFilter}
                onChange={(e) => setBirthdayFilter(e.target.value)}
                style={{ backgroundColor: "#ffffff" }}
              >
                <option hidden>Select</option>
                <option value="Today">Today</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="Yesterday">Yesterday</option>
              </select>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 mt-4">
            <button className="btn orange__btn" type="button" onClick={handleSearch}>
              Search
            </button>
            <button className="btn lred__btn" type="button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </form>

      <StaffTable
        route="staff"
        loading={loading}
        noData="No staff members yet"
        students={staff}
        handleWithdraw={handleWithdraw}
        handleDelete={handleDelete}
        headCells={headCells}
      />
    </>
  );
}

export default AllStaff;
