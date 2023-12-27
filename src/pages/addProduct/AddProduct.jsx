import React, { useEffect, useState } from "react";
import { firestore } from "../../context/firebase";
import Modal from "../../components/modal/Modal";
import { collection, onSnapshot } from "firebase/firestore";
import ProductRow from "../../components/productRow/ProductRow";
import style from "./addproduct.module.css";
import loadingGif from "../../assets/loading.gif";
import { useFirebase } from "../../context/firebase";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (firebase.user && firebase.user.email === "admin@gmail.com") {
      onSnapshot(collection(firestore, "products"), (snapshot) => {
        setProducts(snapshot.docs);
        setLoading(false);
      });
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
      <h5 className={style.heading}>Product Details</h5>
      <div className={style.detailsWrapper}>
        <div>Total Products: {products.length}</div>
        <button onClick={() => setModal(true)} className={style.addBtn}>
          Add Product
        </button>
        {modal && <Modal setModal={setModal} />}
      </div>
      {products.length > 0 && (
        <div className={style.tableContainer}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Product</th>
                <th scope="col">Category</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => {
                  return (
                    <ProductRow
                      key={product.id}
                      {...product.data()}
                      prodId={product.id}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AddProduct;
