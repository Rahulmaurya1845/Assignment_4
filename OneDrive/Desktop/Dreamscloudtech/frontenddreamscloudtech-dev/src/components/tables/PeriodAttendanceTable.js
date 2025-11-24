// // // // import React from "react";
// // // // import { makeStyles } from "@material-ui/core/styles";
// // // // import Table from "@material-ui/core/Table";
// // // // import TableBody from "@material-ui/core/TableBody";
// // // // import TableHead from "@material-ui/core/TableHead";
// // // // import TableCell from "@material-ui/core/TableCell";
// // // // import TableContainer from "@material-ui/core/TableContainer";
// // // // import TableRow from "@material-ui/core/TableRow";
// // // // import Paper from "@material-ui/core/Paper";
// // // // import moment from "moment";

// // // // const useStyles = makeStyles((theme) => ({
// // // //   table: {
// // // //     width: "100%",
// // // //   },
// // // //   tableHead: {
// // // //     backgroundColor: "#4fb1f6", // Table header background color
// // // //     color: "#fff", // Text color in table header
// // // //     fontFamily: "'Times New Roman', serif",
// // // //     fontWeight: "bold",
// // // //     fontSize: "16px",
// // // //   },
// // // //   tableCell: {
// // // //     fontSize: "14x",
// // // //     fontFamily: "'Baskerville', serif",
// // // //     fontWeight: "bold",
// // // //   },
// // // //   boldCell: {
// // // //     fontWeight: "bold",
// // // //   },
// // // //   tableContainer: {
// // // //     borderRadius: "8px",
// // // //     backgroundColor: "#FFFFFF",
// // // //     marginBottom: "40px",
// // // //   },
// // // //   alternateRow: {
// // // //     backgroundColor: "#ffffff",
// // // //   },
// // // //   noDataCell: {
// // // //     textAlign: "center",
// // // //     color: "#fa6767",
// // // //     fontFamily: "'Baskerville', serif",
// // // //     fontWeight: "bold",
// // // //   },
// // // //   stickyHeader: {
// // // //     position: "sticky",
// // // //     top: 0,
// // // //     backgroundColor: "#4fb1f6",
// // // //     color: "#fff",
// // // //     zIndex: 1000,
// // // //     fontFamily: "'Times New Roman', serif",
// // // //     fontWeight: "bold",
// // // //     textAlign: "center",
// // // //   },
// // // // }));

// // // // export default function CustomizedTables({ attendanceData, variData }) {
// // // //   const classes = useStyles();

// // // //   // Function to get attendance status
// // // //   const getAttendanceStatus = (userID, periodName, index) => {
// // // //     const userAttendance = variData?.counts?.[userID] || {};
// // // //     const periodData = userAttendance?.[periodName] || {};
// // // //     return periodData?.trueIndices?.includes(index) ? "✅" : "❌";
// // // //   };

// // // //   // Function to get present count
// // // //   const getPresentCount = (userID, periodName) => {
// // // //     const userAttendance = variData?.counts?.[userID] || {};
// // // //     const periodData = userAttendance?.[periodName] || {};
// // // //     return periodData?.true || 0;
// // // //   };

// // // //   return (
// // // //     <TableContainer component={Paper} className={classes.tableContainer} style={{ backgroundColor: "#EEF7FF" }}>
// // // //       <Table className={classes.table} aria-label="customized table">
// // // //         <TableHead>
// // // //           <TableRow>
// // // //             <TableCell className={classes.tableHead} align="left">Student ID</TableCell>
// // // //             <TableCell className={classes.tableHead} align="left">Class ID</TableCell>
// // // //             <TableCell className={classes.tableHead} align="left">Name</TableCell>
// // // //             <TableCell className={classes.tableHead} align="left">Attendance Report</TableCell>
// // // //           </TableRow>
// // // //         </TableHead>
// // // //         <TableBody>
// // // //           {attendanceData?.length > 0 ? (
// // // //             attendanceData?.map((row, index) => {
// // // //               const totalDays =
// // // //                 variData.selectedPeriod === "today" ? 1 :
// // // //                   variData.selectedPeriod === "yesterday" ? 2 :
// // // //                     variData.selectedPeriod === "week" ? 7 :
// // // //                       variData.selectedPeriod === "lastWeek" ? 7 :
// // // //                         variData.selectedPeriod === "last30Days" ? 30 :
// // // //                           variData.selectedPeriod === "lastMonth" ? 30 : 0;

// // // //               return (
// // // //                 <TableRow key={row._id} className={index % 2 === 0 ? classes.alternateRow : null}>
// // // //                   <TableCell align="left" className={classes.tableCell}>{row?.userID}</TableCell>
// // // //                   <TableCell align="left" className={classes.tableCell}>{row?.classID?.toUpperCase()}</TableCell>
// // // //                   <TableCell align="left" className={classes.tableCell}>{row?.name + " " + row?.surname}</TableCell>
// // // //                   <TableCell align="left" className={classes.tableCell}>
// // // //                     <div className="d-flex">
// // // //                       {Array.from({ length: totalDays }, (_, index) => {
// // // //                         const periodIndex =
// // // //                           variData.selectedPeriod === "today" ? 1 :
// // // //                             variData.selectedPeriod === "yesterday" ? index + 1 :
// // // //                               variData.selectedPeriod === "week" ? index + 1 :
// // // //                                 variData.selectedPeriod === "lastWeek" ? index + 1 :
// // // //                                   variData.selectedPeriod === "last30Days" ? index + 1 :
// // // //                                     variData.selectedPeriod === "lastMonth" ? index + 1 : 0;
// // // //                         return (
// // // //                           <span className="px-2" key={index}>
// // // //                             {getAttendanceStatus(row?.userID, variData.selectedPeriod, periodIndex)}
// // // //                           </span>
// // // //                         );
// // // //                       })}
// // // //                     </div>
// // // //                     <div>
// // // //                       <strong className="px-5">
// // // //                         Present {getPresentCount(row?.userID, variData.selectedPeriod)} out of {row?.attendance}
// // // //                       </strong>
// // // //                     </div>
// // // //                   </TableCell>
// // // //                 </TableRow>
// // // //               );
// // // //             })
// // // //           ) : (
// // // //             <TableRow>
// // // //               <TableCell className={classes.noDataCell} colSpan={4}>
// // // //                 No Students in this class
// // // //               </TableCell>
// // // //             </TableRow>
// // // //           )}
// // // //         </TableBody>
// // // //       </Table>
// // // //     </TableContainer>
// // // //   );
// // // // }


// // // import React from "react";
// // // import { makeStyles } from "@material-ui/core/styles";
// // // import Table from "@material-ui/core/Table";
// // // import TableBody from "@material-ui/core/TableBody";
// // // import TableHead from "@material-ui/core/TableHead";
// // // import TableCell from "@material-ui/core/TableCell";
// // // import TableContainer from "@material-ui/core/TableContainer";
// // // import TableRow from "@material-ui/core/TableRow";
// // // import Paper from "@material-ui/core/Paper";
// // // import jsPDF from "jspdf";
// // // import autoTable from "jspdf-autotable";
// // // import moment from "moment";

