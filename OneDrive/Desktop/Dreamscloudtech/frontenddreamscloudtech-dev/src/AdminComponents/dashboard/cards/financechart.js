// import React, { useState, useEffect } from "react";
// import "./financial-stats.css";
// import a from "./Group 43 (1).png"
// import b from "./Group 44 (1).png"

// const FinancialStatistics = () => {
//     const [currentDate, setCurrentDate] = useState("");

//     useEffect(() => {
//         const updateDate = () => {
//             const date = new Date().toLocaleDateString("en-IN", {
//                 day: "2-digit",
//                 month: "short",
//                 year: "numeric",
//                 timeZone: "Asia/Kolkata",
//             });
//             setCurrentDate(date);
//         };

//         updateDate(); // Set initial date
//         const interval = setInterval(updateDate, 24 * 60 * 60 * 1000); // Update daily

//         return () => clearInterval(interval); // Cleanup interval on unmount
//     }, []);

//     return (
//         <div className="stats-container">
//             <div className="stats-card">
//                 {/* Header */}
//                 <div className="stats-header">
//                     <h3 className="stats-title">Financial Statistics</h3>
//                     <span className="stats-date">{currentDate}</span>
//                 </div>

//                 {/* Income Section */}
//                 <div className="stats-row">
//                     <div className="stats-section">
//                         <h4 className="stats-section-title">Income</h4>
//                         <div className="stats-value-row">
//                             <img
//                                 src={a}
//                                 alt="up-arrow"
//                                 className="stats-arrow-icon"
//                             />
//                             <span className="stats-amount">
//                                 ₹ 4,000 <span className="stats-percentage">(10%)</span>
//                             </span>
//                         </div>
//                     </div>
//                     <div className="stats-section">
//                         <span className="stats-subtitle">Monthly</span>
//                         <span className="stats-amount2">₹ 40,000</span>
//                     </div>
//                 </div>

//                 {/* Divider */}
//                 <div className="stats-divider"></div>

//                 {/* Expenditure Section */}
//                 <div className="stats-row">
//                     <div className="stats-section">
//                         <h4 className="stats-section-title">Expenditure</h4>
//                         <div className="stats-value-row">
//                             <img
//                                 src={b}
//                                 alt="down-arrow"
//                                 className="stats-arrow-icon"
//                             />
//                             <span className="stats-amount">
//                                 ₹ 2,700 <span className="stats-percentage">(10%)</span>
//                             </span>
//                         </div>
//                     </div>
//                     <div className="stats-section">
//                         <span className="stats-subtitle">Monthly</span>
//                         <span className="stats-amount2">₹ 27,000</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FinancialStatistics;


import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming axios is imported globally or via a store
import "./financial-stats.css";
import a from "./Group 43 (1).png";
import b from "./Group 44 (1).png";

const FinancialStatistics = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [lastMonthIncome, setLastMonthIncome] = useState(0);
  const [lastMonthExpense, setLastMonthExpense] = useState(0);
  const [currentMonthIncome, setCurrentMonthIncome] = useState(0);
  const [currentMonthExpense, setCurrentMonthExpense] = useState(0);

  useEffect(() => {
    const updateDate = () => {
      const date = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Kolkata",
      });
      setCurrentDate(date);
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/transactions`);
        const transactions = response.data;

        const now = new Date();
        now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }); // Ensure IST
        const currentMonth = now.getMonth(); // 8 for September
        const currentYear = now.getFullYear(); // 2025
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1; // 7 for August
        const lastYear = currentMonth === 0 ? currentYear - 1 : currentYear;

        // Filter and sum transactions with time zone awareness
        const getMonthFromDate = (dateStr) => {
          const date = new Date(dateStr);
          return date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }).split("/")[0] - 1; // Month is 0-based
        };

        const lastMonthTotalIncome = transactions
          .filter(t => t.type === "income" && getMonthFromDate(t.date) === lastMonth && new Date(t.date).getFullYear() === lastYear)
          .reduce((sum, t) => sum + Number(t.amount || 0), 0);
        const lastMonthTotalExpense = transactions
          .filter(t => t.type === "expenditure" && getMonthFromDate(t.date) === lastMonth && new Date(t.date).getFullYear() === lastYear)
          .reduce((sum, t) => sum + Number(t.amount || 0), 0);
        const currentMonthTotalIncome = transactions
          .filter(t => t.type === "income" && getMonthFromDate(t.date) === currentMonth && new Date(t.date).getFullYear() === currentYear)
          .reduce((sum, t) => sum + Number(t.amount || 0), 0);
        const currentMonthTotalExpense = transactions
          .filter(t => t.type === "expenditure" && getMonthFromDate(t.date) === currentMonth && new Date(t.date).getFullYear() === currentYear)
          .reduce((sum, t) => sum + Number(t.amount || 0), 0);

        setLastMonthIncome(lastMonthTotalIncome || 0);
        setLastMonthExpense(lastMonthTotalExpense || 0);
        setCurrentMonthIncome(currentMonthTotalIncome || 0);
        setCurrentMonthExpense(currentMonthTotalExpense || 0);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    updateDate();
    fetchData();
    const interval = setInterval(updateDate, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Calculate percentage change, treating last month = 0 as 100% if current > 0
  const incomePercentage = lastMonthIncome === 0 && currentMonthIncome > 0
    ? 100
    : lastMonthIncome === 0 && currentMonthIncome === 0
      ? 0
      : Math.round((currentMonthIncome / lastMonthIncome) * 100) || 0;
  const expensePercentage = lastMonthExpense === 0 && currentMonthExpense > 0
    ? 100
    : lastMonthExpense === 0 && currentMonthExpense === 0
      ? 0
      : Math.round((currentMonthExpense / lastMonthExpense) * 100) || 0;

  return (
    <div className="stats-container">
      <div className="stats-card">
        <div className="stats-header">
          <h3 className="stats-title">Financial Statistics</h3>
          <span className="stats-date">{currentDate}</span>
        </div>

        <div className="stats-row">
          <div className="stats-section">
            <h4 className="stats-section-title">Income</h4>
            <div className="stats-value-row">
              <img
                src={a}
                alt="up-arrow"
                className="stats-arrow-icon"
              />
              <span className="stats-amount">
                ₹ {currentMonthIncome.toLocaleString()} <span className="stats-percentage">({incomePercentage}%)</span>
              </span>
            </div>
          </div>
          <div className="stats-section" style={{ whiteSpace: 'nowrap' }}>
            <span className="stats-subtitle">Last Month</span>
            <span className="stats-amount2">₹ {lastMonthIncome.toLocaleString()}</span>
          </div>

          {/* <div className="stats-section">
            <span className="stats-subtitle">Last Month</span>
            <span className="stats-amount2">₹ {lastMonthIncome.toLocaleString()}</span>
          </div> */}
        </div>

        <div className="stats-divider"></div>

        <div className="stats-row">
          <div className="stats-section" >
            <h4 className="stats-section-title">Expenditure</h4>
            <div className="stats-value-row">
              <img
                src={b}
                alt="down-arrow"
                className="stats-arrow-icon"
              />
              <span className="stats-amount">
                ₹ {currentMonthExpense.toLocaleString()} <span className="stats-percentage">({expensePercentage}%)</span>
              </span>
            </div>
          </div>
          <div className="stats-section" style={{ whiteSpace: 'nowrap' }}>
            <span className="stats-subtitle"> Last Month</span>
            <span className="stats-amount2">₹ {lastMonthExpense.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialStatistics;