import React from "react";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Avatar from "@material-ui/core/Avatar";
import { getImgSrc } from "../../utils";

function Profile({ profileimg, setprofileUrl, profileUrl }) {
  return (
    <div>
      <h3 style={{
        marginLeft: "30px"
      }}>Profile Photo</h3>
      <input
        accept="image/*"
        className=""
        id="icon-button-file"
        type="file"
        onChange={setprofileUrl}
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera style={{
            marginLeft: "-130px"
          }} />
        </IconButton>
      </label>

      <Avatar
        style={{
          width: "100px", height: "100px", marginLeft: "50px"
        }}
        src={profileUrl ? profileimg : getImgSrc(profileimg)}
        alt="Username"
      />
    </div>
  );
}

export default Profile;
