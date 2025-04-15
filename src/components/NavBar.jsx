import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CartItem from "./CartItem";
import Menu from "../assets/menu.png";
import "./NavBar.css";
import "./Search.css";
import SearchIcon from "../assets/search.png";
import Cart from "../assets/cart.png";


const toggleCart = () => {
  const cart = document.querySelector(".cart-container");
  console.log(cart);
  cart.classList.toggle("cart-visible");

  console.log(cart);
};

const NavBar = (props) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    let value = e.target.value;
    props.setSearch(value);
    console.log(value)
    setSearchText(value);    
  };

  const logout = () => {
    console.log("Logout clicked");
    props.onLogout();
    navigate("/");
  };
  const sendToDB = async (e) => {
    e.preventDefault(); 

    
    if (props.cart.length > 0) {
      const orderData = {
        user_id: props.userId,
        city:props.user.city,
        address: props.user.address,
        total_price: props.cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
        items: props.cart.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

     
          alert("Order placed successfully!");
          props.clearCart();
       
    }
  };
  return (
    <section className="nav-section">
      <header>
        <div className="nav-container">
          <div className="nav-logo">
            <h1 className="logo">Fresh Cart</h1>
          </div>
          <div className="search-menu">
            <div className="search-container">
              
              <img src={SearchIcon} alt="" className="icon search" />
              
              <input
                className="search-input"
                type="text"
                placeholder="Search..."
                onChange={handleSearch}
                value={searchText}
              />
            </div>

            <div className="menu-container">
              {/* <div className="img"> */}
                <img
                  src={Menu}
                  alt="menu"
                  className="icon"
                />
              {/* </div> */}
              <nav>
                <ul className="">
                  <li>
                    <NavLink to="/">HOME</NavLink>
                  </li>
                  <li>
                    <NavLink to="/products">SHOP NOW</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact">CONTACT</NavLink>
                  </li>
                  {(props.login&&props.user.account_type==2)&&<li>
                    <NavLink to="/admin">ADMIN</NavLink>
                  </li>}
                </ul>
              </nav>
            </div>
            {props.login ? (
              <div>
                <div className="profile-container">
                  <div className="profile">
                    <img
                      src="/images/apple.jpg"
                      alt="Profile"
                      className="profile-picture"
                    />
                    <span className="profile-name">{props.user.name}</span>
                  </div>
                  <div className="profile-dropdown">
                    <Link className="dropdown-item" to='/userProfile'>
                      Edit Account
                    </Link>
                    <Link className="dropdown-item" to='/orders'>
                      Orders
                    </Link>
                    <button className="dropdown-item" onClick={logout}>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="primary-btn">
                <Link to="/signin">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      </header>
      {props.login && (
        <div>
          <img src={Cart} alt="" className="cart" onClick={toggleCart} />
          <div className="cart-container cart-visible">
            <div className="cart-name">
              <h3
                style={{
                  color: "var(--primary-color)",
                  backgroundColor: "var(--secondary-color)",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  padding: "20px",
                }}
              >
                Cart
              </h3>
              <p className="product-price">
                Total : $
                {props.cart.reduce(
                  (a, item) => a + item.price * item.quantity,
                  0
                )}
              </p>
            </div>
            <div className="cart-items">
              {console.log(props.cart)}
              {props.cart.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    removeFromCart={props.removeFromCart}
                  />
                );
              })}
            </div>
            <div className="finalize-buy">
              <form action="" onSubmit={sendToDB}>
                <input
                  type="text"
                  placeholder="TeleBirr:0921431253"
                  pattern="09[0-9]{8}"
                  name="telebirr"
                  required
                />
                <button
                  className="primary-btn"
                  type="submit"
                  style={{ width: "60%" }}
                >
                  Checkout
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default NavBar;

{
  /* <nav>
  <ul>
    <li>
      <NavLink to="/"> Home</NavLink>
    </li>
    <li>
      <NavLink to="/products">Products</NavLink>
    </li>

    <li>
      <NavLink to="/contact">Contact</NavLink>
    </li>
  </ul>
</nav>; */
}

{
  /* <img src={Logo} width={"60px"} style={{ borderRadius: "50%" }} alt="logo" />; */
}
