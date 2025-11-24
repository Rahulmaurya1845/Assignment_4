import React from "react";
import { useHistory } from "react-router-dom";

function Logout({ dispatch, loggout, user }) {
  const history = useHistory();

  const handleDelete = () => {
    dispatch(loggout());
    localStorage.clear();
    history.push("/login");
  };

  return (
    <div className="content__container" style={{ backgroundColor: "#EEF7FF" }}>
      <div className="d-flex justify-content-between">
        <h6>
          You are logged-in as {user?.id}- {user?.name}{" "}
          {user?.lastName ? user?.lastName : ""}
        </h6>
        <button onClick={handleDelete} className="btn red__btn">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Logout;
