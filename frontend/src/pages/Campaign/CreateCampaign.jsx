import { Form, Input, Upload, Select, Typography, DatePicker, Button, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;
import { campaignTags, categoriesCreateCampign } from '~/components/dummy';
import { useState } from 'react';

const CampaignForm = () => {
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handlePreview = async (file) => {
    setPreviewImage(file.url || URL.createObjectURL(file.originFileObj));
    setPreviewOpen(true);
  };

  const handleCancel = () => setPreviewOpen(false);

  return (
    <Form form={form}
      layout="vertical" scrollToFirstError 
      style={{ maxWidth: 800, margin: '0 auto', padding: '24px' }}
    >
      <Form.Item
        label="Campaign Title"
        name="title"
        // required
        tooltip="What should your campaign be named?"
      >
        <Input placeholder="My Campaign Title" />
      </Form.Item>

      <Form.Item
        label="Campaign Tagline"
        name="tagline"
        required
        tooltip="Provide a short description that helps better describe your campaign to your audience."
      >
        <TextArea
          placeholder="Provide a short description that helps better describe your campaign to your audience."
          rows={4}
        />
      </Form.Item>

      <Form.Item
        label="Amount"
        name="goalAmount"
        // rules={[{ required: true, message: 'Please enter an amount!' }]}
      >
        <Input
          type="number"
          addonBefore="₫"
          addonAfter="VNĐ"
        />
      </Form.Item>

      <Form.Item
        label="Campaign Card Image"
        name="images"
        required
        valuePropName="fileList"
        getValueFromEvent={normFile}
        tooltip="Upload multiple images that represent your campaign."
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
          onPreview={handlePreview}
          beforeUpload={() => false}
          multiple
        >
          {fileList.length < 5 && (
            <div>
              <UploadOutlined size={20} />
              <div style={{ marginTop: 8 }}>UPLOAD IMAGE</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
        <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>

      <Form.Item
        label="Location"
        name="location"
        tooltip="Select the location where you are running the campaign. This location will be visible on your campaign page for your audience to see."
      >
        <Input placeholder="Country" />
      </Form.Item>

      <Form.Item
        label={<>Category <span style={{ color: '#ff4d4f' }}>*</span></>}
        name="category"
        required
        help="To help backers find your campaign, select a category that best represents your project."
      >
        <Select placeholder="Select a category" style={{ marginBottom: '16px' }}>
          {Object.entries(categoriesCreateCampign).flatMap(([category, items]) =>
            items.map(item => (
              <Select.Option key={item} value={item}>{item}</Select.Option>
            ))
          )}
        </Select>
      </Form.Item>

      <Form.Item
        label="Tags"
        name="tags"
        required
        tooltip="Enter up to five keywords that best describe your campaign. These tags will help with organization and discoverability."
      >
        <Select
          mode="tags"
          placeholder="Enter tag"
          style={{ width: '100%' }}
          maxTagCount={5}
          options={campaignTags}
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />
        <Typography.Text type="secondary">
          Tags must have at least 1 campaign tag
        </Typography.Text>
      </Form.Item>

      <Form.Item
        label={
          <div>
            Campaign Description
            <div>
              <Typography.Text type="secondary">
                ⓘ The description must be between 100 and 5000 characters long.
              </Typography.Text>
            </div>
          </div>
        }
        name="endDate"
      >
        <DatePicker
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={() => console.log(form.getFieldsValue())}>
          Add Campaign
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CampaignForm;