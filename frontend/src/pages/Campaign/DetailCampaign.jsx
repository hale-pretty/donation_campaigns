import { useCallback, useEffect, useState } from 'react';
import './styles.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules';
import { RightOutlined, LeftOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Modal, Form } from 'antd';
import shareIcon from '~/assets/images/campaign/shareIcon.png';
import saveIcon from '~/assets/images/campaign/saveIcon.svg';
import { cardSliderImages, campaignDetails } from '~/components/dummy';

const CampaignDetailsPage = () => {
  const [activeImage, setActiveImage] = useState(cardSliderImages[0].url);
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
    <div className="campaign-details-page">
      <div className="detail-campaign">
        <div className="container py-4">
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <img
                src={activeImage}
                alt="Campaign Visual"
                className="img-fluid rounded mb-3"
                style={{ height: '400px' }}
              />
              <div className="thumbnails-container">
                <Button className="btn nav-arrow prev">
                  <LeftOutlined />
                </Button>
                <div className="thumbnails-wrapper">
                  <Swiper
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode
                    watchSlidesProgress
                    modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                  >
                    {cardSliderImages.map((item) => (
                      <SwiperSlide
                        key={item.id}
                        onClick={() => setActiveImage(item.url)}
                      >
                        <div
                          className={`swiper-slide-container ${
                            activeImage === item.url ? 'active' : ''
                          }`}
                          style={{
                            backgroundImage: `url(${item.url})`,
                            height: '60px',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            border: activeImage === item.url ? '2px solid #cbff36' : 'none',
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <Button className="btn nav-arrow next">
                  <RightOutlined />
                </Button>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="indemand-badge">INDEMAND</div>
              <h1 className="h2 fw-bold mb-3 campaign_details_title">
                {campaignDetails.title}
              </h1>
              <p className=" mb-4">{campaignDetails.description}</p>
              <div className="d-flex align-items-center mb-4">
                <img
                  src={campaignDetails.avatar}
                  alt="Campaign Avatar"
                  className="campaign-avatar me-3"
                />
                <div>
                  <div className="fw-semibold">{campaignDetails.owner}</div>
                  <div className="">{campaignDetails.location}</div>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="h4 fw-bold mb-2">
                  ${campaignDetails.raised.toLocaleString()}{' '}
                  <small className="fw-normal">
                    USD by {campaignDetails.backers} backers
                  </small>
                </h3>
                <div>
                  ${campaignDetails.pastRaised.toLocaleString()} USD by {campaignDetails.pastBackers} backers on{' '}
                  {campaignDetails.pastDate}
                </div>
              </div>
              <Button type='primary' className="pick-perk-btn w-100 mb-4" onClick={() => setIsModalVisible(true)}>MAKE A CONTRIBUTION</Button>
              <div className="row g-3">
                <div className="col-6">
                  <button className="w-100 action-btn"> 
                    <img src={saveIcon} alt="Save"/>
                    SAVE FOR LATER
                  </button>
                </div>
                <div className="col-6">
                  <button className="w-100 action-btn">
                    <img src={shareIcon} alt="Share" />
                    SHARE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider />
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
    </div>
  );
};

export default CampaignDetailsPage;