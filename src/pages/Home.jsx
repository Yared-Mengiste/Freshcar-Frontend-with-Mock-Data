import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import Career from "../assets/careers-image-opt.png";
import Partner from "../assets/partners-image-opt.png";
import Together from "../assets/together-opt.svg";
import Rider from "../assets/rider-image-opt.png";
import showObserver from "../animation";
import "./home.css";

const Home = (props) => {
  useEffect(()=>{
    showObserver()
  },[])

  return (
    <div>
      <section className="section-mb hidden-sec" id="hero-container">
        <div className="hero">
          <div className="paragraph">
            <h2>Grocery brought to the front of your door.</h2>
            <div>
              <Link className="btn btn-full" to="/products">
                Shop now
              </Link>
              <a className="btn btn-ghost" href="#features">
                Show me more
              </a>
            </div>
          </div>
          {/* <div className="heroimg">
            <img src={heroimg} alt="heroimg" />
          </div> */}
        </div>
      </section>

      {/* <div className="wrapper">
        <h2>Why Choose fresh cart Delivery?</h2>
        <p>
          We bring the market to your doorstep with quality, convenience, and
          care.
        </p>
        <div className="whythere">
          <div className="why">
            <img src={whyfresh} alt="whyfresh" />
            <h3>Fresh selection</h3>
            <p>
              Hand-picked fresh produce sourced directly from local markets and
              farmers.
            </p>
          </div>
          <div className="why">
            <img src={whyfast} alt="whyfast" />
            <h3>Quality Promise</h3>
            <p>100% satisfaction guaranteed or your money back</p>
          </div>
          <div className="why">
            <img src={whyquality} alt="whyquality" />
            <h3>Quality Guaranteed</h3>
            <p>
              Our products are guaranteed to be of the highest quality and
              freshness.
            </p>
          </div>
        </div>
      </div> */}
      <section className="section-features section-mb hidden-sec">
        <a name="features" />
        <div className="row">
          <h2 class="align">
            Get your groceries delivered&mdash; not just picked up.
          </h2>
          <p className="long-copy">
            Welcome to FreshCart, your premium grocery delivery service. We get
            it, life’s hectic, and you don’t always have the time (or energy) to
            shop for groceries. Let us handle that — we’re experts at bringing
            the freshest products right to your doorstep.
          </p>
        </div>

        <div className="features-container">
          <div className="col-box">
            <ion-icon name="location-outline" class="icon-big"></ion-icon>
            <h3>Convenience at Your Doorstep</h3>
            <p>
              Skip the hassle of grocery shopping and have fresh, high-quality
              items delivered directly to your door. Save time and energy with
              just a few clicks, no need to leave home!
            </p>
          </div>

          <div className="col-box">
            <ion-icon name="timer-outline" class="icon-big"></ion-icon>
            <h3>Delivered in 30 Minutes</h3>
            <p>
              Fresh groceries are just 30 minutes away, no matter where you are.
              We partner with local suppliers to ensure you get the freshest,
              highest-quality items, delivered fast and fresh.
            </p>
          </div>

          <div class="col-box">
            <ion-icon name="nutrition-outline" class="icon-big"></ion-icon>
            <h3>
              100% Fresh and <br />
              Local
            </h3>
            <p>
              Say goodbye to out-of-season produce and stale products. All our
              fruits, vegetables, and pantry items are locally sourced, fresh,
              and often organic.
            </p>
          </div>

          <div className="col-box">
            <ion-icon class="icon-big" name="cart-outline"></ion-icon>
            <h3>Shop Anything You Need</h3>
            <p>
              From everyday essentials to special treats, we’ve got everything
              you could want. With a massive selection of products across every
              aisle, FreshCart has everything you need, when you need it.
            </p>
          </div>
        </div>
      </section>
      <section className="section-partners section-mb hidden-sec">
        <div className="partners-container">
          <div class="row">
            <h2 className="align">Let's do it together</h2>
          </div>
          <img src={Together} className="icon-partner" alt="Together image" />

          <div className="elements-container">
            <div className="row">
              <div className="elements">
                <div className="elements-top">
                  <img src={Rider} alt="Rider image" />
                  <div className="elements-text">
                    <h3>Become a rider</h3>
                    <p>
                      Enjoy flexibility, freedom and competitive <br /> earnings
                      by delivering <br /> through Fresh Cart.
                    </p>
                  </div>
                </div>
                <Link className="btn btn-ghost" to={props.login?'/products':'/signin'}>
                  Register here
                </Link>
              </div>
            </div>

            <div className="row">
              <div className="elements">
                <div className="elements-top">
                  <img src={Partner} alt="Rider image" />
                  <div className="elements-text">
                    <h3>Become a partner</h3>
                    <p>
                      Grow with Fresh Cart! <br /> Our technology and user base
                      can help you <br />
                      boost sales and unlock new opportunities!
                    </p>
                  </div>
                </div>
                <Link className="btn btn-ghost" to={props.login?'/products':'/signin'}>
                  Register here
                </Link>
              </div>
            </div>

            <div className="row">
              <div className="elements">
                <div className="elements-top">
                  <img src={Career} alt="Rider image" />
                  <div className="elements-text">
                    <h3>Careers</h3>
                    <p>
                      Ready for an exciting new challenge? If you’re ambitious,
                      humble, and love working with others, then we want to hear
                      from you!
                    </p>
                  </div>
                </div>
                <Link className="btn btn-ghost" to={props.login?'/products':'/signin'}>
                  Register here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-plans section-mb hidden-sec">
        <div className="plans">
          <h2>Simple Delivery Plans</h2>
          <p>Choose a delivery plan that works best for your needs</p>
          <div className="plan">
            <div className="cards">
              <h3>Basic</h3>
              <p>Free</p>
              <div>
                <ul>
                  <li>2-hour delivery</li>
                  <li>No minimum order</li>
                  <li>Standard support</li>
                  <li>Market prices</li>
                </ul>
              </div>
              <Link className="btn btn-ghost" to={props.login?'/products':'/signin'}>
                  Register here
                </Link>
            </div>

            <div className="cards">
              <h3>Premium</h3>
              <p>300Birr/month</p>
              <div>
                <ul>
                  <li>Priority delivery</li>
                  <li>Free delivery over 300 birr</li>
                  <li>24/7 support</li>
                  <li>Special discounts</li>
                </ul>
              </div>
              <Link className="btn btn-ghost" to={props.login?'/products':'/signin'}>
                  Register here
                </Link>
            </div>

            <div className="cards">
              <h3>Family</h3>
              <p>700/month</p>
              <div>
                <ul>
                  <li>Scheduled deliveries</li>
                  <li>Bulk order discounts</li>
                  <li>Personal shopper</li>
                  <li>Price lock guarantee</li>
                </ul>
              </div>
              <Link className="btn btn-ghost" to={props.login?'/products':'/signin'}>
                  Register here
                </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
