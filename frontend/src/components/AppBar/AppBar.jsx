import { Link, useNavigate } from "react-router-dom";
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

const cardSliderImages = [
  {
    url: "https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,g_center,q_auto,f_auto,w_1279/uxu9blwsopkn1reoff55.jpg",
    title: "Card 1",
  },
  {
    url: "https://c3.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,g_center,q_auto,f_auto,w_1279/mke3jw4io5f1ssfwhvip.jpg",
    title: "Card 2",
  },
  {
    url: "https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,g_center,q_auto,f_auto,w_1279/czfrjfvuamsm2bxrfm5i.jpg",
    title: "Card 3",
  },
  {
    url: "https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,g_center,q_auto,f_auto,w_1279/btafkmxzhjf1luvnppvi.jpg",
    title: "Card 4",
  },
  {
    url: "https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,g_center,q_auto,f_auto,w_1279/uxu9blwsopkn1reoff55.jpg",
    title: "Card 1",
  },
  {
    url: "https://c3.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,g_center,q_auto,f_auto,w_1279/mke3jw4io5f1ssfwhvip.jpg",
    title: "Card 2",
  },
  {
    url: "https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,g_center,q_auto,f_auto,w_1279/czfrjfvuamsm2bxrfm5i.jpg",
    title: "Card 3",
  },
  {
    url: "https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,g_center,q_auto,f_auto,w_1279/btafkmxzhjf1luvnppvi.jpg",
    title: "Card 4",
  },
];

const navLinks = [
  { path: "/campaign", label: "Campaign" },
  { path: "/donation", label: "Donation" },
];

const quickFilter = [
  { label: "All campaigns" },
  { label: "Just Launched" },
  { label: "Shipping soon" },
  { label: "Ending soon" },
];

const AppBar = () => {
  const [activeBg, setActiveBg] = useState(cardSliderImages[1].url);
  const [dropdownIsActive, setDropdownIsActive] = useState(false);
  const auth_user_info = useSelector(state => (state.user.hasOwnProperty("info") ? state.user.info : {}));
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
  const [search, setSearch] = useState(false);

  const handleLogoClick = () => {
    window.location.pathname = "/";
  };

  let logger = false;
  const isHomePage = location.pathname === "/";

  useEffect(() => {
      (async () => {
          // const token = getCookie("token");
          // const queryResponse = await graphql_api.getAuthUser(token);
          // dispatch(userActions.update_auth_user({ ...queryResponse, token: token }));
          dispatch(userActions.update_auth_user({ ...fake_data.user, token: fake_data.token }));
      })();
  }, []);

  return (
    <div>
      <div 
        className="app-bar-container"
        style={{ backgroundImage: isHomePage ? `url(${activeBg})` : '',
        height: isHomePage ? '100vh' : ''
      }}
      >
        <div className="app-bar">
          <div
            className="app-bar-title"
            style={{ cursor: "pointer" }}
            onClick={handleLogoClick}
          >
            <Avatar src={logo} alt="logo" />
            <strong className="ml-2">CGT</strong>
          </div>

          <div className="btn-search">
            <SearchOutlined
              style={{ fontSize: "24px", alignContent: "center" }}
              onClick={() => setSearch(true)}
            />
          </div>
          <div className={`menu-search list ${search ? "active" : ""}`}>
            <div
              className="d-flex align-items-center p-3"
              style={{ gap: "15px" }}
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
          </div>
          <MenuOutlined
            className="MenuOutlined"
            onClick={() => setNavMenu(true)}
          />
          {!search && (
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
            )}
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

        {isHomePage && !search && (
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
                  }}
                >
                  SEE CAMPAIGN
                </Button>
              </div>
            <Swiper
              loop={true}
              spaceBetween={10}
              slidesPerView={5}
              freeMode={true}
              watchSlidesProgress={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              onSlideChange={handleSlideChange}
              modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            >
              {cardSliderImages.map((item) => (
                <SwiperSlide
                  key={item.url}
                  onClick={() => setActiveBg(item.url)}
                >
                  <div
                    className={`swiper-slide-container ${navMenu ? "slide-out" : ""}`}
                    style={{
                      backgroundImage: `url(${item.url})`,
                      border: activeBg === item.url ? "2px solid #cbff36" : "none",
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
