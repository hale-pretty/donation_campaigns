import { Link, useLocation, useNavigate} from "react-router-dom";
import { Avatar, Button, Divider, Input } from "antd";
import logo from "~/assets/images/Logo-without-text.jpg";
import svg from "~/pages/Profile/svg";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFirstCharacter } from "~/utils/helper";
import { MenuOutlined, CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import "./styles.scss";
import SearchDropdown from "./SearchDropdown";
import { cardSliderImages, popularSearches, quickFilter } from "../dummy";
import { userActions } from "~/store/user.slice";
import {
  AccountButton,
  AvatarCtn,
  AccountButtonCtn,
  AccountButtonDropdown,
  Circle3D
} from "~/components/styles";
import useOutsideBlur from "~/customHooks/useOutsideBlur";
import fake_data from "~/fake_database";

const AppBar = () => {
  const [search, setSearch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const [activeBg, setActiveBg] = useState(cardSliderImages[1].url);
  const [dropdownIsActive, setDropdownIsActive] = useState(false);
  // const auth_user_info = useSelector(state => (state.user.hasOwnProperty("info") ? state.user.info : {}));
  const auth_user_info = ''
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  useOutsideBlur(dropdownRef, () => setDropdownIsActive(false));
  const navigate = useNavigate();
  const handleNavigate = (e, path) => {
      e.preventDefault();
      setDropdownIsActive(!dropdownIsActive);
      navigate(`/individuals/${auth_user_info.id}${path}`);
  }

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

  (async () => {
    // const token = getCookie("token");
    // const queryResponse = await graphql_api.getAuthUser(token);
    // dispatch(userActions.update_auth_user({ ...queryResponse, token: token }));
    dispatch(userActions.update_auth_user({ ...fake_data.user, token: fake_data.token }));
  })();
  // }, []);

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
          <div className="header-left-app-bar">
            <div className="app-bar-title" onClick={handleLogoClick}>
              <Avatar src={logo} alt="logo" />
              <strong className="ml-2">CGT</strong>
            </div>
            <span
              className="nav-link"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Explore
            </span>
          </div>
          <SearchDropdown isHovered={isHovered} />
          <div className="d-flex align-items-center">
            <SearchOutlined
              className="SearchOutlined"
              onClick={() => setSearch(true)}
            />
            <MenuOutlined
              className="MenuOutlined"
              onClick={() => setNavMenu(true)}
            />
          </div>

          <div className={`menu-search list ${search ? "active" : ""}`}>
            <div className="d-flex align-items-center p-3 gap-3">
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
            {logger ? (
              <div className="logger">
                Ngan Huynh
                <Link className="nav-logo" to="/profile">
                  <Avatar style={{ verticalAlign: "middle" }} size="large">
                    {getFirstCharacter("Ngan Huynh")}
                  </Avatar>
                </Link>
              </div>
            ) : (
              <div>
                <span
                  onClick={() => window.location.pathname = "/login"}
                >
                  Login / Sign up
                </span>
              </div>
            )}
            <Button style={{ borderColor: "green", padding: "10px" }}>
              START A CAMPAIGN
            </Button>
          <MenuOutlined
            className="MenuOutlined"
            onClick={() => setNavMenu(true)}
          />
              <AccountButtonCtn ref={dropdownRef}>
              <AccountButton onClick={() => setDropdownIsActive(!dropdownIsActive)}>
                  <Circle3D position={{ bottom: "5px", right: "-8px" }}>{svg.bell()}</Circle3D>
                  <h3>{auth_user_info.firstname} {auth_user_info.lastname}</h3>
                  { auth_user_info.avatar === null
                  ? <Avatar style={{ verticalAlign: "middle" }} size="large">
                    {getFirstCharacter(`${auth_user_info.firstname} ${auth_user_info.lastname}`)}
                  </Avatar>
                  : <AvatarCtn>
                      <img src={auth_user_info.avatar} />
                  </AvatarCtn>}
              </AccountButton>
              <AccountButtonDropdown  className={dropdownIsActive ? "active" : ""}>
                  <div onClick={(e) => handleNavigate(e,"/campaigns")}>My campaigns<Circle3D position={{ right: "0px" }}><p>{5}</p></Circle3D></div>
                  <div onClick={(e) => handleNavigate(e,"/contributions")}>My contributions</div>
                  <div onClick={(e) => handleNavigate(e,"")}>Profile</div>
                  <div onClick={(e) => handleNavigate(e,"/edit/profile")}>Settings</div>
                  <div>Log Out</div>
              </AccountButtonDropdown>
          </AccountButtonCtn>
          <div className={`app-bar-title list ${navMenu ? "active" : ""}`}>
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
    </div>
  );
}

export default AppBar;
