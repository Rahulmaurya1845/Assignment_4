import React from "react";
import { getEmailPattern } from "../../utils";

function Personalnfo(props) {
  let {
    name,
    healthCon,
    setHealthCon,
    disease,
    setDisease,
    allerge,
    setallerge,
    setname,
    title,
    setTitle,
    secondName,
    setsecondName,
    lastname,
    setlastname,
    gender,
    setgender,
    dateofBirth,
    setdateofBirth,
    email,
    setemail,
    nationality,
    setnationality,
    placeofBirth,
    setplaceofBirth,
    religion,
    setreligion,
    errors,
    isTeacher,
    register,
  } = props;

  const colClass = isTeacher ? "col-md-4" : "col-md-6";

  return (
    <div>
      <h3>Personal Information</h3>
      <div className="row mb-3">
        {isTeacher && (
          <div className="col-xs-12 col-sm-6 col-md-4">
            <label className="form-label">Title</label>
            <select
              style={{ backgroundColor: " #ffffff", fontSize: "15px" }}
              className="form-control"
              ref={register({ required: true })}
              value={title}
              name="gender"
              onChange={(e) => setTitle(e.target.value)}
              aria-label="Default select example"
            >
              <option defaultValue hidden >
                Select
              </option>
              <option value="mr">Mr</option>
              <option value="mrs">Mrs</option>
              <option value="miss">Ms</option>
              <option value="doctor">Dr</option>
              <option value="prof">Prof</option>
              <option value="pastor">Pastor</option>
              <option value="rev">Rev</option>
              <option value="apostle">Apostle</option>
            </select>
            {errors.name && (
              <span className=" form-error text-danger mb-2">
                This field is required
              </span>
            )}
          </div>
        )}
        <div className={`col-xs-12 col-sm-6 ${colClass}`}>
          <label className="form-label">First Name</label>
          <input
            style={{ backgroundColor: " #ffffff" }}
            name="name"
            type="text"
            value={name}
            ref={register({ required: true })}
            onChange={(e) => setname(e.target.value)}
            className="form-control"
            placeholder=""
          />
          {errors.name && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>

        <div className={`col-xs-12 col-sm-6 ${colClass}`}>
          <label className="form-label">Last Name</label>
          <input
            style={{ backgroundColor: " #ffffff" }}
            ref={register}
            value={lastname}
            onChange={(e) => setlastname(e.target.value)}
            type="text"
            name="lastname"
            className="form-control"
          />
          {errors.lastname && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-xs-12 col-sm-6 col-md-4">
          <label className="form-label">Category</label>
          <input
            style={{ backgroundColor: " #ffffff" }}
            value={nationality}
            ref={register}
            onChange={(e) => setnationality(e.target.value)}
            name="nationality"
            type="text"
            className="form-control"
          />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <label className="form-label">Caste</label>
          <input
            style={{ backgroundColor: " #ffffff" }}
            type="text"
            ref={register}
            name="religion"
            value={religion}
            onChange={(e) => setreligion(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <label className="form-label">Email</label>
          <input
            style={{ backgroundColor: " #ffffff" }}
            value={email}
            ref={register({ pattern: getEmailPattern() })}
            onChange={(e) => setemail(e.target.value)}
            type="email"
            name="email"
            className="form-control"
          />
          {errors.email && (
            <span className=" form-error text-danger mb-2">
              Valid email is required
            </span>
          )}
        </div>


      </div>
      <div className="row mb-3">

        <div className="col-xs-12 col-sm-6 col-md-4">
          <label className="form-label">Date of Birth</label>
          <input
            style={{ backgroundColor: " #ffffff" }}
            value={dateofBirth}
            name="dateofBirth"
            ref={register({ required: true })}
            onChange={(e) => {
              setdateofBirth(e.target.value);
            }}
            type="date"
            className="form-control"
          />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <label className="form-label"> Gender </label>
          <select
            style={{ backgroundColor: " #ffffff", fontSize: "15px" }}
            className="form-control"
            ref={register({ required: true })}
            value={gender}
            name="gender"
            onChange={(e) => setgender(e.target.value)}
            aria-label="Default select example"
          >
            <option defaultValue hidden>
              Select
            </option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="others">Others</option>
          </select>
          {errors.gender && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>

        {!isTeacher && (<div className="col-xs-12 col-sm-6 col-md-4">
          <label className="form-label">Date of Admission</label>
          <input
            style={{ backgroundColor: " #ffffff" }}
            value={disease}
            ref={register}
            name="placeofBirth"
            onChange={(e) => {
              setDisease(e.target.value);
            }}
            type="date"
            className="form-control"
          />
        </div>)}


      </div>

    </div>
  );
}

export default Personalnfo;
