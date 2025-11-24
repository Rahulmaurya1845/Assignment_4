// import React from "react";
// import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
// import {
//   selectYearGroup,
//   selectCampuses,
//   selectClasses,
// } from "../../../store/slices/schoolSlice";

// function Search({
//   year,
//   setyear,
//   term,
//   setterm,
//   classID,
//   setclassID,
//   campus,
//   setcampus,
//   handleSearch,
//   loading,
// }) {
//   const { register, handleSubmit, errors } = useForm();
//   const years = useSelector(selectYearGroup);
//   const classes = useSelector(selectClasses);
//   const campuses = useSelector(selectCampuses);

//   return (
//     <form action="" className="row" style={{ backgroundColor: "#EEF7FF" }}>
//       <div className="col-sm-6 col-mb-4 mb-3">
//         <label className="col-form-label">Academic Year</label>
//         <div className="">
//           <select
//             style={{ backgroundColor: "#ffffff" }}
//             value={year}
//             ref={register({ required: true })}
//             onChange={(e) => setyear(e.target.value)}
//             name="year"
//             className="form-select"
//           >
//             <option hidden defaultValue>
//               Choose...
//             </option>
//             {years &&
//               years.map((e) => (
//                 <option key={e.year} value={e.year}>
//                   {e.year}
//                 </option>
//               ))}
//           </select>
//         </div>
//         {errors.year && (
//           <span className=" form-error text-danger mb-2">
//             This field is required
//           </span>
//         )}
//       </div>
//       <div className="col-sm-6 col-mb-4 mb-3">
//         <label className="col-form-label">Month</label>
//         <div className="">
//           <select
//             style={{ backgroundColor: "#ffffff" }}
//             value={term}
//             ref={register({ required: true })}
//             onChange={(e) => setterm(e.target.value)}
//             name="term"
//             className="form-select"
//           >
//             <option hidden defaultValue>
//               Choose...
//             </option>
//             {/* <option value="1">1st</option>
//             <option value="2">2rd</option>
//             <option value="3">3rd</option> */}
//             <option value={"January"}>January</option>
//             <option value={"February"}>February</option>
//             <option value={"March"}>March</option>
//             <option value={"April"}>April</option>
//             <option value={"May"}>May</option>
//             <option value={"June"}>June</option>
//             <option value={"July"}>July</option>
//             <option value={"August"}>August</option>
//             <option value={"September"}>September</option>
//             <option value={"October"}>October</option>
//             <option value={"November"}>November</option>
//             <option value={"December"}>December</option>
//           </select>
//         </div>
//       </div>

//       <div className="col-sm-6 col-mb-4 mb-3">
//         <label className="col-form-label">Class</label>
//         <div className="">
//           <select
//             style={{ backgroundColor: "#ffffff" }}
//             value={classID}
//             ref={register({ required: true })}
//             onChange={(e) => setclassID(e.target.value)}
//             name="term"
//             className="form-select"
//           >
//             <option hidden defaultValue>
//               Select
//             </option>
//             <option value="all">All</option>
//             {classes &&
//               classes.slice().reverse().map((e) => (
//                 <option key={e.classCode} value={e.classCode}>
//                   {e.name}
//                 </option>
//               ))}
//           </select>
//         </div>
//       </div>

//       <div className=" mb-3">
//         <div className="">
//           <button
//             disabled={loading}
//             onClick={handleSubmit(handleSearch)}
//             className="btn blue__btn"
//           >
//             {loading && (
//               <span
//                 className="spinner-border spinner-border-sm"
//                 role="status"
//                 aria-hidden="true"
//               ></span>
//             )}
//             Search
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }

// export default Search;


import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  selectYearGroup,
  selectCampuses,
  selectClasses,
} from "../../../store/slices/schoolSlice";

