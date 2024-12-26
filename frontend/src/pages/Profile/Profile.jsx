import { Link, useParams } from "react-router-dom";
import { 
    Navbar,
    Content,
    ProfileContainer,
    Tabs
} from "./styles";
import Userinfo from "./Userinfo";
import Campaigns from "./Campaigns";
import Contributions from "./Contributions";
import NewCampaign from "./NewCampaign";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { campaignActions } from '../../store/campaign.slice';
import graphql_api from "../../graphql";
import EditCampaign from "./EditCampaign";
import { gql, useSubscription, useMutation, useQuery } from "@apollo/client";
import EditProfile from "../Settings/EditProfile";
import Settings from "../Settings/Settings";

const PROFILE_TABS = {
    "/": ["profile", "campaigns", "contributions"],
    "/edit": ["profile", "settings"]
};

function Profile( { path, client } ) {
    const [publicUser, setPublicUser] = useState({});
    const { idParam, edittab } = useParams();
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const { id, token, my_campaigns } = useSelector(state => state.user.hasOwnProperty("info") ? state.user.info : {});
    const profileTabs = path === "edit" ? PROFILE_TABS["/edit"] : PROFILE_TABS["/"];
    const dispatch = useDispatch();
  
    useEffect(() => {
        (async () => {
            const cp = await graphql_api.getAllCampaigns(idParam, token);
            dispatch(campaignActions.updateCampaigns(cp));
        })();
    }, []);   

    useEffect(() => {
        (async () => {
            const user_by_id = await graphql_api.getPublicUser(parseInt(idParam));
            console.log("public user: ", user_by_id.data.user_by_id);
            setPublicUser(user_by_id.data.user_by_id);
        })();
    }, [idParam]);

    return (
        publicUser !== null && <ProfileContainer>
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
                                    <div className={(path === item || (path === "" && item === "profile") || edittab === item) ? "selected" : ""} key={index}>
                                        {
                                            path === "edit"
                                            ? <Link to={`/individuals/${idParam}/edit/${item}`}>{item.toUpperCase()}</Link>
                                            : <Link to={`/individuals/${idParam}/${item}`}>{item.toUpperCase()}</Link>
                                        }
                                    </div>
                                )
                                : (<div className={(path === item || (path === "" && item === "profile") || edittab === item) ? "selected" : ""}>
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
