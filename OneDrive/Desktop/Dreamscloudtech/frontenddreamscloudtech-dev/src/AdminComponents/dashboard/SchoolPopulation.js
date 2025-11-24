import React from "react";
import ComplexDonut from "react-svg-donuts/dist/complex";
import "react-svg-donuts/dist/index.css";

function Population({ maleStudents, femaleStudents }) {
  return (
    
    
    <div style={{ background: "#F2F9FF", display: "flex", marginTop: -55, }} className="content__container attendances">
      <h4 style={{ alignItems: "center", fontFamily: "poppins", fontSize: "1.2rem" }}>Students</h4>
      <div style={{ marginLeft: -100, marginTop: 15, marginBottom: -10 }}>
        <ComplexDonut
          size={200}
          radius={40}
          segments={[
            {
              color: "#2094e6",
              // value: femaleStudents || 0,

              value: 60,
            },
            {
              color: "#F34234",
              // value: maleStudents || 0,
              value: 100,
            },
          ]}
          thickness={50}
          startAngle={-90}
        />
      </div>
      <div>
        <div className="graph__keys col mt-4">
          <div className=" col-sm-5 mb-3 mt-5">
            <div className="color__box female__colorr"></div>
            <div style={{ display: "flex", gap: "10px" }}>
              <div className="muted-text">Female</div>
              {/* <h6>
              <strong>{femaleStudents || 0}</strong>
            </h6> */}
              <div>
                <strong>{60}</strong>
              </div>
            </div>
          </div>
          <div className=" col-sm-5">
            <div className="color__box male__colorr"></div>
            <div style={{ display: "flex", gap: "10px" }}>
              <div className="muted-text">Male</div>
              {/* <h6>
              <strong>{maleStudents || 0}</strong>
            </h6> */}
              <div>
                <strong>{100}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   
  );
}

export default Population;
