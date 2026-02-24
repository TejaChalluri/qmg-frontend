import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";  // Fixed import path
import "./UserRegister.css";

function UserRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    roleName: "",
    roleNumber: "",
    isActive: true
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Validation
  const validate = () => {
    let newErrors = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    } else if (form.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.roleName.trim()) {
      newErrors.roleName = "Role name is required";
    }

    if (!form.roleNumber) {
      newErrors.roleNumber = "Role number is required";
    } else if (!/^\d+$/.test(form.roleNumber)) {
      newErrors.roleNumber = "Role number must be numeric";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    // Clear general error when user types
    if (errors.general) {
      setErrors({ ...errors, general: "" });
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await registerUser(form);
      console.log("teju",response);
      if (response.success || response.message) {
        // Navigate to login on success
        navigate("/login", { 
          state: { message: "Registration successful! Please login." } 
        });
      }

    } catch (error) {
      setErrors({
        general: error.message || "Registration failed. Please try again."
      });
    }
  };

  return (
    <div className="register-wrapper">
      <div className="bg-pattern">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="register-card">
        <div className="register-header">
          <h2 className="register-title">Create Account</h2>
          <p className="register-subtitle">Join QMG Portal today</p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* GENERAL ERROR */}
          {errors.general && (
            <div className="error-alert">
              {errors.general}
            </div>
          )}

          {/* FIRST NAME & LAST NAME - ROW */}
          <div className="form-row">
            <div className="input-field half">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="John"
                value={form.firstName}
                onChange={handleChange}
                className={errors.firstName ? "error" : ""}
              />
              {errors.firstName && (
                <div className="error-message">{errors.firstName}</div>
              )}
            </div>

            <div className="input-field half">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                value={form.lastName}
                onChange={handleChange}
                className={errors.lastName ? "error" : ""}
              />
              {errors.lastName && (
                <div className="error-message">{errors.lastName}</div>
              )}
            </div>
          </div>

          {/* USERNAME */}
          <div className="input-field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="johndoe123"
              value={form.username}
              onChange={handleChange}
              className={errors.username ? "error" : ""}
            />
            {errors.username && (
              <div className="error-message">{errors.username}</div>
            )}
          </div>

          {/* EMAIL */}
          <div className="input-field">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="john.doe@example.com"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          {/* PASSWORD */}
          <div className="input-field">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
            <span className="input-hint">Minimum 6 characters</span>
          </div>

          {/* ROLE NAME & ROLE NUMBER - ROW */}
          <div className="form-row">
            <div className="input-field half">
              <label>Role Name</label>
              <input
                type="text"
                name="roleName"
                placeholder="Admin / User / Manager"
                value={form.roleName}
                onChange={handleChange}
                className={errors.roleName ? "error" : ""}
              />
              {errors.roleName && (
                <div className="error-message">{errors.roleName}</div>
              )}
            </div>

            <div className="input-field half">
              <label>Role Number</label>
              <input
                type="text"
                name="roleNumber"
                placeholder="1, 2, 3..."
                value={form.roleNumber}
                onChange={handleChange}
                className={errors.roleNumber ? "error" : ""}
              />
              {errors.roleNumber && (
                <div className="error-message">{errors.roleNumber}</div>
              )}
            </div>
          </div>

          {/* IS ACTIVE - Checkbox */}
          <div className="checkbox-field">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
              />
              <span className="checkbox-text">Active Account</span>
            </label>
            <span className="input-hint">Account will be active immediately</span>
          </div>

          {/* SUBMIT BUTTON */}
          <button type="submit" className="register-btn">
            Create Account
          </button>

          {/* LOGIN LINK */}
          <p className="login-prompt">
            Already have an account? 
            <button 
              type="button" 
              className="login-link"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default UserRegister;