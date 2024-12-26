import images from "../../images/base64";
import svg from "./svg";
import { 
    CampaignsCtn,
    CampaignsRow,
    ImageCtn,
    ActionButton,
    CampaignsInfo,
    ActionDropdown,
    AddCampaignButton,
    DropdownButton
} from "./styles";
import { useEffect, useRef, useState } from "react";
import useOutsideBlur from "../../customHooks/useOutsideBlur";
import { useDispatch, useSelector } from "react-redux";
import { campaignActions } from "../../store/campaign.slice";
import graphql_api from "../../graphql";

function Campaigns({ setIsAdding, setIsEditing, idParam, publicCampaign }) {
    const campaigns = useSelector(state => state.campaign.campaigns);
    const { id, token, my_campaigns } = useSelector(state => state.user.hasOwnProperty("info") ? state.user.info : {});
    const editing_campaign = useSelector(state => state.campaign.editing_campaign);
    const dispatch = useDispatch();
    const [campaign, setCampaign] = useState("");

    const handleEditCampaign = async (e, campaign_id) => {
        e.preventDefault();
        console.log("editing");
        setIsEditing(true);
        const campaign_details = await graphql_api.getOneCampaign(campaign_id, token);
        dispatch(campaignActions.update_current_campaign(campaign_details));
    }

    console.log("editing_campaign: ", editing_campaign);
    const handleDropdown = (e, id) => {
        e.preventDefault();
        campaign === id ? setCampaign("") : setCampaign(id);
    }

    const buttonRef = useRef(null);
    useOutsideBlur(buttonRef, () => setCampaign(""));
    useEffect(() => {
        console.log("publicCampaign: ",publicCampaign);
        if (publicCampaign !== undefined) {
            const newdonation = [];
            for (const cp of my_campaigns) {
                if (cp.get_donations.length > 0) {
                    newdonation.push(cp.get_donations);
                }
            }
            dispatch(campaignActions.update_donations(newdonation));
        }
    }, [publicCampaign, idParam]);
    return (
        <CampaignsCtn>
            <div>
                <h1>Campaign I'm On</h1>
                {(id === parseInt(idParam)) && <AddCampaignButton onClick={() => setIsAdding(true)}>Create New Campaign</AddCampaignButton>}
                {(publicCampaign !== undefined && publicCampaign.length > 0) && publicCampaign.map((item) => (
                    <CampaignsRow key={item.id}>
                        <ImageCtn><img src={item.get_images[0]} /></ImageCtn>
                        <CampaignsInfo>
                            <h1>{item.title}</h1>
                            <h4>Campaign ID: {item.id}</h4>
                        </CampaignsInfo>
                        {(id === parseInt(idParam)) && <ActionButton ref={campaign === item.id ? buttonRef : null}>
                            <DropdownButton
                                onClick={(e) => handleDropdown(e, item.id)}
                            >
                                <p>Action</p>
                                {svg.chevronDown()}
                            </DropdownButton>
                            <ActionDropdown className={campaign === item.id ? "selected" : ""}>
                                <div onClick={(e) => handleEditCampaign(e, item.id)}>Edit</div>
                                <div>Delete</div>
                            </ActionDropdown>
                        </ActionButton>}
                    </CampaignsRow>
                ))}
            </div>
            <div>
                <h1>Campaign I'm Following</h1>
            </div>
        </CampaignsCtn>
    );
}

export default Campaigns;
