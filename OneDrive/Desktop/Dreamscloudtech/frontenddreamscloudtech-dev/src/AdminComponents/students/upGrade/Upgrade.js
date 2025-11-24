import React from "react";
import {
  selectClasses,
  selectDormitories,
  selectCampuses,
} from "../../../store/slices/schoolSlice";
import { useSelector } from "react-redux";
import PromotingStudent from "./PromotingStudent";
import PromotingClass from "./PromotingClass";
import PromotingDormitories from "./PromotingDormitories";
import PromotingCampus from "./PromotingCampus";
import PromotingPast from "./PromotingPast";

function Upgrade() {
  const classes = useSelector(selectClasses);
  const dormitories = useSelector(selectDormitories);
  const campuses = useSelector(selectCampuses);
  const reversedClasses = [...classes].reverse();
  return (
    <div>
      <h3 className="mb-3 ml-2">Students Promotions</h3>
      {/* <PromotingPast classes={classes} /> */}
      <PromotingStudent classes={reversedClasses} />
      <PromotingClass classes={reversedClasses} />
      <PromotingCampus campuses={campuses} />
      <PromotingDormitories dormitories={dormitories} />
    </div>
  );
}

export default Upgrade;
