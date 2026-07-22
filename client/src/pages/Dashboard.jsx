import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaSyncAlt,
  FaGlobe
} from "react-icons/fa";

import toast from "react-hot-toast";

import {
  getProfile,
  logout,
  logoutAll,
  refreshToken,
} from "../services/authAPI";

import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile(token);

      setUser(data.user);
    } catch (err) {
      toast.error("Session expired");
      navigate("/login");
    }
  };

  const handleRefresh = async () => {
    try {
      const data = await refreshToken();

      localStorage.setItem("token", data.accessToken);

      toast.success("Access Token Refreshed");
    } catch {
      toast.error("Refresh Failed");
    }
  };

  const handleLogout = async () => {
    await logout();

    localStorage.clear();

    toast.success("Logged Out");

    navigate("/login");
  };

  const handleLogoutAll = async () => {
    await logoutAll();

    localStorage.clear();

    toast.success("Logged Out From All Devices");

    navigate("/login");
  };

  return (
    <div className="dashboard">

      <div className="dashboard-card">

        <FaUserCircle className="profile-icon" />

        <h1>Dashboard</h1>

        {user && (
          <>
            <div className="info">

              <h3>Username</h3>

              <p>{user.username}</p>

            </div>

            <div className="info">

              <h3>Email</h3>

              <p>{user.email}</p>

            </div>
          </>
        )}

        <button
          onClick={handleRefresh}
          className="blue"
        >
          <FaSyncAlt />

          Refresh Token

        </button>

        <button
          onClick={handleLogout}
          className="red"
        >
          <FaSignOutAlt />

          Logout

        </button>

        <button
          onClick={handleLogoutAll}
          className="purple"
        >
          <FaGlobe />

          Logout All Devices

        </button>

      </div>

    </div>
  );
};

export default Dashboard;