import React, { useState, useEffect } from "react";
import axios from "../../../store/axios";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";
import { errorAlert, currentCurrency } from "../../../utils";
import "./PaymentReceipt.css";

function PaymentReceipt() {
  const [state, setState] = useState({});
  const [transaction, setTransaction] = useState({});
  const [user, setUser] = useState({});
  const [guardianName, setGuardianName] = useState("");
  const [feeBreakdown, setFeeBreakdown] = useState([]);
  const [feetype, setFeetype] = useState({});
  const [scholarship, setScholarship] = useState(null);
  const [balance, setBalance] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [scholarshipAmount, setScholarshipAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios.get("/school").then((res) => {
      setState(res.data);
    }).catch((error) => {
      console.error("Error fetching school data:", error);
      errorAlert("Failed to fetch school details.");
    });
  }, []);

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        setLoading(true);

        const transactionResponse = await axios.get(`/transactions/${id}`);
        const transactionData = transactionResponse.data;
        setTransaction(transactionData);

        const userResponse = await axios.get(`/students/student/${transactionData.fees?.userID}`);
        const userDetails = userResponse.data.student || {};
        setUser(userDetails);

        const studentsResponse = await axios.get("/students");
        const students = studentsResponse.data || [];
        const matchedStudent = students.find(student => student.userID === transactionData.fees?.userID);
        if (matchedStudent && matchedStudent.guardian?.length > 0) {
          setGuardianName(matchedStudent.guardian[0].name || "No guardian info");
        } else {
          setGuardianName("No guardian info");
        }

        const feesResponse = await axios.get(`/fees/type/${userDetails.classID || "unknown"}/${userDetails.status || "active"}`);
        const feesData = feesResponse.data || {};
        setFeetype(feesData);

        const scholarshipResponse = await axios.get(`/scholarships/${userDetails.scholarship || "none"}`);
        const scholarshipData = scholarshipResponse.data.doc || null;
        setScholarship(scholarshipData);

        const transactionsResponse = await axios.get(`/transactions/student/${transactionData.fees?.userID}`);
        const thisMonthTransactions = transactionsResponse.data.filter(
          (e) => e.fees?.term === transactionData.fees?.term &&
            e.fees?.academicYear === transactionData.fees?.academicYear
        );

        const totalPaid = thisMonthTransactions.reduce((acc, txn) => acc + Number(txn.amount || 0), 0);
        setTotalPaid(totalPaid);

        const totalDiscount = thisMonthTransactions.reduce((acc, txn) => acc + Number(txn.Discount || 0), 0);
        setDiscount(totalDiscount);

        const isApril = transactionData.fees?.term === "April";
        const isJune = transactionData.fees?.term === "June";
        const admissionYear = new Date(userDetails.disease).getFullYear();
        const isNewStudent = admissionYear === parseInt(transactionData.fees?.academicYear);
        const admissionDateObj = new Date(userDetails.disease);
        const cutoffDate = new Date("2025-05-10T00:00:00.000Z");
        const isAfterCutoff = admissionDateObj >= cutoffDate;

        const admission = (isApril && isNewStudent && isAfterCutoff) ? Number(feesData.admission || 0) : 0;
        const exam = isApril ? Number(feesData.exam || 0) : 0;
        const tution = Number(feesData.tution || 0);
        const maintenance = Number(feesData.maintenance || 0);
        const transportFee = isJune ? 0 : Number(transactionData.transportFee || 0);

        const feeFields = {
          tution,
          exam,
          maintenance,
          transport: transportFee,
          admission,
        };
        const totalBill = Object.values(feeFields).reduce((acc, val) => acc + val, 0);
        setTotalBill(totalBill);

        const billWithoutAdmission = totalBill - admission;
        const scholarshipDeduction = scholarshipData?.percentage
          ? (scholarshipData.percentage / 100) * billWithoutAdmission
          : 0;
        setScholarshipAmount(scholarshipDeduction);

        let newBalance = totalBill - totalPaid - scholarshipDeduction - totalDiscount;
        if (newBalance < 0) newBalance = 0;
        setBalance(newBalance);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        errorAlert("Failed to fetch transaction details.");
        setLoading(false);
      }
    };

    fetchTransactionDetails();
  }, [id]);

  useEffect(() => {
    if (feetype) {
      const isApril = transaction?.fees?.term === "April";
      const isJune = transaction?.fees?.term === "June";
      const admissionYear = new Date(user.date).getFullYear();
      const isNewStudent = admissionYear === parseInt(transaction?.fees?.academicYear);
      const admissionDateObj = new Date(user.date);
      const cutoffDate = new Date("2025-04-01T00:00:00.000Z");
      const isAfterCutoff = admissionDateObj >= cutoffDate;

      const admission = (isApril && isNewStudent && isAfterCutoff) ? Number(feetype.admission || 0) : 0;
      const exam = isApril ? Number(feetype.exam || 0) : 0;
      const tution = Number(feetype.tution || 0);
      const maintenance = Number(feetype.maintenance || 0);
      const transportFee = isJune ? 0 : Number(transaction?.transportFee || 0);

      const fees = [];
      if (tution > 0) fees.push({ name: "Tuition Fee", amount: tution });
      if (maintenance > 0) fees.push({ name: "Maintenance Fee", amount: maintenance });
      if (transportFee > 0) fees.push({ name: "Transport Fee", amount: transportFee });
      if (exam > 0) fees.push({ name: "Exam Fee", amount: exam });
      if (admission > 0) fees.push({ name: "Admission Fee", amount: admission });

      if (scholarshipAmount > 0) {
        fees.push({ name: "Scholarship Amount", amount: `-${scholarshipAmount}` });
      }

      if (discount > 0) {
        fees.push({ name: "Discount", amount: `-${discount}` });
      }

      fees.push({ name: "Total Amount Paid", amount: `${totalPaid}` });

      setFeeBreakdown(fees);
    }
  }, [feetype, scholarshipAmount, totalPaid, discount, transaction]);

  const handlePrint = () => {
    window.print();
  };

  const handleDelete = () => {
    axios.delete(`/transactions/delete/${id}`).then((res) => {
      if (res.data.error) {
        errorAlert(res.data.error);
        return;
      }
      history.goBack();
    }).catch((error) => {
      console.error("Error deleting transaction:", error);
      errorAlert("Failed to delete transaction.");
    });
  };

  const renderPaySlip = () => (
    <div className="border content__container2 mb-5 blue-border image-container" style={{ marginTop: "-17px" }}>

      <img src={process.env.REACT_APP_SCHOOL_LOGO}

        alt="Left" className="left-image" />

      <img src="https://i.ibb.co/qLqqt0MP/Screenshot-2025-02-23-225523.png"
        alt="Right" className="right-image" />

      <div className="text-center border-bottom p-3 blue-border-bottom">
        <h2 className="title-text">{state?.fullName}</h2>
        <h5 className="motto-text">{state?.motto}</h5>
        <h6 style={{ fontWeight: "bold" }}>
          <strong>
            Receipt for {moment(transaction?.date).format("D MMMM YYYY")}
          </strong>
        </h6>
      </div>

      <div>
        <div className="row p-3 aa" style={{
          marginLeft: window.innerWidth >= 1200 ? "60px" : "0px"
        }}>
          <div className="col-6">
            <div className="d-flex align-items-center mb-2">
              <h6 className="key-col col-6">
                <strong style={{ fontWeight: "bold", color: "#fe3131" }} >Payment Date :</strong>
              </h6>
              <h6 className="value-col">
                <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{moment(transaction?.date).format("D MMMM YYYY")}</strong>
              </h6>
            </div>
            <div className="d-flex align-items-center mb-2">
              <h6 className="key-col col-6">
                <strong style={{ fontWeight: "bold", color: "#fe3131" }}>Name :</strong>
              </h6>
              <h6 className="value-col">
                <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>
                  {user?.name || ""} {user?.middleName || ""} {user?.surname || ""}
                </strong>
              </h6>
            </div>
            <div className="d-flex align-items-center mb-2">
              <h6 className="key-col col-6">
                <strong style={{ fontWeight: "bold", color: "#fe3131" }}>Class :</strong>
              </h6>
              <h6 className="value-col">
                <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{user?.classID ? user.classID.toUpperCase() : "-"}</strong>
              </h6>
            </div>
            <div className="d-flex align-items-center mb-2">
              <h6 className="key-col col-6">
                <strong style={{ fontWeight: "bold", color: "#fe3131" }}>UserID :</strong>
              </h6>
              <h6 className="value-col">
                <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{transaction.fees?.userID || "-"}</strong>
              </h6>
            </div>
            <div className="d-flex align-items-center mb-2">
              <h6 className="key-col col-6">
                <strong style={{ fontWeight: "bold", color: "#fe3131" }}>Guardian Name :</strong>
              </h6>
              <h6 className="value-col">
                <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{guardianName}</strong>
              </h6>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center mb-2">
              <h6 className="key-col col-6">
                <strong style={{ fontWeight: "bold", color: "#fe3131" }}>Academic Year :</strong>
              </h6>
              <h6 className="value-col">
                <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{transaction?.fees?.academicYear || "-"}</strong>
              </h6>
            </div>
            <div className="d-flex align-items-center mb-2">
              <h6 className="key-col col-6">
                <strong style={{ fontWeight: "bold", color: "#fe3131" }}>Month :</strong>
              </h6>
              <h6 className="value-col">
                <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{transaction?.fees?.term || "-"}</strong>
              </h6>
            </div>
            <div className="d-flex align-items-center mb-2">
              <h6 className="key-col col-6">
                <strong style={{ fontWeight: "bold", color: "#fe3131" }}>Amount Paid :</strong>
              </h6>
              <h6 className="value-col">
                <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{currentCurrency()} {transaction?.amount || "-"}</strong>
              </h6>
            </div>
            <div className="d-flex align-items-center mb-2">
              <h6 className="key-col col-6">
                <strong style={{ fontWeight: "bold", color: "#fe3131" }}>Payment Mode :</strong>
              </h6>
              <h6 className="value-col">
                <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{transaction?.paymentMethod || "N/A"}</strong>
              </h6>
            </div>
            <div className="d-flex align-items-center mb-2">
              <h6 className="key-col col-6">
                <strong style={{ fontWeight: "bold", color: "#fe3131" }}>Description :</strong>
              </h6>
              <h6 className="value-col">
                <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{transaction?.description || "N/A"}</strong>
              </h6>
            </div>
          </div>
        </div>
      </div>

      <table className="table table-bordered2 blue-border">
        <thead>
          <tr>
            <th className="text-left" style={{ width: "50%", fontWeight: "bold" }}>
              Fee Type
            </th>
            <th className="text-left" style={{ width: "50%", fontWeight: "bold" }}>
              Amount ({currentCurrency()})
            </th>
          </tr>
        </thead>
        <tbody>
          {feeBreakdown.map((fee, index) => (
            <tr key={index}>
              <td style={{ fontWeight: "bold" }}>
                {fee.name}
              </td>
              <td style={{ fontWeight: "bold" }}>
                {fee.amount}
              </td>
            </tr>
          ))}
          <tr>
            <td><strong style={{ fontWeight: "bold" }}>
              Pending Balance
            </strong>
            </td>
            <td><strong style={{ fontWeight: "bold" }}>
              {balance} {currentCurrency()}
            </strong>
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <div>
          <h6 style={{ fontWeight: "bold" }}>
            Date: <strong>{moment().format("dddd Do MMMM YYYY")}</strong>
          </h6>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <h6 style={{ fontWeight: "bold" }}>
              Signature of Receiver: ..........................
            </h6>
          </div>
          <div>
            <h6 style={{ fontWeight: "bold" }}>
              Signature of Guardian: ..........................
            </h6>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <div className="text-center mt-5"><h4>Loading...</h4></div>;
  }

  return (
    <>
      <div className="container" id="section-to-print">
        {renderPaySlip()}
        {renderPaySlip()}
      </div>
      <div className="d-flex justify-content-center mb-4">
        <button onClick={handlePrint} className="btn blue__btn">
          Print Receipt
        </button>
        <button onClick={handleDelete} className="ml-5 btn red__btn">
          Cancel
        </button>
      </div>
    </>
  );
}

