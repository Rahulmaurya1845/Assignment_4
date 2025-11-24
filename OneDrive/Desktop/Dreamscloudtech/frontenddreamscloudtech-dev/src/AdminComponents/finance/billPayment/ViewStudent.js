import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import {
  getImgSrc,
  getCapitalize,
  getIntial,
} from "../../../utils";
import NumberFormat from "react-number-format";
import Transactions from "./ViewStudentPayment";

function ViewStudent({
  id,
  transactions,
  user,
  feetype,
  total,
  totalBill,
  balance,
  scholarship,
  monthlyFees,
  village,
  monthlyDiscounts,
  totalDiscount,
}) {
  const [open, setOpen] = useState(false);
  const name =
    getCapitalize(user?.name) +
    " " +
    getIntial(user?.middlename || " ") +
    getCapitalize(user?.surname || " ");

  const calculatedTotalDiscount = totalDiscount > 0 ? totalDiscount : (totalBill - total - balance);

  return (
    <div className="content__container" style={{ background: "#EEF7FF" }}>
      <div
        style={{ background: "#4fb1ff" }}
        className="d-flex flex-column align-items-center p-3 text-light mb-4"
      >
        <Avatar
          src={getImgSrc(user?.profileUrl)}
          style={{ width: "100px", height: "100px" }}
        />
        <h3>{name}</h3>
        <h5>{id}</h5>
        <h6>Village: {village || "Not selected"}</h6>
        <button onClick={() => setOpen(true)} className="btn red__btn">
          View Transactions
        </button>
      </div>
      <table className="table table-bordered" style={{ background: "white" }}>
        <thead>
          <tr>
            <th scope="col" style={{ fontSize: "14px" }}>Month</th>
            <th scope="col" style={{ fontSize: "14px" }}>Tution</th>
            <th scope="col" style={{ fontSize: "14px" }}>Maintenance</th>
            <th scope="col" style={{ fontSize: "14px" }}>Transport</th>
            <th scope="col" style={{ fontSize: "14px" }}>Exam</th>
            <th scope="col" style={{ fontSize: "14px" }}>Admission</th>
            <th scope="col" style={{ fontSize: "14px" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {monthlyFees.map((mf) => (
            <tr key={mf.month}>
              <td style={{ fontSize: "14px" }}>{mf.month}</td>
              <td style={{ fontSize: "14px" }}>
                <NumberFormat
                  value={mf.fees.tution}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </td>
              <td style={{ fontSize: "14px" }}>
                <NumberFormat
                  value={mf.fees.maintenance}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </td>
              <td style={{ fontSize: "14px" }}>
                <NumberFormat
                  value={mf.fees.transport}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </td>
              <td style={{ fontSize: "14px" }}>
                <NumberFormat
                  value={mf.fees.exam}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </td>
              <td style={{ fontSize: "14px" }}>
                <NumberFormat
                  value={mf.fees.admission}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </td>
              <td style={{ fontSize: "14px" }}>
                <NumberFormat
                  value={mf.total}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </td>
            </tr>
          ))}
          {scholarship?.percentage > 0 && (
            <tr>
              <td style={{ fontSize: "14px" }} colSpan="6">
                SCHOLARSHIP {scholarship?.percentage}% (excluding admission)
              </td>
              <td style={{ fontSize: "14px" }}>
                <NumberFormat
                  value={scholarship?.percentage
                    ? -((scholarship.percentage / 100) *
                      monthlyFees.reduce(
                        (sum, mf) => sum + mf.total - mf.fees.admission,
                        0
                      ))
                    : 0}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </td>
            </tr>
          )}

          <tr>
            <td style={{ fontSize: "14px" }} colSpan="6">
              <strong>TOTAL BILL</strong>
            </td>
            <td style={{ fontSize: "14px" }}>
              <strong>
                <NumberFormat
                  value={totalBill}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </strong>
            </td>
          </tr>
          <tr>
            <td style={{ fontSize: "14px" }} colSpan="6">
              TOTAL PAID
            </td>
            <td style={{ fontSize: "14px" }}>
              <NumberFormat
                value={-total}
                displayType={"text"}
                thousandSeparator={true}
              />
            </td>
          </tr>
          {calculatedTotalDiscount > 0 && (
            <tr>
              <td style={{ fontSize: "14px" }} colSpan="6">
                TOTAL DISCOUNT
              </td>
              <td style={{ fontSize: "14px" }}>
                <NumberFormat
                  value={-calculatedTotalDiscount}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </td>
            </tr>
          )}
          <tr>
            <td style={{ fontSize: "14px" }} colSpan="6">
              <strong>BALANCE</strong>
            </td>
            <td style={{ fontSize: "14px" }}>
              <strong>
                <NumberFormat
                  value={balance}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </strong>
            </td>
          </tr>
        </tbody>
      </table>

      <Transactions
        open={open}
        setOpen={setOpen}
        name={name}
        totalBill={totalBill}
        totalPaid={total}
        balance={balance}
        transactions={transactions}
      />
    </div>
  );
}

export default ViewStudent;

// import React, { useState } from "react";
// import { Avatar } from "@material-ui/core";
// import {
//   getImgSrc,
//   getCapitalize,
//   getIntial,
// } from "../../../utils";
// import NumberFormat from "react-number-format";
// import Transactions from "./ViewStudentPayment";

// function ViewStudent({
//   id,
//   transactions,
//   user,
//   feetype,
//   total,
//   totalBill,
//   balance,
//   scholarship,
//   monthlyFees,
//   village,
//   monthlyDiscounts,
//   totalDiscount,
// }) {
//   const [open, setOpen] = useState(false);
//   const name =
//     getCapitalize(user?.name) +
//     " " +
//     getIntial(user?.middlename || " ") +
//     getCapitalize(user?.surname);

//   const calculatedTotalDiscount = totalDiscount > 0 ? totalDiscount : (totalBill - total - balance);

//   return (
//     <div className="content__container" style={{ background: "#EEF7FF" }}>
//       <div
//         style={{ background: "#4fb1ff" }}
//         className="d-flex flex-column align-items-center p-3 text-light mb-4"
//       >
//         <Avatar
//           src={getImgSrc(user?.profileUrl)}
//           style={{ width: "100px", height: "100px" }}
//         />
//         <h3>{name}</h3>
//         <h5>{id}</h5>
//         <h6>Village: {village || "Not selected"}</h6>
//         <button onClick={() => setOpen(true)} className="btn red__btn">
//           View Transactions
//         </button>
//       </div>
//       <table className="table table-bordered" style={{ background: "white" }}>
//         <thead>
//           <tr>
//             <th scope="col" style={{ fontSize: "14px" }}>Month</th>
//             <th scope="col" style={{ fontSize: "14px" }}>Tuition</th>
//             <th scope="col" style={{ fontSize: "14px" }}>Maintenance</th>
//             <th scope="col" style={{ fontSize: "14px" }}>Transport</th>
//             <th scope="col" style={{ fontSize: "14px" }}>Exam</th>
//             <th scope="col" style={{ fontSize: "14px" }}>Admission</th>
//             <th scope="col" style={{ fontSize: "14px" }}>Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {monthlyFees.map((mf) => (
//             <tr key={mf.month}>
//               <td style={{ fontSize: "14px" }}>{mf.month}</td>
//               <td style={{ fontSize: "14px" }}>
//                 <NumberFormat
//                   value={mf.fees.tution}
//                   displayType={"text"}
//                   thousandSeparator={true}
//                 />
//               </td>
//               <td style={{ fontSize: "14px" }}>
//                 <NumberFormat
//                   value={mf.fees.maintenance}
//                   displayType={"text"}
//                   thousandSeparator={true}
//                 />
//               </td>
//               <td style={{ fontSize: "14px" }}>
//                 <NumberFormat
//                   value={mf.fees.transport}
//                   displayType={"text"}
//                   thousandSeparator={true}
//                 />
//               </td>
//               <td style={{ fontSize: "14px" }}>
//                 <NumberFormat
//                   value={mf.fees.exam}
//                   displayType={"text"}
//                   thousandSeparator={true}
//                 />
//               </td>
//               <td style={{ fontSize: "14px" }}>
//                 <NumberFormat
//                   value={mf.fees.admission}
//                   displayType={"text"}
//                   thousandSeparator={true}
//                 />
//               </td>
//               <td style={{ fontSize: "14px" }}>
//                 <NumberFormat
//                   value={mf.total}
//                   displayType={"text"}
//                   thousandSeparator={true}
//                 />
//               </td>
//             </tr>
//           ))}
//           {scholarship?.percentage > 0 && (
//             <tr>
//               <td style={{ fontSize: "14px" }} colSpan="6">
//                 SCHOLARSHIP {scholarship?.percentage}% (excluding admission)
//               </td>
//               <td style={{ fontSize: "14px" }}>
//                 <NumberFormat
//                   value={scholarship?.percentage
//                     ? -((scholarship.percentage / 100) *
//                       monthlyFees.reduce(
//                         (sum, mf) => sum + mf.total - mf.fees.admission,
//                         0
//                       ))
//                     : 0}
//                   displayType={"text"}
//                   thousandSeparator={true}
//                 />
//               </td>
//             </tr>
//           )}
//           <tr>
//             <td style={{ fontSize: "14px" }} colSpan="6">
//               TOTAL PAID
//             </td>
//             <td style={{ fontSize: "14px" }}>
//               <NumberFormat
//                 value={total}
//                 displayType={"text"}
//                 thousandSeparator={true}
//               />
//             </td>
//           </tr>
//           <tr>
//             <td style={{ fontSize: "14px" }} colSpan="6">
//               <strong>TOTAL BILL</strong>
//             </td>
//             <td style={{ fontSize: "14px" }}>
//               <strong>
//                 <NumberFormat
//                   value={totalBill}
//                   displayType={"text"}
//                   thousandSeparator={true}
//                 />
//               </strong>
//             </td>
//           </tr>
//           {calculatedTotalDiscount > 0 && (
//             <tr>
//               <td style={{ fontSize: "14px" }} colSpan="6">
//                 TOTAL DISCOUNT
//               </td>
//               <td style={{ fontSize: "14px" }}>
//                 <NumberFormat
//                   value={-calculatedTotalDiscount}
//                   displayType={"text"}
//                   thousandSeparator={true}
//                 />
//               </td>
//             </tr>
//           )}
//           <tr>
//             <td style={{ fontSize: "14px" }} colSpan="6">
//               <strong>BALANCE</strong>
//             </td>
//             <td style={{ fontSize: "14px" }}>
//               <strong>
//                 <NumberFormat
//                   value={balance}
//                   displayType={"text"}
//                   thousandSeparator={true}
//                 />
//               </strong>
//             </td>
//           </tr>
//         </tbody>
//       </table>

//       <Transactions
//         open={open}
//         setOpen={setOpen}
//         name={name}
//         totalBill={totalBill}
//         totalPaid={total}
//         balance={balance}
//         transactions={transactions}
//       />
//     </div>
//   );
// }

// export default ViewStudent;

// // import React, { useState } from "react";
// // import { Avatar } from "@material-ui/core";
// // import {
// //   getImgSrc,
// //   getCapitalize,
// //   getIntial,
// //   currentCurrency,
// // } from "../../../utils";
// // import NumberFormat from "react-number-format";
// // import Transactions from "./ViewStudentPayment";
// // import { Paper, Typography, Grid } from "@material-ui/core";

// // function ViewStudent({
// //   id,
// //   transactions,
// //   user,
// //   feetype,
// //   total,
// //   totalBill,
// //   balance,
// //   scholarship,
// //   scholarshipAmount,
// //   payFullYear,
// // }) {
// //   const [open, setOpen] = useState(false);
// //   const name =
// //     getCapitalize(user?.name) +
// //     " " +
// //     getIntial(user?.middlename || " ") +
// //     getCapitalize(user?.surname);

// //   const getTotal = (tution, facility, maintenance, exam, admission) => {
// //     return (
// //       Number(tution || 0) +
// //       Number(facility || 0) +
// //       Number(maintenance || 0) +
// //       Number(exam || 0) +
// //       Number(admission || 0)
// //     );
// //   };

// //   const termBillForDisplay = Object.entries(feetype || {}).reduce(
// //     (t, [key, value]) => {
// //       if (
// //         ["tution", "facility", "maintenance", "exam", "admission"].includes(key)
// //       ) {
// //         return Number(t) + Number(value);
// //       }
// //       return Number(t);
// //     },
// //     0
// //   );

// //   return (
// //     <div className="content__container" style={{ background: "#EEF7FF" }}>
// //       <div
// //         style={{ background: "#4fb1ff" }}
// //         className="d-flex flex-column align-items-center p-3 text-light mb-4"
// //       >
// //         <Avatar
// //           src={getImgSrc(user?.profileUrl)}
// //           style={{ width: "100px", height: "100px" }}
// //         />
// //         <h3>{name} </h3>
// //         <h5>{id}</h5>
// //         <h6>
// //           {user?.status === "day"
// //             ? `No Bus Service - ${
// //                 user?.fees ? user.fees.toUpperCase() : "Fees Not Set"
// //               }`
// //             : `Bus Service - ${
// //                 user?.fees ? user.fees.toUpperCase() : "Fees Not Set"
// //               }`}
// //         </h6>

// //         <button onClick={() => setOpen(true)} className="btn red__btn">
// //           View Transactions
// //         </button>
// //       </div>

// //       <hr />
// //       {/* <Paper elevation={2} style={{ padding: '1rem', marginBottom: '1.5rem', background: 'white' }}>
// //         <Typography variant="h6" align="center" gutterBottom style={{ marginBottom: '1rem' }}>
// //           Financial Summary ({payFullYear ? "Full Year" : "Term"})
// //         </Typography>
// //         {/* Align grid items centrally
// //         <Grid container spacing={2} justifyContent="center" alignItems="center">
// //           {/* Center text within each grid item
// //           <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
// //             <Typography variant="body1" className="text-primary">
// //               Term Bill:{" "}
// //               <NumberFormat
// //                 value={termBillForDisplay}
// //                 displayType={"text"}
// //                 thousandSeparator={true}
// //                 prefix={currentCurrency()}
// //               />
// //             </Typography>
// //           </Grid>
// //           {payFullYear && (
// //             <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
// //               <Typography variant="body1" className="text-info">
// //                 Full Year Est. Bill:{" "}
// //                 <NumberFormat
// //                   value={totalBill}
// //                   displayType={"text"}
// //                   thousandSeparator={true}
// //                   prefix={currentCurrency()}
// //                 />
// //               </Typography>
// //             </Grid>
// //           )}
// //           {scholarshipAmount > 0 && (
// //             <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
// //               <Typography variant="body1" className="text-success">
// //                 Scholarship ({scholarship?.percentage}%):{" "}
// //                 <NumberFormat
// //                   value={scholarshipAmount}
// //                   displayType={"text"}
// //                   thousandSeparator={true}
// //                   prefix={`-${currentCurrency()}`}
// //                 />
// //               </Typography>
// //             </Grid>
// //           )}
// //           <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
// //             <Typography variant="body1" className="text-warning">
// //               Total Paid:{" "}
// //               <NumberFormat
// //                 value={total}
// //                 displayType={"text"}
// //                 thousandSeparator={true}
// //                 prefix={currentCurrency()}
// //               />
// //             </Typography>
// //           </Grid>
// //           <Grid item xs={12} style={{ textAlign: 'center', marginTop: '0.5rem' }}>
// //             <Typography variant="h6" className="text-danger">
// //               Balance Due:{" "}
// //               <NumberFormat
// //                 value={balance}
// //                 displayType={"text"}
// //                 thousandSeparator={true}
// //                 prefix={currentCurrency()}
// //               />
// //             </Typography>
// //           </Grid>
// //         </Grid>
// //       </Paper> */}

// //       {/* {payFullYear && (
// //         <Typography variant="caption" display="block" align="center" color="textSecondary" gutterBottom>
// //           Fee breakdown below is per term.
// //         </Typography>
// //       )}
// //       <table className="table table-bordered" style={{ background: "white" }}>
// //         <thead>
// //           <tr>
// //             <th scope="col" style={{ fontSize: "14px" }}>Fees</th>
// //             <th scope="col" style={{ fontSize: "14px" }}>Amount {currentCurrency()}</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           <tr>
// //             <td style={{ fontSize: "14px" }}>Tution Fee</td>
// //             <td style={{ fontSize: "14px" }}>
// //               <strong style={{ marginLeft: "8px" }}>
// //                 <NumberFormat
// //                   value={" " + " " + " " + feetype?.tution}
// //                   displayType={"text"}
// //                   thousandSeparator={true}
// //                 />
// //               </strong>
// //             </td>
// //           </tr>
// //           <tr>
// //             <td style={{ fontSize: "14px" }}>Maintenance Fee</td>
// //             <td style={{ fontSize: "14px" }}>
// //               <strong style={{ marginLeft: "8px" }}>
// //                 <NumberFormat
// //                   value={" " + " " + " " + feetype?.maintenance}
// //                   displayType={"text"}
// //                   thousandSeparator={true}
// //                 />
// //               </strong>
// //             </td>
// //           </tr>
// //           <tr>
// //             <td style={{ fontSize: "14px" }}>Admission Fee</td>
// //             <td style={{ fontSize: "14px" }}>
// //               <strong style={{ marginLeft: "8px" }}>
// //                 <NumberFormat
// //                   value={" " + " " + " " + feetype?.admission}
// //                   displayType={"text"}
// //                   thousandSeparator={true}
// //                 />
// //               </strong>
// //             </td>
// //           </tr>
// //           <tr>
// //             <td style={{ fontSize: "14px" }}>Transport Fee</td>
// //             <td style={{ fontSize: "14px" }}>
// //               <strong style={{ marginLeft: "8px" }}>
// //                 <NumberFormat
// //                   value={" " + " " + " " + feetype?.facility}
// //                   displayType={"text"}
// //                   thousandSeparator={true}
// //                 />
// //               </strong>
// //             </td>
// //           </tr>
// //           <tr>
// //             <td style={{ fontSize: "14px" }}> Exams Fee</td>
// //             <td style={{ fontSize: "14px" }}>
// //               <strong style={{ marginLeft: "8px" }}>
// //                 <NumberFormat
// //                   value={" " + " " + " " + feetype?.exam}
// //                   displayType={"text"}
// //                   thousandSeparator={true}
// //                 />
// //               </strong>
// //             </td>
// //           </tr>
// //           <tr>
// //             <td style={{ fontSize: "14px" }}>TOTAL BILL</td>
// //             <td style={{ fontSize: "14px" }}>
// //               <strong style={{ marginLeft: "8px" }}>
// //                 <NumberFormat
// //                   value={" " + " " + " " + totalBill}
// //                   displayType={"text"}
// //                   thousandSeparator={true}
// //                 />
// //               </strong>
// //             </td>
// //           </tr>
// //           {scholarship?.percentage > 0 && (
// //             <tr>
// //               <td style={{ fontSize: "14px" }}>
// //                 SCHOLARSHIP {scholarship?.percentage}%
// //               </td>
// //               <td style={{ fontSize: "14px" }}>
// //                 <NumberFormat
// //                   value={"-" + (Number(scholarship?.percentage) / 100) * totalBill}
// //                   displayType={"text"}
// //                   thousandSeparator={true}
// //                 />
// //               </td>
// //             </tr>
// //           )}
// //           <tr>
// //             <td style={{ fontSize: "14px" }}>TOTAL PAID</td>
// //             <td style={{ fontSize: "14px" }}>
// //               <NumberFormat
// //                 value={"-" + total}
// //                 displayType={"text"}
// //                 thousandSeparator={true}
// //               />
// //             </td>
// //           </tr>
// //           <tr>
// //             <td style={{ fontSize: "14px" }}>
// //               <strong>BALANCE</strong>
// //             </td>
// //             <td style={{ fontSize: "14px" }}>
// //               <strong style={{ marginLeft: "8px" }}>
// //                 <NumberFormat
// //                   value={"&nbsp;&nbsp;" + balance}
// //                   displayType={"text"}
// //                   thousandSeparator={true}
// //                 />
// //               </strong>
// //             </td>
// //           </tr>
// //         </tbody>
// //       </table> */}

// //       {/*  <h4 className="text-center my-4">
// //         Payment History ({payFullYear ? "Full Year" : "Term"})
// //       </h4> */}
// //       <Transactions
// //         open={open}
// //         setOpen={setOpen}
// //         name={name}
// //         totalBill={totalBill}
// //         totalPaid={total}
// //         balance={balance}
// //         transactions={transactions}
// //       />
// //     </div>
// //   );
// // }

// // export default ViewStudent;
