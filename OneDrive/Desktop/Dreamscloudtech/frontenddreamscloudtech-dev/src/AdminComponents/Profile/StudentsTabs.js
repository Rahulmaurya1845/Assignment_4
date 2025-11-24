// import React from "react";
// import Card from "./SummaryCard";

// function StudentsTabs({ count }) {
//   return (
//     <div style={{ backgroundColor: "#EEF7FF" }}>
//       <h3 className="mb-5">Students Overview</h3>
//       <div className="mb-5">
//         <h3>Students</h3>
//         <div className="row ">
//           <Card
//             name="Female"
//             value={count?.femaleStudents || 0}
//             percentage={(
//               ((count?.femaleStudents || 0) / (count?.students || 0)) *
//               100
//             ).toFixed(2)}
//           />
//           <Card
//             name="Male"
//             value={count?.maleStudents || 0}
//             percentage={(
//               ((count?.maleStudents || 0) / (count?.students || 0)) *
//               100
//             ).toFixed(2)}
//           />
//           <Card name="Total" value={count?.students || 0} />
//         </div>
//       </div>
//       <div className="mb-5">
//         <h3>Admissions</h3>
//         <div className="row ">
//           <Card
//             name="Students Registered Today"
//             value={count?.todayRegisteredStudents || 0}
//           />
//           <Card
//             name="Students Registered Yesterday"
//             value={count?.yesterdayRegisteredStudents || 0}
//           />
//           <Card name="Scholarships" value={count?.scholarships || 0} />
//         </div>
//       </div>
//       <div className="mb-3 row">
//         <Card
//           name="Birthdays Today"
//           value={count?.todayBirthdayStudents || 0}
//         />
//         <Card
//           name="Birthdays Tomorrow"
//           value={count?.yesterdayBirthdayStudents || 0}
//         />
//         <Card
//           name="Birthdays Yesterday"
//           value={count?.yesterdayBirthdayStudents || 0}
//         />
//       </div>
//     </div>
//   );
// }

// export default StudentsTabs;


import axios from "../../store/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function StudentsTabs({ count }) {
  const [students, setStudents] = useState([]);

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
const [registeredToday, setRegisteredToday] = useState(0);
const [registeredYesterday, setRegisteredYesterday] = useState(0);
const [birthdaysToday, setBirthdaysToday] = useState(0);
const [birthdaysYesterday, setBirthdaysYesterday] = useState(0);
const [birthdaysTomorrow, setBirthdaysTomorrow] = useState(0);

  const renderCard = (title, value, route = "#") => {
    return (
      <div className="col-sm-6 col-md-4 mb-3">
        <div className="card p-3" style={{ backgroundColor: "#ffffff" }}>
          <div className="text-center">
            <Link className="text-info" to={route}>
              {title && (
                <div className="d-flex justify-content-center align-items-center heading bluee__btn p-2 text-light">
                  <h5>{title}</h5>
                </div>
              )}
              <div style={{ fontSize: "24px", fontWeight: "bold", paddingTop: "10px" }}>{value}</div>
              <br />
            </Link>
          </div>
        </div>
      </div>
    );
  };

useEffect(() => {
  axios.get("/students")
    .then((res) => {
      const capitalizedData = res.data.map(student => ({
        ...student,
        classID: student.classID.toUpperCase(),
        gender: capitalizeFirstLetter(student.gender),
        status: capitalizeFirstLetter(student.status)
      }));

      setStudents(capitalizedData);

      // Now compute the counts
      const today = new Date();
      const todayDay = today.getDate();
      const todayMonth = today.getMonth();

      let _registeredToday = 0;
      let _registeredYesterday = 0;
      let _birthdaysToday = 0;
      let _birthdaysYesterday = 0;
      let _birthdaysTomorrow = 0;

      capitalizedData.forEach(student => {
        // Registration Date Check
        const createdDate = new Date(student.createdAt);
        const createdDay = createdDate.getDate();
        const createdMonth = createdDate.getMonth();

        const diffInDays = Math.floor((today - createdDate) / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) {
          _registeredToday++;
        } else if (diffInDays === 1) {
          _registeredYesterday++;
        }

        // Birthday checks (compare only day & month)
        const dob = new Date(student.dateofBirth);
        const dobDay = dob.getDate();
        const dobMonth = dob.getMonth();

        if (dobDay === todayDay && dobMonth === todayMonth) {
          _birthdaysToday++;
        }

        const yesterday = new Date();
        yesterday.setDate(todayDay - 1);
        if (dobDay === yesterday.getDate() && dobMonth === yesterday.getMonth()) {
          _birthdaysYesterday++;
        }

        const tomorrow = new Date();
        tomorrow.setDate(todayDay + 1);
        if (dobDay === tomorrow.getDate() && dobMonth === tomorrow.getMonth()) {
          _birthdaysTomorrow++;
        }
      });

      // Update the states
      setRegisteredToday(_registeredToday);
      setRegisteredYesterday(_registeredYesterday);
      setBirthdaysToday(_birthdaysToday);
      setBirthdaysYesterday(_birthdaysYesterday);
      setBirthdaysTomorrow(_birthdaysTomorrow);

    })
    .catch((err) => {
      console.error("Error fetching students:", err);
    });
}, []);



  return (
    <div style={{ backgroundColor: "#EEF7FF" }}>
      <h3 className="mb-5">Students Overview</h3>
      <div className="mb-5">
        <h3>Students</h3>
        <div className="row">
          {renderCard(
            "Female",
            count?.femaleStudents || 0,
            "/student/female"
          )}
          {renderCard(
            "Male",
            count?.maleStudents || 0,
            "/student/male"
          )}
          {renderCard("Total", count?.students || 0 , "/students")}
        </div>
      </div>

      <div className="mb-5">
        <h3>Admissions</h3>
        <div className="row">
          {renderCard(
            "Students Registered Today",
            registeredToday || 0,
            "/student/registered"
          )}
          {renderCard(
            "Students Registered Yesterday",
            registeredYesterday || 0,
            "/student/registered"
          )}
          {renderCard("Scholarships", count?.scholarships || 0, "/students/scholarships")}
        </div>
      </div>

      <div className="mb-3 row">
        {renderCard("Birthdays Today", birthdaysToday|| 0, "/student/bday?filter=today")}
        {renderCard("Birthdays Tomorrow", birthdaysTomorrow || 0, "/student/bday?filter=tomorrow")}
        {renderCard("Birthdays Yesterday", birthdaysYesterday || 0 , "/student/bday?filter=yesterday")}
      </div>
    </div>
  );
}

export default StudentsTabs;