// // // const useStyles = makeStyles((theme) => ({
// // //   tableContainer: {
// // //     borderRadius: "8px",
// // //     backgroundColor: "#FFFFFF",
// // //     marginBottom: "40px",
// // //     maxHeight: "600px",
// // //     overflow: "auto",
// // //     position: "relative",
// // //   },
// // //   table: {
// // //     width: "100%",
// // //     borderCollapse: "separate",
// // //     borderSpacing: 0,
// // //   },
// // //   stickyHeader: {
// // //     position: "sticky",
// // //     top: 0,
// // //     backgroundColor: "#4fb1f6",
// // //     color: "#fff",
// // //     zIndex: 200,
// // //     fontFamily: "'Times New Roman', serif",
// // //     fontWeight: "bold",
// // //     textAlign: "center",
// // //     padding: "12px 8px",
// // //     borderBottom: "2px solid #3a8ec9",
// // //     minWidth: "50px",
// // //   },
// // //   stickyHeaderName: {
// // //     position: "sticky",
// // //     top: 0,
// // //     left: 0,
// // //     backgroundColor: "#4fb1f6",
// // //     color: "#fff",
// // //     zIndex: 300,
// // //     fontFamily: "'Times New Roman', serif",
// // //     fontWeight: "bold",
// // //     textAlign: "center",
// // //     padding: "12px 8px",
// // //     borderRight: "2px solid #3a8ec9",
// // //     borderBottom: "2px solid #3a8ec9",
// // //     minWidth: "200px",
// // //   },
// // //   stickyHeaderTotal: {
// // //     position: "sticky",
// // //     top: 0,
// // //     right: 0,
// // //     backgroundColor: "#4fb1f6",
// // //     color: "#fff",
// // //     zIndex: 200,
// // //     fontFamily: "'Times New Roman', serif",
// // //     fontWeight: "bold",
// // //     textAlign: "center",
// // //     padding: "12px 8px",
// // //     borderBottom: "2px solid #3a8ec9",
// // //     borderLeft: "2px solid #3a8ec9",
// // //     minWidth: "120px",
// // //   },
// // //   tableCell: {
// // //     fontSize: "14px",
// // //     fontFamily: "'Baskerville', serif",
// // //     padding: "12px 8px",
// // //     textAlign: "center",
// // //     borderBottom: "1px solid #e0e0e0",
// // //     minWidth: "50px",
// // //   },
// // //   nameCellStickyEven: {
// // //     fontSize: "14px",
// // //     fontFamily: "'Baskerville', serif",
// // //     fontWeight: "bold",
// // //     padding: "12px 16px",
// // //     textAlign: "left",
// // //     position: "sticky",
// // //     left: 0,
// // //     backgroundColor: "#ffffff",
// // //     zIndex: 100,
// // //     borderRight: "2px solid #4fb1f6",
// // //     borderBottom: "1px solid #e0e0e0",
// // //     minWidth: "200px",
// // //   },
// // //   nameCellStickyOdd: {
// // //     fontSize: "14px",
// // //     fontFamily: "'Baskerville', serif",
// // //     fontWeight: "bold",
// // //     padding: "12px 16px",
// // //     textAlign: "left",
// // //     position: "sticky",
// // //     left: 0,
// // //     backgroundColor: "#eef7ff",
// // //     zIndex: 100,
// // //     borderRight: "2px solid #4fb1f6",
// // //     borderBottom: "1px solid #e0e0e0",
// // //     minWidth: "200px",
// // //   },
// // //   totalCellEven: {
// // //     fontWeight: "bold",
// // //     backgroundColor: "#ffffff",
// // //     fontSize: "15px",
// // //     padding: "12px 8px",
// // //     textAlign: "center",
// // //     borderBottom: "1px solid #e0e0e0",
// // //     borderLeft: "2px solid #4fb1f6",
// // //     minWidth: "120px",
// // //     position: "sticky",
// // //     right: 0,
// // //     zIndex: 100,
// // //   },
// // //   totalCellOdd: {
// // //     fontWeight: "bold",
// // //     backgroundColor: "#eef7ff",
// // //     fontSize: "15px",
// // //     padding: "12px 8px",
// // //     textAlign: "center",
// // //     borderBottom: "1px solid #e0e0e0",
// // //     borderLeft: "2px solid #4fb1f6",
// // //     minWidth: "120px",
// // //     position: "sticky",
// // //     right: 0,
// // //     zIndex: 100,
// // //   },
// // //   alternateRow: {
// // //     backgroundColor: "#eef7ff",

// // //   },
// // //   regularRow: {
// // //     backgroundColor: "#ffffff",

// // //   },
// // //   noDataCell: {
// // //     textAlign: "center",
// // //     color: "#fa6767",
// // //     fontFamily: "'Baskerville', serif",
// // //     fontWeight: "bold",
// // //     padding: "40px",
// // //   },
// // //   exportButton: {
// // //     padding: "10px 20px",
// // //     backgroundColor: "#4fb1f6",
// // //     color: "#fff",
// // //     border: "none",
// // //     borderRadius: "5px",
// // //     cursor: "pointer",
// // //     fontSize: "16px",
// // //     fontWeight: "bold",

// // //   },
// // //   headerContainer: {
// // //     display: "flex",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //     marginBottom: "20px",
// // //     padding: "15px 20px",
// // //     backgroundColor: "#EEF7FF",
// // //     borderRadius: "8px",
// // //   },
// // //   futureDateCell: {
// // //     backgroundColor: "#f5f5f5",
// // //     color: "#999",
// // //     textAlign: "center",
// // //     padding: "12px 8px",
// // //     borderBottom: "1px solid #e0e0e0",
// // //     minWidth: "50px",
// // //   },
// // // }));

// // // export default function PeriodAttendanceTable({
// // //   attendanceData,
// // //   selectedMonth,
// // //   selectedYear,
// // //   monthName
// // // }) {
// // //   const classes = useStyles();

// // //   const getDaysInMonth = (month, year) => {
// // //     return new Date(year, month + 1, 0).getDate();
// // //   };

// // //   const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
// // //   const today = moment().startOf('day');

// // //   const exportToPDF = () => {
// // //     const doc = new jsPDF('l', 'mm', 'a4');
// // //     const pageWidth = doc.internal.pageSize.getWidth();

// // //     // Title
// // //     doc.setFontSize(18);
// // //     doc.setFont(undefined, 'bold');
// // //     doc.setTextColor(79, 177, 246);
// // //     doc.text(`Attendance Report - ${monthName} ${selectedYear}`, pageWidth / 2, 15, { align: 'center' });

// // //     // Prepare table headers
// // //     const headers = ['Student Name'];
// // //     for (let i = 1; i <= daysInMonth; i++) {
// // //       headers.push(i.toString());
// // //     }
// // //     headers.push('Total');

// // //     // Prepare table data
// // //     const tableData = attendanceData.map(student => {
// // //       const row = [`${student.name} ${student.surname}`];

// // //       for (let day = 1; day <= daysInMonth; day++) {
// // //         const currentDate = moment([selectedYear, selectedMonth, day]);
// // //         if (currentDate.isAfter(today)) {
// // //           row.push('-');
// // //         } else {
// // //           const status = student.dailyAttendance[day];
// // //           if (status === true) {
// // //             row.push('✓');
// // //           } else if (status === false) {
// // //             row.push('✗');
// // //           } else {
// // //             row.push('-');
// // //           }
// // //         }
// // //       }

// // //       row.push(`${student.totalPresent}/${student.totalDays}`);
// // //       return row;
// // //     });

// // //     // Generate table using autoTable
// // //     autoTable(doc, {
// // //       head: [headers],
// // //       body: tableData,
// // //       startY: 22,
// // //       theme: 'grid',
// // //       styles: {
// // //         fontSize: 7,
// // //         cellPadding: 1.5,
// // //         overflow: 'linebreak',
// // //         halign: 'center',
// // //         valign: 'middle',
// // //         lineColor: [200, 200, 200],
// // //         lineWidth: 0.1,
// // //       },
// // //       headStyles: {
// // //         fillColor: [79, 177, 246],
// // //         textColor: [255, 255, 255],
// // //         fontStyle: 'bold',
// // //         halign: 'center',
// // //         fontSize: 8,
// // //         cellPadding: 2,
// // //       },
// // //       columnStyles: {
// // //         0: {
// // //           cellWidth: 35,
// // //           halign: 'left',
// // //           fontStyle: 'bold',
// // //           fontSize: 7.5,
// // //         },
// // //       },
// // //       didParseCell: function (data) {
// // //         const isOddRow = data.row.index % 2 === 1;

// // //         // Apply alternating row colors to all cells
// // //         if (data.section === 'body') {
// // //           data.cell.styles.fillColor = isOddRow ? [238, 247, 255] : [255, 255, 255];

// // //           // Style the Total column
// // //           if (data.column.index === headers.length - 1) {
// // //             data.cell.styles.fontStyle = 'bold';
// // //             data.cell.styles.fontSize = 8;
// // //           }

// // //           // Style present (✓) in green
// // //           if (data.cell.text[0] === '✓') {
// // //             data.cell.styles.textColor = [76, 175, 80];
// // //             data.cell.styles.fontSize = 10;
// // //           }

