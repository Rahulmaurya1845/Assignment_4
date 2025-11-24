import React, { useState, useEffect } from "react";
import Card from "../../components/dashboard/Card3";
import Card2 from "../../components/dashboard/Card2";
import axios from "axios";
import student from "./kids-registering-after-school-programs_1253148-76317-removebg-preview.png"

import teacher from "./cartoon-woman-with-pen-her-hand-book-background_990404-19464-removebg-preview.png"

import classe from "./child-sits-desk-with-pencil-cup-pencils_1016520-56843-removebg-preview.png"
import notice from "./sent.png"
import certificates from "./guarantee.png"
import attendance from "./eeee.png"
import sms from "./jj.png"
import buses from "./hhhh.png"
import message from "./mssg.png"
import inventory from "./box (1).png"
import payroll from "./investment-3d-render-icon-illustration_726846-5272-removebg-preview.png"
import timetable from "./calendar.png"

import transport from "./van.png"

import cources from "./flying-colorful-books-world-book-day_535126-2048-removebg-preview.png"
import calender from "./WhatsApp_Image_2024-12-12_at_3.24.45_PM-removebg-preview.png"
import finance from "./bbbb.png"
import setting from "./settings.png"
import library from "./llib.png"
import EventNotice from "./EventNotice1";
import FinanceChart from "./cards/Finance";
import AttendanceStats from "./cards/Attendancechart";
import FinancialStatistics from "./cards/financechart";
import AcademicYear from "./AcademicYear";
import SchoolCalender from "../../components/dashboard/SchoolCalender";
import a from "./af.png"
import b from "./aff.png"

