// // // import React, { useState, useEffect } from "react";
// // // import { useSelector } from "react-redux";
// // // import Table from "../../components/tables/PeriodAttendanceTable";
// // // import { selectClasses } from "../../store/slices/schoolSlice";
// // // import { Bar } from "@reactchartjs/react-chart.js";
// // // import { monthYear } from "../../data";
// // // import moment from "moment";
// // // import axios from "../../store/axios";
// // // import { errorAlert } from "../../utils";

// // // const date = new Date();
// // // const month = date.getMonth();
// // // const year = date.getFullYear();
// // // const daysInMonth = new Date(year, month + 1, 0).getDate();
// // // const start = new Date(year, month, 1);

// // // const periodNames = {
// // //   "1": "today",
// // //   "2": "yesterday",
// // //   "7": "week",
// // //   "14": "lastWeek",
// // //   "30": "last30Days",
// // //   "60": "lastMonth"
// // // };

// // // function AttendanceTabs() {
// // //   const [dates, setdates] = useState([]);
// // //   const [datas, setdatas] = useState([]);
// // //   const [period, setperiod] = useState("");
// // //   const [classID, setclassID] = useState("");
// // //   const classes = useSelector(selectClasses);
// // //   const [loading, setloading] = useState(false);
// // //   const [show, setshow] = useState(false);
// // //   const [attendanceData, setattendanceData] = useState([]);
// // //   const [vari, setvari] = useState([]);

// // //   useEffect(() => {
// // //     let arr = [];
// // //     let d = [];
// // //     for (let i = 0; i < daysInMonth; i++) {
// // //       arr.push(moment(start).add(i, "day").format("dd D MMM YYYY"));
// // //       d.push(Math.floor(Math.random() * Math.floor(100)));
// // //     }
// // //     setdates(arr);
// // //   }, []);

// // //   const handleSearch = (e) => {
// // //     e.preventDefault();
// // //     setloading(true);
// // //     if (!classID) {
// // //       setloading(false);
// // //       return errorAlert("Please select class");
// // //     }
// // //     if (!period) {
// // //       setloading(false);
// // //       return errorAlert("Please select period");
// // //     }

// // //     axios.get(`/students/class/${classID}`).then((res) => {
// // //       setloading(false);
// // //       if (res.data.error) {
// // //         setshow(true);
// // //         return setattendanceData([]);
// // //       }

// // //       const selectedPeriodName = periodNames[period] || period;
// // //       let newData = res.data.users.map((i) => {
// // //         const selectedClassID = i.classID;

// // //         axios.get("/attendance/students/")
// // //           .then((response) => {
// // //             const data = response.data;

// // //             const now = moment();
// // //             const startOfToday = now.startOf("day").toDate();
// // //             const startOfYesterday = now.subtract(2, "days").startOf("day").toDate();
// // //             const startOfWeek = now.startOf("week").toDate();
// // //             const startOfLastWeek = now.subtract(14, "days").startOf("day").toDate();
// // //             const startOfLast30Days = now.subtract(30, "days").startOf("day").toDate();
// // //             const startOfLastMonth = now.subtract(1, "month").startOf("month").toDate();

// // //             const filteredData = data.filter((item) => item.classID === selectedClassID);

// // //             const counts = {};

// // //             filteredData.forEach((entry) => {
// // //               entry.users.forEach((user) => {
// // //                 const userID = user.userID;

// // //                 if (!counts[userID]) {
// // //                   counts[userID] = {
// // //                     today: { true: 0, false: 0, trueIndices: [] },
// // //                     yesterday: { true: 0, false: 0, trueIndices: [] },
// // //                     week: { true: 0, false: 0, trueIndices: [] },
// // //                     lastWeek: { true: 0, false: 0, trueIndices: [] },
// // //                     last30Days: { true: 0, false: 0, trueIndices: [] },
// // //                     lastMonth: { true: 0, false: 0, trueIndices: [] },
// // //                   };
// // //                 }

// // //                 const createdAt = new Date(entry.createdAt);

