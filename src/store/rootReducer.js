import authReducer from "./Reducers/authReducer";
import categoryReducer from "./Reducers/categoryReducer";
import listingReducer from "./Reducers/listingReducer";
import sellerReducer from "./Reducers/sellerReducer";
import traderReducer from "./Reducers/traderReducer";
import chatReducer from "./Reducers/chatReducer";

import OrderReducer from './Reducers/OrderReducer'
import dashboardIndexReducer from './Reducers/dashboardIndexReducer'
import AdminReducer from './Reducers/adminReducer_'
import voucherReducer from './Reducers/voucherReducer'
import transactionReducer from './Reducers/transactionReducer'


const rootReducer = {
  auth: authReducer,
  category: categoryReducer,
  listing: listingReducer,
  seller : sellerReducer,
  trader : traderReducer,
  chat : chatReducer,
  order: OrderReducer,
  // payment: PaymentReducer,
  dashboardIndex: dashboardIndexReducer,
  admin : AdminReducer,
  voucher : voucherReducer,
  transaction : transactionReducer
  // banner : bannerReducer
};
export default rootReducer;
