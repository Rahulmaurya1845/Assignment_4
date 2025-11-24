import React, { useState, useEffect } from "react";
import Search from "../../AdminComponents/shared/Search";
import Notice from "../../components/dashboard/Notice2";
import axios from "../../store/axios";

function NotificationsPage() {
  const [date, setdate] = useState("");
  const [title, settitle] = useState("");
  const [notices, setnotices] = useState([]);
  const [storeData, setstoreData] = useState([]);
  const [searchDate, setsearchDate] = useState("");
  const [searchTitle, setsearchTitle] = useState("");

  useEffect(() => {
    axios.get("/notification").then((res) => {
      setnotices(res.data);
      console.log(res.data);
      setstoreData(res.data);
    });
  }, []);

  const inputFields = [
    {
      type: "date",
      value: date,
      name: "date",
      onChange: setdate,
    },
    {
      type: "text",
      value: title,
      name: "title",
      onChange: settitle,
    },
  ];

  const handleReset = (e) => {
    e.preventDefault();
    setsearchTitle("");
    setsearchDate("");
    setnotices(storeData);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let filteredNotices = storeData;

    if (searchTitle) {
      filteredNotices = filteredNotices.filter(
        (i) =>
          i.title.toLowerCase().includes(searchTitle.toLowerCase()) ||
          i.description.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    if (searchDate) {
      filteredNotices = filteredNotices.filter(
        (i) => new Date(i.createdAt).toISOString().slice(0, 10) === searchDate
      );
    }

    setnotices(filteredNotices);
  };

  return (

    <div className="content__container" style={{ backgroundColor: " #EEF7FF" }}>
      <h3 style={{ marginLeft: "20px" }}>Notice Board</h3>

      <form style={{ marginLeft: "5px" }} action="" className="row">
        <div className="col-sm-4 mb-0 mt-2">
          <input
            type="date"
            style={{ backgroundColor: " #ffffff" }}
            value={searchDate}
            onChange={(e) => setsearchDate(e.target.value)}
            placeholder="Search by Date"
            className="form-control"
          />
        </div>
        <div className="col-sm-4 mb-3 mt-2">
          <input
            type="text"
            style={{ backgroundColor: " #ffffff" }}
            value={searchTitle}
            onChange={(e) => setsearchTitle(e.target.value)}
            placeholder="Search by Title"
            className="form-control"
          />
        </div>
        <div className="col-sm-3 d-flex  mt-2">
          <div>
            <button onClick={handleSearch} className="btn blue__btn mr-4">
              Search
            </button>
          </div>
          <div>
            <button onClick={handleReset} className="btn red__btn">
              Reset
            </button>
          </div>
        </div>
      </form>

      <div className="notice__container my-5">
        {notices.length > 0 ? (

          <Notice
            notices={notices}
          />
        ) : (
          <>
            <h6 className="text-danger text-center">
              There are no notice at the moment
            </h6>
          </>
        )}
      </div>
    </div>
  );
}

export default NotificationsPage;
