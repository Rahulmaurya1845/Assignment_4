import React from "react";
import { Link } from "react-router-dom";

function Card2({ image, title, link }) {
  const colors = ["#EEF7FF"]; 
  let bgColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="col-4 col-sm-4 col-md-2">
      <Link to={`${link}`} className="dashboard__card2">
        <div className="card__detailss">
          <h4 className="card__title" style={{ color: "#000000", opacity: "1.2", }}>{title}</h4>
        </div>
        <div
          className="card__icon"
          style={{
            background: `${bgColor}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={image}
            alt={title}
            style={{ width: 50, height: 50, objectFit: "contain" }}
          />
        </div>

      </Link>
    </div>
  );
}

export default Card2;
