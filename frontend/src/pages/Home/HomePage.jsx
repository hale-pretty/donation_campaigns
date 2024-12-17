import { Button } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined, BookOutlined } from '@ant-design/icons';
import "./home.css";
import { useEffect, useState } from "react";

const dummyCampaign = [
  {
    title: "Summer Splash Sale",
    description:
      "Dive into amazing deals this summer! Up to 50% off on select items.",
    startDate: "2024-06-01",
    endDate: "2024-06-30",
    imageUrl:
      "https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,g_center,q_auto,f_auto,w_1279/uxu9blwsopkn1reoff55.jpg",
  },
  {
    title: "Back-to-School Bonanza",
    description:
      "Get everything you need for the new school year with discounts up to 40%.",
    startDate: "2024-08-01",
    endDate: "2024-08-15",
    imageUrl: "https://c3.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,g_center,q_auto,f_auto,w_1279/mke3jw4io5f1ssfwhvip.jpg",
  },
  {
    title: "Black Friday Mega Deals",
    description:
      "Don’t miss the biggest sale of the year! Limited-time offers on all categories.",
    startDate: "2024-11-29",
    endDate: "2024-11-30",
    imageUrl: "https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,g_center,q_auto,f_auto,w_1279/czfrjfvuamsm2bxrfm5i.jpg",
  },
  {
    title: "Holiday Cheer Giveaway",
    description:
      "Celebrate the season of giving with exciting prizes and discounts. Enter to win today!",
    startDate: "2024-12-10",
    endDate: "2024-12-25",
    imageUrl: "https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,g_center,q_auto,f_auto,w_1279/btafkmxzhjf1luvnppvi.jpg",
  },
  {
    title: "Black Friday Mega Deals",
    description:
      "Don’t miss the biggest sale of the year! Limited-time offers on all categories.",
    startDate: "2024-11-29",
    endDate: "2024-11-30",
    imageUrl: "https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,g_center,q_auto,f_auto,w_1279/czfrjfvuamsm2bxrfm5i.jpg",
  },
  {
    title: "Holiday Cheer Giveaway",
    description:
      "Celebrate the season of giving with exciting prizes and discounts. Enter to win today!",
    startDate: "2024-12-10",
    endDate: "2024-12-25",
    imageUrl: "https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,g_center,q_auto,f_auto,w_1279/btafkmxzhjf1luvnppvi.jpg",
  },
];


const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [datas, setDatas] = useState(dummyCampaign.slice((currentPage - 1) * 4,currentPage * 4))

  useEffect(() => {
    setDatas(dummyCampaign.slice((currentPage - 1) * 4, currentPage * 4))
  }, [currentPage])

  return (
    <div className="popular_campaign">
      <div className="heading_campaign">
        <h1>Popular Campaigns</h1>
        <div className="btn-heading">
          <Button icon={<ArrowLeftOutlined />} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}/>
          <Button icon={<ArrowRightOutlined/>}  onClick={() => setCurrentPage(currentPage + 1)} disabled={dummyCampaign.length / (4 * currentPage) < 1}/>
        </div>
      </div>

      <div className="campaign_cards">
        {datas.map((c) => {
          return (
            <div key={c.imageUrl} className="campaign_item">
            <div className="card">
              <img src={c.imageUrl} className="card_image" alt="Card Image" />
              <div className="overlay">
                <div className="head_campaign d-lg-flex">
                  <Button className="text-uppercase">ending soon</Button>
                  <Button icon={<BookOutlined />}/>
                </div>
                <div className="w-100 p-4 text-center">
                  <Button className="view-details-btn text-uppercase">view campaign</Button>
                </div>
              </div>
            </div>
            <div className="body_campaign">
              <h5>{c.description}</h5>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
