import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaGrinWink,
  FaCompass,
  FaUserFriends,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "../../images/logoo.png";
import "./sidebar.css";
import "../../Styles/home.css";

const Sidebar = () => {
  return (
    // The main sidebar component with all content included inside the aside element
    <aside className="sidebar">
      {/* Logo and Website Name */}
      <div className="sidebar-header">
        <img src={logo} alt="logo" className="sidebar-logo" />
        <h1 className="sidebar-title">TechPees</h1>
      </div>

      <nav>
        <ul className="sidebar-list">
          <li className="sidebar-item">
            <Link to="/" className="sidebar-link">
              <FaHome className="sidebar-icon" />
              Home
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/search" className="sidebar-link">
              <FaGrinWink className="sidebar-icon" />
              TimeLine
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/explore" className="sidebar-link">
              <FaCompass className="sidebar-icon" />
              Explore
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/friend-requests" className="sidebar-link">
              <FaUserFriends className="sidebar-icon" />
              Friend Requests
            </Link>
          </li>
        </ul>

        <div className="sidebar-divider">
          <ul className="sidebar-list">
            <li className="sidebar-item">
              <Link to="/profile" className="sidebar-link">
                <FaUser className="sidebar-icon" />
                Profile
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/logout" className="sidebar-link">
                <FaSignOutAlt className="sidebar-icon" />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
