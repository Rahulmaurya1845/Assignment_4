// // import React, { useState, useEffect } from "react";
// // import ListTable from "../../../AdminComponents/shared/ListTable03";
// // import axios from "../../../store/axios";
// // import { getTrimString } from "../../../utils";
// // import { useSelector } from "react-redux";
// // import { selectUser } from "../../../store/slices/userSlice";
// // import moment from "moment";
// // import PaymentSummaryBox from "./PaymentSummaryBox";
// // import GenericPdfDownloadButton from "./GenericPdfDownloadButton"; // ✅ Path may need adjustment

// // const getPaymentType = (item) => {
// //   if (typeof item.pay === "string") return item.pay.toLowerCase();
// //   if (item.paymentMethod) return item.paymentMethod.toLowerCase();
// //   if (item.pay?.cheque) return "cheque";
// //   if (item.pay?.cash) return "cash";
// //   if (item.pay?.bank) return "bank deposit";
// //   return "other";
// // };

// // const tableHeader = [
// //   { id: "date", name: "Date", date: true },
// //   { id: "category", name: "Category" },
// //   { id: "description", name: "Expense Detail" },
// //   { id: "amount", name: "Amount" },
// //   { id: "pay", name: "Payment Type" },
// // ];

// // const thismonth = moment().month();
// // const thisyear = moment().year();
// // const firstday = moment(`${thisyear}-${thismonth + 1}-01`).format("YYYY-MM-DD");

// // function ViewPayment() {
// //   const [expenditures, setexpenditures] = useState([]);
// //   const [type, settype] = useState("");
// //   const [from, setfrom] = useState(firstday);
// //   const [to, setto] = useState(moment().format("YYYY-MM-DD"));
// //   const [loading, setloading] = useState(false);
// //   const [storeData, setstoreData] = useState([]);
// //   const user = useSelector(selectUser);
// //   const [selectedto, setselectedto] = useState(moment().format("YYYY-MM-DD"));
// //   const [selectedfrom, setselectedfrom] = useState(firstday);

// //   const [summaryData, setSummaryData] = useState({
// //     total: 0,
// //     cash: 0,
// //     bankDeposit: 0,
// //     cheque: 0,
// //     others: 0,
// //     totalAmount: 0,
// //   });

// //   useEffect(() => {
// //     axios.get("/transactions").then((res) => {
// //       let results = res.data.filter((i) => i.type === "expenditure");
// //       let data = results.map((e) => ({
// //         ...e,
// //         description: getTrimString(e.description, 50),
// //         pay: getPaymentType(e),
// //         date: moment(e.date).format("DD-MM-YYYY"),
// //       }));
// //       setexpenditures(data);
// //       setstoreData(data);
// //     }).catch(console.log);
// //   }, []);

// //   const handleSearch = (e) => {
// //     e.preventDefault();
// //     setloading(true);

// //     let newData = storeData.filter((i) =>
// //       moment(i.date, "DD-MM-YYYY").isBetween(
// //         moment(from),
// //         moment(to),
// //         null,
// //         "[]"
// //       )
// //     );

// //     if (type) {
// //       newData = newData.filter((i) => getPaymentType(i) === type.toLowerCase());
// //     }

// //     setselectedfrom(from);
// //     setselectedto(to);
// //     setexpenditures(newData);
// //     setloading(false);
// //   };

// //   const handleReset = (e) => {
// //     e.preventDefault();
// //     settype("");
// //     setfrom(firstday);
// //     setto(moment().format("YYYY-MM-DD"));
// //     setselectedfrom(firstday);
// //     setselectedto(moment().format("YYYY-MM-DD"));
// //     setexpenditures(storeData);
// //   };

// //   const totalExpense = expenditures.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

// //   useEffect(() => {
// //     if (!expenditures || expenditures.length === 0) {
// //       setSummaryData({
// //         total: 0,
// //         cash: 0,
// //         bankDeposit: 0,
// //         cheque: 0,
// //         others: 0,
// //         totalAmount: 0,
// //       });
// //       return;
// //     }

// //     let stats = {
// //       total: expenditures.length,
// //       cash: 0,
// //       bankDeposit: 0,
// //       cheque: 0,
// //       others: 0,
// //       totalAmount: 0,
// //     };

