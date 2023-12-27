import React, { useState, useEffect, useRef } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import loadingGif from "../../assets/loading.gif";
import { collection, onSnapshot } from "firebase/firestore";
import style from "./product.module.css";
import { useFirebase, firestore } from "../../context/firebase";

const Products = () => {
  const firebase = useFirebase();
  const categoryRef = useRef();
  const priceRef = useRef();
  const searchRef = useRef();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onSnapshot(collection(firestore, "products"), (snapshot) => {
      setProducts(snapshot.docs);
      setFilteredProducts(snapshot.docs);
      setLoading(false);
    });
  }, []);

  const handleFilter = () => {
    let category = categoryRef.current.value;
    let price = priceRef.current.value;
    if (category === "All" && price === "Any Price") {
      setFilteredProducts(products);
    } else if (category !== "All" && price === "Any Price") {
      firebase
        .getFilteredProducts(category, null)
        .then((snapshot) => setFilteredProducts(snapshot.docs))
        .catch((err) => console.log("Error in filtering the data", err));
    } else if (category === "All" && price !== "Any Price") {
      firebase
        .getFilteredProducts(null, price)
        .then((snapshot) => setFilteredProducts(snapshot.docs))
        .catch((err) => console.log("Error in filtering the data", err));
    } else {
      firebase
        .getFilteredProducts(category, price)
        .then((snapshot) => setFilteredProducts(snapshot.docs))
        .catch((err) => console.log("Error in filtering the data", err));
    }
  };

  const handleReset = () => {
    setFilteredProducts(products);
    categoryRef.current.value = "All";
    priceRef.current.value = "Any Price";
    searchRef.current.value = "";
  };

  const handleSearch = (e) => {
    const filteredList = products.filter((item) => {
      let productTitle = item.data().title.toLowerCase();
      return productTitle.includes(e.target.value.toLowerCase());
    });
    setFilteredProducts(filteredList);
  };

  return (
    <>
      {loading && (
        <div className="loadingContainer">
          <img src={loadingGif} alt="loading" width={100} />
        </div>
      )}
      {filteredProducts && (
        <div className={style.productsContainer}>
          <div className={style.filterContainer}>
            <input
              type="text"
              className="form-control"
              placeholder="Search product"
              onChange={handleSearch}
              ref={searchRef}
            />
            <div className={style.filterSubContainer}>
              <div className={style.filtersWrapper}>
                <select
                  className={style.filterDropdown}
                  onChange={handleFilter}
                  ref={categoryRef}
                >
                  <option value="All">All</option>
                  <option value="Mobile">Mobiles</option>
                  <option value="Laptop">Laptops</option>
                  <option value="Headphone">Headphones</option>
                  <option value="Camera">Cameras</option>
                </select>

                <select
                  className={style.filterDropdown}
                  onChange={handleFilter}
                  ref={priceRef}
                >
                  <option value="Any Price">Any Price</option>
                  <option value="500">Under 500</option>
                  <option value="1000">1000</option>
                  <option value="10000">10000</option>
                  <option value="50000">50000</option>
                  <option value="100000">100000</option>
                </select>
              </div>
              <div>
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleReset}
                >
                  Reset filter
                </button>
              </div>
            </div>
          </div>
          <div className={style.productsWrapper}>
            <h5>Explore latest collection</h5>
            <div className="row">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-12"
                    key={product.id}
                  >
                    <ProductCard {...product.data()} prodId={product.id} />
                  </div>
                ))
              ) : (
                <div>
                  <h5>No products to display</h5>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
