import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Form from "./ItemForm";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "../../../store/axios";
import { successAlert, errorAlert } from "../../../utils";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export default function ResponsiveDialog({ open, setOpen }) {
  const [name, setname] = useState("");
  const [unit, setunit] = useState("");
  const [qty, setqty] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [loading, setloading] = useState(false);

  const handleAdd = () => {
    if (!name || !unit || !qty || !price) {
      errorAlert("Please fill in all required fields");
      return;
    }

    setloading(true);
    axios
      .post("/store/items/create", {
        name,
        unit,
        quantity: Number(qty),
        price: Number(price),
        description,
      })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        resetForm();
        successAlert("Item Added");
        setOpen(res.data.doc);
      })
      .catch((err) => {
        console.log(err);
        errorAlert("Failed");
        setloading(false);
      });
  };

  const resetForm = () => {
    setname("");
    setunit("");
    setqty("");
    setprice("");
    setdescription("");
  };

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  return (
    <Dialog
      maxWidth="sm"
      fullWidth={true}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle onClose={handleClose} id="responsive-dialog-title" style={{ backgroundColor: " #EEF7FF" }}>
        Add New Item
      </DialogTitle>
      <DialogContent style={{ backgroundColor: " #EEF7FF" }}>
        <Form
          price={price}
          loading={loading}
          setprice={setprice}
          setdescription={setdescription}
          description={description}
          quantity={qty}
          setquantity={setqty}
          name={name}
          setname={setname}
          onSubmit={handleAdd}
          unit={unit}
          setunit={setunit}
        />
      </DialogContent>
    </Dialog>
  );
}

