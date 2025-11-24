import React from "react";

function Guardian({
  fatherName,
  setFatherName,
  fatherLastName,
  setFatherLastName,
  fatherOccupation,
  setFatherOccupation,
  fatherContact,
  setFatherContact,
  motherName,
  setMotherName,
  motherLastName,
  setMotherLastName,
  motherOccupation,
  setMotherOccupation,
  motherContact,
  setMotherContact,
  fatherAddress,
  setFatherAddress,
  motherAddress,
  setMotherAddress,
}) {
  console.log(
    fatherName,
    fatherLastName,
    fatherOccupation,
    fatherContact,
    motherName,
    motherLastName,
    motherOccupation,
    motherContact,
    fatherAddress,
    motherAddress
  );

  return (
    <div>
      <h3 className="mb-3">Guardian Information</h3>
      <h4>Father's Information</h4>
      <div className="row mb-3">
        <div className="col-xs-12 col-sm-6">
          <label className="form-label mt-2">Father's Name</label>
          <input
            style={{ backgroundColor: "#ffffff" }}
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            name="fatherName"
            type="text"
            className="form-control"
          />
        </div>
        <div className="col-xs-12 col-sm-6">
          <label className="form-label mt-2">Father's Last Name</label>
          <input
            style={{ backgroundColor: "#ffffff" }}
            value={fatherLastName}
            onChange={(e) => setFatherLastName(e.target.value)}
            name="fatherLastName"
            type="text"
            className="form-control"
          />
        </div>
        <div className="col-xs-12 col-sm-6">
          <label className="form-label mt-2">Father's Occupation</label>
          <input
            style={{ backgroundColor: "#ffffff" }}
            value={fatherOccupation}
            onChange={(e) => setFatherOccupation(e.target.value)}
            name="fatherOccupation"
            type="text"
            className="form-control"
          />
        </div>
        <div className="col-xs-12 col-sm-6">
          <label className="form-label mt-2">Father's Contact</label>
          <input
            style={{ backgroundColor: "#ffffff" }}
            value={fatherContact}
            onChange={(e) => setFatherContact(e.target.value)}
            name="fatherContact"
            type="tel"
            className="form-control"
          />
        </div>
        <div className="col-xs-12 col-sm-12">
          <label className="form-label mt-2">Father's Address</label>
          <textarea
            style={{ backgroundColor: "#ffffff" }}
            value={fatherAddress}
            onChange={(e) => setFatherAddress(e.target.value)}
            name="fatherAddress"
            className="form-control"
            rows={3}
          />
        </div>
      </div>
      <h4 className="mb-3">Mother's Information</h4>
      <div className="row mb-3">
        <div className="col-xs-12 col-sm-6">
          <label className="form-label mt-2">Mother's Name</label>
          <input
            style={{ backgroundColor: "#ffffff" }}
            value={motherName}
            onChange={(e) => setMotherName(e.target.value)}
            name="motherName"
            type="text"
            className="form-control"
          />
        </div>
        <div className="col-xs-12 col-sm-6">
          <label className="form-label mt-2">Mother's Last Name</label>
          <input
            style={{ backgroundColor: "#ffffff" }}
            value={motherLastName}
            onChange={(e) => setMotherLastName(e.target.value)}
            name="motherLastName"
            type="text"
            className="form-control"
          />
        </div>
        <div className="col-xs-12 col-sm-6">
          <label className="form-label mt-2">Mother's Occupation</label>
          <input
            style={{ backgroundColor: "#ffffff" }}
            value={motherOccupation}
            onChange={(e) => setMotherOccupation(e.target.value)}
            name="motherOccupation"
            type="text"
            className="form-control"
          />
        </div>
        <div className="col-xs-12 col-sm-6">
          <label className="form-label mt-2">Mother's Contact</label>
          <input
            style={{ backgroundColor: "#ffffff" }}
            value={motherContact}
            onChange={(e) => setMotherContact(e.target.value)}
            name="motherContact"
            type="tel"
            className="form-control"
          />
        </div>
        <div className="col-xs-12 col-sm-12">
          <label className="form-label mt-2">Mother's Address</label>
          <textarea
            style={{ backgroundColor: "#ffffff" }}
            value={motherAddress}
            onChange={(e) => setMotherAddress(e.target.value)}
            name="motherAddress"
            className="form-control"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}

export default Guardian;