// //     expenditures.forEach((item) => {
// //       const method = getPaymentType(item);
// //       const amount = parseFloat(item.amount) || 0;
// //       stats.totalAmount += amount;

// //       if (method === "cash") stats.cash += 1;
// //       else if (["bank deposit", "bank"].includes(method)) stats.bankDeposit += 1;
// //       else if (method === "cheque") stats.cheque += 1;
// //       else stats.others += 1;
// //     });

// //     setSummaryData(stats);
// //   }, [expenditures]);

// //   return (
// //     <div>
// //       <h3 className="ml-3">Expenditure Report</h3>
// //       <form className="content__container row">
// //         <div className="col-sm-6 col-md-3 mb-3">
// //           <label className="col-form-label">Payment Type</label>
// //           <select className="form-select" value={type} onChange={(e) => settype(e.target.value)}>
// //             <option defaultValue hidden>Choose...</option>
// //             <option value="Cash">Cash</option>
// //             <option value="Bank deposit">Bank Deposit</option>
// //             <option value="Cheque">Cheque</option>
// //             <option value="Other">Other</option>
// //           </select>
// //         </div>

// //         <div className="col-sm-6 col-md-3 mb-3">
// //           <label className="col-form-label">From</label>
// //           <input value={from} onChange={(e) => setfrom(e.target.value)} type="date" className="form-control" />
// //         </div>

// //         <div className="col-sm-6 col-md-3 mb-3">
// //           <label className="col-form-label">To</label>
// //           <input value={to} onChange={(e) => setto(e.target.value)} type="date" className="form-control" />
// //         </div>

// //         <div className="col-sm-6 col-md-3 mb-0 mt-4">
// //           <button onClick={handleSearch} disabled={loading} type="submit" className="btn blue__btn">
// //             Search
// //           </button>
// //           <button onClick={handleReset} type="submit" className="btn red__btn mx-2">
// //             Reset
// //           </button>
// //         </div>
// //       </form>

// //       <div className="mt-0 content__container" id="section-to-print">
// //         <div className="text-center mb-2">
// //           <h5>EXPENDITURE REPORT</h5>
// //           <div>
// //             From {moment(selectedfrom).format("DD MMMM YYYY")} - To{" "}
// //             {moment(selectedto).format("DD MMMM YYYY")}
// //           </div>
// //           <div style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>
// //             Total Expense: ₹{totalExpense.toLocaleString()}
// //           </div>
// //         </div>

// //         <ListTable data={expenditures} noActions={true} tableHeader={tableHeader} />
// //       </div>

// //       <PaymentSummaryBox title="Expenditure Summary" data={summaryData} />

// //       {expenditures.length > 0 && (
// //         <div className="text-center my-4">
// //           <GenericPdfDownloadButton
// //             title="Expenditure Report"
// //             tableHeader={tableHeader}
// //             rowData={expenditures}
// //             totalLabel="Total Expense"
// //             totalValue={totalExpense}
// //             fromDate={selectedfrom}
// //             toDate={selectedto}
// //           />
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default ViewPayment;



// import React, { useState, useEffect } from "react";
// import ListTable from "../../../AdminComponents/shared/ListTable03";
// import axios from "../../../store/axios";
// import { getTrimString } from "../../../utils";
// import { useSelector } from "react-redux";
// import { selectUser } from "../../../store/slices/userSlice";
// import moment from "moment";
// import PaymentSummaryBox from "./PaymentSummaryBox";
// import GenericPdfDownloadButton from "./GenericPdfDownloadButton"; // ✅ Path may need adjustment

// const getPaymentType = (item) => {
//   if (typeof item.pay === "string") return item.pay.toLowerCase();
//   if (item.paymentMethod) return item.paymentMethod.toLowerCase();
//   if (item.pay?.cheque) return "cheque";
//   if (item.pay?.cash) return "cash";
//   if (item.pay?.bank) return "bank deposit";
//   return "other";
// };

// const tableHeader = [
//   { id: "date", name: "Date", date: true },
//   { id: "category", name: "Category" },
//   { id: "description", name: "Expense Detail" },
//   { id: "amount", name: "Amount" },
//   { id: "pay", name: "Payment Type" },
// ];

// const thismonth = moment().month();
// const thisyear = moment().year();
// const firstday = moment(`${thisyear}-${thismonth + 1}-01`).format("YYYY-MM-DD");

