import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Form from "./Form";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  open,
  setOpen,
  type,
  settype,
  setusername,
  password,
  setpassword,
  confirmpass,
  setconfirmpass,
  loading,
  username,
  handleCheckRole,
  restrictions,
  onEdit,
}) {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar color="transparent" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Edit User
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="m-5 col-sm-6">
          <Form
            type={type}
            settype={settype}
            setusername={setusername}
            username={username}
            password={password}
            setpassword={setpassword}
            confirmpass={confirmpass}
            loading={loading}
            setconfirmpass={setconfirmpass}
            onSubmit={onEdit}
            isEdit={true}
          />
        </div>

      </Dialog>
    </div>
  );
}
