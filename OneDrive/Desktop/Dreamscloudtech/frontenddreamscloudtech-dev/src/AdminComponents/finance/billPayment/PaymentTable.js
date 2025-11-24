import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import CloseIcon from "@material-ui/icons/Close";
import TablePagination from "@material-ui/core/TablePagination";
import moment from "moment";

const useStyles = makeStyles({
  tableContainer: {
    maxHeight: "70vh",
    overflowY: "auto",
    border: '1px solid #ddd',
    borderRadius: 0,
  },
  stickyHeader: {
    position: "sticky",
    top: 0,
    backgroundColor: "#4fb1f6",
    color: "#fff",
    zIndex: 1000,
    fontFamily: "'Times New Roman', serif",
    fontWeight: "bold",
    textAlign: "center",
  },
  table: {
    width: "100%",
    border: '1px solid #ddd',
    borderCollapse: 'collapse',
  },
  tableCell: {
    whiteSpace: "nowrap",
    overflow: "visible",
    fontFamily: "'Baskerville', serif",
    padding: "16px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#444",
    textAlign: "center",
    border: '1px solid #ddd',
  },
  tableHeadCell: {
    backgroundColor: "#4fb1f6",
    color: "#fff",
    border: '1px solid #ddd',
    borderBottom: '2px solid #ddd',
    position: "sticky",
    top: 0,
    zIndex: 2,
  },
  noDataCell: {
    textAlign: "center",
    color: "#fa6767",
    fontFamily: "'Baskerville', serif",
  },
  tableRow: {
    "&:nth-of-type(even)": {
      backgroundColor: "#EEF7FF",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#ffffff",
    },
  },
  actionIcons: {
    backgroundColor: "red",
    color: "#EEF7FF",
    borderRadius: "5px",
    margin: "0 5px",
    padding: "5px",
    "&:hover": {
      backgroundColor: "#fa6767",
    },
  },
  actionIcons2: {
    backgroundColor: "#05e278",
    color: "#EEF7FF",
    borderRadius: "5px",
    margin: "0 5px",
    padding: "5px",
    "&:hover": {
      backgroundColor: "#2ad78f",
    },
  },
  paginationContainer: {
    position: "sticky",
    bottom: 0,
    backgroundColor: "white",
    borderTop: "1px solid #ddd",
    zIndex: 999,
  },
});

export default function CustomPaginationActionsTable({
  data,
  tableHeader,
  handleEdit,
  handleDelete,
  loading,
  noData,
}) {
  const classes = useStyles();
  const [sortedData, setSortedData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const sorted = [...data].sort((a, b) => {
      const dateDiff = moment(b.date).diff(moment(a.date));
      if (dateDiff !== 0) return dateDiff;

      return -1;
    });

    setSortedData(sorted);
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isDate = (string) => {
    const _regExp = new RegExp(
      "^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$"
    );
    return _regExp.test(string);
  };

  const getFeeType = (applyTo) => {
    if (applyTo.all) return "Aggregated Fee";
    const feeTypes = [];
    if (applyTo.tuition) feeTypes.push("Tuition Fee");
    if (applyTo.examination) feeTypes.push("Examination Fee");
    if (applyTo.facility) feeTypes.push("Transport Fee");
    if (applyTo.maintenance) feeTypes.push("Maintenance Fee");
    if (applyTo.admission) feeTypes.push("Admission Fee");

    return feeTypes.length !== 1 ? "Aggregated Fee" : feeTypes[0] || "N/A";
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead className={classes.stickyHeader}>
            <TableRow>
              {tableHeader &&
                tableHeader.map((head) => (
                  <TableCell key={head.id} className={`${classes.tableCell} ${classes.tableHeadCell}`}>
                    {head.name}
                  </TableCell>
                ))}
              <TableCell className={`${classes.tableCell} ${classes.tableHeadCell}`}>Actions</TableCell>
            </TableRow>
          </TableHead>
          {loading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={tableHeader.length + 1} align="center">
                  <span className="spinner-grow spinner-grow-sm" role="status"></span>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {sortedData.length <= 0 ? (
                <TableRow>
                  <TableCell className={classes.noDataCell} colSpan={tableHeader.length + 1}>
                    {noData || "No Data"}
                  </TableCell>
                </TableRow>
              ) : (
                sortedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row._id} className={classes.tableRow}>
                      {tableHeader &&
                        tableHeader.map((cell) => (
                          <TableCell key={cell.id} align="center" className={classes.tableCell}>
                            {cell.id === "applyTo"
                              ? getFeeType(row.fees?.applyTo)
                              : cell.id === "month"
                                ? row.fees?.term || "N/A"
                                : cell.id === "name"
                                  ? `${row.name || ""} ${row.surname || ""}`.trim() || "N/A"
                                  : cell.id === "guardianName"
                                    ? row.guardianName || "N/A"
                                    : cell.id === "year"
                                      ? row.fees?.academicYear || "N/A"
                                      : isDate(row[cell.id])
                                        ? moment(row[cell.id]).format("D MMMM YYYY")
                                        : row[cell.id] || "NULL"}
                          </TableCell>
                        ))}
                      <TableCell align="center" className={classes.tableCell}>
                        <div className="d-flex align-items-center justify-content-center">
                          <IconButton
                            className={classes.actionIcons2}
                            onClick={() => handleEdit(row._id)}
                          >
                            <LocalAtmIcon />
                          </IconButton>
                          <IconButton
                            className={classes.actionIcons}
                            onClick={() => handleDelete(row._id)}
                          >
                            <CloseIcon />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      {/* Sticky pagination */}
      <div className={classes.paginationContainer}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={sortedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
}
