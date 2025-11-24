import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import { currentCurrency, errorAlert, successAlert } from "../../../utils";
import axios from "../../../store/axios";

const useStyles2 = makeStyles((theme) => ({
  table: {
    width: "100%",
    minWidth: 750,
    border: "1px solid #ddd",
    borderCollapse: "collapse",
    fontFamily: "'Poppins', serif",
    fontSize: "14px",
    tableLayout: "fixed",
  },
  tableContainer: {
    maxHeight: "70vh",
    overflowY: "auto",
    backgroundColor: "#EEF7FF",
    border: "1px solid #ddd",
    borderRadius: 0,
    marginBottom: theme.spacing(7),
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f1f1f1",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#888",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#555",
    },
  },
  tableCell: {
    padding: "7px",
    border: "1px solid #ddd",
    fontFamily: "'Poppins', serif",
    fontSize: "14px",
    fontWeight: 500,
    color: "#444",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    backgroundColor: "#ffffff",
  },
  actionsCell: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "7px",
    border: "1px solid #ddd",
    backgroundColor: "#ffffff",
  },
  headerCell: {
    backgroundColor: "#4fb1f6",
    color: "white",
    fontWeight: "bold",
    fontFamily: "'Poppins', serif",
    fontSize: "16px",
    textAlign: "center",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    padding: "10px",
    border: "1px solid #ddd",
  },
  tableRow: {
    "&:nth-of-type(even)": {
      backgroundColor: "#EEF7FF",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#FFFFFF",
    },
    "&:hover": {
      backgroundColor: "#f9f9f9",
    },
  },
  iconButton: {
    color: "#42d29d",
    padding: "6px",
    marginRight: "10px",
  },
  iconButton2: {
    color: "#f44336",
    padding: "6px",
    marginTop: "20px",
    marginBottom: "20px",
  },
  paginationContainer: {
    position: "sticky",
    bottom: 0,
    backgroundColor: "#EEF7FF",
    borderTop: "1px solid #ddd",
    zIndex: 999,
  },
  noDataCell: {
    textAlign: "center",
    color: "#fa6767",
    fontFamily: "'Poppins', serif",
    fontWeight: "bold",
    border: "1px solid #ddd",
    padding: "10px",
  },
}));

function Transportfeestable({ tableHeader, data }) {
  const classes = useStyles2();

  const handleDelete = (id) => {
    axios.delete(`/transport/remove-fees/${id}`).then((res) => {
      if (res.data.success) {
        successAlert("Transport fees deleted successfully");
        window.location.reload();
      } else {
        errorAlert("Something went wrong");
      }
    });
  };

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align="center" className={classes.headerCell}>
              UniqueID
            </TableCell>
            <TableCell align="center" className={classes.headerCell}>
              Village Name
            </TableCell>
            <TableCell align="center" className={classes.headerCell}>
              Amount
            </TableCell>
            <TableCell align="center" className={classes.headerCell}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((row) => (
              <TableRow key={row?.uniqueId} className={classes.tableRow}>
                <TableCell align="left" className={classes.tableCell}>
                  {row?.uniqueId}
                </TableCell>
                <TableCell align="left" className={classes.tableCell}>
                  {row?.village}
                </TableCell>
                <TableCell align="left" className={classes.tableCell}>
                  {row?.amount}
                </TableCell>
                <TableCell align="center" className={classes.actionsCell}>
                  <IconButton
                    className={classes.iconButton2}
                    onClick={() => handleDelete(row.uniqueId)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={tableHeader.length + 1}
                className={classes.noDataCell}
              >
                Fees not set yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Transportfeestable;
