import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import SchoolCalender from "../../components/dashboard/SchoolCalender";
import RecentActivities from "./RecentActivity";
import axios from "../../store/axios";
import Loading from "../../Loading";
import AcademicYear from "./AcademicYear";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import NoticeBoard from "../../components/dashboard/NoticeBoard";
import Population from "./SchoolPopulation";
import StaffPopulation from "./StaffPopulation";
// Import components
import FinanceChart from "./cards/Finance";
import AttendanceStats from "./cards/Attendancechart";
import FinancialStatistics from "./cards/financechart";
import EventNotice from "./EventNotice";

function Index() {

  const [count, setCount] = useState(
    JSON.parse(localStorage.getItem("count")) || {}
  );
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem("events")) || []
  );
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);


  //New
  useEffect(() => {
    setLoading(true);
    axios.get("/count").then((res) => {
      setLoading(false);
      if (res?.data) {
        setCount((prevCount) => {
          const updatedCount = res.data;
          // Save only if there are changes
          if (JSON.stringify(prevCount) !== JSON.stringify(updatedCount)) {
            localStorage.setItem("count", JSON.stringify(updatedCount));
          }
          return updatedCount;
        });
      }
    });
  }, []);

  useEffect(() => {
    axios.get("/calendar").then((res) => {
      if (res?.data) {
        setEvents((prevEvents) => {
          const updatedEvents = res.data;
          // Save only if there are changes
          if (JSON.stringify(prevEvents) !== JSON.stringify(updatedEvents)) {
            localStorage.setItem("events", JSON.stringify(updatedEvents));
          }
          return updatedEvents;
        });
      }
    });
  }, []);




  return (
    <div style={{
      marginTop: -20
    }}>


      {/* Cards Section */}
      <Cards counts={count} />

      {/* Calendar and Recent Activities */}
      <div style={{ display: "flex" }}>
        <div className="col-xs-12 col-sm-12 col-md-4  mb-4">
          <Population
            femaleStudents={count?.femaleStudents}
            maleStudents={count?.maleStudents}
          />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-4  mb-4">
          <StaffPopulation
            femaleStudents={count?.femaleStaff}
            maleStudents={count?.maleStaff}
          />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-4  mb-4">
          <AcademicYear isEdit={true} />
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-xs-12 col-sm-12 col-md-8 mb-5">
          <SchoolCalender events={events} user={user.role} />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-4 mb-5">
          <RecentActivities />
        </div>
      </div>
    </div>
  );
}

export default Index;


// // Shreya
// import React, { useEffect, useState } from "react";
//  import Cards from "./Cards"; 
//  import SchoolCalender from "../../components/dashboard/SchoolCalender"; 
//  import RecentActivities from "./RecentActivity"; 
//  import axios from "../../store/axios"; 
// //  import Loading from "../../Loading"; 
//  import AcademicYear from "./AcademicYear"; 
//  import { useSelector } from "react-redux"; 
//  import { selectUser } from "../../store/slices/userSlice"; 
//  import NoticeBoard from "../../components/dashboard/NoticeBoard"; 
//  import Population from "./SchoolPopulation"; 
//  import StaffPopulation from "./StaffPopulation"; 
//  // Import components 
//  import FinanceChart from "./cards/Finance"; 
//  import AttendanceStats from "./cards/Attendancechart"; 
//  import FinancialStatistics from "./cards/financechart"; 
//  import EventNotice from "./EventNotice";

//  function Index() { 
//   const [count, setCount] = useState( 
//     JSON.parse(localStorage.getItem("count")) || {} 
//   ); 
//   const [events, setEvents] = useState( 
//     JSON.parse(localStorage.getItem("events")) || [] 
//   ); 
//   const user = useSelector(selectUser); 
//   const [loading, setLoading] = useState(false);

//   useEffect(() => { 
//     setLoading(true); 
//     axios.get("/count").then((res) => { 
//       setLoading(false); 
//       if (res?.data) { 
//         setCount((prevCount) => { 
//           const updatedCount = res.data; // Save only if there are changes 
//           if (JSON.stringify(prevCount) !== JSON.stringify(updatedCount)) { 
//             localStorage.setItem("count", JSON.stringify(updatedCount));
//           } return updatedCount; 
//         }); 
//       } }); 
//     }, []);

