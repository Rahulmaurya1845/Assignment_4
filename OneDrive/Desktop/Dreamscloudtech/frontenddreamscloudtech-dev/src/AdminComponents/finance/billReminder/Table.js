import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Checkbox from "@material-ui/core/Checkbox";
import PaymentIcon from "@material-ui/icons/Payment";
import Tooltip from "@material-ui/core/Tooltip";

import TablePaginationActions from "../../../components/tables/TablePagination";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 750,
    backgroundColor: "#ffffff",
    borderCollapse: "collapse",
    border: "1px solid #ddd",
  },
  tableContainer: {
    maxHeight: "620px",
    backgroundColor: "#EEF7FF",
    border: "1px solid #ddd",
    borderRadius: 0,
    overflowY: "auto",
    position: "relative",
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
  tableHeadCell: {
    backgroundColor: "#4fb1f6",
    color: "#ffffff",
    fontFamily: "'Poppins', serif",
    fontWeight: "bold",
    textAlign: "left",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    verticalAlign: "middle",
    padding: "15px",
    paddingLeft: "5px",
    border: "1px solid #ddd",
  },
  tableCell: {
    fontFamily: "'Poppins', serif",
    fontSize: "14px",
    color: "#333",
    padding: "16px",
    paddingLeft: "7px",
    verticalAlign: "middle",
    border: "1px solid #ddd",
  },
  tableRow: {
    "&:nth-of-type(even)": {
      backgroundColor: "#f9f9f9",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#ffffff",
    },
  },
  noDataCell: {
    textAlign: "center",
    color: "#fa6767",
    fontFamily: "'Baskerville', serif",
    fontWeight: "bold",
    border: "1px solid #ddd",
  },
  actionIcons: {
    display: "flex",
    justifyContent: "space-around",
  },
  iconView: {
    color: "#42d29d",
    marginLeft: "1px",
  },
  iconPayment: {
    color: "#f44336",
    marginLeft: "1px",
  },
  iconReceipt: {
    color: "#2196f3",
    marginLeft: "1px",
  },
  paginationWrapper: {
    position: "sticky",
    bottom: 0,
    backgroundColor: "#EEF7FF",
    padding: theme.spacing(1),
    zIndex: 1000,
    borderTop: "1px solid #ddd",
  },
}));

export default function CustomPaginationActionsTable({
  data,
  tableHeader,
  loading,
  selected,
  setSelected,
}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data?.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.userID);
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
    } else if (selectedIndex === selected?.length - 1) {
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

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" className={classes.tableHeadCell}>
              <Checkbox
                indeterminate={
                  selected?.length > 0 && selected?.length < data?.length
                }
                checked={data?.length > 0 && selected?.length === data?.length}
                onChange={handleSelectAllClick}
                inputProps={{ "aria-label": "select all rows" }}
              />
            </TableCell>
            {tableHeader &&
              tableHeader.map((head) => (
                <TableCell
                  key={head.id}
                  align="left"
                  className={classes.tableHeadCell}
                >
                  {head.name}
                </TableCell>
              ))}
            <TableCell className={classes.tableHeadCell}>Action</TableCell>
          </TableRow>
        </TableHead>
        {loading ? (
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={tableHeader?.length + 2}
                className={classes.noDataCell}
              >
                Loading...
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {data?.length <= 0 ? (
              <TableRow>
                <TableCell
                  colSpan={tableHeader?.length + 2}
                  className={classes.noDataCell}
                >
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              (rowsPerPage > 0
                ? data.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data
              ).map((row, index) => {
                const isItemSelected = isSelected(row.userID);
                const labelId = `custom-pagination-checkbox-${index}`;

                return (
                  <TableRow
                    onClick={(event) => handleClick(event, row.userID)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                    key={row.userID}
                    className={classes.tableRow}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    {tableHeader &&
                      tableHeader.map((cell) => (
                        <TableCell
                          key={cell.id}
                          align="left"
                          className={classes.tableCell}
                        >
                          {cell.name === "Class"
                            ? row[cell.id]?.toUpperCase() || "-"
                            : row[cell.id] || "-"}
                        </TableCell>
                      ))}
                    <TableCell className={classes.tableCell}>
                      <div className={classes.actionIcons}>
                        <Tooltip title="View user" style={{ marginLeft: -10 }}>
                          <Link
                            to={`/students/${row.userID}`}
                            aria-label="view"
                          >
                            <ViewModuleIcon
                              className={classes.iconView}
                              style={{ marginLeft: -10 }}
                            />
                          </Link>
                        </Tooltip>
                        <Tooltip title="Make payment">
                          <Link
                            to={`/finance/students/fees`}
                            aria-label="payment"
                          >
                            <PaymentIcon className={classes.iconPayment} />
                          </Link>
                        </Tooltip>
                        <Tooltip title="View receipts">
                          <Link
                            to={`/finance/students`}
                            aria-label="receipt"
                          >
                            <ReceiptIcon className={classes.iconReceipt} />
                          </Link>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={tableHeader?.length + 2} />
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>

      {/* Sticky Pagination Outside the Table */}
      <div className={classes.paginationWrapper}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          count={data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </div>
    </TableContainer>
  );
}
