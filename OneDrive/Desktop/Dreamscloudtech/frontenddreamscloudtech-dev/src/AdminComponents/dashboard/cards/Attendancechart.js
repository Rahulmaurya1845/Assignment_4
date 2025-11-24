import React, { useState } from "react";
import "./styles.css";

const GroupedBarChart = ({ data1, data2, fullStrength1, fullStrength2, classLabels }) => {
    const chartHeight = 97;
    const barWidth = 11;
    const groupSpacing = 20;

    const maxValue = Math.max(...fullStrength1, ...fullStrength2);
    const scale = chartHeight / maxValue;

    return (
        <svg width="100%" height={chartHeight + 20} className="attendance-svg">
            {classLabels.map((label, index) => {
                const x = index * (barWidth * 2 + groupSpacing) + 20;

                const barAHeight = data1[index] * scale;
                const barBHeight = data2[index] * scale;

                const remainingAHeight = (fullStrength1[index] - data1[index]) * scale;
                const remainingBHeight = (fullStrength2[index] - data2[index]) * scale;

                return (
                    <g key={index}>
                        {/* Remaining Strength Bar A */}
                        <rect
                            x={x}
                            y={chartHeight - barAHeight - remainingAHeight}
                            width={barWidth}
                            height={remainingAHeight}
                            fill="white"
                        />
                        {/* Attendance Bar A */}
                        <rect
                            x={x}
                            y={chartHeight - barAHeight}
                            width={barWidth}
                            height={barAHeight}
                            fill="#ff942b"
                        />
                        {/* Remaining Strength Bar B */}
                        <rect
                            x={x + barWidth}
                            y={chartHeight - barBHeight - remainingBHeight}
                            width={barWidth}
                            height={remainingBHeight}
                            fill="white"
                        />
                        {/* Attendance Bar B */}
                        <rect
                            x={x + barWidth}
                            y={chartHeight - barBHeight}
                            width={barWidth}
                            height={barBHeight}
                            fill="#8ec7ff"
                        />
                        {/* Label */}
                        <text
                            x={x + barWidth / 1}
                            y={chartHeight + 13.5}
                            fontSize="9"
                            textAnchor="middle"
                            fill="#000"
                            fontWeight="bold !important"
                        >
                            {label}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};

const AttendanceStats = () => {
    const [isToggled, setIsToggled] = useState(false);

    const fullStrengthA1 = [50, 60, 70, 65, 75, 85, 90];
    const fullStrengthB1 = [40, 55, 65, 50, 70, 80, 85];

    const fullStrengthA2 = [50, 60, 70, 65, 75, 85, 90];
    const fullStrengthB2 = [40, 55, 65, 50, 70, 80, 85];

    const dataA1 = [20, 40, 50, 30, 45, 55, 65];
    const dataB1 = [10, 25, 35, 20, 30, 40, 50];

    const dataA2 = [30, 40, 50, 60, 65, 75, 80];
    const dataB2 = [20, 30, 40, 45, 55, 65, 70];

    const classLabels1 = ["Nursery", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4"];
    const classLabels2 = ["Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11"];

    const dataA = isToggled ? dataA2 : dataA1;
    const dataB = isToggled ? dataB2 : dataB1;

    const fullStrengthA = isToggled ? fullStrengthA2 : fullStrengthA1;
    const fullStrengthB = isToggled ? fullStrengthB2 : fullStrengthB1;

    const classLabels = isToggled ? classLabels2 : classLabels1;

    return (
        <div className="attendance-container">
            <div className="attendance-card">
                <div className="attendance-header">
                    <h3 className="attendance-title">Today's Attendance</h3>
                    <div className="legend-and-toggle">
                        <div className="legend">
                            <div className="legend-item">
                                <div className="legend-color section-a"></div>
                                <span>Section A</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color section-b"></div>
                                <span>Section B</span>
                            </div>
                        </div>
                        <button className="toggle-btn" style={{ marginBottom: "14px" }} onClick={() => setIsToggled(!isToggled)}>
                            {isToggled ? "<" : ">"}
                        </button>
                    </div>

                </div>
                <div className="chart-container">
                    <GroupedBarChart
                        data1={dataA}
                        data2={dataB}
                        fullStrength1={fullStrengthA}
                        fullStrength2={fullStrengthB}
                        classLabels={classLabels}
                    />
                    {/* <span className="y-axis-label">Number of students</span> */}
                </div>
            </div>
        </div>
    );
};

export default AttendanceStats;
