
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import ListTable from "./PaymentTable";
import axios from "../../../store/axios";
import { useHistory } from "react-router-dom";
import { errorAlert, successAlert, currentCurrency } from "../../../utils";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    background: "#4fb1f6",
    color: "#fff",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const tableHeader = [
  { id: "date", name: "Payment Date" },
  { id: "month", name: "Month" },
  { id: "year", name: "Year" },
  { id: "applyTo", name: "Fee Type" },
  { id: "amount", name: `Amount Paid (${currentCurrency()})` },
  { id: "Discount", name: `Discount (${currentCurrency()})` },
  { id: "paymentMethod", name: "Payment Mode" },
  { id: "bank", name: "Bank" },
  { id: "chequeNumber", name: "Cheque Number" },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewStudentPayment({
  open,
  setOpen,
  transactions,
  name,
  totalBill,
  totalPaid,
  balance,
}) {
  const classes = useStyles();
  const history = useHistory();

  const totalDiscount = transactions.reduce((acc, txn) => acc + (Number(txn.Discount) || 0), 0);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    axios.delete(`/transactions/delete/${id}`).then((res) => {
      if (res.data.error) {
        errorAlert(res.data.error);
        return;
      }
      successAlert("Transaction successfully cancelled");
      setOpen(false); // Close dialog after deletion
    }).catch((err) => {
      console.error("Error deleting transaction:", err);
      errorAlert("Failed to delete transaction.");
    });
  };

  const handleEdit = (id) => {
    history.push(`/finance/transactions/receipt/${id}`);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar color="default" className={classes.appBar}>
        <Toolbar className="py-4">
          <Typography
            variant="body1"
            className={classes.title}
            style={{ textAlign: "center", lineHeight: "2" }}
          >
            <strong>Name: {name}</strong> <br />
            <strong>Total Bill: {totalBill} Rs</strong> <br />
            <strong>Total Amount Paid: {totalPaid} Rs</strong> <br />
            <strong>Total Discount: {totalDiscount} Rs</strong> <br />
            <strong>Fees Due: {balance} Rs</strong>
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            <CloseIcon />
          </Button>
        </Toolbar>
      </AppBar>
      <div className="mt-5">
        <ListTable
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          noActions={true}
          data={transactions}
          tableHeader={tableHeader}
        />
      </div>
    </Dialog>
  );
}

// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import CloseIcon from "@material-ui/icons/Close";
// import Slide from "@material-ui/core/Slide";
// import ListTable from "./PaymentTable";
// import axios from "../../../store/axios";
// import { useHistory } from "react-router-dom";
// import { errorAlert, successAlert, currentCurrency } from "../../../utils";

// const useStyles = makeStyles((theme) => ({
//   appBar: {
//     position: "relative",
//     background: "#4fb1f6",
//     color: "#fff",
//   },
//   title: {
//     marginLeft: theme.spacing(2),
//     flex: 1,
//   },
// }));

// const tableHeader = [
//   { id: "date", name: "Payment Date" },
//   { id: "month", name: "Month" },
//   { id: "year", name: "Year" },
//   { id: "applyTo", name: "Fee Type" },
//   { id: "amount", name: `Amount Paid (${currentCurrency()})` },
//   { id: "Discount", name: `Discount (${currentCurrency()})` },
//   { id: "paymentMethod", name: "Payment Mode" },
//   { id: "bank", name: "Bank" },
//   { id: "chequeNumber", name: "Cheque Number" },
// ];

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// export default function ViewStudentPayment({
//   open,
//   setOpen,
//   transactions,
//   name,
//   totalBill,
//   totalPaid,
//   balance,
// }) {
//   const classes = useStyles();
//   const history = useHistory();

//   // Determine if all months are selected
//   const allMonths = [
//     "April", "May", "June", "July", "August", "September",
//     "October", "November", "December", "January", "February", "March"
//   ];
//   const selectedMonths = [...new Set(transactions.map(txn => txn.fees?.term))];
//   const isAllMonthsSelected = allMonths.every(month => selectedMonths.includes(month));

//   // Filter transactions to show only April to December of the first year when all months are selected
//   const displayTransactions = transactions.filter(txn => {
//     const transactionMonth = txn.fees?.term;
//     const transactionYear = txn.fees?.academicYear;
//     const firstYear = String(Math.min(...transactions.map(t => Number(t.fees?.academicYear) || Infinity)));

//     if (isAllMonthsSelected) {
//       return ["April", "May", "June", "July", "August", "September", "October", "November", "December"].includes(transactionMonth) && transactionYear === firstYear;
//     }
//     return true;
//   });

