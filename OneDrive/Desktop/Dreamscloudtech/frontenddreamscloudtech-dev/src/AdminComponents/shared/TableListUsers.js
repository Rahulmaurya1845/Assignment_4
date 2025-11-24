import React, { useState, useEffect } from "react";
import axios from "../../store/axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TablePagination from "@material-ui/core/TablePagination";
import { useHistory } from "react-router-dom";
import TableHeader from "./TableHeader";
import { getImgSrc, getIntial } from "../../utils";

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }


// function getComparator(order, orderBy) {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }



function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
// Count how many non-empty values a row has
function getFilledCount(row) {
  return Object.values(row).filter(
    (val) => val !== null && val !== undefined && val !== "" && val !== "-"
  ).length;
}

function descendingComparator(a, b, orderBy) {
  // 1️⃣ First compare by filled count
  const filledDiff = getFilledCount(b) - getFilledCount(a);
  if (filledDiff !== 0) {
    return filledDiff; // rows with more filled values come first
  }

  // 2️⃣ If filled counts are equal, fallback to column sorting
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "#fff",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(7),
    backgroundColor: "#EEF7FF",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: 0,
  },
  // table: {
  //   minWidth: 750,
  //   border: "1px solid #ddd",
  //   borderCollapse: "collapse",
  // },
  // tableContainer: {
  //   maxHeight: "70vh",
  //   overflowY: "auto",
  //   border: "1px solid #ddd",
  // },
  tableCell: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontFamily: "'poppins', serif",
    padding: "7px",
    fontSize: "14px",
    color: "#444",
    border: "1px solid #eee",
  },
  tableCell1: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontFamily: "'poppins', serif",
    fontSize: "14px",
    color: "#444",
    border: "none",
  },
  tableHeadCell: {
    backgroundColor: "#4fb1f6",
    color: "#000",
    fontFamily: "'poppins', serif",
    fontWeight: "bold",
    textAlign: "center",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    padding: "100px",
    // margin: "0 5px",
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
  // visuallyHidden: {
  //   border: 0,
  //   clip: "rect(0 0 0 0)",
  //   height: 1,
  //   margin: -1,
  //   overflow: "hidden",
  //   padding: 0,
  //   position: "absolute",
  //   top: 20,
  //   width: 1,
  // },
  icon: {
    color: "#555",
  },
  iconView: {
    color: "#8EC7FF",
  },
  iconEdit: {
    color: "#42d29d",
  },
  iconWithdraw: {
    color: "#3f51b5",
  },
  iconUnWithdraw: {
    color: "#f44336",
  },
  iconDelete: {
    color: "#f44336",
  },
  checkboxColumn: {
    width: "0px",
    border: "1px solid #ddd",
  },
  idColumn: {
    width: "00px",
    marginLeft: "10000000px",
  },
  avatarColumn: {
    width: "0px",
  },
  nameColumn: {
    width: "150px",
  },
  guardianColumn: {
    width: "00px",
  },
  statusColumn: {
    width: "00px",
  },
  classColumn: {
    width: "0px",
  },
  genderColumn: {
    width: "0px",
  },
  actionsColumn: {
    width: "0px",
  },
  fatherColumn: {
    width: "00px",
  },
  motherColumn: {
    width: "150px",
  },
}));

