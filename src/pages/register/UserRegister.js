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
    roleName: "Admin",  // Default to Admin
    roleNumber: "1",    // Default to 1
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

    // EMAIL VALIDATION - Only Gmail allowed
  if (!form.email.trim()) {
    newErrors.email = "Email is required";
  } else {
    const email = form.email.toLowerCase().trim();
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    
    if (!gmailRegex.test(email)) {
      newErrors.email = "Only Gmail addresses are allowed (example@gmail.com)";
    }
  }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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

  // Handle role selection from dropdown
  const handleRoleSelect = (roleName, roleNumber) => {
    setForm({
      ...form,
      roleName: roleName,
      roleNumber: roleNumber
    });
    setIsDropdownOpen(false);
    // Clear any role-related errors
    if (errors.roleName || errors.roleNumber) {
      setErrors({ ...errors, roleName: "", roleNumber: "" });
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await registerUser(form);
      
      // Check if registration was successful
      // The backend might return success flag or just status code
      if (response && (response.success === true || response.message?.includes("success"))) {
        // Navigate to login on success
        navigate("/login", { 
          state: { message: "Registration successful! Please login." } 
        });
      } else {
        // If we got a response but it's not clearly successful, show error
        setErrors({
          general: response.message || "Registration failed. Please try again."
        });
      }

    } catch (error) {
      // This will catch any network errors or thrown errors from the API
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
        <button
          className="back-btn"
          onClick={() => navigate("/login")}
        >
          ← Login
        </button>
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
              type="text"
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
                autoComplete="new-password"
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <i className={showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
              </span>
            </div>
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

{/* ROLE DROPDOWN WITH RADIO BUTTONS */}
          <div className="input-field">
            <label>Role</label>
            <div className="role-dropdown-container">
              <div 
                className={`role-dropdown-selected ${isDropdownOpen ? 'active' : ''}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="selected-role">{form.roleName}</span>
                <div className="selected-right">
                  <span className="selected-role-number">role {form.roleNumber}</span>
                  <span className="dropdown-chevron">{isDropdownOpen ? '▲' : '▼'}</span>
                </div>
              </div>
              
              {isDropdownOpen && (
                <div className="role-dropdown-menu">
                  <div 
                    className={`role-option ${form.roleName === 'Admin' ? 'selected' : ''}`}
                    onClick={() => handleRoleSelect('Admin', '1')}
                  >
                    <div className="option-content">
                      <div className="radio-wrapper">
                        <input
                          type="radio"
                          name="role"
                          value="Admin"
                          checked={form.roleName === 'Admin'}
                          onChange={() => {}}
                        />
                      </div>
                      <span className="role-text">Admin</span>
                      <div className="number-wrapper">
                        <span className="role-number">1</span>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className={`role-option ${form.roleName === 'User' ? 'selected' : ''}`}
                    onClick={() => handleRoleSelect('User', '0')}
                  >
                    <div className="option-content">
                      <div className="radio-wrapper">
                        <input
                          type="radio"
                          name="role"
                          value="User"
                          checked={form.roleName === 'User'}
                          onChange={() => {}}
                        />
                      </div>
                      <span className="role-text">User</span>
                      <div className="number-wrapper">
                        <span className="role-number">0</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
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