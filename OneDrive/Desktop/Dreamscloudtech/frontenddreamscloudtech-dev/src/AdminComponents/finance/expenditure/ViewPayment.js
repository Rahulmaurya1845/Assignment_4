import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ListTable from "../../shared/ListTable02";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import axios from "../../../store/axios";
import { getTrimString, errorAlert, currentCurrency } from "../../../utils";

const tableHeader = [
  { id: "date", name: "Date" },
  { id: "category", name: "Category" },
  { id: "type", name: "Type" },
  { id: "description", name: "Description" },
  { id: "amount", name: `Amount (${currentCurrency()})` },
  { id: "paymentMethod", name: "Payment Mode" },
];

function ViewPayment() {
  const [expenditures, setexpenditures] = useState([]);
  const [income, setincome] = useState(0);
  const [spends, setspends] = useState(0);

  useEffect(() => {
    axios.get("/transactions").then((res) => {
      let data = res.data.map((e) => {
        return {
          ...e,
          description: getTrimString(e.description, 50),
        };
      });
      setexpenditures(data);
    });
  }, []);

  useEffect(() => {
    setincome(getTotalIncome());
    setspends(getTotalSpends());
  }, [expenditures]);

  const getTotalIncome = () => {
    let total = 0;
    expenditures.forEach((e) => {
      if (e.type === "income") {
        total += parseInt(e.amount);
      }
    });
    return total;
  };

  const getTotalSpends = () => {
    let total = 0;
    expenditures.forEach((e) => {
      if (e.type === "expenditure") {
        total += parseInt(e.amount);
      }
    });
    return total;
  };

  const handleEdit = (id) => { };

  const handleDelete = (id) => {
    axios.delete(`/transactions/delete/${id}`).then((res) => {
      if (res.data.error) {
        errorAlert(res.data.error);
      }
      setexpenditures(expenditures.filter((e) => e._id !== id));
    });
  };

  return (
    <div>
      <h3 className="" style={{ marginBottom: -30 }}>
        Financial Record
      </h3>
      <div className="float-right mb-4">
        <Link className="btn blue__btn mr-4" to="/finance/transactions/income">
          Record An Income
        </Link>
        <Link className="btn red__btn" to="/finance/transactions/expenditure">
          Make a Payment
        </Link>
      </div>
      <div className="mt-5 mb-5">
        <ListTable
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          isEdit={true}
          data={expenditures}
          tableHeader={tableHeader}
        />
      </div>
      <div className="mt-5 mb-5">
        <Box
          mt={2}
          p={2}
          border={1}
          borderColor="#ddd"
          borderRadius="borderRadius"
          boxShadow={1}
          style={{ backgroundColor: "#EEF7FF" }}
        >
          <Typography variant="h6" style={{ color: "blue" }} gutterBottom>
            Financial Summary
          </Typography>
          <Divider style={{ marginBottom: "10px" }} />
          <Box
            display="flex"
            justifyContent="space-between"
            px={4}
            style={{ color: "blue" }}
          >
            <Box textAlign="center">
              <Typography variant="subtitle1">Total transactions</Typography>
              <Typography variant="h5">{expenditures.length}</Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="subtitle1" style={{ color: "green" }}>
                Income
              </Typography>
              <Typography variant="h5" style={{ color: "green" }}>
                {income}
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="subtitle1" style={{ color: "red" }}>
                Spends
              </Typography>
              <Typography variant="h5" style={{ color: "red" }}>
                {spends}
              </Typography>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default ViewPayment;
