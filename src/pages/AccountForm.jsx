import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import md5 from "blueimp-md5";
import showObserver from "../animation";
import axios from "axios";
import "./home.css";

const AccountForm = (props) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    phone: "",
  });
  useEffect(()=>{
    showObserver()
  },[])
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSignIn) {
      if (
        !formData.password.trim() ||
        !formData.confirmPassword.trim() ||
        !formData.name.trim() ||
        !formData.city.trim() ||
        !formData.address.trim()
      ) {
        setMessage("All fields are required.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setMessage("Passwords do not match.");
        return;
      }
    }

    const password = formData.password;
    const hashedPassword = md5(password);

    const dataToSend = {
      ...formData,
      password: hashedPassword,
    };

    try {
      const response = await axios.post(
        `http://localhost/fresh-cart/api.php?action=${
          isSignIn ? "signin" : "signup"
        }`,
        dataToSend
      );

      if (response.data.message === "Sign-in successful") {
        console.log("User data:", response.data.user);
        props.onSignIn({ ...response.data.user, password: password });
        navigate("/");
      } else if (response.data.message === "Sign-up successful") {
        setMessage("Sign-up successful! Please log in.");
        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
          confirmPassword: "",
          address: "",
          city: "",
        });
      } else {
        setMessage(
          response.data.message ||
            response.data.error ||
            "Form submitted successfully!"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <div className="wrappouter hidden-sec">
      <div className="signin">
        <div className="button-group">
          <button
            type="button"
            className={`signin-btn ${isSignIn ? "active" : "inactive"}`}
            onClick={() => setIsSignIn(true)}
          >
            <p>Sign In</p>
          </button>
          <h1>|</h1>
          <button
            type="button"
            className={`signin-btn ${!isSignIn ? "active" : "inactive"}`}
            onClick={() => setIsSignIn(false)}
          >
            <p>Sign Up</p>
          </button>
        </div>

        <div className="belowbutton">
          {isSignIn ? (
            <form className="sign-in-form" onSubmit={handleSubmit}>
              {message && (
                <p
                  className="message"
                  style={{ color: "var(--primary-color)" }}
                >
                  {message}
                </p>
              )}
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button className="secondary-btn" type="submit">
                <p>Sign In</p>
              </button>
            </form>
          ) : (
            <form className="sign-up-form" onSubmit={handleSubmit}>
              {message && (
                <p
                  className="message"
                  style={{ color: "var(--primary-color)" }}
                >
                  {message}
                </p>
              )}
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Phone:
                <input
                  type="text"
                  name="phone"
                  pattern="09[0-9]{8}"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Confirm Password:
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                City:
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select City</option>
                  <option value="Addis Ababa">Addis Ababa</option>
                </select>
              </label>
              <label>
                Subcity:
                <select
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Subcity</option>
                  <option value="Addis Ketema">Addis Ketema</option>
                  <option value="Akaky Kaliti">Akaky Kaliti</option>
                  <option value="Arada">Arada</option>
                  <option value="Bole">Bole</option>
                  <option value="Gullele">Gullele</option>
                  <option value="Kirkos">Kirkos</option>
                  <option value="Kolfe Keranio">Kolfe Keranio</option>
                  <option value="Lideta">Lideta</option>
                  <option value="Nifas Silk-Lafto">Nifas Silk-Lafto</option>
                  <option value="Yeka">Yeka</option>
                </select>
              </label>
              <button className="secondary-btn" type="submit">
                <p>Sign Up</p>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountForm;

// import { useState } from "react";
// import "./home.css";

// const AccountForm = () => {
//   const [isSignIn, setIsSignIn] = useState(true);

//   return (
//     <div className="wrappouter">
//       <div className="signin">
//         <div className="button-group">
//           <button
//             type="button"
//             className={`signin-btn ${isSignIn ? "active" : "inactive"}`}
//             onClick={() => setIsSignIn(true)}
//           >
//             <p>Sign In</p>
//           </button>
//           <h1>|</h1>
//           <button
//             type="button"
//             className={`signin-btn ${!isSignIn ? "active" : "inactive"}`}
//             onClick={() => setIsSignIn(false)}
//           >
//             <p>Sign Up</p>
//           </button>
//         </div>

//         <div className="belowbutton">
//           {isSignIn ? (
//             <form className="sign-in-form">
//               <label>
//                 Email:
//                 <input type="email" name="email" required />
//               </label>
//               <label>
//                 Password:
//                 <input type="password" name="password" required />
//               </label>
//               <button className="secondary-btn" type="submit">
//                 <p>Sign In</p>
//               </button>
//             </form>
//           ) : (
//             <form className="sign-up-form">
//               <label>
//                 Name:
//                 <input type="email" name="name" required />
//               </label>
//               <label>
//                 Email:
//                 <input type="email" name="email" required />
//               </label>
//               <label>
//                 Password:
//                 <input type="password" name="password" required />
//               </label>
//               <label>
//                 Confirm Password:
//                 <input type="password" name="confirmPassword" required />
//               </label>
//               <label>
//                 Address:
//                 <input type="text" name="address" required/>
//               </label>
//               <label>
//                 City:
//                 <input type="text" name="city" required />
//               </label>
//               <button className="secondary-btn" type="submit">
//                 <p>Sign Up</p>
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountForm;
