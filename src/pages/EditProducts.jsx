import React from "react";
import axios from "axios";
import "../components/product.css";


const EditProducts = (props) => {
  const [newPrice, setNewPrice] = React.useState("");
  const updatePrice = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost/fresh-cart/api.php?action=update_product_price`,
        {
          product_id: props.id,
          new_price: newPrice,
        }
      );

      if (response.data.message === "Price updated successfully") {
        // let item = props.products.find(product=>product.id === props.id);
        // item.price = newPrice;
        // props.setProduct(props.products.filter(product=>product.id !== props.id))
        // props.setProduct([...props.products, item])
        let updatedProducts = props.products.map((product) =>
          product.id === props.id ? { ...product, price: newPrice } : product
        );
        props.setProducts(updatedProducts);
        alert('Updated')
        setNewPrice("");
      } else {
        console.log("Failed to update");
      }
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };
  return (
    <div className="relation-container">
      <div className="product-card">
        <img
          src={`/images/${props.img}`}
          alt={props.name}
          className="product-image"
        />
        <div className="description">
          <div>
            <h3 className="product-name">{props.name}</h3>
            <p className="product-price">${props.price} / kg</p>
          </div>
          <div>
            <div>
              <form action="" onSubmit={updatePrice}>
                <input
                  style={{ width: "70%", alignSelf: "flex-end" }}
                  type="number"
                  min="0"
                  step={0.05}
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="new price"
                  required
                />
                <button type="submit" className="primary-btn">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProducts;
