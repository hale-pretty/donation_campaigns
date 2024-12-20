import images from "../../../src/assets/images/base64";
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
import { useRef, useState } from "react";
import useOutsideBlur from "../../customHooks/useOutsideBlur";

const campaigns = [
    {
        id: "3124829",
        title: "Stitches Cartoon",
        by: "Ambraham Lincoln"
    },
    {
        id: "3124830",
        title: "Hair Drier",
        by: "Kirk Bandwich"
    }
];

function Campaigns({setIsAdding}) {
    const [campaign, setCampaign] = useState("");
    const handleEditCampaign = (e, id) => {
        e.preventDefault();
        campaign === id ? setCampaign("") : setCampaign(id);
    }
    const buttonRef = useRef(null);
    useOutsideBlur(buttonRef, () => setCampaign(""));
    return (
        <CampaignsCtn>
            <div>
                <h1>Campaign I'm On</h1>
                <AddCampaignButton onClick={() => setIsAdding(true)}>Create New Campaign</AddCampaignButton>
                {campaigns.map((item) => (
                    <CampaignsRow key={item.id}>
                        <ImageCtn><img src={images.noimage} /></ImageCtn>
                        <CampaignsInfo>
                            <h1>{item.title}</h1>
                            <h4>Campaign ID: {item.id}</h4>
                        </CampaignsInfo>
                        <ActionButton>
                            <DropdownButton
                                ref={campaign === item.id ? buttonRef : null}
                                onClick={(e) => handleEditCampaign(e, item.id)}
                            >
                                <p>Action</p>
                                {svg.chevronDown()}
                            </DropdownButton>
                            <ActionDropdown className={campaign === item.id ? "selected" : ""}>
                                <div onClick={() => console.log("edit")}>Edit</div>
                                <div>Delete</div>
                            </ActionDropdown>
                        </ActionButton>
                        
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
