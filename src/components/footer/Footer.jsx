import React from "react";
import style from "./footer.module.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import facebook from "../../assets/socialmediaIcons/facebook.png";
import instagram from "../../assets/socialmediaIcons/instagram.png";
import twitter from "../../assets/socialmediaIcons/twitter.png";
import pinterest from "../../assets/socialmediaIcons/pinterest.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className={style.footer + " row"}>
      <div className="col-lg-5 col-md-12 col-sm-12 col-12">
        <h4 className="logo" onClick={() => navigate("/")}>
          ShopEase
        </h4>
        <p className={style.appDesc}>
          Discover a new way to shop with "ShopEase"! Our app brings you a
          hassle-free and enjoyable shopping experience. Browse through a wide
          range of products with ease, find what catches your eye, and shop
          effortlessly. StareMart – where shopping is simple, fun, and tailored
          to your preferences!
        </p>
        <div className={style.iconsWrapper}>
          <img src={facebook} alt="facebook-icon" width={40} />
          <img src={instagram} alt="instagram-icon" width={40} />
          <img src={twitter} alt="twitter-icon" width={40} />
          <img src={pinterest} alt="pinterest-icon" width={40} />
        </div>
      </div>
      <div className={style.linksWrapper + " col col-lg-2"}>
        <h5>Top Categories</h5>
        <div className={style.footerItemsWrapper}>
          <div>Mobile Phones</div>
          <div>Laptops</div>
          <div>Smart Watches</div>
          <div>Headphones</div>
          <div>Cameras</div>
        </div>
      </div>
      <div className={style.linksWrapper + " col col-lg-2"}>
        <h5>Useful Links</h5>
        <div className={style.footerItemsWrapper}>
          <div className={style.footerItem} onClick={() => navigate("/")}>
            Home
          </div>
          <div
            className={style.footerItem}
            onClick={() => navigate("/products")}
          >
            Products
          </div>
          <div className={style.footerItem} onClick={() => navigate("/cart")}>
            Cart
          </div>
          <div className={style.footerItem} onClick={() => navigate("/login")}>
            Login
          </div>
        </div>
      </div>
      <div className="col col-lg-3">
        <h5>Contact</h5>
        <div className={style.footerItemsWrapper}>
          <div>
            <FaLocationDot className={style.icon} />
            <span>672 Maple Street Hawkins, IN 56789 USA </span>
          </div>
          <div>
            <FaPhone className={style.icon} />
            <span>+811 2332 7869</span>
          </div>
          <div>
            <MdEmail className={style.icon} />
            <span>support@shopease.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
