import { Link } from "react-router-dom";
import { Avatar } from "antd";
import logo from "~/assets/images/Logo-without-text.jpg";
import {  useMemo, useState } from "react";
import { getFirstCharacter } from "~/utils/helper";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

const AppBar = () => {
  const navLinks = useMemo(
    () => [
      { path: "/campaign", label: "Campaign" },
      { path: "/donation", label: "Donation" },
    ],
    []
  );

  // SHOW MENU
  const [navMenu, setNavMenu] = useState(false);

  const handleLogoClick = () => {
    window.location.pathname = "/";
  };

  let logger = false

  return (
    <div className="app-bar">
      <div
        className="app-bar-title"
        style={{ cursor: "pointer" }}
        onClick={handleLogoClick}
      >
        <Avatar src={logo} alt="logo" />
        <strong className="ml-2">CGT</strong>
      </div>
      
      <div style={{ display: 'flex'}}>
        <div className="logger">
          <Link className="nav-logo" to="/profile">
            <Avatar style={{ verticalAlign: "middle" }} size="large">
              {getFirstCharacter('Ngan Huynh')}
            </Avatar>
          </Link>
        <MenuOutlined
          className="MenuOutlined"
          onClick={() => setNavMenu(true)}
        />
      </div>

      <div className={`app-bar-title list ${navMenu ? "active" : ""}`}>
        {navLinks.map((link) => (
          <Link onClick={() => setNavMenu(false)} key={link.label} className="nav-link" to={link.path}>
            {link.label}
          </Link>
        ))}
        {logger && <Link onClick={() => setNavMenu(false)} key="profile" className="nav-link" to="/profile">Profile</Link>}
      <CloseOutlined className="close-btn" onClick={() => setNavMenu(false)} />
      </div>
      </div>
      
    </div>
  );
};

export default AppBar;
