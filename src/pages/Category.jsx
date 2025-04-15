import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import Product from "../components/Product";
import "./category.css";
import showObserver from "../animation";
import data from "../json/data.json";


const CATEGORY_MAP = {
  fruits: { id: 2, title: "Fruits" },
  vegetables: { id: 1, title: "Vegetables" },
  cereals: { id: 3, title: "Cereals and Grains" },
  animals: { id: 4, title: "Animal Products" },
};

const Category = ({ searchProducts, login, addToCart }) => {
  const { type } = useParams();
  const allProducts = searchProducts || data.tables.products;


  const { id: categoryId, title } = CATEGORY_MAP[type] || {};
  console.log(categoryId, title);

  const products = useMemo(() => {
    if (searchProducts) return searchProducts;
  
    if (!categoryId) return [];
    return allProducts.filter((p) => p.category === categoryId);
  }, [searchProducts, categoryId, allProducts]);
  
  useEffect(() => {
    showObserver();
  }, []);

  if (!CATEGORY_MAP[type] && !searchProducts) return <h1>Category Not Found</h1>;

  return (
    <section>
      <h2 id="category-name">{searchProducts? 'Search': title}</h2>
      <div className="category-products">
        {products.map((product) => (
          <div className="hidden-sec" key={product.id}>
            <Product
              id={product.id}
              img={product.img}
              name={product.name}
              price={product.price}
              login={login}
              addToCart={addToCart}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;
