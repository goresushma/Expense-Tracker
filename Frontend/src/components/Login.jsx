import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  //to handle check
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  //for submition
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("auth/login", form);

      //alert("Login Successful");
      localStorage.setItem("token", response.data.token);
      setForm({ email: "", password: "" });

      alert("Login Successful 🎉");

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Login</h3>

        <form onSubmit={handleSubmit}>
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

          <button className="btn btn-success w-100" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
