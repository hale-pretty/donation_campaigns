import { useParams } from "react-router-dom";
import graphql_api from "../../graphql";
import { useEffect, useState } from "react";
import { 
    CampaignSection,
    CampaignDetailsCtn,
    Community,
    CommunityHeader,
    CommunityAndRelatedCampaigns,
    MoreCampaignFromCurrentPage,
    CommunityBody,
    RuleBox,
    CommentCtn,
    Donation
 } from "./styles";
import images from "../../images/base64";
import fake_data from "~/fake_database";

function CampaignDetails() {
    const { campaign_id, campaign_seo } = useParams();
    const [publicCampaign, setPublicCampaign] = useState(null);
    const [ tab, setTab ] = useState("comments");
    console.log({ campaign_id, campaign_seo });
    useEffect(() => {
        (async () => {
            // const cp = await graphql_api.getOneCampaign(parseInt(campaign_id));
            const cp = fake_data.campaigns[parseInt(campaign_id)];
            console.log("comments: ", cp);
            setPublicCampaign(cp);
        })();
    },[campaign_id]);
    return (
        publicCampaign && <CampaignSection>
            <CampaignDetailsCtn>
            <h1>{publicCampaign.title}</h1>
            </CampaignDetailsCtn>
            <div>Perks</div>
            <CommunityAndRelatedCampaigns>
            <Community>
                <CommunityHeader>
                    <div className={tab === "comments" ? "selected" : ""} onClick={() => setTab("comments")}>
                        Comments
                        <div>{publicCampaign.comments_counter}</div>
                    </div>
                    <div className={tab === "faqs" ? "selected" : ""} onClick={() => setTab("faqs")}>FAQs</div>
                    <div className={tab === "donations" ? "selected" : ""} onClick={() => setTab("donations")}>
                        Donations
                        <div>{publicCampaign.comments_counter}</div>
                    </div>
                </CommunityHeader>
                {tab === "comments" && <CommunityBody>
                    <RuleBox>You must be a backer to join this comment sections</RuleBox>
                    {publicCampaign.get_comments.map((cmt, index) => (
                        <CommentCtn key={index}>
                            <div><img src={cmt.get_avatar} /></div>
                            <div>
                                <h2>{cmt.get_fullname}</h2>
                                <p>Posted on: {new Date(cmt.createdAt).toDateString()}</p>
                                <pre>{cmt.comment}</pre>
                            </div>
                        </CommentCtn>
                    ))}
                </CommunityBody>}
                {tab === "donations" && <CommunityBody>
                    <Donation>
                        <div><img src={images.cat_avatar} /></div>
                        <div>
                            <h2>Anne Hathaway</h2>
                            <p>Donated on: {new Date().toDateString()}</p>
                            <h3>1xEarly Bird Odin2 Portal Base</h3>
                        </div>
                        <div>+ $ 245.00</div>
                    </Donation>
                    <Donation>
                        <div><img src={images.cat_avatar} /></div>
                        <div>
                            <h2>Jennifer Lawrence</h2>
                            <p>Donated on: {new Date().toDateString()}</p>
                            <h3>1xEarly Bird Odin2 Portal Max</h3>
                        </div>
                        <div>+ $ 399.00</div>
                    </Donation>
                </CommunityBody>}
            </Community>
            <MoreCampaignFromCurrentPage>

            </MoreCampaignFromCurrentPage>
            </CommunityAndRelatedCampaigns>
        </CampaignSection>
    )
}

export default CampaignDetails;