// // //                 const handlePeriodCount = (periodName, startPeriodDate, endPeriodDate = null) => {
// // //                   if (
// // //                     (endPeriodDate && createdAt >= startPeriodDate && createdAt < endPeriodDate) ||
// // //                     (!endPeriodDate && createdAt >= startPeriodDate)
// // //                   ) {
// // //                     const currentIndex = counts[userID][periodName].true + counts[userID][periodName].false + 1;
// // //                     counts[userID][periodName][user.status ? "true" : "false"]++;
// // //                     if (user.status) {
// // //                       counts[userID][periodName].trueIndices.push(currentIndex);
// // //                     }
// // //                   }
// // //                 };

// // //                 handlePeriodCount("today", startOfToday);
// // //                 handlePeriodCount("yesterday", startOfYesterday, startOfToday);
// // //                 handlePeriodCount("week", startOfWeek);
// // //                 handlePeriodCount("lastWeek", startOfLastWeek, startOfWeek);
// // //                 handlePeriodCount("last30Days", startOfLast30Days);
// // //                 handlePeriodCount("lastMonth", startOfLastMonth);
// // //               });
// // //             });
// // //             console.log(counts);
// // //             console.log(selectedPeriodName);
// // //             setvari({ counts, selectedPeriod: selectedPeriodName });
// // //           })
// // //           .catch((error) => {
// // //             console.error("Error fetching data:", error);
// // //           });

// // //         return {
// // //           userID: i.userID,
// // //           name: i.name,
// // //           surname: i.surname,
// // //           classID: i.classID,
// // //           gender: i.gender,
// // //           status: i.status,
// // //           attendance: Number(period),
// // //         };
// // //       });

// // //       setshow(true);
// // //       setattendanceData(newData);
// // //     });
// // //   };

// // //   useEffect(() => {
// // //     axios.get("/count/attendance").then((res) => {
// // //       setdatas(res.data.map((e) => e.value));
// // //     });
// // //   }, []);

// // //   const data = {
// // //     labels: dates,
// // //     datasets: [
// // //       {
// // //         label: "Attendance",
// // //         data: datas,
// // //         backgroundColor: "red",
// // //         borderColor: "blue",
// // //         borderWidth: 1,
// // //       },
// // //     ],
// // //   };

// // //   const options = {
// // //     scales: {
// // //       yAxes: [
// // //         {
// // //           ticks: {
// // //             beginAtZero: true,
// // //           },
// // //         },
// // //       ],
// // //     },
// // //   };

// // //   return (
// // //     <div id="section-to-print">
// // //       <div className="content__container mb-3" style={{ backgroundColor: "#EEF7FF" }}>
// // //         <form action="" className="row">
// // //           <div className="mb-3 col-sm-4 mt-3">
// // //             <label className="form-label">Class</label>
// // //             <select
// // //               name="type"
// // //               value={classID}
// // //               style={{ backgroundColor: "#ffffff" }}
// // //               onChange={(e) => setclassID(e.target.value)}
// // //               id="inputState"
// // //               className="form-select"
// // //             >
// // //               <option defaultValue hidden>
// // //                 Choose...
// // //               </option>
// // //               {classes.length > 0 ? (
// // //                 classes.map((e) => (
// // //                   <option key={e._id} value={e.classCode}>
// // //                     {e.name}
// // //                   </option>
// // //                 ))
// // //               ) : (
// // //                 <option disabled>No class yet</option>
// // //               )}
// // //             </select>
// // //           </div>
// // //           <div className="mb-0 col-sm-4 mt-3">
// // //             <label className="form-label">Period</label>
// // //             <select
// // //               style={{ backgroundColor: "#ffffff" }}
// // //               name="type"
// // //               value={period}
// // //               onChange={(e) => setperiod(e.target.value)}
// // //               id="inputState"
// // //               className="form-select"
// // //             >
// // //               <option defaultValue hidden>
// // //                 Choose...
// // //               </option>
// // //               <option value="1">Today</option>
// // //               <option value="2">Yesterday</option>
// // //               <option value="7">This Week</option>
// // //               <option value="14">Last Week</option>
// // //               <option value="30">This Month</option>
// // //               <option value="60">Last Month</option>
// // //             </select>
// // //           </div>
// // //           <div className="mb-0  col-sm-4">
// // //             <button
// // //               onClick={handleSearch}
// // //               disabled={loading}
// // //               type="submit"
// // //               className="btn blue__btn mt-5"

