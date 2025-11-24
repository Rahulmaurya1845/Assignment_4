import React, { useEffect, useState } from "react";
import axios from "../../store/axios";
import { timeStamp } from "../../utils";

function RecentActivity() {
  const [activities, setactivities] = useState([]);

  useEffect(() => {
    axios.get("/activitylog").then((res) => setactivities(res.data));
  }, []);

  return (
    <div className="content__container activities__container" style={{
      backgroundColor: "#EEF7FF",
      border: "none",
      boxShadow: "none"
    }}>
      <h3 style={{ fontFamily: "poppins", fontSize: "1.4rem" }}>Recent Activities</h3>
      <div>
        {activities.length > 0 ? (
          activities.map((e) => (
            <div key={e._id}>
              <div className="d-flex justify-content-between">
                <div>
                  <div style={{ fontFamily: "poppins", fontSize: "0.9rem" }}>{e?.user}</div>
                </div>
                <div>
                  <small>
                    <i style={{ fontFamily: "poppins", fontSize: "0.7rem" }}>{timeStamp(e.createdAt)}</i>
                  </small>
                </div>
              </div>
              <p style={{ fontFamily: "poppins", fontSize: "0.8rem" }}>{e?.activity}</p>
              <hr />
            </div>
          ))
        ) : (
          <div className="">No activities yet</div>
        )}
      </div>
    </div>
  );
}

export default RecentActivity;
