import React, { useState, useEffect } from "react";
// import Cards from "../../components/dashboard/Card";
import NoticeBoard from "../../components/dashboard/NoticeBoard";
import SchoolCalender from "../../components/dashboard/SchoolCalender";
import ClassIcon from "@material-ui/icons/Class";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import CallToActionIcon from "@material-ui/icons/CallToAction";
import axios from "../../store/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import AcademicYear from "../../AdminComponents/dashboard/AcademicYear";
import Cards from "../../AdminComponents/dashboard/Cards2";


function Index() {
  const user = useSelector(selectUser);
  const [count, setcount] = useState({});

  useEffect(() => {
    axios.get(`/staff/count/${user?.userID}`).then((res) => {
      console.log(res.data);
      setcount(res.data.count);
    });
  }, [user]);

  let attendancePercentage = (count?.attendance / 30) * 100;

  return (
    <div className="teacher__dashboard">

      <Cards />
      <div className="row mb-5">
      </div>
    </div>
  );
}

export default Index;
