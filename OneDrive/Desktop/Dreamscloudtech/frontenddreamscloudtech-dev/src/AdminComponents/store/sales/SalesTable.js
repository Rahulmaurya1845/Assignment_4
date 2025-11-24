import React, { useState, useEffect } from "react";
import axios from "../../../store/axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import { Link } from "react-router-dom";
import { currentCurrency } from "../../../utils";
import TablePagination from "@material-ui/core/TablePagination";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 750,
    border: '1px solid #ddd',
    borderCollapse: 'collapse',
  },
  tableContainer: {
    maxHeight: "70vh",
    overflowY: "auto",
    backgroundColor: "#EEF7FF",
    border: '1px solid white',
    borderRadius: 0,
  },
  tableHeadCell: {
    backgroundColor: "#4fb1f6",
    color: "white",
    fontFamily: "'Poppins', serif",
    fontWeight: "bold",
    textAlign: "left",
    position: "sticky",
    top: 0,
    zIndex: 2,
    verticalAlign: "middle",
    padding: "16px",
    border: '1px solid #ddd',
    borderBottom: '2px solid white',
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: "2px",
      backgroundColor: "#ddd",
    }
  },
  tableCell: {
    fontFamily: "'Poppins', serif",
    fontSize: "14px",
    color: "#444",
    padding: "16px",
    verticalAlign: "middle",
    border: '1px solid #ddd',
  },
  tableRow: {
    "&:nth-of-type(even)": {
      backgroundColor: "#EEF7FF",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#FFFFFF",
    },
  },
  noDataCell: {
    textAlign: "center",
    color: "#fa6767",
    fontFamily: "'Baskerville', serif",
    padding: "16px",
  },
  amountCell: {
    textAlign: "left",
    fontFamily: "'Courier New', monospace",
    paddingRight: "32px",
    fontSize: "14px",
    border: '1px solid #ddd',
  },
  paginationContainer: {
    position: "sticky",
    bottom: 0,
    backgroundColor: "white",
    borderTop: "1px solid #ddd",
    zIndex: 999,
  },
}));

export default function CustomPaginationActionsTable({ data }) {
  const classes = useStyles();
  const [studentDetails, setStudentDetails] = useState({});

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      const studentData = {};

      for (const row of data) {
        try {
          const res = await axios.get(`/students/student/${row.name}`);
          const student = res.data.student;

          studentData[row.name] = {
            name: student?.name + " " + student?.surname || "-",
            classID: student?.classID?.toUpperCase() || "-",
            guardian: student?.guadian?.[0]?.name + " " + student?.guadian?.[0]?.lastname || "-",
          };
        } catch (error) {
          console.error("Error fetching student details:", error);
          studentData[row.name] = {
            name: "-",
            classID: "-",
            guardian: "-",
          };
        }
      }

      setStudentDetails(studentData);
    };

    if (data.length > 0) {
      fetchStudentDetails();
    }
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeadCell}>Date</TableCell>
              <TableCell className={classes.tableHeadCell}>Receipt</TableCell>
              <TableCell className={classes.tableHeadCell}>Student ID</TableCell>
              <TableCell className={classes.tableHeadCell}>Name</TableCell>
              <TableCell className={classes.tableHeadCell}>Class</TableCell>
              <TableCell className={classes.tableHeadCell}>Guardian</TableCell>
              <TableCell className={classes.tableHeadCell}>Amount ({currentCurrency()})</TableCell>
              <TableCell className={classes.tableHeadCell}>Pending ({currentCurrency()})</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length <= 0 ? (
              <TableRow>
                <TableCell colSpan={8} className={classes.noDataCell}>
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row._id} className={classes.tableRow}>
                    <TableCell className={classes.tableCell}>
                      {moment(row?.date)?.format("D MMMM YYYY")}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Link to={`/store/sales/receipt/${row?._id}`}>{row?._id}</Link>
                    </TableCell>
                    <TableCell className={classes.tableCell}>{row?.name}</TableCell>
                    <TableCell className={classes.tableCell}>{studentDetails[row.name]?.name || "Loading..."}</TableCell>
                    <TableCell className={classes.tableCell}>{studentDetails[row.name]?.classID || "Loading..."}</TableCell>
                    <TableCell className={classes.tableCell}>{studentDetails[row.name]?.guardian || "Loading..."}</TableCell>
                    <TableCell className={classes.amountCell}>
                      {row?.totalCost?.toLocaleString("en-US", { style: "decimal", minimumFractionDigits: 0 })}
                    </TableCell>
                    <TableCell className={classes.amountCell}>
                      {(row?.totalCost - row?.amountPaid)?.toLocaleString("en-US", {
                        style: "decimal",
                        minimumFractionDigits: 0,
                      })}
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Sticky Pagination */}
      <div className={classes.paginationContainer}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={data?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
}