// // //             >
// // //               {loading && (
// // //                 <span
// // //                   className="spinner-border spinner-border-sm"
// // //                   role="status"
// // //                   aria-hidden="true"

// // //                 ></span>
// // //               )}
// // //               Search
// // //             </button>
// // //           </div>
// // //         </form>
// // //       </div>
// // //       {show && (
// // //         <div className="mb-5" id="section-to-print">
// // //           <div id="section-to-print">
// // //             <Table attendanceData={attendanceData} variData={vari} />
// // //           </div>
// // //         </div>
// // //       )}
// // //       <h3 className="mb-5 ml-4">
// // //         Attendance Report for {monthYear[month]?.name} {year}
// // //       </h3>
// // //       <Bar data={data} options={options} />
// // //     </div>
// // //   );
// // // }

// // // export default AttendanceTabs;



// // import React, { useState, useEffect } from "react";
// // import { useSelector } from "react-redux";
// // import Table from "../../components/tables/PeriodAttendanceTable";
// // import { selectClasses } from "../../store/slices/schoolSlice";
// // import { Bar } from "react-chartjs-2";
// // import moment from "moment";
// // import axios from "../../store/axios";
// // import { errorAlert } from "../../utils";

// // function AttendanceTabs() {
// //   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
// //   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
// //   const [classID, setclassID] = useState("");
// //   const classes = useSelector(selectClasses);
// //   const [loading, setloading] = useState(false);
// //   const [show, setshow] = useState(false);
// //   const [attendanceData, setattendanceData] = useState([]);
// //   const [chartData, setChartData] = useState({ labels: [], datasets: [] });

// //   const months = [
// //     "January", "February", "March", "April", "May", "June",
// //     "July", "August", "September", "October", "November", "December"
// //   ];

// //   const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

// //   useEffect(() => {
// //     if (classID && selectedMonth !== "" && selectedYear) {
// //       fetchAttendanceData();
// //     }
// //   }, [selectedMonth, selectedYear, classID]);

// //   const getDaysInMonth = (month, year) => {
// //     return new Date(year, month + 1, 0).getDate();
// //   };

// //   const fetchAttendanceData = async () => {
// //     setloading(true);

// //     if (!classID) {
// //       setloading(false);
// //       return errorAlert("Please select class");
// //     }

// //     try {
// //       const studentsRes = await axios.get(`/students/class/${classID}`);

// //       if (studentsRes.data.error || !studentsRes.data.users) {
// //         setshow(true);
// //         setattendanceData([]);
// //         setloading(false);
// //         return;
// //       }

// //       const attendanceRes = await axios.get("/attendance/students/");
// //       const allAttendance = attendanceRes.data;

// //       const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
// //       const startOfMonth = moment([selectedYear, selectedMonth, 1]).startOf('day');
// //       const endOfMonth = moment([selectedYear, selectedMonth, daysInMonth]).endOf('day');
// //       const today = moment().startOf('day');

// //       // Process attendance for each student
// //       const processedData = studentsRes.data.users.map((student) => {
// //         const studentAttendance = {};
// //         let totalPresent = 0;
// //         let totalMarked = 0;

// //         // Initialize all days in month
// //         for (let day = 1; day <= daysInMonth; day++) {
// //           const currentDate = moment([selectedYear, selectedMonth, day]);
// //           const dateKey = currentDate.format('YYYY-MM-DD');

// //           // Only process dates up to today
// //           if (currentDate.isAfter(today)) {
// //             studentAttendance[day] = null; // Future date
// //           } else {
// //             studentAttendance[day] = false; // Default to absent
// //           }
// //         }

// //         // Filter attendance records for this student and month
// //         const studentRecords = allAttendance.filter(record => {
// //           const recordDate = moment(record.createdAt);
// //           return record.classID === student.classID &&
// //             recordDate.isSameOrAfter(startOfMonth) &&
// //             recordDate.isSameOrBefore(endOfMonth);
// //         });

// //         // Mark attendance
// //         studentRecords.forEach(record => {
// //           const recordDate = moment(record.createdAt);
// //           const dayOfMonth = recordDate.date();

