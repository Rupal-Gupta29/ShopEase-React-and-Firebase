import React, { useState, useEffect } from "react";
import style from "./register.module.css";
import { Link } from "react-router-dom";
import { useFirebase } from "../../context/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (firebase.user) {
      navigate("/");
    }
  }, [firebase.userDocId, navigate, firebase]);

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .registerUser(email, password)
      .then((userCredentials) => {
        firebase
          .creatingUserInDB(
            name,
            number,
            email,
            address,
            userCredentials.user.uid
          )
          .then(() => {
            toast.success("User registered successfully!", {
              position: "top-right",
              autoClose: 2000,
              theme: "colored",
              pauseOnHover: false,
            });
            setErrorMsg("");
            setName("");
            setNumber("");
            setEmail("");
            setPassword("");
            setAddress("");
            navigate("/");
          });
      })
      .catch((err) => {
        setErrorMsg(err.message);
        console.log("Error in registering the user", err);
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setName("");
    setNumber("");
    setEmail("");
    setPassword("");
    setAddress("");
    setErrorMsg("");
  };

  return (
    <div className={style.registerContainer}>
      <h4 className={style.formHeading}>Create Account</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Display Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group mt-4">
          <label htmlFor="phNumber">Mobile Number</label>
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group mt-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group mt-4">
          <label htmlFor="address">Address</label>
          <textarea
            className={style.textArea + " form-control"}
            id="address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>
        {errorMsg && <p className="errMsg">{errorMsg}</p>}
        <div className={style.btnsWrapper}>
          <button type="submit" className={style.registerBtn}>
            Create Account
          </button>
          <button onClick={handleCancel} className={style.cancelBtn}>
            Cancel
          </button>
        </div>
      </form>
      <small>
        Already have an account? <Link to={"/login"}>Login</Link>
      </small>
    </div>
  );
};

export default Register;
