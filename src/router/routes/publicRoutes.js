import { lazy } from "react";
const Login = lazy(() => import("../../views/auth/Login"));
// const Register = lazy(() => import("../../views/auth/Register"));
// const RegisterTrader = lazy(() => import("../../views/auth/RegisterTrader"));
const AdminLogin = lazy(() => import("../../views/auth/AdminLogin"));
const Home = lazy(() => import("../../views/pages/Home"));
const UnAuthorizedAccess = lazy(() =>
  import("./../../views/UnAuthorizedAccess")
);

const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  // {
  //   path: "/register",
  //   element: <Register />,
  // },
  // {
  //   path: "/trader/register",
  //   element: <RegisterTrader />,
  // },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  // {
  //   path: "/unauthorized-access",
  //   element: <UnAuthorizedAccess />,
  // },
];

export default publicRoutes;
