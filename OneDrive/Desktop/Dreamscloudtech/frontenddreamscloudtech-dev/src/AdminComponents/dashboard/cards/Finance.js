// import React from "react";
// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     ResponsiveContainer,
// } from "recharts";
// import "./finance-chart.css";

// const data = [
//     { day: "Sun", income: 30000, expense: 2000 },
//     { day: "Mon", income: 4500, expense: 35000 },
//     { day: "Tue", income: 2878, expense: 4075 },
//     { day: "Wed", income: 65575, expense: 4665 },
//     { day: "Thu", income: 4875, expense: 26557 },
//     { day: "Fri", income: 56785, expense: 41750 },
//     { day: "Sat", income: 46680, expense: 3960 },
// ];

// const CustomFinanceChart = () => {
//     const formatLegend = (value) => {
//         if (value === "income") return "Income";
//         if (value === "expense") return "Expense";
//         return value; // Fallback in case of unexpected keys
//     };

//     return (
//         <div className="custom-finance-chart-container custom-small">
//             <h3 className="custom-finance-chart-title">Finance</h3>
//             <div className="custom-finance-chart-wrapper custom-small">
//                 <ResponsiveContainer width="120%" height="110%">
//                     <LineChart data={data}>
//                         {/* Hide grid lines */}
//                         <CartesianGrid vertical={false} horizontal={false} />

//                         {/* X-Axis */}
//                         <XAxis
//                             dataKey="day"
//                             tick={{ fontSize: 12, fill: "#666" }}
//                             axisLine={{ stroke: "#ccc" }}
//                         />

//                         {/* Y-Axis */}
//                         <YAxis
//                             tick={{ fontSize: 12, fill: "#666" }}
//                             tickFormatter={(value) => (value % 20 === 0 ? value : "")}
//                             axisLine={{ stroke: "#ccc" }}
//                         />

//                         {/* Tooltip */}
//                         <Tooltip />

//                         {/* Legend with custom formatter */}
//                         <Legend
//                             wrapperStyle={{ fontSize: 12, color: "#666" }}
//                             align="center"
//                             verticalAlign="top"
//                             formatter={formatLegend}
//                         />

//                         {/* Income Line */}
//                         <Line
//                             type="monotone"
//                             dataKey="income"
//                             stroke="#4A90E2"
//                             strokeWidth={2}
//                             fillOpacity={1}
//                             dot={true}
//                         />

//                         {/* Expense Line */}
//                         <Line
//                             type="monotone"
//                             dataKey="expense"
//                             stroke="#F44336"
//                             strokeWidth={2}
//                             fillOpacity={1}
//                             dot={true}
//                         />
//                     </LineChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// };

// export default CustomFinanceChart;


import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import "./finance-chart.css";

