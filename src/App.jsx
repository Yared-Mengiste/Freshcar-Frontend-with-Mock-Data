import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import AccountForm from "./pages/AccountForm";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import Category from "./pages/Category";
import ContactForm from "./pages/ContactForm";
import UserProfile from "./pages/UserProfile";
import Delivery from "./pages/Delivery";
import Admin from "./pages/Admin";

import data from "../src/json/data.json";
import { useCart } from "./context/CartProvider";
import { useUser } from "./context/UserContext";

function App() {
  const { cart, addToCart, removeFromCart, clearCart, setCart } = useCart();
  const { user, login, logout } = useUser();

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const allProducts = data.tables.products;
    setProducts(allProducts);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (search.trim().length > 0) {
      navigate("/products/search");
    } else {
      navigate("/products");
    }
  }, [search]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <NavBar
        login={!!user.id}
        removeFromCart={removeFromCart}
        cart={cart}
        userId={user.id}
        clearCart={clearCart}
        user={user}
        onLogout={logout}
        setSearch={setSearch}
        search={search}
      />
      <div>
        <Routes>
          <Route index path="/" element={<Home login={!!user.id} />} />
          <Route
            path="/products"
            element={<Products addToCart={addToCart} login={!!user.id} />}
          />
          <Route path="/contact" element={<ContactForm />} />
          <Route
            path="/products/:type"
            element={
              <Category
                allProducts={products}
                login={!!user.id}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/products/search"
            element={
              <Category
                searchProducts={products.filter((p) =>
                  p.name.toLowerCase().includes(search.toLowerCase())
                )}
                title="Search"
                login={!!user.id}
                addToCart={addToCart}
              />
            }
          />
          <Route path="/signin" element={<AccountForm />} />
          <Route
            path="/userProfile"
            element={
              <UserProfile
                user={user}
                setUserData={login}
                userLogout={logout}
              />
            }
          />
          <Route
            path="/admin"
            element={<Admin products={products} setProducts={setProducts} />}
          />
          <Route path="/orders" element={<Delivery userId={user.id} />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>

        <Footer login={!!user.id} />
      </div>
    </div>
  );
}

export default App;
