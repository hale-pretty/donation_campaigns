import "./home.css";

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
];

const HomePage = () => {
  return (
    <div>
      <h1>Top campaign</h1>
      {dummyCampaign.map((c) => {
        return (
          <div key={c.imageUrl} className="card">
            <img src={c.imageUrl} alt="Card Image" />
            <div className="overlay">
              <button className="view-details-btn">Xem Detail</button>
            </div>
            <h5>{c.description}</h5>
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
