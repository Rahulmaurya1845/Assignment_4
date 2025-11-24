// import React, { useState, useEffect } from "react";
// import ListTable from "../../shared/ListTable";
// import axios from "../../../store/axios";
// import { getTrimString } from "../../../utils";
// import { useSelector } from "react-redux";
// import { selectUser } from "../../../store/slices/userSlice";
// import { selectYearGroup } from "../../../store/slices/schoolSlice";
// import moment from "moment";
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// import PaymentSummaryBox from "./PaymentSummaryBox";

// // pdfMake.vfs = pdfFonts.pdfMake.vfs;

// let thismonth = moment().month();
// let thisyear = moment().year();

// const tableHeader = [
//   { id: "date", name: "Txn. Date", date: true },
//   { id: "userID", name: "Student ID" },
//   { id: "name", name: "Name" },
//   { id: "guardian", name: "Guardian" },
//   { id: "class", name: "Class" },
//   { id: "academicYear", name: "Academic Year" },
//   { id: "term", name: "Month" },
//   { id: "paymentMethod", name: "Payment Mode" },
//   { id: "amount", name: "Amount(₹)" },
// ];

// function ViewPayment() {
//   const [expenditures, setExpenditures] = useState([]);
//   const [storeData, setStoreData] = useState([]);
//   const [studentDetails, setStudentDetails] = useState({});
//   const [classList, setClassList] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [year, setYear] = useState("");
//   const [term, setTerm] = useState("");
//   const [loading, setLoading] = useState(false);
//   const years = useSelector(selectYearGroup);
//   const user = useSelector(selectUser);

//   const [paymentStats, setPaymentStats] = useState({
//     total: 0, cash: 0, bankDeposit: 0, cheque: 0, others: 0, totalAmount: 0,
//   });

//   useEffect(() => {
//     axios.get("/transactions/students/fees").then((res) => {
//       let data = res.data.slice().reverse().map((e) => ({
//         ...e,
//         description: e.description ? getTrimString(e.description, 50) : "",
//       }));

//       setStoreData(data);
//       fetchStudentDetails(data);
//     });

//     axios.get("/classes").then((res) => {
//       setClassList(res.data);
//     });
//   }, []);

//   const fetchStudentDetails = async (data) => {
//     let userIds = [...new Set(data.map((item) => item.userID))];
//     let detailsMap = {};
//     await Promise.all(
//       userIds.map(async (userID) => {
//         if (userID) {
//           try {
//             let res = await axios.get(`/students/student/${userID}`);
//             if (res.data?.student) {
//               detailsMap[userID] = {
//                 name: `${res.data.student.name} ${res.data.student.surname}`,
//                 guardian: `${res.data.student.guadian?.[0]?.name || "N/A"} ${res.data.student.guadian?.[0]?.lastname || ""}`.trim(),
//                 class: res.data.student.classID.toUpperCase() || "N/A",
//               };
//             }
//           } catch (error) {
//             console.error("Error fetching student details:", error);
//           }
//         }
//       })
//     );

//     setStudentDetails(detailsMap);

//     const updatedData = data.map((item) => ({
//       ...item,
//       name: detailsMap[item.userID]?.name || "N/A",
//       guardian: detailsMap[item.userID]?.guardian || "N/A",
//       class: detailsMap[item.userID]?.class || "N/A",
//     }));

//     setStoreData(updatedData);
//     setExpenditures(updatedData);
//   };

//   const calculateTotalBill = (data) => {
//     return data.reduce((sum, item) => sum + Number(item.amount || 0), 0);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     let filteredData = storeData;

//     if (year) {
//       filteredData = filteredData.filter((i) =>
//         i.academicYear?.toLowerCase() === year.toLowerCase()
//       );
//     }

//     if (term) {
//       filteredData = filteredData.filter((i) =>
//         i.term?.toLowerCase() === term.toLowerCase()
//       );
//     }


//     if (selectedClass) {
//       filteredData = filteredData.filter((i) => {
//         return i.class?.toLowerCase() === selectedClass.toLowerCase();
//       });
//     }

//     setExpenditures(filteredData);
//     setLoading(false);
//   };

//   const handleReset = () => {
//     setYear("");
//     setTerm("");
//     setSelectedClass("");
//     setExpenditures(storeData);
//   };

//   const totalBill = calculateTotalBill(expenditures);

