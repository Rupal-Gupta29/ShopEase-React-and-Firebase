import React, { useEffect, useState } from "react";
import style from "./profile.module.css";
import { useFirebase } from "../../context/firebase";
import { useNavigate } from "react-router-dom";
import profileIcon from "../../assets/profile.png";
import loadingGif from "../../assets/loading.gif";
import { toast } from "react-toastify";

const Profile = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (firebase.user !== null) {
      firebase
        .getUserProfile()
        .then((user) => {
          setUserDetails(user);
          setNumber(user.phNumber);
          setAddress(user.address);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error in getting user's details", err);
        });
    } else {
      setLoading(false);
      navigate("/login");
    }
  }, [firebase.userDocId, navigate, firebase]);

  const handleSave = (e) => {
    e.preventDefault();
    firebase
      .updateUserProfile(userDetails.docId, number, address)
      .then(() => {
        toast.success("Profile updated successfully!", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
          pauseOnHover: false,
        });
      })
      .catch((err) => {
        console.log("Error in updating the profile", err);
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setNumber(userDetails.phNumber);
    setAddress(userDetails.address);
  };

  return (
    <>
      {loading && (
        <div className="loadingContainer">
          <img src={loadingGif} alt="loading" width={100} />
        </div>
      )}
      {userDetails && (
        <div className={style.profileContainer}>
          <header className={style.profileHeader}>
            <h4>Personal Information</h4>
          </header>
          <div className="row">
            <div className={style.detailsWrapper + " col-lg-3"}>
              <img
                src={profileIcon}
                alt="profile-icon"
                className="img-fluid"
                width={150}
              />
              <p>
                {userDetails.userName} <br />
                {userDetails.email}
              </p>
            </div>
            <div className="col-lg-9">
              <form onSubmit={handleSave}>
                <div className="form-group">
                  <label htmlFor="phNumber" className={style.lbl}>
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phNumber"
                    required
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="address" className={style.lbl}>
                    Address
                  </label>
                  <textarea
                    className={style.textArea + " form-control"}
                    id="address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
                </div>
                <div className={style.btnsWrapper}>
                  <button type="submit" className={style.saveBtn}>
                    Save changes
                  </button>
                  <button className={style.cancelBtn} onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