//   const totalDiscount = displayTransactions.reduce((acc, txn) => acc + (Number(txn.Discount) || 0), 0);

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleDelete = (id) => {
//     axios.delete(`/transactions/delete/${id}`).then((res) => {
//       if (res.data.error) {
//         errorAlert(res.data.error);
//         return;
//       }
//       successAlert("Transaction successfully cancelled");
//       setOpen(false);
//     }).catch((err) => {
//       console.error("Error deleting transaction:", err);
//       errorAlert("Failed to delete transaction.");
//     });
//   };

//   const handleEdit = (id) => {
//     history.push(`/finance/transactions/receipt/${id}`);
//   };

//   return (
//     <Dialog
//       fullScreen
//       open={open}
//       onClose={handleClose}
//       TransitionComponent={Transition}
//     >
//       <AppBar color="default" className={classes.appBar}>
//         <Toolbar className="py-4">
//           <Typography
//             variant="body1"
//             className={classes.title}
//             style={{ textAlign: "center", lineHeight: "2" }}
//           >
//             <strong>Name: {name}</strong> <br />
//             <strong>Total Bill: {totalBill} Rs</strong> <br />
//             <strong>Total Amount Paid: {totalPaid} Rs</strong> <br />
//             <strong>Total Discount: {totalDiscount} Rs</strong> <br />
//             <strong>Fees Due: {balance} Rs</strong>
//           </Typography>
//           <Button autoFocus color="inherit" onClick={handleClose}>
//             <CloseIcon />
//           </Button>
//         </Toolbar>
//       </AppBar>
//       <div className="mt-5">
//         <ListTable
//           handleEdit={handleEdit}
//           handleDelete={handleDelete}
//           noActions={true}
//           data={displayTransactions}
//           tableHeader={tableHeader}
//         />
//       </div>
//     </Dialog>
//   );
// }

// // import React from "react";
// // import { makeStyles } from "@material-ui/core/styles";
// // import Button from "@material-ui/core/Button";
// // import Dialog from "@material-ui/core/Dialog";
// // import AppBar from "@material-ui/core/AppBar";
// // import Toolbar from "@material-ui/core/Toolbar";
// // import Typography from "@material-ui/core/Typography";
// // import CloseIcon from "@material-ui/icons/Close";
// // import Slide from "@material-ui/core/Slide";
// // import ListTable from "./PaymentTable";
// // import axios from "../../../store/axios";
// // import { useHistory } from "react-router-dom";
// // import { errorAlert, successAlert, currentCurrency } from "../../../utils";
// // import { Link } from "react-router-dom";

// // const useStyles = makeStyles((theme) => ({
// //   appBar: {
// //     position: "relative",
// //     // background: "#051f3e",
// //     background: "#4fb1f6",
// //     color: "#fff",
// //   },
// //   title: {
// //     marginLeft: theme.spacing(2),
// //     flex: 1,
// //   },
// // }));

// // const tableHeader = [
// //   { id: "date", name: "Payment Date" },
// //   { id: "month", name: "Month" },
// //   { id: "year", name: "Year" },
// //   { id: "applyTo", name: "Fee Type" },
// //   { id: "amount", name: `Amount Paid (${currentCurrency()})` },
// //   { id: "paymentMethod", name: "Payment Mode" },
// //   { id: "bank", name: "Bank" },
// //   { id: "chequeNumber", name: "Cheque Number" },
// // ];

// // const Transition = React.forwardRef(function Transition(props, ref) {
// //   return <Slide direction="up" ref={ref} {...props} />;
// // });

// // export default function ViewStudentPayment({
// //   open,
// //   setOpen,
// //   transactions,
// //   name,
// //   totalBill,
// //   totalPaid,
// //   balance,
// // }) {
// //   const classes = useStyles();
// //   const history = useHistory();
// //   const handleClose = () => {
// //     setOpen(false);
// //   };
// //   const i = ""
// //   const handleDelete = (id) => {
// //     axios.delete(`/transactions/delete/${id}`).then((res) => {
// //       i = id
// //       if (res.data.error) {
// //         errorAlert(res.data.error);
// //         return 0;
// //       }
// //       successAlert("Transaction successfully cancelled");
// //     });
// //   };
// //   console.log(i)
// //   const handleEdit = (id) => {
// //     history.push(`/finance/transactions/receipt/${id}`);
// //   };

// //   return (
// //     <Dialog
// //       fullScreen
// //       open={open}
// //       onClose={handleClose}
// //       TransitionComponent={Transition}
// //     >
// //       <AppBar color="default" className={classes.appBar}>
// //         <Toolbar className="py-4">
// //           {/* <Typography variant="body1" className={classes.title} style={{ textAlign: "center" }}>
// //             <strong>Name: {name} </strong> <br />
// //             <strong>Total Bill: {totalBill} Rs</strong> <br />
// //             <strong>Total Amount Paid: {totalPaid} Rs</strong> <br />
// //             <strong>Fees Due: {balance} Rs</strong>
// //           </Typography> */}
// //           <Typography
// //             variant="body1"
// //             className={classes.title}
// //             style={{ textAlign: 'center', lineHeight: '2' }} // Center alignment and increased line height for spacing
// //           >
// //             <strong>Name: {name}</strong> <br />
// //             <strong>Total Bill: {totalBill} Rs</strong> <br />
// //             <strong>Total Amount Paid: {totalPaid} Rs</strong> <br />
// //             <strong>Fees Due: {balance} Rs</strong>

// //           </Typography>
// //           <Button autoFocus color="inherit" onClick={handleClose}>
// //             <CloseIcon />
// //           </Button>
// //         </Toolbar>
// //       </AppBar>
// //       <div className="mt-5">
// //         <ListTable
// //           handleEdit={handleEdit}
// //           handleDelete={handleDelete}
// //           noActions={true}
// //           data={transactions}
// //           tableHeader={tableHeader}
// //         />
// //       </div>
// //     </Dialog>
// //   );
// // }
