import { Button, Form, Input } from "antd";
import "../../Auth/auth.css";

const RegisterPage = () => {
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
          <h2>Register Page !</h2>
          <span>
            Hi get started by entering your phone number and password!
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
            <Button type="primary" htmlType="submit" style={{width: '100%'}}>
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