// function ViewPayment() {
//   const [expenditures, setexpenditures] = useState([]);
//   const [type, settype] = useState("");
//   const [from, setfrom] = useState(firstday);
//   const [to, setto] = useState(moment().format("YYYY-MM-DD"));
//   const [loading, setloading] = useState(false);
//   const [storeData, setstoreData] = useState([]);
//   const user = useSelector(selectUser);
//   const [selectedto, setselectedto] = useState(moment().format("YYYY-MM-DD"));
//   const [selectedfrom, setselectedfrom] = useState(firstday);

//   const [summaryData, setSummaryData] = useState({
//     total: 0,
//     cash: 0,
//     bankDeposit: 0,
//     cheque: 0,
//     others: 0,
//     totalAmount: 0,
//   });

//   useEffect(() => {
//     axios.get("/transactions").then((res) => {
//       let results = res.data.filter((i) => i.type === "expenditure");
//       let data = results.map((e) => ({
//         ...e,
//         description: getTrimString(e.description, 50),
//         pay: getPaymentType(e),
//         date: moment(e.date).format("DD-MM-YYYY"),
//       }));
//       setexpenditures(data);
//       setstoreData(data);
//     }).catch(console.log);
//   }, []);

//   // const handleSearch = (e) => {
//   //   e.preventDefault();
//   //   setloading(true);


//   //   let newData = storeData.filter((i) =>
//   //     moment(i.date, "DD-MM-YYYY").isBetween(
//   //       moment(from),
//   //       moment(to),
//   //       null,
//   //       "[]"
//   //     )
//   //   );

//   //   if (type) {
//   //     newData = newData.filter((i) => getPaymentType(i) === type.toLowerCase());
//   //   }

//   //   setselectedfrom(from);
//   //   setselectedto(to);
//   //   setexpenditures(newData);
//   //   setloading(false);
//   // };
//   const handleSearch = (e) => {
//     e.preventDefault();
//     setloading(true);

//     let newData = [...storeData];

//     // Apply payment type filter if selected
//     if (type) {
//       newData = newData.filter((i) => getPaymentType(i) === type.toLowerCase());
//     }

//     // Apply date filter only if from/to are set and not empty
//     if (from && to) {
//       newData = newData.filter((i) =>
//         moment(i.date, "DD-MM-YYYY").isBetween(
//           moment(from),
//           moment(to),
//           null,
//           "[]"
//         )
//       );
//     }

//     setselectedfrom(from);
//     setselectedto(to);
//     setexpenditures(newData);
//     setloading(false);
//   };

//   const handleReset = (e) => {
//     e.preventDefault();
//     settype("");
//     setfrom(firstday);
//     setto(moment().format("YYYY-MM-DD"));
//     setselectedfrom(firstday);
//     setselectedto(moment().format("YYYY-MM-DD"));
//     setexpenditures(storeData);
//   };

//   const totalExpense = expenditures.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

//   useEffect(() => {
//     if (!expenditures || expenditures.length === 0) {
//       setSummaryData({
//         total: 0,
//         cash: 0,
//         bankDeposit: 0,
//         cheque: 0,
//         others: 0,
//         totalAmount: 0,
//       });
//       return;
//     }

//     let stats = {
//       total: expenditures.length,
//       cash: 0,
//       bankDeposit: 0,
//       cheque: 0,
//       others: 0,
//       totalAmount: 0,
//     };

//     expenditures.forEach((item) => {
//       const method = getPaymentType(item);
//       const amount = parseFloat(item.amount) || 0;
//       stats.totalAmount += amount;

//       if (method === "cash") stats.cash += 1;
//       else if (["bank deposit", "bank"].includes(method)) stats.bankDeposit += 1;
//       else if (method === "cheque") stats.cheque += 1;
//       else stats.others += 1;
//     });

//     setSummaryData(stats);
//   }, [expenditures]);

//   return (
//     <div>
//       <h3 className="ml-3">Expenditure Report</h3>
//       <form className="content__container row">
//         <div className="col-sm-6 col-md-3 mb-3">
//           <label className="col-form-label">Payment Type</label>
//           <select className="form-select" value={type} onChange={(e) => settype(e.target.value)}>
//             <option defaultValue hidden>Choose...</option>
//             <option value="Cash">Cash</option>
//             <option value="Bank deposit">Bank Deposit</option>
//             <option value="Cheque">Cheque</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>

