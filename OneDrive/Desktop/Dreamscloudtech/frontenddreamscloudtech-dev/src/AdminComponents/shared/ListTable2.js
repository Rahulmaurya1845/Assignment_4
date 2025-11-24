import React, { useMemo, useState } from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
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

const useStyles2 = makeStyles((theme) => ({
  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #ddd",
  },
  tableHead: {
    backgroundColor: "#4fb1f6",
    color: "#fff",
    fontFamily: "'Times New Roman', serif",
    fontWeight: "bold",
    fontSize: "16px",
    border: "1px solid #ddd",
  },
  tableCell: {
    fontSize: "14px",
    fontFamily: "'Baskerville', serif",
    fontWeight: "bold",
    border: "1px solid #ddd",
    padding: "8px",
  },
  boldCell: {
    fontWeight: "bold",
    border: "1px solid #ddd",
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
  tableContainer: {
    borderRadius: "0px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #ddd",
    maxHeight: "600px",
    overflowY: "auto",
    position: "relative",
  },
  alternateRow: {
    backgroundColor: "#ffffff",
  },
  noDataCell: {
    textAlign: "center",
    color: "#fa6767",
    fontFamily: "'Baskerville', serif",
    fontWeight: "bold",
    border: "1px solid #ddd",
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
    border: "1px solid #ddd",
  },
  pagination: {
    position: "sticky",
    bottom: 0,
    backgroundColor: "#EEF7FF",
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

  const isDate = (string) => {
    const _regExp = new RegExp(
      "^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$"
    );
    return _regExp.test(string);
  };

  const sortedData = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => {
      const dateKey = tableHeader.find(h => isDate(a[h.id] || b[h.id]))?.id;
      return new Date(b[dateKey]) - new Date(a[dateKey]);
    });
  }, [data, tableHeader]);

  // Pagination State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer component={Paper} className={classes.tableContainer} style={{ backgroundColor: "#EEF7FF" }}>
      <Table className={classes.table} stickyHeader aria-label="custom table with sticky header">
        <TableHead>
          <TableRow>
            {tableHeader.map((head) => (
              <TableCell key={head.id} className={classes.stickyHeader}>
                {head.name}
              </TableCell>
            ))}
            {!noActions && <TableCell className={classes.stickyHeader}>Actions</TableCell>}
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={tableHeader.length + (!noActions ? 1 : 0)} className={classes.tableCell}>
                <span className="spinner-grow spinner-grow-sm" role="status"></span>
              </TableCell>
            </TableRow>
          ) : sortedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={tableHeader.length + (!noActions ? 1 : 0)} className={classes.noDataCell}>
                {noData || "No data"}
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((row, index) => (
              <TableRow key={row._id} className={index % 2 === 0 ? classes.alternateRow : null}>
                {tableHeader.map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cell.isBold ? classes.boldCell : classes.tableCell}
                  >
                    {isDate(row[cell.id])
                      ? moment(row[cell.id]).format("D MMMM YYYY")
                      : row[cell.id] || "-"}
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
                          size="small"
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
                            size="small"
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

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={sortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className={classes.pagination}
      />
    </TableContainer>
  );
}
