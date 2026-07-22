import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import toast from "react-hot-toast";

import InputField from "../components/InputField";
import Loader from "../components/Loader";
import { registerUser } from "../services/authAPI";

import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.username ||
      !form.email ||
      !form.password
    ) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const data = await registerUser(form);

      toast.success(data.message);

      localStorage.setItem("email", form.email);

      setTimeout(() => {
        navigate("/verify");
      }, 1200);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <h1>Secure Authentication</h1>

        <p>Create your account</p>

        <form onSubmit={handleSubmit}>

          <InputField
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            icon={<FaUser />}
          />

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
              className="register-btn"
              type="submit"
            >
              Create Account
            </button>
          )}

        </form>

        <p className="bottom-text">
          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;