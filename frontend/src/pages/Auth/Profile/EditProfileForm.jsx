import { Form, Input, Button, Card, Upload, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { UploadOutlined } from "@ant-design/icons";
const { TextArea } = Input;

const EditProfileForm = (props) => {
  const { fileList, handleChange, handlePreview, beforeUpload, previewOpen, previewImage, setPreviewOpen} = props
    const [form] = Form.useForm();
    const user = useSelector((state) => state.user);

    return (
        <div className="max-w-[1200px] mx-auto p-6">
          <Modal
            open={previewOpen}
            footer={null}
            onCancel={() => setPreviewOpen(false)}
          >
            <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
          </Modal>
            <Card title="Edit Profile">
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={user}
                >
                    <Form.Item name="username" label="Username" rules={[{ required: true }]}> 
                        <Input placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ type: 'email', required: true }]}> 
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}> 
                        <Input placeholder="First Name" />
                    </Form.Item>
                    <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}> 
                        <Input placeholder="Last Name" />
                    </Form.Item>
                    <Form.Item name="avatarUrl" label="Avatar URL"> 
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
                          <div style={{ marginTop: 8 }}>Upload image</div>
                        </div>
                      )}
                    </Upload> 
                    </Form.Item>
                    <Form.Item name="bio" label="Bio"> 
                        <TextArea rows={4} placeholder="Tell us about yourself..." />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={false}>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default EditProfileForm;
