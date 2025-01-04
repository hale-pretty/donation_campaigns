import HomePage from "~/pages/Home/HomePage";
import authRouters from "./auth.jsx";
import CrowdfundingUI from "~/pages/Campaign/DetailCampaign.jsx";

const pagesData = [
  ...authRouters,
  {
    path: "",
    element: <HomePage />,
    title: "Home"
  },
  {
    path: "/campaign/:id",
    element: <CrowdfundingUI />,
    title: "Campaign"
  },
];

export default pagesData;