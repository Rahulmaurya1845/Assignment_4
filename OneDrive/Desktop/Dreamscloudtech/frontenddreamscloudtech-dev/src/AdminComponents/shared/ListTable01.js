import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  TablePagination,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import TocIcon from "@material-ui/icons/Toc";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
    // border: "1px solid white",
    borderCollapse: "collapse",
  },
  tableHead: {
    backgroundColor: "#4fb1f6",
    color: "#fff",
    fontFamily: "'Times New Roman', serif",
    fontWeight: "bold",
    fontSize: 16,
    border: "1px solid #ddd",
    borderBottom: "2px solid #ddd",
    position: "sticky",
    top: 0,
    zIndex: 2,
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: 2,
      backgroundColor: "#ddd",
    },
  },
  tableCell: {
    fontSize: 13,
    fontFamily: "'Baskerville', serif",
    fontWeight: "bold",
    padding: 12,
    border: "1px solid #ddd",
    whiteSpace: "nowrap",
  },
  boldCell: {
    fontWeight: "bold",
  },
  actionButton: {
    borderRadius: 5,
    margin: "0 4px",
  },
  editIcon: {
    color: "#42d29d",
  },
  deleteIcon: {
    color: "#f44336",
  },
  tableContainer: {
    borderRadius: 0,
    backgroundColor: "#EEF7FF",
    marginBottom: 40,
    maxHeight: "70vh",
    overflowY: "auto",
    border: "1px solid #ddd",
  },
  alternateRow: {
    backgroundColor: "#ffffff",
  },
  noDataCell: {
    textAlign: "center",
    color: "#fa6767",
    fontFamily: "'Baskerville', serif",
    fontWeight: "bold",
  },
}));

const isDateString = (string) => {
  const isoDateRegex = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/;
  return isoDateRegex.test(string);
};

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
  const classes = useStyles();

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Paginate data
  const paginatedData = data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {tableHeader?.map((head) => (
                <TableCell
                  key={head.id}
                  className={classes.tableHead}
                  style={{
                    minWidth: head.id === "class" ? 180 : 100,
                    width: head.id === "campus" ? 200 : "auto",
                  }}
                >
                  {head.name}
                </TableCell>
              ))}
              {!noActions && (
                <TableCell className={classes.tableHead} style={{ minWidth: 120 }}>
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={tableHeader.length + (noActions ? 0 : 1)} style={{ textAlign: "center" }}>
                  <span className="spinner-grow spinner-grow-sm" role="status" />
                </TableCell>
              </TableRow>
            ) : paginatedData?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={tableHeader.length + (noActions ? 0 : 1)} className={classes.noDataCell}>
                  {noData || "No data"}
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, index) => (
                <TableRow key={row._id || index} className={index % 2 === 0 ? classes.alternateRow : undefined}>
                  {tableHeader.map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cell.isBold ? classes.boldCell : classes.tableCell}
                      style={{
                        minWidth: cell.id === "class" ? 180 : 100,
                        width: cell.id === "campus" ? 200 : "auto",
                      }}
                    >
                      {isDateString(row[cell.id])
                        ? moment(row[cell.id]).format("D MMMM YYYY")
                        : row[cell.id] ?? "-"}
                    </TableCell>
                  ))}
                  {!noActions && (
                    <TableCell className={classes.tableCell} style={{ minWidth: 120 }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Tooltip title={isItems ? "Manage Inventory" : "Delete"}>
                          <IconButton
                            onClick={() => handleDelete(isCanteen ? row.memberID : row._id)}
                            className={classes.actionButton}
                          >
                            {isItems ? <TocIcon /> : <DeleteOutlineIcon className={classes.deleteIcon} />}
                          </IconButton>
                        </Tooltip>
                        {!isEdit && (
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => handleEdit(isCanteen ? row.memberID : row._id)}
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
          </TableBody>
        </Table>
      </TableContainer>

      {data?.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        // onChangePage={handleChangePage}
        // onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </>
  );
}
