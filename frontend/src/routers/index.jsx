import HomePage from "~/pages/Home/HomePage";
import authRouters from "./auth.jsx";
import CrowdfundingUI from "~/pages/Campaign/DetailCampaign.jsx";
import profileRouters from "./profile.jsx";
import projectRouters from "./project.jsx";

const pagesData = [
  ...authRouters,
  ...projectRouters,
  ...profileRouters,
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
