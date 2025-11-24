import { CheckBox } from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import NumberFormat from "react-number-format";
import React, { useState } from "react";

export default function FeesList({
  feeList,
  handleSelectFee,
  handleSelectTransportFee,
  transportFeesList,
}) {
  return (
    <div
      className="content__container"
      style={{ backgroundColor: "#EEF7FF", width: "100%" }}
    >
      <Paper style={{ padding: "20px" }}>
        <h3
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          School Fees
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            alignItems: "center",
            borderBottom: "1px solid #c3c3c3",
          }}
        >
          <p style={{ textAlign: "start" }}>Fees List</p>
          <p style={{ textAlign: "center" }}>Type</p>
          <p style={{ textAlign: "end" }}>Amount</p>
        </div>
        {feeList.map((fee) => (
          <FeeCard
            key={fee.name}
            name={fee.name}
            type={fee.type}
            amount={fee.amount}
            isSelected={fee.isSelected}
            handleSelectFee={() => handleSelectFee(fee)}
          />
        ))}
      </Paper>

      <Paper style={{ padding: "20px" }}>
        <h5>Transport Fees</h5>
        {transportFeesList.map((fee) => (
          <FeeCard
            key={fee.name}
            name={fee.name}
            type={fee.type}
            amount={fee.amount}
            isSelected={fee.isSelected}
            handleSelectFee={() => handleSelectTransportFee(fee)}
          />
        ))}
      </Paper>
    </div>
  );
}

function FeeCard({ name, amount, type, isSelected, handleSelectFee }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        alignItems: "center",
        backgroundColor: `${isSelected ? "#1fa00020" : "#ffffff"}`,
        borderBottom: "1px solid #c3c3c3",
        marginTop: "10px",
        padding: "8px",
        borderRadius: "8px",
        ":hover": {
          backgroundColor: "#1fa00020",
          cursor: "pointer",
        },
      }}
    >
      <div style={{ display: "inline-block" }}>
        <Checkbox
          checked={isSelected}
          onChange={() => {
            handleSelectFee();
          }}
          color="#1fa000"
          style={{ marginRight: "10px" }}
        />
        <p
          style={{
            display: "inline-block",
            marginLeft: "10px",
            textAlign: "left",
          }}
        >
          {name}
        </p>
      </div>
      <div
        style={{
          textAlign: "end",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "#1fa2f5", textAlign: "center" }}>{type}</p>
      </div>
      <div
        style={{
          textAlign: "end",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <NumberFormat
          value={amount}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₹"}
        />
      </div>
    </div>
  );
}
