import HomePage from "~/pages/Home/HomePage";
import authRouters from "./auth.jsx";
import CrowdfundingUI from "~/pages/Campaign/DetailCampaign.jsx";
import NotFound from "../pages/NotFound";

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
  {
    path: "*",
    element: <NotFound />,
    title: "Not Found"
  }
];

export default pagesData;