import { useCallback, useEffect, useState } from "react";
import "./styles.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import { RightOutlined, LeftOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Modal, Form, Row, Col, Progress } from "antd";
import shareIcon from "~/assets/images/campaign/shareIcon.png";
import saveIcon from "~/assets/images/campaign/saveIcon.svg";
import { useParams } from "react-router-dom";
import {
  CREATE_DONATION,
  GET_CAMPAIGN_BY_ID,
  GET_DONATION_BY_CAMPAIGN_ID,
} from "~/graphql/mutations";
import { useMutation, useQuery } from "@apollo/client";
import LogoLoading from "~/components/LogoLoading";
import { formatAmount, showNotify } from "~/utils/helper";
import DonationUpdates from "~/components/DonationUpdates";
import DonationTimeline from "./HistoryDonationCampaign";
import dayjs from "dayjs";

const CampaignDetailsPage = () => {
  const [createDonation] = useMutation(CREATE_DONATION);
  const [activeImage, setActiveImage] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [valuePerk, setValuePerk] = useState(1000);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const [progressPercent, setProgressPercent] = useState(0);

  const { loading, error, data } = useQuery(GET_CAMPAIGN_BY_ID, {
    variables: { campaignId: parseInt(id) },
  });
  const campaign = data?.getCampaignById;
  const [dayLeft, setDayLeft] = useState(0);

  useEffect(() => {
    if (!campaign) return;
    if (campaign?.images) {
      setActiveImage(campaign?.images[0]?.imageUrl);
    }
    setProgressPercent(
      (
        (parseFloat(campaign?.raisedAmount) /
          parseFloat(campaign?.goalAmount)) *
        100
      ).toFixed(2)
    );
    const startDate = dayjs(campaign.startDate) || 0;
    const endDate = dayjs(campaign.endDate) || 0;

    setDayLeft(endDate.diff(startDate, "day"));
  }, [campaign]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setValuePerk(value);
  };

  const handleModalCancel = useCallback(() => {
    setIsModalVisible(false);
    form.resetFields();
  }, [form]);

  const handleFormSubmit = async (values) => {
    const { amount } = values;

    try {
      const token = localStorage.getItem("token");
      const parsedAmount = parseInt(amount, 10);
      const parsedId = parseInt(id, 10);

      const { data } = await createDonation({
        variables: {
          campaignId: parsedId,
          amount: parsedAmount,
        },
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      });

      showNotify("Notification", "Donation successfully created");
      setIsModalVisible(false);
    } catch (error) {
      showNotify("Notification", "Something went wrong", "error");
    }
  };

  // Đếm số lượng người ủng hộ độc nhất
  const uniqueBackers = campaign?.donations?.reduce((acc, donation) => {
    acc.add(donation.user.id);
    return acc;
  }, new Set()).size;

  if (loading) return <LogoLoading />;
  if (error) return <p>Error: {error.message}</p>;
  if (!campaign) return <LogoLoading />;

  return (
    <div className="campaign-details-page">
      <DonationUpdates campaignId={parseInt(id)} />
      <div className="detail-campaign">
        <div className="container py-4">
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <img
                src={activeImage}
                alt="Campaign Visual"
                className="img-fluid rounded mb-3"
                style={{ height: "400px" }}
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
                    {campaign?.images.map((item) => (
                      <SwiperSlide
                        key={item.id}
                        onClick={() => setActiveImage(item?.imageUrl)}
                      >
                        <div
                          className={`swiper-slide-container ${
                            activeImage === item?.imageUrl ? "active" : ""
                          }`}
                          style={{
                            backgroundImage: `url(${item?.imageUrl})`,
                            height: "60px",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            border:
                              activeImage === item?.imageUrl
                                ? "2px solid #cbff36"
                                : "none",
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
              <h4>{campaign.title}</h4>
              <p className="mb-4">{campaign?.description}</p>
              <div className="d-flex align-items-center mb-4">
                <img
                  src={campaign?.user.avatarUrl}
                  alt="Campaign Avatar"
                  className="campaign-avatar me-3"
                />
                <div>
                  <div className="fw-semibold">{campaign?.user.username}</div>
                  <div>{campaign?.user?.location ?? campaign?.user?.email}</div>
                </div>
              </div>
              <div className="d-flex justify-content-between mt-2 mb-2">
                <div>
                  <strong style={{ fontSize: 20 }}>
                    ₫ {formatAmount(campaign?.raisedAmount)}
                  </strong>{" "}
                  VND
                </div>
                <div>
                  <strong style={{ fontSize: 20 }}>{uniqueBackers} </strong>
                  backers
                </div>
              </div>
              <Progress percent={progressPercent} showInfo={false} />
              <div className="d-flex justify-content-between  mt-2 mb-3">
                <div>
                  {parseInt(progressPercent)}% of{" "}
                  {formatAmount(campaign.goalAmount)} VND
                </div>
                <div>
                  {dayLeft > 0 ? <><strong style={{ fontSize: 20 }}>{dayLeft} </strong>
                  days left</> : <strong>Ended</strong>}
                  
                </div>
              </div>
              <Button
                type="primary"
                className="pick-perk-btn w-100 mb-4"
                onClick={() => setIsModalVisible(true)}
              >
                MAKE A CONTRIBUTION
              </Button>
              <div className="row g-3">
                <div className="col-6">
                  <button className="w-100 action-btn">
                    <img src={saveIcon} alt="Save" />
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
          <Button
            className="scroll-top-btn"
            onClick={scrollToTop}
            icon={<UpOutlined className="UpOutlined" />}
          />
        )}

        <Modal
          title="Payment Details"
          visible={isModalVisible}
          onCancel={handleModalCancel}
          footer={null}
        >
          <Form form={form} onFinish={handleFormSubmit}>
            <Form.Item
              label="Amount"
              name="amount"
              initialValue={valuePerk}
              rules={[{ required: true, message: "Please enter an amount!" }]}
            >
              <Input
                type="number"
                addonBefore="₫"
                addonAfter="VNĐ"
                value={valuePerk}
                onChange={handleInputChange}
                min={1000}
                max={10000000}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-100">
                Confirm Payment
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Divider />
        <DonationTimeline campaignId={parseInt(id)} />
      </div>
    </div>
  );
};

export default CampaignDetailsPage;