const CustomFinanceChart = () => {
    const [chartData, setChartData] = useState([
        { day: "Sun", income: 0, expense: 0 },
        { day: "Mon", income: 0, expense: 0 },
        { day: "Tue", income: 0, expense: 0 },
        { day: "Wed", income: 0, expense: 0 },
        { day: "Thu", income: 0, expense: 0 },
        { day: "Fri", income: 0, expense: 0 },
        { day: "Sat", income: 0, expense: 0 },
    ]);

    useEffect(() => {
        const updateChartData = () => {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/transactions`);
                    const transactions = response.data;

                    const now = new Date();
                    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
                    const currentDay = now.getDay();
                    const startOfWeek = new Date(now);
                    startOfWeek.setDate(now.getDate() - currentDay);
                    startOfWeek.setHours(0, 0, 0, 0);

                    // Initialize weekly data
                    const weeklyData = [
                        { day: "Sun", income: 0, expense: 0 },
                        { day: "Mon", income: 0, expense: 0 },
                        { day: "Tue", income: 0, expense: 0 },
                        { day: "Wed", income: 0, expense: 0 },
                        { day: "Thu", income: 0, expense: 0 },
                        { day: "Fri", income: 0, expense: 0 },
                        { day: "Sat", income: 0, expense: 0 },
                    ];

                    
                    const getDayOfWeek = (dateStr) => {
                        const date = new Date(dateStr);
                        return date.toLocaleString("en-US", { timeZone: "Asia/Kolkata", weekday: "long" }).toLowerCase().slice(0, 3);
                    };

                    transactions.forEach((t) => {
                        const transactionDate = new Date(t.date);
                        if (transactionDate >= startOfWeek && transactionDate <= now) {
                            const day = getDayOfWeek(t.date);
                            const index = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"].indexOf(day);
                            if (index !== -1) {
                                if (t.type === "income") {
                                    weeklyData[index].income += Number(t.amount || 0);
                                } else if (t.type === "expenditure") {
                                    weeklyData[index].expense += Number(t.amount || 0);
                                }
                            }
                        }
                    });

                    setChartData(weeklyData);
                } catch (error) {
                    console.error("Error fetching transactions:", error);
                }
            };

            fetchData();
        };

        updateChartData();
        const interval = setInterval(updateChartData, 7 * 24 * 60 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    const formatLegend = (value) => {
        if (value === "income") return "Income";
        if (value === "expense") return "Expense";
        return value;
    };

    return (
        <div className="custom-finance-chart-container custom-small">
            <h3 className="custom-finance-chart-title">Finance</h3>
            <div className="custom-finance-chart-wrapper custom-small">
                <ResponsiveContainer width="120%" height="110%">
                    <LineChart data={chartData}>
                        <CartesianGrid vertical={false} horizontal={false} />
                        <XAxis
                            dataKey="day"
                            tick={{ fontSize: 12, fill: "#666" }}
                            axisLine={{ stroke: "#ccc" }}
                        />
                        <YAxis
                            tick={{ fontSize: 12, fill: "#666" }}
                            tickFormatter={(value) => (value % 20 === 0 ? value : "")}
                            axisLine={{ stroke: "#ccc" }}
                        />
                        <Tooltip />
                        <Legend
                            wrapperStyle={{ fontSize: 12, color: "#666" }}
                            align="center"
                            verticalAlign="top"
                            formatter={formatLegend}
                        />
                        <Line
                            type="monotone"
                            dataKey="income"
                            stroke="#4A90E2"
                            strokeWidth={2}
                            fillOpacity={1}
                            dot={true}
                        />
                        <Line
                            type="monotone"
                            dataKey="expense"
                            stroke="#F44336"
                            strokeWidth={2}
                            fillOpacity={1}
                            dot={true}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CustomFinanceChart;

// // import React from "react";
// // import {
// //     LineChart,
// //     Line,
// //     XAxis,
// //     YAxis,
// //     CartesianGrid,
// //     Tooltip,
// //     Legend,
// //     ResponsiveContainer,
// // } from "recharts";
// // import "./finance-chart.css";

// // const data = [
// //     { day: "Sun", income: 30000, expense: 2000 },
// //     { day: "Mon", income: 4500, expense: 35000 },
// //     { day: "Tue", income: 2878, expense: 4075 },
// //     { day: "Wed", income: 65575, expense: 4665 },
// //     { day: "Thu", income: 4875, expense: 26557 },
// //     { day: "Fri", income: 56785, expense: 41750 },
// //     { day: "Sat", income: 46680, expense: 3960 },
// // ];

// // const CustomFinanceChart = () => {
// //     return (
// //         <div className="custom-finance-chart-container custom-small">
// //             <h3 className="custom-finance-chart-title">Finance</h3>
// //             <div className="custom-finance-chart-wrapper custom-small">
// //                 <ResponsiveContainer width="120%" height="110%">
// //                     <LineChart data={data}>
// //                         {/* Hide grid lines */}
// //                         <CartesianGrid vertical={false} horizontal={false} />

// //                         {/* X-Axis */}
// //                         <XAxis
// //                             dataKey="day"
// //                             tick={{ fontSize: 12, fill: "#666" }}
// //                             axisLine={{ stroke: "#ccc" }}
// //                         />

// //                         {/* Y-Axis */}
// //                         <YAxis
// //                             tick={{ fontSize: 12, fill: "#666" }}
// //                             tickFormatter={(value) => (value % 20 === 0 ? value : "")}
// //                             axisLine={{ stroke: "#ccc" }}
// //                         />

// //                         {/* Tooltip and Legend */}
// //                         <Tooltip />
// //                         <Legend
// //                             wrapperStyle={{ fontSize: 12, color: "#666" }}
// //                             align="center"
// //                             verticalAlign="top"
// //                         />

// //                         {/* Income Line */}
// //                         <Line
// //                             type="monotone"
// //                             dataKey="income"
// //                             stroke="#4A90E2"
// //                             strokeWidth={2}
// //                             fillOpacity={1}
// //                             dot={true}
// //                         />

// //                         {/* Expense Line */}
// //                         <Line
// //                             type="monotone"
// //                             dataKey="expense"
// //                             stroke="#F44336"
// //                             strokeWidth={2}
// //                             fillOpacity={1}
// //                             dot={true}
// //                         />
// //                     </LineChart>
// //                 </ResponsiveContainer>
// //             </div>
// //         </div>
// //     );
// // };

// // export default CustomFinanceChart;
