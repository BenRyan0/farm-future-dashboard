import { lazy } from "react";
const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard"));
const Commodity = lazy(() => import("../../views/admin/Commodity"));
const Category = lazy(() => import("../../views/admin/Category"));
const CommodityPrices = lazy(() => import("../../views/admin/CommodityPrices"));
const CommodityStatistics = lazy(() => import("../../views/admin/CommodityStatistics"));
// const Sellers = lazy(() => import("../../views/admin/Sellers"));
// const PaymentRequest = lazy(() => import("../../views/admin/PaymentRequest"));
// const DeactivateSellers = lazy(() =>
//   import("./../../views/admin/DeactivateSellers")
// );
// const DeactivateTraders = lazy(() =>
//   import("./../../views/admin/DeactivateTraders")
// );
// const Traders = lazy(() =>
//   import("./../../views/admin/Traders")
// );
// const SellerRequest = lazy(() => import("./../../views/admin/SellerRequest"));
// const TraderRequest = lazy(() => import("./../../views/admin/TraderRequest"));
// const AdditionalFeatures = lazy(() => import("./../../views/admin/AdditionalFeatures"));
// const SellerDetails = lazy(() => import("./../../views/admin/SellerDetails"));
// const TraderDetails = lazy(() => import("./../../views/admin/TraderDetails"));
// const ChatSeller = lazy(() => import("./../../views/admin/ChatSeller"));
// const DealsDetails = lazy(() => import("./../../views/admin/DealsDetails"));
// const TraderAdd = lazy(() => import("./../../views/admin/TraderAdd"));
// const ChangePassword = lazy(() => import("./../../views/admin/ChangePassword"));
// // const Traders = lazy(() => import("./../../views/admin/Traders"));
const Home = lazy(() => import("../../views/pages/Home"));
// import Category from './../../views/admin/Category';

export const adminRoutes = [
  {
    path: "admin/dashboard/",
    element: <AdminDashboard/>,
    ability: "admin",
    role: "admin",
  },
  {
    path: "admin/dashboard/commodities",
    element: <Commodity/>,
    ability: "admin",
    role: "admin",
  },
  {
    path: "admin/dashboard/categories",
    element: < Category  />,
    ability: "admin",
    role: "admin",
  },
  {
    path: "admin/dashboard/commodity/:commodityId",
    element: < Category  />,
    ability: "admin",
    role: "admin",
  },
  {
    path: "admin/dashboard/commodity-prices",
    element: <CommodityPrices/>,
    ability: "admin",
    role: "admin",
  },
  {
    path: "admin/dashboard/commodity-statistics/:id",
    element: <CommodityStatistics/>,
    ability: "admin",
    role: "admin",
  },
  // {
  //   path: "admin/dashboard/sellers",
  //   element: <Sellers />,
  //   ability: "admin",
  //   role: "admin",
  // },
  // {
  //   path: "admin/dashboard/deactivate-sellers",
  //   element: <DeactivateSellers />,
  //   ability: "admin",
  //   role: "admin",
  // },
  // {
  //   path: "admin/dashboard/deactivate-traders",
  //   element: <DeactivateTraders />,
  //   ability: "admin",
  //   role: "admin",
  // },
  // {
  //   path: "admin/dashboard/traders",
  //   element: <Traders/>,
  //   ability: "admin",
  //   role: "admin",
  // },
  // {
  //   path: "admin/dashboard/sellers-request",
  //   element: <SellerRequest />,
  //   ability: "admin",
  //   role: "admin",
  // },
  // {
  //   path: "admin/dashboard/traders-request",
  //   element: <TraderRequest/>,
  //   ability: "admin",
  //   role: "admin",
  // },
  // {
  //   path: 'admin/dashboard/seller/details/:sellerId',
  //   element: <SellerDetails />,
  //   ability: "admin",
  //   role: "admin",
  // },
  // {
  //   path: 'admin/dashboard/trader/details/:traderId',
  //   element: <TraderDetails />,
  //   ability: "admin",
  //   role: "admin",
  // },
  // {
  //   path: "admin/dashboard/chat-sellers",
  //   element: <ChatSeller />,
  //   ability: "admin",
  //   role: "admin",
  // },
  // {
  //   path: "admin/dashboard/chat-sellers/:sellerId",
  //   element: <ChatSeller />,
  //   ability: "admin",
  //   role: "admin",
  // },
  // {
  //   path: "admin/dashboard/offers/details/:orderId",
  //   element: <DealsDetails />,
  //   ability: "admin",
  //   role: "admin",
  // },
  // {
  //   path: "admin/dashboard/traders/add-trader",
  //   element: <TraderAdd/>,
  //   ability: "admin",
  //   role: "admin",
  // },
  // {
  //   path: "admin/dashboard/additional-features",
  //   element: <AdditionalFeatures/>,
  //   ability: "admin",
  //   role: "admin",
  // },
  // {
  //   path: "admin/dashboard/change-password",
  //   element: <ChangePassword/>,
  //   ability: "admin",
  //   role: "admin",
  // }
  
];
