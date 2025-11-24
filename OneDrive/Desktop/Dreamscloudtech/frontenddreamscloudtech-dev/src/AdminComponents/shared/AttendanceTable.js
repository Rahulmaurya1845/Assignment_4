import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import { Link } from "react-router-dom";
import { Box, Typography, Divider } from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#4fb1f6",
    color: theme.palette.common.white,
    fontWeight: "bold",
    // border: "1px solid white",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    textAlign: "center",
  },
  body: {
    fontSize: 14,
    fontWeight: 500,
    border: "1px solid #ddd",
    padding: "8px",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#ffffff",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#EEF7FF",
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    borderCollapse: "collapse",
    border: "1px solid #ddd",
  },
  list: {
    listStyle: "none",
  },
  iconSize: {
    width: 20,
    height: 20,
  },
  textDanger: {
    color: "red",
  },
  tableContainer: {
    maxHeight: "600px",
    overflowY: "auto",
    border: "1px solid #ddd",
    borderRadius: "0px",
  },
  noDataMessage: {
    textAlign: "center",
    color: "#fa6767",
    fontFamily: "'Baskerville', serif",
    fontWeight: "bold",
    padding: "20px",
    border: "1px solid #ddd",
  },
});

export default function CustomizedTables({ attendanceData, isStaff, isClass }) {
  const classes = useStyles();

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const sortedData = [...attendanceData].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Flatten the users array
  const flattenedRows = sortedData.flatMap((row) =>
    row.users?.map((user) => ({
      user,
      row,
    }))
  );

  const getAttendanceStats = () => {
    if (sortedData.length === 0) return null;

    const latestRecord = sortedData[0];
    const latestDate = moment(latestRecord.createdAt).format("Do MMMM YYYY");
    const totalStudents = latestRecord.users?.length || 0;
    const presentStudents = latestRecord.users?.filter((user) => user.status).length || 0;
    const absentStudents = totalStudents - presentStudents;

    return {
      date: latestDate,
      total: totalStudents,
      present: presentStudents,
      absent: absentStudents,
    };
  };

  const attendanceStats = getAttendanceStats();

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
        <Table
          className={classes.table}
          stickyHeader
          aria-label="customized table with sticky header"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Date</StyledTableCell>
              {(!isStaff || !isClass) && (
                <StyledTableCell align="left">ClassID</StyledTableCell>
              )}
              <StyledTableCell align="center">
                {isStaff ? "Staff ID" : "Student ID"}
              </StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Present/Absent</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flattenedRows.length > 0 ? (
              flattenedRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(({ user, row }) => (
                  <StyledTableRow key={`${row._id}-${user.userID}`}>
                    <StyledTableCell>
                      {moment(row.createdAt).format("Do MMMM YYYY")}
                    </StyledTableCell>
                    {(!isStaff || !isClass) && (
                      <StyledTableCell>{row.classID.toUpperCase()}</StyledTableCell>
                    )}
                    <StyledTableCell>{user.userID}</StyledTableCell>
                    <StyledTableCell>
                      {user.name} {user.surname}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {user.status ? <div>✅</div> : <div>❌</div>}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Link
                        to={
                          isStaff
                            ? `/attendance/staff/edit/${row._id}`
                            : `/attendance/students/edit/${row.classID}/${row._id}`
                        }
                      >
                        <EditIcon />
                      </Link>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
            ) : (
              <TableRow>
                <StyledTableCell colSpan={6} className={classes.noDataMessage}>
                  No data
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* Table Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={flattenedRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Attendance Statistics Summary */}
      {attendanceStats && (
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
            Attendance Summary for {attendanceStats.date}
          </Typography>
          <Divider style={{ marginBottom: "10px" }} />
          <Box
            display="flex"
            justifyContent="space-between"
            px={4}
            style={{ color: "blue" }}
          >
            <Box textAlign="center">
              <Typography variant="subtitle1">Total Students</Typography>
              <Typography variant="h5">{attendanceStats.total}</Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="subtitle1" style={{ color: "green" }}>
                Present
              </Typography>
              <Typography variant="h5" style={{ color: "green" }}>
                {attendanceStats.present}
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="subtitle1" style={{ color: "red" }}>
                Absent
              </Typography>
              <Typography variant="h5" style={{ color: "red" }}>
                {attendanceStats.absent}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
