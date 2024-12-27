import { Link, useLocation } from "react-router-dom";
import { Avatar, Button, Divider, Input} from "antd";
import logo from "~/assets/images/Logo-without-text.jpg";
import { useEffect, useState } from "react";
import { getFirstCharacter } from "~/utils/helper";
import { MenuOutlined, CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import "./styles.scss";
import SearchDropdown from "./SearchDropdown";
import { cardSliderImages, navLinks, popularSearches, quickFilter } from "../dummy";

const AppBar = () => {
  const [activeBg, setActiveBg] = useState(cardSliderImages[2].url);
  const [search, setSearch] = useState(false)
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.realIndex;
    const newBg = cardSliderImages[currentIndex]?.url;
    setActiveBg(newBg);
  };

  const [navMenu, setNavMenu] = useState(false);

  const handleLogoClick = () => {
    window.location.pathname = "/";
  };

  let logger = false;

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (!isHomePage) {
      setActiveBg(null);
    }
  }, [location.pathname]);

  return (
    <div>
      <div
        className="app-bar-container"
        style={{
          backgroundImage: isHomePage ? `url(${activeBg})` : "",
          height: isHomePage ? "100vh" : "",
        }}
      >
        <div className="app-bar">
          <div className="app-bar-title" onClick={handleLogoClick}>
            <Avatar src={logo} alt="logo" />
            <strong className="ml-2">CGT</strong>
          </div>
          <div className="nav-link"
            onMouseEnter={() => setIsHovered(true)}
            // onMouseLeave={() => setIsHovered(false)}
            >
            Explore
          </div>
          <SearchDropdown isHovered={isHovered}/>
          <div className="d-flex align-items-center">
            <SearchOutlined className="SearchOutlined" onClick={() => setSearch(true)}/>
            <MenuOutlined
              className="MenuOutlined"
              onClick={() => setNavMenu(true)}
            />
          </div>

          <div className={`menu-search list ${search ? "active" : ""}`}>
            <div className="d-flex align-items-center p-3 gap-3"
            >
              <SearchOutlined onClick={() => setSearch(false)} />
              <Input autoFocus={true} bordered={false} type="text" />
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setSearch(false)}
              >
                CANCEL
              </span>
            </div>
            <Divider className="m-0" />
            <div className="p-3">
              <div style={{ fontWeight: "600" }}>QUICK FILTER</div>
              {quickFilter.map((q) => {
                return (
                  <div key={q.label} className="border_filters">
                    {q.label}
                  </div>
                );
              })}
            </div>
            <div>
              <h6 className="text-muted mb-3">POPULAR SEARCH TERMS</h6>
              <ul className="list-unstyled">
                {popularSearches.map((term, index) => (
                  <div key={index} className="border_filters">
                  {term}
                  </div>
                ))}
              </ul>
            </div>
          </div>

          <div className={`app-bar-title list ${navMenu ? "active" : ""}`}>
            {navLinks.map((link) => (
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
              <div className="logger">
                <Link className="nav-logo" to="/profile">
                  <Avatar style={{ verticalAlign: "middle" }} size="large">
                    {getFirstCharacter("Ngan Huynh")}
                  </Avatar>
                </Link>
              </div>
          </div>
        </div>

        {isHomePage && (
          <div className="swiper-container">
            <h1 className="title-swiper">
              {cardSliderImages.find((c) => c.url == activeBg)?.title}
            </h1>
            <div>
              <Button
                style={{
                  height: "50px",
                  fontWeight: 600,
                  backgroundColor: "#cbff36",
                  marginBottom: "10px",
                }}
              >
                SEE CAMPAIGN
              </Button>
            </div>
            <Swiper
              loop={true}
              spaceBetween={10}
              slidesPerView={2}
              freeMode={true}
              watchSlidesProgress={true}
              // autoplay={{
              //   delay: 3000,
              //   disableOnInteraction: false,
              // }}
              onSlideChange={handleSlideChange}
              modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            >
              {cardSliderImages.map((item) => (
                <SwiperSlide
                  key={item.url}
                  onClick={() => setActiveBg(item.url)}
                >
                  <div
                    className={`swiper-slide-container`}
                    style={{
                      backgroundImage: `url(${item.url})`,
                      border:
                        activeBg === item.url ? "2px solid #cbff36" : "none",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppBar;
