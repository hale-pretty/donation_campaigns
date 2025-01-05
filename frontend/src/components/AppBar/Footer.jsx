import { Avatar, Button, Col, Divider, Row } from "antd";
import { Link } from "react-router-dom";
import logo from "~/assets/images/Logo-without-text.jpg";
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from "@ant-design/icons";
import "./styles.scss";

const FooterComponents = () => {
  const categories = [
    { title: "Home", link: "/" },
    { title: "Explore", link: "/explore" },
    { title: "Start a Campaign", link: "/campaign/create" },
    { title: "About Us", link: "/about" }
  ];

  const resources = [
    "Trust & Safety",
    "Support",
    "Terms of Service",
    "Privacy Policy"
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} md={6}>
            <div className="footer-brand">
              <Link to="/" className="brand">
                <Avatar src={logo} alt="logo" />
                <strong className="ml-2">CGT</strong>
              </Link>
              <p className="mt-3">Crowdfunding platform for creative projects</p>
              <div className="social-links">
                <FacebookOutlined className="social-icon" />
                <TwitterOutlined className="social-icon" />
                <InstagramOutlined className="social-icon" />
              </div>
            </div>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <h4>Categories</h4>
            <ul className="footer-links">
              {categories.map((item) => (
                <li key={item.title}>
                  <Link to={item.link}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <h4>Resources</h4>
            <ul className="footer-links">
              {resources.map((item) => (
                <li key={item}>
                  <Link to="#">{item}</Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <h4>Newsletter</h4>
            <p>Stay updated with our latest campaigns</p>
            <Button type="primary" className="subscribe-btn">
              Subscribe Now
            </Button>
          </Col>
        </Row>
      </div>
      <Divider className="footer-divider" />
      <div className="footer-bottom">
        <p>© 2024 CGT. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterComponents;