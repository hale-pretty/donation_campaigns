import HomePage from "~/pages/Home/HomePage";
import authRouters from "./auth.jsx";
import profileRouters from "./profile.jsx";
import projectRouters from "./project.jsx";

const pagesData = [
  ...authRouters,
  ...projectRouters,
  ...profileRouters,
  {
    path: "",
    element: <HomePage />,
    title: "Home"
  },
];

export default pagesData;
