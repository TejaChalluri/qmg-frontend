import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./ProfilePanel.css";

const ProfilePanel = ({ close }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="profile-panel">
      <div className="profile-header">
        <h3>Profile</h3>
        <button onClick={close}>✖</button>
      </div>

      <div className="profile-body">
        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
          className="profile-img-large"
        />

        <p><strong>First Name:</strong> {user?.firstname || "Teja"}</p>
        <p><strong>Last Name:</strong> {user?.lastname || "Challuri"}</p>
        <p><strong>Username:</strong> {user?.username || "admin"}</p>
        <p><strong>Email:</strong> {user?.email || "admin@email.com"}</p>
        <p><strong>Role:</strong> {user?.role || "Admin"}</p>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePanel;
