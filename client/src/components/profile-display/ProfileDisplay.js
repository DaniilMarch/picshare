import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import ProfileCard from "./ProfileCard";
import ProfileAlbum from "./ProfileAlbum";
import { getProfile } from "../../actions/profileActions";
import NotFound from "../common/NotFound";

const ProfileDisplay = props => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await axios({
        method: "get",
        url: `http://localhost:5000/api/profiles/profile_images/${
          props.match.params.profile_id
        }`,
        mode: "no-cors"
      });
      setImages(res.data.images);
    })();
  }, []);

  useEffect(() => {
    props.getProfile(props.match.params.profile_id);
  }, []);

  return (
    <div className="container">
      {props.error.notfound ? (
        <NotFound item="Profile" />
      ) : (
        <div>
          <ProfileCard profile_id={props.match.params.profile_id} />
          <ProfileAlbum images={images} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return { profile: state.profile, error: state.error };
};

export default connect(
  mapStateToProps,
  { getProfile }
)(ProfileDisplay);
