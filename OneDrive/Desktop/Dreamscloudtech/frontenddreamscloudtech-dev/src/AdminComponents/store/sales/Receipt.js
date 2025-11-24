import React, { useState, useEffect } from "react";
import axios from "../../../store/axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import Loading from "../../../Loading";
import { getImgSrc, currentCurrency } from "../../../utils";

function Receipt() {
  const [transaction, setTransaction] = useState({});
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(false);
  const [school, setSchool] = useState({});
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    axios.get(`/store/sales/${id}`).then((res) => {
      setTransaction(res.data.doc);
      const userID = res.data.doc?.name;


      if (userID) {
        axios.get(`/students/student/${userID}`).then((studentRes) => {
          setStudent(studentRes.data.student);
          setLoading(false);
        }).catch(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }).catch(() => setLoading(false));
  }, [id]);

  useEffect(() => {

    axios.get(`/school`).then((res) => {
      setSchool(res.data);
    });
  }, []);

  // const handlePrint = () => {
  //   window.print();
  // };
  const handlePrint = () => {
    const printButton = document.getElementById("print-button");
    if (printButton) {
      printButton.style.display = "none"; // Hide before printing
    }

    window.print();

    setTimeout(() => {
      if (printButton) {
        printButton.style.display = "block";
      }
    }, 1000);
  };


  return (
    <>


      <div className="content__container border" id="section-to-print" style={{ backgroundColor: "#FFFFFF" }}>
        {loading && <Loading />}
        <h3 style={{ marginBottom: "-25px" }}>Sales Receipt</h3>
        <div className="d-flex justify-content-end">
          <button id="print-button" onClick={handlePrint} className="btn blue__btn">
            Print
          </button>
        </div>

        <div className="text-center">
          <img src={getImgSrc(school?.profileUrl)} width="100px" alt="" />
          <h4>{school?.fullName}</h4>
          <h6>{school?.motto}</h6>
        </div>


        <div className="border p-3 mb-3">
          <div className="row">

            <div className="col-md-4 text-start" >
              <strong>User ID:</strong> {student?.userID || "-"} <br />
              <strong>Class:</strong> {student?.classID?.toUpperCase() || "-"} <br />

            </div>
            <div className="col-md-4 text-start">
              <strong>Student Name:</strong> {student?.name || "-"} <br />
              <strong>Guardian Name:</strong> {student?.guadian?.[0]?.name || "-"} <br />
            </div>


            <div className="col-md-4 text-start">
              <strong>Date:</strong> {moment(transaction.createdAt).format("D MMMM YYYY")} <br />
              <strong>Cashier:</strong> {transaction.seller || "-"} <br />
            </div>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sr. No</th>
              <th scope="col">Item</th>
              <th scope="col">Rate</th>
              <th scope="col">Quantity</th>
              <th scope="col">Discount ({currentCurrency()})</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {transaction.items?.map((item, i) => (
              <tr key={item._id}>
                <th scope="row">{i + 1}</th>
                <td>{item?.name}</td>
                <td>{item?.rate}</td>
                <td>{item?.qty}</td>
                <td>{(item?.qty) * (item?.rate) - (item?.amount)}</td>
                <td>
                  <div className="d-flex flex-row">
                    <div className="d-flex flex-column text-start">
                      <strong>Total Cost:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>

                      {i === transaction.items.length - 1 && <strong>Paid:&nbsp;&nbsp;</strong>}
                    </div>
                    <div className="d-flex flex-column text-end">
                      <strong>&nbsp;&nbsp;&nbsp;&nbsp;{item?.amount || "0"} ({currentCurrency()})</strong>
                      {i === transaction.items.length - 1 && (
                        <strong>-{transaction?.amountPaid || "0"} ({currentCurrency()})</strong>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}

            <tr>
              <td colSpan={5}></td>
              <td>
                <div className="d-flex flex-row">
                  <div className="d-flex flex-column text-start">
                    <strong>Balance:</strong>
                  </div>
                  <div className="d-flex flex-column text-end">
                    <strong style={{ marginLeft: "50px" }}>
                      {transaction?.totalCost - transaction?.amountPaid || "0"} ({currentCurrency()})
                    </strong>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Receipt;

