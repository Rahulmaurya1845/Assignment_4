import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "../../store/axios";
import ListTable from "../../AdminComponents/shared/ListTable";

let thisMonth = moment().month() + 1;
let thisYear = moment().year();
let dayOne = moment(`${thisYear}-${thisMonth}-01`).format("YYYY-MM-DD");

const tableHeader = [
  { id: "createdAt", name: "Date" },
  { id: "activity", name: "Activity" },
  { id: "user", name: "User" },
];

function ActivityTabs() {
  const [from, setFrom] = useState(dayOne);
  const [to, setTo] = useState(moment().format("YYYY-MM-DD"));
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get("/activitylog").then((res) => {
      setData(res.data);
      setFilteredData(res.data);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);

    const startDate = moment(from, "YYYY-MM-DD");
    const endDate = moment(to, "YYYY-MM-DD");

    const filtered = data.filter((item) => {
      const itemDate = moment(item.createdAt, "YYYY-MM-DD");
      return itemDate.isBetween(startDate, endDate, null, "[]");
    });

    setFilteredData(filtered);
    setLoading(false);
  };

  const handleDelete = (id) => {
    axios.delete(`/activitylog/delete/${id}`).then(() => {
      setData(data.filter((i) => i._id !== id));
      setFilteredData(filteredData.filter((i) => i._id !== id));
    });
  };

  return (
    <div>
      <h3>Activity Logs</h3>
      <form
        className="row mb-3 align-items-center content__container"
        style={{ backgroundColor: "#EEF7FF" }}
      >
        <div className="col-md-3 mb-3">
          <label htmlFor="from" className="col-form-label">
            From
          </label>
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            type="date"
            className="form-control"
            style={{ backgroundColor: "#ffffff" }}
          />
        </div>

        <div className="col-md-3 mb-3">
          <label htmlFor="to" className="col-form-label">
            To
          </label>
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            type="date"
            className="form-control"
            style={{ backgroundColor: "#ffffff" }}
          />
        </div>

        <div className="col-md-3 mb-3">
          <button
            onClick={handleSearch}
            disabled={loading}
            type="submit"
            className="btn red__btn"
            style={{ marginTop: "32px" }}
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            Search
          </button>
        </div>
      </form>

      <ListTable
        handleDelete={handleDelete}
        data={filteredData}
        tableHeader={tableHeader}
        isEdit={true}
      />
    </div>
  );
}

export default ActivityTabs;
