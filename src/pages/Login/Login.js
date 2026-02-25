import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({
    usernameOrEmail: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};

    if (!form.usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = "Username or Email is required";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await loginUser(
        form.usernameOrEmail,
        form.password
      );
     

      // ✅ Navigate only if success
      if (response.message === "OTP sent successfully") {
        navigate("/otp", { state: form });
      }

    } catch (error) {
      // ❌ Stay on login page
      setErrors({
        general: error.message
      });
    }
  };

  return (
    <div className="login-wrapper">
      <div className="bg-pattern">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="login-card">
      <button
    className="back-btn"
    onClick={() => navigate("/")}
  >
    ← Welcome
  </button>
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Login to continue</p>

        <form onSubmit={handleSubmit}>

          {/* GENERAL ERROR */}
          {errors.general && (
            <div className="error-alert">
              {errors.general}
            </div>
          )}

          {/* USERNAME FIELD */}
          <div className="input-field">
            <label>Username or Email</label>
            <input
              type="text"
              placeholder="Enter your username or email"
              className={errors.usernameOrEmail ? "error" : ""}
              value={form.usernameOrEmail}
              onChange={(e) => {
                setForm({ ...form, usernameOrEmail: e.target.value });
                setErrors({ ...errors, usernameOrEmail: "", general: "" });
              }}
            />
            {errors.usernameOrEmail && (
              <div className="error-message">
                {errors.usernameOrEmail}
              </div>
            )}
          </div>

          {/* PASSWORD FIELD */}
          <div className="input-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className={errors.password ? "error" : ""}
              value={form.password}
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
                setErrors({ ...errors, password: "", general: "" });
              }}
            />
            {errors.password && (
              <div className="error-message">
                {errors.password}
              </div>
            )}
          </div>

          <button className="login-btn" type="submit">
            Sign In
          </button>

        </form>
        <p className="login-hint">
          New user? <button className="login-link" onClick={() => navigate("/UserRegister")}>Create an account</button>
        </p>
      </div>
    </div>
  );
}

export default Login;