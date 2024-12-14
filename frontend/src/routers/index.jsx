import HomePage from "~/pages/Home/HomePage";
import authRouters from "./auth.jsx";

const pagesData = [
  ...authRouters,
  {
    path: "",
    element: <HomePage />,
    title: "Home"
  },
];

export default pagesData;