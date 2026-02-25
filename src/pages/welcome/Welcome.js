import { useNavigate } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-wrapper">
      <div className="bg-pattern">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="welcome-card">
        <div className="brand-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#2d3a5e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="#2d3a5e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="#2d3a5e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h1 className="welcome-title">
          Welcome to 
          <span className="title-highlight"> QMG Portal</span>
        </h1>
        
        <p className="welcome-subtitle">
          Your secure gateway to professional dashboard experience
        </p>

        <div className="feature-badges">
          <span className="badge">🔒 Secure Access</span>
          <span className="badge">⚡ Fast Performance</span>
          <span className="badge">📊 Real-time Data</span>
        </div>

        <button
          className="get-started-btn"
          onClick={() => navigate("/login")}
        >
          <span>Get Started</span>
          <svg className="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <p className="login-hint">
          New user? <button className="login-link" onClick={() => navigate("/UserRegister")}>Create an account</button>
        </p>
      </div>
    </div>
  );
}

export default Welcome;