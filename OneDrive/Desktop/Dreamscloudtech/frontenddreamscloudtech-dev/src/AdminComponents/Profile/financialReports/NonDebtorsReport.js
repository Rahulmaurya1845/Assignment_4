import React, { useEffect, useState } from "react";
import Search from "../../finance/billReminder/Search";
import Table from "../../finance/billReminder/Table";
import axios from "../../../store/axios";
// import Reminder from "../../finance/billReminder/SendLetter";
// import Message from "../../finance/billReminder/SendMessage";
import { currentCurrency } from "../../../utils";
import PaymentSummaryBox from "./PaymentSummaryBox";
import GenericPdfDownloadButton from "./GenericPdfDownloadButton";

const tableHeader = [
  { id: "userID", name: "Student ID" },
  { id: "name", name: "Name" },
  { id: "classID", name: "Class" },
  { id: "total", name: `Total Bill (${currentCurrency()})` },
  { id: "amount", name: `Amount Paid (${currentCurrency()})` },
  { id: "owe", name: `Amount Due (${currentCurrency()})` },
];

function DebtorsList() {
  const [data, setdata] = useState([]);
  const [year, setyear] = useState("");
  const [term, setterm] = useState("");
  const [classID, setclassID] = useState("all");
  const [campus, setcampus] = useState("");
  const [show, setshow] = useState(false);
  const [loading, setloading] = useState(false);
  const [fees, setfees] = useState([]);
  // const [openLetter, setopenLetter] = useState(false);
  // const [openMessage, setopenMessage] = useState(false);
  const [selected, setSelected] = useState([]);
  const [summaryData, setSummaryData] = useState({
    totalAmountPaid: 0,
    totalAmountDue: 0,
  });

  useEffect(() => {
    axios.get("/fees").then((res) => {
      setfees(res.data);
    });
  }, []);

  const handleSearch = () => {
    setloading(true);

    const bal = (u) => {
      const fee = fees.find((z) => z?.code === u?.classID);
      return fee
        ? Object.values(fee[u.status] || {}).reduce((t, v) => Number(t) + Number(v), 0)
        : 0;
    };

    axios.get(`/students/unpaidfees/${year}/${term}`).then((res) => {
      const students = res.data.map((e) => {
        const total = bal(e);
        return {
          ...e,
          bill: total,
          owe: total - e.amount,
          total,
        };
      });

      let dataAll = students.filter((e) => e.owe > 0);
      if (classID !== "all") {
        dataAll = dataAll.filter((e) => e.classID === classID);
      }

      setdata(dataAll);
      setshow(true);
      setloading(false);

      const totalAmountPaid = dataAll.reduce((sum, s) => sum + s.amount, 0);
      const totalAmountDue = dataAll.reduce((sum, s) => sum + s.owe, 0); // <- fixed from s.balance to s.owe

      setSummaryData({
        totalAmountPaid,
        totalAmountDue,
      });
    });
  };

  const debtors = selected.map((e) => {
    return data.find((i) => i.userID === e);
  });

  return (
    <div>
      <h3> Debtors Report</h3>
      <div className="content__containerr mb-5">
        <Search
          year={year}
          setyear={setyear}
          term={term}
          handleSearch={handleSearch}
          classID={classID}
          setclassID={setclassID}
          campus={campus}
          setcampus={setcampus}
          setterm={setterm}
          loading={loading}
        />
      </div>

      {show && (
        <>
          <div className="content__containerr mb-4" id="section-to-print">
            <div className="text-center mb-4">
              <h3 style={{ color: "#4fb1f6" }}>
                Debtors List For Month: {term} And Year: {year}
              </h3>
            </div>
            <Table
              selected={selected}
              setSelected={setSelected}
              tableHeader={tableHeader}
              data={data}
            />
          </div>

          <PaymentSummaryBox title="Debtors Summary" data={summaryData} />

          {data.length > 0 && (
            <div className="d-flex justify-content-center mt-4 mb-3">
              <GenericPdfDownloadButton
                title={`Debtors Report - Term: ${term}, Year: ${year}`}
                tableHeader={tableHeader}
                rowData={data}
                totalLabel="Total Amount Paid"
                totalValue={summaryData.totalAmountPaid}
              />
            </div>
          )}
        </>
      )}

      {/* Optional modal features
      {debtors.length > 0 && (
        <>
          <Message
            debtors={debtors}
            open={openMessage}
            setOpen={setopenMessage}
          />
          <Reminder
            debtors={debtors}
            open={openLetter}
            setOpen={setopenLetter}
          />
        </>
      )} */}
    </div>
  );
}

export default DebtorsList;
