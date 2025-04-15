import { useState, useEffect } from "react";
import axios from "axios";
import showObserver from "../animation";
import "./home.css";
import "./contactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  useEffect(()=>{
    showObserver()
  },[])

  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setErrors("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost/fresh-cart/api.php?action=submit_contact",
        formData
      );

      if (response.data.message === "Form submitted successfully") {
        alert("Form submitted successfully!");
        setFormData({ name: "", email: "", message: "" }); 
        setErrors(""); 
      } else {
        setErrors("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors("An error occurred. Please try again.");
    }
  };

  return (
    <div className="form-container hidden-sec">
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>Contact Us</h2>

        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          {errors && <small className="error">{errors}</small>}
        </div>
        <button type="submit" className="primary-btn">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
