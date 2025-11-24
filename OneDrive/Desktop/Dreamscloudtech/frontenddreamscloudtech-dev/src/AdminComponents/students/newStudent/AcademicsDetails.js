import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { studentStatus } from "../../../data";
import {
  selectClasses,
  selectDormitories,
  selectScholarship,
  selectSection,
  selectDivisions,
  selectFees,
  selectCampuses,
} from "../../../store/slices/schoolSlice";

function AcademicsDetails(props) {
  const classes = useSelector(selectClasses);
  const dormitories = useSelector(selectDormitories);
  const scholarship = useSelector(selectScholarship);
  const sections = useSelector(selectSection);
  const campuses = useSelector(selectCampuses);
  const divisions = useSelector(selectDivisions);
  const feesType = useSelector(selectFees);

  let {
    register,
    errors,
    autoID,
    setautoID,
    userID,
    setuserID,
    classID,
    setclass,
    section,
    setsection,
    division,
    setdivision,
    status,
    setstatus,
    dormitory,
    setdormitory,
    schoolarship,
    setschoolarship,
    feesCategory,
    setfeesCategory,
    lastSchool,
    setlastSchool,
    reasonforTransfer,
    isEdit,
    setreasonforTransfer,
    campus,
    setcampus,
  } = props;

  return (
    <div>
      <h3>Academics Details</h3>
      <div className="row mb-3">
        {!isEdit && (
          <>
            <div className="col-xs-12 col-sm-6">
              <label htmlFor="name" className="form-label">
                Auto Generate ID
              </label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={() => setautoID(!autoID)}
                  id="flexSwitchCheckChecked"
                  checked={autoID}
                />
              </div>
            </div>
            {!autoID && (
              <div className="col-xs-12 col-sm-6 ">
                <label className="form-label">Student ID</label>
                <input
                  style={{ backgroundColor: " #ffffff", fontSize: "15px" }}
                  name="userID"
                  value={userID}
                  onChange={(e) => setuserID(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
            )}
          </>
        )}
      </div>
      <div className="row mb-3">
        <div className="col-xs-12 col-sm-6 col-md-3 mb-3">
          <label className="form-label">Class</label>
          <select
            style={{ backgroundColor: " #ffffff", fontSize: "15px" }}
            ref={register({ required: true })}
            value={classID || ""}
            onChange={(e) => setclass(e.target.value)}
            name="class"
            className="form-select"
            aria-label="Default select example"
          >
            <option defaultValue hidden>
              select
            </option>
            {classes.length > 0 ? (
              classes.slice().reverse().map((e) => (
                <option key={e.classCode} value={e.classCode}>
                  {e.name}
                </option>
              ))
            ) : (
              <option disabled>No data yet</option>
            )}
          </select>
          {errors.class && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
        <div className="col-xs-12 col-sm-6 col-md-3 mb-3">
          <label className="form-label">Section / House</label>
          <select
            style={{ backgroundColor: " #ffffff", fontSize: "15px" }}
            value={section || ""}
            onChange={(e) => setsection(e.target.value)}
            name="house"
            className="form-select"
            aria-label="Default select example"
          >
            <option defaultValue hidden>
              select
            </option>
            {sections.length > 0 ? (
              sections.map((e) => (
                <option key={e._id} value={e._id}>
                  {e.name}
                </option>
              ))
            ) : (
              <option disabled>No data yet</option>
            )}
          </select>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-3 mb-3">
          <label className="form-label">Divisions</label>
          <select
            style={{ backgroundColor: " #ffffff", fontSize: "15px" }}
            value={division || ""}
            onChange={(e) => setdivision(e.target.value)}
            name="house"
            className="form-select"
            aria-label="Default select example"
          >
            <option defaultValue hidden>
              select
            </option>
            {divisions.length > 0 ? (
              divisions.map((e) => (
                <option key={e._id} value={e._id}>
                  {e.name}
                </option>
              ))
            ) : (
              <option disabled>No data yet</option>
            )}
          </select>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-3 mb-3">
          <label className="form-label">Status</label>
          <select
            style={{ backgroundColor: " #ffffff", fontSize: "15px" }}
            ref={register({ required: true })}
            name="status"
            value={status || ""}
            onChange={(e) => setstatus(e.target.value)}
            className="form-select"
            aria-label="Default select example"
          >
            <option defaultValue hidden>
              select
            </option>
            {studentStatus &&
              studentStatus.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}{" "}
                </option>
              ))}
          </select>
          {errors.status && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>

        {(status === "border" || status === "freshBorder") ? (
          <div className="col-xs-12 col-sm-6 col-md-4">
            <label className="form-label">Bus/Van</label>
            <select
              style={{ backgroundColor: " #ffffff", fontSize: "15px" }}
              value={dormitory || ""}
              onChange={(e) => setdormitory(e.target.value)}
              name="dormitory"
              className="form-select"
              aria-label="Default select example"
            >
              <option defaultValue hidden>
                Select
              </option>
              {dormitories.length > 0 ? (
                dormitories.map((e) => (
                  <option key={e._id} value={e._id}>
                    {e.name}
                  </option>
                ))
              ) : (
                <option disabled>No data yet</option>
              )}
            </select>
          </div>
        ) : (
          setdormitory("")
        )}

      </div>
      <div className="row mb-3">
        <div className="col-xs-12 col-sm-6  col-md-4">
          <label className="form-label">Scholarship</label>
          <select
            style={{ backgroundColor: " #ffffff", fontSize: "15px" }}
            value={schoolarship || ""}
            onChange={(e) => setschoolarship(e.target.value)}
            name="scholarship"
            className="form-select"
            aria-label="Default select example"
          >
            <option defaultValue hidden>
              select
            </option>
            {scholarship.length > 0 ? (
              scholarship.map((e) => (
                <option key={e._id} value={e._id}>
                  {e.name}
                </option>
              ))
            ) : (
              <option disabled>No data yet</option>
            )}
          </select>
        </div>

        <div className="col-xs-12 col-sm-6  col-md-4">
          <label className="form-label">Fees Category</label>
          <select
            style={{ backgroundColor: " #ffffff", fontSize: "15px" }}
            name="feesCategory"
            value={feesCategory || ""}
            onChange={(e) => setfeesCategory(e.target.value)}
            className="form-select"
            aria-label="Default select example"
          >
            <option defaultValue hidden>
              select
            </option>
            {feesType.length > 0 ? (
              feesType.slice().reverse().map((e) => (
                <option key={e.code} value={e.code}>
                  {e.name}
                </option>
              ))
            ) : (
              <option disabled>No data yet</option>
            )}
          </select>
          {feesType.length <= 0 && (
            <Link to="/academics/classgroups">Set fees</Link>
          )}
        </div>
        <div className="col-xs-12 col-sm-6  col-md-4">
          <label className="form-label">Campus</label>
          <select
            style={{ backgroundColor: " #ffffff", fontSize: "15px" }}
            name="feesCategory"
            value={campus || ""}
            onChange={(e) => setcampus(e.target.value)}
            className="form-select"
            aria-label="Default select example"
          >
            <option defaultValue hidden>
              select
            </option>
            {campuses.length > 0 ? (
              campuses.map((e) => (
                <option key={e._id} value={e._id}>
                  {e.name}
                </option>
              ))
            ) : (
              <option disabled>No data yet</option>
            )}
          </select>
        </div>
      </div>

    </div>
  );
}

export default AcademicsDetails;