//   useEffect(() => {
//     if (!expenditures || expenditures.length === 0) {
//       setPaymentStats({
//         total: 0, cash: 0, bankDeposit: 0, cheque: 0, others: 0, totalAmount: 0,
//       });
//       return;
//     }

//     const incomeData = expenditures.filter(item => item.type === "income");
//     let stats = { total: incomeData.length, cash: 0, bankDeposit: 0, cheque: 0, others: 0, totalAmount: 0 };

//     incomeData.forEach(item => {
//       const method = item.paymentMethod?.toLowerCase();
//       const amount = parseFloat(item.amount) || 0;
//       stats.totalAmount += amount;
//       if (method === "cash") stats.cash += 1;
//       else if (["bank-deposit", "bank"].includes(method)) stats.bankDeposit += 1;
//       else if (method === "cheque") stats.cheque += 1;
//       else stats.others += 1;
//     });

//     setPaymentStats(stats);
//   }, [expenditures]);

// const handleDownloadAll = () => {
//   const docDefinition = {
//     pageOrientation: "landscape",
//     content: [
//       {
//         text: "Fee Payments Report",
//         style: "header",
//         alignment: "center",
//         margin: [0, 0, 0, 20],
//       },
//       {
//         table: {
//           headerRows: 1,
//           widths: tableHeader.map((h) => {
//             if (h.id === "amount") return 60;
//             if (h.id === "date" || h.id === "userID" || h.id === "term") return 60;
//             if (h.id === "class" || h.id === "academicYear") return 50;
//             return "*";
//           }),
//           body: [
//             tableHeader.map((h) => ({
//               text: h.name,
//               style: "tableHeader",
//               minHeight: 40,
//             })),
//             ...expenditures.map((item, idx) =>
//               [
//                 item.date ? moment(item.date).format("DD-MM-YYYY") : "N/A",
//                 item.userID || "N/A",
//                 item.name || "N/A",
//                 item.guardian || "N/A",
//                 item.class || "N/A",
//                 item.academicYear || "N/A",
//                 item.term || "N/A",
//                 item.paymentMethod || "N/A",
//                 `${item.amount}`,
//               ].map((cell) => ({
//                 text: cell,
//                 style: idx % 2 === 0 ? "box1" : "box2",
//               }))
//             ),
//           ],
//         },
//         layout: {
//           hLineColor: () => "#CECECE",
//           vLineColor: () => "#CECECE",
//           hLineWidth: () => 0.2,
//           vLineWidth: () => 0.2,
//         },
//       },
//       {
//         text: `Total Amount: ₹${totalBill.toLocaleString()}`,
//         style: "subTotal",
//         alignment: "right",
//         margin: [0, 20, 0, 0],
//       },
//     ],
//     styles: {
//       header: { fontSize: 18, bold: true },
//       tableHeader: {
//         fillColor: "#4fb1f6",
//         color: "#ffffff",
//         bold: true,
//         alignment: "center",
//         margin: [8, 8, 8, 8],
//       },
//       box1: {
//         fillColor: "#ffffff",
//         color: "#000000",
//         alignment: "center",
//         margin: [8, 8, 8, 8],
//       },
//       box2: {
//         fillColor: "#CECECE",
//         color: "#000000",
//         alignment: "center",
//         margin: [8, 8, 8, 8],
//       },
//       subTotal: {
//         fontSize: 14,
//         bold: true,
//       },
//     },
//     defaultStyle: {
//       fontSize: 12,
//       alignment: "center",
//       margin: [8, 8, 8, 8],
//     },
//   };

//   pdfMake.createPdf(docDefinition).download("fee-payments.pdf");
// };



