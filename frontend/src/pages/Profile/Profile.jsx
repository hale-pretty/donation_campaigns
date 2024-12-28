import { Link, useNavigate, useParams } from "react-router-dom";
import { 
    Navbar,
    Content,
    ProfileContainer,
    Tabs
} from "~/pages/Profile/styles";
import Userinfo from "~/pages/Profile/Userinfo";
import Campaigns from "~/pages/Profile/Campaigns";
import Contributions from "~/pages/Profile/Contributions";
import NewCampaign from "~/pages/Profile/NewCampaign";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { campaignActions } from '../../store/campaign.slice';
import graphql_api from "../../graphql";
import EditCampaign from "~/pages/Profile/EditCampaign";
import { gql, useSubscription, useMutation, useQuery } from "@apollo/client";
import EditProfile from "~/pages/Settings/EditProfile";
import Settings from "~/pages/Settings/Settings";
import fake_data from "~/fake_database";

const PROFILE_TABS = {
    "/": ["profile", "campaigns", "contributions"],
    "/edit": ["profile", "settings"]
};

const MESSAGE_SUBSCRIPTION = gql`
    subscription WaitingForNewMessages {
        newDonation {
            campaign_id,
            donate_username,
            amount,
            creator_checked
        }
    }
`;

function Profile( { path, client } ) {
    const [publicUser, setPublicUser] = useState({});
    const { id, token } = useSelector(state => state.user.hasOwnProperty("info") ? state.user.info : {});
    const { idParam, edittab } = useParams();
    const navigate = useNavigate();
    if (id !== parseInt(idParam) && path === "edit") navigate(`/individuals/${idParam}`);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const profileTabs = path === "edit" ? PROFILE_TABS["/edit"] : PROFILE_TABS["/"];
    const dispatch = useDispatch();

    

    // useEffect(() => {
    //     (async () => {
    //         const cp = await graphql_api.getAllCampaigns(idParam, token);
    //         dispatch(campaignActions.updateCampaigns(cp));
    //     })();
    // }, []);   

    useEffect(() => {
        (async () => {
            // const user_by_id = await graphql_api.getPublicUser(parseInt(idParam));
            // setPublicUser(user_by_id.data.user_by_id);
            console.log(fake_data.publicUser[parseInt(idParam)]);
            setPublicUser(fake_data.publicUser[parseInt(idParam)]);
        })();
    }, [idParam]);

    
    return (
        ((publicUser !== null && id === parseInt(idParam)) || (publicUser !== null && path !== "edit")) && <ProfileContainer>
            {isAdding && <NewCampaign setIsAdding={setIsAdding}></NewCampaign>}
            {isEditing && <EditCampaign setIsEditing={setIsEditing}></EditCampaign>}
            {(id === parseInt(idParam)) && <Navbar>
                <div>
                    <div className={path === "edit" ? "" : "selected"}><Link to={`/individuals/${id}`}>View Profile</Link></div>
                    <div className={path === "edit" ? "selected" : ""}><Link to={`/individuals/${id}/edit/profile`}>Edit profile & Settings</Link></div>
                </div>
            </Navbar>}
            <Content>
                <div>
                    <h1>{publicUser.firstname} {publicUser.lastname}</h1>
                    <Tabs>
                        {profileTabs.map((item, index) => (
                                id === parseInt(idParam) 
                                ? (
                                    <div key={index} className={(path === item || (path === "" && item === "profile") || edittab === item) ? "selected" : ""} key={index}>
                                        {
                                            path === "edit"
                                            ? <Link to={`/individuals/${idParam}/edit/${item}`}>{item.toUpperCase()}</Link>
                                            : <Link to={`/individuals/${idParam}/${item}`}>{item.toUpperCase()}</Link>
                                        }
                                    </div>
                                )
                                : (<div key={index} className={(path === item || (path === "" && item === "profile") || edittab === item) ? "selected" : ""}>
                                    {((path !== "edit" && item !== "contributions") && <Link to={`/individuals/${idParam}/${item}`}>{item.toUpperCase()}</Link>)}
                                </div>)
                                )
                            )
                        }
                    </Tabs>
                    {(path === "" || path === "profile") && <Userinfo userinfo={publicUser} />}
                    {path === "campaigns" && <Campaigns setIsAdding={setIsAdding} setIsEditing={setIsEditing} idParam={idParam} publicCampaign={publicUser.my_campaigns} />}
                    {(id === parseInt(idParam) && path === "contributions") && <Contributions />}
                    {(edittab === "profile" || edittab === "") && <EditProfile />}
                    {(edittab === "settings" || edittab === "") && <Settings />}
                </div>
            </Content>
        </ProfileContainer>
    );
}

export default Profile;
