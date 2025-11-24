import React, { useEffect, useState } from "react";
import SidebarMessage from "./SidebarMessage";
import axios from "../../../store/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SearchIcon from "@material-ui/icons/Search";
import AddUserModel from "./AddUserModel";
import { errorAlert, successAlert } from "src/utils";

function Sidebar() {
  const [chats, setchats] = useState([]);
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(false);
  const [search, setsearch] = useState("");
  const [searchResults, setsearchResults] = useState("");
  const [loadingSearch, setloadingSearch] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    axios.get(`/chats/chats/${user?.id}`).then((res) => {
      setchats(res.data);
    });
  }, [user]);

  const handleSendRequest = (id) => {
    setloading(true);
    axios
      .post(`/chats/create`, {
        acceptor_id: id,
        requestor_id: user?.userID,
      })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          return errorAlert(res.data.error);
        }
        setOpen(false);
        //successAlert(`Friend request has been successfully send to ${id}`);
        axios.get(`/chats/chats/${user?.userID}`).then((result) => {
          setchats(result.data);
        });
      })
      .catch((err) => {
        errorAlert("Faild");
        setloading(false);
      });
  };

  const handleSearchUser = (e) => {
    console.log("search");
    e.preventDefault();
    if (search) {
      setloadingSearch(true);
      axios
        .get(`/users/search/${search}`)
        .then((res) => {
          let results = res.data;
          setloadingSearch(false);
          setsearchResults(results);
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    }
  };

  return (
    <div className="sidebar" style={{ backgroundColor: "#4aa7f9" }}>
      <div className="sidebar__header pr-2 pt-3 pl-2 mr-3 ml-5 mb-3" style={{ backgroundColor: "#4aa7f9", marginTop: -4 }}>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <h2 style={{ color: "white" }}>
            <strong>Chats</strong>
          </h2>
          <div>
            <button onClick={() => setOpen(true)} className="btn" style={{ color: "white" }}>
              < PersonAddIcon />
            </button>
          </div>
        </div>
      </div>

      <div >
        {chats &&
          chats
            .sort((x, y) => {
              return x.updatedAt - y.updatedAt;
            })
            .map((chat) => (
              <SidebarMessage

                key={chat._id}
                chat={chat}
                currentUser={user?.id}
              />
            ))}
      </div>
      <AddUserModel
        search={search}
        setsearch={setsearch}
        handleSearch={handleSearchUser}
        open={open}
        searchResults={searchResults}
        setsearchResults={setsearchResults}
        loadingSearch={loadingSearch}
        setOpen={setOpen}
        loading={loading}
        handleSendRequest={handleSendRequest}
      />
    </div>
  );
}

export default Sidebar;
