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
import TablePaginationActions from "../../shared/TablePagination";
import moment from "moment";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles2 = makeStyles({
  table: {
    width: "100%",
  },
});

export default function CorrespondanceTable({
  data,
  tableHeader,
  handleEdit,
  handleDelete,
  handleViewCorrespondance,
  loading,
  noActions,
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
    return _regExp.test(string);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="correspondence table">
        <TableHead>
          <TableRow>
            {tableHeader?.map((head) => (
              <TableCell key={head.id}>{head.name}</TableCell>
            ))}
            {!noActions && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={tableHeader.length + 1} align="center">
                <span className="spinner-grow spinner-grow-sm" role="status" />
              </TableCell>
            </TableRow>
          ) : !data || data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={tableHeader.length + 1} align="center">
                No data found
              </TableCell>
            </TableRow>
          ) : (
            (rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((row) => (
              <TableRow key={row._id}>
                {tableHeader.map((cell) => (
                  <TableCell key={cell.id}>
                    {isDate(row[cell.id])
                      ? moment(row[cell.id]).format("DD MMMM YYYY")
                      : cell.id === "signature"
                        ? row[cell.id] || "admin"
                        : row[cell.id] || "-"}
                  </TableCell>
                ))}
                {!noActions && (
                  <TableCell>
                    <div className="d-flex align-items-center">
                      <Tooltip title="View">
                        <IconButton onClick={() => handleViewCorrespondance(row._id)}>
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(row._id)}>
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleEdit(row._id)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}

          {emptyRows > 0 && !loading && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={tableHeader.length + 1} />
            </TableRow>
          )}
        </TableBody>

        {data?.length > 5 && (
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
}
