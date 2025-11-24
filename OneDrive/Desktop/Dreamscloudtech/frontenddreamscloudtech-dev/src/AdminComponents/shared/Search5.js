import React from "react";
import { Link } from "react-router-dom";

function Search(props) {
  let {
    inputFields,
    title,
    handleSearch,
    isReset,
    handleReset,
    noActions,
  } = props;

  return (
    <form
      className="mb-0 content__container"
      onSubmit={(e) => e.preventDefault()}
      style={{ backgroundColor: "#EEF7FF" }}
    >
      <h3 className="mb-3">{title || ""}</h3>

      <div
        className="d-flex flex-wrap justify-content-center align-items-center gap-3 mb-3"
        style={{ rowGap: "1rem" }} // Ensure rows have equal spacing
      >
        {/* Register Attendance Button */}
        <div className="col-xs-12 col-sm-6 col-md-2">
          <Link to="/attendance/staff/register" className="btn green__btn w-90 mt-4" style={{ fontSize: "13px", marginBottom: "0px" }}>
            Register Attendance
          </Link>
        </div>

        {/* Input Fields */}
        {inputFields &&
          inputFields.map((input) => (
            <div key={input?.name} className="col-xs-12 col-sm-6 col-md-2">
              <label htmlFor={input?.name}>{input.label}</label>
              {input.type === "date" ? (
                <input
                  style={{ backgroundColor: "#fffffd" }}
                  type="date"
                  value={input.value || ""}
                  name={input?.name}
                  className="form-control py-3"
                  onChange={(e) => input?.onChange(e.target.value)}
                />
              ) : input.type === "select" ? (
                <select
                  style={{ backgroundColor: "#fffffd" }}
                  value={input?.value || ""}
                  name={input?.name}
                  onChange={(e) => input?.onChange(e.target.value)}
                  className="form-select form-select-sm py-2"
                >
                  <option hidden defaultValue>
                    Select
                  </option>
                  {input?.options?.length > 0 ? (
                    input?.options.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No data</option>
                  )}
                </select>
              ) : (
                <input
                  style={{ backgroundColor: "#fffffd" }}
                  type={input.type}
                  value={input.value || ""}
                  name={input?.name}
                  className="form-control py-3"
                  placeholder={`Search by ${input.name}`}
                  onChange={(e) => input?.onChange(e.target.value)}
                />
              )}
            </div>
          ))}

        {/* Actions: Search and Reset Buttons */}
        {!noActions && (
          <div className="col-xs-12 col-sm-6 col-md-2 d-flex gap-2  mt-4">
            <button className="btn blue__btn w-100" onClick={handleSearch}>
              Search
            </button>
            {!isReset && (
              <button onClick={handleReset} className="btn red__btn w-100">
                Reset
              </button>
            )}
          </div>
        )}
      </div>
    </form>
  );
}

export default Search;
