import React, { useState } from "react";
import ListTable from "../../shared/ListTable";
import axios from "../../../store/axios";
import { useSelector } from "react-redux";
import { selectClasses } from "../../../store/slices/schoolSlice";
import moment from "moment";
// import { selectUser } from "../../../store/slices/userSlice";
import PaymentSummaryBox from "./PaymentSummaryBox";
import GenericPdfDownloadButton from "./GenericPdfDownloadButton";

const tableHeader = [
  { id: "date", name: "Date" },
  { id: "userID", name: "Student ID" },
  { id: "name", name: "Name" },
  { id: "type", name: "Student Type" },
  { id: "fees", name: "Total Fees" },
  { id: "amount", name: "Amount Paid" },
  { id: "balance", name: "Balance" },
];

let thismonth = moment().month();
let thisyear = moment().year();
let dayOne = moment(`01/${thismonth + 1}/${thisyear}`, "DD/MM/YYYY").format("YYYY-MM-DD");

function ViewPayment() {
  const classes = useSelector(selectClasses);
  const [classID, setClassID] = useState("");
  const [from, setFrom] = useState(dayOne);
  const [to, setTo] = useState(moment().format("YYYY-MM-DD"));
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [expenditures, setExpenditures] = useState([]);
  const [summaryData, setSummaryData] = useState({ totalAmountPaid: 0, totalAmountBalance: 0 });

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!classID || !from || !to) return;

    setLoading(true);
    setShow(false);

    try {
      const res = await axios.get(`/students/class/${classID}`);
      const students = Array.isArray(res.data) ? res.data : res.data.users || [];

      const { data: feesData } = await axios.get("/fees");

      const result = [];
      let totalPaid = 0;
      let totalBalance = 0;

      for (const student of students) {
        const studentStatus = student.status?.trim();
        if (!studentStatus) continue;

        const feeRecord = feesData.find(f => f.code === classID);
        if (!feeRecord || !feeRecord[studentStatus]) continue;

        const feeFields = feeRecord[studentStatus];

        const totalFees = Object.entries(feeFields).reduce((sum, [key, val]) => {
          return key !== "name" && val && !isNaN(val) ? sum + Number(val) : sum;
        }, 0);

        const { data: transactions = [] } = await axios.get(`/transactions/student/${student._id}`);

        const filteredTxns = transactions.filter(t =>
          t.type === "income" &&
          t.category === "fees" &&
          moment(t.date).isSameOrAfter(from) &&
          moment(t.date).isSameOrBefore(to)
        );

        const amountPaid = filteredTxns.reduce((sum, t) => sum + Number(t.amount || 0), 0);
        const balance = totalFees - amountPaid;

        result.push({
          id: student._id,
          date: moment(student.createdAt).format("YYYY-MM-DD"),
          userID: student.userID,
          name: `${student.name} ${student.middleName || ""} ${student.surname || ""}`.trim(),
          type: student.status,
          fees: totalFees,
          amount: amountPaid,
          balance,
        });

        totalPaid += amountPaid;
        totalBalance += balance;
      }

      setExpenditures(result);
      setSummaryData({
        totalAmountPaid: totalPaid,
        totalAmountBalance: totalBalance,
      });
      setShow(true);
    } catch (err) {
      console.error("Error in handleSearch:", err);
      setExpenditures([]);
      setSummaryData({ totalAmountPaid: 0, totalAmountBalance: 0 });
    }

    setLoading(false);
  };

  return (
    <div>
      <h3>ClassWise Reports</h3>

      <form className="content__container row" onSubmit={handleSearch}>
        <div className="col-sm-6 col-md-4 mb-3">
          <label className="col-form-label">Class</label>
          <select
            className="form-select"
            value={classID}
            onChange={(e) => setClassID(e.target.value)}
          >
            <option defaultValue hidden>Choose...</option>
            {classes?.slice().reverse().map((cls) => (
              <option key={cls._id} value={cls.classCode}>
                {cls.classCode.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm-6 col-md-4 mb-3">
          <label className="col-form-label">From</label>
          <input
            type="date"
            className="form-control"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div className="col-sm-6 col-md-4 mb-3">
          <label className="col-form-label">To</label>
          <input
            type="date"
            className="form-control"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn blue__btn" disabled={loading}>
            {loading && <span className="spinner-border spinner-border-sm me-2" />}
            Search
          </button>
        </div>
      </form>

      {show && (
        <>
          <div className="mt-0 content__container">
            <div className="text-center mb-4" style={{ marginTop: "-30px" }}>
              <h5>CLASSWISE REPORT</h5>
              <div>Class = {classID.toUpperCase()}</div>
              <div>
                From {moment(from).format("DD MMMM YYYY")} - To {moment(to).format("DD MMMM YYYY")}
              </div>
            </div>

            <ListTable data={expenditures} noActions={true} tableHeader={tableHeader} />

            <PaymentSummaryBox title="Class Payments Summary" data={summaryData} />
          </div>

          {expenditures.length > 0 && (
            <div className="d-flex justify-content-center mt-3 mb-2">
              <GenericPdfDownloadButton
                title={`Classwise Report - ${classID.toUpperCase()}`}
                tableHeader={tableHeader}
                rowData={expenditures}
                totalLabel="Total Amount Paid"
                totalValue={summaryData.totalAmountPaid}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ViewPayment;
