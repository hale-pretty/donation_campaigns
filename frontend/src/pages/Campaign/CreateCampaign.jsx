import { Form, Input, Upload, Select, Typography, DatePicker, Button, Modal, message, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import dayjs from 'dayjs';
import { CREATE_NEW_CAMPAIGN } from '~/graphql/mutations';
import { useMutation } from '@apollo/client';
import { campaignTags, categoriesCreateCampign } from '~/components/dummy';
import { showNotify } from '~/utils/helper';
import LocationSearch from './LocationSearch';

const { TextArea } = Input;

const CampaignForm = () => {
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [location, setLocation] = useState('')
  const [tags, setTags] = useState([]);

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

  const [createCampaign, { loading, error }] = useMutation(CREATE_NEW_CAMPAIGN);
  const handleCreateCampaign = async (values) => {
    const { title, description, goalAmount, endDate, category } = values;
    try {
      const { data } = await createCampaign({
        variables: {
          request: {
            title,
            description,
            goalAmount: parseFloat(goalAmount),
            endDate: endDate.format('YYYY-MM-DD'),
            images: fileList.map((i) => i.originFileObj), 
            tags: tags || [],
            location: location || '',
            category
          },
        },
        context: {
          hasUpload: true, // Ensure the context includes the upload flag
        },
      });
      showNotify('Notification', 'Campaign created successfully')
      window.location.pathname = '/'
    } catch (error) {
      showNotify('Notification', 'Failed to create campaign', 'error')
    }
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

      <Space>
      <Form.Item
        label='Category'
        name="category"
        required
        help="To help backers find your campaign, select a category that best represents your project."
      >
        <Select placeholder="Select a category" className='mb-3'>
          {Object.entries(categoriesCreateCampign).flatMap(([c, items]) =>
            items.map(item => (
              <Select.Option key={`${c}-${item}`} value={item}>
                {item}
              </Select.Option>
            ))
          )}
        </Select>
      </Form.Item>
      </Space>

      <Form.Item
        label="Tags"
        name="tags"
        required
        tooltip="Enter up to five keywords that best describe your campaign. These tags will help with organization and discoverability."
        // rules={[{ required: true, message: 'Please enter at least one campaign tag!' }]}
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
          onChange={(e) => setTags(e)}
        />
        <Typography.Text type="secondary">
          Tags must have at least 1 campaign tag
        </Typography.Text>
      </Form.Item>

      <Form.Item
        label="Location"
        name="location"
        required
        // rules={[{ required: true, message: 'Please enter a location!' }]}
      >
        <LocationSearch updateValue={(v) => setLocation(v)}/>
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
        <Button type="primary" htmlType="submit" loading={loading}>
          Add Campaign
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CampaignForm