// // //           // Style absent (✗) in red
// // //           if (data.cell.text[0] === '✗') {
// // //             data.cell.styles.textColor = [244, 67, 54];
// // //             data.cell.styles.fontSize = 10;
// // //           }

// // //           // Style future dates differently
// // //           if (data.cell.text[0] === '-' && data.column.index > 0 && data.column.index < headers.length - 1) {
// // //             data.cell.styles.textColor = [150, 150, 150];
// // //           }
// // //         }
// // //       },
// // //       margin: { left: 8, right: 8, top: 22, bottom: 8 },
// // //     });

// // //     doc.save(`Attendance_${monthName}_${selectedYear}.pdf`);
// // //   };

// // //   return (
// // //     <div>
// // //       <div className={classes.headerContainer}>
// // //         <h3 style={{ margin: 0, color: "#4fb1f6", fontSize: "22px" }}>
// // //           Attendance Summary - {monthName} {selectedYear}
// // //         </h3>
// // //         <button
// // //           className={classes.exportButton}
// // //           onClick={exportToPDF}
// // //           disabled={!attendanceData || attendanceData.length === 0}
// // //         >
// // //           📥 Export to PDF
// // //         </button>
// // //       </div>

// // //       <TableContainer component={Paper} className={classes.tableContainer}>
// // //         <Table className={classes.table} aria-label="attendance table">
// // //           <TableHead>
// // //             <TableRow>
// // //               <TableCell className={classes.stickyHeaderName}>
// // //                 Student Name
// // //               </TableCell>
// // //               {Array.from({ length: daysInMonth }, (_, index) => {
// // //                 const day = index + 1;
// // //                 const currentDate = moment([selectedYear, selectedMonth, day]);
// // //                 const dayName = currentDate.format('ddd');

// // //                 return (
// // //                   <TableCell key={day} className={classes.stickyHeader}>
// // //                     <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{day}</div>
// // //                     <div style={{ fontSize: '10px', fontWeight: 'normal' }}>{dayName}</div>
// // //                   </TableCell>
// // //                 );
// // //               })}
// // //               <TableCell className={classes.stickyHeaderTotal}>
// // //                 Total
// // //               </TableCell>
// // //             </TableRow>
// // //           </TableHead>
// // //           <TableBody>
// // //             {attendanceData && attendanceData.length > 0 ? (
// // //               attendanceData.map((student, rowIndex) => {
// // //                 const isEvenRow = rowIndex % 2 === 0;
// // //                 return (
// // //                   <TableRow
// // //                     key={student.userID}
// // //                     className={isEvenRow ? classes.regularRow : classes.alternateRow}
// // //                   >
// // //                     <TableCell className={isEvenRow ? classes.nameCellStickyEven : classes.nameCellStickyOdd}>
// // //                       {student.name} {student.surname}
// // //                     </TableCell>
// // //                     {Array.from({ length: daysInMonth }, (_, index) => {
// // //                       const day = index + 1;
// // //                       const currentDate = moment([selectedYear, selectedMonth, day]);
// // //                       const status = student.dailyAttendance[day];

// // //                       if (currentDate.isAfter(today)) {
// // //                         return (
// // //                           <TableCell key={day} className={classes.futureDateCell}>
// // //                             -
// // //                           </TableCell>
// // //                         );
// // //                       }

// // //                       return (
// // //                         <TableCell key={day} className={classes.tableCell}>
// // //                           {status === true ? (
// // //                             <span style={{ color: "#4caf50", fontSize: "20px", fontWeight: "bold" }}>✓</span>
// // //                           ) : status === false ? (
// // //                             <span style={{ color: "#f44336", fontSize: "20px", fontWeight: "bold" }}>✗</span>
// // //                           ) : (
// // //                             <span style={{ color: "#999" }}>-</span>
// // //                           )}
// // //                         </TableCell>
// // //                       );
// // //                     })}
// // //                     <TableCell className={isEvenRow ? classes.totalCellEven : classes.totalCellOdd}>
// // //                       {student.totalPresent}/{student.totalDays}
// // //                     </TableCell>
// // //                   </TableRow>
// // //                 );
// // //               })
// // //             ) : (
// // //               <TableRow>
// // //                 <TableCell
// // //                   className={classes.noDataCell}
// // //                   colSpan={daysInMonth + 2}
// // //                 >
// // //                   No Students in this class
// // //                 </TableCell>
// // //               </TableRow>
// // //             )}
// // //           </TableBody>
// // //         </Table>
// // //       </TableContainer>
// // //     </div>
// // //   );
// // // }



// // import React from "react";
// // import { makeStyles } from "@material-ui/core/styles";
// // import Table from "@material-ui/core/Table";
// // import TableBody from "@material-ui/core/TableBody";
// // import TableHead from "@material-ui/core/TableHead";
// // import TableCell from "@material-ui/core/TableCell";
// // import TableContainer from "@material-ui/core/TableContainer";
// // import TableRow from "@material-ui/core/TableRow";
// // import Paper from "@material-ui/core/Paper";
// // import jsPDF from "jspdf";
// // import "jspdf-autotable";
// // import moment from "moment";


// // const useStyles = makeStyles((theme) => ({
// //   tableContainer: {
// //     borderRadius: "8px",
// //     backgroundColor: "#FFFFFF",
// //     marginBottom: "40px",
// //     maxHeight: "600px",
// //     overflow: "auto",
// //     position: "relative",
// //   },
// //   table: {
// //     width: "100%",
// //     borderCollapse: "separate",
// //     borderSpacing: 0,
// //   },
// //   stickyHeader: {
// //     position: "sticky",
// //     top: 0,
// //     backgroundColor: "#4fb1f6",
// //     color: "#fff",
// //     zIndex: 200,
// //     fontFamily: "'Times New Roman', serif",
// //     fontWeight: "bold",
// //     textAlign: "center",
// //     padding: "12px 8px",
// //     borderBottom: "2px solid #3a8ec9",
// //     minWidth: "50px",
// //   },
// //   stickyHeaderName: {
// //     position: "sticky",
// //     top: 0,
// //     left: 0,
// //     backgroundColor: "#4fb1f6",
// //     color: "#fff",
// //     zIndex: 300,
// //     fontFamily: "'Times New Roman', serif",
// //     fontWeight: "bold",
// //     textAlign: "center",
// //     padding: "12px 8px",
// //     borderRight: "2px solid #3a8ec9",
// //     borderBottom: "2px solid #3a8ec9",
// //     minWidth: "200px",
// //   },
// //   stickyHeaderTotal: {
// //     position: "sticky",
// //     top: 0,
// //     right: 0,
// //     backgroundColor: "#4fb1f6",
// //     color: "#fff",
// //     zIndex: 200,
// //     fontFamily: "'Times New Roman', serif",
// //     fontWeight: "bold",
// //     textAlign: "center",
// //     padding: "12px 8px",
// //     borderBottom: "2px solid #3a8ec9",
// //     borderLeft: "2px solid #3a8ec9",
// //     minWidth: "120px",
// //   },
// //   tableCell: {
// //     fontSize: "14px",
// //     fontFamily: "'Baskerville', serif",
// //     padding: "12px 8px",
// //     textAlign: "center",
// //     borderBottom: "1px solid #e0e0e0",
// //     minWidth: "50px",
// //   },
// //   nameCellStickyEven: {
// //     fontSize: "14px",
// //     fontFamily: "'Baskerville', serif",
// //     fontWeight: "bold",
// //     padding: "12px 16px",
// //     textAlign: "left",
// //     position: "sticky",
// //     left: 0,
// //     backgroundColor: "#ffffff",
// //     zIndex: 100,
// //     borderRight: "2px solid #4fb1f6",
// //     borderBottom: "1px solid #e0e0e0",
// //     minWidth: "200px",
// //   },
// //   nameCellStickyOdd: {
// //     fontSize: "14px",
// //     fontFamily: "'Baskerville', serif",
// //     fontWeight: "bold",
// //     padding: "12px 16px",
// //     textAlign: "left",
// //     position: "sticky",
// //     left: 0,
// //     backgroundColor: "#eef7ff",
// //     zIndex: 100,
// //     borderRight: "2px solid #4fb1f6",
// //     borderBottom: "1px solid #e0e0e0",
// //     minWidth: "200px",
// //   },
// //   totalCellEven: {
// //     fontWeight: "bold",
// //     backgroundColor: "#ffffff",
// //     fontSize: "15px",
// //     padding: "12px 8px",
// //     textAlign: "center",
// //     borderBottom: "1px solid #e0e0e0",
// //     borderLeft: "2px solid #4fb1f6",
// //     minWidth: "120px",
// //     position: "sticky",
// //     right: 0,
// //     zIndex: 100,
// //   },
// //   totalCellOdd: {
// //     fontWeight: "bold",
// //     backgroundColor: "#eef7ff",
// //     fontSize: "15px",
// //     padding: "12px 8px",
// //     textAlign: "center",
// //     borderBottom: "1px solid #e0e0e0",
// //     borderLeft: "2px solid #4fb1f6",
// //     minWidth: "120px",
// //     position: "sticky",
// //     right: 0,
// //     zIndex: 100,
// //   },
// //   alternateRow: {
// //     backgroundColor: "#eef7ff",
// //     "&:hover": {
// //       backgroundColor: "#d6eeff",
// //     },
// //   },
// //   regularRow: {
// //     backgroundColor: "#ffffff",
// //     "&:hover": {
// //       backgroundColor: "#f0f7ff",
// //     },
// //   },
// //   noDataCell: {
// //     textAlign: "center",
// //     color: "#fa6767",
// //     fontFamily: "'Baskerville', serif",
// //     fontWeight: "bold",
// //     padding: "40px",
// //   },
// //   exportButton: {
// //     padding: "10px 20px",
// //     backgroundColor: "#4fb1f6",
// //     color: "#fff",
// //     border: "none",
// //     borderRadius: "5px",
// //     cursor: "pointer",
// //     fontSize: "16px",
// //     fontWeight: "bold",
// //     "&:hover": {
// //       backgroundColor: "#3a8ec9",
// //     },
// //   },
// //   headerContainer: {
// //     display: "flex",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     marginBottom: "20px",
// //     padding: "15px 20px",
// //     backgroundColor: "#EEF7FF",
// //     borderRadius: "8px",
// //   },
// //   futureDateCell: {
// //     backgroundColor: "#f5f5f5",
// //     color: "#999",
// //     textAlign: "center",
// //     padding: "12px 8px",
// //     borderBottom: "1px solid #e0e0e0",
// //     minWidth: "50px",
// //   },
// // }));