//   return (
//     <div>
//       <h3>Fee Payment Reports</h3>
//       <form className="content__container row">
//         <div className="col-sm-4">
//           <label htmlFor="year" className="col-form-label">Year</label>
//           <select name="year" className="form-select" value={year} onChange={(e) => setYear(e.target.value)}>
//             <option defaultValue hidden>Choose...</option>
//             {years.map((y) => (
//               <option value={y.year} key={y._id}>{y.year}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col-sm-4">
//           <label htmlFor="month" className="col-form-label">Month</label>
//           <select name="month" className="form-select" value={term} onChange={(e) => setTerm(e.target.value)}>
//             <option defaultValue hidden>Choose...</option>
//             {["January", "February", "March", "April", "May", "June", "July",
//               "August", "September", "October", "November", "December"]
//               .map((m) => <option value={m.toLowerCase()} key={m}>{m}</option>)}
//           </select>
//         </div>
//         <div className="col-sm-4">
//           <label htmlFor="class" className="col-form-label">Class</label>
//           <select name="class" className="form-select" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
//             <option defaultValue hidden>Choose...</option>
//             {classList.slice().reverse().map((cls) => (
//               <option value={cls.classCode} key={cls._id}>{cls.name}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col-sm-12 mt-3 d-flex">
//           <button onClick={handleSearch} disabled={loading} type="submit" className="btn blue__btn mr-2">
//             {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
//             Search
//           </button>
//           <button type="button" className="btn red__btn" onClick={handleReset}>
//             Reset
//           </button>
//         </div>
//       </form>

//       <div className="mt-5" id="section-to-print">
//         <div className="text-center mb-3">
//           <h5>FEE PAYMENTS RECEIVED</h5>
//           <div style={{ color: "red", fontWeight: "bold" }}>
//             Total Amount: ₹{totalBill.toLocaleString()}
//           </div>
//         </div>
//         <ListTable data={expenditures} noActions={true} tableHeader={tableHeader} />
//       </div>

//       {paymentStats.total > 0 && (
//         <PaymentSummaryBox title="Bill Payments Summary" data={paymentStats} />
//       )}

//       {expenditures.length > 0 && (
//         <div className="text-center my-5">
//           <button className="btn green__btn" onClick={handleDownloadAll}>
//             Download All
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ViewPayment;
import React, { useState, useEffect } from "react";
import ListTable from "../../shared/ListTable";
import axios from "../../../store/axios";
import { getTrimString } from "../../../utils";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import { selectYearGroup } from "../../../store/slices/schoolSlice";
// import moment from "moment";
import PaymentSummaryBox from "./PaymentSummaryBox";
import GenericPdfDownloadButton from "./GenericPdfDownloadButton";
// import GenericPdfDownloadButton from "../../shared/GenericPdfDownloadButton";

// let thismonth = moment().month();
// let thisyear = moment().year();

const tableHeader = [
  { id: "date", name: "Txn. Date", date: true },
  { id: "userID", name: "Student ID" },
  { id: "name", name: "Name" },
  { id: "guardian", name: "Guardian" },
  { id: "class", name: "Class" },
  { id: "academicYear", name: "Academic Year" },
  { id: "term", name: "Month" },
  { id: "paymentMethod", name: "Payment Mode" },
  { id: "amount", name: "Amount(₹)" },
];

