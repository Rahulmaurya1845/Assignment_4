import React, { useState, useEffect } from "react";
import TableList from "../../AdminComponents/shared/ListTable2";
import { selectUser } from "../../store/slices/userSlice";
import { useSelector } from "react-redux";
import axios from "../../store/axios";
import NumberFormat from "react-number-format";
import EditIcon from "@material-ui/icons/Edit";
import { monthYear } from "../../data";
import EditBank from "./EditBank";
import { errorAlert, successAlert, currentCurrency } from "../../utils";
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
const tableHeader = [
  { id: "date", name: "Date" },
  { id: "amount", name: `Amount ${currentCurrency()}` },
  { id: "month", name: "For Month" },
];

const today = new Date();
const currentMonth = today.getMonth();

function Payrow() {
  const [payrowData, setpayrowData] = useState([]);
  const [payrowType, setpayrowType] = useState({});
  const [totalBill, settotalBill] = useState(0);
  const [balance, setbalance] = useState(0);
  const [totalPaid, settotalPaid] = useState();
  const [loading, setloading] = useState(false);
  const [editLoading, seteditLoading] = useState(false);
  const [open, setopen] = useState(false);
  const [bank, setbank] = useState("");
  const [accountNumber, setaccountNumber] = useState("");
  const user = useSelector(selectUser);

  useEffect(() => {
    const getdata = async () => {
      setloading(true);
      let transactionData = await axios.get(
        `/transactions/staff/pay/${user?.userID}`
      );
      let alltransactions = transactionData.data;
      let monthData = alltransactions.map((e) => {
        return {
          ...e,
          month: monthYear[e.month].name,
        };
      });
      setpayrowData(monthData);
      let staffData = await axios.get(`/teachers/${user?.userID}`);
      let staff = staffData.data?.teacher;
      setaccountNumber(staff?.accountNumber);
      setbank(staff?.bank);
      console.log(staff);

      let payData = await axios.get(`/payrow/${staff?.position}`);
      let pay = payData?.data.docs;
      console.log(pay);
      setpayrowType(pay);
      console.log(alltransactions);

      const bill =
        Number(pay?.allowance) + Number(pay?.salary) + Number(pay?.bonus);

      let monthTrans = alltransactions.filter(
        (e) => Number(e?.month) === currentMonth
      );

      const paid = monthTrans?.reduce((accumulator, element) => {
        return Number(accumulator) + Number(element?.amount);
      }, 0);
      settotalBill(bill);
      settotalPaid(paid);
      setbalance(bill - paid);
      setloading(false);
    };
    getdata();
  }, [user]);

  const handleEditBank = () => {
    seteditLoading(true);
    axios
      .put(`/teachers/update/${user?.id}`, {
        bank,
        accountNumber,
      })
      .then(async (res) => {
        seteditLoading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          let staffData = await axios.get(`/teachers/${user?.id}`);
          let staff = staffData.data?.teacher;
          setaccountNumber(staff?.accountNumber);
          setbank(staff?.bank);
          return 0;
        }
        successAlert("Changes successfully saved");
        console.log(res.data);
        setopen(false);
      })
      .catch((err) => {
        console.log(err);
        seteditLoading(false);
        errorAlert("Changes Failed");
      });
  };

  const useStyles = makeStyles((theme) => ({
    container: {
      background: '#eef7ff',
      padding: theme.spacing(2),
      height: '100%'
    },
    paper: {
      border: '1px solid rgba(0, 0, 0, 0.12)',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
      borderRadius: theme.shape.borderRadius,
      overflow: 'hidden'
    },
    table: {
      '& .MuiTableCell-root': {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        padding: theme.spacing(2),
      },
      '& .MuiTableCell-head': {
        fontWeight: 600,
        backgroundColor: '#ffffff'
      }
    },
    title: {
      textAlign: 'center',
      marginBottom: theme.spacing(3),
      fontWeight: 600,
      color: 'black'
    },
    totalRow: {
      '& .MuiTableCell-root': {
        fontWeight: 600,
        borderBottom: 'none'
      }
    }
  }));

  const classes = useStyles();

  return (
    <div>
      <div className="row d-flex">
        <div className="col-sm-6">
          <div className="content__container mb-4" style={{ background: "#eef7ff" }}>
            <h3 style={{ marginTop: -6, marginBottom: "20px" }}>Salary Details</h3>
            <div>
              <div className="row  mb-3">
                <div className="col-sm-4">Position Role: </div>
                <div className="col-sm-8">{payrowType?.name}</div>
              </div>
              <div className="row  mb-3">
                <div className="col-sm-4">Monthy Salary: </div>
                <div className="col-sm-8">
                  <NumberFormat
                    value={payrowType?.salary}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={currentCurrency() + " "}
                  />
                </div>
              </div>
              <div className="row  mb-3">
                <div className="col-sm-4">Allowance: </div>
                <div className="col-sm-8">
                  <NumberFormat
                    value={payrowType?.allowance}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={currentCurrency() + " "}
                  />
                </div>
              </div>
              <div className="row  mb-3">
                <div className="col-sm-4">Bonus: </div>
                <div className="col-sm-8">
                  <NumberFormat
                    value={payrowType?.bonus}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={currentCurrency() + " "}
                  />
                </div>
              </div>
              <div className="row  mb-3">
                <div className="col-sm-4">Account Number: </div>
                <div className="col-sm-8">{accountNumber}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4">Bank Branch:</div>
                <div className="col-sm-8">
                  {bank} &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<EditIcon style={{ marginTop: -7 }} onClick={() => setopen(true)} /></div>
              </div>
            </div>
          </div>
        </div>
        <div className={`col-sm-6 ${classes.container}`}>
          <Typography variant="h5" className={classes.title}>
            This Month Pay
          </Typography>
          <TableContainer component={Paper} className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Payrow</TableCell>
                  <TableCell>Amount (Rs)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>SALARY</TableCell>
                  <TableCell>
                    <NumberFormat
                      value={totalBill}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={currentCurrency() + " "}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>PAID</TableCell>
                  <TableCell>
                    <NumberFormat
                      value={totalPaid}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={currentCurrency() + " "}
                    />
                  </TableCell>
                </TableRow>
                <TableRow className={classes.totalRow}>
                  <TableCell>Due Pay</TableCell>
                  <TableCell>
                    <NumberFormat
                      value={balance}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={currentCurrency() + " "}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {/* <div className="col-sm-6 mb-4" style={{ background: "#eef7ff" }}>
          <div
            // style={{ background: "#ffa201" }}

            className="d-flex flex-column align-items-center p-3  mb-4"
          >
            <h3 style={{ color: "black", border: "2px", }}>This Month Pay</h3>
            <table className="table" style={{ border: "2px" }}>
              <thead>
                <tr>
                  <th scope="col">Payrow</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> SALARY</td>
                  <td>
                    <NumberFormat
                      value={totalBill}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={currentCurrency()}
                    />
                  </td>
                </tr>
                <tr>
                  <td> PAID</td>
                  <td>
                    <NumberFormat
                      value={totalPaid}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={currentCurrency()}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Due Pay</strong>{" "}
                  </td>
                  <td>
                    <strong>
                      <NumberFormat
                        value={balance}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={currentCurrency()}
                      />
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> */}
      </div>

      <div className="mb-5">
        <h3>Salary Payments Records</h3>
        <TableList
          data={payrowData}
          loading={loading}
          noActions={true}
          tableHeader={tableHeader}
        />
      </div>

      <EditBank
        open={open}
        bank={bank}
        loading={editLoading}
        setbank={setbank}
        accountNumber={accountNumber}
        setaccountNumber={setaccountNumber}
        onSubmit={handleEditBank}
        setOpen={setopen}
      />
    </div>
  );
}

export default Payrow;
