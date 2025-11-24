import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Tooltip from "@material-ui/core/Tooltip";
import TocIcon from "@material-ui/icons/Toc";
import moment from "moment";
import TablePagination from "@material-ui/core/TablePagination";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#4fb1f6",
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontFamily: "'Poppins', sans-serif",
    padding: "16px",
    fontSize: 18,
    border: "1px solid #ddd",
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
    fontFamily: "'Poppins', sans-serif",
    color: "#444",
    padding: "16px",
    border: "1px solid #ddd",
  },
}))(TableCell);

const StyledTableCellSmall = withStyles((theme) => ({
  head: {
    backgroundColor: "#4fb1f6",
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontFamily: "'Poppins', sans-serif",
    padding: "0px",
    fontSize: 18,
    border: "1px solid #ddd",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: 0,
      width: "100%",
      borderBottom: "1px solid white",
    },
  },
  body: {
    fontSize: 14,
    fontFamily: "'Poppins', sans-serif",
    color: "#444",
    padding: "0px",
    border: "1px solid #ddd",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#FFFFFF",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#EEF7FF",
    },
  },
}))(TableRow);

const useStyles2 = makeStyles((theme) => ({
  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #ddd",
    tableLayout: "fixed",
  },
  actionButton: {
    color: "#fff",
    borderRadius: "5px",
    margin: "0 4px",
  },
  editIcon: {
    color: "#42d29d",
  },
  deleteIcon: {
    color: "#f44336",
  },
  tableContainer: {
    maxHeight: "500px",
    backgroundColor: "#EEF7FF",
    borderRadius: 0,
    border: "1px solid #ddd",
    overflowY: "auto",
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
  noDataCell: {
    textAlign: "center",
    color: "#fa6767",
    fontFamily: "'Baskerville', serif",
    fontWeight: "bold",
    border: "1px solid #ddd",
  },
  paginationContainer: {
    position: "sticky",
    bottom: 0,
    backgroundColor: "white",
    borderTop: "1px solid #ddd",
    zIndex: 999,
  },
}));

export default function CustomPaginationActionsTable({
  data,
  tableHeader,
  handleEdit,
  handleDelete,
  loading,
  isCanteen,
  isEdit,
  isItems,
  noActions,
  noData,
}) {
  const classes = useStyles2();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const isDate = (string) => {
    const _regExp = new RegExp(
      "^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$"
    );
    return _regExp.test(string) ? true : false;
  };

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
        <Table className={classes.table} stickyHeader aria-label="custom pagination table with sticky header">
          <TableHead>
            <TableRow>
              {tableHeader &&
                tableHeader.map((head) => (
                  <StyledTableCell key={head.id}>
                    {head.name}
                  </StyledTableCell>
                ))}
              {!noActions && <StyledTableCell>Actions</StyledTableCell>}
            </TableRow>
          </TableHead>
          {loading ? (
            <TableBody className="text-center my-5 w-100">
              <TableRow>
                <TableCell colSpan={tableHeader.length}>
                  <span className="spinner-grow spinner-grow-sm" role="status"></span>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {data?.length <= 0 ? (
                <TableRow>
                  <StyledTableCell className={classes.noDataCell} colSpan={tableHeader.length + (noActions ? 0 : 1)}>
                    {noData || "No data"}
                  </StyledTableCell>
                </TableRow>
              ) : (
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <StyledTableRow key={row._id}>
                      {tableHeader.map((cell) => (
                        <StyledTableCell key={cell?.id}>
                          {isDate(row[cell?.id])
                            ? moment(row[cell?.id]).format("D MMMM YYYY")
                            : row[cell?.id] || "-"}
                        </StyledTableCell>
                      ))}
                      {!noActions && (
                        <StyledTableCellSmall>
                          <div className="d-flex align-items-center">
                            <Tooltip title={isItems ? "Manage Inventory" : "Delete"}>
                              <IconButton
                                onClick={() =>
                                  handleDelete(isCanteen ? row.memberID : row._id)
                                }
                                className={classes.actionButton}
                              >
                                {isItems ? <TocIcon /> : <DeleteOutlineIcon className={classes.deleteIcon} />}
                              </IconButton>
                            </Tooltip>
                            {!isEdit && (
                              <Tooltip title="Edit">
                                <IconButton
                                  onClick={() =>
                                    handleEdit(isCanteen ? row.memberID : row._id)
                                  }
                                  className={classes.actionButton}
                                >
                                  <EditIcon className={classes.editIcon} />
                                </IconButton>
                              </Tooltip>
                            )}
                          </div>
                        </StyledTableCellSmall>
                      )}
                    </StyledTableRow>
                  ))
              )}
            </TableBody>
          )}
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
