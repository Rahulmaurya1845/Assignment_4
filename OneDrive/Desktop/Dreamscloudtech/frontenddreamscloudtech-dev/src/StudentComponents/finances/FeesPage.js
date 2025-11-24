import React, { useState, useEffect } from "react";
import TableList from "../../AdminComponents/shared/ListTable";
import axios from "../../store/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import FeesTable from "./Fees";
import { currentCurrency } from "../../utils";


function FeesPage() {
  const [loading, setloading] = useState(false);
  const [payments, setpayments] = useState([]);
  const [fees, setfees] = useState({});
  const user = useSelector(selectUser);
  const [totalBill, settotalBill] = useState(0);
  const [totalPaid, settotalPaid] = useState(0);
  const [balance, setbalance] = useState(0);

  const tableHeader = [
    { id: "date", name: "Date" },
    { id: "academicYear", name: "Year" },
    { id: "term", name: "Term" },
    { id: "paymentMethod", name: "Payment Method" },
    { id: "bank", name: "Bank" },
    { id: "description", name: "Description" },
    { id: "amount", name: `Amount ${currentCurrency()}` },
  ];

  useEffect(() => {
    const getData = async () => {
      setloading(true);

      // Fetch transactions for the user
      const transactionsResponse = await axios.get(
        `/transactions/student/${user?.userID}`
      );
      const academicYearResponse = await axios.get(`/academicyear`);
      const currentYearData = academicYearResponse.data[0];
      const currentYear = currentYearData?.currentYear;
      const currentTerm = currentYearData?.currentTerm;
      const transactions = transactionsResponse.data;

      const transactions_flattened = transactions.map((e) => {
        return {
          academicYear: e.fees.academicYear,
          term: e.fees.term,
          ...e,
        }
      })

      // Fetch student details
      const studentResponse = await axios.get(`/students/student/${user?.userID}`);
      const student = studentResponse.data.student;

      // Fetch fees data for the student’s class and status
      const feesResponse = await axios.get(
        `/fees/type/${student.classID}/${student.status}`
      );

      const feesData = feesResponse.data;

      // Calculate the total bill from the fees
      const totalBill = Object.values(feesData).reduce(
        (t, value) => Number(t) + Number(value),
        0
      );

      // Filter transactions for the selected academic year and term
      const filteredTransactions = transactions.filter(
        (transaction) =>
          transaction?.fees?.academicYear === currentYear &&
          transaction?.fees?.term === currentTerm
      );

      // Sum up the amounts of filtered transactions
      const totalPaid = filteredTransactions.reduce(
        (accumulator, transaction) => accumulator + Number(transaction.amount),
        0
      );

      // Calculate the remaining balance
      const balance = totalBill - totalPaid;

      // Set state variables

      console.log("Flattened Transactions", transactions_flattened);

      setpayments(transactions_flattened); // Set all transactions
      setfees(feesData); // Set fees data
      settotalBill(totalBill); // Set total bill for the selected year and term
      settotalPaid(totalPaid); // Set total paid for the selected year and term
      setbalance(balance); // Set balance
      setloading(false);
    };

    getData();
  }, [user]);

  return (
    <div>
      <FeesTable
        fees={fees}
        totalBill={totalBill}
        totalPaid={totalPaid}
        balance={balance}
        payments={payments}
      />

      <h3 className="mb-3 mt-5">Fees Transactions</h3>
      <TableList
        data={payments}
        noActions={true}
        tableHeader={tableHeader}
        loading={loading}
      />
    </div>
  );
}

export default FeesPage;