// // export default function PeriodAttendanceTable({
// //   attendanceData,
// //   selectedMonth,
// //   selectedYear,
// //   monthName
// // }) {
// //   const classes = useStyles();

// //   const getDaysInMonth = (month, year) => {
// //     return new Date(year, month + 1, 0).getDate();
// //   };

// //   const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
// //   const today = moment().startOf('day');



// //   const exportToPDF = () => {
// //     const doc = new jsPDF('l', 'mm', 'a4');
// //     const pageWidth = doc.internal.pageSize.getWidth();

// //     // Get class name from first student
// //     const className =
// //       attendanceData.length > 0
// //         ? attendanceData[0].classID?.toUpperCase() || ''
// //         : '';

// //     // Title
// //     doc.setFont('helvetica', 'bold');
// //     doc.setFontSize(16);
// //     doc.setTextColor(79, 177, 246);
// //     doc.text(
// //       `Attendance Report - ${monthName} ${selectedYear}`,
// //       pageWidth / 2,
// //       12,
// //       { align: 'center' }
// //     );

// //     // Class Name
// //     if (className) {
// //       doc.setFontSize(12);
// //       doc.setTextColor(60, 60, 60);
// //       doc.text(`Class: ${className}`, pageWidth / 2, 19, { align: 'center' });
// //     }

// //     // Prepare table headers
// //     const headers = ['Student Name'];
// //     for (let i = 1; i <= daysInMonth; i++) {
// //       headers.push(i.toString());
// //     }
// //     headers.push('Total');

// //     // Prepare table data (use ASCII-friendly symbols ✓ = \u2713, ✗ = \u2717)
// //     const tableData = attendanceData.map((student) => {
// //       const row = [`${student.name} ${student.surname}`];
// //       for (let day = 1; day <= daysInMonth; day++) {
// //         const currentDate = moment([selectedYear, selectedMonth, day]);
// //         if (currentDate.isAfter(today)) {
// //           row.push('-');
// //         } else {
// //           const status = student.dailyAttendance[day];
// //           if (status === true) row.push('\u2713'); // ✓ check mark
// //           else if (status === false) row.push('\u2717'); // ✗ cross mark
// //           else row.push('-');
// //         }
// //       }
// //       row.push(`${student.totalPresent}/${student.totalDays}`);
// //       return row;
// //     });

// //     // Dynamically scale column widths to fit all 31 days
// //     const nameColWidth = 40; // first column width
// //     const totalColWidth = 18;
// //     const remainingWidth = pageWidth - nameColWidth - totalColWidth - 16; // margins
// //     const dayColWidth = remainingWidth / daysInMonth;

// //     // Generate table
// //     doc.autoTable({
// //       head: [headers],
// //       body: tableData,
// //       startY: 25,
// //       theme: 'grid',
// //       styles: {
// //         font: 'helvetica',
// //         fontSize: 6.5,
// //         cellPadding: 1,
// //         overflow: 'linebreak',
// //         halign: 'center',
// //         valign: 'middle',
// //         lineColor: [200, 200, 200],
// //         lineWidth: 0.1,
// //       },
// //       headStyles: {
// //         fillColor: [79, 177, 246],
// //         textColor: [255, 255, 255],
// //         fontStyle: 'bold',
// //         halign: 'center',
// //         fontSize: 7,
// //         cellPadding: 2,
// //       },
// //       columnStyles: {
// //         0: { cellWidth: nameColWidth, halign: 'left', fontStyle: 'bold' },
// //         [headers.length - 1]: { cellWidth: totalColWidth, fontStyle: 'bold' },
// //         ...Object.fromEntries(
// //           Array.from({ length: daysInMonth }, (_, i) => [i + 1, { cellWidth: dayColWidth }])
// //         ),
// //       },
// //       didParseCell: (data) => {
// //         const isOddRow = data.row.index % 2 === 1;
// //         if (data.section === 'body') {
// //           // alternate row color
// //           data.cell.styles.fillColor = isOddRow ? [238, 247, 255] : [255, 255, 255];

// //           // Color code ✓ and ✗
// //           const val = data.cell.text[0];
// //           if (val === '\u2713') {
// //             data.cell.styles.textColor = [76, 175, 80];
// //             data.cell.styles.fontSize = 8;
// //           } else if (val === '\u2717') {
// //             data.cell.styles.textColor = [244, 67, 54];
// //             data.cell.styles.fontSize = 8;
// //           } else if (val === '-') {
// //             data.cell.styles.textColor = [130, 130, 130];
// //           }
// //         }
// //       },
// //       margin: { top: 25, left: 8, right: 8, bottom: 8 },
// //       pageBreak: 'auto',
// //     });

// //     // Save file
// //     doc.save(`Attendance_${className}_${monthName}_${selectedYear}.pdf`);
// //   };

// //   // const exportToPDF = () => {
// //   //   const doc = new jsPDF('l', 'mm', 'a4');
// //   //   const pageWidth = doc.internal.pageSize.getWidth();

// //   //   // Get class name from first student
// //   //   const className = attendanceData.length > 0 ? attendanceData[0].classID.toUpperCase() : '';

// //   //   // Title
// //   //   doc.setFontSize(18);
// //   //   doc.setTextColor(79, 177, 246);
// //   //   doc.text(`Attendance Report - ${monthName} ${selectedYear}`, pageWidth / 2, 12, { align: 'center' });

// //   //   // Class Name
// //   //   doc.setFontSize(14);
// //   //   doc.setTextColor(60, 60, 60);
// //   //   doc.text(`Class: ${className}`, pageWidth / 2, 19, { align: 'center' });

// //   //   // Prepare table headers
// //   //   const headers = ['Student Name'];
// //   //   for (let i = 1; i <= daysInMonth; i++) {
// //   //     headers.push(i.toString());
// //   //   }
// //   //   headers.push('Total');

