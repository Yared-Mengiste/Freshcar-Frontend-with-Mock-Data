import React,{useEffect} from "react";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import showObserver from "../animation";
import "./products.css";

const Products = (props) => {
  useEffect(()=>{
    showObserver()
  },[])
  return (
    <section>
      <div className="products-container">
        <div className="category hidden-sec">
          <div className="category-name">
            <h3>Vegetables</h3>
            <Link to="/products/vegetables">Show More {">>"} </Link>
          </div>
          <div className="category-items ">
            {props.vegetables.map((vegetable) => {
              return (
                <Product
                  key={vegetable.id}
                  id={vegetable.id}
                  img={vegetable.img}
                  name={vegetable.name}
                  price={vegetable.price}
                  addToCart={props.addToCart}
                  login={props.login}
                />
              );
            })}
          </div>
        </div>
        <div className="category hidden-sec">
          <div className="category-name">
            <h3>Fruits</h3>
            <Link to="/products/fruits">Show More {">>"} </Link>
          </div>
          <div className="category-items">
            {props.fruits.map((vegetable) => {
              return (
                <Product
                  key={vegetable.id}
                  id={vegetable.id}
                  img={vegetable.img}
                  name={vegetable.name}
                  price={vegetable.price}
                  login={props.login}
                  addToCart={props.addToCart}
                />
              );
            })}
          </div>
        </div>
        <div className="category hidden-sec">
          <div className="category-name">
            <h3>Cereal and Grains</h3>
            <Link to="/products/cereals">Show More {">>"} </Link>
          </div>
          <div className="category-items">
            {props.cereals.map((vegetable) => {
              return (
                <Product
                  key={vegetable.id}
                  id={vegetable.id}
                  img={vegetable.img}
                  name={vegetable.name}
                  price={vegetable.price}
                  login={props.login}
                  addToCart={props.addToCart}
                />
              );
            })}
          </div>
        </div>
        <div className="category hidden-sec">
          <div className="category-name">
            <h3>Animal Products</h3>
            <Link to="/products/animals">Show More {">>"} </Link>
          </div>
          <div className="category-items">
            {props.animals.map((vegetable, index) => {
              return (
                <Product
                  key={vegetable.id}
                  id={vegetable.id}
                  img={vegetable.img}
                  name={vegetable.name}
                  price={vegetable.price}
                  login={props.login}
                  addToCart={props.addToCart}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
