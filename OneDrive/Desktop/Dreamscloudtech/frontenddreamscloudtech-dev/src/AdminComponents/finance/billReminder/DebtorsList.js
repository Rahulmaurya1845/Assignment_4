// import React, { useEffect, useState } from "react";
// import Search from "./Search";
// import Table from "./Table";
// import axios from "../../../store/axios";
// import Reminder from "./SendLetter";
// import Message from "./SendMessage";
// import { currentCurrency } from "../../../utils";

// const tableHeader = [
//   { id: "userID", name: "Student ID" },
//   { id: "name", name: "Name" },
//   { id: "classID", name: "Class" },
//   { id: "total", name: `Total Bill (${currentCurrency()})` },
//   { id: "amount", name: `Amount Paid (${currentCurrency()})` },

//   { id: "owe", name: `Amount Due (${currentCurrency()})` },
// ];

// function DebtorsList() {
//   const [data, setdata] = useState([]);
//   const [year, setyear] = useState("");
//   const [term, setterm] = useState("");
//   const [classID, setclassID] = useState("all");
//   const [campus, setcampus] = useState("");
//   const [show, setshow] = useState(false);
//   const [loading, setloading] = useState(false);
//   const [fees, setfees] = useState([]);
//   const [openLetter, setopenLetter] = useState(false);
//   const [openMessage, setopenMessage] = useState(false);
//   const [selected, setSelected] = useState([]);

//   useEffect(() => {
//     axios.get("/fees").then((res) => {
//       setfees(res.data);
//     });
//   }, []);

//   const handleSearch = () => {
//     setloading(true);
//     let bal = (u) => {
//       console.log("fees", fees);
//       let fee = fees.find((z) => z?.code === u?.classID);
//       console.log("fee", fee);
//       return fee
//         ? Object.entries(fee[u.status] || {}).reduce(
//         (t, [key, value]) => {
//           if (["tution", "facility", "maintenance", "exam"].includes(key)) {
//             return Number(t) + Number(value);
//           }
//           return Number(t);
//         },
//         0
//           )
//         : 0;
//     };
//     axios.get(`/students/unpaidfees/${year}/${term}`).then((res) => {
//       let students = res.data.map((e) => {
//         console.log("e", e);
//         let total = bal(e);
//         console.log("total", total);
//         return {
//           ...e,
//           bill: total,
//           owe: total - e.amount,
//           total,
//         };
//       });

//       let dataAll = students.filter((e) => e.owe > 0);
//       console.log("dataAll", dataAll);

//       if (classID !== "all") {
//         dataAll = dataAll.filter((e) => e.classID === classID);
//       }
//       setdata(dataAll);
//       setshow(true);
//       setloading(false);
//     });
//   };

//   let debtors = selected.map((e) => {
//     let student = data.find((i) => i.userID === e);
//     return {
//       ...student,
//     };
//   });

//   return (
//     <div>
//       <h3> Bill Reminder</h3>
//       <div className="content__containerr mb-5">
//         <Search
//           year={year}
//           setyear={setyear}
//           term={term}
//           handleSearch={handleSearch}
//           classID={classID}
//           setclassID={setclassID}
//           campus={campus}
//           setcampus={setcampus}
//           setterm={setterm}
//           loading={loading}
//         />
//       </div>
//       {show && (
//         <>
//           <div className="content__containerr" id="section-to-print">
//             <div className="text-center mb-4" >
//               <h3 style={{ color: "#4fb1f6" }}>
//                 Debtors List For Month: {term} And Year: {year}
//               </h3>
//             </div>
//             <Table
//               selected={selected}
//               setSelected={setSelected}
//               tableHeader={tableHeader}
//               data={data}
//             />
//           </div>
//           <div className="text-center my-4">
//             <button
//               onClick={() => setopenLetter(true)}
//               className="btn blue__btn mr-2"
//             >
//               Continue
//             </button>
//             <button
//               onClick={() => setopenMessage(true)}
//               className="btn red__btn ml-3"
//             >
//               send message
//             </button>
//           </div>
//         </>
//       )}
//       {debtors.length > 0 && (
//         <>
//           <Message
//             debtors={debtors}
//             open={openMessage}
//             setOpen={setopenMessage}
//           />
//           <Reminder
//             debtors={debtors}
//             open={openLetter}
//             setOpen={setopenLetter}
//           />
//         </>
//       )}
//     </div>
//   );
// }

// export default DebtorsList;

import React, { useEffect, useState } from "react";
import Search from "./Search";
import Table from "./Table";
import axios from "../../../store/axios";
import Reminder from "./SendLetter";
import Message from "./SendMessage";
import { currentCurrency } from "../../../utils";

const tableHeader = [
  { id: "userID", name: "Student ID" },
  { id: "name", name: "Name" },
  { id: "classID", name: "Class" },
  { id: "total", name: `Total Bill (${currentCurrency()})` },
  { id: "amount", name: `Amount Paid (${currentCurrency()})` },

  { id: "owe", name: `Amount Due (${currentCurrency()})` },
];