function ViewPayment() {
  const [expenditures, setExpenditures] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [studentDetails, setStudentDetails] = useState({});
  const [classList, setClassList] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [year, setYear] = useState("");
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const years = useSelector(selectYearGroup);
  const user = useSelector(selectUser);

  const [paymentStats, setPaymentStats] = useState({
    total: 0, cash: 0, bankDeposit: 0, cheque: 0, others: 0, totalAmount: 0,
  });

  useEffect(() => {
    axios.get("/transactions/students/fees").then((res) => {
      let data = res.data.slice().reverse().map((e) => ({
        ...e,
        description: e.description ? getTrimString(e.description, 50) : "",
      }));

      setStoreData(data);
      fetchStudentDetails(data);
    });

    axios.get("/classes").then((res) => {
      setClassList(res.data);
    });
  }, []);

  const fetchStudentDetails = async (data) => {
    let userIds = [...new Set(data.map((item) => item.userID))];
    let detailsMap = {};
    await Promise.all(
      userIds.map(async (userID) => {
        if (userID) {
          try {
            let res = await axios.get(`/students/student/${userID}`);
            if (res.data?.student) {
              detailsMap[userID] = {
                name: `${res.data.student.name} ${res.data.student.surname}`,
                guardian: `${res.data.student.guadian?.[0]?.name || "N/A"} ${res.data.student.guadian?.[0]?.lastname || ""}`.trim(),
                class: res.data.student.classID.toUpperCase() || "N/A",
              };
            }
          } catch (error) {
            console.error("Error fetching student details:", error);
          }
        }
      })
    );

    setStudentDetails(detailsMap);

    const updatedData = data.map((item) => ({
      ...item,
      name: detailsMap[item.userID]?.name || "N/A",
      guardian: detailsMap[item.userID]?.guardian || "N/A",
      class: detailsMap[item.userID]?.class || "N/A",
    }));

    setStoreData(updatedData);
    setExpenditures(updatedData);
  };

  const calculateTotalBill = (data) => {
    return data.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);

    let filteredData = storeData;

    if (year) {
      filteredData = filteredData.filter((i) =>
        i.academicYear?.toLowerCase() === year.toLowerCase()
      );
    }

    if (term) {
      filteredData = filteredData.filter((i) =>
        i.term?.toLowerCase() === term.toLowerCase()
      );
    }

    if (selectedClass) {
      filteredData = filteredData.filter((i) => {
        return i.class?.toLowerCase() === selectedClass.toLowerCase();
      });
    }

    setExpenditures(filteredData);
    setLoading(false);
  };

  const handleReset = () => {
    setYear("");
    setTerm("");
    setSelectedClass("");
    setExpenditures(storeData);
  };

  const totalBill = calculateTotalBill(expenditures);

  useEffect(() => {
    if (!expenditures || expenditures.length === 0) {
      setPaymentStats({
        total: 0, cash: 0, bankDeposit: 0, cheque: 0, others: 0, totalAmount: 0,
      });
      return;
    }

    const incomeData = expenditures.filter(item => item.type === "income");
    let stats = { total: incomeData.length, cash: 0, bankDeposit: 0, cheque: 0, others: 0, totalAmount: 0 };

    incomeData.forEach(item => {
      const method = item.paymentMethod?.toLowerCase();
      const amount = parseFloat(item.amount) || 0;
      stats.totalAmount += amount;
      if (method === "cash") stats.cash += 1;
      else if (["bank-deposit", "bank"].includes(method)) stats.bankDeposit += 1;
      else if (method === "cheque") stats.cheque += 1;
      else stats.others += 1;
    });

    setPaymentStats(stats);
  }, [expenditures]);

  // const handleDownloadAll = () => {
  //   // COMMENTED OUT — replaced by GenericPdfDownloadButton
  // };

  return (
    <div>
      <h3>Fee Payment Reports</h3>
      <form className="content__container row">
        <div className="col-sm-4">
          <label htmlFor="year" className="col-form-label">Year</label>
          <select name="year" className="form-select" value={year} onChange={(e) => setYear(e.target.value)}>
            <option defaultValue hidden>Choose...</option>
            {years.map((y) => (
              <option value={y.year} key={y._id}>{y.year}</option>
            ))}
          </select>
        </div>
        <div className="col-sm-4">
          <label htmlFor="month" className="col-form-label">Month</label>
          <select name="month" className="form-select" value={term} onChange={(e) => setTerm(e.target.value)}>
            <option defaultValue hidden>Choose...</option>
            {["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"]
              .map((m) => <option value={m.toLowerCase()} key={m}>{m}</option>)}
          </select>
        </div>
        <div className="col-sm-4">
          <label htmlFor="class" className="col-form-label">Class</label>
          <select name="class" className="form-select" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            <option defaultValue hidden>Choose...</option>
            {classList.slice().reverse().map((cls) => (
              <option value={cls.classCode} key={cls._id}>{cls.name}</option>
            ))}
          </select>
        </div>
        <div className="col-sm-12 mt-3 d-flex">
          <button onClick={handleSearch} disabled={loading} type="submit" className="btn blue__btn mr-2">
            {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
            Search
          </button>
          <button type="button" className="btn red__btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      <div className="mt-5" id="section-to-print">
        <div className="text-center mb-3">
          <h5>FEE PAYMENTS RECEIVED</h5>
          <div style={{ color: "red", fontWeight: "bold" }}>
            Total Amount: ₹{totalBill.toLocaleString()}
          </div>
        </div>
        <ListTable data={expenditures} noActions={true} tableHeader={tableHeader} />
      </div>

      {paymentStats.total > 0 && (
        <PaymentSummaryBox title="Bill Payments Summary" data={paymentStats} />
      )}

      {expenditures.length > 0 && (
        <div className="text-center my-5">
          <GenericPdfDownloadButton
            title="Fee Payments Report"
            tableHeader={tableHeader}
            rowData={expenditures}
            totalLabel="Total Amount"
            totalValue={totalBill}
            buttonLabel="Download All"
            className="btn green__btn"
          />
        </div>
      )}
    </div>
  );
}

export default ViewPayment;
