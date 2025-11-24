import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    width: "100%",
    "& .MuiTableCell-head": {
      backgroundColor: "#0099ff",
      color: "white",
      fontWeight: "bold",
      padding: "16px",
    },
    "& .MuiTableRow-root": {
      "&:nth-of-type(odd)": {
        backgroundColor: "#eef7ff",
      },
    },
    "& .MuiTableCell-body": {
      padding: "16px",
      borderBottom: "2px solid #e0e0e0",
    },
  },
  tableContainer: {
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  noData: {
    padding: "20px",
    textAlign: "center",
    color: "#dc3545",
  },
});

function SbaTable({ rows }) {
  const classes = useStyles();

  const getTotal = (exams, work) => {
    if (!exams && !work) {
      return "-";
    }
    return Number(exams) + Number(work);
  };

  const getGrade = (classwork, exam) => {
    if (!classwork && !exam) {
      return "-";
    }
    let num = getTotal(classwork, exam);
    if (num >= 75 && num <= 100) {
      return "A1";
    } else if (num >= 70 && num <= 74) {
      return "B2";
    } else if (num >= 65 && num <= 69) {
      return "B3";
    } else if (num >= 60 && num <= 64) {
      return "C4";
    } else if (num >= 55 && num <= 59) {
      return "C5";
    } else if (num >= 50 && num <= 54) {
      return "C6";
    } else if (num >= 45 && num <= 49) {
      return "D7";
    } else if (num >= 40 && num <= 44) {
      return "E8";
    } else if (num >= 0 && num <= 39) {
      return "F9";
    } else {
      return null;
    }
  };

  const getInterpretation = (classwork, exam) => {
    if (!classwork && !exam) {
      return "-";
    }
    let num = getTotal(classwork, exam);
    num = Number(num);
    if (num > 75 && num <= 100) {
      return "Excellent";
    } else if (num >= 70 && num <= 74) {
      return "Very good";
    } else if (num >= 65 && num <= 69) {
      return "Good";
    } else if (num >= 60 && num <= 64) {
      return "Credit";
    } else if (num >= 55 && num <= 59) {
      return "Credit";
    } else if (num >= 50 && num <= 54) {
      return "Credit";
    } else if (num >= 45 && num <= 49) {
      return "Pass";
    } else if (num >= 40 && num <= 44) {
      return "Pass";
    } else if (num >= 0 && num <= 39) {
      return "Failure";
    } else {
      return null;
    }
  };

  return (
    <div className="">
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>Name of Student</TableCell>
              <TableCell>ClassWork</TableCell>
              <TableCell>ClassWork %</TableCell>
              <TableCell>Exam</TableCell>
              <TableCell>Exam %</TableCell>
              <TableCell>Total %</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Interpretation</TableCell>
              <TableCell>Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow key={row?._id}>
                <TableCell>{row?.name}</TableCell>
                <TableCell>{row?.classWork}</TableCell>
                <TableCell>{row?.classWorkPercentage}</TableCell>
                <TableCell>{row?.exam || "-"}</TableCell>
                <TableCell>{row?.examPercentage || "-"}</TableCell>
                <TableCell>
                  {getTotal(row?.examPercentage, row?.classWorkPercentage)}
                </TableCell>
                <TableCell>
                  {getGrade(row?.examPercentage, row?.classWorkPercentage)}
                </TableCell>
                <TableCell>
                  {getInterpretation(
                    row?.examPercentage,
                    row?.classWorkPercentage
                  )}
                </TableCell>
                <TableCell>{row?.position}</TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className={classes.noData}>
                  No data yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SbaTable;

