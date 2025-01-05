import { useState, useEffect, useCallback } from 'react';
import { HeartOutlined, UpOutlined } from '@ant-design/icons';
import './styles.scss';
import { Button, Input, Modal, Form } from 'antd';

const PerkSelectionWithPayment = (props) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [valuePerk, setValuePerk] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    if (e.target.value < 1 || e.target.value > 10000) return
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    setValuePerk(numericValue);
  };

  useEffect(() => {
    setIsModalVisible(props.isModalVisible);
  }, [props.isModalVisible]);

  const handleContinueClick = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleModalCancel = useCallback(() => {
    setIsModalVisible(false);
    form.resetFields();
  }, [form]);

  const handleFormSubmit = useCallback(
    (values) => {
      console.log('Payment Details:', values);
      setIsModalVisible(false);
    },
    []
  );

  return (
    <div className="container pb-4">
      {showScrollTop && (
        <Button className="scroll-top-btn" onClick={scrollToTop} icon={<UpOutlined  className='UpOutlined' />} />
      )}

      <Modal
        title="Payment Details"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item
            label="Recipient"
            name="recipient"
            rules={[{ required: true, message: "Please enter the recipient's name!" }]}
          >
            <Input placeholder="Enter recipient's name" />
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            initialValue={valuePerk}
            rules={[{ required: true, message: 'Please enter an amount!' }]}
          >
            <Input
              type="number"
              addonBefore="₫"
              addonAfter="VNĐ"
              value={valuePerk}
              onChange={handleInputChange}
              min={1}
              max={10000}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-100">
              Confirm Payment
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PerkSelectionWithPayment;