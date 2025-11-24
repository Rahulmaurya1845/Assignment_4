import React from "react";

function Search(props) {
  const {
    inputFields,
    title,
    handleSearch,
    isReset,
    handleReset,
    noActions,
  } = props;

  return (
    <form
      className="content__container"
      style={{ display: "flex", alignItems: "center", flexWrap: "nowrap", width: "100%", marginTop: "-4px", backgroundColor: "#EEF7FF" }}
    >
      <h3 style={{ marginRight: "30px", whiteSpace: "nowrap" }}>{title || ""}</h3>
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          overflowX: "auto",
          whiteSpace: "nowrap",
          marginLeft: "0px"
        }}
      >
        {inputFields &&
          inputFields.map((input) => (
            <div
              key={input?.name}
              style={{ marginLeft: "2px", marginRight: "20px", flex: "0 0 auto", minWidth: "130px" }}
            >
              <label htmlFor={input?.name} style={{ display: "block" }}>
                {input.label}
              </label>
              {input.type === "select" ? (
                <select
                  value={input?.value}
                  name={input?.name}
                  onChange={(e) => input?.onChange(e.target.value)}
                  className="form-select form-select-sm"
                  style={{
                    padding: "0.375rem 0.75rem",
                    height: "calc(1.5rem + 0.75rem + 2px)",
                    minWidth: "100px",
                  }}
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
                  type={input.type}
                  value={input.value}
                  name={input?.name}
                  className="form-control"
                  placeholder={`Search by ${input.name}`}
                  onChange={(e) => input?.onChange(e.target.value)}
                  style={{
                    minWidth: "100px",
                    width: "170px"
                  }}
                />
              )}
            </div>
          ))}
      </div>
      <div style={{ marginLeft: "15px", display: "flex", alignItems: "center" }}>
        {!noActions && (
          <>
            <button
              className="btn ggreen__btn"
              onClick={handleSearch}
              style={{ marginRight: "10px", marginTop: "30px" }}
            >
              Search
            </button>
            {!isReset && (
              <button className="btn red__btn" onClick={handleReset} style={{ marginTop: "30px" }}>
                Reset
              </button>
            )}
          </>
        )}
      </div>
    </form>
  );
}

export default Search;
