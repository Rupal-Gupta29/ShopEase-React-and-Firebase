import React, { useState, useEffect } from "react";
import { useFirebase, firestore } from "../../context/firebase";
import loadingGif from "../../assets/loading.gif";
import CartCard from "../../components/cartCard/CartCard";
import { collection, onSnapshot } from "firebase/firestore";
import style from "./cart.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  let subtotal = 0;

  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (firebase.user !== null) {
      onSnapshot(
        collection(firestore, "users", firebase.userDocId, "cart"),
        (snapshot) => {
          setCartProducts(snapshot.docs);
          setLoading(false);
        }
      );
    } else {
      navigate("/login");
    }
  }, [firebase.userDocId, navigate, firebase]);

  const handleCheckout = () => {
    firebase
      .placeOrder()
      .then(() => {
        toast.success("Order placed!", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
          pauseOnHover: false,
        });
        navigate("/orders");
      })
      .catch((err) => console.log("Error in placing the order:", err));
  };

  return (
    <>
      {loading && (
        <div className="loadingContainer">
          <img src={loadingGif} alt="loading" width={100} />
        </div>
      )}
      {cartProducts.length > 0 ? (
        <div className={style.cartContainer}>
          <div className="row">
            <div className={style.cardsWrappers + " col-md"}>
              {cartProducts.map((product) => (
                <CartCard
                  {...product.data()}
                  key={product.id}
                  documentID={product.id}
                />
              ))}
            </div>
            <div className={style.summaryWrapper + " col-md"}>
              <h5>Order summary</h5>
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartProducts.map((product) => {
                      subtotal += product.data().salePrice * product.data().qty;
                      return (
                        <tr key={product.id}>
                          <td>{product.data().title}</td>
                          <td>{product.data().qty}</td>
                          <td>
                            <sup>&#8377;</sup>
                            {product.data().salePrice * product.data().qty}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className={style.subtotalWrapper}>
                  <p>Subtotal:</p>
                  <p>&#8377; {subtotal}</p>
                </div>
                <div className={style.btnsWrapper}>
                  <button
                    className={style.cartPageBtn}
                    onClick={() => navigate("/products")}
                  >
                    Continue shopping
                  </button>
                  <button
                    className={style.cartPageBtn}
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h5>No products to display</h5>
      )}
    </>
  );
};

export default Cart;
