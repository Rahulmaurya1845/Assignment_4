import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectClasses,
  selectYearGroup,
} from "../../../store/slices/schoolSlice";

function SearchStudent({
  setclassID,
  classID,
  setstudentID,
  studentOptions,
  studentID,
  year,
  setyear,
  terms,
  setterms,
  loading,
  handleSearch,
  village,
  setvillage,
  villageOptions,
}) {
  const classes = useSelector(selectClasses);
  const years = useSelector(selectYearGroup);
  const [showMonths, setshowMonths] = useState(false);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const handleMonthToggle = (month) => {
    if (terms.includes(month)) {
      setterms(terms.filter((m) => m !== month));
    } else {
      setterms([...terms, month]);
    }
  };

  const handleSelectAllMonths = () => {
    if (terms.length === months.length) {
      setterms([]);
    } else {
      setterms([...months]);
    }
  };

  return (
    <div className="content__container mb-3" style={{ backgroundColor: "#EEF7FF" }}>
      <h4>Search Student</h4>
      <form action="">
        <div className="mb-3">
          <label className="form-label">Year</label>
          <select
            style={{ backgroundColor: "#ffffff" }}
            value={year}
            onChange={(e) => setyear(e.target.value)}
            name="year"
            className="form-select"
          >
            <option hidden defaultValue>
              Choose...
            </option>
            {years.length > 0 ? (
              years.map((e) => (
                <option key={e.year} value={e.year}>
                  {e.year}
                </option>
              ))
            ) : (
              <option disabled>No data</option>
            )}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Month(s)</label>
          <div className="selectBox">
            <select
              style={{ backgroundColor: "#ffffff" }}
              onClick={() => setshowMonths(!showMonths)}
              className="form-select"
            >
              <option>{terms.length > 0 ? terms.join(", ") : "Select months"}</option>
            </select>
            {showMonths && (
              <div className="showcheckboxes1 px-3 py-4" style={{ backgroundColor: "#ffffff", border: "1px solid #ccc" }}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={terms.length === months.length}
                    onChange={handleSelectAllMonths}
                  />
                  <label className="form-check-label">Select All</label>
                </div>
                <hr />
                {months.map((month) => (
                  <div key={month} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={terms.includes(month)}
                      onChange={() => handleMonthToggle(month)}
                    />
                    <label className="form-check-label">{month}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Class</label>
          <select
            style={{ backgroundColor: "#ffffff" }}
            value={classID}
            onChange={(e) => setclassID(e.target.value)}
            name="class"
            className="form-select"
          >
            <option hidden defaultValue>
              Choose...
            </option>
            {classes.length > 0 ? (
              classes
                .slice()
                .reverse()
                .map((e) => (
                  <option key={e.classCode} value={e.classCode}>
                    {e.name}
                  </option>
                ))
            ) : (
              <option disabled>No data</option>
            )}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Village</label>
          <select
            style={{ backgroundColor: "#ffffff" }}
            value={village}
            onChange={(e) => setvillage(e.target.value)}
            name="village"
            className="form-select"
          >
            <option hidden defaultValue>
              Choose...
            </option>
            {villageOptions.length > 0 ? (
              villageOptions.map((v) => (
                <option key={v.uniqueId} value={v.village}>
                  {v.village} (₹{v.amount})
                </option>
              ))
            ) : (
              <option disabled>No villages available</option>
            )}
          </select>
        </div>
        {loading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {studentOptions?.length > 0 && (
          <div className="mb-3">
            <label className="form-label">Student</label>
            <select
              style={{ backgroundColor: "#ffffff" }}
              value={studentID}
              onChange={(e) => setstudentID(e.target.value)}
              name="students"
              className="form-select"
            >
              <option hidden defaultValue>
                Choose...
              </option>
              {studentOptions?.length > 0 ? (
                studentOptions.map((e) => (
                  <option key={e.userID} value={e.userID}>
                    {e.name} {e.surname} - {e.userID}
                  </option>
                ))
              ) : (
                <option disabled>No data</option>
              )}
            </select>
          </div>
        )}
        <div>
          <button
            onClick={handleSearch}
            className="btn red__btn"
            disabled={loading}
          >
            {loading && <div className="spinner-border" role="status"></div>}
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchStudent;

// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import {
//   selectClasses,
//   selectYearGroup,
// } from "../../../store/slices/schoolSlice";

// function SearchStudent({
//   setclassID,
//   classID,
//   setstudentID,
//   studentOptions,
//   studentID,
//   year,
//   setyear,
//   terms,
//   setterms,
//   loading,
//   handleSearch,
//   village,
//   setvillage,
//   villageOptions,
// }) {
//   const classes = useSelector(selectClasses);
//   const years = useSelector(selectYearGroup);
//   const [showMonths, setshowMonths] = useState(false);

//   const months = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   const handleMonthToggle = (month) => {
//     if (terms.includes(month)) {
//       setterms(terms.filter((m) => m !== month));
//     } else {
//       setterms([...terms, month]);
//     }
//   };

//   const handleSelectAllMonths = () => {
//     if (terms.length === months.length) {
//       setterms([]);
//     } else {
//       setterms([...months]);
//     }
//   };

//   return (
//     <div className="content__container mb-3" style={{ backgroundColor: "#EEF7FF" }}>
//       <h4>Search Student</h4>
//       <form action="">
//         <div className="mb-3">
//           <label className="form-label">Year</label>
//           <select
//             style={{ backgroundColor: "#ffffff" }}
//             value={year}
//             onChange={(e) => setyear(e.target.value)}
//             name="year"
//             className="form-select"
//           >
//             <option hidden defaultValue>
//               Choose...
//             </option>
//             {years.length > 0 ? (
//               years.map((e) => (
//                 <option key={e.year} value={e.year}>
//                   {e.year}
//                 </option>
//               ))
//             ) : (
//               <option disabled>No data</option>
//             )}
//           </select>
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Month(s)</label>
//           <div className="selectBox">
//             <select
//               style={{ backgroundColor: "#ffffff" }}
//               onClick={() => setshowMonths(!showMonths)}
//               className="form-select"
//             >
//               <option>{terms.length > 0 ? terms.join(", ") : "Select months"}</option>
//             </select>
//             {showMonths && (
//               <div className="showcheckboxes1 px-3 py-4" style={{ backgroundColor: "#ffffff", border: "1px solid #ccc" }}>
//                 <div className="form-check">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     checked={terms.length === months.length}
//                     onChange={handleSelectAllMonths}
//                   />
//                   <label className="form-check-label">Select All</label>
//                 </div>
//                 <hr />
//                 {months.map((month) => (
//                   <div key={month} className="form-check">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       checked={terms.includes(month)}
//                       onChange={() => handleMonthToggle(month)}
//                     />
//                     <label className="form-check-label">{month}</label>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Class</label>
//           <select
//             style={{ backgroundColor: "#ffffff" }}
//             value={classID}
//             onChange={(e) => setclassID(e.target.value)}
//             name="class"
//             className="form-select"
//           >
//             <option hidden defaultValue>
//               Choose...
//             </option>
//             {classes.length > 0 ? (
//               classes
//                 .slice()
//                 .reverse()
//                 .map((e) => (
//                   <option key={e.classCode} value={e.classCode}>
//                     {e.name}
//                   </option>
//                 ))
//             ) : (
//               <option disabled>No data</option>
//             )}
//           </select>
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Village</label>
//           <select
//             style={{ backgroundColor: "#ffffff" }}
//             value={village}
//             onChange={(e) => setvillage(e.target.value)}
//             name="village"
//             className="form-select"
//           >
//             <option hidden defaultValue>
//               Choose...
//             </option>
//             {villageOptions.length > 0 ? (
//               villageOptions.map((v) => (
//                 <option key={v.uniqueId} value={v.village}>
//                   {v.village} (₹{v.amount})
//                 </option>
//               ))
//             ) : (
//               <option disabled>No villages available</option>
//             )}
//           </select>
//         </div>
//         {loading && (
//           <div className="d-flex justify-content-center">
//             <div className="spinner-border" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         )}
//         {studentOptions?.length > 0 && (
//           <div className="mb-3">
//             <label className="form-label">Student</label>
//             <select
//               style={{ backgroundColor: "#ffffff" }}
//               value={studentID}
//               onChange={(e) => setstudentID(e.target.value)}
//               name="students"
//               className="form-select"
//             >
//               <option hidden defaultValue>
//                 Choose...
//               </option>
//               {studentOptions?.length > 0 ? (
//                 studentOptions.map((e) => (
//                   <option key={e.userID} value={e.userID}>
//                     {e.name} {e.surname} - {e.userID}
//                   </option>
//                 ))
//               ) : (
//                 <option disabled>No data</option>
//               )}
//             </select>
//           </div>
//         )}
//         <div>
//           <button
//             onClick={handleSearch}
//             className="btn red__btn"
//             disabled={loading}
//           >
//             {loading && <div className="spinner-border" role="status"></div>}
//             Search
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default SearchStudent;


// // import React from "react";
// // import { useSelector } from "react-redux";
// // import {
// //   selectClasses,
// //   selectYearGroup,
// // } from "../../../store/slices/schoolSlice";

// // /** function SearchStudent({
// //   setclassID,
// //   classID,
// //   setstudentID,
// //   studentOptions,
// //   studentID,
// //   year,
// //   setyear,
// //   term,
// //   setterm,
// //   loading,
// //   handleSearch,
// // }) {
// //   const classes = useSelector(selectClasses);
// //   const years = useSelector(selectYearGroup);

// //   return (
// //     <div
// //       className="content__container mb-3"
// //       style={{ backgroundColor: "#EEF7FF" }}
// //     >
// //       <h4>Search Student</h4>
// //       <form action="">
// //         <div className="mb-3">
// //           <label className="form-label">Year</label>
// //           <select
// //             style={{ backgroundColor: "#ffffff" }}
// //             value={year}
// //             onChange={(e) => setyear(e.target.value)}
// //             name="year"
// //             className="form-select"
// //           >
// //             <option hidden defaultValue>
// //               Choose...
// //             </option>
// //             {years.length > 0 ? (
// //               years.map((e) => (
// //                 <option key={e.year} value={e.year}>
// //                   {e.year}
// //                 </option>
// //               ))
// //             ) : (
// //               <option disabled>No data</option>
// //             )}
// //           </select>
// //         </div>
// //         <div className="mb-3">
// //           {/* <label className="form-label">Term</label>
// //           <label className="form-label">Month</label>
// //           <select
// //             style={{ backgroundColor: "#ffffff" }}
// //             value={term}
// //             onChange={(e) => setterm(e.target.value)}
// //             name="year"
// //             className="form-select"
// //           >
// //             <option hidden defaultValue>
// //               Choose...
// //             </option>
// //             {/* <option value={1}>1st</option>
// //             <option value={2}>2rd</option>
// //            // <option value={3}>3rd</option>
// //             <option value={"January"}>January</option>
// //             <option value={"February"}>February</option>
// //             <option value={"March"}>March</option>
// //             <option value={"April"}>April</option>
// //             <option value={"May"}>May</option>
// //             <option value={"June"}>June</option>
// //             <option value={"July"}>July</option>
// //             <option value={"August"}>August</option>
// //             <option value={"September"}>September</option>
// //             <option value={"October"}>October</option>
// //             <option value={"November"}>November</option>
// //             <option value={"December"}>December</option>
// //           </select>
// //         </div>
// //         {/* <div className="mb-3">
// //           <label className="form-label">Class</label>
// //           <select
// //             style={{ backgroundColor: "#ffffff" }}
// //             value={classID}
// //             onChange={(e) => setclassID(e.target.value)}
// //             name="year"
// //             className="form-select"
// //           >
// //             <option hidden defaultValue>
// //               Choose...
// //             </option>
// //             {classes.length > 0 ? (
// //               classes.map((e) => (
// //                 <option key={e.classCode} value={e.classCode}>
// //                   {e.name}
// //                 </option>
// //               ))
// //             ) : (
// //               <option disabled>No data</option>
// //             )}
// //           </select>
// //         </div>
// //         <div className="mb-3">
// //           <label className="form-label">Class</label>
// //           <select
// //             style={{ backgroundColor: "#ffffff" }}
// //             value={classID}
// //             onChange={(e) => setclassID(e.target.value)}
// //             name="year"
// //             className="form-select"
// //           >
// //             <option hidden defaultValue>
// //               Choose...
// //             </option>
// //             {classes.length > 0 ? (
// //               classes
// //                 .slice()
// //                 .reverse()
// //                 .map((e) => (
// //                   <option key={e.classCode} value={e.classCode}>
// //                     {e.name}
// //                   </option>
// //                 ))
// //             ) : (
// //               <option disabled>No data</option>
// //             )}
// //           </select>
// //         </div>

// //         {loading && (
// //           <div className="d-flex justify-content-center">
// //             <div className="spinner-border" role="status">
// //               <span className="visually-hidden">Loading...</span>
// //             </div>
// //           </div>
// //         )}
// //         {studentOptions?.length > 0 && (
// //           <div className="mb-3">
// //             <label className="form-label">Student</label>
// //             <select
// //               style={{ backgroundColor: "#ffffff" }}
// //               value={studentID}
// //               onChange={(e) => setstudentID(e.target.value)}
// //               name="students"
// //               className="form-select"
// //             >
// //               <option hidden defaultValue>
// //                 Choose...
// //               </option>
// //               {studentOptions?.length > 0 ? (
// //                 studentOptions.map((e) => (
// //                   <option key={e.userID} value={e.userID}>
// //                     {e.name} {e.surname} - {e.userID}
// //                   </option>
// //                 ))
// //               ) : (
// //                 <option disabled> No data</option>
// //               )}
// //             </select>
// //           </div>
// //         )}
// //         <div>
// //           <button
// //             onClick={handleSearch}
// //             className="btn red__btn"
// //             disabled={loading}
// //           >
// //             {loading && <div className="spinner-border" role="status"></div>}
// //             Search
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }

// // export default SearchStudent;
// // */

// // const SearchStudent = ({
// //   setclassID,
// //   classID,
// //   studentOptions,
// //   studentID,
// //   setstudentID,
// //   loading,
// //   handleSearch,
// //   years,
// //   selectedYear,
// //   setSelectedYear,
// // }) => {
// //   const classes = useSelector(selectClasses);
// //   return (
// //     <div
// //       className="content__container  mb-3"
// //       style={{ backgroundColor: "#EEF7FF", width: "100%" }}
// //     >
// //       <h4>Search Student</h4>
// //       <form action="">

// //         <div className="mb-3">
// //           <label className="form-label">Year</label>
// //           <select
// //             style={{ backgroundColor: "#ffffff" }}
// //             value={selectedYear}
// //             onChange={(e) => setSelectedYear(e.target.value)}
// //             name="year"
// //             className="form-select"
// //           >
// //             <option hidden defaultValue>
// //               Choose...
// //             </option>
// //             {
// //               years?.length > 0 ? (
// //                 years.map((e) => (
// //                   <option key={e.year} value={e.year}>
// //                     {e.year}
// //                   </option>
// //                 ))
// //               ) : (
// //                 <option disabled>No data</option>
// //               )
// //             }
// //           </select>
// //         </div>
// //         <div className="mb-3">
// //           <label className="form-label">Class</label>
// //           <select
// //             style={{ backgroundColor: "#ffffff" }}
// //             value={classID}
// //             onChange={(e) => setclassID(e.target.value)}
// //             name="year"
// //             className="form-select"
// //           >
// //             <option hidden defaultValue>
// //               Choose...
// //             </option>
// //             {classes?.length > 0 ? (
// //               classes
// //                 .slice()
// //                 .reverse()
// //                 .map((e) => (
// //                   <option key={e.classCode} value={e.classCode}>
// //                     {e.name}
// //                   </option>
// //                 ))
// //             ) : (
// //               <option disabled>No data</option>
// //             )}
// //           </select>
// //         </div>

// //         {loading && (
// //           <div className="d-flex justify-content-center">
// //             <div className="spinner-border" role="status">
// //               <span className="visually-hidden">Loading...</span>
// //             </div>
// //           </div>
// //         )}
// //         {studentOptions?.length > 0 && (
// //           <div className="mb-3">
// //             <label className="form-label">Student</label>
// //             <select
// //               style={{ backgroundColor: "#ffffff" }}
// //               value={studentID}
// //               onChange={(e) => setstudentID(e.target.value)}
// //               name="students"
// //               className="form-select"
// //             >
// //               <option hidden defaultValue>
// //                 Choose...
// //               </option>
// //               {studentOptions?.length > 0 ? (
// //                 studentOptions.map((e) => (
// //                   <option key={e.userID} value={e.userID}>
// //                     {e.name} {e.surname} - {e.userID}
// //                   </option>
// //                 ))
// //               ) : (
// //                 <option disabled> No data</option>
// //               )}
// //             </select>
// //           </div>
// //         )}
// //         <div>
// //           <button
// //             onClick={handleSearch}
// //             className="btn red__btn"
// //             disabled={loading}
// //           >
// //             {loading && <div className="spinner-border" role="status"></div>}
// //             Search
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default SearchStudent;
