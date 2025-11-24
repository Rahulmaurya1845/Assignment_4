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
    <form className="mb-0 content__container" style={{ backgroundColor: "#EEF7FF" }}>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Link to="/academics/classes/add" className="btn green__btn btn__lg mb-0 mr-4">
          Add New Class
        </Link>
        <h4 className="mb-0 mr-3">{title || ""}</h4>
        {inputFields &&
          inputFields.map((input) => (
            <div key={input?.name} className="mx-1 mb-4" >
              <label htmlFor="" className="d-block text-left ml-2 pl-1 ">{input.label}</label>
              {input.type === "select" ? (
                <select
                  style={{ backgroundColor: "#ffffff" }}
                  value={input?.value}
                  name={input?.name}
                  onChange={(e) => input?.onChange(e.target.value)}
                  className="form-select form-select-sm py-2"
                >
                  <option hidden defaultValue>
                    Select
                  </option>
                  {input?.options.length > 0 ? (
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
                  style={{ backgroundColor: "#ffffff" }}
                  type={input.type}
                  value={input.value}
                  name={input?.name}
                  className="form-control py-3"
                  placeholder={`Search by ${input.name}`}
                  onChange={(e) => input?.onChange(e.target.value)}
                />
              )}
            </div>
          ))}
        {!noActions && (
          <div className="d-flex align-items-center ml-3">
            <button className="btn orange__btn mx-2" onClick={handleSearch}>
              Search
            </button>
            {!isReset && (
              <button onClick={handleReset} className="btn red__btn mx-2">
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
