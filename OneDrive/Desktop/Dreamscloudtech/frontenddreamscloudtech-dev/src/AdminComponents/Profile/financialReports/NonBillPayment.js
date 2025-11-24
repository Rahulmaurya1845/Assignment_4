import React, { useState, useEffect } from "react";
import ListTable from "../../../AdminComponents/shared/ListTable";
import axios from "../../../store/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import { selectYearGroup } from "../../../store/slices/schoolSlice";
import moment from "moment";
import PaymentSummaryBox from "./PaymentSummaryBox";
import GenericPdfDownloadButton from "./GenericPdfDownloadButton"; // ✅ Adjust path if needed

let thismonth = moment().month();
let thisyear = moment().year();

const tableHeader = [
  { id: "createdAt", name: "Txn. Date", date: true },
  { id: "userID", name: "Student ID" },
  { id: "name", name: "Name" },
  { id: "guardian", name: "Guardian" },
  { id: "class", name: "Class" },
  { id: "year", name: "Academic Year" },
  { id: "term", name: "Month" },
  { id: "paymentType", name: "Payment Type" },
  { id: "amount", name: "Amount(₹)" },
];

function NonBillPayment() {
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

  const [summary, setSummary] = useState({
    total: 0,
    cash: 0,
    bankDeposit: 0,
    cheque: 0,
    others: 0,
    totalAmount: 0,
  });

  useEffect(() => {
    axios.get("/nonbillpayment").then((res) => {
      let data = res.data.slice().reverse();
      data = data.map(item => ({
        ...item,
        userID: item.userID || item.student,
      }));
      setStoreData(data);
      fetchStudentDetails(data);
    });

    axios.get("/classes").then((res) => {
      setClassList(res.data);
    });
  }, []);

  const fetchStudentDetails = async (data) => {
    let userIds = [...new Set(data.map(item => item.userID || item.student))].filter(Boolean);

    let detailsMap = {};
    await Promise.all(
      userIds.map(async (userID) => {
        try {
          let res = await axios.get(`/students/student/${userID}`);
          if (res.data?.student) {
            detailsMap[userID] = {
              name: `${res.data.student.name} ${res.data.student.surname || ""}`.trim(),
              guardian: `${res.data.student.guadian?.[0]?.name || "N/A"} ${res.data.student.guadian?.[0]?.lastname || ""}`.trim(),
              class: res.data.student.classID?.toUpperCase() || "N/A",
            };
          }
        } catch (error) {
          console.error("Error fetching student details:", error);
        }
      })
    );

    setStudentDetails(detailsMap);

    const updatedData = data.map((item) => {
      const studentID = item.userID || item.student;
      return {
        ...item,
        name: detailsMap[studentID]?.name || "N/A",
        guardian: detailsMap[studentID]?.guardian || "N/A",
        class: detailsMap[studentID]?.class || "N/A",
      };
    });

    setStoreData(updatedData);
    setExpenditures(updatedData);
  };

  const calculateTotalBill = (data) =>
    data.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    let filteredData = storeData;

    if (year) {
      filteredData = filteredData.filter(i =>
        i.year?.toLowerCase() === year.toLowerCase()
      );
    }

    if (term) {
      filteredData = filteredData.filter(i =>
        i.term?.toLowerCase() === term.toLowerCase()
      );
    }

    if (selectedClass) {
      filteredData = filteredData.filter(i =>
        i.class?.toLowerCase() === selectedClass.toLowerCase()
      );
    }

    setExpenditures(filteredData);
    setLoading(false);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setYear("");
    setTerm("");
    setSelectedClass("");
    setExpenditures(storeData);
  };

  const totalBill = calculateTotalBill(expenditures);

  useEffect(() => {
    const stats = {
      total: 0, cash: 0, bankDeposit: 0, cheque: 0, others: 0, totalAmount: 0,
    };
    expenditures.forEach(item => {
      const method = item.paymentType?.toLowerCase();
      const amount = parseFloat(item.amount) || 0;
      stats.total += 1;
      stats.totalAmount += amount;

      if (method === "cash") stats.cash += 1;
      else if (["bank-deposit", "bank"].includes(method)) stats.bankDeposit += 1;
      else if (method === "cheque") stats.cheque += 1;
      else stats.others += 1;
    });
    setSummary(stats);
  }, [expenditures]);

  return (
    <div>
      <h3 className="">Non-Bill Payment Reports</h3>

      <form className="content__container row">
        <div className="col-sm-6 col-md-4 mb-3">
          <label className="col-form-label">Year</label>
          <select className="form-select" value={year} onChange={(e) => setYear(e.target.value)}>
            <option defaultValue hidden>Choose...</option>
            {years.map((y) => <option key={y._id} value={y.year}>{y.year}</option>)}
          </select>
        </div>

        <div className="col-sm-6 col-md-4 mb-3">
          <label className="col-form-label">Month</label>
          <select className="form-select" value={term} onChange={(e) => setTerm(e.target.value)}>
            <option defaultValue hidden>Choose...</option>
            {moment.months().map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div className="col-sm-6 col-md-4 mb-3">
          <label className="col-form-label">Class</label>
          <select className="form-select" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            <option defaultValue hidden>Choose...</option>
            {classList.slice().reverse().map(cls => (
              <option key={cls._id} value={cls.classCode}>{cls.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <button onClick={handleSearch} disabled={loading} className="btn blue__btn mx-2">
            {loading && <span className="spinner-border spinner-border-sm" role="status"></span>} Search
          </button>
          <button onClick={handleReset} disabled={loading} className="btn red__btn mx-2">
            {loading && <span className="spinner-border spinner-border-sm" role="status"></span>} Reset
          </button>
        </div>
      </form>

      <div className="content__container mt-5">
        <div className="text-center mb-3">
          <h5>NON-BILL PAYMENTS RECEIVED</h5>
          <div style={{ color: "red", fontWeight: "bold" }}>
            Total Amount: ₹{totalBill.toLocaleString()}
          </div>
        </div>
        <ListTable data={expenditures} noActions={true} tableHeader={tableHeader} />
      </div>

      {summary.total > 0 && (
        <PaymentSummaryBox title="Non-Bill Payments Summary" data={summary} />
      )}

      {expenditures.length > 0 && (
        <div className="text-center my-5">
          <GenericPdfDownloadButton
            title="Non-Bill Payments Report"
            tableHeader={tableHeader}
            rowData={expenditures.map(item => ({
              ...item,
              createdAt: item.createdAt ? moment(item.createdAt).format("DD/MM/YYYY") : "N/A",
            }))}
            totalLabel="Total Amount"
            totalValue={totalBill}
          />

        </div>
      )}
    </div>
  );
}

export default NonBillPayment;
