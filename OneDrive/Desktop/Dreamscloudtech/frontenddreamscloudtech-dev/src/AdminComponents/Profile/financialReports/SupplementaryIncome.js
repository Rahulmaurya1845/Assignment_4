import React, { useState, useEffect } from "react";
import ListTable from "../../../AdminComponents/shared/ListTable03";
import axios from "../../../store/axios";
import { getTrimString } from "../../../utils";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import moment from "moment";
import PaymentSummaryBox from "./PaymentSummaryBox";
import GenericPdfDownloadButton from "./GenericPdfDownloadButton";

const tableHeader = [
  { id: "date", name: "Date" },
  { id: "category", name: "Category" },
  { id: "description", name: "Income Detail" },
  { id: "amount", name: "Amount" },
  { id: "pay", name: "Payment Type" },
];

let thismonth = moment().month();
let thisyear = moment().year();
let firstday = moment(`${thisyear}-${thismonth + 1}-01`).format("YYYY-MM-DD");

function ViewPayment() {
  const [paymentStats, setPaymentStats] = useState({
    total: 0,
    cash: 0,
    bankDeposit: 0,
    cheque: 0,
    others: 0,
    totalAmount: 0,
  });

  const [incomes, setIncomes] = useState([]);
  const [type, setType] = useState("");
  const [from, setFrom] = useState(firstday);
  const [to, setTo] = useState(moment().format("YYYY-MM-DD"));
  const [loading, setLoading] = useState(false);
  const [storeData, setStoreData] = useState([]);
  const [selectedTo, setSelectedTo] = useState(moment().format("YYYY-MM-DD"));
  const [selectedFrom, setSelectedFrom] = useState(firstday);
  const user = useSelector(selectUser);

  useEffect(() => {
    axios
      .get("/transactions")
      .then((res) => {
        let results = res.data.filter((i) => i.type === "income");
        let data = results.map((e) => ({
          ...e,
          description: getTrimString(e.description, 50),
        }));
        setIncomes(data);
        setStoreData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);

    let newData = storeData.map((item) => {
      let method = "";
      if (item.paymentMethod) {
        method = item.paymentMethod.toLowerCase().replace(/\s+/g, "-");
      } else if (item.bank && item.bank.trim() !== "") {
        method = "bank-deposit";
      } else {
        method = "cash";
      }
      return { ...item, _normalizedPaymentMethod: method };
    });

    newData = newData.filter(
      (i) =>
        moment(i.date).isSameOrAfter(from) &&
        moment(i.date).isSameOrBefore(to)
    );

    if (type) {
      const searchType = type.toLowerCase().replace(/\s+/g, "-");
      newData = newData.filter(
        (i) => i._normalizedPaymentMethod === searchType
      );
    }

    setSelectedFrom(from);
    setSelectedTo(to);
    setIncomes(newData);
    setLoading(false);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setType("");
    setFrom(firstday);
    setTo(moment().format("YYYY-MM-DD"));
    setSelectedFrom(firstday);
    setSelectedTo(moment().format("YYYY-MM-DD"));
    setIncomes(storeData);
  };

  const normalizePaymentMethod = (item) => {
    let method = "";
    if (item.paymentMethod) {
      method = item.paymentMethod.toLowerCase().replace(/\s+/g, "-");
    } else if (item.bank && item.bank.trim() !== "") {
      method = "bank-deposit";
    } else {
      method = "cash";
    }

    switch (method) {
      case "cash":
        return "Cash";
      case "bank":
      case "bank-deposit":
        return "Bank Deposit";
      case "cheque":
        return "Cheque";
      case "other":
        return "Other";
      default:
        return "Other";
    }
  };

  useEffect(() => {
    if (!incomes || incomes.length === 0) {
      setPaymentStats({
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
      total: incomes.length,
      cash: 0,
      bankDeposit: 0,
      cheque: 0,
      others: 0,
      totalAmount: 0,
    };

    incomes.forEach((item) => {
      const method = item.paymentMethod?.toLowerCase();
      const amount = parseFloat(item.amount) || 0;
      stats.totalAmount += amount;

      if (method === "cash") {
        stats.cash += 1;
      } else if (method === "bank-deposit" || method === "bank") {
        stats.bankDeposit += 1;
      } else if (method === "cheque") {
        stats.cheque += 1;
      } else {
        stats.others += 1;
      }
    });

    setPaymentStats(stats);
  }, [incomes]);

  const totalIncome = incomes.reduce(
    (sum, item) => sum + (parseFloat(item.amount) || 0),
    0
  );

  const getDocDefinition = () => {
    const content = [
      { text: "Supplementary Income Report", style: "header" },
      {
        text: `From ${moment(selectedFrom).format("DD MMM YYYY")} - To ${moment(selectedTo).format("DD MMM YYYY")}`,
        margin: [0, 0, 0, 10],
      },
      {
        table: {
          headerRows: 1,
          widths: ["auto", "*", "*", "auto", "auto"],
          body: [
            ["Date", "Category", "Description", "Amount", "Payment Type"],
            ...incomes.map((item) => [
              moment(item.date).format("DD MMM YYYY"),
              item.category || "-",
              item.description || "-",
              `₹${item.amount}`,
              normalizePaymentMethod(item),
            ]),
          ],
        },
        layout: "lightHorizontalLines",
      },
      {
        text: `\nTotal Income: ₹${totalIncome.toLocaleString()}`,
        bold: true,
        margin: [0, 10, 0, 0],
      },
    ];

    return {
      content,
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
    };
  };

  return (
    <div>
      <h3 className="ml-3">Supplementary Income Report</h3>
      <form className="content__container row">
        {/* Filter Inputs */}
        <div className="col-sm-6 col-md-3 mb-3">
          <label className="col-form-label">Payment Type</label>
          <select
            name="payment-type"
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option defaultValue hidden>Choose...</option>
            <option value="cash">Cash</option>
            <option value="bank deposit">Bank Deposit</option>
            <option value="cheque">Cheque</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="col-sm-6 col-md-3 mb-3">
          <label className="col-form-label">From</label>
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            type="date"
            className="form-control"
          />
        </div>
        <div className="col-sm-6 col-md-3 mb-3">
          <label className="col-form-label">To</label>
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            type="date"
            className="form-control"
          />
        </div>
        <div className="col-sm-6 col-md-3 mb-0 mt-4">
          <button onClick={handleSearch} disabled={loading} className="btn blue__btn">
            Search
          </button>
          <button onClick={handleReset} className="btn red__btn mx-2">
            Reset
          </button>
        </div>
      </form>

      {/* Data Display */}
      <div className="mt-0 content__container" id="section-to-print">
        <div className="text-center mb-2">
          <h5>INCOME REPORT</h5>
          <div>
            From {moment(selectedFrom).format("DD MMM YYYY")} - To{" "}
            {moment(selectedTo).format("DD MMM YYYY")}
          </div>
          <div style={{ color: "green", fontWeight: "bold", marginTop: "10px" }}>
            Total Income: ₹{totalIncome.toLocaleString()}
          </div>
        </div>

        <ListTable
          data={incomes.map((item) => ({
            ...item,
            pay: normalizePaymentMethod(item),
          }))}
          noActions={true}
          tableHeader={tableHeader}
        />
      </div>

      {/* Summary */}
      {paymentStats.total > 0 && (
        <PaymentSummaryBox title="Supplementary Income Summary" data={paymentStats} />
      )}

      <div className="text-center my-3">
        <GenericPdfDownloadButton
          title="Supplementary Income Report"
          tableHeader={tableHeader}
          rowData={incomes.map((item) => ({
            ...item,
            pay: normalizePaymentMethod(item),
          }))}
          totalLabel="Total Income"
          totalValue={totalIncome}
        />

      </div>
    </div>
  );
}

export default ViewPayment;
