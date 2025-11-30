import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/signup", form);
      alert(response.data.message);
      console.log("signup Successfully:", response.data);

      setForm({ name: "", email: "", password: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Create Account</h3>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            type="text"
            name="name"
            placeholder="Enter Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary w-100" type="submit">
            Sign Up
          </button>
          <p className="text-center mt-3">
            Already have an Account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