//         <div className="col-sm-6 col-md-3 mb-3">
//           <label className="col-form-label">From</label>
//           <input value={from} onChange={(e) => setfrom(e.target.value)} type="date" className="form-control" />
//         </div>

//         <div className="col-sm-6 col-md-3 mb-3">
//           <label className="col-form-label">To</label>
//           <input value={to} onChange={(e) => setto(e.target.value)} type="date" className="form-control" />
//         </div>

//         <div className="col-sm-6 col-md-3 mb-0 mt-4">
//           <button onClick={handleSearch} disabled={loading} type="submit" className="btn blue__btn">
//             Search
//           </button>
//           <button onClick={handleReset} type="submit" className="btn red__btn mx-2">
//             Reset
//           </button>
//         </div>
//       </form>

//       <div className="mt-0 content__container" id="section-to-print">
//         <div className="text-center mb-2">
//           <h5>EXPENDITURE REPORT</h5>
//           <div>
//             From {moment(selectedfrom).format("DD MMMM YYYY")} - To{" "}
//             {moment(selectedto).format("DD MMMM YYYY")}
//           </div>
//           <div style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>
//             Total Expense: ₹{totalExpense.toLocaleString()}
//           </div>
//         </div>

//         <ListTable data={expenditures} noActions={true} tableHeader={tableHeader} />
//       </div>

//       <PaymentSummaryBox title="Expenditure Summary" data={summaryData} />

//       {expenditures.length > 0 && (
//         <div className="text-center my-4">
//           <GenericPdfDownloadButton
//             title="Expenditure Report"
//             tableHeader={tableHeader}
//             rowData={expenditures}
//             totalLabel="Total Expense"
//             totalValue={totalExpense}
//             fromDate={selectedfrom}
//             toDate={selectedto}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ViewPayment;


import React, { useState, useEffect } from "react";
import ListTable from "../../../AdminComponents/shared/ListTable03";
import axios from "../../../store/axios";
import { getTrimString } from "../../../utils";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import moment from "moment";
import PaymentSummaryBox from "./PaymentSummaryBox";
import GenericPdfDownloadButton from "./GenericPdfDownloadButton"; // ✅ Path may need adjustment

const getPaymentType = (item) => {
  if (typeof item.pay === "string") return item.pay.toLowerCase();
  if (item.paymentMethod) return item.paymentMethod.toLowerCase();
  if (item.pay?.cheque) return "cheque";
  if (item.pay?.cash) return "cash";
  if (item.pay?.bank) return "bank deposit";
  return "other";
};

const tableHeader = [
  { id: "date", name: "Date", date: true },
  { id: "category", name: "Category" },
  { id: "description", name: "Expense Detail" },
  { id: "amount", name: "Amount" },
  { id: "pay", name: "Payment Type" },
];

const thismonth = moment().month();
const thisyear = moment().year();
const firstday = moment(`${thisyear}-${thismonth + 1}-01`).format("YYYY-MM-DD");

