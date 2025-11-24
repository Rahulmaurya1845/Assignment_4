import React from "react";
import Notice from "../../components/dashboard/Notice";

function Notices({
  openEdit,
  setopenEdit,
  notices,
  searchDate,
  handleSearch,
  handleReset,
  setsearchDate,
  searchTitle,
  setsearchTitle,
  editData,
  handleDelete,
}) {
  return (
    <div className="content__container" style={{ backgroundColor: " #EEF7FF" }}>
      <h3 style={{ marginLeft: "20px" }}>Notice Board</h3>
      <form style={{ marginLeft: "5px" }} action="" className="row">
        <div className="col-sm-4 mb-0 mt-2">
          <input
            type="date"
            style={{ backgroundColor: " #ffffff" }}
            value={searchDate}
            onChange={(e) => setsearchDate(e.target.value)}
            placeholder="Search by Date"
            className="form-control"
          />
        </div>
        <div className="col-sm-4 mb-3 mt-2">
          <input
            type="text"
            style={{ backgroundColor: " #ffffff" }}
            value={searchTitle}
            onChange={(e) => setsearchTitle(e.target.value)}
            placeholder="Search by Title"
            className="form-control"
          />
        </div>
        <div className="col-sm-3 d-flex  mt-2">
          <div>
            <button onClick={handleSearch} className="btn blue__btn mr-4">
              Search
            </button>
          </div>
          <div>
            <button onClick={handleReset} className="btn red__btn">
              Reset
            </button>
          </div>
        </div>
      </form>
      <div className="notice__container my-5">

        {notices?.length > 0 ? (

          <Notice

            open={openEdit}
            isEdit={true}
            setOpen={setopenEdit}
            editData={editData}
            handleDelete={handleDelete}
            notices={notices}
          />
        ) : (
          <h4>No Notice yet</h4>
        )}
      </div>
    </div>
  );
}

export default Notices;
