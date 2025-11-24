import React, {  } from "react";
// import axios from "../../../store/axios";
import { Link } from "react-router-dom";
// import { errorAlert, successAlert } from "../../../utils";
import TransportFessForm from "./TransportFessForm";

function SetTransportfees() {

  return (
    <div>
      <div className="d-flex justify-content-end">
        <Link className="btn blue__btn" to="/finance/transport-fees">
          {" "}
          View All Fees
        </Link>
      </div>
      <h3>Set Transport Fees</h3>
      <TransportFessForm/>
    </div>
  )
}

export default SetTransportfees