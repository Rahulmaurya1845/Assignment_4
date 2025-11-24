import React, { useEffect, useState } from "react";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import { Link } from "react-router-dom";
import axios from "../../store/axios";

function ClassCard({ id }) {
  const [coursName, setcoursName] = useState([]);

  useEffect(() => {
    axios.get(`/classes/${id}`).then((res) => {
      setcoursName(res.data.docs);
    });
  }, [id]);

  return (
    <div className=" col-xs-12 col-sm-4 com-md-4 mb-5">
      <div className="classCard p-3">
        {id ? (

          <Link to={`/academics/classes/${id}`}>
            {/* <ImportContactsIcon className="icon" /> */}
            <img className="icon" src="https://i.ibb.co/w4Jnjp0/picture-boy-with-book-that-says-school-646696-11654-removebg-preview.png" alt="Books" />
            <h5 style={{ marginTop: "10px" }}>{coursName?.name}</h5>
            <span>{id.toUpperCase()}</span>
          </Link>
        ) : (
          <div>
            {/* <ImportContactsIcon className="icon" /> */}
            <img className="icon" src="https://i.ibb.co/w4Jnjp0/picture-boy-with-book-that-says-school-646696-11654-removebg-preview.png" alt="Books" />
            <h5>Classes</h5>
            <span>No classes yet</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClassCard;
