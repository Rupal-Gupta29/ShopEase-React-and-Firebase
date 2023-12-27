import React, { useState } from "react";
import ReactDOM from "react-dom";
import style from "./modal.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useFirebase } from "../../context/firebase";
import { toast } from "react-toastify";

const Modal = ({ setModal }) => {
  const firebase = useFirebase();

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("Laptop");
  const [mrp, setMRP] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [specification, setSpecifications] = useState("");
  const [productImg, setProductImg] = useState(null);

  const handleAddProduct = (e) => {
    e.preventDefault();
    firebase
      .addProduct(
        title,
        brand,
        category,
        Number(mrp),
        Number(salePrice),
        specification,
        productImg,
        crypto.randomUUID()
      )
      .then(() => {
        toast.success("Product added successfully!", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
          pauseOnHover: false,
        });
        setModal(false);
      });
  };
  return ReactDOM.createPortal(
    <>
      <div className={style.overlay} />
      <div className={style.modalWrapper}>
        <div className={style.closeIcon}>
          <IoIosCloseCircleOutline onClick={() => setModal(false)} />
        </div>
        <h5 className={style.formHeading}>Add Product</h5>
        <div>
          <form className={style.productForm} onSubmit={handleAddProduct}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Product title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="M.R.P"
                value={mrp}
                onChange={(e) => setMRP(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Sale price"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <span className={style.lbl}>Category</span>
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="Laptop">Laptop</option>
                <option value="Headphone">Headphone</option>
                <option value="Mobile">Mobile</option>
                <option value="Camera">Camera</option>
              </select>
            </div>
            <div className="form-group">
              <span className={style.lbl}>Add product image</span>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setProductImg(e.target.files[0])}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                className={style.textArea + " form-control"}
                placeholder="Product Specifications"
                value={specification}
                onChange={(e) => setSpecifications(e.target.value)}
                required
              ></textarea>
            </div>
            <button className={style.addBtn}>Add Product</button>
          </form>
        </div>
      </div>
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
