import Page404 from "../pages/Page404";
import CampaignDetails from "../pages/Projects/CampaignDetails";

const projectRouters = [
    {
        path: "projects/:campaign_id/:campaign_seo",
        element: <CampaignDetails />,
        title: "Error"
    }
];

export default projectRouters;
