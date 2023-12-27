import React, { useState, useEffect } from "react";
import loadingGif from "../../assets/loading.gif";
import style from "./orders.module.css";
import { useFirebase } from "../../context/firebase";
import OrdersCard from "../../components/ordersCard/OrdersCard";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (firebase.user !== null) {
      firebase
        .getOrderDetails()
        .then((snapshot) => {
          setOrders(snapshot.docs);
          setLoading(false);
        })
        .catch((err) => console.log("Error in getting order details,", err));
    } else {
      navigate("/login");
    }
  }, [firebase.userDocId, navigate, firebase]);

  return (
    <>
      {loading && (
        <div className="loadingContainer">
          <img src={loadingGif} alt="loading" width={100} />
        </div>
      )}
      {orders.length > 0 ? (
        <div className={style.ordersContainer}>
          <h5>Your Orders</h5>
          <div className={style.ordersWrapper}>
            {orders.map((product) => (
              <OrdersCard
                {...product.data()}
                key={product.id}
                documentID={product.id}
              />
            ))}
          </div>
        </div>
      ) : (
        <h5>No orders to display</h5>
      )}
    </>
  );
};

export default Orders;