export default PaymentReceipt;

// import React, { useState, useEffect } from "react";
// import axios from "../../../store/axios";
// import { useParams, useHistory } from "react-router-dom";
// import moment from "moment";
// import { errorAlert, currentCurrency } from "../../../utils";
// import "./PaymentReceipt.css";

// function PaymentReceipt() {
//   const [state, setState] = useState({});
//   const [transaction, setTransaction] = useState({});
//   const [user, setUser] = useState({});
//   const [guardianName, setGuardianName] = useState("");
//   const [feeBreakdown, setFeeBreakdown] = useState([]);
//   const [feetype, setFeetype] = useState({});
//   const [scholarship, setScholarship] = useState(null);
//   const [balance, setBalance] = useState(0);
//   const [totalBill, setTotalBill] = useState(0);
//   const [totalPaid, setTotalPaid] = useState(0);
//   const [scholarshipAmount, setScholarshipAmount] = useState(0);
//   const [discount, setDiscount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(""); // Added for error handling
//   const { id } = useParams();
//   const history = useHistory();

//   useEffect(() => {
//     axios.get("/school").then((res) => {
//       setState(res.data);
//     }).catch((error) => {
//       console.error("Error fetching school data:", error);
//       errorAlert("Failed to fetch school details.");
//     });
//   }, []);

