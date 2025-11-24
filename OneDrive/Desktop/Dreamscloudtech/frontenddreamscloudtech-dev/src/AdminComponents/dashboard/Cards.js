


import React, { useState, useEffect } from "react";
import Card from "../../components/dashboard/Card";
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
import EventNotice from "./EventNotice";
import FinanceChart from "./cards/Finance";
import AttendanceStats from "./cards/Attendancechart";
import FinancialStatistics from "./cards/financechart";

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
            <div className="row mt-0 mb-2 ">
                <Card
                    image={student}
                    value={students}
                    title="Students"
                    message="Registered Students"
                    link="/students"
                />
                <Card
                    image={teacher}
                    value={staff}
                    title="Teachers"
                    message="Registered Teachers"
                    link="/staff"
                />
                <Card
                    image={classe}
                    value={classes}
                    title="Classes"
                    message="Registered Classes"
                    link="/academics/classes"
                />
                <Card
                    image={cources}
                    value={course}
                    title="Courses"
                    message="Registered Courses"
                    link="/academics/courses"
                />

                <Card
                    image={sms}
                    value={smsCount}
                    title="SMS"
                    message="Sent Messages"
                    link="/messages/smscount"
                />
                <Card
                    image={buses}
                    value={20}
                    title="Buses"
                    message="Registered Buses"
                    link="/students/dormitories"
                />
                <Card2
                    image={finance}
                    title="Finance"
                    link="/finance/students"
                />
                <Card2
                    image={transport}
                    value={students}
                    title="Transport"
                    message="Transport Details"
                    link="/students/dormitories"
                />
                <Card2
                    image={attendance}
                    value={course}
                    title="Attendance"
                    message="Attendance Count"
                    link="/attendance/students"
                />

                <Card2
                    image={payroll}
                    value={staff}
                    title="Payroll"
                    message="Payroll Info"
                    link="/finance/staff/payrow"
                />

                <Card2
                    image={timetable}
                    value={students}
                    title="TimeTable"
                    message="Scheduled Timetable"
                    link="/timetable"
                />
                <Card2
                    image={calender}
                    value={staff}
                    title="Calendar"
                    message="Academic Calendar"
                    link="/academics/calender"
                />
                <Card2
                    image={notice}
                    value={classes}
                    title="School Notice"
                    message="View Notices"
                    link="/notifications"
                />
                <Card2
                    image={message}
                    value={course}
                    title="Message"
                    message="Message Center"
                    link="/messages/students"
                />

                <Card2
                    image={inventory}
                    value={classes}
                    title="Inventory"
                    message="Inventory Details"
                    link="/store/inventory"
                />
                <Card2
                    image={library}
                    value={course}
                    title="Library"
                    message="Library Records"
                    link="/academics/notes"
                />
                <Card2
                    image={certificates}
                    value={students}
                    title="Certificates"
                    message="Manage Certificates"
                    link="/academics/correspondance/"
                />
                <Card2
                    image={setting}
                    value={staff}
                    title="Settings"
                    message="System Settings"
                    link="/settings"
                />
                <div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row", // Align components in a row
                            justifyContent: "space-between", // Add equal spacing between components
                            alignItems: "center", // Align components vertically in the center
                            gap: "18px", // Spacing between components
                            padding: "0px", // Add padding around the row
                            marginBottom: "27px",
                            marginTop: -30
                        }}
                    >

                        <div >
                            <FinanceChart />
                        </div>
                        <div style={{

                        }}>
                            <AttendanceStats />
                        </div>
                    </div>
                </div>
            </div>

            <div >
                <div style={{
                    marginBottom: "17px"
                }}>
                    <FinancialStatistics />
                </div>
                <div>
                    <EventNotice />
                </div>
            </div>
        </div>
    );
}

export default Cards;

// // Shreya
// import React, { useState, useEffect } from "react";
// import Card from "../../components/dashboard/Card";
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
// import EventNotice from "./EventNotice";
// import FinanceChart from "./cards/Finance";
// import AttendanceStats from "./cards/Attendancechart";
// import FinancialStatistics from "./cards/financechart";

// function Cards({ counts }) {
//     const [students, setstudents] = useState(0);
//     const [staff, setstaff] = useState(0);
//     const [classes, setclasses] = useState(0);
//     const [campuses, setcampuses] = useState(0);
//     const [course, setcourse] = useState(0);
//     const [divisions, setdivisions] = useState(0);
//     const [smsCount, setSmsCount] = useState(0);
//     const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    

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
//      useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
   
    

// //     return (
        
      
// //         <div style={{
// //             display: "flex",
// //             gap: "28px",

// //         }}>
         
// //             <div className="row mt-0 mb-2 ">
            
