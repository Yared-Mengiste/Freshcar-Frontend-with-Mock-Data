import React, { useState, useEffect } from "react";
import axios from "axios";
import "./delivery.css";

const UserOrders = (props) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost/fresh-cart/api.php?action=get_user_orders&user_id=${props.userId}`
        );
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders. Please try again.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [props.userId]);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <section>
      <div className="user-orders">
        <h2>Your Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Driver Name</th>
              <th>Driver Phone</th>
              <th>Shop Name</th>
              <th>Total Price</th>
              <th>Ordered At</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.driver_name}</td>
                <td>{order.driver_phone}</td>
                <td>{order.shop_name}</td>
                <td>{order.total_price}</td>
                <td>{order.ordered_at}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UserOrders;
