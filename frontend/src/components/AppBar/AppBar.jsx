import { Link } from "react-router-dom";
import { Avatar, Divider, Input } from "antd";
import logo from "~/assets/images/Logo-without-text.jpg";
import { useState } from "react";
import { getFirstCharacter } from "~/utils/helper";
import { MenuOutlined, CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from 'swiper/react';

const AppBar = () => {
  const navLinks =  [
    { path: "/campaign", label: "Campaign" },
    { path: "/donation", label: "Donation" },
  ]

  const quickFilter =  [
    { label: "All campaigns" },
    { label: "Just Launched" },
    { label: "Shipping soon" },
    { label: "Ending soon" },
  ]

  const [navMenu, setNavMenu] = useState(false);
  const [search, setSearch] = useState(false);

  const handleLogoClick = () => {
    window.location.pathname = "/";
  };

  let logger = false;

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

      <div className="d-flex">
        <div className="btn-search">
          <SearchOutlined style={{fontSize: '24px', alignContent: 'center'}} onClick={() => setSearch(true)}/>
        </div>
        <div className={`menu-search list ${search ? "active" : ""}`}>
          <div className="d-flex align-items-center p-3" style={{ gap: '15px'}}>
            <SearchOutlined onClick={() => setSearch(false)}/>
            <Input  
              autoFocus={true}
              bordered={false}
              type="text"
            />
            <span style={{cursor: 'pointer'}} onClick={() => setSearch(false)}>CANCEL</span>
          </div>
          <Divider className="m-0"/>
          <div className="p-3">
            <div style={{ fontWeight: '600'}}>QUICK FILTER</div>
            {quickFilter.map(q => {
              return (
                <div key={q.label} className="border_filters" >
                  {q.label}
                </div>
              )
            })}
          </div>
        </div>
        <MenuOutlined
          className="MenuOutlined"
          onClick={() => setNavMenu(true)}
        />

        <div className={`app-bar-title list ${navMenu ? "active" : ""}`}>
          {!search && navLinks.map((link) => (
            <Link
              onClick={() => setNavMenu(false)}
              key={link.label}
              className="nav-link"
              to={link.path}
            >
              {link.label}
            </Link>
          ))}
          {logger && (
            <Link
              onClick={() => setNavMenu(false)}
              key="profile"
              className="nav-link"
              to="/profile"
            >
              Profile
            </Link>
          )}
          <CloseOutlined
            className="close-btn"
            onClick={() => setNavMenu(false)}
          />
          {!search &&
          <div className="logger">
            <Link className="nav-logo" to="/profile">
              <Avatar style={{ verticalAlign: "middle" }} size="large">
                {getFirstCharacter("Ngan Huynh")}
              </Avatar>
            </Link>
          </div>
          }
        </div>
      </div>
    </div>
  );
};

export default AppBar;