// //           const userRecord = record.users.find(u => u.userID === student.userID);
// //           if (userRecord) {
// //             studentAttendance[dayOfMonth] = userRecord.status;
// //             if (userRecord.status) totalPresent++;
// //             if (recordDate.isSameOrBefore(today)) totalMarked++;
// //           }
// //         });

// //         // Count total marked days (excluding future dates)
// //         totalMarked = Object.values(studentAttendance).filter(val => val !== null).length;

// //         return {
// //           userID: student.userID,
// //           name: student.name,
// //           surname: student.surname,
// //           classID: student.classID,
// //           dailyAttendance: studentAttendance,
// //           totalPresent,
// //           totalDays: totalMarked,
// //           daysInMonth
// //         };
// //       });

// //       // Calculate chart data (daily attendance percentage)
// //       const chartLabels = [];
// //       const chartValues = [];

// //       for (let day = 1; day <= daysInMonth; day++) {
// //         const currentDate = moment([selectedYear, selectedMonth, day]);

// //         // Only show data up to today
// //         if (currentDate.isAfter(today)) break;

// //         chartLabels.push(day.toString());

// //         let presentCount = 0;
// //         let totalCount = 0;

// //         processedData.forEach(student => {
// //           if (student.dailyAttendance[day] !== null) {
// //             totalCount++;
// //             if (student.dailyAttendance[day]) presentCount++;
// //           }
// //         });

// //         const percentage = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;
// //         chartValues.push(percentage);
// //       }

// //       setChartData({
// //         labels: chartLabels,
// //         datasets: [{
// //           label: 'Attendance %',
// //           data: chartValues,
// //           backgroundColor: '#4fb1f6',
// //           borderColor: '#4fb1f6',
// //           borderWidth: 1,
// //         }]
// //       });

// //       setshow(true);
// //       setattendanceData(processedData);
// //       setloading(false);
// //     } catch (error) {
// //       console.error("Error fetching attendance:", error);
// //       setloading(false);
// //       errorAlert("Error fetching attendance data");
// //     }
// //   };

// //   const handleSearch = (e) => {
// //     e.preventDefault();
// //     fetchAttendanceData();
// //   };

// //   const chartOptions = {
// //     scales: {
// //       yAxes: [{
// //         ticks: {
// //           beginAtZero: true,
// //           max: 100,
// //           callback: function (value) {
// //             return value + '%';
// //           }
// //         },
// //         scaleLabel: {
// //           display: true,
// //           labelString: 'Attendance Percentage'
// //         }
// //       }],
// //       xAxes: [{
// //         scaleLabel: {
// //           display: true,
// //           labelString: 'Day of Month'
// //         }
// //       }]
// //     },
// //     tooltips: {
// //       callbacks: {
// //         label: function (tooltipItem) {
// //           return 'Attendance: ' + tooltipItem.yLabel + '%';
// //         }
// //       }
// //     },
// //     maintainAspectRatio: false
// //   };

// //   return (
// //     <div>
// //       <div className="content__container mb-3" style={{ backgroundColor: "#EEF7FF" }}>
// //         <form action="" className="row">
// //           <div className="mb-3 col-sm-3 mt-3">
// //             <label className="form-label">Class</label>
// //             <select
// //               name="type"
// //               value={classID}
// //               style={{ backgroundColor: "#ffffff" }}
// //               onChange={(e) => setclassID(e.target.value)}
// //               className="form-select"
// //             >
// //               <option value="" hidden>
// //                 Choose...
// //               </option>
// //               {classes.length > 0 ? (
// //                 classes.map((e) => (
// //                   <option key={e._id} value={e.classCode}>
// //                     {e.name}
// //                   </option>
// //                 ))
// //               ) : (
// //                 <option disabled>No class yet</option>
// //               )}
// //             </select>
// //           </div>

