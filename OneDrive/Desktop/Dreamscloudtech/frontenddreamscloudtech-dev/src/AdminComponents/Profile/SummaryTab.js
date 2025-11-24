import React from "react";
import { Link } from "react-router-dom";

function SummaryTab({ count }) {
  const renderCard = (title, value, route = "#") => {
    return (
      <div className="col-sm-6 col-md-4 mb-3">
        <div className="card p-3" style={{ backgroundColor: "#ffffff" }}>
          <div className="text-center">
            <Link className="text-info" to={route} style={{ textDecoration: "none" }}>
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

  return (
    <div className="summary__page" style={{ backgroundColor: "#EEF7FF" }}>
      <div className="mb-5">
        <h3>Students</h3>
        <div className="row ">
          {renderCard(
            "Female",
            count?.femaleStudents || 0,
            "/student/female"
          )}
          {renderCard(
            "Male",
            count?.maleStudents || 0,
            "/student/male"
          )}
          {renderCard("Total", count?.students || 0, "/students")}
        </div>
      </div>

      <div className="mb-5">
        <h3>Staff</h3>
        <div className="row ">
          {renderCard(
            "Female",
            count?.femaleStaff || 0,
            "/staffs/female"
          )}
          {renderCard(
            "Male",
            count?.maleStaff || 0,
            "/staffs/male"
          )}
          {renderCard("Total", count?.staff || 0, "/staff")}
        </div>
      </div>

      <div className="mb-3 row">
        {renderCard("Divisions", count?.divisions || 0, "/academics/divisions")}
        {renderCard("Departments", count?.departments || 0, "/academics/departments")}
        {renderCard("Sections", count?.sections || 0, "/students/section")}
        {renderCard("Courses", count?.courses || 0, "/academics/courses")}
        {renderCard("Classes", count?.classes || 0, "/academics/classes")}
        {renderCard("Prefects", count?.prefects || 0, "/students/prefects")}
      </div>
    </div>
  );
}

export default SummaryTab;
