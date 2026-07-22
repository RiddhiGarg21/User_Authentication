import { useRef } from "react";
import "./OTPInput.css";

const OTPInput = ({ otp, setOtp }) => {
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      otp[index] === "" &&
      index > 0
    ) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasteData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasteData) return;

    const newOtp = [...otp];

    pasteData.split("").forEach((digit, i) => {
      newOtp[i] = digit;
    });

    setOtp(newOtp);

    const nextIndex = Math.min(pasteData.length, 5);
    inputs.current[nextIndex].focus();
  };

  return (
    <div className="otp-container" onPaste={handlePaste}>
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputs.current[index] = el)}
          className="otp-input"
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) =>
            handleChange(e.target.value, index)
          }
          onKeyDown={(e) =>
            handleKeyDown(e, index)
          }
        />
      ))}
    </div>
  );
};

export default OTPInput;