function ViewPayment() {
  const [expenditures, setexpenditures] = useState([]);
  const [type, settype] = useState("");
  const [from, setfrom] = useState(firstday);
  const [to, setto] = useState(moment().format("YYYY-MM-DD"));
  const [loading, setloading] = useState(false);
  const [storeData, setstoreData] = useState([]);
  const user = useSelector(selectUser);
  const [selectedto, setselectedto] = useState(moment().format("YYYY-MM-DD"));
  const [selectedfrom, setselectedfrom] = useState(firstday);

  const [summaryData, setSummaryData] = useState({
    total: 0,
    cash: 0,
    bankDeposit: 0,
    cheque: 0,
    others: 0,
    totalAmount: 0,
  });

  useEffect(() => {
    axios.get("/transactions").then((res) => {
      let results = res.data.filter((i) => i.type === "expenditure");
      let data = results.map((e) => ({
        ...e,
        description: getTrimString(e.description, 50),
        pay: getPaymentType(e),
        date: moment(e.date).format("DD-MM-YYYY"),
      }));
      setexpenditures(data);
      setstoreData(data);
    }).catch(console.log);
  }, []);

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   setloading(true);


  //   let newData = storeData.filter((i) =>
  //     moment(i.date, "DD-MM-YYYY").isBetween(
  //       moment(from),
  //       moment(to),
  //       null,
  //       "[]"
  //     )
  //   );

  //   if (type) {
  //     newData = newData.filter((i) => getPaymentType(i) === type.toLowerCase());
  //   }

  //   setselectedfrom(from);
  //   setselectedto(to);
  //   setexpenditures(newData);
  //   setloading(false);
  // };
  const handleSearch = (e) => {
    e.preventDefault();
    setloading(true);

    let newData = [...storeData];

    // Apply payment type filter if selected
    if (type) {
      newData = newData.filter((i) => getPaymentType(i) === type.toLowerCase());
    }

    // Apply date filter only if from/to are set and not empty
    if (from && to) {
      newData = newData.filter((i) =>
        moment(i.date, "DD-MM-YYYY").isBetween(
          moment(from),
          moment(to),
          null,
          "[]"
        )
      );
    }

    setselectedfrom(from);
    setselectedto(to);
    setexpenditures(newData);
    setloading(false);
  };

  const handleReset = (e) => {
    e.preventDefault();
    settype("");
    setfrom(firstday);
    setto(moment().format("YYYY-MM-DD"));
    setselectedfrom(firstday);
    setselectedto(moment().format("YYYY-MM-DD"));
    setexpenditures(storeData);
  };

  const totalExpense = expenditures.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  useEffect(() => {
    if (!expenditures || expenditures.length === 0) {
      setSummaryData({
        total: 0,
        cash: 0,
        bankDeposit: 0,
        cheque: 0,
        others: 0,
        totalAmount: 0,
      });
      return;
    }

    let stats = {
      total: expenditures.length,
      cash: 0,
      bankDeposit: 0,
      cheque: 0,
      others: 0,
      totalAmount: 0,
    };

    expenditures.forEach((item) => {
      const method = getPaymentType(item);
      const amount = parseFloat(item.amount) || 0;
      stats.totalAmount += amount;

      if (method === "cash") stats.cash += 1;
      else if (["bank deposit", "bank"].includes(method)) stats.bankDeposit += 1;
      else if (method === "cheque") stats.cheque += 1;
      else stats.others += 1;
    });

    setSummaryData(stats);
  }, [expenditures]);

  return (
    <div>
      <h3 className="ml-3">Expenditure Report</h3>
      <form className="content__container row">
        <div className="col-sm-6 col-md-3 mb-3">
          <label className="col-form-label">Payment Type</label>
          <select className="form-select" value={type} onChange={(e) => settype(e.target.value)}>
            <option defaultValue hidden>Choose...</option>
            <option value="Cash">Cash</option>
            <option value="Bank deposit">Bank Deposit</option>
            <option value="Cheque">Cheque</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="col-sm-6 col-md-3 mb-3">
          <label className="col-form-label">From</label>
          <input value={from} onChange={(e) => setfrom(e.target.value)} type="date" className="form-control" />
        </div>

        <div className="col-sm-6 col-md-3 mb-3">
          <label className="col-form-label">To</label>
          <input value={to} onChange={(e) => setto(e.target.value)} type="date" className="form-control" />
        </div>

        <div className="col-sm-6 col-md-3 mb-0 mt-4">
          <button onClick={handleSearch} disabled={loading} type="submit" className="btn blue__btn">
            Search
          </button>
          <button onClick={handleReset} type="submit" className="btn red__btn mx-2">
            Reset
          </button>
        </div>
      </form>

      <div className="mt-0 content__container" id="section-to-print">
        <div className="text-center mb-2">
          <h5>EXPENDITURE REPORT</h5>
          <div>
            From {moment(selectedfrom).format("DD MMMM YYYY")} - To{" "}
            {moment(selectedto).format("DD MMMM YYYY")}
          </div>
          <div style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>
            Total Expense: ₹{totalExpense.toLocaleString()}
          </div>
        </div>

        <ListTable data={expenditures} noActions={true} tableHeader={tableHeader} />
      </div>

      <PaymentSummaryBox title="Expenditure Summary" data={summaryData} />

      {expenditures.length > 0 && (
        <div className="text-center my-4">
          <GenericPdfDownloadButton
            title="Expenditure Report"
            tableHeader={tableHeader}
            rowData={expenditures}
            totalLabel="Total Expense"
            totalValue={totalExpense}
            fromDate={selectedfrom}
            toDate={selectedto}
          />
        </div>
      )}
    </div>
  );
}

export default ViewPayment;