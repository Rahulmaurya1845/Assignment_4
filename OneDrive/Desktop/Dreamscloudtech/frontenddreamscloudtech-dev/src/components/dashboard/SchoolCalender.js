import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "../../store/axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import "./SchoolCalender.css";  // Add this line


const localizer = momentLocalizer(moment);

function SchoolCalender() {
  const [events, setevents] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    axios.get("/calendar").then((res) => {
      setevents(res.data);
    });
  }, []);

  return (
    <div className="content__container activities__container" style={{
      backgroundColor: "#EEF7FF",
      border: "none",
      boxShadow: "none",
      fontFamily: "poppins",
      fontSize: "1rem"
    }}>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="mb-4" style={{
          fontFamily: "poppins",
          fontSize: "1.3rem"
        }}>School Event Calender</h3>
        <div>
          {user?.role === "admin" && (
            <Link to="/academics/calender/add" className="btn blue__btn" style={{
              fontFamily: "poppins",
              fontSize: "0.8rem"
            }}>
              Add New Event
            </Link>
          )}
        </div>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: 370, fontFamily: "Poppins",
          fontSize: "0.8rem"
        }}
      />
    </div>
  );
}

export default SchoolCalender;
