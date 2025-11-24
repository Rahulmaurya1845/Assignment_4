import React, { useState } from "react";
import AddForm from "./CorrespondanceForm";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";

function AddCorrespondance() {
  const [address, setaddress] = useState("");
  const [subject, setsubject] = useState("");
  const [name, setName] = useState("");
  const [classID, setClassID] = useState("");
  const [closing, setclosing] = useState("");
  const [signature, setsignature] = useState("");
  const [date, setdate] = useState("");
  const [salutation, setsalutation] = useState("");
  const [loading, setloading] = useState(false);

  const handleAdd = () => {
    setloading(true);
    console.log("name", name);
    axios
      .post("/correspondance/create", {
        address,
        subject,
        name,
        classID,
        closing,
        signature,
        date,
        salutation,
      })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
        }
        successAlert("Correspondance successsfully created");
        setaddress("");
        setsubject("");
        setName("");
        setClassID("");
        setclosing("");
        setsignature("");
        setdate("");
        setsalutation("");
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        errorAlert("Failed");
      });
  };

  return (
    <div className="content__container">
      <h3 className="mb-5">New Certificate</h3>
      <AddForm
        address={address}
        setaddress={setaddress}
        name={name}
        setName={setName}
        classID={classID}
        setClassID={setClassID}
        closing={closing}
        setclosing={setclosing}
        signature={signature}
        setsignature={setsignature}
        date={date}
        loading={loading}
        setdate={setdate}
        setsalutation={setsalutation}
        salutation={salutation}
        subject={subject}
        setsubject={setsubject}
        handleFunc={handleAdd}
      />
    </div>
  );
}

export default AddCorrespondance;
