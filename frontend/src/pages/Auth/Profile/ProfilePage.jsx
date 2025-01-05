import { useEffect, useState } from "react";
import {
  Upload,
  Modal,
  message,
  Tabs,
  Card,
  Typography,
  Space,
  Table,
} from "antd";
import { useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import EditProfileForm from "./EditProfileForm";
import SettingsTab from "./SettingTab";
import { useQuery } from "@apollo/client";
import { GET_DONATIONS_BY_USER } from "~/graphql/mutations";
import DonationHistory from "./HistoryContribution";
import { useMutation } from '@apollo/client';
import { ADD_AVATAR } from '~/graphql/mutations';
import { showNotify } from "~/utils/helper";

const { TabPane } = Tabs;
const { Title, Text } = Typography;

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [addAvatar] = useMutation(ADD_AVATAR);
  
  const updateTabFromHash = () => {
    const hash = window.location.hash.substring(1); // Bỏ dấu '#'
    if (hash && ['profile', 'edit_profile', 'settings'].includes(hash)) {
      setActiveTab(hash);
    }
  };

  useEffect(() => {
    updateTabFromHash(); 
    window.addEventListener('hashchange', updateTabFromHash);
  }, []);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    const isSvg = file.type === "image/svg+xml";
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (isSvg) {
      message.error("SVG files are not allowed!");
      return Upload.LIST_IGNORE;
    }

    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return Upload.LIST_IGNORE;
    }

    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  const handlePreview = async (file) => {
    setPreviewImage(file.url || URL.createObjectURL(file.originFileObj));
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleUpload = async (file) => {
    try {
      const { data } = await addAvatar({
        variables: { image: file },
      });
      console.log("object")
      showNotify('Notification', 'Avatar uploaded successfully')
    } catch (err) {
      showNotify('Notification', 'Failed to upload avatar', 'error')
    }
  };

  useEffect(() => {
    if (user.avatarUrl) {
      setFileList([{ uid: '-1', name: 'avatar', status: 'done', url: user.avatarUrl }]);
    }
  }, [user]);

  const { loading, error, data } = useQuery(GET_DONATIONS_BY_USER);

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
          <Modal
            open={previewOpen}
            footer={null}
            onCancel={() => setPreviewOpen(false)}
          >
            <img className="w-100" alt="Preview" src={previewImage} />
          </Modal>

        <div
          className="d-flex"
          style={{
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <Upload
            listType="picture-circle"
            fileList={fileList}
            onChange={handleChange}
            onPreview={handlePreview}
            beforeUpload={beforeUpload}
            customRequest={({ file, onSuccess, onError }) => {
              handleUpload(file)
                .then(() => {
                  onSuccess("ok", file);
                })
                .catch((err) => {
                  onError(err);
                });
            }}
          >
            {fileList.length === 0 && (
              <div>
                <UploadOutlined size={20} />
                <div style={{ marginTop: 8 }}>Upload Image</div>
              </div>
            )}
          </Upload>
          <Title level={2}>{user.username}</Title>
        </div>

        <Tabs defaultActiveKey="profile" activeKey={activeTab} onChange={(e) => setActiveTab(e)}>
          <TabPane tab="Profile" key="profile">
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Card title="About Me">
                <Space direction="vertical" size="large">
                  <Space>
                    <Text strong>0</Text>
                    <Text>Campaigns</Text>
                  </Space>
                  <Space>
                    <Text strong>0</Text>
                    <Text>Contributions</Text>
                  </Space>
                </Space>
              </Card>

              <Card title="Campaigns">
                <Text>Campaigns Content</Text>
              </Card>

              <Card title="Donation History">
                <DonationHistory donations={data?.getDonationsByUser} />
              </Card>
            </Space>
          </TabPane>

          <TabPane tab="Edit Profile" key="edit_profile">
            <EditProfileForm
              fileList={fileList}
              handleChange={handleChange}
              handlePreview={handlePreview}
              beforeUpload={beforeUpload}
              previewOpen={previewOpen}
              setPreviewOpen={(val) => setPreviewOpen(val)}
              previewImage={previewImage}
              handleUpload={handleUpload}
            />
          </TabPane>

          <TabPane tab="Settings" key="settings">
            <SettingsTab />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
