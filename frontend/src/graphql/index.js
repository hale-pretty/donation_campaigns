import { getAllCampaigns, addNewCampaign, getOneCampaign } from "./campaign";
import { getAuthUser, getPublicUser } from "./user";

const graphql_api = {
    getAllCampaigns,
    addNewCampaign,
    getOneCampaign,
    getAuthUser,
    getPublicUser,
}

export default graphql_api;
