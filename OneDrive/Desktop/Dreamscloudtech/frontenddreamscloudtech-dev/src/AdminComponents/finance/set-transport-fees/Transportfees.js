import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Transportfeestable from "./Transport-fees-table";
import axios from "../../../store/axios";
// import AddType from "./AddFessModel";
// import DeleteModel from "./DeleteFeesModal";
import { errorAlert } from "../../../utils";
// import EditFees from "./EditFees";
// import { useDispatch, useSelector } from "react-redux";
// import { selectFees, setTransportfeesType } from "../../../store/slices/schoolSlice";

const tableHeader = [
  { id: "code", name: "UniqueID" },
  { id: "name", name: "Village-Name" },
  { id: "name", name: "Amount" },
  { id: "name", name: "Delete" },
  // { id: "day", name: "Without Transport" },
  // { id: "border", name: "Transport" },
];

function Transportfees() {
  const [transportfees, setTransportfees] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setopenEdit] = useState(false);
  const [name, setname] = useState("");
  const [deleteID, setdeleteID] = useState("");
  const [openDelete, setopenDelete] = useState(false);
  const [loading, setloading] = useState(false);
  const [deleteloading, setdeleteloading] = useState(false);
  const [editFee, seteditFee] = useState({});
//   const dispatch = useDispatch();
//   const feesType = useSelector(selectFees);
    // console.log("transport fees - ");

  useEffect(() => {
    axios.get("/transport/all-fees").then((res) => {
        setTransportfees(res.data);
    });
}, []);
console.log("Transport-fees response - ",transportfees);

  const handleAddNew = () => {
    setloading(true);
    axios.post("/fees/create", { name }).then(async (res) => {
      setloading(false);
      setTransportfees([res.data.docs, ...transportfees]);
    //   dispatch(setTransportfeesType([...feesType, { name, code: res.data.docs?.code }]));
      setOpen(false);
      setname("");
      await axios.post("/activitylog/create", {
        activity: ` ${name} fees type was created`,
        user: "admin",
      });
    });
  };

  const handleDelete = (id) => {
    setopenDelete(true);
    setdeleteID(id);
  };

  const handleEdit = (fee) => {
    console.log(fee, "clicked");
    seteditFee(fee);
    setopenEdit(true);
  };

  const onDelete = () => {
    setdeleteloading(true);
    axios
      .delete(`/fees/delete/${deleteID}`)
      .then(async (res) => {
        setdeleteloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setopenDelete(false);
        setTransportfees(transportfees.filter((e) => e._id !== deleteID));
        // dispatch(setTransportfeesType(feesType.filter((i) => i._id !== deleteID)));
        let deleted = transportfees.find((e) => e._id === deleteID);
        await axios.post("/activitylog/create", {
          activity: ` ${deleted?.name} fees  was deleted`,
          user: "admin",
        });
      })
      .catch((err) => {
        console.log(err);
        errorAlert("error occurred");
      });
  };

  return (
    <div  >

      <div className=" row mb-3" >
        <h3 style={{ marginBottom: -30 }}>Current School Transport Fees </h3>
        <div className="d-flex justify-content-end">
          <Link className="btn red__btn ml-3" to="/finance/set-transport-fees">
            {" "}
            Set Fees
          </Link>

        </div>
      </div>
      {transportfees.length === 0 ? (
        
            <p>
                loading...
            </p>
      ) :
          <Transportfeestable
     
          data={transportfees}
          />
        }
    </div>
  );
}

export default Transportfees;
