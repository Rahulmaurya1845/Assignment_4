// import React from "react";
// import { useForm } from "react-hook-form";
// import Checkbox from "@material-ui/core/Checkbox";

// function Form({
//   name,
//   setname,
//   amount,
//   setamount,
//   handleSetStaff,
//   staff,
//   handleSelectAll,
//   Allstaff,
//   onSubmit,
//   loading,
//   isEdit,
// }) {
//   const { register, handleSubmit, errors } = useForm();

//   return (
//     <form style={{ backgroundColor: "#EEF7FF" }}>
//       <div className="mb-3">
//         <label htmlFor="name" className="col-form-label" style={{ fontWeight: "bold" }}>
//           Name
//         </label>
//         <input
//           style={{ backgroundColor: "#ffffff", fontWeight: "bold" }}
//           value={name}
//           placeholder="Name"
//           onChange={(e) => setname(e.target.value)}
//           type="text"
//           ref={register({ required: true })}
//           className="form-control"
//           name="name"
//         />
//         {errors.name && (
//           <span className="form-error text-danger mb-2" style={{ fontWeight: "bold" }}>
//             This field is required
//           </span>
//         )}
//       </div>
//       <div className="mb-3">
//         <label htmlFor="amount" className="col-form-label" style={{ fontWeight: "bold" }}>
//           Amount
//         </label>
//         <input
//           style={{ backgroundColor: "#ffffff", fontWeight: "bold" }}
//           placeholder="Amount"
//           value={amount}
//           onChange={(e) => setamount(e.target.value)}
//           type="number"
//           ref={register({ required: true })}
//           className="form-control"
//           name="amount"
//         />
//         {errors.amount && (
//           <span className="form-error text-danger mb-2" style={{ fontWeight: "bold" }}>
//             This field is required
//           </span>
//         )}
//       </div>
//       <div className="mb-3 row">
//         <label htmlFor="amount" className="col-form-label col-6" style={{ fontWeight: "bold" }}>
//           Select Staff
//         </label>
//         <div className="row col-6">
//           <div className="col-5 ml-2 mr-1 mt-2" style={{ fontWeight: "bold" }}>
//             Select All
//           </div>
//           <div className="col-2">
//             <Checkbox
//               onChange={handleSelectAll}
//               color="primary"
//             />
//           </div>
//         </div>
//         <hr style={{ width: "95%", }} />
//         {Allstaff &&
//           Allstaff.map((e, i) => (
//             <div key={i} className="row" style={{ fontWeight: "bold" }}>
//               <div className="col-9">
//                 {e?.name} {e?.surname}
//               </div>
//               <div className="col-3">
//                 <Checkbox
//                   value={e?.userID}
//                   checked={staff.includes(e?.userID)}
//                   onChange={handleSetStaff}
//                   color="primary"
//                 />
//               </div>
//             </div>
//           ))}
//       </div>
//       <div>
//         <button
//           onClick={handleSubmit(onSubmit)}
//           className="btn red__btn"
//           style={{ fontWeight: "bold" }}
//         >
//           {loading && (
//             <span
//               className="spinner-border spinner-border-sm"
//               role="status"
//               aria-hidden="true"
//             ></span>
//           )}
//           {isEdit ? "Save Changes" : "Add"}
//         </button>
//       </div>
//     </form>
//   );
// }

// export default Form;


import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Checkbox from "@material-ui/core/Checkbox";

function Form({
  name,
  setname,
  amount,
  setamount,
  handleSetStaff,
  staff,
  handleSelectAll,
  Allstaff,
  onSubmit,
  loading,
  isEdit,
}) {
  const { register, handleSubmit, errors } = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStaff = Allstaff.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(Allstaff.length / itemsPerPage);

  return (
    <form style={{ backgroundColor: "#EEF7FF" }}>
      <div className="mb-3">
        <label htmlFor="name" className="col-form-label" style={{ fontWeight: "bold" }}>
          Name
        </label>
        <input
          style={{ backgroundColor: "#ffffff", fontWeight: "bold" }}
          value={name}
          placeholder="Name"
          onChange={(e) => setname(e.target.value)}
          type="text"
          ref={register({ required: true })}
          className="form-control"
          name="name"
        />
        {errors.name && (
          <span className="form-error text-danger mb-2" style={{ fontWeight: "bold" }}>
            This field is required
          </span>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="col-form-label" style={{ fontWeight: "bold" }}>
          Amount
        </label>
        <input
          style={{ backgroundColor: "#ffffff", fontWeight: "bold" }}
          placeholder="Amount"
          value={amount}
          onChange={(e) => setamount(e.target.value)}
          type="number"
          ref={register({ required: true })}
          className="form-control"
          name="amount"
        />
        {errors.amount && (
          <span className="form-error text-danger mb-2" style={{ fontWeight: "bold" }}>
            This field is required
          </span>
        )}
      </div>
      <div className="mb-3 row">
        <label htmlFor="amount" className="col-form-label col-6" style={{ fontWeight: "bold" }}>
          Select Staff
        </label>
        <div className="row col-6">
          <div className="col-5 ml-2 mr-1 mt-2" style={{ fontWeight: "bold" }}>
            Select All
          </div>
          <div className="col-2">
            <Checkbox onChange={handleSelectAll} color="primary" />
          </div>
        </div>
        <hr style={{ width: "95%" }} />

        {Allstaff.length > 5 ? (
          <>
            {currentStaff.map((e, i) => (
              <div key={i} className="row" style={{ fontWeight: "bold" }}>
                <div className="col-9">
                  {e?.name}&nbsp;{e?.surname}
                </div>
                <div className="col-3">
                  <Checkbox
                    value={e?.userID}
                    checked={staff.includes(e?.userID)}
                    onChange={handleSetStaff}
                    color="primary"
                  />
                </div>
              </div>
            ))}

            {/* Pagination Controls */}
            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn btn-sm btn-secondary mx-2"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span style={{ fontWeight: "bold" }}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn-sm btn-secondary mx-2"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          Allstaff.map((e, i) => (
            <div key={i} className="row" style={{ fontWeight: "bold" }}>
              <div className="col-9">
                {e?.name} {e?.surname}
              </div>
              <div className="col-3">
                <Checkbox
                  value={e?.userID}
                  checked={staff.includes(e?.userID)}
                  onChange={handleSetStaff}
                  color="primary"
                />
              </div>
            </div>
          ))
        )}
      </div>
      <div>
        <button
          onClick={handleSubmit(onSubmit)}
          className="btn red__btn"
          style={{ fontWeight: "bold" }}
        >
          {loading && (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          )}
          {isEdit ? "Save Changes" : "Add"}
        </button>
      </div>
    </form>
  );
}

export default Form;
