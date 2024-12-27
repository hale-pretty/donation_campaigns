import { useState } from 'react';
import './styles.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import CrowdfundingPerks from './CrowdfundingPerks ';
import { Divider } from 'antd';
import shareIcon from '~/assets/images/campaign/shareIcon.png';
import saveIcon from '~/assets/images/campaign/saveIcon.svg';
import { cardSliderImages, campaignDetails } from '~/components/dummy';

const CrowdfundingUI = () => {
  const [activeBg, setActiveBg] = useState(cardSliderImages[0].url);

  return (
    <div>
      <div className="detail-campaign">
        <div className="container py-4">
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <img src={activeBg} style={{ height: '400px' }} className="img-fluid rounded mb-3" alt="Main visual" />
              <div className="thumbnails-container">
                <button className="btn nav-arrow prev">
                  <LeftOutlined />
                </button>
                <div className="thumbnails-wrapper">
                  <Swiper
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                  >
                    {cardSliderImages.map((item) => (
                      <SwiperSlide
                        key={item.id}
                        onClick={() => setActiveBg(item.url)}
                      >
                        <div
                          className={`swiper-slide-container ${activeBg === item.url ? 'active' : ''}`}
                          style={{
                            backgroundImage: `url(${item.url})`,
                            height: '60px',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            border: activeBg === item.url ? '2px solid #cbff36' : 'none',
                          }}
                        ></div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <button className="btn nav-arrow next">
                  <RightOutlined />
                </button>
              </div>
            </div>

              <div className="col-12 col-md-6">
              <div className="indemand-badge">INDEMAND</div>
              <h1 className="h2 fw-bold mb-3" style={{ color: '#4C1D95' }}>
                {campaignDetails.title}
              </h1>
              <p className="text-muted mb-4">{campaignDetails.description}</p>
              <div className="d-flex align-items-center mb-4">
                <img
                  src={campaignDetails.avatar}
                  className="campaign-avatar me-3"
                  alt="Campaign"
                />
                <div>
                  <div className="fw-semibold">{campaignDetails.owner}</div>
                  <div className="text-muted">{campaignDetails.location}</div>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="h4 fw-bold mb-2">
                  ${campaignDetails.raised.toLocaleString()} <small className="text-muted fw-normal">USD by {campaignDetails.backers} backers</small>
                </h3>
                <div className="text-muted">
                  ${campaignDetails.pastRaised.toLocaleString()} USD by {campaignDetails.pastBackers} backers on {campaignDetails.pastDate}
                </div>
              </div>
              <button className="btn pick-perk-btn w-100 mb-4">PICK YOUR PERK</button>
              <div className="row g-3">
                <div className="col-6">
                  <button className="w-100 action-btn">
                    <img src={saveIcon} style={{ marginRight: '10px' }} alt="Save" className="ms-2" />
                    SAVE FOR LATER
                  </button>
                </div>
                <div className="col-6">
                  <button onClick={(e) => console.log(e)} className="w-100 action-btn">
                    <img src={shareIcon} style={{ marginRight: '10px' }} alt="Share" className="ms-2" />
                    SHARE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <CrowdfundingPerks />
    </div>
  );
};

export default CrowdfundingUI;
