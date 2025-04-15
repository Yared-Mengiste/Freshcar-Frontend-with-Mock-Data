import { useState } from "react";
import axios from "axios";
import md5 from "blueimp-md5";
import { useNavigate } from "react-router-dom";
import "./userProfile.css";

const UserProfile = (props) => {
  const [userData, setUserData] = useState({
    ...props.user,
    confirmPassword: props.user.password,
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password.length < 4) {
      setMessage("Password must be at least 4 characters.");
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost/fresh-cart/api.php?action=update_profile`,
        {
          id: userData.id, 
          name: userData.name,
          password: md5(userData.password),
          city: userData.city,
          address: userData.address,
          phone: userData.phone,
        }
      );

      if (response.data.message === "Profile updated successfully") {
        setMessage("Profile updated successfully!");
        props.setUserData({
          ...props.user,
          id: userData.id,
          name: userData.name,
          password: userData.password,
          city: userData.city,
          address: userData.address,
          phone: userData.phone,
        });
      } else {
        setMessage("Failed to update profile. Please try again.");
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        const response = await axios.delete(
          `http://localhost/fresh-cart/api.php?action=delete_account`,
          {
            data: { id: userData.id }, 
          }
        );

        if (response.data.message === "Account deleted successfully") {
          alert(response.data.message);
          props.userLogout();
          navigate("/");
        } else {
          setMessage("Failed to delete account. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <section className="edit-profile">
      <div className="profile-contain">
        <h2>Edit Profile</h2>
        {message && <p className="message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
          <label>
                Phone:
                <input
                  type="text"
                  name="phone"
                  pattern="09[0-9]{8}"
                  value={userData.phone}
                  onChange={handleChange}
                  required
                />
              </label>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Enter new password"
            minLength={4}
          />
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            minLength={4}
          />

          <label>City:</label>
          <input
            type="text"
            name="city"
            value={userData.city}
            onChange={handleChange}
            required
          />

          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleChange}
            required
          />

          <button type="submit" className="primary-btn">
            Save Changes
          </button>
        </form>

        <button onClick={handleDelete} className="secondary-btn">
          Delete Account
        </button>
      </div>
    </section>
  );
};

export default UserProfile;
