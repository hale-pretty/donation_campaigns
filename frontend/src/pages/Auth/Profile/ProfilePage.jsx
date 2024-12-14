import { Button, Upload } from "antd";
import "../auth.css";
import LogoLoading from "~/components/LogoLoading";

const Profile = () => {
  const handleLogout = () => {
    window.location.href = "/";
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  let profile = false

  return (
    <div style={{ padding: "2rem" }}>
      <h1>User Profile</h1>
      {profile ? (
        <div>
          <div className="profile-container">
            <div>
              <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
              >
                {profile?.avatar ? (
                  <img
                    src={profile?.avatar}
                    alt="avatar"
                    style={{
                      width: "100%",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>
            <div>
              <p>
                <strong>Name:</strong> {profile.name}
              </p>
              <p>
                <strong>Intro:</strong> {profile.intro}
              </p>
              <p>
                <strong>Points:</strong> {profile.point}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <LogoLoading/>
      )}
      <Button>Edit Profile</Button>
      <Button>Setting</Button>
      <Button danger onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Profile;