//   useEffect(() => {
//     const fetchTransactionDetails = async () => {
//       try {
//         setLoading(true);
//         setError(""); // Reset error state

//         const transactionResponse = await axios.get(`/transactions/${id}`);
//         const transactionData = transactionResponse.data;
//         console.log("Transaction Data:", transactionData);
//         if (!transactionData?.fees?.userID) {
//           throw new Error("Transaction is missing userID.");
//         }
//         setTransaction(transactionData);

//         const userResponse = await axios.get(`/students/student/${transactionData.fees?.userID}`);
//         const userDetails = userResponse.data.student || {};
//         console.log("Student Data:", userDetails);
//         if (!userDetails?.classID || !userDetails?.status) {
//           throw new Error("Student is missing classID or status.");
//         }
//         setUser(userDetails);

//         const studentsResponse = await axios.get("/students");
//         const students = studentsResponse.data || [];
//         console.log("All Students:", students);
//         const matchedStudent = students.find(student => student.userID === transactionData.fees?.userID);
//         if (matchedStudent && matchedStudent.guardian?.length > 0) {
//           setGuardianName(matchedStudent.guardian[0].name || "No guardian info");
//         } else {
//           setGuardianName("No guardian info");
//         }

//         const feesResponse = await axios.get(`/fees/type/${userDetails.classID.toLowerCase()}/${userDetails.status.toLowerCase()}`);
//         const feesData = feesResponse.data || {};
//         console.log("Fee Structure:", feesData);
//         if (!feesData || !feesData.tution) {
//           throw new Error(`Fee structure not found for class ${userDetails.classID} and status ${userDetails.status}.`);
//         }
//         setFeetype(feesData);

