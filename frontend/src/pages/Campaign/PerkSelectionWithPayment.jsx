import { useState, useEffect, useCallback } from 'react';
import { HeartOutlined, UpOutlined } from '@ant-design/icons';
import './styles.scss';
import { perks } from '~/components/dummy';
import { Button, Input, Modal, Form } from 'antd';

const PerkSelectionWithPayment = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [valuePerk, setValuePerk] = useState(10);
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
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    setValuePerk(numericValue);
  };

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

  const updatedPerks = [
    ...perks,
    {
      id: 99992,
      isContribution: true,
      title: 'Make a Contribution',
      description: 'Contributions are not associated with perks',
      defaultContribution: 10,
    },
  ];

  return (
    <div className="container pb-4">
      <h2 className="mb-4">Choose Your Perk</h2>

      <div className="row g-4 mb-5">
        {updatedPerks.map((perk) => (
          <div className="contribution-container" key={perk.id}>
            {perk.isContribution ? (
              <div className="contribution-card">
                <div className="text-center mb-4">
                  <div className="contribution-icon">
                    <HeartOutlined />
                  </div>
                  <h3>{perk.title}</h3>
                  <p >{perk.description}</p>
                </div>

                <div className="input-group mb-4">
                  <Input
                    addonBefore="$"
                    addonAfter="USD"
                    value={valuePerk}
                    onChange={handleInputChange}
                  />
                </div>

                <Button onClick={handleContinueClick} className="w-100">
                  CONTINUE
                </Button>
              </div>
            ) : (
              <div className="perk-card">
                <span className="offer-badge">{perk.offer}</span>
                <div className="text-center mb-4">
                  <img src={perk.image} alt={perk.title} className="perk-image" />
                </div>
                <h3>{perk.title}</h3>
                <div className="price-container">
                  <span className="current-price">{perk.currentPrice}</span>
                  <span className="original-price">{perk.originalPrice}</span>
                </div>
                <div className="shipping-info">
                  <p className="mb-1">Est. Shipping</p>
                  <p>{perk.shipping.estimate}</p>
                </div>
                <div className="claimed-info mb-4">
                  <span>
                    {perk.claimed.current} out of {perk.claimed.total}
                  </span>{' '}
                  of claimed
                </div>
                <Button type="primary" className="w-100">
                  GET THIS PERK
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

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
              addonBefore="$"
              addonAfter="USD"
              value={valuePerk}
              onChange={handleInputChange}
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