export default function EnhancedTable({
  students,
  headCells,
  route,
  handleDelete,
  noData,
  noActions,
}) {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selected, setSelected] = useState([]);
  const [dormitories, setDormitories] = useState({});
  const [page, setPage] = useState(0); // pagination page state
  const [rowsPerPage, setRowsPerPage] = useState(10); // pagination rows per page state
  const history = useHistory();

  const isFilled = (v) =>
    v !== null &&
    v !== undefined &&
    String(v).trim() !== "" &&
    v !== "-" &&
    v !== "Loading...";

  const getFatherName = (row) =>
    Array.isArray(row?.guadian)
      ? (row.guadian.find((g) => g.relationship === "Father")?.name || null)
      : null;

  const getMotherName = (row) =>
    Array.isArray(row?.guadian)
      ? (row.guadian.find((g) => g.relationship === "Mother")?.name || null)
      : null;

  // how many displayed fields are filled for this row
  const getFilledCount = (row) => {
    const values = [
      row?.userID,                                // StudentID
      row?.name || row?.surname,                  // Name
      getFatherName(row),                         // Father's Name
      getMotherName(row),                         // Mother's Name
      dormitories[row?.dormitoryID],              // Bus Route label
      row?.classID,                               // Class
      row?.gender,                                // Gender
    ];

    let count = 0;
    for (let i = 0; i < values.length; i++) {
      if (isFilled(values[i])) count++;
    }
    return count;
  };


  // completeness-first comparator, then fall back to your column sort
  const completenessFirstComparator = (a, b) => {
    const diff = getFilledCount(b) - getFilledCount(a); // DESC: more filled first
    if (diff !== 0) return diff;
    return getComparator(order, orderBy)(a, b);         // tie-breaker: your column sort
  };

  useEffect(() => {
    const fetchDormitories = async () => {
      const dormitoryMap = {};

      const storedDormitories = JSON.parse(localStorage.getItem("dormitories")) || [];

      storedDormitories.forEach((dorm) => {
        dormitoryMap[dorm.id] = dorm.name;
      });

      const remainingStudents = students.filter(
        (student) => !dormitoryMap[student.dormitoryID]
      );

      let queryStudents = [];
      if (remainingStudents.length > 0) {
        remainingStudents.forEach((student) => {
          if (student.dormitoryID === "") {
            if (student.dormitoryID.indexOf(student.dormitoryID) === -1)
              dormitoryMap[student.dormitoryID] = "No Bus Service";
          } else {
            queryStudents.push(student.dormitoryID);
          }
        });
      }
      if (queryStudents.length > 0) {
        const dormitoryPromises = queryStudents.map((id) =>
          axios
            .get(`/dormitories/${id}`)
            .then((res) => {
              if (res.data.success && res.data.docs) {
                return { id: id, name: res.data.docs.name };
              } else {
                return { id: id, name: "No Bus Service" };
              }
            })
            .catch(() => ({ id: id, name: "No Bus Service" }))
        );

        const dormitoryResults = await Promise.all(dormitoryPromises);

        dormitoryResults.forEach((dorm) => {
          dormitoryMap[dorm.id] = dorm.name;
          return dorm;
        });

        const updatedDormitories = [...storedDormitories, ...dormitoryResults];
        localStorage.setItem("dormitories", JSON.stringify(updatedDormitories));
      }

      setDormitories((prevState) => {
        if (JSON.stringify(prevState) !== JSON.stringify(dormitoryMap)) {
          return dormitoryMap;
        }
        return prevState;
      });
    };

    if (students.length > 0) {
      fetchDormitories();
    }
  }, [students]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = students.map((n) => n.userID);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, userID) => {
    const selectedIndex = selected.indexOf(userID);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, userID);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (userID) => selected.indexOf(userID) !== -1;

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate empty rows to avoid layout jump on last page
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, students.length - page * rowsPerPage);


  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer className={classes.tableContainer}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
            stickyHeader
          >
            <TableHeader
              classes={classes}
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              noActions={noActions}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={students?.length}
            />
            <TableBody>
              {students?.length > 0 ? (
                //  stableSort(students, getComparator(order, orderBy))
                stableSort(students, completenessFirstComparator)

                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Pagination slice
                  .map((row, index) => {
                    const isItemSelected = isSelected(row?.userID);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.userID}
                        selected={isItemSelected}
                        className={classes.tableRow}
                      >
                        <TableCell
                          padding="checkbox"
                          className={classes.checkboxColumn}
                        >
                          <Checkbox
                            onClick={(event) => handleClick(event, row?.userID)}
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        <TableCell
                          className={`${classes.tableCell} ${classes.idColumn}`}
                          align="left"
                        >
                          {row?.userID || "-"}
                        </TableCell>
                        <TableCell
                          className={`${classes.tableCell} ${classes.avatarColumn}`}
                          align="left"
                        >
                          <Avatar
                            src={`${getImgSrc(row?.profileUrl)}`}
                            alt={getIntial(row?.name)}
                          />
                        </TableCell>
                        <TableCell
                          className={`${classes.tableCell} ${classes.nameColumn}`}
                          align="left"
                        >
                          {row?.name} {row?.surname || ""}
                        </TableCell>
                        <TableCell
                          className={`${classes.tableCell} ${classes.fatherColumn}`}
                          align="left"
                        >
                          {row?.guadian?.length > 0
                            ? row.guadian.find((g) => g.relationship === "Father")
                              ?.name + " " + row.guadian.find((g) => g.relationship === "Father")
                              ?.lastname || "-"
                            : "-"}
                        </TableCell>


                        <TableCell
                          className={`${classes.tableCell} ${classes.motherColumn}`}
                          align="left"
                        >
                          {row?.guadian?.length > 0
                            ? row.guadian.find((g) => g.relationship === "Mother")
                              ?.name + " " + row.guadian.find((g) => g.relationship === "Mother")
                              ?.lastname || "-"
                            : "-"}
                        </TableCell>
                        <TableCell
                          className={`${classes.tableCell} ${classes.dormitoryColumn}`}
                          align="left"
                        >
                          {dormitories[row?.dormitoryID] || "No Bus Route"}
                        </TableCell>
                        <TableCell
                          className={`${classes.tableCell} ${classes.classColumn}`}
                          align="left"
                        >
                          {row?.classID || "-"}
                        </TableCell>
                        <TableCell
                          className={`${classes.tableCell} ${classes.genderColumn}`}
                          align="left"
                        >
                          {row?.gender || "-"}
                        </TableCell>
                        {!noActions && (
                          <TableCell
                            className={`${classes.tableCell} ${classes.actionsColumn}`}
                            align="left"
                          >
                            <IconButton
                              onClick={() => history.push(`/${route}/${row?.userID}`)}
                              aria-label="view"
                            >
                              <VisibilityIcon className={classes.iconView} />
                            </IconButton>
                            <IconButton
                              onClick={() =>
                                history.push(`/${route}/edit/${row?.userID}`)
                              }
                              aria-label="edit"
                            >
                              <EditIcon className={classes.iconEdit} />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete(row?.userID)}
                              aria-label="delete"
                            >
                              <DeleteIcon className={classes.iconDelete} />
                            </IconButton>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell
                    className={classes.noDataCell}
                    colSpan={headCells.length + 2}
                  >
                    {noData || "No data available"}
                  </TableCell>
                </TableRow>
              )}

              {/* Fill empty rows to maintain consistent height */}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={headCells.length + 2} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Controls */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={students?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Rows per page:"
        />
      </Paper>
    </div>
  );
}
