import React, { useEffect, useState } from "react";
import ClassCard from "../../components/courses/ClassCard";
import { selectUser } from "../../store/slices/userSlice";
import { useSelector } from "react-redux";
import axios from "../../store/axios";
let cId = ""
function CoursesPage() {
  const [courses, setcourses] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    const getdata = async () => {
      let data = await axios.get(`/students/student/${user?.userID}`);
      let classID = data.data.student?.classID;
      cId = classID

      await axios.get(`/courses/class/${classID}`).then((res) => {
        if (res.data.success) {
          setcourses(res.data.docs);
        }
      });
    };
    getdata();
  }, [user]);

  return (
    <div>
      <h3 className="text-center">My Courses</h3>
      <div className="row mt-5">
        {courses.length > 0 ? (
          courses.map((e) => <ClassCard key={e.code} id={e.code} classID={cId} />)
        ) : (
          <ClassCard />
        )}
      </div>
    </div>
  );
}

export default CoursesPage;
