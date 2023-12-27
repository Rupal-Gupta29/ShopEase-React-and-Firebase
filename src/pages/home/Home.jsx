import React from "react";
import heroBanner from "../../assets/banners/heroBanner.png";
import style from "./home.module.css";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import laptopBanner from "../../assets/banners/laptopBanner.png";
import headphoneBanner from "../../assets/banners/headphoneBanner.png";
import laptopBanner2 from "../../assets/banners/laptopBanner2.png";

import cam from "../../assets/products/cam.webp";
import camera from "../../assets/products/camera.webp";
import earbuds from "../../assets/products/earbuds.jpg";
import earphone from "../../assets/products/earphone.jpg";
import iphone from "../../assets/products/iphone.webp";
import macbook from "../../assets/products/macbook.webp";
import probook from "../../assets/products/probook.webp";
import redmi from "../../assets/products/redmi.webp";
import samsungflip from "../../assets/products/samsungflip.webp";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <section>
        <img
          src={heroBanner}
          alt="hero-banner"
          className={style.heroBanner + " img-fluid"}
        />
      </section>
      <section>
        <div className={style.productsContainer}>
          <div className={style.imgWrapper}>
            <img src={camera} alt="" className={style.productImg} />
          </div>

          <div className={style.imgWrapper}>
            <img src={iphone} alt="" className={style.productImg} />
          </div>

          <div className={style.imgWrapper}>
            <img src={earbuds} alt="" className={style.productImg} />
          </div>

          <div className={style.imgWrapper}>
            <img src={samsungflip} alt="" className={style.productImg} />
          </div>

          <div className={style.imgWrapper}>
            <img src={cam} alt="" className={style.productImg} />
          </div>

          <div className={style.imgWrapper}>
            <img src={macbook} alt="" className={style.productImg} />
          </div>

          <div className={style.imgWrapper}>
            <img src={earphone} alt="" className={style.productImg} />
          </div>

          <div className={style.imgWrapper}>
            <img src={probook} alt="" className={style.productImg} />
          </div>

          <div className={style.imgWrapper}>
            <img src={redmi} alt="" className={style.productImg} />
          </div>
        </div>
      </section>
      <div className={style.btnWrapper}>
        <button
          className={style.explrBtn}
          onClick={() => navigate("/products")}
        >
          Explore our products{" "}
          <span>
            <FaLongArrowAltRight />
          </span>
        </button>
      </div>
      <section>
        <div className="row">
          <div className="col">
            <img src={headphoneBanner} alt="banner" className="img-fluid" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <img src={laptopBanner2} alt="banner" className="img-fluid" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <img src={laptopBanner} alt="banner" className="img-fluid" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
