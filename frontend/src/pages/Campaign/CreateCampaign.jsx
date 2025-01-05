import { Form, Input, Upload, Select, Typography, DatePicker, Button, Modal, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useMutation } from '@apollo/client';

const { TextArea } = Input;

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

  const handleCreateCampaign = async (values) => {
    
  };

  return (
    <Form
      form={form}
      layout="vertical"
      scrollToFirstError
      style={{ maxWidth: 800, margin: '0 auto', padding: '24px' }}
      onFinish={handleCreateCampaign}
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
        label="Campaign description"
        name="description"
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
          onChange={({ fileList }) => setFileList([...fileList])}
          onPreview={handlePreview}
          beforeUpload={(file) => {
              setFileList((prev) => [...prev, file]);
              return false;
          }}
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
        label={(
          <div> Campaign Duration<div>
            <Typography.Text type="secondary">
                ⓘ Please select a future end date for the campaign.
            </Typography.Text>
            </div>
          </div>
        )}
        name="endDate"
      >
        <DatePicker
          className='w-100'
          disabledDate={(current) => current && current < dayjs().startOf('day')}
          placeholder="Select campaign end date"
          showNow={false}
        />
        </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" >
          Add Campaign
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CampaignForm