// //   //   // Prepare table data
// //   //   const tableData = attendanceData.map(student => {
// //   //     const row = [`${student.name} ${student.surname}`];

// //   //     for (let day = 1; day <= daysInMonth; day++) {
// //   //       const currentDate = moment([selectedYear, selectedMonth, day]);
// //   //       if (currentDate.isAfter(today)) {
// //   //         row.push('-');
// //   //       } else {
// //   //         const status = student.dailyAttendance[day];
// //   //         if (status === true) {
// //   //           row.push('P');
// //   //         } else if (status === false) {
// //   //           row.push('A');
// //   //         } else {
// //   //           row.push('-');
// //   //         }
// //   //       }
// //   //     }

// //   //     row.push(`${student.totalPresent}/${student.totalDays}`);
// //   //     return row;
// //   //   });

// //   //   // Generate table using jspdf-autotable
// //   //   doc.autoTable({
// //   //     head: [headers],
// //   //     body: tableData,
// //   //     startY: 24,
// //   //     theme: 'grid',
// //   //     styles: {
// //   //       fontSize: 7,
// //   //       cellPadding: 1.5,
// //   //       overflow: 'linebreak',
// //   //       halign: 'center',
// //   //       valign: 'middle',
// //   //       lineColor: [200, 200, 200],
// //   //       lineWidth: 0.1,
// //   //     },
// //   //     headStyles: {
// //   //       fillColor: [79, 177, 246],
// //   //       textColor: [255, 255, 255],
// //   //       fontStyle: 'bold',
// //   //       halign: 'center',
// //   //       fontSize: 8,
// //   //       cellPadding: 2,
// //   //     },
// //   //     columnStyles: {
// //   //       0: {
// //   //         cellWidth: 35,
// //   //         halign: 'left',
// //   //         fontStyle: 'bold',
// //   //         fontSize: 7.5,
// //   //       },
// //   //     },
// //   //     didParseCell: function (data) {
// //   //       const isOddRow = data.row.index % 2 === 1;

// //   //       // Apply alternating row colors to all cells
// //   //       if (data.section === 'body') {
// //   //         data.cell.styles.fillColor = isOddRow ? [238, 247, 255] : [255, 255, 255];

// //   //         // Style the Total column
// //   //         if (data.column.index === headers.length - 1) {
// //   //           data.cell.styles.fontStyle = 'bold';
// //   //           data.cell.styles.fontSize = 8;
// //   //         }

// //   //         // Style present (P) in green
// //   //         if (data.cell.text[0] === 'P') {
// //   //           data.cell.styles.textColor = [76, 175, 80];
// //   //           data.cell.styles.fontStyle = 'bold';
// //   //           data.cell.styles.fontSize = 9;
// //   //         }

// //   //         // Style absent (A) in red
// //   //         if (data.cell.text[0] === 'A') {
// //   //           data.cell.styles.textColor = [244, 67, 54];
// //   //           data.cell.styles.fontStyle = 'bold';
// //   //           data.cell.styles.fontSize = 9;
// //   //         }

// //   //         // Style future dates differently
// //   //         if (data.cell.text[0] === '-' && data.column.index > 0 && data.column.index < headers.length - 1) {
// //   //           data.cell.styles.textColor = [150, 150, 150];
// //   //         }
// //   //       }
// //   //     },
// //   //     margin: { left: 8, right: 8, top: 24, bottom: 8 },
// //   //   });

// //   //   doc.save(`Attendance_${className}_${monthName}_${selectedYear}.pdf`);
// //   // };

// //   return (
// //     <div>
// //       <div className={classes.headerContainer}>
// //         <h3 style={{ margin: 0, color: "#4fb1f6", fontSize: "22px" }}>
// //           Attendance Summary - {monthName} {selectedYear}
// //           {attendanceData.length > 0 && (
// //             <span style={{ marginLeft: "15px", fontSize: "18px", color: "#666" }}>
// //               | Class: {attendanceData[0].classID.toUpperCase()}
// //             </span>
// //           )}
// //         </h3>
// //         <button
// //           className={classes.exportButton}
// //           onClick={exportToPDF}
// //           disabled={!attendanceData || attendanceData.length === 0}
// //         >
// //           📥 Export to PDF
// //         </button>
// //       </div>

// //       <TableContainer component={Paper} className={classes.tableContainer}>
// //         <Table className={classes.table} aria-label="attendance table">
// //           <TableHead>
// //             <TableRow>
// //               <TableCell className={classes.stickyHeaderName}>
// //                 Student Name
// //               </TableCell>
// //               {Array.from({ length: daysInMonth }, (_, index) => {
// //                 const day = index + 1;
// //                 const currentDate = moment([selectedYear, selectedMonth, day]);
// //                 const dayName = currentDate.format('ddd');

// //                 return (
// //                   <TableCell key={day} className={classes.stickyHeader}>
// //                     <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{day}</div>
// //                     <div style={{ fontSize: '10px', fontWeight: 'normal' }}>{dayName}</div>
// //                   </TableCell>
// //                 );
// //               })}
// //               <TableCell className={classes.stickyHeaderTotal}>
// //                 Total
// //               </TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {attendanceData && attendanceData.length > 0 ? (
// //               attendanceData.map((student, rowIndex) => {
// //                 const isEvenRow = rowIndex % 2 === 0;
// //                 return (
// //                   <TableRow
// //                     key={student.userID}
// //                     className={isEvenRow ? classes.regularRow : classes.alternateRow}
// //                   >
// //                     <TableCell className={isEvenRow ? classes.nameCellStickyEven : classes.nameCellStickyOdd}>
// //                       {student.name} {student.surname}
// //                     </TableCell>
// //                     {Array.from({ length: daysInMonth }, (_, index) => {
// //                       const day = index + 1;
// //                       const currentDate = moment([selectedYear, selectedMonth, day]);
// //                       const status = student.dailyAttendance[day];

// //                       if (currentDate.isAfter(today)) {
// //                         return (
// //                           <TableCell key={day} className={classes.futureDateCell}>
// //                             -
// //                           </TableCell>
// //                         );
// //                       }

// //                       return (
// //                         <TableCell key={day} className={classes.tableCell}>
// //                           {status === true ? (
// //                             <span style={{ color: "#4caf50", fontSize: "20px", fontWeight: "bold" }}>✓</span>
// //                           ) : status === false ? (
// //                             <span style={{ color: "#f44336", fontSize: "20px", fontWeight: "bold" }}>✗</span>
// //                           ) : (
// //                             <span style={{ color: "#999" }}>-</span>
// //                           )}
// //                         </TableCell>
// //                       );
// //                     })}
// //                     <TableCell className={isEvenRow ? classes.totalCellEven : classes.totalCellOdd}>
// //                       {student.totalPresent}/{student.totalDays}
// //                     </TableCell>
// //                   </TableRow>
// //                 );
// //               })
// //             ) : (
// //               <TableRow>
// //                 <TableCell
// //                   className={classes.noDataCell}
// //                   colSpan={daysInMonth + 2}
// //                 >
// //                   No Students in this class
// //                 </TableCell>
// //               </TableRow>
// //             )}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>
// //     </div>
// //   );
// // }


// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableHead from "@material-ui/core/TableHead";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import moment from "moment";

