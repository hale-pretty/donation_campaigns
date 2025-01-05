import { useLocation } from "react-router-dom";
import { Avatar, Button, Divider, Input } from "antd";
import logo from "~/assets/images/Logo-without-text.jpg";
import { useEffect, useState } from "react";
import { MenuOutlined, CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import "./styles.scss";
import SearchDropdown from "./SearchDropdown";
import { cardSliderImages, categories, popularSearches, quickFilter } from "../dummy";
import { useSelector } from "react-redux";
import { GET_CURRENT_USER } from '~/graphql/mutations';
import { useLazyQuery } from "@apollo/client";
import { useDispatch } from 'react-redux';
import { setUser } from "~/redux/reducers/userSlice";
import SignInPage from "~/pages/Auth/SignIn/SignInPage";
import UserDropdown from "./UserDropdown";
const AppBar = () => {
  const [activeBg, setActiveBg] = useState(cardSliderImages[2].url);
  const dispatch = useDispatch();
  const [search, setSearch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem('token');
  const [getCurrentUser] = useLazyQuery(GET_CURRENT_USER, {
    fetchPolicy: 'network-only'
  });
  const [openAuthPopup, setOpenAuthPopup] = useState(false);

  useEffect(() => {
    if(token) {
      getUser();
    } 
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname); 
    }
  },[]);

  const getUser = async () => {
    if(localStorage.getItem('token')) {
      const { data } = await getCurrentUser({
        context: { headers: { Authorization: `Bearer ${token}` } }
      });
      if(data){
        dispatch(setUser(data));
      }
    }
  }

  const user = useSelector((state) => state.user);

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.realIndex;
    const newBg = cardSliderImages[currentIndex]?.url;
    setActiveBg(newBg);
  };

  const [navMenu, setNavMenu] = useState(false);

  const handleLogoClick = () => {
    window.location.pathname = "/";
  };


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
          <div className="header-left-app-bar">
            <div className="app-bar-title" onClick={handleLogoClick}>
              <Avatar src={logo} alt="logo" />
              <strong className="ml-2">CGT</strong>
            </div>
            <span className="nav-link explore"
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
              <span onClick={() => setSearch(false)}>
                CANCEL
              </span>
            </div>
            <Divider className="m-0" />
            <div className="d-flex flex-wrap gap-2 m-4">
              {categories.map((category, index) => (
                <Button key={index} className="button-category btn">
                  <span>{category.icon}</span>
                  <span>{category.text}</span>
                </Button>
              ))}
            </div>
            <div className="m-4 d-flex justify-content-between">
            <div>
              <h6 className="text-muted mb-3">QUICK FILTERS</h6>
              <ul className="list-unstyled">
                {quickFilter.map((q) => {
                  return (
                    <div key={q.label} className="border_filters">
                      {q.label}
                    </div>
                  );
                })}
              </ul>
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
          </div>

          <div className={`app-bar-title list ${navMenu ? "active" : ""}`}>
            {user.id ? (
              <UserDropdown user={user} />
            ) : (
              <div>
                <span onClick={() => setOpenAuthPopup(true)}> 
                  Login / Sign up
                </span>
              </div>
            )}

            <SignInPage openAuthPopup={openAuthPopup} onClose={(val) => setOpenAuthPopup(val)}/>
            <Button style={{ borderColor: "green", padding: "10px" }} onClick={() => 
              window.location.pathname = '/create_campaign'
            }>
              START A CAMPAIGN
            </Button>
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
              slidesPerView={4}
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
