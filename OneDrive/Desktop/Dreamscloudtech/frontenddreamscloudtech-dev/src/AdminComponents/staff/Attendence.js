import React from 'react';
import AttendanceTable from '../shared/AttendanceTable'
import SearchAttendance from './SearchAttendance';

function Attendence() {


    const attendanceData = [

    ];
    return (
        <div>
            <SearchAttendance />
            <AttendanceTable attendanceData={attendanceData} />
        </div>
    )
}

export default Attendence
