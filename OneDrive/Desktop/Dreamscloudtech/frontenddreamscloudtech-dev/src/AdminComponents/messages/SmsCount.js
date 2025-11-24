

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SmsCountPage = () => {
//   const [messages, setMessages] = useState([]);
//   const [filteredMessages, setFilteredMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedType, setSelectedType] = useState("All");

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`${process.env.REACT_APP_API_URL}/sms-counter`);
//         setMessages(res.data.data);
//         setFilteredMessages(res.data.data);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setLoading(false);
//       }
//     };

//     fetchMessages();
//   }, []);

//   const handleFilterChange = (e) => {
//     const type = e.target.value;
//     setSelectedType(type);

//     if (type === "All") {
//       setFilteredMessages(messages);
//     } else {
//       setFilteredMessages(messages.filter((msg) => msg.type === type));
//     }
//   };

//   const uniqueTypes = ["All", ...new Set(messages.map((msg) => msg.type))];

//   const totalSms = filteredMessages.length;
//   const smsByType = messages.reduce((acc, msg) => {
//     acc[msg.type] = (acc[msg.type] || 0) + 1;
//     return acc;
//   }, {});

//   return (
//     <div
//       style={{
//         maxWidth: "1200px",
//         margin: "0 auto",
//         padding: "30px",
//         textAlign: "center",
//       }}
//     >
//       <h1
//         style={{
//           fontSize: "34px",
//           fontWeight: "bolder",
//           marginBottom: "20px",
//           color: "black",
//         }}
//       >
//         📩 SMS Counter
//       </h1>

//       {loading ? (
//         <p>Loading messages...</p>
//       ) : filteredMessages.length === 0 ? (
//         <p>No messages found.</p>
//       ) : (
//         <table
//           style={{
//             width: "100%",
//             borderCollapse: "collapse",
//             marginTop: "20px",
//             boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//             fontFamily: "Arial, sans-serif",
//           }}
//         >
//           <thead>
//             <tr style={{ backgroundColor: "#4fb1f6", color: "white" }}>
//               <th style={{ padding: "12px", border: "1px solid #ddd" }}>#</th>
//               <th style={{ padding: "12px", border: "1px solid #ddd" }}>Send to</th>
//               <th style={{ padding: "12px", border: "1px solid #ddd" }}>
//                 Category <br />
//                 <select
//                   value={selectedType}
//                   onChange={handleFilterChange}
//                   style={{
//                     marginTop: "8px",
//                     border: "1px solid #ccc",
//                     borderRadius: "5px",
//                     padding: "6px 10px",
//                     fontSize: "14px",
//                     backgroundColor: "#4fb1f6",
//                     color: "white",
//                   }}
//                 >
//                   {uniqueTypes.map((type, index) => (
//                     <option key={index} value={type}>
//                       {type}
//                     </option>
//                   ))}
//                 </select>
//               </th>
//               <th style={{ padding: "12px", border: "1px solid #ddd" }}>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredMessages.map((msg, index) => (
//               <tr
//                 key={msg._id}
//                 style={{
//                   textAlign: "center",
//                   backgroundColor: index % 2 === 0 ? "white" : "#EEF7FF",
//                 }}
//               >
//                 <td style={{ padding: "12px", border: "1px solid #ddd" }}>
//                   {index + 1}
//                 </td>
//                 <td style={{ padding: "12px", border: "1px solid #ddd" }}>
//                   {msg.to}
//                 </td>
//                 <td style={{ padding: "12px", border: "1px solid #ddd" }}>
//                   {msg.type}
//                 </td>
//                 <td style={{ padding: "12px", border: "1px solid #ddd" }}>
//                   {(() => {
//                     const d = new Date(msg.date);
//                     const day = String(d.getDate()).padStart(2, "0");
//                     const month = String(d.getMonth() + 1).padStart(2, "0");
//                     const year = d.getFullYear();
//                     return `${day}-${month}-${year}`;
//                   })()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//           {/* <tfoot>
//           <tr style={{ backgroundColor: "white", fontWeight: "bold" }}>
//             <td
//             colSpan="3"
//             style={{
//             padding: "12px",
//             border: "1px solid #ddd",
//             textAlign: "right",
//             fontSize: "16px",
//            }}
//           >
//             Total SMS:
//       </td>
//       <td
//         style={{
//           padding: "12px",
//           border: "1px solid #ddd",
//           color: "#3B82F6",
//           fontWeight: "bold",
//           fontSize: "16px",
//         }}
//       >
//         {filteredMessages.length}
//       </td>
//     </tr>
//   </tfoot> */}

//         </table>

//       )}
//       <div
//         style={{
//           backgroundColor: "#f9f9f9",
//           padding: "20px",
//           marginBottom: "30px",
//           borderRadius: "8px",
//           boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//           border: "2px solid #ddd",
//           marginTop: "20px",
//         }}
//       >
//         <h2 style={{ color: "blue", marginBottom: "15px" }}>SMS Summary</h2>
//         <hr />
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-around",
//             marginTop: "15px",
//             fontSize: "20px",
//             fontWeight: "bold",
//           }}
//         >
//           <div style={{ color: "blue" }}>
//             Total SMS <br />
//             {totalSms}
//           </div>
//           {Object.keys(smsByType).map((type) => (
//             <div key={type} style={{ color: "green" }}>
//               {type} <br />
//               {smsByType[type]}
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// };

// export default SmsCountPage;




import React, { useEffect, useState } from "react";
import axios from "axios";