function Cards({ counts }) {
    const [students, setstudents] = useState(0);
    const [staff, setstaff] = useState(0);
    const [classes, setclasses] = useState(0);
    const [campuses, setcampuses] = useState(0);
    const [course, setcourse] = useState(0);
    const [divisions, setdivisions] = useState(0);
    const [smsCount, setSmsCount] = useState(0);

    useEffect(() => {
        setstudents(counts?.students);
        setstaff(counts?.staff);
        setclasses(counts?.classes);
        setcourse(counts?.courses);
        setcampuses(counts?.campuses);
        setdivisions(counts?.divisions);
    }, [counts]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/sms-counter`) // adjust if needed
            .then((res) => {
                setSmsCount(res.data.data.length);
            })
            .catch((err) => {
                console.error("Error fetching SMS count:", err);
            });
    }, []);

    return (
        <div style={{
            display: "flex",
            gap: "28px",

        }}>
            <div>
                <div className="row mt-0 mb-4 ">

                    <Card
                        image={cources}
                        value={course}
                        title="Courses"
                        message="Registered Courses"
                        link="/academics/courses"
                    />
                    <Card
                        image={payroll}
                        title="Payrow"
                        link="/payrow"
                    />


                    <Card
                        image={teacher}
                        value={students}
                        title="My Profile"
                        message="Registered Student"
                        link="/profile"
                    />
                    <Card
                        image={classe}
                        value={classes}
                        title="Classes"
                        message="Registered Class"
                        link="/academics/classes"
                    />

                    <Card
                        image={sms}
                        value={smsCount}
                        title="SMS"
                        message="Sent SMS"
                        link="/messages/student"
                    />

                    <Card
                        image={attendance}
                        value={course}
                        title="Attendance"
                        message="Attendance Count"
                        link="/attendance"
                    />




                </div>
                <div className="row mt-0 mb-4 " >

                    <Card
                        image={notice}
                        value={classes}
                        title="School Notice"
                        message="View Notices"
                        link="/notifications"
                    />
                    <Card
                        image={calender}
                        value={staff}
                        title="Calendar"
                        message="Academic Calendar"
                        link="/academics/calendar"
                    />
                    <Card
                        image={timetable}
                        value={students}
                        title="TimeTable"
                        message="Scheduled Timetable"
                        link="/timetable"
                    />
                    <Card
                        image={message}
                        value={course}
                        title="Message"
                        message="Message Center"
                        link="/messages/chat"
                    />


                    <Card
                        image={a}
                        value={staff}
                        title="Report Card"
                        message="Report Card"
                        link="/academics/classes"
                    />
                    <Card
                        image={setting}
                        value={staff}
                        title="Settings"
                        message="System Settings"
                        link="/settings"
                    />

                </div>

                <div style={{
                    marginTop: "10px"
                }}>
                    <SchoolCalender />
                </div>
            </div>

            <div >
                <div style={{
                    marginBottom: "32px",
                    marginTop: -20
                }}>

                    <AcademicYear />
                </div>
                <div>
                    <EventNotice />
                </div>
            </div>
        </div >
    );
}

export default Cards;


// // Shreya
// import React, { useState, useEffect } from "react";
// import Card from "../../components/dashboard/Card3";
// import Card2 from "../../components/dashboard/Card2";
// import axios from "axios";
// import student from "./kids-registering-after-school-programs_1253148-76317-removebg-preview.png"

// import teacher from "./cartoon-woman-with-pen-her-hand-book-background_990404-19464-removebg-preview.png"

// import classe from "./child-sits-desk-with-pencil-cup-pencils_1016520-56843-removebg-preview.png"
// import notice from "./sent.png"
// import certificates from "./guarantee.png"
// import attendance from "./eeee.png"
// import sms from "./jj.png"
// import buses from "./hhhh.png"
// import message from "./mssg.png"
// import inventory from "./box (1).png"
// import payroll from "./investment-3d-render-icon-illustration_726846-5272-removebg-preview.png"
// import timetable from "./calendar.png"

// import transport from "./van.png"

// import cources from "./flying-colorful-books-world-book-day_535126-2048-removebg-preview.png"
// import calender from "./WhatsApp_Image_2024-12-12_at_3.24.45_PM-removebg-preview.png"
// import finance from "./bbbb.png"
// import setting from "./settings.png"
// import library from "./llib.png"
// import EventNotice from "./EventNotice1";
// import FinanceChart from "./cards/Finance";
// import AttendanceStats from "./cards/Attendancechart";
// import FinancialStatistics from "./cards/financechart";
// import AcademicYear from "./AcademicYear";
// import SchoolCalender from "../../components/dashboard/SchoolCalender";
// import a from "./af.png"
// import b from "./aff.png"

// function Cards({ counts }) {
//     const [students, setstudents] = useState(0);
//     const [staff, setstaff] = useState(0);
//     const [classes, setclasses] = useState(0);
//     const [campuses, setcampuses] = useState(0);
//     const [course, setcourse] = useState(0);
//     const [divisions, setdivisions] = useState(0);
//     const [smsCount, setSmsCount] = useState(0);

//     useEffect(() => {
//         setstudents(counts?.students);
//         setstaff(counts?.staff);
//         setclasses(counts?.classes);
//         setcourse(counts?.courses);
//         setcampuses(counts?.campuses);
//         setdivisions(counts?.divisions);
//     }, [counts]);

//     useEffect(() => {
//         axios.get(`${process.env.REACT_APP_API_URL}/sms-counter`) // adjust if needed
//             .then((res) => {
//                 setSmsCount(res.data.data.length);
//             })
//             .catch((err) => {
//                 console.error("Error fetching SMS count:", err);
//             });
//     }, []);

//     return (
//         <>
//          <style>
//         {`
//           /* ----------- Tablets (portrait & landscape) ----------- */
//           @media (max-width: 1024px) {
//             .dashboard-container {
//               flex-direction: column;
//               gap: 20px;
//             }

//             .row {
//               display: flex;
//               flex-wrap: wrap;
//               justify-content: center;
//               gap: 20px;
//             }

//             .row .card {
//               flex: 1 1 calc(45% - 20px);
//               max-width: 45%;
//             }

//             .school-calendar,
//             .academic-year,
//             .event-notice {
//               margin-top: 20px;
//             }
//           }

//           /* ----------- Mobile (portrait & small screens) ----------- */
//           @media (max-width: 768px) {
//             .dashboard-container {
//               flex-direction: column;
//               gap: 16px;
//             }

//             .row {
//               display: flex;
//               flex-direction: column;
//               align-items: center;
//               gap: 15px;
//             }

//             .row .card {
//               width: 90%;
//               max-width: 350px;
//             }

//             .academic-year,
//             .event-notice,
//             .school-calendar {
//               width: 100%;
//               margin-top: 15px;
//             }
//           }
//         `}
//       </style>
//         <div style={{
//             display: "flex",
//             gap: "28px",

//         }} className="dashboard-container">
//             <div>
//                 <div className="row mt-0 mb-4 ">

//                     <Card
//                         image={cources}
//                         value={course}
//                         title="Courses"
//                         message="Registered Courses"
//                         link="/academics/courses"
//                     />
//                     <Card
//                         image={payroll}
//                         title="Payrow"
//                         link="/payrow"
//                     />


//                     <Card
//                         image={teacher}
//                         value={students}
//                         title="My Profile"
//                         message="Registered Student"
//                         link="/profile"
//                     />
//                     <Card
//                         image={classe}
//                         value={classes}
//                         title="Classes"
//                         message="Registered Class"
//                         link="/academics/classes"
//                     />

//                     <Card
//                         image={sms}
//                         value={smsCount}
//                         title="SMS"
//                         message="Sent SMS"
//                         link="/messages/student"
//                     />

//                     <Card
//                         image={attendance}
//                         value={course}
//                         title="Attendance"
//                         message="Attendance Count"
//                         link="/attendance"
//                     />




//                 </div>
//                 <div className="row mt-0 mb-4 " >

//                     <Card
//                         image={notice}
//                         value={classes}
//                         title="School Notice"
//                         message="View Notices"
//                         link="/notifications"
//                     />
//                     <Card
//                         image={calender}
//                         value={staff}
//                         title="Calendar"
//                         message="Academic Calendar"
//                         link="/academics/calendar"
//                     />
//                     <Card
//                         image={timetable}
//                         value={students}
//                         title="TimeTable"
//                         message="Scheduled Timetable"
//                         link="/timetable"
//                     />
//                     <Card
//                         image={message}
//                         value={course}
//                         title="Message"
//                         message="Message Center"
//                         link="/messages/chat"
//                     />


//                     <Card
//                         image={a}
//                         value={staff}
//                         title="Report Card"
//                         message="Report Card"
//                         link="/academics/classes"
//                     />
//                     <Card
//                         image={setting}
//                         value={staff}
//                         title="Settings"
//                         message="System Settings"
//                         link="/settings"
//                     />

//                 </div>

//                 <div style={{
//                     marginTop: "10px"
//                 }}className="school-calendar">
//                     <SchoolCalender />
//                 </div>
//             </div>

//             <div >
//                 <div style={{
//                     marginBottom: "32px",
//                     marginTop: -20
//                 }}  className="academic-year">

//                     <AcademicYear />
//                 </div>
//                 <div  className="event-notice">
//                     <EventNotice />
//                 </div>
//             </div>
//         </div >
//         </>
//     );
// }

// export default Cards;
