import { Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyOTP from "./pages/VerifyOTP";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>

      {/* Default Route */}
      <Route path="/" element={<Navigate to="/register" replace />} />

      {/* Authentication Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<VerifyOTP />} />
      <Route path="/login" element={<Login />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Invalid Route */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />

    </Routes>
  );
}

export default App;