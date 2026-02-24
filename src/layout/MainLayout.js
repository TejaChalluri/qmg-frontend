import { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import ProfilePanel from "../components/ProfilePanel";
import { AuthContext } from "../context/AuthContext";
import "./MainLayout.css";

const MainLayout = () => {
  const [open, setOpen] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  const { user } = useContext(AuthContext);

  return (
    <div className="layout">
      <Sidebar open={open} setOpen={setOpen} />

      <div
        className="main-content"
        style={{
          marginLeft: open ? "220px" : "70px"
        }}
      >
        {/* TOP BAR */}
        <div className="topbar">
          <div
            className="profile-section"
            onClick={() => setShowProfile(true)}
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="profile-img"
            />
            <span>{user?.firstname || "Teja"}</span>
          </div>
        </div>

        <div className="content-box">
          <Outlet />
        </div>
      </div>

      {showProfile && <ProfilePanel close={() => setShowProfile(false)} />}
    </div>
  );
};

export default MainLayout;
