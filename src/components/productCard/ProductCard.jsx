import React, { useState, useEffect } from "react";
import { useFirebase } from "../../context/firebase";
import style from "./productCard.module.css";
import { useNavigate } from "react-router-dom";

const ProductCard = (props) => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [url, setUrl] = useState("");

  useEffect(() => {
    firebase
      .getImgURL(props.imgURL)
      .then((url) => {
        setUrl(url);
      })
      .catch((err) => console.log("Error in fetching the image url.", err));
  }, []);

  return (
    <div className={style.productCard + " card"}>
      <div className={style.imgWrapper}>
        <img
          src={url}
          className={style.cardImg + " card-img-top"}
          alt="product-image"
        />
      </div>
      <div className={style.bodyWrapper}>
        <h6 className="card-title">{props.title}</h6>
        <div>
          <small>
            M.R.P : <s className={style.mrp}>{props.mrp}</s>
          </small>
          <span>
            <sup>&#8377;</sup>
            {props.salePrice}
          </span>
        </div>
        <button
          className={style.viewBtn}
          onClick={() => navigate(`${props.prodId}`, { state: { ...props } })}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
