import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../store/axios";

function StaffTabs() {
  const [count, setCount] = useState({});
  const [loading, setLoading] = useState(false);

  const renderCard = (title, value, route = "#") => {
    return (
      <div className="col-sm-6 col-md-4 mb-3">
        <div className="card p-3" style={{ backgroundColor: "#ffffff" }}>
          <div className="text-center">
            <Link className="text-info" to={route}>
              {title && (
                <div className="d-flex justify-content-center align-items-center heading bluee__btn p-2 text-light">
                  <h5>{title}</h5>
                </div>
              )}
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  paddingTop: "10px",
                }}
              >
                {value}
              </div>
              <br />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    setLoading(true);
    axios.get("/teachers")
      .then((res) => {
        setLoading(false);
        const data = res.data || [];

        let male = 0;
        let female = 0;
        let today = 0;
        let tomorrow = 0;
        let yesterday = 0;

        const getMMDD = (date) => date.toISOString().slice(5, 10);

        const now = new Date();
        const todayKey = getMMDD(now);
        const tomorrowKey = getMMDD(new Date(now.getTime() + 86400000));
        const yesterdayKey = getMMDD(new Date(now.getTime() - 86400000));

        data.forEach((staff) => {
          // Gender count
          const gender = staff.gender?.toLowerCase();
          if (gender === "male") male++;
          else if (gender === "female") female++;

          // Birthday check
          if (staff.dateofBirth) {
            const dob = new Date(staff.dateofBirth);
            const bdayKey = getMMDD(dob);

            if (bdayKey === todayKey) today++;
            else if (bdayKey === tomorrowKey) tomorrow++;
            else if (bdayKey === yesterdayKey) yesterday++;
          }
        });

        setCount({
          maleStaff: male,
          femaleStaff: female,
          staff: data.length,
          todayBirthdayStaff: today,
          tomorrowBirthdayStaff: tomorrow,
          yesterdayBirthdayStaff: yesterday,
        });
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ backgroundColor: "#EEF7FF" }}>
      <h3 className="mb-5">Staff Overview</h3>

      <div className="mb-5">
        <h3>Staffs</h3>
        <div className="row">
          {renderCard("Female", count?.femaleStaff || 0, "/staffs/female")}
          {renderCard("Male", count?.maleStaff || 0, "/staffs/male")}
          {renderCard("Total", count?.staff || 0, "/staff")}
        </div>
      </div>

      <div className="mb-3 row">
        {renderCard("Birthdays Today", count?.todayBirthdayStaff || 0, "/staffs/bday?filter=Today")}
        {renderCard("Birthdays Tomorrow", count?.tomorrowBirthdayStaff || 0, "/staffs/bday?filter=Tomorrow")}
        {renderCard("Birthdays Yesterday", count?.yesterdayBirthdayStaff || 0, "/staffs/bday?filter=Yesterday")}
      </div>
    </div>
  );
}

export default StaffTabs;
