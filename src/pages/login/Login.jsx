import React, { useEffect, useState } from "react";
import style from "./login.module.css";
import { Link } from "react-router-dom";
import { useFirebase } from "../../context/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (firebase.user) {
      navigate("/");
    }
  }, [firebase.userDocId, navigate, firebase]);

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .signInUser(email, password)
      .then(() => {
        toast.success("Logged-in successfully!", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
          pauseOnHover: false,
        });
        setEmail("");
        setPassword("");
        setErrorMsg("");
        navigate("/");
      })
      .catch((err) => {
        setErrorMsg(err.message);
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    setErrorMsg("");
  };

  return (
    <div className={style.loginContainer}>
      <h4 className={style.formHeading}>Sign In</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
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
        {errorMsg && <p className="errMsg">{errorMsg}</p>}
        <div className={style.btnsWrapper}>
          <button type="submit" className={style.loginBtn}>
            Login
          </button>
          <button onClick={handleCancel} className={style.cancelBtn}>
            Cancel
          </button>
        </div>
      </form>
      <small>
        Don't have an account? <Link to={"/register"}>Register</Link>
      </small>
    </div>
  );
};

export default Login;
