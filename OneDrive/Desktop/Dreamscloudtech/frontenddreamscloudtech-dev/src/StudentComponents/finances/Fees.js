import React, { useState, useEffect } from "react";
import { currentCurrency } from "../../utils";
import axios from "../../store/axios";

function Fees({ fees, balance, totalPaid, totalBill, payments }) {
  const [current, setcurrent] = useState({})
  const getData = async () => {

    const academicYearResponse = await axios.get("/academicyear");
    const currentYearData = academicYearResponse.data[0];
    setcurrent(currentYearData);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="content__container" style={{ background: "#4fb1f6" }}>
      <div className="row">
        <div className="col">
          {!fees ? (
            <div className="d-flex justify-content-center">
              <p>No fees details yet </p>
            </div>
          ) : (
            <table className="table table-sm table-borderless text-white">
              <thead>
                <tr>
                  <th className="" scope="col" style={{ fontSize: "18px" }}>
                    FEES
                  </th>
                  <th className="" scope="col" style={{ fontSize: "18px" }}>
                    Amount ({currentCurrency()})
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Tution Fee</th>
                  <td>{fees?.tution}</td>
                </tr>
                <tr>
                  <th scope="row">Transport Fee</th>
                  <td>{fees?.facility}</td>
                </tr>
                <tr>
                  <th scope="row">Maintenance Fee</th>
                  <th>{fees?.maintenance}</th>
                </tr>
                <tr>
                  <th scope="row">Admission Fee</th>
                  <td>{fees?.admission}</td>
                </tr>
                <tr>
                  <th scope="row">Exam Fee</th>
                  <th>{fees?.exam}</th>
                </tr>
              </tbody>
            </table>
          )}
        </div>
        <div className="col">
          <table className="table table-sm table-borderless text-white">
            <thead>
              <tr>
                <th className="" scope="col" style={{ fontSize: "18px" }}>
                  FEES BALANCES
                </th>
                <th className="" scope="col" style={{ fontSize: "18px" }}>
                  Amount ({currentCurrency()})
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">TOTAL FEES</th>
                <th scope="row">{totalBill}</th>
              </tr>
              <tr>
                <th scope="row">FEES PAID</th>
                <th scope="row">{totalPaid}</th>
              </tr>
              <tr>
                <th className="text-white" scope="row">
                  FEES DUE
                </th>
                <th className="text-white" scope="row">
                  {balance}
                </th>
              </tr>
              <tr>
                <th className="text-white" scope="row">
                  YEAR:  {current?.currentYear}
                </th>
                <th className="text-white" scope="row">
                  TERM: {current?.currentTerm}
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Fees;
