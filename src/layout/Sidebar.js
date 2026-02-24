import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaUsers, FaUser, FaInfoCircle } from "react-icons/fa";

const Sidebar = ({ open, setOpen }) => {

  return (
    <div
      className="sidebar"
      style={{ width: open ? "220px" : "70px" }}
    >
      <FaBars
        className="menu-icon"
        onClick={() => setOpen(!open)}
      />

      <ul>
        <li>
          <NavLink to="/dashboard" end>
            <FaHome /> {open && " Home"}
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/user">
            <FaUser /> {open && " User Details"}
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/clients">
            <FaUsers /> {open && " Clients"}
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/about">
            <FaInfoCircle /> {open && " About"}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
