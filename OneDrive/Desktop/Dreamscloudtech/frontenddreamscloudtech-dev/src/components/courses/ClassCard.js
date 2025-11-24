import React, { useEffect, useState } from "react";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import { Link } from "react-router-dom";
import axios from "../../store/axios";

function ClassCard({ id, classID }) {
  const [coursName, setcoursName] = useState([]);

  useEffect(() => {
    axios.get(`/courses/courseCode/${id}`).then((res) => {
      setcoursName(res.data.docs);
    });
  }, [id]);

  return (
    <div className=" col-xs-12 col-sm-3 com-md-4 mb-5">
      <div className="classCard p-3">
        {id ? (
          <Link to={`/academics/courses/${id}/${classID}`}>
            {/* <ImportContactsIcon className="icon" /> */}
            <img className="icon" src="https://i.ibb.co/pxTnQwR/flying-colorful-books-world-book-day-535126-2048-removebg-preview.png" alt="Books" />

            <h5 style={{ marginTop: "10px" }}>{coursName?.name}</h5>
            <span>{classID.toUpperCase()}</span>
          </Link>
        ) : (
          <div>
            {/* <ImportContactsIcon className="icon" /> */}
            <img className="icon" src="https://i.ibb.co/pxTnQwR/flying-colorful-books-world-book-day-535126-2048-removebg-preview.png" alt="Books" />
            <h5>Courses</h5>
            <span>No course yet</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClassCard;
