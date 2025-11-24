import React from "react";

function AddDormitories({ name, setname, loading, onSubmit }) {
  return (
    <div className="content__container " style={{ backgroundColor: "#EEF7FF", display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
      <div className="d-flex align-items-center mt-2 mb-2">
        <h4 className="mb-0 me-3">Add Bus Name</h4>
        <form className="d-flex flex-grow-1">
          <input
            value={name}
            onChange={(e) => setname(e.target.value)}
            type="text"
            className="form-control me-3"
            id="name"
            placeholder="Enter Bus Name"
            style={{ maxWidth: '320px', backgroundColor: "#ffffff" }}
          />
          <button
            onClick={onSubmit}
            disabled={loading || name === ""}
            className="btn red__btn text-white"
            style={{ backgroundColor: '#red', border: 'none', width: '100px', maxWidth: '100px' }}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDormitories;