//         const scholarshipResponse = await axios.get(`/scholarships/${userDetails.scholarship || "none"}`);
//         const scholarshipData = scholarshipResponse.data.doc || null;
//         setScholarship(scholarshipData);

//         const transactionsResponse = await axios.get(`/transactions/student/${transactionData.fees?.userID}`);
//         const thisMonthTransactions = transactionsResponse.data.filter(
//           (e) => e.fees?.term === transactionData.fees?.term &&
//             e.fees?.academicYear === transactionData.fees?.academicYear
//         );

//         const totalPaid = thisMonthTransactions.reduce((acc, txn) => acc + Number(txn.amount || 0), 0);
//         setTotalPaid(totalPaid);

//         const totalDiscount = thisMonthTransactions.reduce((acc, txn) => acc + Number(txn.Discount || 0), 0);
//         setDiscount(totalDiscount);

//         const isApril = transactionData.fees?.term === "April";
//         const isJune = transactionData.fees?.term === "June";
//         const admissionYear = new Date(userDetails.date).getFullYear();
//         const isNewStudent = admissionYear === parseInt(transactionData.fees?.academicYear);
//         const admissionDateObj = new Date(userDetails.date);
//         const cutoffDate = new Date("2025-05-10T00:00:00.000Z");
//         const isAfterCutoff = admissionDateObj >= cutoffDate;

//         const admission = (isApril && isNewStudent && isAfterCutoff) ? Number(feesData.admission || 0) : 0;
//         const exam = isApril ? Number(feesData.exam || 0) : 0;
//         const tution = Number(feesData.tution || 0);
//         const maintenance = Number(feesData.maintenance || 0);
//         const transportFee = isJune ? 0 : Number(transactionData.transportFee || 0);

//         const feeFields = {
//           tution,
//           exam,
//           maintenance,
//           transport: transportFee,
//           admission,
//         };
//         const totalBill = Object.values(feeFields).reduce((acc, val) => acc + val, 0);
//         setTotalBill(totalBill);

//         const billWithoutAdmission = totalBill - admission;
//         const scholarshipDeduction = scholarshipData?.percentage
//           ? (scholarshipData.percentage / 100) * billWithoutAdmission
//           : 0;
//         setScholarshipAmount(scholarshipDeduction);

//         let newBalance = totalBill - totalPaid - scholarshipDeduction - totalDiscount;
//         if (newBalance < 0) newBalance = 0;
//         setBalance(newBalance);

//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError(error.message || "Failed to fetch transaction details.");
//         setLoading(false);
//       }
//     };

//     fetchTransactionDetails();
//   }, [id]);

//   useEffect(() => {
//     if (feetype && Object.keys(feetype).length > 0) {
//       const isApril = transaction?.fees?.term === "April";
//       const isJune = transaction?.fees?.term === "June";
//       const admissionYear = user.date ? new Date(user.date).getFullYear() : null;
//       const isNewStudent = admissionYear && transaction?.fees?.academicYear
//         ? admissionYear === parseInt(transaction.fees.academicYear)
//         : false;
//       const admissionDateObj = user.date ? new Date(user.date) : null;
//       const cutoffDate = new Date("2025-05-10T00:00:00.000Z");
//       const isAfterCutoff = admissionDateObj ? admissionDateObj >= cutoffDate : false;

//       const admission = (isApril && isNewStudent && isAfterCutoff) ? Number(feetype.admission || 0) : 0;
//       const exam = isApril ? Number(feetype.exam || 0) : 0;
//       const tution = Number(feetype.tution || 0);
//       const maintenance = Number(feetype.maintenance || 0);
//       const transportFee = isJune ? 0 : Number(transaction?.transportFee || 0);

//       const fees = [];
//       if (tution > 0) fees.push({ name: "Tuition Fee", amount: tution });
//       if (maintenance > 0) fees.push({ name: "Maintenance Fee", amount: maintenance });
//       if (transportFee > 0) fees.push({ name: "Transport Fee", amount: transportFee });
//       if (exam > 0) fees.push({ name: "Exam Fee", amount: exam });
//       if (admission > 0) fees.push({ name: "Admission Fee", amount: admission });

//       if (scholarshipAmount > 0) {
//         fees.push({ name: "Scholarship Amount", amount: `-${scholarshipAmount}` });
//       }

//       if (discount > 0) {
//         fees.push({ name: "Discount", amount: `-${discount}` });
//       }

//       fees.push({ name: "Total Amount Paid", amount: `-${totalPaid}` });

//       setFeeBreakdown(fees);
//     } else {
//       console.warn("Fee type is empty or not loaded.");
//     }
//   }, [feetype, scholarshipAmount, totalPaid, discount, transaction, user]);

