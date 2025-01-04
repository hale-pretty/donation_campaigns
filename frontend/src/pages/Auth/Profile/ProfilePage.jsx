import { useState } from "react";
import {
  Button,
  Upload,
  Input,
  Card,
  Typography,
  Space,
  Modal,
  message,
  Form,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "~/redux/reducers/userSlice";
import { EditOutlined, SaveOutlined, UploadOutlined } from "@ant-design/icons";
import LogoLoading from "~/components/LogoLoading";

const { Title, Text } = Typography;

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isEditMode, setIsEditMode] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const handleLogout = () => {
    window.location.href = "/";
    localStorage.removeItem("token");
  };

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

  const toggleEditMode = () => {
    if (isEditMode) {
      form
        .validateFields()
        .then((values) => {
          dispatch(
            setUser({
              ...user,
              firstName: values.firstName,
              avatar: fileList[0]?.originFileObj,
            })
          );
          message.success("Profile updated successfully!");
          setIsEditMode(false);
        })
        .catch((error) => {
          console.error("Validation failed:", error);
        });
    } else {
      setIsEditMode(true);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Title level={2}>User Profile</Title>
      {user ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card
            hoverable
            style={{
              width: "65vw",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <Form form={form} initialValues={{ firstName: user.firstName }}>
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
                    <div style={{ marginTop: 8 }}>UPLOAD IMAGE</div>
                  </div>
                )}
              </Upload>

              <Space
                direction="vertical"
                style={{ width: "100%", marginTop: "1rem" }}
              >
                {isEditMode ? (
                  <Form.Item
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your first name!",
                      },
                    ]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                ) : (
                  <Text>
                    <strong>First Name:</strong> {user.firstName}
                  </Text>
                )}
                <Text>
                  <strong>Email:</strong> {user.email}
                </Text>
              </Space>

              <Space style={{ marginTop: "1rem", width: "100%" }}>
                <Button
                  type="primary"
                  onClick={toggleEditMode}
                  icon={isEditMode ? <SaveOutlined /> : <EditOutlined />}
                >
                  {isEditMode ? "Save" : "Edit"}
                </Button>
                <Button type="primary" danger onClick={handleLogout}>
                  Logout
                </Button>
              </Space>
            </Form>

            <Modal
              open={previewOpen}
              footer={null}
              onCancel={() => setPreviewOpen(false)}
            >
              <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </Card>
        </div>
      ) : (
        <LogoLoading />
      )}
    </div>
  );
};

export default Profile;