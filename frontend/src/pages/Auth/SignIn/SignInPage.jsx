import { Button, Divider, Form, Input, Modal } from "antd";
import "../../Auth/auth.css";
import logo from "~/assets/images/Logo-without-text.jpg";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, REGISTER_USER } from "~/graphql/mutations";
import { showNotify } from "~/utils/helper";
import { useEffect, useState } from "react";

const AuthPage = (props) => {
  const [form] = Form.useForm();
  const { openAuthPopup } = props;
  const [open, setOpen] = useState(openAuthPopup);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loginUser, { loading: loginLoading }] = useMutation(LOGIN_USER);
  const [registerUser, { loading: registerLoading }] =
    useMutation(REGISTER_USER);

  useEffect(() => {
    if (openAuthPopup) {
      setOpen(openAuthPopup);
    }
  }, [openAuthPopup]);

  const onLoginFinish = async () => {
    const values = form.getFieldsValue();
    try {
      const userData = { username: values.username, password: values.password };
      const result = await loginUser({ variables: { ...userData } });
      const token = result.data.login.token;

      if (token) {
        showNotify("Success", "User login successfully!");
        localStorage.setItem("token", token);
        setTimeout(() => {
          if (window.location.pathname === '/create_campaign'){
            window.location.pathname = '/create_campaign'
          } else {
            window.location.pathname = "/";
          }
        }, 500);
      }
    } catch (error) {
      showNotify("Error", "User login failed!", 'error');
    }
  };

  const onRegisterFinish = async () => {
    try {
      const values = form.getFieldsValue();
      const userData = {
        email: values.email,
        password: values.password,
        firstName: values.email.split("@")[0],
        lastName: "",
        username: values.email.split("@")[0],
      };

      await registerUser({ variables: { request: userData } });
      showNotify("Success", "User registered successfully!");
      switchMode()
      setIsLoginMode(true);
    } catch (error) {
      showNotify("Error", "Error registering user!", 'error');
    }
  };

  const switchMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
    form.resetFields()
  };

  const handleClose = () => {
    setOpen(false);
    if (props.onClose) {
      props.onClose(false);
    }
  };

  return (
    <Modal open={open} footer={null}  onCancel={handleClose}>
      <div className="register-page-container">
        <img src={logo} alt="logo image" className="logo-register-page" />
        <div>
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <h2>{isLoginMode ? "Login" : "Register"}</h2>
            <span>
              {isLoginMode
                ? "Please enter your user name and password to login!"
                : "Hi, get started by entering your username and password!"}
            </span>
          </div>
          <Form
            form={form}
            name="auth"
            onFinish={isLoginMode ? onLoginFinish : onRegisterFinish}
            scrollToFirstError
          >
            {isLoginMode ? 
              <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
          >
            <Input placeholder="Email" />
          </Form.Item> : 
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
            }
            
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

            {!isLoginMode && (
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
                        : Promise.reject(
                            new Error("The passwords do not match!")
                          );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                loading={isLoginMode ? loginLoading : registerLoading}
              >
                {isLoginMode ? "Log In" : "Register"}
              </Button>
            </Form.Item>
            <Divider />
            <Form.Item style={{ textAlign: "center" }}>
              {`You ${isLoginMode ? "do not have" : "have"} an account? `}
              <Button className="p-0" type="link" onClick={switchMode}>{isLoginMode ? "Register" : "Log in" }</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default AuthPage;
