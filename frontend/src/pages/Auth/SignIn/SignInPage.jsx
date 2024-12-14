import { Button, Divider, Form, Input } from "antd";
import "../../Auth/auth.css";
const SignInPage = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
   console.log(values)
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: ".5rem 2rem",
        margin: ".5rem 2rem",
        borderRadius: "1rem",
        maxWidth: "400px",
        minWidth: "300px",
      }}
    >
      <div>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <h2>Login</h2>
          <span>
            Please enter your user name and password to login!
          </span>
        </div>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
           <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
                whitespace: true,
              },
            ]}
          >
            <Input name="name" placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password name="password" placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Log In
            </Button>
          </Form.Item>
          <Divider />
          <Form.Item style={{ textAlign: "center" }}>
            You do not have an account? <a href="register">Register</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignInPage;