// //                 <Card
// //                     image={student}
// //                     value={students}
// //                     title="Students"
// //                     message="Registered Students"
// //                     link="/students"
// //                 />
// //                 <Card
// //                     image={teacher}
// //                     value={staff}
// //                     title="Teachers"
// //                     message="Registered Teachers"
// //                     link="/staff"
// //                 />
// //                 <Card
// //                     image={classe}
// //                     value={classes}
// //                     title="Classes"
// //                     message="Registered Classes"
// //                     link="/academics/classes"
// //                 />
// //                 <Card
// //                     image={cources}
// //                     value={course}
// //                     title="Courses"
// //                     message="Registered Courses"
// //                     link="/academics/courses"
// //                 />

// //                 <Card
// //                     image={sms}
// //                     value={smsCount}
// //                     title="SMS"
// //                     message="Sent Messages"
// //                     link="/messages/smscount"
// //                 />
// //                 <Card
// //                     image={buses}
// //                     value={20}
// //                     title="Buses"
// //                     message="Registered Buses"
// //                     link="/students/dormitories"
// //                 />
// //                 <Card2
// //                     image={finance}
// //                     title="Finance"
// //                     link="/finance/students"
// //                 />
// //                 <Card2
// //                     image={transport}
// //                     value={students}
// //                     title="Transport"
// //                     message="Transport Details"
// //                     link="/students/dormitories"
// //                 />
// //                 <Card2
// //                     image={attendance}
// //                     value={course}
// //                     title="Attendance"
// //                     message="Attendance Count"
// //                     link="/attendance/students"
// //                 />

// //                 <Card2
// //                     image={payroll}
// //                     value={staff}
// //                     title="Payroll"
// //                     message="Payroll Info"
// //                     link="/finance/staff/payrow"
// //                 />

// //                 <Card2
// //                     image={timetable}
// //                     value={students}
// //                     title="TimeTable"
// //                     message="Scheduled Timetable"
// //                     link="/timetable"
// //                 />
// //                 <Card2
// //                     image={calender}
// //                     value={staff}
// //                     title="Calendar"
// //                     message="Academic Calendar"
// //                     link="/academics/calender"
// //                 />
// //                 <Card2
// //                     image={notice}
// //                     value={classes}
// //                     title="School Notice"
// //                     message="View Notices"
// //                     link="/notifications"
// //                 />
// //                 <Card2
// //                     image={message}
// //                     value={course}
// //                     title="Message"
// //                     message="Message Center"
// //                     link="/messages/students"
// //                 />

// //                 <Card2
// //                     image={inventory}
// //                     value={classes}
// //                     title="Inventory"
// //                     message="Inventory Details"
// //                     link="/store/inventory"
// //                 />
// //                 <Card2
// //                     image={library}
// //                     value={course}
// //                     title="Library"
// //                     message="Library Records"
// //                     link="/academics/notes"
// //                 />
// //                 <Card2
// //                     image={certificates}
// //                     value={students}
// //                     title="Certificates"
// //                     message="Manage Certificates"
// //                     link="/academics/correspondance/"
// //                 />
// //                 <Card2
// //                     image={setting}
// //                     value={staff}
// //                     title="Settings"
// //                     message="System Settings"
// //                     link="/settings"
// //                 />
// //                 <div>
// //                     <div
// //                         style={{
// //                             display: "flex",
// //                             flexDirection: "row", // Align components in a row
// //                             justifyContent: "space-between", // Add equal spacing between components
// //                             alignItems: "center", // Align components vertically in the center
// //                             gap: "18px", // Spacing between components
// //                             padding: "0px", // Add padding around the row
// //                             marginBottom: "27px",
// //                             marginTop: -30
// //                         }}
                        
// //                     >

// //                         <div >
// //                             <FinanceChart />
// //                         </div>
// //                         <div style={{

// //                         }}>
// //                             <AttendanceStats />
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>

// //             <div >
// //                 <div style={{
// //                     marginBottom: "17px"
// //                 }}>
// //                     <FinancialStatistics />
// //                 </div>
// //                 <div>
// //                     <EventNotice />
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// // export default Cards;

// return ( 
//   <>
//    <style>
//     {` 
//     @media (max-width: 768px) {
//     // .dashboard-layout {
//     // flex-direction: column !important;
//     // padding: 16px !important;
//     // gap: 24px !important;
//     //   }
//      .dashboard-layout {
//       flex-direction: column !important;
//       padding: 16px !important;
//       gap: 24px !important;
//       align-items: center !important;
//     }

//     // .card-grid {
//     //   flex-direction: column !important;
//     //   flex-wrap: nowrap !important;
//     //    align-items: center !important;
//     //    justify-content: center !important;
//     //   gap: 20px !important;
//     //   width: 100% !important;
//     //   }
//     .card-grid {
//       flex-direction: column !important;
//       flex-wrap: nowrap !important;
//       gap: 20px !important;
//       width: 100% !important;
//       align-items: center !important; /* ✅ Center all cards */
//       justify-content: center !important;
//     }

