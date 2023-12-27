import React, { useState, useEffect } from "react";
import { useFirebase } from "../../context/firebase";
import style from "./cartCard.module.css";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { toast } from "react-toastify";

const CartCard = (props) => {
  const firebase = useFirebase();

  const [productData, setProductData] = useState(null);
  const [url, setUrl] = useState("");
  const [qty, setQty] = useState(props.qty);

  useEffect(() => {
    firebase
      .getProductByProductUID(props.productUID)
      .then((productData) => setProductData(productData))
      .catch((err) =>
        console.log("Error in fetching product details by it's id.", err)
      );
  }, []);

  useEffect(() => {
    if (productData) {
      firebase
        .getImgURL(productData.imgURL)
        .then((url) => {
          setUrl(url);
        })
        .catch((err) => console.log("Error in fetching the image url.", err));
    }
  }, [productData]);

  useEffect(() => {
    firebase
      .changeProductQty(props.documentID, qty)
      .catch((err) => console.log("Error in updating quantity", err));
  }, [qty]);

  const handleDeleteProduct = () => {
    firebase
      .deleteProductFromCart(props.documentID)
      .then(() => {
        toast.success("Product removed from cart!", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
          pauseOnHover: false,
        });
      })
      .catch((err) => console.log("Error in deleting product from cart!", err));
  };

  return (
    <>
      {productData && (
        <div className="card py-3">
          <div className="row no-gutters">
            <div className={style.imgWrapper + " col-md-4"}>
              <div>
                <img
                  src={url}
                  className={style.img + " card-img"}
                  alt="product-img"
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h6 className="card-title">{productData.title}</h6>
                <div>
                  <span>
                    <sup>&#8377;</sup>
                    {productData.salePrice}
                  </span>
                  <span className={style.mrp}>
                    <small>
                      M.R.P : <s>{productData.mrp}</s>
                    </small>
                  </span>
                </div>
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
                  <button
                    className={style.deleteBtn}
                    onClick={handleDeleteProduct}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartCard;