// const useStyles = makeStyles((theme) => ({
//   /* (keep all your styles exactly as before) */
//   tableContainer: { borderRadius: "8px", backgroundColor: "#FFFFFF", marginBottom: "40px", maxHeight: "600px", overflow: "auto", position: "relative" },
//   table: { width: "100%", borderCollapse: "separate", borderSpacing: 0 },
//   stickyHeader: { position: "sticky", top: 0, backgroundColor: "#4fb1f6", color: "#fff", zIndex: 200, fontFamily: "'Times New Roman', serif", fontWeight: "bold", textAlign: "center", padding: "12px 8px", borderBottom: "2px solid #3a8ec9", minWidth: "50px" },
//   stickyHeaderName: { position: "sticky", top: 0, left: 0, backgroundColor: "#4fb1f6", color: "#fff", zIndex: 300, fontFamily: "'Times New Roman', serif", fontWeight: "bold", textAlign: "center", padding: "12px 8px", borderRight: "2px solid #3a8ec9", borderBottom: "2px solid #3a8ec9", minWidth: "200px" },
//   stickyHeaderTotal: { position: "sticky", top: 0, right: 0, backgroundColor: "#4fb1f6", color: "#fff", zIndex: 200, fontFamily: "'Times New Roman', serif", fontWeight: "bold", textAlign: "center", padding: "12px 8px", borderBottom: "2px solid #3a8ec9", borderLeft: "2px solid #3a8ec9", minWidth: "120px" },
//   tableCell: { fontSize: "14px", fontFamily: "'Baskerville', serif", padding: "12px 8px", textAlign: "center", borderBottom: "1px solid #e0e0e0", minWidth: "50px" },
//   nameCellStickyEven: { fontSize: "14px", fontFamily: "'Baskerville', serif", fontWeight: "bold", padding: "12px 16px", textAlign: "left", position: "sticky", left: 0, backgroundColor: "#ffffff", zIndex: 100, borderRight: "2px solid #4fb1f6", borderBottom: "1px solid #e0e0e0", minWidth: "200px" },
//   nameCellStickyOdd: { fontSize: "14px", fontFamily: "'Baskerville', serif", fontWeight: "bold", padding: "12px 16px", textAlign: "left", position: "sticky", left: 0, backgroundColor: "#eef7ff", zIndex: 100, borderRight: "2px solid #4fb1f6", borderBottom: "1px solid #e0e0e0", minWidth: "200px" },
//   totalCellEven: { fontWeight: "bold", backgroundColor: "#ffffff", fontSize: "15px", padding: "12px 8px", textAlign: "center", borderBottom: "1px solid #e0e0e0", borderLeft: "2px solid #4fb1f6", minWidth: "120px", position: "sticky", right: 0, zIndex: 100 },
//   totalCellOdd: { fontWeight: "bold", backgroundColor: "#eef7ff", fontSize: "15px", padding: "12px 8px", textAlign: "center", borderBottom: "1px solid #e0e0e0", borderLeft: "2px solid #4fb1f6", minWidth: "120px", position: "sticky", right: 0, zIndex: 100 },
//   alternateRow: { backgroundColor: "#eef7ff", "&:hover": { backgroundColor: "#d6eeff" } },
//   regularRow: { backgroundColor: "#ffffff", "&:hover": { backgroundColor: "#f0f7ff" } },
//   noDataCell: { textAlign: "center", color: "#fa6767", fontFamily: "'Baskerville', serif", fontWeight: "bold", padding: "40px" },
//   exportButton: { padding: "10px 20px", backgroundColor: "#4fb1f6", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px", fontWeight: "bold", "&:hover": { backgroundColor: "#3a8ec9" } },
//   headerContainer: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", padding: "15px 20px", backgroundColor: "#EEF7FF", borderRadius: "8px" },
//   futureDateCell: { backgroundColor: "#f5f5f5", color: "#999", textAlign: "center", padding: "12px 8px", borderBottom: "1px solid #e0e0e0", minWidth: "50px" },
// }));

// export default function PeriodAttendanceTable({
//   attendanceData = [],
//   selectedMonth,
//   selectedYear,
//   monthName
// }) {
//   const classes = useStyles();

//   const getDaysInMonth = (month, year) => {
//     return new Date(year, month + 1, 0).getDate();
//   };

//   const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
//   const today = moment().startOf('day');

//   // Robust status sanitizer for PDF
//   const getPdfStatus = (rawStatus) => {
//     // Handle boolean
//     if (rawStatus === true) return 'P';
//     if (rawStatus === false) return 'A';

//     // if number (1/0)
//     if (rawStatus === 1) return 'P';
//     if (rawStatus === 0) return 'A';

//     // strings - check for common keywords / glyphs
//     if (typeof rawStatus === 'string') {
//       const s = rawStatus.trim().toLowerCase();
//       if (!s) return '-';
//       // contains check marks or words meaning present
//       if (s.includes('present') || s.includes('p') || s.includes('tick') || s.includes('✔') || s.includes('✓')) return 'P';
//       // contains absent-like markers
//       if (s.includes('abs') || s.includes('a') || s.includes('x') || s.includes('✗') || s.includes('✘')) return 'A';
//       // if the raw string is actually an HTML entity like '&amp;' or '&' => treat as missing
//       if (s === '&' || s === '&amp;' || s === 'amp') return '-';
//     }

//     return '-';
//   };

//   // helper to safely read attendance keyed by number or string
//   const getRawAttendance = (student, day) => {
//     if (!student || !student.dailyAttendance) return undefined;
//     const da = student.dailyAttendance;
//     // try numeric index
//     if (Object.prototype.hasOwnProperty.call(da, day)) return da[day];
//     // try string index
//     if (Object.prototype.hasOwnProperty.call(da, String(day))) return da[String(day)];
//     // try ISO date key 'YYYY-MM-DD'
//     const isoKey = moment([selectedYear, selectedMonth, day]).format('YYYY-MM-DD');
//     if (Object.prototype.hasOwnProperty.call(da, isoKey)) return da[isoKey];
//     // try variants
//     return undefined;
//   };

//   const exportToPDF = () => {
//     const doc = new jsPDF('l', 'mm', 'a4');
//     const pageWidth = doc.internal.pageSize.getWidth();

//     const className =
//       attendanceData && attendanceData.length > 0
//         ? (attendanceData[0].classID || '').toString().toUpperCase()
//         : '';

//     // Title & class
//     doc.setFont('helvetica', 'bold');
//     doc.setFontSize(16);
//     doc.setTextColor(79, 177, 246);
//     doc.text(
//       `Attendance Report - ${monthName} ${selectedYear}`,
//       pageWidth / 2,
//       12,
//       { align: 'center' }
//     );

//     if (className) {
//       doc.setFontSize(12);
//       doc.setTextColor(60, 60, 60);
//       doc.text(`Class: ${className}`, pageWidth / 2, 19, { align: 'center' });
//     }

//     // Build headers
//     const headers = ['Student Name'];
//     for (let i = 1; i <= daysInMonth; i += 1) headers.push(i.toString());
//     headers.push('Total');

//     // Build body: **always** map to safe values for PDF
//     const body = (attendanceData || []).map((student) => {
//       const row = [`${(student.name || '').trim()} ${(student.surname || '').trim()}`.trim() || '-'];
//       for (let d = 1; d <= daysInMonth; d += 1) {
//         const currentDate = moment([selectedYear, selectedMonth, d]);
//         if (currentDate.isAfter(today)) {
//           row.push('-');
//           continue;
//         }
//         const raw = getRawAttendance(student, d);
//         const mapped = getPdfStatus(raw);
//         row.push(mapped);
//       }
//       row.push(`${student.totalPresent || 0}/${student.totalDays || 0}`);
//       return row;
//     });

//     // Column sizing to fit 31 days on A4 landscape
//     const leftMargin = 8;
//     const rightMargin = 8;
//     const usableWidth = pageWidth - leftMargin - rightMargin;
//     const nameColWidth = 44;
//     const totalColWidth = 18;
//     const remaining = usableWidth - nameColWidth - totalColWidth;
//     const dayColWidth = Math.max(6, remaining / Math.max(1, daysInMonth));

//     // columnStyles
//     const columnStyles = { 0: { cellWidth: nameColWidth, halign: 'left', fontStyle: 'bold' } };
//     columnStyles[headers.length - 1] = { cellWidth: totalColWidth, halign: 'center', fontStyle: 'bold' };
//     for (let i = 1; i <= daysInMonth; i += 1) columnStyles[i] = { cellWidth: dayColWidth, halign: 'center' };

//     autoTable(doc, {
//       head: [headers],
//       body,
//       startY: className ? 26 : 22,
//       theme: 'grid',
//       styles: {
//         font: 'helvetica',
//         fontSize: 6.5,
//         cellPadding: 1,
//         overflow: 'linebreak',
//         halign: 'center',
//         valign: 'middle',
//         lineColor: [200, 200, 200],
//         lineWidth: 0.1,
//       },
//       headStyles: {
//         fillColor: [79, 177, 246],
//         textColor: [255, 255, 255],
//         fontStyle: 'bold',
//         halign: 'center',
//         fontSize: 7,
//         cellPadding: 2,
//       },
//       columnStyles,
//       didParseCell: (data) => {
//         if (data.section === 'body') {
//           const isOdd = data.row.index % 2 === 1;
//           data.cell.styles.fillColor = isOdd ? [238, 247, 255] : [255, 255, 255];

