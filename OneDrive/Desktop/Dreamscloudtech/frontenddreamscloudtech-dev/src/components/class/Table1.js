import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import { getImgSrc, getIntial } from '../../utils';
import ViewActions from '../../AdminComponents/shared/ViewOptions';
import { baseURL } from 'src/store/axios';

// Styled Components
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

// Custom styles
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
  pagination: {
    position: "sticky",
    bottom: 0,
    backgroundColor: "#fff",
    borderTop: "1px solid #ddd",
    zIndex: 999,
  },
  actionButton: {
    color: "#fff",
    margin: "0 4px",
  },
  editIcon: {
    color: "#42d29d",
  },
  deleteIcon: {
    color: "#f44336",
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function EnhancedCustomTable({
  students,
  route,
  handleWithdraw,
  handleDelete,
  noData,
  noActions,
}) {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dormitories, setDormitories] = useState({});
  const [routesAndDorms, setRoutesAndDorms] = useState({});

  useEffect(() => {
    const fetchDormitories = async () => {
      try {
        const response = await fetch(`${baseURL}/dormitories`);
        const data = await response.json();
        const dormMap = {};
        data.docs.forEach(dorm => {
          dormMap[dorm._id] = dorm.name;
        });
        setDormitories(dormMap);
      } catch (error) {
        console.error('Error fetching dormitories:', error);
      }
    };

    fetchDormitories();
  }, []);

  useEffect(() => {
    const fetchRoutesAndDorms = async () => {
      const storedData = JSON.parse(localStorage.getItem('routesAndDorms')) || {};
      setRoutesAndDorms(storedData);

      const missingIds = students
        .filter(student => !storedData[student.dormitoryID] || !storedData[student.busRouteID])
        .map(student => [student.dormitoryID, student.busRouteID])
        .flat()
        .filter((value, index, self) => self.indexOf(value) === index);

      if (missingIds.length > 0) {
        const newData = { ...storedData };
        for (const id of missingIds) {
          try {
            const response = await fetch(`${baseURL}/dormitories/${id}`);
            const data = await response.json();
            if (data.success && data.docs) {
              newData[id] = data.docs.name;
            } else {
              newData[id] = "N/A";
            }
          } catch (error) {
            console.error('Error fetching data:', error);
            newData[id] = "N/A";
          }
        }
        setRoutesAndDorms(newData);
        localStorage.setItem('routesAndDorms', JSON.stringify(newData));
      }
    };

    if (students.length > 0) {
      fetchRoutesAndDorms();
    }
  }, [students]);

  const headCells = [
    { id: 'userID', numeric: false, label: 'User ID' },
    { id: 'avatar', numeric: false, label: 'Avatar' },
    { id: 'name', numeric: false, label: 'Name' },
    { id: 'surname', numeric: false, label: 'Surname' },

    { id: 'dormitory', numeric: false, label: 'Bus Route' },

    { id: 'gender', numeric: false, label: 'Gender' },


  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (userID) => selected.indexOf(userID) !== -1;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell padding="checkbox">
              <Checkbox
                indeterminate={selected.length > 0 && selected.length < students.length}
                checked={students.length > 0 && selected.length === students.length}
                onChange={handleSelectAllClick}
                inputProps={{ 'aria-label': 'select all students' }}
              />
            </StyledTableCell>
            {headCells.map((headCell) => (
              <StyledTableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                {headCell.label}
              </StyledTableCell>
            ))}
            {!noActions && <StyledTableCell align="left">Action</StyledTableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {students?.length > 0 ? (
            stableSort(students, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.userID);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <StyledTableRow
                    // hover
                    onClick={(event) => handleClick(event, row.userID)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.userID}
                    selected={isItemSelected}
                  >
                    <StyledTableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.userID}</StyledTableCell>
                    <StyledTableCell align="left">
                      <Avatar
                        className={classes.avatar}
                        src={`${getImgSrc(row.profileUrl)}`}
                        alt={getIntial(row.name)}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                    <StyledTableCell align="left">{row.surname || '-'}</StyledTableCell>

                    <StyledTableCell align="left">
                      {routesAndDorms[row.dormitoryID] === "N/A"
                        ? "No Bus Service"
                        : routesAndDorms[row.dormitoryID] || "Loading..."}
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      {row.gender === 'male' ? 'Male' : row.gender === 'female' ? 'Female' : '-'}
                    </StyledTableCell>


                    {!noActions && (
                      <StyledTableCell align="left">
                        <ViewActions
                          id={row.userID}
                          route={route}
                          isWithdraw={row.withdraw}
                          handleWithdraw={handleWithdraw}
                          handleDelete={handleDelete}
                        />
                      </StyledTableCell>
                    )}
                  </StyledTableRow>
                );
              })
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={headCells.length + 2} align="center">
                {noData || 'NO DATA'}
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
      {students?.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={students.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </TableContainer>
  );
}

