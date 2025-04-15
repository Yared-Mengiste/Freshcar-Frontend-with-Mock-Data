import React, { useEffect } from "react";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import showObserver from "../animation";
import "./products.css";
import data from "../json/data.json"; // 👈 Import product data

const Products = ({ login, addToCart }) => {
  useEffect(() => {
    showObserver();
  }, []);

  const products = data.tables.products;

  const vegetables = products.filter((p) => p.category === 1).slice(0, 4);
  const fruits = products.filter((p) => p.category === 2).slice(0, 4);
  const cereals = products.filter((p) => p.category === 3).slice(0, 4);
  const animals = products.filter((p) => p.category === 4).slice(0, 4);

  return (
    <section>
      <div className="products-container">
        {/* VEGETABLES */}
        <div className="category hidden-sec">
          <div className="category-name">
            <h3>Vegetables</h3>
            <Link to="/products/vegetables">Show More {">>"}</Link>
          </div>
          <div className="category-items">
            {vegetables.map((item) => (
              <Product
                key={item.id}
                {...item}
                login={login}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>

        {/* FRUITS */}
        <div className="category hidden-sec">
          <div className="category-name">
            <h3>Fruits</h3>
            <Link to="/products/fruits">Show More {">>"}</Link>
          </div>
          <div className="category-items">
            {fruits.map((item) => (
              <Product
                key={item.id}
                {...item}
                login={login}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>

        {/* CEREALS */}
        <div className="category hidden-sec">
          <div className="category-name">
            <h3>Cereals and Grains</h3>
            <Link to="/products/cereals">Show More {">>"}</Link>
          </div>
          <div className="category-items">
            {cereals.map((item) => (
              <Product
                key={item.id}
                {...item}
                login={login}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>

        {/* ANIMAL PRODUCTS */}
        <div className="category hidden-sec">
          <div className="category-name">
            <h3>Animal Products</h3>
            <Link to="/products/animals">Show More {">>"}</Link>
          </div>
          <div className="category-items">
            {animals.map((item) => (
              <Product
                key={item.id}
                {...item}
                login={login}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