//           const txt = (data.cell && data.cell.text && data.cell.text[0]) || '';
//           if (txt === 'P') {
//             data.cell.styles.textColor = [76, 175, 80];
//             data.cell.styles.fontStyle = 'bold';
//             data.cell.styles.fontSize = 7.5;
//           } else if (txt === 'A') {
//             data.cell.styles.textColor = [244, 67, 54];
//             data.cell.styles.fontStyle = 'bold';
//             data.cell.styles.fontSize = 7.5;
//           } else if (txt === '-') {
//             data.cell.styles.textColor = [125, 125, 125];
//           }
//         }
//       },
//       margin: { top: className ? 30 : 24, left: leftMargin, right: rightMargin, bottom: 8 },
//       pageBreak: 'auto',
//     });

//     doc.save(`Attendance_${className || 'ALL'}_${monthName}_${selectedYear}.pdf`);
//   };

//   return (
//     <div>
//       <div className={classes.headerContainer}>
//         <h3 style={{ margin: 0, color: "#4fb1f6", fontSize: "22px" }}>
//           Attendance Summary - {monthName} {selectedYear}
//           {attendanceData.length > 0 && (
//             <span style={{ marginLeft: "15px", fontSize: "18px", color: "#666" }}>
//               | Class: {attendanceData[0].classID?.toUpperCase()}
//             </span>
//           )}
//         </h3>
//         <button
//           className={classes.exportButton}
//           onClick={exportToPDF}
//           disabled={!attendanceData || attendanceData.length === 0}
//         >
//           📥 Export to PDF
//         </button>
//       </div>

//       <TableContainer component={Paper} className={classes.tableContainer}>
//         <Table className={classes.table} aria-label="attendance table">
//           <TableHead>
//             <TableRow>
//               <TableCell className={classes.stickyHeaderName}>Student Name</TableCell>
//               {Array.from({ length: daysInMonth }, (_, index) => {
//                 const day = index + 1;
//                 const currentDate = moment([selectedYear, selectedMonth, day]);
//                 const dayName = currentDate.format('ddd');
//                 return (
//                   <TableCell key={day} className={classes.stickyHeader}>
//                     <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{day}</div>
//                     <div style={{ fontSize: '10px', fontWeight: 'normal' }}>{dayName}</div>
//                   </TableCell>
//                 );
//               })}
//               <TableCell className={classes.stickyHeaderTotal}>Total</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {attendanceData && attendanceData.length > 0 ? (
//               attendanceData.map((student, rowIndex) => {
//                 const isEven = rowIndex % 2 === 0;
//                 return (
//                   <TableRow key={student.userID || rowIndex} className={isEven ? classes.regularRow : classes.alternateRow}>
//                     <TableCell className={isEven ? classes.nameCellStickyEven : classes.nameCellStickyOdd}>
//                       {(student.name || '').trim()} {(student.surname || '').trim()}
//                     </TableCell>

//                     {Array.from({ length: daysInMonth }, (_, idx) => {
//                       const day = idx + 1;
//                       const currentDate = moment([selectedYear, selectedMonth, day]);
//                       if (currentDate.isAfter(today)) {
//                         return <TableCell key={day} className={classes.futureDateCell}>-</TableCell>;
//                       }
//                       const raw = getRawAttendance(student, day);
//                       // UI uses check/cross (for readability) but PDF uses P/A via sanitizer
//                       let uiEl = <span style={{ color: "#999" }}>-</span>;
//                       if (raw === true || raw === 1) uiEl = <span style={{ color: "#4caf50", fontSize: "20px", fontWeight: "bold" }}>✓</span>;
//                       else if (raw === false || raw === 0) uiEl = <span style={{ color: "#f44336", fontSize: "20px", fontWeight: "bold" }}>✗</span>;
//                       else if (typeof raw === 'string') {
//                         const r = raw.trim().toLowerCase();
//                         if (r.includes('present') || r.includes('p') || r.includes('✓') || r.includes('✔')) uiEl = <span style={{ color: "#4caf50", fontSize: "20px", fontWeight: "bold" }}>✓</span>;
//                         else if (r.includes('abs') || r.includes('a') || r.includes('x') || r.includes('✗') || r.includes('✘')) uiEl = <span style={{ color: "#f44336", fontSize: "20px", fontWeight: "bold" }}>✗</span>;
//                         else uiEl = <span style={{ color: "#999" }}>-</span>;
//                       }
//                       return <TableCell key={day} className={classes.tableCell}>{uiEl}</TableCell>;
//                     })}

//                     <TableCell className={isEven ? classes.totalCellEven : classes.totalCellOdd}>{student.totalPresent || 0}/{student.totalDays || 0}</TableCell>
//                   </TableRow>
//                 );
//               })
//             ) : (
//               <TableRow>
//                 <TableCell className={classes.noDataCell} colSpan={daysInMonth + 2}>No Students in this class</TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }



import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  tableContainer: { borderRadius: "8px", backgroundColor: "#FFFFFF", marginBottom: "40px", maxHeight: "600px", overflow: "auto", position: "relative" },
  table: { width: "100%", borderCollapse: "separate", borderSpacing: 0 },
  stickyHeader: { position: "sticky", top: 0, backgroundColor: "#4fb1f6", color: "#fff", zIndex: 200, fontFamily: "'Times New Roman', serif", fontWeight: "bold", textAlign: "center", padding: "12px 8px", borderBottom: "2px solid #3a8ec9", minWidth: "50px" },
  stickyHeaderName: { position: "sticky", top: 0, left: 0, backgroundColor: "#4fb1f6", color: "#fff", zIndex: 300, fontFamily: "'Times New Roman', serif", fontWeight: "bold", textAlign: "center", padding: "12px 8px", borderRight: "2px solid #3a8ec9", borderBottom: "2px solid #3a8ec9", minWidth: "200px" },
  stickyHeaderTotal: { position: "sticky", top: 0, right: 0, backgroundColor: "#4fb1f6", color: "#fff", zIndex: 200, fontFamily: "'Times New Roman', serif", fontWeight: "bold", textAlign: "center", padding: "12px 8px", borderBottom: "2px solid #3a8ec9", borderLeft: "2px solid #3a8ec9", minWidth: "120px" },
  tableCell: { fontSize: "14px", fontFamily: "'Baskerville', serif", padding: "12px 8px", textAlign: "center", borderBottom: "1px solid #e0e0e0", minWidth: "50px" },
  nameCellStickyEven: { fontSize: "14px", fontFamily: "'Baskerville', serif", fontWeight: "bold", padding: "12px 16px", textAlign: "left", position: "sticky", left: 0, backgroundColor: "#ffffff", zIndex: 100, borderRight: "2px solid #4fb1f6", borderBottom: "1px solid #e0e0e0", minWidth: "200px" },
  nameCellStickyOdd: { fontSize: "14px", fontFamily: "'Baskerville', serif", fontWeight: "bold", padding: "12px 16px", textAlign: "left", position: "sticky", left: 0, backgroundColor: "#eef7ff", zIndex: 100, borderRight: "2px solid #4fb1f6", borderBottom: "1px solid #e0e0e0", minWidth: "200px" },
  totalCellEven: { fontWeight: "bold", backgroundColor: "#ffffff", fontSize: "15px", padding: "12px 8px", textAlign: "center", borderBottom: "1px solid #e0e0e0", borderLeft: "2px solid #4fb1f6", minWidth: "120px", position: "sticky", right: 0, zIndex: 100 },
  totalCellOdd: { fontWeight: "bold", backgroundColor: "#eef7ff", fontSize: "15px", padding: "12px 8px", textAlign: "center", borderBottom: "1px solid #e0e0e0", borderLeft: "2px solid #4fb1f6", minWidth: "120px", position: "sticky", right: 0, zIndex: 100 },
  alternateRow: { backgroundColor: "#eef7ff", },
  regularRow: { backgroundColor: "#ffffff", },
  noDataCell: { textAlign: "center", color: "#fa6767", fontFamily: "'Baskerville', serif", fontWeight: "bold", padding: "40px" },
  exportButton: { padding: "10px 20px", backgroundColor: "#4fb1f6", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px", fontWeight: "bold", "&:hover": { backgroundColor: "#3a8ec9" } },
  headerContainer: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", padding: "15px 20px", backgroundColor: "#EEF7FF", borderRadius: "8px" },
  futureDateCell: { backgroundColor: "#f5f5f5", color: "#999", textAlign: "center", padding: "12px 8px", borderBottom: "1px solid #e0e0e0", minWidth: "50px" },
}));

