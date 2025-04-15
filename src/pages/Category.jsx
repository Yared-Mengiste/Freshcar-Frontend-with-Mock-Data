import React,{useEffect} from "react";
import Product from "../components/Product";
import "./category.css";
import showObserver from "../animation";

const Category = (props) => {
  useEffect(()=>{
    showObserver()
  },[])
  return (
    <section>
      <h2 id="category-name">{props.title}</h2>
      <div className="category-products">
        {props.products.map((product) => {
          return (
            <div className="hidden-sec">
              <Product
                key={product.id}
                id={product.id}
                img={product.img}
                name={product.name}
                price={product.price}
                login={props.login}
                addToCart={props.addToCart}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Category;
