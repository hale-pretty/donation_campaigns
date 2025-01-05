import HomePage from "~/pages/Home/HomePage";
import authRouters from "./auth.jsx";
import CrowdfundingUI from "~/pages/Campaign/DetailCampaign.jsx";
import NotFound from "../pages/NotFound";
import pagesCampaigns from "./campains.jsx";
import Profile from "~/pages/Auth/Profile/ProfilePage.jsx";

const pagesData = [
  ...authRouters,
  ...pagesCampaigns,
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
  },
  {
    path: "profile",
    element: <Profile/>,
    title: "Profile"
  },
];

export default pagesData;