export default function PeriodAttendanceTable({
  attendanceData = [],
  selectedMonth,
  selectedYear,
  monthName
}) {
  const classes = useStyles();

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const today = moment().startOf('day');

  const getRawAttendance = (student, day) => {
    if (!student || !student.dailyAttendance) return undefined;
    const da = student.dailyAttendance;
    if (Object.prototype.hasOwnProperty.call(da, day)) return da[day];
    if (Object.prototype.hasOwnProperty.call(da, String(day))) return da[String(day)];
    const isoKey = moment([selectedYear, selectedMonth, day]).format('YYYY-MM-DD');
    if (Object.prototype.hasOwnProperty.call(da, isoKey)) return da[isoKey];
    return undefined;
  };

  // exportToPDF uses safe P/A/- mapping to avoid encoding issues in PDF
  const getPdfStatus = (rawStatus) => {
    if (rawStatus === true || rawStatus === 1 || (typeof rawStatus === 'string' && (/present|p|✔|✓/i).test(rawStatus))) return 'P';
    if (rawStatus === false || rawStatus === 0 || (typeof rawStatus === 'string' && (/abs|a|x|✗|✘/i).test(rawStatus))) return 'A';
    return '-';
  };

  const exportToPDF = () => {
    const doc = new jsPDF('l', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const className = attendanceData.length > 0 ? (attendanceData[0].classID || '').toString().toUpperCase() : '';

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(79, 177, 246);
    doc.text(`Attendance Report - ${monthName} ${selectedYear}`, pageWidth / 2, 12, { align: 'center' });

    if (className) {
      doc.setFontSize(12);
      doc.setTextColor(60, 60, 60);
      doc.text(`Class: ${className}`, pageWidth / 2, 19, { align: 'center' });
    }

    const headers = ['Student Name', ...Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString()), 'Total'];

    const body = attendanceData.map(student => {
      const row = [`${(student.name || '').trim()} ${(student.surname || '').trim()}`.trim() || '-'];
      for (let d = 1; d <= daysInMonth; d++) {
        const currentDate = moment([selectedYear, selectedMonth, d]);
        if (currentDate.isAfter(today)) {
          row.push('-');
        } else {
          const raw = getRawAttendance(student, d);
          row.push(getPdfStatus(raw));
        }
      }
      row.push(`${student.totalPresent || 0}/${student.totalDays || 0}`);
      return row;
    });

    const leftMargin = 8;
    const rightMargin = 8;
    const usableWidth = pageWidth - leftMargin - rightMargin;
    const nameColWidth = 44;
    const totalColWidth = 18;
    const remaining = usableWidth - nameColWidth - totalColWidth;
    const dayColWidth = Math.max(6, remaining / Math.max(1, daysInMonth));

    const columnStyles = { 0: { cellWidth: nameColWidth, halign: 'left', fontStyle: 'bold' } };
    columnStyles[headers.length - 1] = { cellWidth: totalColWidth, halign: 'center', fontStyle: 'bold' };
    for (let i = 1; i <= daysInMonth; i++) columnStyles[i] = { cellWidth: dayColWidth, halign: 'center' };

    autoTable(doc, {
      head: [headers],
      body,
      startY: className ? 26 : 22,
      theme: 'grid',
      styles: { font: 'helvetica', fontSize: 6.5, cellPadding: 1, overflow: 'linebreak', halign: 'center', valign: 'middle' },
      headStyles: { fillColor: [79, 177, 246], textColor: [255, 255, 255], fontStyle: 'bold', halign: 'center', fontSize: 7, cellPadding: 2 },
      columnStyles,
      didParseCell: (data) => {
        if (data.section === 'body') {
          const isOdd = data.row.index % 2 === 1;
          data.cell.styles.fillColor = isOdd ? [238, 247, 255] : [255, 255, 255];
          const txt = (data.cell && data.cell.text && data.cell.text[0]) || '';
          if (txt === 'P') { data.cell.styles.textColor = [76, 175, 80]; data.cell.styles.fontStyle = 'bold'; data.cell.styles.fontSize = 7.5; }
          else if (txt === 'A') { data.cell.styles.textColor = [244, 67, 54]; data.cell.styles.fontStyle = 'bold'; data.cell.styles.fontSize = 7.5; }
          else if (txt === '-') { data.cell.styles.textColor = [125, 125, 125]; }
        }
      },
      margin: { top: className ? 30 : 24, left: leftMargin, right: rightMargin, bottom: 8 },
      pageBreak: 'auto',
    });

    doc.save(`Attendance_${className || 'ALL'}_${monthName}_${selectedYear}.pdf`);
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div>
      <div className={classes.headerContainer}>
        <h3 style={{ margin: 0, color: "#4fb1f6", fontSize: "22px" }}>
          Attendance Summary - {monthName} {selectedYear}
          {attendanceData.length > 0 && <span style={{ marginLeft: "15px", fontSize: "22px", color: "#4fb1f6" }}>| Class: {attendanceData[0].classID?.toUpperCase()}</span>}
        </h3>
        <button className={classes.exportButton} onClick={exportToPDF} disabled={!attendanceData || attendanceData.length === 0}>📥 Export to PDF</button>
      </div>

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="attendance table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.stickyHeaderName}>Student Name</TableCell>
              {days.map(day => {
                const currentDate = moment([selectedYear, selectedMonth, day]);
                const dayName = currentDate.format('ddd');
                return (
                  <TableCell key={day} className={classes.stickyHeader}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{day}</div>
                    <div style={{ fontSize: '10px', fontWeight: 'normal' }}>{dayName}</div>
                  </TableCell>
                );
              })}
              <TableCell className={classes.stickyHeaderTotal}>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceData && attendanceData.length > 0 ? attendanceData.map((student, rowIndex) => {
              const isEven = rowIndex % 2 === 0;
              return (
                <TableRow key={student.userID || rowIndex} className={isEven ? classes.regularRow : classes.alternateRow}>
                  <TableCell className={isEven ? classes.nameCellStickyEven : classes.nameCellStickyOdd}>
                    {(student.name || '').trim()} {(student.surname || '').trim()}
                  </TableCell>

                  {days.map(day => {
                    const currentDate = moment([selectedYear, selectedMonth, day]);
                    if (currentDate.isAfter(today)) return <TableCell key={day} className={classes.futureDateCell}>-</TableCell>;
                    const raw = getRawAttendance(student, day);
                    let uiEl = <span style={{ color: "#999" }}>-</span>;
                    if (raw === true || raw === 1) uiEl = <span style={{ color: "#4caf50", fontSize: "20px", fontWeight: "bold" }}>✓</span>;
                    else if (raw === false || raw === 0) uiEl = <span style={{ color: "#f44336", fontSize: "20px", fontWeight: "bold" }}>✗</span>;
                    else if (typeof raw === 'string') {
                      const r = raw.trim().toLowerCase();
                      if (/present|p|✓|✔/.test(r)) uiEl = <span style={{ color: "#4caf50", fontSize: "20px", fontWeight: "bold" }}>✓</span>;
                      else if (/abs|a|x|✗|✘/.test(r)) uiEl = <span style={{ color: "#f44336", fontSize: "20px", fontWeight: "bold" }}>✗</span>;
                    }
                    return <TableCell key={day} className={classes.tableCell}>{uiEl}</TableCell>;
                  })}

                  <TableCell className={isEven ? classes.totalCellEven : classes.totalCellOdd}>
                    {student.totalPresent || 0}/{student.totalDays || 0}
                  </TableCell>
                </TableRow>
              );
            }) : <TableRow><TableCell className={classes.noDataCell} colSpan={daysInMonth + 2}>No Students in this class</TableCell></TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
