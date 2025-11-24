import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#4fb1f6",
    color: theme.palette.common.white,
     border: '1px solid #ddd',
    fontWeight: "bold",
    fontFamily: "'Poppins', sans-serif",
    padding: "16px",
    fontSize: 16,
    position: "sticky",
    top: 0,
    zIndex: 1000,
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: 0,
      width: "100%",
      borderBottom: "1px solid #ddd",
    },
  },
  body: {
    fontSize: 14,
    fontWeight: 500,
    border: '1px solid #ddd',
    fontFamily: "'Poppins', sans-serif",
    color: "#444",
    padding: "16px",
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
    borderCollapse: 'collapse',
    width: '100%',
    tableLayout: 'fixed',
  },
  checkbox: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  tableContainer: {
    border: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    maxHeight: '500px',
    backgroundColor: '#EEF7FF',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#888',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#555',
    },
  },
});

export default function CustomizedTables({
  isStaff,
  handleResetAttendance,
  attendanceData,
  setattendanceData,
  loading,
  handleRegister,
  isClass,
  isEdit,
}) {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const registerStudent = (id) => {
    const objIndex = attendanceData.findIndex((data) => data.userID === id);
    const updatedObj = {
      ...attendanceData[objIndex],
      status: !attendanceData[objIndex].status,
    };
    const updatedProjects = [
      ...attendanceData.slice(0, objIndex),
      updatedObj,
      ...attendanceData.slice(objIndex + 1),
    ];
    setattendanceData(updatedProjects);
  };

  const handleReset = () => {
    const newData = attendanceData.map((data) => ({
      ...data,
      status: false,
    }));
    setattendanceData(newData);
  };

  const paginatedData = attendanceData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
              <StyledTableCell align="left">
                {isStaff ? "Staff ID" : "Student ID"}
              </StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Last Name</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <StyledTableRow key={row?.userID}>
                  <StyledTableCell>{row?.userID}</StyledTableCell>
                  <StyledTableCell>{row?.name}</StyledTableCell>
                  <StyledTableCell>{row?.surname}</StyledTableCell>
                  <StyledTableCell>
                    <div className="form-check">
                      <input
                        className={`${classes.checkbox} form-check-input`}
                        type="checkbox"
                        onChange={() => registerStudent(row?.userID)}
                        checked={row?.status}
                      />
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={4} align="center">
                  {isStaff ? "No Staff data" : "No students in this class"}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={attendanceData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <div className="my-3 d-flex justify-content-end">
        <div>
          <button
            onClick={handleRegister}
            disabled={loading || !attendanceData.length}
            className="btn green__btn mr-2"
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
              ></span>
            )}
            {isEdit ? "Submit" : "Submit"}
          </button>
          {isEdit ? (
            <button onClick={handleResetAttendance} className="btn red__btn">
              Cancel Changes
            </button>
          ) : (
            <button className="btn red__btn" onClick={handleReset}>
              Reset
            </button>
          )}
        </div>
      </div>
    </>
  );
}
