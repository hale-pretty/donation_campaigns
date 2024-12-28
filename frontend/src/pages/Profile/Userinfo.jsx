import {
    UserinfoCtn,
    YourStory,
    Activities,
} from './styles';

function Userinfo({ userinfo }) {
    console.log("userinfo: ", userinfo);
    return (
        <UserinfoCtn>
            <YourStory>
                <img src={userinfo.profile_image} alt="" />
                <p>{userinfo.short_description}</p>
            </YourStory>
            <Activities>
                <div>
                    <div><img src={userinfo.avatar} alt="" /></div>
                    <h1>About me</h1>
                </div>
                <div>
                    <h2>{userinfo.campaigns_counter}</h2>
                    <p>Campaigns</p>
                </div>
                <div>
                    <h2>{userinfo.comments_counter}</h2>
                    <p>Comments</p>
                </div>
                <div>
                    <h2>{userinfo.contributions_counter}</h2>
                    <p>Contributions</p>
                </div>
            </Activities>
        </UserinfoCtn>
    );
}

export default Userinfo;