//     // .row {
//     //  display: flex !important;
                      
//     //  flex-direction: column !important;
//     //  gap: 16px !important;
//     //  margin: 0 !important;
//     //   }
//      .card-grid .row {
//       display: flex !important;
//       flex-direction: column !important;
//       gap: 16px !important;
//       align-items: center !important;
//       justify-content: center !important;
//       margin: 0 auto !important;
//     }
//     .chart-row { 
//       flex-direction: column !important; 
//       gap: 16px !important; 
//       margin-top: 0px !important; 
//       margin-bottom: 24px !important; 
//        }
//     .side-column {
//       width: 100% !important; 
//       gap: 24px !important;
//        }
//     .side-column > div {
//       width: 100% !important;
//        }
//        }
//     @media (min-width: 769px) and (max-width: 1024px) {
//     .dashboard-layout { 
//     flex-direction: column !important; 
//     padding: 24px !important; 
//     gap: 28px !important; 
//      align-items: center !important; 
//     } 
//     .card-grid { 
//     display: grid !important; 
//     grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important; 
//     gap: 24px !important; 
//     max-width: 900px !important; 
//     width: 100% !important;
//     justify-items: center !important;
//     } 
//     .row { 
//     display: contents !important;
//     }
//     .chart-row { 
//     display: grid !important; 
//     grid-template-columns: 1fr 1fr !important; 
//     gap: 20px !important; 
//     margin-top: 0px !important; 
//     margin-bottom: 32px !important;
//     max-width: 900px !important; 
//     width: 100% !important; 
//     } 
//     .side-column { 
//     max-width: 900px !important; 
//     width: 100% !important; 
//     gap: 28px !important; 
//     align-items: center !important; /* ✅ Center Financial Statistics */
//     justify-content: center !important;
//     } 
//     .side-column > div { 
//       //width: 100% !important;
//       width: 80% !important; /* ✅ Keeps FinancialStatistics centered nicely */
//       max-width: 600px !important;
//       margin: 0 auto !important;
//       } 
//       }
//   `}
//   </style>
  
        
// <div className="dashboard-layout" style={{ display: "flex", gap: "28px", }}>
// <div className="card-grid" style={{ display: "flex", flexWrap: "wrap", gap: "20px", width: "100%" }}>
// <div className="row mt-0 mb-2 ">
//   <Card image={student} value={students} title="Students" message="Registered Students" link="/students" />
// <Card image={teacher} value={staff} title="Teachers" message="Registered Teachers" link="/staff" />
// <Card image={classe} value={classes} title="Classes" message="Registered Classes" link="/academics/classes" />
// <Card image={cources} value={course} title="Courses" message="Registered Courses" link="/academics/courses" />
// <Card image={sms} value={smsCount} title="SMS" message="Sent Messages" link="/messages/smscount" />
// <Card image={buses} value={20} title="Buses" message="Registered Buses" link="/students/dormitories" />
// <Card2 image={finance} title="Finance" link="/finance/students" />
// <Card2 image={transport} value={students} title="Transport" message="Transport Details" link="/students/dormitories" />
// <Card2 image={attendance} value={course} title="Attendance" message="Attendance Count" link="/attendance/students" />
// <Card2 image={payroll} value={staff} title="Payroll" message="Payroll Info" link="/finance/staff/payrow" />
// <Card2 image={timetable} value={students} title="TimeTable" message="Scheduled Timetable" link="/timetable" /> 
// <Card2 image={calender} value={staff} title="Calendar" message="Academic Calendar" link="/academics/calender" />
// <Card2 image={notice} value={classes} title="School Notice" message="View Notices" link="/notifications" />
// <Card2 image={message} value={course} title="Message" message="Message Center" link="/messages/students" /> 
// <Card2 image={inventory} value={classes} title="Inventory" message="Inventory Details" link="/store/inventory" /> 
// <Card2 image={library} value={course} title="Library" message="Library Records" link="/academics/notes" /> 
// <Card2 image={certificates} value={students} title="Certificates" message="Manage Certificates" link="/academics/correspondance/" /> 
// <Card2 image={setting} value={staff} title="Settings" message="System Settings" link="/settings" /> 
//   <div className="chart-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "18px", marginBottom: "40px", marginTop: "-40px" }}> 
//   <div><FinanceChart /></div>
//   <div><AttendanceStats /></div>
  
//    </div>
//   </div>
//   </div>
//   <div className="side">
//   <div className="side-column" style={{display: "flex", flexDirection: "column", gap: "20px", marginBottom: "17px" }}> 
//    <div><FinancialStatistics />
//   </div>  
//   </div>
//   <div><EventNotice />
//   </div>
//   </div>
  
//   </div>
//   </> 
//   );
//   }
//   export default Cards;
  
