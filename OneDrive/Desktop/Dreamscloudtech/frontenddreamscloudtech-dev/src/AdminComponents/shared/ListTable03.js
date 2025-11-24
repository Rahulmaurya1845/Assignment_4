import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Tooltip from "@material-ui/core/Tooltip";
import TocIcon from "@material-ui/icons/Toc";
import TablePaginationActions from "./TablePagination";
import moment from "moment";

const useStyles2 = makeStyles((theme) => ({
  table: {
    width: "100%",
    minWidth: 750,
    border: "1px solid #ddd",
    borderCollapse: "collapse",
  },
  tableHead: {
    backgroundColor: "#4fb1f6",
    color: "#FFFFFF",
    fontFamily: "'Poppins', serif",
    fontWeight: "bold",
    fontSize: "16px",
    textAlign: "center",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    padding: "10px",
    border: "1px solid #ddd",
  },
  tableCell: {
    fontSize: "14px",
    fontFamily: "'Poppins', serif",
    fontWeight: 500,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: "7px",
    color: "#444",
    border: "1px solid #ddd",
  },
  boldCell: {
    fontWeight: "bold",
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
    borderRadius: "0px",
    backgroundColor: "#EEF7FF",
    maxHeight: "70vh",
    overflowY: "auto",
    border: "1px solid #ddd",
    marginBottom: theme.spacing(7),
  },
  tableFooter: {
    backgroundColor: "#EEF7FF",
  },
  alternateRow: {
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
    fontFamily: "'Poppins', serif",
    fontWeight: "bold",
  },
  stickyHeader: {
    position: "sticky",
    top: 0,
    backgroundColor: "#4fb1f6",
    color: "#fff",
    zIndex: 1000,
    fontFamily: "'Poppins', serif",
    fontWeight: "bold",
    textAlign: "center",
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

  const isDate = (string) => {
    const _regExp = new RegExp(
      "^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$"
    );
    return _regExp.test(string) ? true : false;
  };

  return (
    <TableContainer component={Paper} className={classes.tableContainer} style={{ backgroundColor: "#EEF7FF" }}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {tableHeader &&
              tableHeader.map((head) => (
                <TableCell key={head.id} className={classes.tableHead}>
                  {head.name}
                </TableCell>
              ))}
            {!noActions && <TableCell className={classes.tableHead}>Actions</TableCell>}
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
                <TableCell className={classes.noDataCell} colSpan={tableHeader.length + 1}>
                  {noData || "No data"}
                </TableCell>
              </TableRow>
            ) : (
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={row._id}
                    className={index % 2 === 0 ? classes.alternateRow : null}
                  >
                    {tableHeader.map((cell) => (
                      <TableCell
                        key={cell?.id}
                        className={cell?.isBold ? classes.boldCell : classes.tableCell}
                      >
                        {cell?.id === "pay" ? (
                          // Clean and capitalize the payment type display
                          (row.paymentMethod || row.pay || "-")
                            .toString()
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())
                        ) : isDate(row[cell?.id]) ? (
                          moment(row[cell?.id]).format("D MMMM YYYY")
                        ) : (
                          row[cell?.id] || "-"
                        )}
                      </TableCell>
                    ))}

                    {!noActions && (
                      <TableCell className={classes.tableCell}>
                        <div className="d-flex align-items-center">
                          <Tooltip title={isItems ? "Manage Inventory" : "Delete"}>
                            <IconButton
                              onClick={() =>
                                handleDelete(isCanteen ? row.memberID : row._id)
                              }
                              className={classes.actionButton}
                            >
                              {isItems ? (
                                <TocIcon />
                              ) : (
                                <DeleteOutlineIcon className={classes.deleteIcon} />
                              )}
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
                      </TableCell>
                    )}
                  </TableRow>
                ))
            )}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={tableHeader.length + 1} />
              </TableRow>
            )}
          </TableBody>

        )}
        <TableFooter className={classes.tableFooter}>
          {data?.length > 5 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              count={data?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          )}
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
