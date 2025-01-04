import { Button } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined, BookOutlined } from '@ant-design/icons';
import "./home.css";
import { useEffect, useState } from "react";
import { dummyCampaign } from "~/components/dummy";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [datas, setDatas] = useState(dummyCampaign.slice((currentPage - 1) * 4,currentPage * 4)); 
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setDatas(dummyCampaign); 
    } else {
      setDatas(dummyCampaign.slice((currentPage - 1) * 4, currentPage * 4)); 
    }
  }, [currentPage, isMobile]);

  const getCampaignStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    const daysUntilEnd = Math.ceil((end - now) / (1000 * 60 * 60 * 24));

    if (now < start) {
      return "PRELAUNCH";
    } else if (daysUntilEnd <= 7 && daysUntilEnd > 0) {
      return "ENDING SOON";
    }
    return null;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="popular_campaign">
      <div className="heading_campaign">
        <h1 className="pb-3">Popular Campaigns</h1>
        <div className="btn-heading">
          {!isMobile && (
            <>
              <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              />
              <Button
                icon={<ArrowRightOutlined />}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={dummyCampaign.length / (4 * currentPage) < 1}
              />
            </>
          )}
        </div>
      </div>

      <div className={`campaign_cards ${isMobile ? "scrollable" : ""}`}>
        {datas.map((c) => {
          const status = getCampaignStatus(c.startDate, c.endDate);
          return (
            <div key={c.imageUrl} className="campaign_item">
              <div className="card">
                <img src={c.imageUrl} className="card_image" alt={c.title} />
                <div className="overlay">
                  <div className={`head_campaign ${status ? 'justify-content-center' : 'justify-content-end'}`}>
                    {status && (
                      <Button className={`text-uppercase ${status.toLowerCase()}`}>
                        {status}
                      </Button>
                    )}
                    <Button icon={<BookOutlined />} />
                  </div>
                  <div className="w-100 p-4 text-center">
                    <Button className="view-details-btn text-uppercase" 
                      onClick={() => navigate(`/campaign/${c.title}`)}
                    >
                      view campaign
                    </Button>
                  </div>
                </div>
              </div>
              <div className="body_campaign">
                <h5>{c.title}</h5>
                <div className="campaign-info">
                  <p className="category">{c.category}</p>
                  <div className="price-info">
                    <span className="starting-at">STARTING AT</span>
                    <div className="price">
                      {formatCurrency(c.startingAt)}
                      {c.discount > 0 && (
                        <>
                          <span className="original-price">{formatCurrency(c.originalPrice)}</span>
                          <span className="discount">({c.discount}% OFF)</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="campaign-stats">
                    <span>{formatCurrency(c.raised)} raised</span>
                    <span>{c.funded}% funded</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
