import React from "react";
import moment from "moment";
import Chip from "@material-ui/core/Chip";
import { IconButton, Grid, Card, CardContent, Typography, Button, CardActions } from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import Edit from "./EditNotice";

function Notice({
  description,
  createdBy,
  date,
  title,
  createdAt,
  isEdit,
  id,
  open,
  setOpen,
  editData,
  handleDelete,
  notices,
}) {
  // const colors = ["#2ad7c5", "#ffa201", "#f939a1"];
  const colors = ["#2ad7c5", "#f939a1", "#ff6f61", "#1abc9c", "#3498db", "#e84393", "#8EC7FF", "red"]
  // const colors = ["#8EC7FF"];

  let bgColor = colors[Math.floor(Math.random() * colors.length)];

  const handleOpenEdit = (notice, openEdit) => {
    if (openEdit) {
      setOpen(true);
    } else {
      setOpen(false);
    }

    // Setting up the data to be edited
    editData?.setdate(notice.date);
    editData?.settitle(notice.title);
    editData?.setcreatedby(notice.createdBy);
    editData?.setdescription(notice.description);
    editData?.seteditID(notice._id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={3}>
        {notices.map((notice, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card style={{ height: "100%" }}>
              <CardContent>
                <div className="d-flex justify-content-between">
                  <Typography variant="h6" component="h2">
                    {notice.title}
                  </Typography>
                  <Typography style={{ marginLeft: "10px" }} color="textSecondary">
                    <Chip
                      style={{ backgroundColor: bgColor }}
                      className="unique-chip-date mb-2"
                      label={moment(notice.date).format("Do MMMM, YYYY")}
                    />
                  </Typography>
                </div>
                <Typography variant="body2" component="p" style={{ marginTop: "10px" }}>
                  {notice.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ marginTop: "15px", fontStyle: "italic" }}
                >
                  Created By: {notice.createdBy} {moment(notice.createdAt).fromNow()}
                </Typography>
              </CardContent>

            </Card>
          </Grid>
        ))}
      </Grid>
      {isEdit && (
        <div className="notice-actions">

          <Edit
            editData={editData}
            open={open}
            handleDelete={handleDelete}
            setOpen={setOpen}
          />
        </div>
      )}
    </div>
  );
}

export default Notice;