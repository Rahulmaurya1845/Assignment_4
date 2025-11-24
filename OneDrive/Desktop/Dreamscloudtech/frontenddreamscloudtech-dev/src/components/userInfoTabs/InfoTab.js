import React from "react";
import { getCapitalize } from "../../utils";
import moment from "moment";

function InfoTab({ user, isStaff }) {
  console.log("User Data:", user);

  const containerStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    maxWidth: "900px",
    margin: "10px auto",
    fontFamily: "Arial, sans-serif",
    alignItems: "center",

  };

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px"
  };

  const labelStyle = {
    fontWeight: "bold",
    color: "#333",
    flex: "1",
    textAlign: "left",
  };

  const valueStyle = {
    color: "#555",
    flex: "1",
    textAlign: "left",
    fontSize: "14px",
    marginLeft: "50px"
  };

  const headerStyle = {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "18px",
    color: "#2c3e50",
    marginBottom: "20px",
  };

  const dividerStyle = {
    borderBottom: "1px solid #ddd",
    margin: "10px 0",
  };

  return (
    <div style={containerStyle}>
      {/* <h2 style={headerStyle}>Student Information</h2> */}
      {isStaff && (
        <div style={rowStyle}>
          <span style={labelStyle}>Title:</span>
          <span style={valueStyle}>{getCapitalize(user?.title || "N/A")}</span>
        </div>
      )}
      <div className="row">
        <div className="col-6">
          <div style={rowStyle}>
            <span style={labelStyle}>Name:</span>
            <span style={valueStyle}>{user?.name || "N/A"}</span>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>Surname:</span>
            <span style={valueStyle}>{getCapitalize(user?.surname || "N/A")}</span>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>Gender:</span>
            <span style={valueStyle}>{getCapitalize(user?.gender || "N/A")}</span>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>Date of Birth:</span>
            <span style={valueStyle}>
              {user?.dateofBirth ? moment(user?.dateofBirth).format("DD-MM-YYYY") : "N/A"}
            </span>
          </div>
        </div>
        <div className="col-6">
          <div style={rowStyle}>
            <span style={labelStyle}>Email:</span>
            <span style={valueStyle}>{user?.email || "N/A"}</span>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>Caste:</span>
            <span style={valueStyle}>{user?.religion || "N/A"}</span>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>Category:</span>
            <span style={valueStyle}>{user?.nationality || "N/A"}</span>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>Date of Admission:</span>
            <span style={valueStyle}>
              {user?.disease ? moment(user?.disease).format("DD-MM-YYYY") : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoTab;
