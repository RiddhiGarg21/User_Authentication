import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import toast from "react-hot-toast";

import OTPInput from "../components/OTPInput";
import Loader from "../components/Loader";
import { verifyOTP } from "../services/authAPI";

import "./VerifyOTP.css";

const VerifyOTP = () => {
  const navigate = useNavigate();

  const email = localStorage.getItem("email") || "";

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      return toast.error("Enter all 6 digits");
    }

    try {
      setLoading(true);

      const data = await verifyOTP(email, otpCode);

      toast.success(data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-page">

      <div className="verify-card">

        <div className="verify-icon">
          <MdEmail />
        </div>

        <h1>Verify Your Email</h1>

        <p>
          Enter the 6-digit OTP sent to
        </p>

        <h3>{email}</h3>

        <OTPInput
          otp={otp}
          setOtp={setOtp}
        />

        {loading ? (
          <Loader />
        ) : (
          <button
            className="verify-btn"
            onClick={handleVerify}
          >
            Verify OTP
          </button>
        )}

      </div>

    </div>
  );
};

export default VerifyOTP;