import HomePage from "~/pages/Home/HomePage";
import authRouters from "./auth.jsx";
import profileRouters from "./profile.js";
import projectRouters from "./project.js";

const pagesData = [
  ...profileRouters,
  ...authRouters,
  ...projectRouters,
  {
    path: "",
    element: <HomePage />,
    title: "Home"
  },
];

export default pagesData;
