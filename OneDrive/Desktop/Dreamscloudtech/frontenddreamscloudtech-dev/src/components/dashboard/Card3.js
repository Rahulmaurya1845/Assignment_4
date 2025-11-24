import React from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

function Card({ image, title, value, link, isPercentage, text, message }) {
  const colors = ["#EEF7FF"]; // Main theme color

  let bgColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="col-4 col-sm-4 col-md-2">
      <Link to={`${link}`} className="dashboard__card">
        <div className="card__detailssss">
          <h4 className="card__title" style={{ color: "#000000", opacity: "1.2" }}>{title}</h4>
          <div className="card__content">
            <div
              className={
                title === "Students"
                  ? "card__icon2"
                  : title === "Classes"
                    ? "card__icon3"
                    : "card__icon"
              }

              style={{ background: `${bgColor}` }}
            >
              <img
                src={image}
                alt={title}
                style={{
                  width: title === "TimeTable" ? 65 : 70,
                  height: title === "TimeTable" ? 65 : 70,

                  objectFit: "contain"
                }}

              />
            </div>

          </div>
          <div className="card__enter">
            <small style={{ fontWeight: "bold" }}>
              <div className="card__digits">

              </div>
            </small>

          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;