import { Button, Divider, Form, Input } from "antd";
import "../../Auth/auth.css";
import logo from "~/assets/images/Logo-without-text.jpg";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '~/graphql/mutations';

const SignInPage = () => {
  const [form] = Form.useForm();

  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);

  const onFinish = async (values) => {
    try {
      const { name, password } = values;
      const userData = {
        username: name,
        password: password
      }
      const result = await loginUser({ variables: { ...userData } });
      const token = result.data.login.token;
      alert('User login successfully!');
    } catch (error) {
      console.error('Error logging in user:', error);
      alert('Error logging in user!');
    }
  };

  return (
    <div className="register-page-container">
          <img src={logo} alt="logo image" className="logo-register-page" />
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
