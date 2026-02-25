import { useState, useContext } from "react";
import { verifyOtp } from "../../services/authService";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Otp.css";

function Otp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { usernameOrEmail, password } = location.state || {};

  const handleVerify = async () => {

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be exactly 6 digits.");
      return;
    }

    try {
      const response = await verifyOtp(
        usernameOrEmail,
        password,
        otp
      );

      // ✅ Navigate only if token exists
      if (response.token) {
        login(response.token);
        navigate("/dashboard", { replace: true });
      }

    } catch (error) {
      // ❌ Stay on OTP page
      setError(error.message);
    }
  };

  return (
    <div className="otp-wrapper">
      <div className="bg-pattern">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="otp-card">
        <button
    className="back-btn"
    onClick={() => navigate("/login")}
  >
    ← Login
  </button>
        <h2 className="otp-title">Verify Your Identity</h2>
        <p className="otp-subtitle">
          We've sent a verification code to your account
        </p>
        <div className="user-info">
          <span className="user-label">Account</span>
          <span className="user-email">{usernameOrEmail}</span>
        </div>

        <div className="otp-field">
          <label>Enter OTP</label>
          <div className="otp-input-wrapper">
            <input
              type="tel"
              placeholder="000000"
              value={otp}
              maxLength={6}
              inputMode="numeric"
              autoComplete="one-time-code"
              className={error ? "error" : ""}

              onKeyDown={(e) => {
                if (
                  e.ctrlKey ||
                  e.metaKey ||
                  e.key === "Backspace" ||
                  e.key === "Delete" ||
                  e.key === "ArrowLeft" ||
                  e.key === "ArrowRight" ||
                  e.key === "Tab"
                ) {
                  return;
                }

                if (!/^\d$/.test(e.key)) {
                  e.preventDefault();
                }
              }}

              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, "").slice(0, 6);
                setOtp(numericValue);
                setError("");
              }}

              onPaste={(e) => {
                e.preventDefault();
                const pastedData = e.clipboardData.getData("Text");
                const numericValue = pastedData.replace(/\D/g, "").slice(0, 6);
                setOtp(numericValue);
                setError("");
              }}
            />
            {otp.length > 0 && (
              <span className="otp-counter">{otp.length}/6</span>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}
        </div>

        <button className="verify-btn" onClick={handleVerify}>
          Verify & Continue
        </button>

        <p className="resend-hint">
          Didn't receive the code? Check your inbox or spam folder
        </p>
      </div>
    </div>
  );
}

export default Otp;