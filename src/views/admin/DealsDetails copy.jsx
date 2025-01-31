import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { get_admin_order,admin_order_status_update,messageClear } from "../../store/Reducers/OrderReducer";
import dateFormat, { masks } from "dateformat";
import toast, { Toaster } from "react-hot-toast";

const DealsDetails = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { order, loader ,successMessage,errorMessage} = useSelector((state) => state.order);
  const [copyStatus, setCopyStatus] = useState(""); // State for showing feedback

  useEffect(() => {
    if (orderId) {
      dispatch(get_admin_order(orderId));
    }
  }, [dispatch, orderId]);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Copy to clipboard handler
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopyStatus("Copied!");
        setTimeout(() => setCopyStatus(""), 2000); // Clear message after 2 seconds
      },
      () => {
        setCopyStatus("Failed to copy!");
        setTimeout(() => setCopyStatus(""), 2000); // Clear message after 2 seconds
      }
    );
  };

  const [status, setStatus] = useState('')
  useEffect(() => {
    setStatus(order?.shipPickUpStatus)
}, [order])
const status_update = (e) => {
    dispatch(admin_order_status_update({ orderId, info: { status: e.target.value } }))
    setStatus(e.target.value)
    // console.log(e.target.value)
}
useEffect(() => {
    if (successMessage) {
        toast.success(successMessage)
        dispatch(messageClear())
    }
    if (errorMessage) {
        toast.error(errorMessage)
        dispatch(messageClear())
    }
}, [successMessage, errorMessage])



  if (loader) {
    return (
      <div className="w-full h-full text-center flex items-center justify-center text-slate-400">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!order || !order.shippingInfo) {
    return (
      <div className="w-full h-full text-center flex items-center justify-center text-red-500">
        <h2>Order details not found.</h2>
      </div>
    );
  }

  const { _id, date, shippingInfo } = order;

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl text-[#d0d2d6]">Deals Details</h2>
          <select
            name="orderStatus"
            value={status}
            onChange={status_update}
            className="px-4 py-2 focus:border-accent outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
          >
            <option value="pending">pending</option>
            <option value="processing">processing</option>
            <option value="confirmed">confirmed</option>
            <option value="inTransit">inTransit</option>
            <option value="placed">placed</option>
            <option value="cancelled">cancelled</option>
            
          </select>
        </div>
        <div className="p-4">
          <div className="flex gap-2 text-lg text-[#d0d2d6]">
            <h2 className="font-semibold">
              Deal Id: <span className="font-light">{_id}</span>
            </h2>
            <div className="w-1 border-r-4 h-[25px] border-primaryDark"></div>
            <span>{date}</span>
          </div>
          <div className="flex flex-wrap border-t-2 mt-1">
            <div className="w-full text-[#d0d2d6]">
              <h2 className="font-bold">SHIPPING INFO:</h2>
              <div className="pr-3 pl-3 text-base">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row gap-6 items-center">
                    <h2>Deliver to: {shippingInfo.name}</h2>
                    <div className="flex items-center gap-2">
                         <div className="w-[50px]">
                            {copyStatus && (
                                <div className="text-sm text-green-500 text-end">
                                    {copyStatus}
                                </div>
                            )}
                      </div>
                      <h2>{shippingInfo.phone}</h2>
                      
                      <button
                        className="text-primary hover:underline"
                        onClick={() => handleCopy(shippingInfo.phone)}
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                  <h2>Email: {shippingInfo.address}</h2>
                  <p>Address: <span>{shippingInfo.street}, {shippingInfo.barangay}, {shippingInfo.munCity}, {shippingInfo.province}</span></p>
                </div>
                
              </div>
            </div>
          </div>
          <div className="flex flex-wrap border-y-2 mt-3 py-2">
            <div className="w-full text-[#d0d2d6]">
              <h2 className="font-bold">LISTING INFO:</h2>
              <div className="flex sm:w-full gap-2 w-full text-base">
                      <div className="flex gap-2 justify-between items-start w-full">
                          <img className='w-[200px] h-full rounded-md ' src={order.listing[0].images[0]} alt="listing" /> 
                            <div className="flex justify-start w-full h-full">
                                <div className="flex flex-col">
                                    <div className="pb-2">
                                        <h2>Price: {order.listing[0].price}/{order.listing[0].unit} 
                                         <span className="pl-1">&#64;</span>
                                          {order.listing[0].expectedHarvestYield}{order.listing[0].yieldUnit}
                                        </h2>


                                        {order.listing[0].discount > 0 ? (
                                            <div className="flex justify-start items-center gap-1">
                                                 <span>&#8369;</span>
                                                <h2 className="text-lg text-primary pr-1">
                                                    {formatNumber(order.listing[0].totalPrice - Math.floor((order.listing[0].totalPrice * order.listing[0].discount) / 100))}
                                                   </h2>
                                                   <p className="line-through">{formatNumber(order.listing[0].totalPrice)}</p>
                                                   <p className="flex items-center text-xs text-white bg-primary/50 mx-1 px-1"> -{order.listing[0].discount}% 
                                                   {/* <IoTicketSharp  className='ml-[1px]'/> */}
                                                   </p>
                                               </div>
                                          ) : order.listing[0].discount === 0 ? (
                                              <div className="flex items-center gap-1 text-primaryDark">
                                                    <span>&#8369;</span>
                                                   <h2 className=" text-lg">{formatNumber(order.listing[0].totalPrice)}</h2>
                                              </div>
                                              
                                           ) : (
                                               <div className="flex items-center gap-1">
                                                   <h2 className="text-primaryDark text-lg">{formatNumber(order.listing[0].totalPrice)}</h2>
                                               </div>
                                           )}
                                            
                                            {
                                                order.listing[0].shippingFee  ?  
                                                <h2>Shipping Fee:  
                                                <span className="pl-1">&#8369;</span>
                                                {order.listing[0].shippingFee} 
                                            </h2> : ''
                                            }
                                       
                                    </div>
                                     <div className="">
                                        <h2>Listing Name: {order.listing[0].name}</h2>
                                        <h2>ClusterName: {order.listing[0].clusterName}</h2>
                                        <h2>Harvest Start Date: {dateFormat((order.listing[0].harvestStartDate), "yyyy-mm-dd")}</h2>
                                        <h2>Harvest End Date: {dateFormat((order.listing[0].harvestEndDate), "yyyy-mm-dd")}</h2>
                                     </div>
                                  
                                     
                                </div>
                            </div>     
                      </div>
                 </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsDetails;
