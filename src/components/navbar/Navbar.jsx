import React, { useEffect, useState } from "react";
import style from "./navbar.module.css";
import { BsCart3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useFirebase } from "../../context/firebase";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";
import { TbLogout } from "react-icons/tb";

const MyNavbar = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    if (firebase.user !== null) {
      firebase
        .getUserProfile()
        .then((profile) => setUserName(profile.userName));
    } else {
      setUserName("Guest");
    }
  }, [firebase.userDocId, firebase.user]);

  const handleSignOut = () => {
    firebase.signOutUser().then(() => {
      toast.success("Logged-out successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        pauseOnHover: false,
      });
      navigate("/");
    });
  };

  return (
    <>
      <Navbar expand="sm" className="bg-light px-3">
        <Navbar.Brand as={Link} to="/" className="logo">
          ShopEase
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Item>
              <NavDropdown title={userName}>
                <NavDropdown.Item as={Link} to="/profile">
                  <RxAvatar className={style.icon + " me-1"} />
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <button
                    onClick={handleSignOut}
                    disabled={firebase.user ? false : true}
                    className={style.logoutBtn}
                  >
                    <TbLogout className={style.icon + " me-1"} />
                    Logout
                  </button>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/products">
                Products
              </Nav.Link>
            </Nav.Item>
            {firebase.user && firebase.user.email === "admin@gmail.com" && (
              <Nav.Item>
                <Nav.Link as={Link} to="/addproduct">
                  Admin Dashboard
                </Nav.Link>
              </Nav.Item>
            )}
            <Nav.Item>
              <Nav.Link as={Link} to="/orders">
                Orders
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <BsCart3
                className={style.icon}
                onClick={() => navigate("/cart")}
              />
            </Nav.Item>
            {!firebase.user && (
              <Nav.Item>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default MyNavbar;
