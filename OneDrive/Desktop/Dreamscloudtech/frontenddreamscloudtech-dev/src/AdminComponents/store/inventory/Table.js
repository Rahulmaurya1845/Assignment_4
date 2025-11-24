import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";
import TocIcon from "@material-ui/icons/Toc";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 750,
    border: '1px solid #ddd',
    borderCollapse: 'collapse',
  },
  tableContainer: {
    maxHeight: "70vh",
    overflowY: "auto",
    backgroundColor: "#EEF7FF",
    border: '1px solid white',
    borderRadius: 0,
  },
  tableHeadCell: {
    backgroundColor: "#4fb1f6",
    color: "white",
    fontFamily: "'Poppins', serif",
    fontWeight: "bold",
    textAlign: "left",
    position: "sticky",
    top: 0,
    zIndex: 2,
    verticalAlign: "middle",
    padding: "16px",
    border: '1px solid #ddd',
    borderBottom: '2px solid white',
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: "2px",
      backgroundColor: "#ddd",
    }
  },
  tableCell: {
    fontFamily: "'Poppins', serif",
    fontSize: "14px",
    color: "#444",
    padding: "16px",
    verticalAlign: "middle",
    border: '1px solid #ddd',
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
  actionIcons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  iconManage: {
    color: "#3f51b5",
  },
  iconDelete: {
    color: "#f44336",
  },
  iconEdit: {
    color: "#42d29d",
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
  handleManage,
}) {
  const classes = useStyles();

  const isDate = (string) => {
    const _regExp = new RegExp(
      "^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$"
    );
    return _regExp.test(string) ? true : false;
  };

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
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
            {!noActions && (
              <TableCell className={classes.tableHeadCell}>Actions</TableCell>
            )}
          </TableRow>
        </TableHead>
        {loading ? (
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={tableHeader.length + 1}
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
                  colSpan={tableHeader.length + 1}
                  className={classes.noDataCell}
                >
                  {noData || "No data available"}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow key={row._id} className={classes.tableRow}>
                  {tableHeader &&
                    tableHeader.map((cell) => (
                      <TableCell key={cell.id} align="left" className={classes.tableCell}>
                        {isDate(row[cell.id])
                          ? moment(row[cell.id]).format("D MMMM YYYY")
                          : row[cell.id] || "-"}
                      </TableCell>
                    ))}
                  {!noActions && (
                    <TableCell align="left" className={classes.tableCell}>
                      <div className={classes.actionIcons}>
                        <Tooltip title="Manage Inventory">
                          <IconButton onClick={() => handleManage(row._id)}>
                            <TocIcon style={{ marginLeft: -30 }} className={classes.iconManage} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton onClick={() => handleDelete(row._id)}>
                            <DeleteOutlineIcon style={{ marginLeft: -30 }} className={classes.iconDelete} />
                          </IconButton>
                        </Tooltip>
                        {!isEdit && (
                          <Tooltip title="Edit">
                            <IconButton onClick={() => handleEdit(row._id)}>
                              <EditIcon style={{ marginLeft: -30, marginRight: "50px" }} className={classes.iconEdit} />
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
        )}
      </Table>
    </TableContainer>
  );
}
