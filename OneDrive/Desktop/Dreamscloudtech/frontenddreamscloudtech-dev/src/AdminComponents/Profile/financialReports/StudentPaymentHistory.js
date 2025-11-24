import React, { useEffect, useState } from "react";
import ListTable from "../../shared/ListTable";
import axios from "../../../store/axios";
import { errorAlert, getImgSrc } from "../../../utils";
import { useSelector } from "react-redux";
import { selectClasses } from "../../../store/slices/schoolSlice";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import { selectUser } from "../../../store/slices/userSlice";
import { Avatar } from "@material-ui/core";
import MonthlySummaryBox from "./MonthlySummaryBox";
import GenericPdfDownloadButton from "./GenericPdfDownloadButton";

const tableHeader = [
  { id: "date", name: "Date" },
  { id: "year", name: "Academic Year" },
  { id: "term", name: "Month" },
  { id: "description", name: "Description" },
  { id: "paymentMethod", name: "Payment Mode" },
  { id: "amount", name: "Amount" },
  { id: "paidTo", name: "Paid To" },
];

function ViewPayment() {
  const [monthlySummary, setMonthlySummary] = useState({});
  const [expenditures, setexpenditures] = useState([]);
  const [classID, setclassID] = useState("");
  const [students, setstudents] = useState([]);
  const [loading, setloading] = useState(false);
  const [student, setstudent] = useState("");
  const [studentData, setstudentData] = useState("");
  const [summaryData, setSummaryData] = useState({ totalAmount: 0 });

  const classes = useSelector(selectClasses);
  const user = useSelector(selectUser);

  const handleSearchClass = (e) => {
    setclassID(e);
    axios.get(`/students/class/${e}`).then((res) => {
      if (res.data.error) return errorAlert(res.data.error);
      setstudents(res.data.users);
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!student) return;

    setloading(true);

    try {
      const transactionRes = await axios.get(`/transactions/student/${student}`);
      const transactions = transactionRes.data.slice().reverse();

      const formattedTransactions = transactions.map((y) => ({
        date: y.date,
        amount: y.amount,
        description: y.description,
        term: y.fees.term,
        year: y.fees.academicYear,
        paymentMethod: y.paymentMethod,
        paidTo: "cashier",
      }));

      setexpenditures(formattedTransactions);

      const monthTotals = {};
      for (const txn of transactions) {
        const month = txn.fees.term;
        const amount = Number(txn.amount) || 0;
        if (!month) continue;
        monthTotals[month] = (monthTotals[month] || 0) + amount;
      }

      setMonthlySummary(monthTotals);

      const studentRes = await axios.get(`/students/student/${student}`);
      setstudentData(studentRes.data?.student);

    } catch (err) {
      console.error("Search failed", err);
    }

    setloading(false);
  };

  useEffect(() => {
    if (Array.isArray(expenditures)) {
      const stats = {
        totalAmount: expenditures.reduce(
          (sum, item) => sum + (parseFloat(item.amount) || 0),
          0
        ),
      };
      setSummaryData(stats);
    }
  }, [expenditures]);

  return (
    <div>
      <h3 className="">Fees Payment History</h3>
      <form className="content__container row">
        <div className="col-sm-6 col-md-4 mb-3">
          <label className="col-form-label">Class</label>
          <select
            className="form-select"
            value={classID}
            onChange={(e) => handleSearchClass(e.target.value)}
          >
            <option defaultValue hidden>Choose...</option>
            {classes &&
              classes.slice().reverse().map((y) => (
                <option value={y.classCode} key={y._id}>
                  {y?.classCode.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
        {classID && (
          <div className="col-sm-6 col-md-4 mb-3">
            <label className="col-form-label">Student</label>
            <select
              className="form-select"
              value={student}
              onChange={(e) => setstudent(e.target.value)}
            >
              <option defaultValue hidden>Choose...</option>
              {students &&
                students.map((y) => (
                  <option value={y.userID} key={y._id}>
                    {y?.name} {y.surname} - {y.userID}
                  </option>
                ))}
            </select>
          </div>
        )}
        <div className="mb-3">
          <button
            onClick={handleSearch}
            disabled={loading}
            type="submit"
            className="btn blue__btn"
          >
            {loading && (
              <span className="spinner-border spinner-border-sm me-2" />
            )}
            Search
          </button>
        </div>
      </form>

      {studentData && (
        <>
          <div className="mt-5 content__container" id="section-to-print">
            <div className="p-5" style={{ backgroundColor: "#daedff" }}>
              <div className="d-flex justify-content-around align-items-stretch">
                <Avatar
                  src={getImgSrc(studentData?.profileUrl)}
                  alt=""
                  width="100px"
                  height="100px"
                />
                <div>
                  <h5>
                    <strong>
                      {studentData?.name} {studentData?.surname}
                    </strong>
                  </h5>
                  <h6>Class {studentData?.classID.toUpperCase()}</h6>
                </div>
              </div>
            </div>

            <ListTable
              data={expenditures}
              noActions={true}
              tableHeader={tableHeader}
            />
          </div>

          <MonthlySummaryBox title="Student Payments Summary" data={monthlySummary} />

          <div className="d-flex justify-content-center mt-3">
            <GenericPdfDownloadButton
              title={`Payment Report for ${studentData?.name} ${studentData?.surname}`}
              tableHeader={tableHeader}
              rowData={expenditures}
              totalLabel="Total Paid"
              totalValue={summaryData.totalAmount}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ViewPayment;
