import { privateRoutes } from "./privateRoutes";
import MainLayout from "./../../layout/MainLayout";
import ProtectedRoutes from "./ProtectedRoutes";

export const getRoutes = () => {
  const allRoutes = [];
  privateRoutes.map((r) => {
    r.element = <ProtectedRoutes route={r}>{r.element}</ProtectedRoutes>;
  });
  return {
    path: "/",
    element: <MainLayout />,
    children: privateRoutes,
  };
};
