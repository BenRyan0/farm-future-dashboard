import {
  AiFillDashboard,
  AiOutlineShopping,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiCategory, BiLoaderCircle } from "react-icons/bi";
import { BsChat } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { BsCurrencyDollar } from "react-icons/bs";
import { CiChat1 } from "react-icons/ci";
import { RiProductHuntLine,RiFunctionAddFill  } from "react-icons/ri";
import { BiSolidDiscount } from "react-icons/bi";
import { FaHandshake } from "react-icons/fa";
import { TbCurrencyPeso } from "react-icons/tb";
import { MdDiscount } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";
import { IoIosPricetags } from "react-icons/io";

// import { RiFunctionAddFill } from "react-icons/ri";
// import { RiFunctionAddFill } from "react-icons/ri";


export const allNav = [
  {
    id: 1,
    title: "Dashboard",
    icon: <AiFillDashboard />,
    role: "admin",
    path: "/admin/dashboard",
  },
  {
    id: 2,
    title: "Commodities",
    icon: <BiCategory />,
    role: "admin",
    path: "/admin/dashboard/commodities",
  },
  {
    id: 3,
    title: "Commodity Prices",
    icon: <IoIosPricetags />,
    role: "admin",
    path: "/admin/dashboard/commodity-prices",
  },
  {
    id: 4,
    title: "Sellers",
    icon: <FiUsers />,
    role: "admin",
    path: "/admin/dashboard/sellers",
  },
  // {
  //   id: 5,
  //   title: "Payment request",
  //   icon: <BsCurrencyDollar />,
  //   role: "admin",
  //   path: "/admin/dashboard/payment-request",
  // },
  {
    id: 6,
    title: "Deactivated Sellers",
    icon: <FiUsers />,
    role: "admin",
    path: "/admin/dashboard/deactivate-sellers",
  },
  {
    id: 7,
    title: "Sellers Request",
    icon: <BiLoaderCircle />,
    role: "admin",
    path: "/admin/dashboard/sellers-request",
  },
  {
    id: 8,
    title: "Chat Seller",
    icon: <CiChat1 />,
    role: "admin",
    path: "/admin/dashboard/chat-sellers",
  },

  // Sellers_Links
  {
    id: 9,
    title: "Dashboard",
    icon: <AiFillDashboard />,
    role: "seller",
    path: "/seller/dashboard/",
  },
  {
    id: 10,
    title: "Add Listing",
    icon: <AiOutlinePlus />,
    role: "seller",
    path: "/seller/dashboard/add-Listing",
  },
  {
    id: 11,
    title: "All Listings",
    icon: <RiProductHuntLine />,
    role: "seller",
    path: "/seller/dashboard/listings",
  },

 
];


