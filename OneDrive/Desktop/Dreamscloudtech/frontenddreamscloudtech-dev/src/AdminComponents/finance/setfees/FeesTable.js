import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import { currentCurrency } from "../../../utils";

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
    border: '1px solid #ddd',
    borderCollapse: 'collapse',
  },
  tableContainer: {
    maxHeight: "70vh",
    overflowY: "auto",
    border: '1px solid #ddd',
    borderRadius: 0,
  },
  tableCell: {
    padding: "10px 15px",
    border: '1px solid #ddd',
  },
  actionsCell: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    border: '1px solid #ddd',
  },
  feesList: {
    paddingLeft: "0px",
    marginBottom: "10px",
  },
  total: {
    fontWeight: "bold",
    color: "#4fb1f6",
    marginLeft: "0px",
  },
  iconButton: {
    padding: "8px",
    marginRight: "70px",
    color: "#05e278",
  },
  iconButton2: {
    padding: "8px",
    marginRight: 0,
    color: "red",
    marginTop: "110px",
    marginBottom: "20px",
  },
  tableRow: {
    "&:hover": {},
  },
  oddRow: {
    backgroundColor: "#ffffff",
  },
  headerCell: {
    backgroundColor: "#4fb1f6",
    fontWeight: "bold",
    color: "#ffffff",
     border: '1px solid #ddd',
    //  borderBottom: '2px solid #ddd',
    position: "sticky",
    top: 0,
    zIndex: 2,
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
});

export default function CustomPaginationActionsTable({
  tableHeader,
  data,
  handleDelete,
  handleEdit,
}) {
  const classes = useStyles2();

  const getTotal = (a, b, c, d, e) => {
    let total =
      Number(a || 0) + Number(b || 0) + Number(c || 0) + Number(d || 0) + Number(e || 0);
    return total;
  };

  let sign = currentCurrency();

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="custom pagination table" stickyHeader>
        <TableHead>
          <TableRow>
            {tableHeader &&
              tableHeader.map((head) => (
                <TableCell
                  align="left"
                  key={head.id}
                  className={classes.headerCell}
                >
                  {head.name}
                </TableCell>
              ))}
            <TableCell align="center" className={classes.headerCell}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            <>
              {data.map((row, index) => (
                <TableRow
                  key={row?.id}
                  className={`${classes.tableRow} ${index % 2 === 1 ? "" : classes.oddRow
                    }`}
                >
                  <TableCell
                    style={{ width: 280 }}
                    align="left"
                    className={classes.tableCell}
                  >
                    {row?.name}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ width: 280 }}
                    className={classes.tableCell}
                  >
                    <ul className={classes.feesList}>
                      {row?.day?.tution ? (
                        <li>
                          Tution Fee = {sign} {row?.day?.tution}
                        </li>
                      ) : (
                        "."
                      )}
                      {/* {row?.day?.facility ? (
                        <li>
                          Transport Fee = {sign} {row?.day?.facility}
                        </li>
                      ) : (
                        "."
                      )} */}  
                      {row?.day?.maintenance ? (
                        <li>
                          Maintenance Fee = {sign} {row?.day?.maintenance}
                        </li>
                      ) : (
                        "."
                      )}
                      {row?.day?.exam ? (
                        <li>
                          Exam Fee = {sign} {row?.day?.exam}
                        </li>
                      ) : (
                        "."
                      )}
                      {row?.day?.admission && (
                        <li>
                          Admission Fee = {sign} {row?.day?.admission}
                        </li>
                      )}
                    </ul>
                    {row?.day && (
                      <div className="d-flex flex-row justify-content-between align-items-center">
                        <strong className={classes.total}>
                          Total: {sign}{" "}
                          {getTotal(
                            row?.day?.tution,
                            row?.day?.facility,
                            row?.day?.maintenance,
                            row?.day?.exam,
                            row?.day?.admission
                          ) || 0}
                        </strong>
                        <IconButton
                          className={classes.iconButton}
                          onClick={() =>
                            handleEdit({
                              ...row.day,
                              classID: row.name,
                              type: "day",
                            })
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </div>
                    )}
                  </TableCell>
                  {/* <TableCell
                    align="left"
                    style={{ width: 280 }}
                    className={classes.tableCell}
                  >
                    <div className="d-flex flex-column justify-content-around">
                      <ul className={classes.feesList}>
                        {row?.border?.tution ? (
                          <li>
                            Tution Fee = {sign} {row?.border?.tution}
                          </li>
                        ) : (
                          "."
                        )}
                        {row?.border?.facility ? (
                          <li>
                            Transport Fee = {sign} {row?.border?.facility}
                          </li>
                        ) : (
                          "."
                        )}
                        {row?.border?.maintenance ? (
                          <li>
                            Maintenance Fee = {sign} {row?.border?.maintenance}
                          </li>
                        ) : (
                          "."
                        )}
                        {row?.border?.exam ? (
                          <li>
                            Exam Fee = {sign} {row?.border?.exam}
                          </li>
                        ) : (
                          "."
                        )}
                        {row?.border?.admission ? (
                          <li>
                            Admission Fee = {sign} {row?.day?.admission}
                          </li>
                        ) : (
                          "."
                        )}
                      </ul>
                      {row?.border && (
                        <div className="d-flex justify-content-between align-items-center">
                          <strong className={classes.total}>
                            Total: {sign}{" "}
                            {getTotal(
                              row?.border?.tution,
                              row?.border?.facility,
                              row?.border?.maintenance,
                              row?.border?.exam,
                              row?.border?.admission
                            ) || 0}
                          </strong>
                          <IconButton
                            className={classes.iconButton}
                            onClick={() =>
                              handleEdit({
                                ...row.border,
                                classID: row.name,
                                type: "border",
                              })
                            }
                          >
                            <EditIcon />
                          </IconButton>
                        </div>
                      )}
                    </div>
                  </TableCell> */}
                  <TableCell align="left" className={classes.actionsCell}>
                    <IconButton
                      className={classes.iconButton2}
                      onClick={() => handleDelete(row._id)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell
                colSpan={tableHeader.length + 1}
                className="text-center text-danger"
              >
                Fees not set yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
