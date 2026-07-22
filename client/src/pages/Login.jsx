import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import toast from "react-hot-toast";

import InputField from "../components/InputField";
import Loader from "../components/Loader";
import { loginUser } from "../services/authAPI";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const data = await loginUser(form);

      toast.success(data.message);

      // Save Access Token
      localStorage.setItem("token", data.accessToken);

      // Save User
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Welcome Back</h1>

        <p>Login to continue</p>

        <form onSubmit={handleLogin}>

          <InputField
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            icon={<FaEnvelope />}
          />

          <InputField
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            icon={<FaLock />}
          />

          {loading ? (
            <Loader />
          ) : (
            <button
              type="submit"
              className="login-btn"
            >
              Login
            </button>
          )}

        </form>

        <p className="bottom-text">

          Don't have an account?

          <Link to="/register">
            Register
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;