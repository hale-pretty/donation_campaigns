import Page404 from "~/pages/Page404";
import Profile from "~/pages/Profile/Profile";

const profileRouters = [
    {
        path: "individuals",
        element: <Page404 />,
        title: "Error"
    },
    {
        path: "individuals/:idParam",
        element: <Profile path="" />,
        title: "Profile"
    },
    {
      path: "individuals/:idParam/profile",
      element: <Profile path="" />,
      title: "Profile"
  },
    {
      path: "individuals/:idParam/campaigns",
      element: <Profile path="campaigns" />,
      title: "Campaigns"
    },
    {
      path: "individuals/:idParam/contributions",
      element: <Profile path="contributions" />,
      title: "Contributions"
    },
    {
      path: "individuals/:idParam/edit",
      element: <Profile path="edit" />,
      title: "Edit"
    },
    {
      path: "individuals/:idParam/edit/:edittab",
      element: <Profile path="edit" />,
      title: "Edit"
    },
];

export default profileRouters;
