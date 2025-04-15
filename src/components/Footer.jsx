import React from "react";
import {Link} from 'react-router-dom'
import "./footer.css";
import { NavLink } from "react-router-dom";

const Footer = (props) => {
  return (
    <footer class="footer1">
      <div class="container">
        <div class="col1">
          <a href="#" class="brand">
            Brand
          </a>
          <ul class="media-icons">
            <li>
              <a href="#">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>
            <li>
              <a href="#">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>
            <li>
              <a href="#">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </li>
            <li>
              <a href="#">
                <ion-icon name="logo-linkedin"></ion-icon>
              </a>
            </li>
          </ul>
        </div>
        <div class="col2">
          <ul className="menu">
            <li>
              <NavLink to="/">HOME</NavLink>
            </li>
            <li>
              <NavLink to="/products">SHOP NOW</NavLink>
            </li>
            <li>
              <NavLink to="/contact">CONTACT</NavLink>
            </li>
          </ul>
          <p>
            Skip the hassle of grocery shopping and have fresh, high-quality
            items delivered directly to your door. Save time and energy with
            just a few clicks, no need to leave home!
          </p>
        </div>
        <div class="col3">
          <p>Subscribe to our newsletter</p>
          <form>
            <div class="input-wrap">
              <input type="email" placeholder="example@gmail.com" />
              <Link to={props.login?'/products':'/signin'}>
                <ion-icon name="paper-plane-outline"></ion-icon>
              </Link>
            </div>
          </form>
          {/* <ul class="service-icons">
            <li>
              <a href="#">
                <ion-icon name="logo-amazon"></ion-icon>
              </a>
            </li>
            <li>
              <a href="#">
                <ion-icon name="logo-paypal"></ion-icon>
              </a>
            </li>
            <li>
              <a href="#">
                <ion-icon name="logo-bitcoin"></ion-icon>
              </a>
            </li>
          </ul> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
