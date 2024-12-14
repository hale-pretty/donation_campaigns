import RegisterPage from "~/pages/Auth/RegisterPage/RegisterPage";
import SignInPage from "~/pages/Auth/SignIn/SignInPage";
import Profile from "~/pages/Auth/Profile/ProfilePage";

const authRouters = [
  {
    path: "register",
    element: <RegisterPage />,
    title: "Register"
  },
  {
    path: "login",
    element: <SignInPage />,
    title: "Sign in"
  },
  {
    path: "profile",
    element: <Profile/>,
    title: "Profile"
  },
]

export default authRouters