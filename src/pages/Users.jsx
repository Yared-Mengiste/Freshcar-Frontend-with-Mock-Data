import React, { useState, useEffect } from "react";
import axios from "axios";
import md5 from 'blueimp-md5';
import "./admin.css";
import "./home.css";
import "./category.css";

const Users = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(null);
  const [findUser, userSearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost/fresh-cart/api.php?action=get_users`
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders. Please try again.");
        setLoading(false);
      }
    };
    if (!users) {
      fetchOrders();
    }
    if (users) {
      userSearch(users.filter((user) => user.email.includes(search)));
    }
  }, [search, users]);
  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }
  const updatePassword = async (e) => {
    e.preventDefault();
    const form = e.target;
  const userId = e.target.id; 
  const newPassword = md5(form.password.value); 

  if (!newPassword || newPassword.length < 4) {
    alert("Password must be at least 4 characters.");
    return;
  }

  try {
    const response = await axios.put(
      `http://localhost/fresh-cart/api.php?action=update_password`,
      {
        user_id: userId,
        new_password: newPassword,
      }
    );

    if (response.data.message === "Password updated successfully") {
      alert("Password updated successfully!");
      form.reset();
    } else {
      alert("Failed to update password. Please try again.");
    }
  } catch (error) {
    console.error("Error updating password:", error);
    alert("An error occurred. Please try again.");
  }

  };

  return (
    <section >
      <div className="user-orders">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <h2>Users</h2>
          <input
            style={{ alignSelf: "center" }}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search..."
          />
        </div>
        <table >
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Sub-city</th>
              <th>Account Type</th>
              <th>Update Password</th>
            </tr>
          </thead>
          <tbody>
            {findUser.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.city}</td>
                <td>{user.address}</td>
                <td>{user.account_type}</td>
                <td>
                  <form id={user.id} onSubmit={updatePassword}>
                    <input type="text" name="password" />
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Users;