//     useEffect(() => { 
//       axios.get("/calendar").then((res) => { if (res?.data) { 
//         setEvents((prevEvents) => { 
//           const updatedEvents = res.data; 
//           // Save only if there are changes 
//           if (JSON.stringify(prevEvents) !== JSON.stringify(updatedEvents)) { 
//             localStorage.setItem("events", JSON.stringify(updatedEvents));
//           } 
//           return updatedEvents;
//         }); 
//       } 
//     }); 
//   }, []);
//   return (
//     <>
//       <style>{`
//         /* ---------- Tablet (≤1024px) ---------- */
//         @media (max-width: 1024px) {
//           // .dashboard-row {
//           //   display: flex;
//           //   flex-wrap: wrap;
//           //   justify-content: center;
//           //   gap: 20px;
//           //   margin: 0 auto;
//           //   margin-top: 40px !important;
//           // }

//           // .dashboard-row > div {
//           //   flex: 1 1 45%;
//           //   max-width: 45%;
//           // }

//           // .calendar-section {
//           //   flex-direction: column !important;
//           //   align-items: center !important;
//           //   gap: 20px !important;
//           // }

//           // .calendar-section > div {
//           //   width: 100% !important;
//           // }
//            .dashboard-row {
//       display: flex;
//       flex-wrap: wrap;
//       justify-content: center;
//       gap: 20px;
//       margin: 0 auto;
//       margin-top: 40px !important;
//     }

//     .dashboard-row > div {
//       flex: 1 1 45%;
//       max-width: 45%;
//     }

//     /* ✅ Force side-by-side layout for calendar & activities */
//     .calendar-section {
//       display: flex !important;
//       flex-direction: row !important;
//       justify-content: center !important;
//       align-items: flex-start !important;
//       flex-wrap: wrap !important;
//       gap: 24px !important;
//       margin-top: 50px !important;
//     }

//     .calendar-section > div {
//       flex: 1 1 45% !important;
//       max-width: 45% !important;
//       min-width: 350px !important;
//     }
//       .calendar-box {
//     flex: 1 1 45% !important;
//     max-width: 45% !important;
//     min-width: 350px !important;
//     margin: 0 auto !important;
//     margin-bottom: 24px !important;
//   }
//         }

//         /* ---------- Mobile (≤768px) ---------- */
//         @media (max-width: 768px) {
//           .dashboard-row {
//             flex-direction: column;
//             align-items: center;
//             gap: 16px;
//             margin-top: 40px !important;
            
//           }
          

//           .dashboard-row > div {
//             width: 90%;
//             max-width: 350px;
//           }
          

//           .calendar-section {
//              flex-direction: column !important;
//              align-items: center !important;
//             gap: 24px !important;
//           }

//           .calendar-section > div {
//             width: 100% !important;
//             max-width: 400px;
//           }
          
  

//           .row.mb-5 {
//              flex-direction: column !important;
//              align-items: center !important;
//             gap: 20px !important;
//           }

//           .row.mb-5 > div {
//             width: 100% !important;
//             max-width: 400px;
//           }
//         }
//       `}</style>
//     <div style={{ marginTop: -20 }}> 
//     {/* Cards Section */} 
//     <Cards counts={count} />
//     {/* Calendar and Recent Activities */} 
//     <div style={{ display: "flex" }} className="dashboard-row"> 
//       <div className="col-xs-12 col-sm-12 col-md-4 mb-4"> 
//         <Population 
//         femaleStudents={count?.femaleStudents}
//          maleStudents={count?.maleStudents} 
//          /> 
//          </div> 
//          <div className="col-xs-12 col-sm-12 col-md-4 mb-4"> 
//           <StaffPopulation 
//           femaleStudents={count?.femaleStaff} 
//           maleStudents={count?.maleStaff} 
//           /> 
//           </div> 
//           <div className="col-xs-12 col-sm-12 col-md-4 mb-4"> 
//             <AcademicYear isEdit={true} /> 
//             </div> 
//             </div> 
//             <div className="calendar-section row mb-5"> 
//               <div className="calendar-box col-xs-12 col-sm-12 col-md-8 mb-5"> 
//                 <SchoolCalender events={events} user={user.role} /> 
//                 </div> 
//                 <div className="calendar-box col-xs-12 col-sm-12 col-md-4 mb-5"> 
//                   <RecentActivities /> 
//                   </div> 
//                   </div> 
//                   </div> 
//                    </>
//                   );
//                  } 
//     export default Index ;
