import React, { useState, useEffect } from "react";
import Info from "../../components/userInfoTabs/UserInfo2";
import StaffTabs from "../../components/userInfoTabs/StaffTabs";
import axios from "../../store/axios";
import { errorAlert } from "../../utils";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "src/store/slices/userSlice";

function StaffDetails() {
  const user = useSelector(selectUser);
  const [details, setdetails] = useState({});
  const { id } = useParams();
  const [loading, setloading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setloading(true);
    axios
      .get(`/teachers/${user?.userID}`)
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          history.push("/staff");
          // errorAlert(res.data.error);
          return 0;
        }
        setdetails(res.data.teacher);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }, [user?.userID, history]);

  console.log(details);

  return (
    <div>
      {!loading && (
        <>
          <h3>Staff Details</h3>
          {!details ? (
            <h1 className="text-danger text-center">Staff Member not found</h1>
          ) : (
            <div className="row">
              <div className="col-xs-12  ">
                <Info
                  name={details?.name}
                  surname={details?.surname}
                  middleName={details?.middleName}
                  role={details?.role}
                  photoUrl={details?.profileUrl}
                  route="staff"
                  id={details?.userID}
                />
              </div>
              <div className="col-xs-12 mb-5">
                <StaffTabs user={details} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default StaffDetails;
