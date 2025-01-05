import { useState } from "react";
import {
  Upload,
  Modal,
  message,
  Avatar,
  Tabs,
  Card,
  Typography,
  Space,
} from "antd";
import { useSelector } from "react-redux";
import {
  UploadOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import EditProfileForm from "./EditProfileForm";
import SettingsTab from "./SettingTab";

const { TabPane } = Tabs;
const { Title, Text } = Typography;

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

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

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
          <Modal
            open={previewOpen}
            footer={null}
            onCancel={() => setPreviewOpen(false)}
          >
            <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
          </Modal>

        <div className="d-flex"
          style={{
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <Upload
            style={{ width: "100%" }}
            listType="picture-circle"
            fileList={fileList}
            onChange={handleChange}
            onPreview={handlePreview}
            beforeUpload={beforeUpload}
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess("ok", file);
              }, 1000);
            }}
          >
            {fileList.length === 0 && (
              <div>
                <UploadOutlined size={20} />
                <div style={{ marginTop: 8 }}>Upload Image</div>
              </div>
            )}
          </Upload>
          <Title level={2}>{user.firstName}</Title>
        </div>

        <Tabs defaultActiveKey="profile">
          <TabPane tab="Profile" key="profile">
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Card title="About Me">
                <Space direction="vertical" size="large">
                  <Space>
                    <Text strong>0</Text>
                    <Text>Campaigns</Text>
                    <QuestionCircleOutlined style={{ color: "#8c8c8c" }} />
                  </Space>
                  <Space>
                    <Text strong>0</Text>
                    <Text>Comments</Text>
                    <QuestionCircleOutlined style={{ color: "#8c8c8c" }} />
                  </Space>
                  <Space>
                    <Text strong>0</Text>
                    <Text>Contributions</Text>
                    <QuestionCircleOutlined style={{ color: "#8c8c8c" }} />
                  </Space>
                </Space>
              </Card>

              <Card title="Verifications">
                <Space>
                  <Avatar src="/api/placeholder/24/24" />
                  <Text>1,910 friends</Text>
                </Space>
              </Card>
            </Space>
          </TabPane>

          <TabPane tab="Campaigns" key="campaigns">
            <Card>
              <Text>Campaigns Content</Text>
            </Card>
          </TabPane>

          <TabPane tab="Contributions" key="contributions">
            <Card>
              <Text>Contributions Content</Text>
            </Card>
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