//   const handlePrint = () => {
//     window.print();
//   };

//   const handleDelete = () => {
//     axios.delete(`/transactions/delete/${id}`).then((res) => {
//       if (res.data.error) {
//         errorAlert(res.data.error);
//         return;
//       }
//       history.goBack();
//     }).catch((error) => {
//       console.error("Error deleting transaction:", error);
//       errorAlert("Failed to delete transaction.");
//     });
//   };

//   const renderPaySlip = () => (
//     <div className="border content__container2 mb-5 blue-border image-container" style={{ marginTop: "-17px" }}>
//       <img src="https://img.freepik.com/premium-vector/education-school-logo-design_586739-1335.jpg"
//         alt="Left" className="left-image" />
//       <img src="https://i.ibb.co/qLqqt0MP/Screenshot-2025-02-23-225523.png"
//         alt="Right" className="right-image" />

//       <div className="text-center border-bottom p-3 blue-border-bottom">
//         <h2 className="title-text">{state?.fullName}</h2>
//         <h5 className="motto-text">{state?.motto}</h5>
//         <h6 style={{ fontWeight: "bold" }}>
//           <strong>
//             Receipt for {moment(transaction?.date).format("D MMMM YYYY")}
//           </strong>
//         </h6>
//       </div>

//       <div>
//         <div className="row p-3 aa" style={{
//           marginLeft: window.innerWidth >= 1200 ? "60px" : "0px"
//         }}>
//           <div className="col-6">
//             <div className="d-flex align-items-center mb-2">
//               <h6 className="key-col col-6">
//                 <strong style={{ fontWeight: "bold", color: "#fe3131" }} >Payment Date :</strong>
//               </h6>
//               <h6 className="value-col">
//                 <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{moment(transaction?.date).format("D MMMM YYYY")}</strong>
//               </h6>
//             </div>
//             <div className="d-flex align-items-center mb-2">
//               <h6 className="key-col col-6">
//                 <strong style={{ fontWeight: "bold", color: "#fe3131" }}>Name :</strong>
//               </h6>
//               <h6 className="value-col">
//                 <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>
//                   {user?.name || ""} {user?.middleName || ""} {user?.surname || ""}
//                 </strong>
//               </h6>
//             </div>
//             <div className="d-flex align-items-center mb-2">
//               <h6 className="key-col col-6">
//                 <strong style={{ fontWeight: "bold", color: "#fe3131" }}>Class :</strong>
//               </h6>
//               <h6 className="value-col">
//                 <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{user?.classID ? user.classID.toUpperCase() : "-"}</strong>
//               </h6>
//             </div>
//             <div className="d-flex align-items-center mb-2">
//               <h6 className="key-col col-6">
//                 <strong style={{ fontWeight: "bold", color: "#fe3131" }}>UserID :</strong>
//               </h6>
//               <h6 className="value-col">
//                 <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{transaction.fees?.userID || "-"}</strong>
//               </h6>
//             </div>
//             <div className="d-flex align-items-center mb-2">
//               <h6 className="key-col col-6">
//                 <strong style={{ fontWeight: "bold", color: "#fe3131" }}>Guardian Name :</strong>
//               </h6>
//               <h6 className="value-col">
//                 <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{guardianName}</strong>
//               </h6>
//             </div>
//           </div>
//           <div className="col-6">
//             <div className="d-flex align-items-center mb-2">
//               <h6 className="key-col col-6">
//                 <strong style={{ fontWeight: "bold", color: "#fe3131" }}>Academic Year :</strong>
//               </h6>
//               <h6 className="value-col">
//                 <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{transaction?.fees?.academicYear || "-"}</strong>
//               </h6>
//             </div>
//             <div className="d-flex align-items-center mb-2">
//               <h6 className="key-col col-6">
//                 <strong style={{ fontWeight: "bold", color: "#fe3131" }}>Month :</strong>
//               </h6>
//               <h6 className="value-col">
//                 <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{transaction?.fees?.term || "-"}</strong>
//               </h6>
//             </div>
//             <div className="d-flex align-items-center mb-2">
//               <h6 className="key-col col-6">
//                 <strong style={{ fontWeight: "bold", color: "#fe3131" }}>Amount Paid :</strong>
//               </h6>
//               <h6 className="value-col">
//                 <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{currentCurrency()} {transaction?.amount || "-"}</strong>
//               </h6>
//             </div>
//             <div className="d-flex align-items-center mb-2">
//               <h6 className="key-col col-6">
//                 <strong style={{ fontWeight: "bold", color: "#fe3131" }}>Payment Mode :</strong>
//               </h6>
//               <h6 className="value-col">
//                 <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{transaction?.paymentMethod || "N/A"}</strong>
//               </h6>
//             </div>
//             <div className="d-flex align-items-center mb-2">
//               <h6 className="key-col col-6">
//                 <strong style={{ fontWeight: "bold", color: "#fe3131" }}>Description :</strong>
//               </h6>
//               <h6 className="value-col">
//                 <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{transaction?.description || "N/A"}</strong>
//               </h6>
//             </div>
//           </div>
//         </div>
//       </div>

