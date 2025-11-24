import React from "react";
import { useForm } from "react-hook-form";

function AddScholarship(props) {
  const {
    name,
    setname,
    loading,
    percentage,
    setpercentage,
    types,
    settypes,
    handleAdd,
  } = props;
  const { register, handleSubmit, errors } = useForm();

  const checkedAll = () => {
    return (
      types.tuition === true &&
      types.facility === true &&
      types.maintenance === true &&
      types.examination === true &&
      types.transportation === true
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      settypes({
        tuition: true,
        facility: true,
        maintenance: true,
        examination: true,
        transportation: true,
      });
    } else {
      settypes({
        tuition: false,
        facility: false,
        maintenance: false,
        examination: false,
        transportation: false,
      });
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    settypes({
      tuition: true,
      facility: true,
      maintenance: true,
      examination: true,
      transportation: true,
    });
    setname("");
    setpercentage("");
  };

  return (
    <div className="content__container" style={{ backgroundColor: "#EEF7FF" }}>
      <h5 className="mb-4">Add Scholarship</h5>
      <form action="">
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Name</label>
          <div className="col-sm-9">
            <input
              style={{ backgroundColor: "#fffffd" }}
              value={name}
              onChange={(e) => setname(e.target.value)}
              type="text"
              ref={register({ required: true })}
              className="form-control"
              name="name"
            />
            {errors.name && (
              <span className="form-error text-danger mb-2">
                This field is required
              </span>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Percentage</label>
          <div className="col-sm-9">
            <input
              style={{ backgroundColor: "#fffffd" }}
              value={percentage}
              onChange={(e) => setpercentage(e.target.value)}
              ref={register({ required: true, max: 100 })}
              type="number"
              className="form-control"
              name="percentage"
            />
            {errors.percentage && (
              <span className="form-error text-danger mb-2">
                This field is required
              </span>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Fee type Affected</label>
          <div className="col-sm-9">
            {/* Select All Checkbox */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="selectAll"
                checked={checkedAll()}
                onChange={handleSelectAll}
              />
              <label className="form-check-label" htmlFor="selectAll">
                Select All
              </label>
            </div>
            <hr />
            {/* Individual Checkboxes */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="tuition"
                checked={types.tuition}
                onChange={() => settypes({ ...types, tuition: !types.tuition })}
              />
              <label className="form-check-label" htmlFor="tuition">
                Tuition Fee
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="facility"
                checked={types.facility}
                onChange={() =>
                  settypes({ ...types, facility: !types.facility })
                }
              />
              <label className="form-check-label" htmlFor="facility">
                Transport Fee
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="maintenance"
                checked={types.maintenance}
                onChange={() =>
                  settypes({ ...types, maintenance: !types.maintenance })
                }
              />
              <label className="form-check-label" htmlFor="maintenance">
                Maintenance Fee
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="examination"
                checked={types.examination}
                onChange={() =>
                  settypes({ ...types, examination: !types.examination })
                }
              />
              <label className="form-check-label" htmlFor="examination">
                Examination Fee
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="transportation"
                checked={types.transportation}
                onChange={() =>
                  settypes({
                    ...types,
                    transportation: !types.transportation,
                  })
                }
              />
              <label className="form-check-label" htmlFor="transportation">
                Transportation Fee
              </label>
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="offset-sm-3 col-xs-8">
            <button
              disabled={loading}
              onClick={handleSubmit(handleAdd)}
              className="btn blue__btn"
            >
              {loading && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              Add Scholarship
            </button>
            <button onClick={handleCancel} className="btn red__btn ml-3">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddScholarship;
