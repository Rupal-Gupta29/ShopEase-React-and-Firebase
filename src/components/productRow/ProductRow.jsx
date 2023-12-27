import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useFirebase } from "../../context/firebase";
import { toast } from "react-toastify";

const ProductRow = (props) => {
  const firebase = useFirebase();

  const [url, setUrl] = useState("");

  useEffect(() => {
    firebase
      .getImgURL(props.imgURL)
      .then((url) => {
        setUrl(url);
      })
      .catch((err) => console.log("Error in fetching the image url.", err));
  }, []);

  const handleProductDelete = (prodId) => {
    firebase
      .deleteProductById(prodId)
      .then(() => {
        toast.success("Product deleted successfully!", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
          pauseOnHover: false,
        });
      })
      .catch((err) => console.log("Error in deleting blog.", err));
  };

  return (
    <tr>
      <td>
        <img src={url} alt="product-img" width={50} />
      </td>
      <td>{props.title}</td>
      <td>{props.category}</td>
      <td>
        <RiDeleteBin6Line
          style={{ fontSize: "25px", color: "var(--myred)", cursor: "pointer" }}
          onClick={() => handleProductDelete(props.prodId)}
        />
      </td>
    </tr>
  );
};

export default ProductRow;
