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
import { useState } from "react";

const PROFILE_TABS = {
    "/": ["profile", "campaigns", "contributions"],
    "/edit": ["profile", "settings", "email", "interests"]
};

function Profile( { path } ) { 
    const { id, edittab } = useParams();
    const [isAdding, setIsAdding] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const profileTabs = path === "edit" ? PROFILE_TABS["/edit"] : PROFILE_TABS["/"];
    // if (profileroute === "profile") { navigate(`/individuals/${id}`); }
    console.log("user id: ", id);
    console.log("user edittab: ", edittab);
    console.log("user path: ", path);
    return (
        <ProfileContainer>
            {isAdding && <NewCampaign setIsAdding={setIsAdding} isEditing={isEditing}></NewCampaign>}
            <Navbar>
                <div>
                    <div className={path === "edit" ? "" : "selected"}><Link to={`/individuals/${id}`}>View Profile</Link></div>
                    <div className={path === "edit" ? "selected" : ""}><Link to={`/individuals/${id}/edit/profile`}>Edit profile & Settings</Link></div>
                </div>
            </Navbar>
            <Content>
                <div>
                    <h1>Thao Truong</h1>
                    <Tabs>{profileTabs.map((item, index) => (
                        <div className={(path === item || (path === "" && item === "profile") || edittab === item) ? "selected" : ""} key={index}>
                            {path === "edit"
                            ? <Link to={`/individuals/${id}/edit/${item}`}>{item.toUpperCase()}</Link>
                            : <Link to={`/individuals/${id}/${item}`}>{item.toUpperCase()}</Link>}
                        </div>
                    ))}</Tabs>
                    {(path === "" || path === "profile") && <Userinfo />}
                    {path === "campaigns" && <Campaigns setIsAdding={setIsAdding} />}
                    {path === "contributions" && <Contributions />}
                </div>
            </Content>
        </ProfileContainer>
    );
}

export default Profile;