function DebtorsList() {
  const [data, setdata] = useState([]);
  const [year, setyear] = useState("");
  const [term, setterm] = useState("");
  const [classID, setclassID] = useState("all");
  const [campus, setcampus] = useState("");
  const [show, setshow] = useState(false);
  const [loading, setloading] = useState(false);
  const [fees, setfees] = useState([]);
  const [openLetter, setopenLetter] = useState(false);
  const [openMessage, setopenMessage] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [selected, setSelected] = useState([]);

  useEffect(() => {
    axios.get("/fees").then((res) => {
      setfees(res.data);
    });
  }, []);

  const handleSearch = () => {
    console.log("Search clicked ✅");
    setloading(true);

    let bal = (u) => {
      console.log("fees", fees);
      let fee = fees.find((z) => z?.code === u?.classID);
      console.log("fee", fee);
      return fee
        ? Object.entries(fee[u.status] || {}).reduce(
          (t, [key, value]) => {
            if (["tution", "facility", "maintenance", "exam"].includes(key)) {
              return Number(t) + Number(value);
            }
            return Number(t);
          },
          0
        )
        : 0;
    };

    //    axios.get(`/students/unpaidfees/${year}/${term}`).then((res) => {

    //     let students = res.data.map((e) => {
    //       console.log("e", e);
    //       let total = bal(e);
    //       console.log("total", total);
    //       return {
    //         ...e,
    //         bill: total,
    //         owe: total - e.amount,
    //         total,
    //       };
    //     });

    //     let dataAll = students.filter((e) => e.owe > 0);
    //     console.log("dataAll", dataAll);

    //     if (classID !== "all") {
    //       dataAll = dataAll.filter((e) => e.classID === classID);
    //     }


    //     setdata(dataAll);
    //     setshow(true);
    //     setloading(false);
    //   });
    // };

    // let debtors = selected.map((e) => {
    //   let student = data.find((i) => i.userID === e);
    //   return {
    //     ...student,
    //   };
    // });
    const selectedYear = year || "all";
    const selectedTerm = term || "all";

    axios.get(`/students/unpaidfees/${selectedYear}/${selectedTerm}`).then((res) => {
      let students = res.data.map((e) => {
        let total = bal(e);
        return {
          ...e,
          bill: total,
          owe: total - e.amount,
          total,
        };
      });

      let dataAll = students.filter((e) => e.owe > 0);

      if (classID !== "all") {
        dataAll = dataAll.filter((e) => e.classID === classID);
      }

      if (fromDate && toDate) {
        const from = new Date(fromDate);
        const to = new Date(toDate);
        dataAll = dataAll.filter((e) => {
          if (!e.date) return false;
          const entryDate = new Date(e.date || e.createdAt || e.updatedAt); // fallback if `e.date` missing
          return entryDate >= from && entryDate <= to;
        });
      }
      console.log("Raw student data:", dataAll.map(e => ({
        name: e.name,
        date: e.date,
        parsed: new Date(e.date)
      })));

      setdata(dataAll);
      setshow(true);
      setloading(false);
    });
  };

  const debtors = selected.map((e) => {
    let student = data.find((i) => i.userID === e);
    return { ...student };
  });


  return (
    <div>
      <h3> Bill Reminder</h3>
      <div className="content__containerr mb-5">
        <Search
          year={year}
          setyear={setyear}
          term={term}
          handleSearch={handleSearch}
          classID={classID}
          setclassID={setclassID}
          campus={campus}
          setcampus={setcampus}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}

          setterm={setterm}
          loading={loading}
        />
      </div>
      {show && (
        <>
          <div className="content__containerr" id="section-to-print">
            <div className="text-center mb-4" >
              <h3 style={{ color: "#4fb1f6" }}>
                {/* Debtors List For Month: {term} And Year: {year} */}
                Debtors List
                {term && ` For Month: ${term}`}
                {year && ` And Year: ${year}`}
                {fromDate && toDate && ` From ${fromDate} to ${toDate}`}
              </h3>
            </div>
            <Table
              selected={selected}
              setSelected={setSelected}
              tableHeader={tableHeader}
              data={data}
            />
          </div>
          <div className="text-center my-4">
            <button
              onClick={() => setopenLetter(true)}
              className="btn blue__btn mr-2"
            >
              Continue
            </button>
            <button
              onClick={() => setopenMessage(true)}
              className="btn red__btn ml-3"
            >
              send message
            </button>
          </div>
        </>
      )}
      {debtors.length > 0 && (
        <>
          <Message
            debtors={debtors}
            open={openMessage}
            setOpen={setopenMessage}
          />
          <Reminder
            debtors={debtors}
            open={openLetter}
            setOpen={setopenLetter}
          />
        </>
      )}
    </div>
  );
}

export default DebtorsList;
