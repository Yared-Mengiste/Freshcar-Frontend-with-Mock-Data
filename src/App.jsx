import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import AccountForm from "./pages/AccountForm";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import Category from "./pages/Category";
import ContactForm from "./pages/ContactForm";
import UserProfile from "./pages/UserProfile";
import Delivery from "./pages/Delivery"
import Admin from "./pages/Admin";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setLoggedIn] = useState({});
  const [products, setProducts] = useState(null);
  const [fruits, setFruits] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [cereals, setCereals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost/fresh-cart/api.php?action=get_products"
        );
        setProducts(response.data);
        setFruits(
          response.data.filter((product) => product.category == 2)
        );
        setVegetables(
          response.data.filter((product) => product.category == 1)
        );
        setAnimals(
          response.data.filter((product) => product.category == 4)
        );
        setCereals(
          response.data.filter((product) => product.category == 3)
        );
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    const userInfo = sessionStorage.getItem("user");
    const cartInfo = sessionStorage.getItem("cart");
    console.log(cartInfo);
    console.log(userInfo);
    if (userInfo === null) {
      setLoggedIn({});
    } else {
      setLoggedIn(JSON.parse(userInfo));
      if (cartInfo) {
        setCart(JSON.parse(cartInfo));
      }
    }

    fetchProducts();
  }, []);
  useEffect(() => {
    if (search.trim().length > 0) {
      navigate("/products/search");
    }else{
      navigate("/products");
    }
  }, [search]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const exist = prevCart.findIndex((item) => item.id === product.id);
      let temp = [];
      if (exist === -1) {
        temp = [...prevCart, product];
        return [...prevCart, product];
      } else {
        temp = prevCart;
      }
      return temp;
    });
  };
  const updateSession = () => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
    sessionStorage.setItem("user", JSON.stringify(user));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };
  const clearCart = () => {
    setCart([]);
  };
  function userLogout() {
    setLoggedIn({});
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("cart");
  }

  function userLoggedIn(userInfo) {
    setLoggedIn(userInfo);
    console.log("signIn:", userInfo);
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {updateSession()}
      <NavBar
        login={Object.keys(user).length === 0 ? false : true}
        removeFromCart={removeFromCart}
        cart={cart}
        userId={user.id}
        clearCart={clearCart}
        user={user}
        onLogout={userLogout}
        setSearch={setSearch}
        search={search}
      />
      <div>
        <Routes>
          <Route
            index
            path="/"
            element={
              <Home login={Object.keys(user).length === 0 ? false : true} />
            }
          />
          <Route
            path="/products"
            element={
              <Products
                fruits={fruits.slice(0, 4)}
                vegetables={vegetables.slice(0, 4)}
                cereals={cereals.slice(0, 4)}
                animals={animals.slice(0, 4)}
                addToCart={addToCart}
                login={Object.keys(user).length === 0 ? false : true}
              />
            }
          />
          <Route path="/contact" element={<ContactForm />} />
          <Route
            path="/products/fruits"
            element={
              <Category
                products={fruits}
                title="Fruits"
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/products/vegetables"
            element={
              <Category
                products={vegetables}
                title="Vegetables"
                login={Object.keys(user).length === 0 ? false : true}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/products/animals"
            element={
              <Category
                products={animals}
                title="Animal Products"
                login={Object.keys(user).length === 0 ? false : true}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/products/cereals"
            element={
              <Category
                products={cereals}
                title="Cereals and Grains"
                login={Object.keys(user).length === 0 ? false : true}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/products/search"
            element={
              <Category
                products={products.filter((product) =>
                  product.name.includes(search.toLowerCase())
                )}
                title="Search"
                login={Object.keys(user).length === 0 ? false : true}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/signin"
            element={<AccountForm onSignIn={userLoggedIn} />}
          />
          <Route
            path="/userProfile"
            element={
              <UserProfile
                user={user}
                setUserData={setLoggedIn}
                userLogout={userLogout}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <Admin products={products} setProducts={setProducts}/>
            }
          />
          <Route
            path="/orders"
            element={
              <Delivery userId={user.id}/>
            }
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        <Footer login={Object.keys(user).length === 0 ? false : true}/>
      </div>
    </div>
  );
}

export default App;