function Search({
  year,
  setyear,
  term,
  setterm,
  classID,
  setclassID,
  campus,
  setcampus,

  handleSearch,
  loading,
}) {
  // const { register, handleSubmit, errors } = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const years = useSelector(selectYearGroup);
  const classes = useSelector(selectClasses);
  const campuses = useSelector(selectCampuses);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");


  //   const handleSearch = (formData) => {
  //   const from = new Date(fromDate);
  //   const to = new Date(toDate);

  //   const filtered = allBills.filter((bill) => {
  //     const billDate = new Date(bill.date);
  //     return billDate >= from && billDate <= to;
  //   });

  //   setFilteredBills(filtered);
  // };
  // Send form data + date range to parent search handler
  const onSubmit = () => {
    handleSearch({
      year,
      term,
      classID,
      fromDate,
      toDate,
    });
  };

  return (
    // <form action="" className="row" style={{ backgroundColor: "#EEF7FF" }}>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="row"
      style={{ backgroundColor: "#EEF7FF" }}
    >
      <div className="col-sm-6 col-mb-4 mb-3">
        <label className="col-form-label">Academic Year</label>
        <div className="">
          <select
            style={{ backgroundColor: "#ffffff" }}
            value={year}
            ref={register({ required: true })}
            onChange={(e) => setyear(e.target.value)}
            name="year"
            className="form-select"
          >
            <option hidden defaultValue>
              Choose...
            </option>
            {years &&
              years.map((e) => (
                <option key={e.year} value={e.year}>
                  {e.year}
                </option>
              ))}
          </select>
        </div>
        {errors.year && (
          <span className=" form-error text-danger mb-2">
            This field is required
          </span>
        )}
      </div>
      <div className="col-sm-6 col-mb-4 mb-3">
        <label className="col-form-label">Month</label>
        <div className="">
          <select
            style={{ backgroundColor: "#ffffff" }}
            value={term}
            ref={register({ required: true })}
            onChange={(e) => setterm(e.target.value)}
            name="term"
            className="form-select"
          >
            <option hidden defaultValue>
              Choose...
            </option>
            {/* <option value="1">1st</option>
            <option value="2">2rd</option>
            <option value="3">3rd</option> */}
            <option value={"January"}>January</option>
            <option value={"February"}>February</option>
            <option value={"March"}>March</option>
            <option value={"April"}>April</option>
            <option value={"May"}>May</option>
            <option value={"June"}>June</option>
            <option value={"July"}>July</option>
            <option value={"August"}>August</option>
            <option value={"September"}>September</option>
            <option value={"October"}>October</option>
            <option value={"November"}>November</option>
            <option value={"December"}>December</option>
          </select>
        </div>
      </div>

      <div className="col-sm-6 col-mb-4 mb-3">
        <label className="col-form-label">Class</label>
        <div className="">
          <select
            style={{ backgroundColor: "#ffffff" }}
            value={classID}
            ref={register({ required: true })}
            onChange={(e) => setclassID(e.target.value)}
            name="term"
            className="form-select"
          >
            <option hidden defaultValue>
              Select
            </option>
            <option value="all">All</option>
            {classes &&
              classes.slice().reverse().map((e) => (
                <option key={e.classCode} value={e.classCode}>
                  {e.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      {/* Date Range Filter */}
      <div className="col-sm-6 col-mb-4 mb-3">
        <label className="col-form-label">From Date</label>
        <input
          type="date"
          className="form-control"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          style={{ backgroundColor: "#ffffff" }}
        />
      </div>

      <div className="col-sm-6 col-mb-4 mb-3">
        <label className="col-form-label">To Date</label>
        <input
          type="date"
          className="form-control"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          style={{ backgroundColor: "#ffffff" }}
        />
      </div>



      <div className=" mb-3">
        <div className="">
          <button
            disabled={loading}
            onClick={handleSubmit(handleSearch)}
            className="btn blue__btn"
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            Search
          </button>
        </div>
      </div>
    </form>
  );
}

export default Search;