// //           <div className="mb-3 col-sm-3 mt-3">
// //             <label className="form-label">Month</label>
// //             <select
// //               style={{ backgroundColor: "#ffffff" }}
// //               value={selectedMonth}
// //               onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
// //               className="form-select"
// //             >
// //               {months.map((month, index) => (
// //                 <option key={index} value={index}>
// //                   {month}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           <div className="mb-3 col-sm-3 mt-3">
// //             <label className="form-label">Year</label>
// //             <select
// //               style={{ backgroundColor: "#ffffff" }}
// //               value={selectedYear}
// //               onChange={(e) => setSelectedYear(parseInt(e.target.value))}
// //               className="form-select"
// //             >
// //               {years.map((year) => (
// //                 <option key={year} value={year}>
// //                   {year}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           <div className="mb-0 col-sm-3">
// //             <button
// //               onClick={handleSearch}
// //               disabled={loading}
// //               type="submit"
// //               className="btn blue__btn mt-5"
// //             >
// //               {loading && (
// //                 <span
// //                   className="spinner-border spinner-border-sm me-2"
// //                   role="status"
// //                   aria-hidden="true"
// //                 ></span>
// //               )}
// //               Search
// //             </button>
// //           </div>
// //         </form>
// //       </div>

// //       {show && (
// //         <div className="mb-5">
// //           <Table
// //             attendanceData={attendanceData}
// //             selectedMonth={selectedMonth}
// //             selectedYear={selectedYear}
// //             monthName={months[selectedMonth]}
// //           />
// //         </div>
// //       )}

// //       {show && chartData.labels.length > 0 && (
// //         <div className="content__container" style={{ backgroundColor: "#ffffff", padding: "20px" }}>
// //           <h3 className="mb-4">
// //             Attendance Report for {months[selectedMonth]} {selectedYear}
// //           </h3>
// //           <div style={{ height: "400px" }}>
// //             <Bar data={chartData} options={chartOptions} />
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default AttendanceTabs;


// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import Table from "../../components/tables/PeriodAttendanceTable";
// import { selectClasses } from "../../store/slices/schoolSlice";
// import { Bar } from "react-chartjs-2";
// import moment from "moment";
// import axios from "../../store/axios";
// import { errorAlert } from "../../utils";

// function AttendanceTabs() {
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [classID, setclassID] = useState("");
//   const classes = useSelector(selectClasses);
//   const [loading, setloading] = useState(false);
//   const [show, setshow] = useState(false);
//   const [attendanceData, setattendanceData] = useState([]);
//   const [chartData, setChartData] = useState({ labels: [], datasets: [] });

//   const months = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

//   useEffect(() => {
//     if (classID && selectedMonth !== "" && selectedYear) {
//       fetchAttendanceData();
//     }
//   }, [selectedMonth, selectedYear, classID]);

//   const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

//   const fetchAttendanceData = async () => {
//     setloading(true);

//     if (!classID) {
//       setloading(false);
//       return errorAlert("Please select class");
//     }

//     try {
//       const [studentsRes, attendanceRes] = await Promise.all([
//         axios.get(`/students/class/${classID}`),
//         axios.get("/attendance/students/")
//       ]);

//       if (studentsRes.data.error || !studentsRes.data.users) {
//         setattendanceData([]);
//         setshow(true);
//         setloading(false);
//         return;
//       }

//       const students = studentsRes.data.users;
//       const allAttendance = attendanceRes.data || [];

//       const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
//       const startOfMonth = moment([selectedYear, selectedMonth, 1]);
//       const endOfMonth = moment([selectedYear, selectedMonth, daysInMonth]).endOf("day");
//       const today = moment().startOf("day");

//       // --- Build attendance table ---
//       const processedData = students.map((student) => {
//         const studentAttendance = {};
//         let totalPresent = 0;
//         let totalMarked = 0;

//         for (let d = 1; d <= daysInMonth; d++) {
//           const currentDate = moment([selectedYear, selectedMonth, d]);
//           if (currentDate.isAfter(today)) {
//             studentAttendance[d] = null; // future
//           } else {
//             studentAttendance[d] = "-"; // unmarked initially
//           }
//         }

//         // Get attendance records only for this class and month
//         const monthRecords = allAttendance.filter(record => {
//           const recDate = moment(record.createdAt);
//           return (
//             record.classID === student.classID &&
//             recDate.isSameOrAfter(startOfMonth) &&
//             recDate.isSameOrBefore(endOfMonth)
//           );
//         });