//       {error ? (
//         <div className="text-center p-3">
//           <h5 className="text-danger">{error}</h5>
//         </div>
//       ) : (
//         <table className="table table-bordered2 blue-border">
//           <thead>
//             <tr>
//               <th className="text-left" style={{ width: "50%", fontWeight: "bold" }}>
//                 Fee Type
//               </th>
//               <th className="text-right" style={{ width: "50%", fontWeight: "bold" }}>
//                 Amount ({currentCurrency()})
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {feeBreakdown.length > 0 ? (
//               feeBreakdown.map((fee, index) => (
//                 <tr key={index}>
//                   <td style={{ fontWeight: "bold", paddingLeft: "20px" }}>
//                     {fee.name}
//                   </td>
//                   <td style={{ fontWeight: "bold", textAlign: "right", paddingRight: "20px" }}>
//                     {fee.amount}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="2" className="text-center">
//                   No fee breakdown available.
//                 </td>
//               </tr>
//             )}
//             <tr>
//               <td style={{ fontWeight: "bold", paddingLeft: "20px" }}>
//                 Pending Balance
//               </td>
//               <td style={{ fontWeight: "bold", textAlign: "right", paddingRight: "20px" }}>
//                 {balance} {currentCurrency()}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       )}

//       <div>
//         <div>
//           <h6 style={{ fontWeight: "bold" }}>
//             Date: <strong>{moment().format("dddd Do MMMM YYYY")}</strong>
//           </h6>
//         </div>
//         <div className="d-flex justify-content-between">
//           <div>
//             <h6 style={{ fontWeight: "bold" }}>
//               Signature of Receiver: ..........................
//             </h6>
//           </div>
//           <div>
//             <h6 style={{ fontWeight: "bold" }}>
//               Signature of Guardian: ..........................
//             </h6>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return <div className="text-center mt-5"><h4>Loading...</h4></div>;
//   }

//   return (
//     <>
//       <div className="container" id="section-to-print">
//         {renderPaySlip()}
//         {renderPaySlip()}
//       </div>
//       <div className="d-flex justify-content-center mb-4">
//         <button onClick={handlePrint} className="btn blue__btn">
//           Print Receipt
//         </button>
//         <button onClick={handleDelete} className="ml-5 btn red__btn">
//           Cancel
//         </button>
//       </div>
//     </>
//   );
// }

// export default PaymentReceipt;


// // import React, { useState, useEffect } from "react";
// // import axios from "../../../store/axios";
// // import { useParams, useHistory } from "react-router-dom";
// // import moment from "moment";
// // import { errorAlert, currentCurrency } from "../../../utils";
// // import "./PaymentReceipt.css";

// // function PaymentReceipt() {
// //   const [state, setState] = useState({});
// //   const [transaction, setTransaction] = useState({});
// //   const [user, setUser] = useState({});
// //   const [guardianName, setGuardianName] = useState('');
// //   const [feeBreakdown, setFeeBreakdown] = useState([]);
// //   const [feetype, setFeetype] = useState({});
// //   const [scholarship, setScholarship] = useState(null);
// //   const [balance, setBalance] = useState(0);
// //   const [totalBill, setTotalBill] = useState(0);
// //   const [totalPaid, setTotalPaid] = useState(0);
// //   const [scholarshipAmount, setScholarshipAmount] = useState(0);
// //   const [loading, setLoading] = useState(true);
// //   const { id } = useParams();
// //   const history = useHistory();

// //   useEffect(() => {
// //     axios.get("/school").then((res) => {
// //       setState(res.data);
// //     });
// //   }, []);

// //   useEffect(() => {
// //     const fetchTransactionDetails = async () => {
// //       try {
// //         setLoading(true);
// //         const transactionResponse = await axios.get(`/transactions/${id}`);
// //         const transactionData = transactionResponse.data;
// //         setTransaction(transactionData);

// //         const userResponse = await axios.get(`/students/student/${transactionData.fees.userID}`);
// //         const userDetails = userResponse.data.student;
// //         setUser(userDetails);

// //         // Fetch guardian details
// //         const studentsResponse = await axios.get("/students");
// //         const students = studentsResponse.data;
// //         const matchedStudent = students.find(student => student.userID === transactionData.fees.userID);
// //         if (matchedStudent) {
// //           const { guadian } = matchedStudent;
// //           const guardianName = guadian?.length > 0 ? guadian[0].name : 'No guardian info';
// //           setGuardianName(guardianName);
// //         }

// //         // Fetch Fees & Scholarship
// //         const feesResponse = await axios.get(`/fees/type/${userDetails.classID}/${userDetails.status}`);
// //         const feesData = feesResponse.data;
// //         setFeetype(feesData);

// //         const scholarshipResponse = await axios.get(`/scholarships/${userDetails.scholarship}`);
// //         const scholarshipData = scholarshipResponse.data.doc;
// //         setScholarship(scholarshipData);

// //         // Fetch transactions for calculations
// //         const transactionsResponse = await axios.get(`/transactions/student/${transactionData.fees.userID}`);
// //         const thisMonthTransactions = transactionsResponse.data.filter(
// //           (e) => e.fees.term === transactionData.fees.term &&
// //             e.fees.academicYear === transactionData.fees.academicYear
// //         );

// //         // Compute total bill
// //         const totalBill = Object.values(feesData).reduce((acc, val) => acc + Number(val || 0), 0);
// //         setTotalBill(totalBill);

// //         // Compute scholarship deduction
// //         const scholarshipDeduction = scholarshipData ?
// //           (scholarshipData?.percentage) / 100 * totalBill : 0;
// //         setScholarshipAmount(scholarshipDeduction);

// //         // Compute total paid
// //         const totalPaid = thisMonthTransactions.reduce((acc, txn) => acc + parseFloat(txn.amount || 0), 0);
// //         setTotalPaid(totalPaid);

// //         // Compute final balance
// //         setBalance(totalBill - totalPaid - scholarshipDeduction);

// //         setLoading(false);
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //         setLoading(false);
// //       }
// //     };

// //     fetchTransactionDetails();
// //   }, [id]);

// //   useEffect(() => {
// //     if (feetype) {
// //       const baseFees = [
// //         { name: "Tuition Fee", amount: feetype.tution || 0 },
// //         { name: "Exam Fee", amount: feetype.exam || 0 },
// //         { name: "Maintenance Fee", amount: feetype.maintenance || 0 },
// //         { name: "Transport Fee", amount: feetype.facility || 0 },
// //         { name: "Admission Fee", amount: feetype.admission || 0 },
// //       ];

// //       // Only add scholarship row if scholarshipAmount is greater than 0
// //       const fees = [...baseFees];
// //       if (scholarshipAmount > 0) {
// //         fees.push({ name: "Scholarship Amount", amount: `-${scholarshipAmount}` });
// //       }

// //       // Add total amount paid
// //       fees.push({ name: "Total Amount Paid", amount: `-${totalPaid}` });

// //       setFeeBreakdown(fees);
// //     }
// //   }, [feetype, scholarshipAmount, totalPaid]);

// //   const handlePrint = () => {
// //     window.print();
// //   };

// //   const handleDelete = () => {
// //     axios.delete(`/transactions/delete/${id}`).then((res) => {
// //       if (res.data.error) {
// //         errorAlert(res.data.error);
// //         return;
// //       }
// //       history.goBack();
// //     });
// //   };

// //   const renderPaySlip = () => (
// //     <div className="border content__container2 mb-5 blue-border image-container" style={{ marginTop: "-17px" }}>
// //       <img src="https://img.freepik.com/premium-vector/education-school-logo-design_586739-1335.jpg"
// //         alt="Left" className="left-image" />
// //       <img src="https://i.ibb.co/qLqqt0MP/Screenshot-2025-02-23-225523.png"
// //         alt="Right" className="right-image" />

// //       <div className="text-center border-bottom p-3 blue-border-bottom">
// //         <h2 className="title-text">{state?.fullName}</h2>
// //         <h5 className="motto-text">{state?.motto}</h5>
// //         <h6 style={{ fontWeight: "bold" }}>
// //           <strong>
// //             Receipt for {moment(transaction?.date).format("D MMMM YYYY")}
// //           </strong>
// //         </h6>
// //       </div>

// //       <div>
// //         <div className="row p-3 aa" style={{
// //           marginLeft: window.innerWidth >= 1200 ? "60px" : "0px"
// //         }}>
// //           <div className="col-6">
// //             <div className="d-flex align-items-center mb-2">
// //               <h6 className="key-col col-6">
// //                 <strong style={{ fontWeight: "bold", color: "#fe3131" }} >Payment Date :</strong>
// //               </h6>
// //               <h6 className="value-col">
// //                 <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{moment(transaction?.date).format("D MMMM YYYY")}</strong>
// //               </h6>
// //             </div>
// //             <div className="d-flex align-items-center mb-2">
// //               <h6 className="key-col col-6">
// //                 <strong style={{ fontWeight: "bold", color: "#fe3131" }}>Name :</strong>
// //               </h6>
// //               <h6 className="value-col">
// //                 <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{user?.name} {user?.middleName} {user?.surname}</strong>
// //               </h6>
// //             </div>
// //             <div className="d-flex align-items-center mb-2">
// //               <h6 className="key-col col-6">
// //                 <strong style={{ fontWeight: "bold", color: "#fe3131" }}>Class :</strong>
// //               </h6>
// //               <h6 className="value-col">
// //                 <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{user?.classID ? user.classID.toUpperCase() : "-"}</strong>
// //               </h6>
// //             </div>
// //             <div className="d-flex align-items-center mb-2">
// //               <h6 className="key-col col-6">
// //                 <strong style={{ fontWeight: "bold", color: "#fe3131" }}>UserID :</strong>
// //               </h6>
// //               <h6 className="value-col">
// //                 <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{transaction.fees?.userID || "-"}</strong>
// //               </h6>
// //             </div>
// //             <div className="d-flex align-items-center mb-2">
// //               <h6 className="key-col col-6">
// //                 <strong style={{ fontWeight: "bold", color: "#fe3131" }}>Guardian Name :</strong>
// //               </h6>
// //               <h6 className="value-col">
// //                 <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{guardianName + " " + user.guadian[0].lastname}</strong>
// //               </h6>
// //             </div>
// //           </div>
// //           <div className="col-6">
// //             <div className="d-flex align-items-center mb-2">
// //               <h6 className="key-col col-6">
// //                 <strong style={{ fontWeight: "bold", color: "#fe3131" }}>Academic Year :</strong>
// //               </h6>
// //               <h6 className="value-col">
// //                 <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{transaction?.fees?.academicYear || "-"}</strong>
// //               </h6>
// //             </div>
// //             <div className="d-flex align-items-center mb-2">
// //               <h6 className="key-col col-6">
// //                 <strong style={{ fontWeight: "bold", color: "#fe3131" }}>Month :</strong>
// //               </h6>
// //               <h6 className="value-col">
// //                 <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{transaction?.fees?.term || "-"}</strong>
// //               </h6>
// //             </div>
// //             <div className="d-flex align-items-center mb-2">
// //               <h6 className="key-col col-6">
// //                 <strong style={{ fontWeight: "bold", color: "#fe3131" }}>Amount Paid :</strong>
// //               </h6>
// //               <h6 className="value-col">
// //                 <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{currentCurrency()} {transaction?.amount || "-"}</strong>
// //               </h6>
// //             </div>
// //             <div className="d-flex align-items-center mb-2">
// //               <h6 className="key-col col-6">
// //                 <strong style={{ fontWeight: "bold", color: "#fe3131" }}>Payment Mode :</strong>
// //               </h6>
// //               <h6 className="value-col">
// //                 <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{transaction?.paymentMethod || "N/A"}</strong>
// //               </h6>
// //             </div>
// //             <div className="d-flex align-items-center mb-2">
// //               <h6 className="key-col col-6">
// //                 <strong style={{ fontWeight: "bold", color: "#fe3131" }}>Description :</strong>
// //               </h6>
// //               <h6 className="value-col">
// //                 <strong style={{ fontWeight: "bold", color: "#4fb1f6" }}>{transaction?.description || "N/A"}</strong>
// //               </h6>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <table className="table table-bordered2 blue-border">
// //         <thead>
// //           <tr>
// //             <th className="text-left" style={{ width: "50%", fontWeight: "bold" }}>
// //               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fee Type
// //             </th>
// //             <th className="text-left" style={{ width: "50%", fontWeight: "bold" }}>
// //               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Amount ({currentCurrency()})
// //             </th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {feeBreakdown.map((fee, index) => (
// //             <tr key={index}>
// //               <td style={{ fontWeight: "bold" }}>
// //                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fee.name}
// //               </td>
// //               {fee.name === "Scholarship Amount" || fee.name === "Total Amount Paid" ? (
// //                 <td style={{ fontWeight: "bold" }}>
// //                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fee.amount}
// //                 </td>
// //               ) : (
// //                 <td style={{ fontWeight: "bold" }}>
// //                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fee.amount}
// //                 </td>
// //               )}
// //             </tr>
// //           ))}
// //           <tr>
// //             <td><strong style={{ fontWeight: "bold" }}>
// //               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pending Balance</strong>
// //             </td>
// //             <td><strong style={{ fontWeight: "bold" }}>
// //               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{balance} {currentCurrency()}</strong>
// //             </td>
// //           </tr>
// //         </tbody>
// //       </table>

// //       <div>
// //         <div>
// //           <h6 style={{ fontWeight: "bold" }}>
// //             Date: <strong>{moment().format("dddd Do MMMM YYYY")}</strong>
// //           </h6>
// //         </div>
// //         <div className="d-flex justify-content-between">
// //           <div>
// //             <h6 style={{ fontWeight: "bold" }}>
// //               Signature of Receiver: ..........................
// //             </h6>
// //           </div>
// //           <div>
// //             <h6 style={{ fontWeight: "bold" }}>
// //               Signature of Guardian: ..........................
// //             </h6>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   if (loading) {
// //     return <div className="text-center mt-5"><h4>Loading...</h4></div>;
// //   }

// //   return (
// //     <>
// //       <div className="container" id="section-to-print">
// //         {renderPaySlip()}
// //         {renderPaySlip()}
// //       </div>
// //       <div className="d-flex justify-content-center mb-4">
// //         <button onClick={handlePrint} className="btn blue__btn">
// //           Print Receipt
// //         </button>
// //         <button onClick={handleDelete} className="ml-5 btn red__btn">
// //           Cancel
// //         </button>
// //       </div>
// //     </>
// //   );
// // }

// // export default PaymentReceipt;