import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import style from "./productDetailed.module.css";
import { useFirebase } from "../../context/firebase";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductDetailed = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { productUID, salePrice, title } = state;

  const [url, setUrl] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    firebase
      .getImgURL(state.imgURL)
      .then((url) => {
        setUrl(url);
      })
      .catch((err) => console.log("Error in fetching the image url.", err));
  }, []);

  const handleAddToCart = () => {
    if (firebase.user === null) {
      toast.info("Please log in before accessing.", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
        pauseOnHover: false,
      });
      navigate("/login");
    } else {
      firebase
        .addToCart(productUID, qty, salePrice, title)
        .then((res) => {
          if (res === "alreadyPresent") {
            toast.success("Product is already in your cart!", {
              position: "top-right",
              autoClose: 2000,
              theme: "colored",
              pauseOnHover: false,
            });
          } else {
            toast.success("Product added successfully!", {
              position: "top-right",
              autoClose: 2000,
              theme: "colored",
              pauseOnHover: false,
            });
          }
        })
        .catch((err) => console.log("Error in adding product to cart", err));
    }
  };

  return (
    <div className={style.detailedSection}>
      <div className="row">
        <div className={style.imgWrapper + " col-12 col-md-4 col-sm-6"}>
          <div>
            <img
              src={url}
              alt="product-img"
              className="img-fluid"
              width={200}
            />
          </div>
        </div>
        <div className="col-12 col-md-8 col-sm-6">
          <h5>
            {state.title} - {state.category}
          </h5>
          <span className={style.brand}>{state.brand}</span>
          <hr />
          <h5>
            <sup>&#8377;</sup>
            {state.salePrice}
          </h5>
          <span className={style.salePrice}>
            M.R.P <s>&#8377;{state.mrp}</s>
          </span>
          <p>{state.specification}</p>
          <div className={style.btnWrapper}>
            <div>
              <CiCirclePlus
                className={style.icons}
                onClick={() => setQty(qty + 1)}
              />
              <span className={style.qty}>{qty}</span>
              <CiCircleMinus
                className={style.icons}
                onClick={() => (qty > 1 ? setQty(qty - 1) : setQty(1))}
              />
            </div>
            <button className={style.cartBtn} onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailed;
