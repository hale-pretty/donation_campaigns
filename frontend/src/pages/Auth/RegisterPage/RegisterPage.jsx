import { Button, Form, Input } from "antd";
import "../../Auth/auth.css";
import logo from "~/assets/images/Logo-without-text.jpg";

const RegisterPage = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
  };

  return (
    <div className="register-page-container">
      <img src={logo} alt="logo image" className="logo-register-page" />
      <div>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <h2>Register Page!</h2>
          <span>
            Hi, get started by entering your phone number and password!
          </span>
        </div>
        <Form form={form} name="register" onFinish={onFinish} scrollToFirstError>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@(gmail\.com|email\.com)$/,
                message: "Email must end with gmail.com or email.com",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            hasFeedback
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  return !value || getFieldValue("password") === value
                    ? Promise.resolve()
                    : Promise.reject(new Error("The passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item>
            <Button className="w-100" type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            You have an account?{" "}
            <a href="/login" target="_parent">
              Log In
            </a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