//         monthRecords.forEach(record => {
//           const recordDate = moment(record.createdAt);
//           const dayOfMonth = recordDate.date();
//           const userRec = record.users.find(u => u.userID === student.userID);
//           if (userRec) {
//             const status = userRec.status === true || userRec.status === "present";
//             studentAttendance[dayOfMonth] = status;
//             totalMarked++;
//             if (status) totalPresent++;
//           }
//         });

//         return {
//           userID: student.userID,
//           name: student.name,
//           surname: student.surname,
//           classID: student.classID,
//           dailyAttendance: studentAttendance,
//           totalPresent,
//           totalDays: totalMarked,
//           daysInMonth,
//         };
//       });

//       // --- Build Chart (daily % attendance) ---
//       const chartLabels = [];
//       const chartValues = [];

//       for (let day = 1; day <= daysInMonth; day++) {
//         const currentDate = moment([selectedYear, selectedMonth, day]);
//         if (currentDate.isAfter(today)) break;

//         chartLabels.push(day.toString());
//         let presentCount = 0;
//         let absentCount = 0;

//         processedData.forEach(student => {
//           const val = student.dailyAttendance[day];
//           if (val === true) presentCount++;
//           else if (val === false) absentCount++;
//         });

//         const totalMarked = presentCount + absentCount;
//         const percentage = totalMarked > 0 ? Math.round((presentCount / totalMarked) * 100) : 0;
//         chartValues.push(percentage);
//       }

//       setChartData({
//         labels: chartLabels,
//         datasets: [
//           {
//             label: "Attendance %",
//             data: chartValues,
//             backgroundColor: "#4fb1f6",
//             borderColor: "#4fb1f6",
//             borderWidth: 1,
//           },
//         ],
//       });

//       setattendanceData(processedData);
//       setshow(true);
//       setloading(false);
//     } catch (err) {
//       console.error("Error fetching attendance:", err);
//       errorAlert("Error fetching attendance data");
//       setloading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     fetchAttendanceData();
//   };

//   const chartOptions = {
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//             max: 100,
//             callback: (val) => val + "%",
//           },
//           scaleLabel: { display: true, labelString: "Attendance Percentage" },
//         },
//       ],
//       xAxes: [
//         {
//           scaleLabel: { display: true, labelString: "Day of Month" },
//         },
//       ],
//     },
//     tooltips: {
//       callbacks: {
//         label: (t) => `Attendance: ${t.yLabel}%`,
//       },
//     },
//     maintainAspectRatio: false,
//   };

//   return (
//     <div>
//       <div className="content__container mb-3" style={{ backgroundColor: "#EEF7FF" }}>
//         <form className="row">
//           <div className="mb-3 col-sm-3 mt-3">
//             <label className="form-label">Class</label>
//             <select
//               value={classID}
//               onChange={(e) => setclassID(e.target.value)}
//               className="form-select"
//               style={{ backgroundColor: "#fff" }}
//             >
//               <option value="" hidden>Choose...</option>
//               {classes.length > 0 ? (
//                 classes.map((e) => (
//                   <option key={e._id} value={e.classCode}>
//                     {e.name}
//                   </option>
//                 ))
//               ) : (
//                 <option disabled>No class yet</option>
//               )}
//             </select>
//           </div>

//           <div className="mb-3 col-sm-3 mt-3">
//             <label className="form-label">Month</label>
//             <select
//               value={selectedMonth}
//               onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
//               className="form-select"
//               style={{ backgroundColor: "#fff" }}
//             >
//               {months.map((m, i) => (
//                 <option key={i} value={i}>{m}</option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-3 col-sm-3 mt-3">
//             <label className="form-label">Year</label>
//             <select
//               value={selectedYear}
//               onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//               className="form-select"
//               style={{ backgroundColor: "#fff" }}
//             >
//               {years.map((y) => (
//                 <option key={y} value={y}>{y}</option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-0 col-sm-3">
//             <button onClick={handleSearch} disabled={loading} type="submit" className="btn blue__btn mt-5">
//               {loading && <span className="spinner-border spinner-border-sm me-2" role="status" />}
//               Search
//             </button>
//           </div>
//         </form>
//       </div>

//       {show && (
//         <div className="mb-5">
//           <Table
//             attendanceData={attendanceData}
//             selectedMonth={selectedMonth}
//             selectedYear={selectedYear}
//             monthName={months[selectedMonth]}
//           />
//         </div>
//       )}

//       {show && chartData.labels.length > 0 && (
//         <div className="content__container" style={{ backgroundColor: "#fff", padding: "20px" }}>
//           <h3 className="mb-4">
//             Attendance Report for {months[selectedMonth]} {selectedYear}
//           </h3>
//           <div style={{ height: "400px" }}>
//             <Bar data={chartData} options={chartOptions} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AttendanceTabs;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Table from "../../components/tables/PeriodAttendanceTable";
import { selectClasses } from "../../store/slices/schoolSlice";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import axios from "../../store/axios";
import { errorAlert } from "../../utils";

function AttendanceTabs() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [classID, setclassID] = useState("");
  const classes = useSelector(selectClasses);
  const [loading, setloading] = useState(false);
  const [show, setshow] = useState(false);
  const [attendanceData, setattendanceData] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  useEffect(() => {
    if (classID && selectedMonth !== "" && selectedYear) {
      fetchAttendanceData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth, selectedYear, classID]);

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const fetchAttendanceData = async () => {
    setloading(true);
    if (!classID) { setloading(false); return errorAlert("Please select class"); }

    try {
      const [studentsRes, attendanceRes] = await Promise.all([
        axios.get(`/students/class/${classID}`),
        axios.get("/attendance/students/")
      ]);

      if (studentsRes.data.error || !studentsRes.data.users) {
        setattendanceData([]);
        setshow(true);
        setloading(false);
        return;
      }

      const students = studentsRes.data.users;
      const allAttendance = Array.isArray(attendanceRes.data) ? attendanceRes.data : (attendanceRes.data || []);

      const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
      const startOfMonth = moment([selectedYear, selectedMonth, 1]).startOf('day');
      const endOfMonth = moment([selectedYear, selectedMonth, daysInMonth]).endOf('day');
      const today = moment().startOf('day');

      // Build processedData (table source)
      const processedData = students.map(student => {
        const dailyAttendance = {};
        let totalPresent = 0;
        let totalMarked = 0;

        // Initialize as unmarked or future
        for (let d = 1; d <= daysInMonth; d++) {
          const date = moment([selectedYear, selectedMonth, d]);
          dailyAttendance[d] = date.isAfter(today) ? null : "-";
        }

        // Filter records only for this class & month
        const monthRecords = allAttendance.filter(r => {
          const rd = moment(r.createdAt);
          return r.classID === student.classID && rd.isBetween(startOfMonth.clone().subtract(1, 'second'), endOfMonth.clone().add(1, 'second'));
        });

        // For each record (which contains array of users), find student record
        monthRecords.forEach(r => {
          const rd = moment(r.createdAt);
          const day = rd.date();
          const u = Array.isArray(r.users) ? r.users.find(x => x.userID === student.userID) : null;
          if (u) {
            // Normalize status: boolean true => present, false => absent
            const statusBoolean = (u.status === true) || (typeof u.status === 'string' && /present|p|✓|✔/i.test(u.status));
            const isExplicitAbsent = (u.status === false) || (typeof u.status === 'string' && /abs|a|x|✗|✘/i.test(u.status));
            if (statusBoolean) {
              dailyAttendance[day] = true;
              totalPresent++;
              totalMarked++;
            } else if (isExplicitAbsent) {
              dailyAttendance[day] = false;
              totalMarked++;
            } else {
              // If status unknown string, keep as unmarked '-'
            }
          }
        });

        return {
          userID: student.userID,
          name: student.name,
          surname: student.surname,
          classID: student.classID,
          dailyAttendance,
          totalPresent,
          totalDays: totalMarked,
          daysInMonth
        };
      });

      // Build chart: presentCount and absentCount per day (only from marked records)
      const labels = [];
      const presentCounts = [];
      const absentCounts = [];

      for (let d = 1; d <= daysInMonth; d++) {
        const date = moment([selectedYear, selectedMonth, d]);
        if (date.isAfter(today)) break;
        labels.push(d.toString());

        let p = 0, a = 0;
        processedData.forEach(std => {
          const val = std.dailyAttendance[d];
          if (val === true) p++;
          else if (val === false) a++;
        });

        presentCounts.push(p);
        absentCounts.push(a);
      }

      // Build datasets: present & absent
      const datasets = [
        {
          label: "Present (count)",
          data: presentCounts,
          backgroundColor: "#4caf50",
          borderColor: "#4caf50",
          borderWidth: 1
        },
        {
          label: "Absent (count)",
          data: absentCounts,
          backgroundColor: "#f44336",
          borderColor: "#f44336",
          borderWidth: 1
        }
      ];

      // Alternative: If you prefer a single dataset with percentage, you can compute percentage array instead (commented)
      /*
      const percentValues = labels.map((_, i) => {
        const p = presentCounts[i];
        const a = absentCounts[i];
        const total = p + a;
        return total > 0 ? Math.round((p / total) * 100) : 0;
      });
      const datasets = [{
        label: "Attendance %",
        data: percentValues,
        backgroundColor: "#4fb1f6",
        borderColor: "#4fb1f6",
        borderWidth: 1
      }];
      */

      setChartData({ labels, datasets });
      setattendanceData(processedData);
      setshow(true);
      setloading(false);
    } catch (err) {
      console.error("fetchAttendanceData error:", err);
      errorAlert("Error fetching attendance data");
      setloading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAttendanceData();
  };

  // Chart options (react-chartjs-2 v2 style)
  const chartOptions = {
    scales: {
      yAxes: [{
        ticks: { beginAtZero: true, callback: (v) => `${v}` },
        scaleLabel: { display: true, labelString: 'Students (count)' }
      }],
      xAxes: [{ scaleLabel: { display: true, labelString: 'Day of Month' } }]
    },
    tooltips: {
      // REMOVE the tooltip title (the "9" shown above the tooltip)
      callbacks: {
        title: function () {
          return null; // or return '' to hide the title
        },
        label: function (tooltipItem, data) {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const count = dataset.data[tooltipItem.index];
          const p = data.datasets[0].data[tooltipItem.index];
          const a = data.datasets[1].data[tooltipItem.index];
          const total = (p || 0) + (a || 0);
          const pct = total > 0 ? Math.round((p / total) * 100) : 0;
          if (dataset.label.toLowerCase().includes('present')) {
            return `${dataset.label}: ${count} (${pct}%)`;
          } else {
            return `${dataset.label}: ${count}`;
          }
        }
      }
    },
    maintainAspectRatio: false,
    responsive: true
  };


  return (
    <div>
      <div className="content__container mb-3" style={{ backgroundColor: "#EEF7FF" }}>
        <form className="row">
          <div className="mb-3 col-sm-3 mt-3">
            <label className="form-label">Class</label>
            <select value={classID} onChange={(e) => setclassID(e.target.value)} className="form-select" style={{ backgroundColor: "#fff" }}>
              <option value="" hidden>Choose...</option>
              {classes.length > 0
                ? [...classes].reverse().map(c => (
                  <option key={c._id} value={c.classCode}>
                    {c.name}
                  </option>
                ))
                : <option disabled>No class yet</option>}

            </select>
          </div>

          <div className="mb-3 col-sm-3 mt-3">
            <label className="form-label">Month</label>
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))} className="form-select" style={{ backgroundColor: "#fff" }}>
              {months.map((m, i) => <option key={i} value={i}>{m}</option>)}
            </select>
          </div>

          <div className="mb-3 col-sm-3 mt-3">
            <label className="form-label">Year</label>
            <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))} className="form-select" style={{ backgroundColor: "#fff" }}>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <div className="mb-0 col-sm-3">
            <button onClick={handleSearch} disabled={loading} type="submit" className="btn blue__btn mt-5">
              {loading && <span className="spinner-border spinner-border-sm me-2" role="status" />}
              Search
            </button>
          </div>
        </form>
      </div>

      {show && <div className="mb-5"><Table attendanceData={attendanceData} selectedMonth={selectedMonth} selectedYear={selectedYear} monthName={months[selectedMonth]} /></div>}

      {show && chartData.labels.length > 0 && (
        <div className="content__container" style={{ backgroundColor: "#fff", padding: "20px" }}>
          <h3 className="mb-4">Attendance Report for {months[selectedMonth]} {selectedYear}</h3>
          <div style={{ height: "400px" }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AttendanceTabs;
