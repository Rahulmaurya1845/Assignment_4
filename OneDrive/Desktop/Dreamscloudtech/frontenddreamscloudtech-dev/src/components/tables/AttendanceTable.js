import React, { useState, useEffect } from "react";
import {
  withStyles,
  makeStyles,
} from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@material-ui/core";
import moment from "moment";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#4fb1f6",
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontFamily: "'Poppins', sans-serif",
    padding: "8px",
    fontSize: 18,
    border: "1px solid #ddd",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  body: {
    fontSize: 14,
    fontFamily: "'Poppins', sans-serif",
    color: "#444",
    padding: "8px",
    border: "1px solid #ddd",
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#FFFFFF",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#EEF7FF",
    },
  },
}))(TableRow);

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 750,
    borderCollapse: "collapse",
    border: "1px solid #ddd",
    tableLayout: "fixed",
  },
  tableContainer: {
    maxHeight: "500px",
    backgroundColor: "#EEF7FF",
    borderRadius: 0,
    border: "1px solid #ddd",
    overflowY: "auto",
    position: "relative",
  },
  noDataCell: {
    textAlign: "center",
    color: "#fa6767",
    fontFamily: "'Baskerville', serif",
    padding: "16px",
    border: "1px solid #ddd",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    padding: "0 16px",
    gap: "16px",
  },
  buttonGroup: {
    display: "flex",
    gap: "8px",
  },
  pagination: {
    position: "sticky",
    bottom: 0,
    backgroundColor: "#fff",
    borderTop: "1px solid #ddd",
    zIndex: 999,
  },
}));

export default function CustomizedTables({ attendanceData = [], userID }) {
  const classes = useStyles();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (!Array.isArray(attendanceData)) {
      setFilteredData([]);
      return;
    }
    const sortedData = [...attendanceData].sort(
      (a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0)
    );
    setFilteredData(sortedData);
  }, [attendanceData]);

  const handleFilter = () => {
    if (startDate && endDate) {
      const filtered = attendanceData.filter((row) => {
        const rowDate = moment(row.createdAt);
        return rowDate.isBetween(startDate, endDate, "day", "[]");
      });
      setFilteredData(filtered);
      setIsFiltered(true);
      setPage(0); // Reset to first page on filter
    }
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    const sortedData = [...attendanceData].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setFilteredData(sortedData);
    setIsFiltered(false);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <div className={classes.searchContainer}>
        <h3>Attendance List</h3>
        <div className="row mb-4">
          <label>Start Date</label>
          <input
            type="date"
            className="form-control py-3"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="row mb-4">
          <label>End Date</label>
          <input
            type="date"
            className="form-control py-3"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className={classes.buttonGroup}>
          <button className="btn blue__btn" onClick={handleFilter}>
            Filter
          </button>
          <button className="btn red__btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table
          className={classes.table}
          stickyHeader
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>
                {filteredData[0]?.role !== "staff" ? "Class ID" : "User ID"}
              </StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell>{row.classID.toUpperCase()}</StyledTableCell>
                  <StyledTableCell>
                    {moment(row.createdAt).format("DD MMMM YYYY")}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.users
                      .filter((user) => user.userID === userID)
                      .map((filteredUser) => (
                        <span key={filteredUser._id}>
                          {filteredUser.status ? "✅ Present" : "❌ Absent"}
                        </span>
                      ))}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <StyledTableCell colSpan={3} className={classes.noDataCell}>
                  No data found
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          className={classes.pagination}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
}
