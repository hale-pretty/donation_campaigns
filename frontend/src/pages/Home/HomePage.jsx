import { Button } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  BookOutlined,
} from "@ant-design/icons";
import "./home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_CAMPAIGNS } from "~/graphql/mutations";
import { useQuery } from "@apollo/client";
import LogoLoading from "~/components/LogoLoading";
import { formatAmount } from "~/utils/helper";

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_CAMPAIGNS);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    if (data?.getAllCampaigns && Array.isArray(data.getAllCampaigns)) {
      const campaigns = data.getAllCampaigns;
      setDatas(campaigns);
    }
  }, [data]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getCampaignStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
      return "";
    }

    const daysUntilEnd = Math.ceil((end - now) / (1000 * 60 * 60 * 24));

    if (now < start) {
      return "PRELAUNCH";
    } else if (now > end) {
      return "ENDED";
    } else if (daysUntilEnd <= 7 && daysUntilEnd > 0) {
      return "ENDING SOON";
    } else {
      return "ACTIVE";
    }
  };

  return (
    <div className="popular_campaign">
      <div className="heading_campaign">
        <h1 className="pb-3">Popular Campaigns</h1>
      </div>

      <div className={`campaign_cards ${isMobile ? "scrollable" : ""}`}>
        {loading ? (
          <LogoLoading />
        ) : (
          datas.map((c) => {
            const status = getCampaignStatus(c.startDate, c.endDate);
            return (
              <div key={c.id} className="campaign_item">
                <div className="card">
                  <img
                    src={
                      c.images.length > 0
                        ? c.images[0].imageUrl
                        : "default-image-url"
                    }
                    className="card_image"
                    alt={c.title}
                  />
                  <div className="overlay">
                    <div
                      className={`head_campaign ${
                        status ? "justify-content-between" : "justify-content-end"
                      }`}
                    >
                      {status && (
                        <Button
                          className={`text-uppercase ${status.toLowerCase()}`}
                        >
                          {status}
                        </Button>
                      )}
                      <Button icon={<BookOutlined />} />
                    </div>
                    <div className="w-100 p-2 text-center">
                      <Button
                        className="view-details-btn"
                        onClick={() => navigate(`/campaign/${c.id}`)}
                      >
                        View campaign
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="body_campaign">
                  <h5>{c.title}</h5>
                  <div className="campaign-info">
                    <p className="category">{c.category}</p>
                    <div className="price-info">
                      <span className="starting-at">
                        Starting at {c.startDate}
                      </span>
                      <div className="price">{formatAmount(c.goalAmount)} VND</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HomePage;