const SmsCountPage = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        //     const res = await axios.get(`${process.env.REACT_APP_API_URL}/sms-counter`);
        //     setMessages(res.data.data);
        //     setFilteredMessages(res.data.data);
        //     setLoading(false);
        //   } catch (err) {
        //     console.error(err);
        //     setLoading(false);
        //   }
        // };
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/sms-counter`);
        const sortedMessages = res.data.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setMessages(sortedMessages);
        setFilteredMessages(sortedMessages);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // const handleFilterChange = (e) => {
  //   const type = e.target.value;
  //   setSelectedType(type);
  //   setCurrentPage(1);

  //   if (type === "All") {
  //     setFilteredMessages(messages);
  //   } else {
  //     setFilteredMessages(messages.filter((msg) => msg.type === type));
  //   }
  // };
  const handleFilterChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    setCurrentPage(1);

    let filtered = [...messages];
    if (type !== "All") {
      filtered = filtered.filter((msg) => msg.type === type);
    }

    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      filtered = filtered.filter((msg) => {
        const msgDate = new Date(msg.date);
        return msgDate >= from && msgDate <= to;
      });
    }

    setFilteredMessages(filtered);
  };

  const handleDateSearch = () => {
    let filtered = [...messages];

    if (selectedType !== "All") {
      filtered = filtered.filter((msg) => msg.type === selectedType);
    }

    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      filtered = filtered.filter((msg) => {
        const msgDate = new Date(msg.date);
        return msgDate >= from && msgDate <= to;
      });
    }

    setFilteredMessages(filtered);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFromDate("");
    setToDate("");
    setSelectedType("All");
    setFilteredMessages(messages);
    setCurrentPage(1);
  };

  const uniqueTypes = ["All", ...new Set(messages.map((msg) => msg.type))];

  const totalSms = filteredMessages.length;
  // const smsByType = messages.reduce((acc, msg) => {
  const smsByType = filteredMessages.reduce((acc, msg) => {
    acc[msg.type] = (acc[msg.type] || 0) + 1;
    return acc;
  }, {});
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredMessages.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredMessages.length / rowsPerPage);

  return (


    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "30px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "34px",
          fontWeight: "bolder",
          marginBottom: "30px",
          color: "black",
        }}
      >
        📩 SMS Counter
      </h1>
      {/* Date Range Filter */}
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center", gap: "20px", alignItems: "center" }}>
        <div>
          <label style={{ fontWeight: "bold", marginRight: "10px" }}>From:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            style={{ padding: "6px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div>
          <label style={{ fontWeight: "bold", marginRight: "10px" }}>To:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            style={{ padding: "6px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div>
          <label style={{ fontWeight: "bold", marginRight: "10px" }}>Category:</label>
          <select
            value={selectedType}
            onChange={handleFilterChange}
            style={{
              padding: "6px 10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "14px",
              backgroundColor: "white",
              color: "black",
            }}
          >
            {uniqueTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleDateSearch}
          style={{ padding: "8px 16px", backgroundColor: "#4fb1f6", color: "white", border: "none", borderRadius: "5px" }}
        >
          Search
        </button>
        <button
          onClick={handleReset}
          style={{ padding: "8px 16px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "5px" }}
        >
          Reset
        </button>
      </div>

      {loading ? (
        <p>Loading messages...</p>
      ) : filteredMessages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#4fb1f6", color: "white" }}>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>#</th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>Send to</th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                  Category <br />
                  {/* <select
                    value={selectedType}
                    onChange={handleFilterChange}
                    style={{
                      marginTop: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "6px 10px",
                      fontSize: "14px",
                      backgroundColor: "#4fb1f6",
                      color: "white",
                    }}
                  >
                    {uniqueTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select> */}
                </th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((msg, index) => (
                <tr
                  key={msg._id}
                  style={{
                    textAlign: "center",
                    backgroundColor: index % 2 === 0 ? "white" : "#EEF7FF",
                  }}
                >
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    {indexOfFirstRow + index + 1}
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    {msg.to}
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    {msg.type}
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    {(() => {
                      const d = new Date(msg.date);
                      const day = String(d.getDate()).padStart(2, "0");
                      const month = String(d.getMonth() + 1).padStart(2, "0");
                      const year = d.getFullYear();
                      return `${day}-${month}-${year}`;
                    })()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div
            style={{
              marginTop: "2px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "16px",
              backgroundColor: "#EEF7FF",
              border: "1px solid #ddd",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",

            }}
          >
            <div>
              Rows per page:{" "}
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
                style={{
                  padding: "6px 10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                  backgroundColor: "#EEF7FF"
                }}
              >
                {[5, 10, 25, 50, 100].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div>
              {indexOfFirstRow + 1}-{Math.min(indexOfLastRow, filteredMessages.length)} of{" "}
              {filteredMessages.length}
            </div>

            <div>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{ marginRight: "10px", padding: "6px 12px", border: "none", backgroundColor: "#EEF7FF" }}
              >
                ◀
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                style={{ padding: "6px 12px", border: "none", backgroundColor: "#EEF7FF" }}
              >
                ▶
              </button>
            </div>
          </div>
        </>
      )}

      {/* Summary Section */}
      <div
        style={{
          backgroundColor: "#EEF7FF",
          padding: "20px",
          marginBottom: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          border: "2px solid #ddd",
          marginTop: "20px",
        }}
      >
        <h2 style={{ color: "blue", marginBottom: "15px" }}>SMS Summary</h2>
        <hr />
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "15px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          <div style={{ color: "blue" }}>
            Total SMS <br />
            {totalSms}
          </div>
          {Object.keys(smsByType).map((type) => (
            <div key={type} style={{ color: "green" }}>
              {type} <br />
              {smsByType[type]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmsCountPage;
