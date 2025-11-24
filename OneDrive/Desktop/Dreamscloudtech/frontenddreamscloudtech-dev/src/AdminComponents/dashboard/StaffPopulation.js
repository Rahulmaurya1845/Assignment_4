import React from "react";
import ComplexDonut from "react-svg-donuts/dist/complex";
import "react-svg-donuts/dist/index.css";

function Population({ maleStudents, femaleStudents }) {
  return (
    <div style={{ background: "#F2F9FF", display: "flex", marginTop: -55 }} className="content__container attendances">
      <h4 style={{ fontFamily: "poppins", fontSize: "1.2rem" }}>Staff</h4>
      <div style={{ marginLeft: -70, marginTop: 15, marginBottom: -10 }}>
        <ComplexDonut
          size={200}
          radius={40}
          segments={[
            {
              color: "#8ec7ff",

              value: 50,
            },
            {
              color: "#ff942b",
              value: 70,
              // value: maleStudents || 0,
            },
          ]}
          thickness={50}
          startAngle={-90}
        />
      </div>
      <div>
        <div className="graph__keys col mt-4">
          <div className=" col-sm-5 mb-3 mt-5">
            <div className="color__box female__color"></div>
            <div style={{ display: "flex", gap: "10px" }}>
              <div className="">Female</div>
              {/* <h6>
            <strong>{femaleStudents || 50}</strong>
          </h6> */}
              <div>
                <strong>{50}</strong>
              </div>
            </div>
          </div>
          <div className=" col-sm-5">
            <div className="color__box male__color"></div>
            <div style={{ display: "flex", gap: "10px" }}>
              <div className="muted-text">Male</div>
              {/* <h6>
            <strong>{maleStudents || 70}</strong>
          </h6> */}
              <div >
                <strong>{70}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Population;
