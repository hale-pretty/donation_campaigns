import HomePage from "~/pages/Home/HomePage";
import authRouters from "./auth.jsx";
import profileRouters from "./profile.js";

const pagesData = [
  ...profileRouters,
  ...authRouters,
  {
    path: "",
    element: <HomePage />,
    title: "Home"
  },
];

export default pagesData;
