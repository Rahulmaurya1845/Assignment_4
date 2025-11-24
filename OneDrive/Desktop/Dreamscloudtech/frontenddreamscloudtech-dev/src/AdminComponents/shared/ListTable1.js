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
  },
  tableHead: {
    backgroundColor: "#4fb1f6", // Table header background color
    color: "#fff", // Text color in table header
    fontFamily: "'Times New Roman', serif",
    fontWeight: "bold", // Header text weight
    fontSize: "16px", // Header font size
  },
  tableCell: {
    fontSize: "14px", // Font size for table cells
    fontFamily: "'Baskerville', serif", // Body font
    fontWeight: "bold", // Regular font weight

  },
  boldCell: {
    fontWeight: "bold", // Bold font weight for specific cells
  },
  actionButton: {
    color: "#fff", // Text color for action buttons
    borderRadius: "5px", // Rounded corners
    margin: "0 4px", // Margin between buttons
  },
  editIcon: {
    color: "#42d29d", // Color for edit icon
  },
  deleteIcon: {
    color: "#f44336", // Color for delete icon
  },
  tableContainer: {
    borderRadius: "8px", // Rounded corners for table container
    backgroundColor: "#FFFFFF", // Background color of table container
  },
  tableFooter: {
    backgroundColor: "#EEF7FF", // Background color for footer
  },
  alternateRow: {
    backgroundColor: "#ffffff", // Background color for alternate rows
  },
  noDataCell: {
    textAlign: "center",
    color: "#fa6767",
    fontFamily: "'Baskerville', serif",
    fontWeight: "bold",
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

  // Sort data by `createdAt` in descending order (newest first)
  const sortedData = [...data].sort((a, b) => {
    const dateA = isDate(a.createdAt) ? new Date(a.createdAt) : null;
    const dateB = isDate(b.createdAt) ? new Date(b.createdAt) : null;

    return dateB - dateA; // Sort in descending order
  });

  return (
    <TableContainer
      component={Paper}
      className={classes.tableContainer}
      style={{ backgroundColor: "#EEF7FF" }}
    >
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {tableHeader &&
              tableHeader.map((head) => (
                <TableCell key={head.id} className={classes.tableHead}>
                  {head.name}
                </TableCell>
              ))}
            {!noActions && (
              <TableCell className={classes.tableHead}>Actions</TableCell>
            )}
          </TableRow>
        </TableHead>
        {loading ? (
          <TableBody className="text-center my-5 w-100">
            <TableRow>
              <TableCell colSpan={tableHeader.length}>
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                ></span>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {sortedData?.length <= 0 ? (
              <TableRow>
                <TableCell
                  className={classes.noDataCell}
                  colSpan={tableHeader.length + 1}
                >
                  {noData || "No data"}
                </TableCell>
              </TableRow>
            ) : (
              sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={row._id}
                    className={
                      index % 2 === 0 ? classes.alternateRow : null
                    }
                  >
                    {tableHeader.map((cell) => (
                      <TableCell
                        key={cell?.id}
                        className={
                          cell?.isBold
                            ? classes.boldCell
                            : classes.tableCell
                        }
                      >
                        {/* {cell.id === "createdAt" && isDate(row[cell.id])
                          ? moment(row[cell.id]).format("D-MMMM-YYYY")
                          : cell.id === "date" && isDate(row[cell.id])
                            ? moment(row[cell.id]).format("YYYY")
                            : row[cell.id.split(".")[0]]?.[
                            cell.id.split(".")[1]
                            ] ||
                            row[cell.id] ||
                            "-"} */}
                        {isDate(row[cell?.id])
                          ? moment(row[cell?.id]).format("D-MMMM-YYYY")
                          : row[cell?.id.split(".")[0]]?.[cell?.id.split(".")[1]] ||
                          row[cell?.id] ||
                          "-"}
                      </TableCell>
                    ))}
                    {!noActions && (
                      <TableCell className={classes.tableCell}>
                        <div className="d-flex align-items-center">
                          <Tooltip
                            title={isItems ? "Manage Inventory" : "Delete"}
                          >
                            <IconButton
                              onClick={() =>
                                handleDelete(
                                  isCanteen ? row.memberID : row._id
                                )
                              }
                              className={classes.actionButton}
                            >
                              {isItems ? (
                                <TocIcon />
                              ) : (
                                <DeleteOutlineIcon
                                  className={classes.deleteIcon}
                                />
                              )}
                            </IconButton>
                          </Tooltip>
                          {!isEdit && (
                            <Tooltip title="Edit">
                              <IconButton
                                onClick={() =>
                                  handleEdit(
                                    isCanteen ? row.memberID : row._id
                                  )
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
              count={sortedData?.length}
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
