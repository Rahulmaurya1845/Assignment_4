import React, { useState } from "react";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";

function PromotingCampus({ campuses }) {
  const [currentcampus, setcurrentcampus] = useState("");
  const [nextcampus, setnextcampus] = useState("");
  const [loading, setloading] = useState(false);
  const [errors, seterrors] = useState(false);

  const handleChangeCampuse = (e) => {
    e.preventDefault();
    seterrors(false);
    if (currentcampus === "" || nextcampus === "") {
      seterrors({ ...errors, campuses: true });
      return 0;
    } else {
      setloading(true);
      axios
        .post("/students/upgrade/campus", { currentcampus, nextcampus })
        .then(async (res) => {
          setloading(false);
          if (res.data.error) {
            errorAlert(res.data.error);
            return 0;
          }
          successAlert("Changes are successfully done");
          setcurrentcampus("");
          setnextcampus("");
          await axios.post("/activitylog/create", {
            activity: `students in campus ${currentcampus} were moved to campus ${nextcampus}`,
            user: "admin",
          });
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
          errorAlert("something went wrong");
        });
    }
  };

  const handleCancelCampus = (e) => {
    e.preventDefault();
    setcurrentcampus("");
    setnextcampus("");
    seterrors(false);
  };

  return (
    <div style={{ backgroundColor: "#EEF7FF" }}>
      <form className="content__container mb-3" style={{ backgroundColor: "#EEF7FF" }}>
        <div className="row mb-3 aligh-items-center">
          <div className="col-12 ">
            <h3 className="mb-4" style={{ fontSize: "20px" }}>Promoting Students to another Campus</h3>
          </div>
          <div className="col-xs-12 col-sm-6 ">
            <label>Current Campus</label>
            <select
              style={{ backgroundColor: "#ffffff", fontSize: "15px" }}
              name="campus"
              value={currentcampus}
              onChange={(e) => setcurrentcampus(e.target.value)}
              className="form-select"
              aria-label="Default select example"
            >
              <option defaultValue hidden>
                select
              </option>
              {campuses.length > 0 ? (
                campuses.map((campus) => (
                  <option value={campus._id} key={campus._id}>
                    {campus.name}
                  </option>
                ))
              ) : (
                <option disabled>No options yet</option>
              )}
            </select>
          </div>
          <div className="col-xs-12 col-sm-6 ">
            <label>Promote Campus</label>
            <select
              style={{ backgroundColor: "#ffffff", fontSize: "15px" }}
              name="nextcampus"
              value={nextcampus}
              onChange={(e) => setnextcampus(e.target.value)}
              className="form-select"
              aria-label="Default select example"
            >
              <option defaultValue hidden>
                select
              </option>
              {campuses.length > 0 ? (
                campuses.map((campus) => (
                  <option value={campus._id} key={campus._id}>
                    {campus.name}
                  </option>
                ))
              ) : (
                <option disabled>No options yet</option>
              )}
            </select>
          </div>
          {errors.campuses && (
            <div className="text-danger"> Please select all field </div>
          )}
          <div className="col-xs-12 col-sm-12 d-flex justify-content-center  mb-2 mt-4">
            <button
              disabled={loading}
              className="btn blue__btn me-3"
              style={{ width: "135px", fontSize: "14px" }}
              onClick={handleChangeCampuse}
            >
              {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
              Save Changes
            </button>
            <button
              className="btn red__btn"
              style={{ width: "105px" }}
              onClick={handleCancelCampus}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PromotingCampus;
