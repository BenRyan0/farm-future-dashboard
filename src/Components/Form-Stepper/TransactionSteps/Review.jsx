import React, { useContext, useEffect, useState } from 'react';
import { StepperContextTransaction } from '../../context/StepperContextTransaction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { messageClear, get_seller_order, seller_order_status_update } from '../../../store/Reducers/OrderReducer';
import {add_transaction} from '../../../store/Reducers/transactionReducer';
// import { messageClear, get_seller_order, seller_order_status_update } from '../../store/Reducers/OrderReducer';
import dateFormat from 'dateformat';
import { FaPhoneSquare } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

const Review = () => {
  
  const dispatch = useDispatch();
  const { dealId } = useParams();
  const navigate = useNavigate()
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true); // New loading state
  
  const {transactionData, setTransactionData} = useContext(StepperContextTransaction);
  const {currentStep, setCurrentStep} = useContext(StepperContextTransaction);
  const {buyerInfo, setBuyerInfo} = useContext(StepperContextTransaction);
  const {currentProduct, setCurrentProduct} = useContext(StepperContextTransaction);

   const { seller } = useSelector((state) => state.seller);
    const { userInfo } = useSelector(state => state.auth)
    const { order,errorMessage,successMessage } = useSelector((state) => state.order);
    let orderId = dealId;

    console.log(order)
      useEffect(() => {
        // Fetch order data and set loading12
        setLoading(true);
        dispatch(get_seller_order(orderId)).then(() => setLoading(false));
        // dispatch(get_trader(orderId)).then(() => setLoading(false));
      }, [dispatch, orderId]);
    
      useEffect(() => {
        if (seller) {
          setStatus(seller.status);
        }
      }, [seller]);

      console.log("roder")
      console.log(order)

      useEffect(() => {
        if (order) {
          console.log("taeiiiiiii")
          setCurrentProduct(order);
        }
      }, [order]);

      useEffect(()=>{
        if(errorMessage){
            toast.error(errorMessage)
            dispatch(messageClear())
          
            
        }else{
            toast.success(successMessage)
        dispatch(messageClear())
             
    
        }
        },[successMessage, errorMessage])
    


      const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US').format(Math.floor(num));
      };
    




  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionData({ ...transactionData, [name]: value });
  };


  const initializeTransaction = () =>{
    setCurrentStep(2)
    // dispatch(
    //   add_transaction({traderId: userInfo.id, sellerId: userInfo.id, listingId: userInfo.id, listingName: userInfo.id, listingPrice: userInfo.id, depositAmount: userInfo.id})
    // )
  }

   const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
    });
  };
  return (
     <div className="px-2 lg:px-7 pt-5">
          {loading ? (
            // Loader section
            <div className="flex justify-center items-center min-h-screen">
              <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent text-primary"></div>
            </div>
          ) : (
            // Main content
            // <div className='px-2 lg:px-7 pt-5'>
        <div className="w-full p-4 bg-[#283046] rounded-md">
           
           {order.shippingMethod === "traderPickup" ? 
            <div className="w-full flex flex-wrap text-text_color ">  
            <div className="w-full">
              <h2 className='uppercase font-semibold'>Offer Info</h2>
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md ">
                           <div className="flex gap-2">
                               <span>ID: </span>
                               <span>{order._id}</span>
                           </div>
                           {/* <div className="flex gap-2">
                               <span>Email: </span>
                               <span>{order.dealId}</span>
                           </div> */}
                           
                         
            </div>
            </div> 
               <div className="w-full md:w-6/12">
                   <div className="px-0 md:px-5 py-2">
                       <div className="py-2 text-lg">
                           <h2>Listing Info</h2>
                       </div>
                       <div className="px-2 flex justify-between lg:flex-row flex-col gap-1">
                      <div className="w-full">
                         <h2><span className='font-bold uppercase pr-1'>Name: </span > {order.listing[0].name}</h2>
                         <h2><span className='font-bold uppercase pr-1'>price: </span> <span>&#8369;</span> {order.listing[0].price}/{order.listing[0].unit}</h2>
                         <h2><span className='font-bold uppercase pr-1'>expectedHarvestYield: </span> {order.listing[0].expectedHarvestYield} {order.listing[0].yieldUnit}</h2>
                         <h2><span className='font-bold uppercase pr-1'>totalPrice: </span> {formatNumber(order.listing[0].totalPrice)}</h2>
                         <h2><span className='font-bold uppercase pr-1'>description: </span> {order.listing[0].description}</h2>
                         <h2><span className='font-bold uppercase pr-1'>harvestStartDate: </span> {dateFormat((order.listing[0].harvestStartDate), "yyyy-mm-dd")}</h2>
                         <h2><span className='font-bold uppercase pr-1'>harvestEndDate: </span>{dateFormat((order.listing[0].harvestEndDate), "yyyy-mm-dd")}</h2>
                         <h2><span className='font-bold uppercase pr-1'>locationInfo: </span> {order.listing[0].locationInfo}</h2>
                         <h2 className='py-1'>
                          <span className="font-bold uppercase pr-1">mapsLink: </span>
                          <a 
                            href={order.listing[0].mapsLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-500 bg-slate-100 rounded-sm font-bold px-2 py-[2px] underline"
                          >
                            Open in Google Maps
                          </a>
                        </h2>
                         
                         <h2><span className='font-bold uppercase pr-1'>pricePerUnit: </span> {order.listing[0].pricePerUnit} <span>&#8369;</span> /{order.listing[0].unit}/KM</h2>
                         <h2 className='flex justify-start items-center'><span className='font-bold uppercase pr-1 '>sellerDelivery: </span> 
                          {order.listing[0].sellerDelivery === true? <span className="text-primary font-semibold bg-slate-100 py-[1px] px-3 my-[1px] ">Available</span> : <span className="text-red-600 font-semibold bg-slate-100 py-1 px-3 ">Unavailable</span> }
                         </h2>
                         <h2 className='flex justify-start items-center'><span className='font-bold uppercase pr-1'>traderPickup: </span> 
                          {order.listing[0].traderPickup === true? <span className="text-primary font-semibold bg-slate-100 py-[1px] px-3 my-[1px]">Available</span> : <span className="text-red-600 font-semibold bg-slate-100 py-1 px-3 ">Unavailable</span> }  
                          </h2>
                          {
                            order.listing[0].shippingFee === 0?
                            (
                              <div className=""></div>
                            )
                            :
                            (
                              <h2><span className='font-bold uppercase pr-1'>shippingFee: </span> {order.listing[0].shippingFee}</h2>
    
                            )
                          }
                           <div className="w-full">
                         <h2><span className='font-bold uppercase pr-1'>discount: </span> {order.listing[0].discount} %</h2>
                         <h2><span className='font-bold uppercase pr-1'>category: </span> {order.listing[0].category}</h2>
                         <h2><span className='font-bold uppercase pr-1'>clusterName: </span> {order.listing[0].clusterName}</h2>
                      </div>
                         
                      </div>
                     
                     </div>
                      
                   </div>
               </div>
               <div className="w-full md:w-6/12">
                   <div className="px-0 md:px-5 py-2">
                       <div className="py-2 text-lg">
                           <h2>Trader And Shipping Info</h2>
                       </div>
     
                       <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md ">
                           <div className="flex gap-2">
                               <span>Name: </span>
                               <span>{order.shippingInfo.name}</span>
                           </div>
                           {/* <div className="flex gap-2">
                               <span>Phone: </span>
                               <span>{order.shippingInfo.phone}</span>
                           </div> */}
    
                           {/* <div className="flex gap-2 items-center">
                            <span>Phone: </span>
                            <span>{order.shippingInfo.phone}</span>
                            <button
                                onClick={() => copyToClipboard(order.shippingInfo.phone)}
                                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none"
                            >
                                Copy
                            </button>
                            {copied && (
                                <span className="text-green-500 text-sm ml-2">Copied!</span>
                            )}
                            </div> */}
    
                        <div className="flex gap-4 items-center">
                            <span>Phone: </span>
                            <span>{order.shippingInfo.phone}</span>
                            
                            {/* Copy Button */}
                            <button
                                onClick={() => copyToClipboard(order.shippingInfo.phone)}
                                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none"
                            >
                                Copy
                            </button>
                            
                            {/* Call Button */}
                            <a
                                href={`tel:${order.shippingInfo.phone}`}
                                className="md:hidden bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 focus:outline-none flex justify-center items-center gap-1"
                            >
                                Call
                                <FaPhoneSquare size={15}/>
                            </a>
                            
                            {/* Feedback Message */}
                            {copied && (
                                <span className="text-green-500 text-sm ml-2">Copied!</span>
                            )}
                        </div>
    
                           <div className="flex gap-2">
                               <span>Email Address: </span>
                               <div className="">
                               <span>{order.shippingInfo.email}</span>
                               </div>
                           </div>
                           <div className="flex gap-2">
                               <span>Shipment Choice: </span>
                               <span className='font-semibold text-green-500'>{order.shippingMethod}</span>
                           </div>
                       </div>
                   </div>
               </div>
               <div className="w-full pt-5 relative">
                  <div className="absolute bottom-0 left-0 right-0 flex justify-end px-2">
              <button onClick={initializeTransaction} className='bg-primaryDark px-4 py-1 rounded-sm font-bold flex justify-center items-center gap-2 hover:cursor-pointer group '>
                <FaChevronRight className="transition-transform duration-200 ease-in-out transform translate-x-[-5px] group-hover:translate-x-[3px]" />
                PROCEED
              </button>
            </div>
              </div>
     
     
               
           </div>
            
           
           
           : 
           <div className="w-full flex flex-wrap text-text_color ">  
           <div className="w-full">
             <h2 className='uppercase font-semibold'>Offer Info</h2>
             <div className="flex justify-between text-sm gap-2 p-4 bg-slate-800 rounded-md ">
                <div className="w-full">
                       <div className="flex gap-2">
                              <span>ID: </span>
                              <span>{order._id}</span>
                          </div>
                          <div className="flex gap-2">
                              <span>Email: </span>
                              <span>{order.shippingInfo.address}</span>
                          </div>      
                </div>
                <div className="w-full">
                         <div className="flex gap-2">
                              <span>Date: </span>
                              <span> {dateFormat(order.createdAt, "yyyy-mm-dd HH:MM:ss")}</span>
                             
                          </div>
                          <div className="flex gap-2">
                              <span>Listing Price: </span>
                              <span>{formatNumber(order.price)}</span>
                          </div> 
                          <div className="flex gap-2">
                              <span>Suggested Shipment price: </span>
                              <span>{formatNumber(order.shipping_fee)}</span>
                          </div> 
                    
                </div>
                          {/* <div className="flex gap-2">
                              <span>ID: </span>
                              <span>{order._id}</span>
                          </div>
                          <div className="flex gap-2">
                              <span>Email: </span>
                              <span>{order.dealId}</span>
                          </div> */}
                          
                        
           </div>
           </div> 
              <div className="w-full md:w-6/12">
                  <div className="px-0 md:px-5 py-2">
                      <div className="py-2 text-lg">
                          <h2>Listing Info</h2>
                      </div>
    
                      <div className="px-2 flex justify-between lg:flex-row flex-col gap-1">
                      <div className="w-full">
                         <h2><span className='font-bold uppercase pr-1'>Name: </span > {order.listing[0].name}</h2>
                         <h2><span className='font-bold uppercase pr-1'>price: </span> <span>&#8369;</span> {order.listing[0].price}/{order.listing[0].unit}</h2>
                         <h2><span className='font-bold uppercase pr-1'>expectedHarvestYield: </span> {order.listing[0].expectedHarvestYield} {order.listing[0].yieldUnit}</h2>
                         <h2><span className='font-bold uppercase pr-1'>totalPrice: </span> {formatNumber(order.listing[0].totalPrice)}</h2>
                         <h2><span className='font-bold uppercase pr-1'>description: </span> {order.listing[0].description}</h2>
                         <h2><span className='font-bold uppercase pr-1'>harvestStartDate: </span> {dateFormat((order.listing[0].harvestStartDate), "yyyy-mm-dd")}</h2>
                         <h2><span className='font-bold uppercase pr-1'>harvestEndDate: </span>{dateFormat((order.listing[0].harvestEndDate), "yyyy-mm-dd")}</h2>
                         <h2><span className='font-bold uppercase pr-1'>locationInfo: </span> {order.listing[0].locationInfo}</h2>
                         <h2 className='py-1'>
                          <span className="font-bold uppercase pr-1">mapsLink: </span>
                          <a 
                            href={order.listing[0].mapsLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-500 bg-slate-100 rounded-sm font-bold px-2 py-[2px] underline"
                          >
                            Open in Google Maps
                          </a>
                        </h2>
                         
                         <h2><span className='font-bold uppercase pr-1'>pricePerUnit: </span> {order.listing[0].pricePerUnit} <span>&#8369;</span> /{order.listing[0].unit}/KM</h2>
                         <h2 className='flex justify-start items-center'><span className='font-bold uppercase pr-1 '>sellerDelivery: </span> 
                          {order.listing[0].sellerDelivery === true? <span className="text-primary font-semibold bg-slate-100 py-[1px] px-3 my-[1px] ">Available</span> : <span className="text-red-600 font-semibold bg-slate-100 py-1 px-3 ">Unavailable</span> }
                         </h2>
                         <h2 className='flex justify-start items-center'><span className='font-bold uppercase pr-1'>traderPickup: </span> 
                          {order.listing[0].traderPickup === true? <span className="text-primary font-semibold bg-slate-100 py-[1px] px-3 my-[1px]">Available</span> : <span className="text-red-600 font-semibold bg-slate-100 py-1 px-3 ">Unavailable</span> }  
                          </h2>
                          {
                            order.listing[0].shippingFee === 0?
                            (
                              <div className=""></div>
                            )
                            :
                            (
                              <h2><span className='font-bold uppercase pr-1'>shippingFee: </span> {order.listing[0].shippingFee}</h2>
    
                            )
                          }
                          <div className="w-full">
                         <h2><span className='font-bold uppercase pr-1'>discount: </span> {order.listing[0].discount} %</h2>
                         <h2><span className='font-bold uppercase pr-1'>category: </span> {order.listing[0].category}</h2>
                         <h2><span className='font-bold uppercase pr-1'>clusterName: </span> {order.listing[0].clusterName}</h2>
                      </div>
                         
                      </div>
                      
                     </div>
                  </div>
              </div>
              <div className="w-full md:w-6/12">
                  <div className="px-0 md:px-5 py-2">
                      <div className="py-2 text-lg">
                          <h2>Trader And Shipping Info</h2>
                      </div>
    
                      <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md ">
                          <div className="flex gap-2">
                              <span>Name: </span>
                              <span>{order.shippingInfo.name}</span>
                              {/* <span>{seller.firstName} {seller.middleName} {seller.lastName}</span> */}
                          </div>
                          {/* <div className="flex gap-2">
                              <span>Phone: </span>
                              <span>{order.shippingInfo.phone}</span>
                          </div> */}
    
    
                        <div className="flex gap-4 items-center">
                            <span>Phone: </span>
                            <span>{order.shippingInfo.phone}</span>
                            
                            {/* Copy Button */}
                            <button
                                onClick={() => copyToClipboard(order.shippingInfo.phone)}
                                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none"
                            >
                                Copy
                            </button>
                            
                            {/* Call Button */}
                            <a
                                href={`tel:${order.shippingInfo.phone}`}
                                className="md:hidden bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 focus:outline-none flex justify-center items-center gap-1"
                            >
                                Call
                                <FaPhoneSquare size={15}/>
                            </a>
                            
                            {/* Feedback Message */}
                            {copied && (
                                <span className="text-green-500 text-sm ml-2">Copied!</span>
                            )}
                        </div>
    
    
    
                          <div className="flex gap-2">
                              <span>Address: </span>
                              <span>{order.shippingInfo.address}</span>
                              {/* <span>{seller.firstName} {seller.middleName} {seller.lastName}</span> */}
                          </div>
    
                       
                          <div className="flex gap-2">
                              <span>Location: </span>
                              <span>{order.shippingInfo.additionalLocationInfo} {order.shippingInfo.locationInfo}</span>
                              {/* <span>{seller.firstName} {seller.middleName} {seller.lastName}</span> */}
                          </div>
                          <div className="flex justify-center gap-1 py-1 items-end">    
                                <span className="text-sm">
                                {order.shippingInfo.mapsLink ? (
                                <a
                                    href={order.shippingInfo.mapsLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    OPEN IN GOOGLE MAP
                                </a>
                                ) : (
                                <p>No Google Map location Data Available</p>
                                )}
                            </span>
                        </div>
                          {/* <div className="flex gap-2">
                              <span>Address: </span>
                              <div className="">
                                <span>{order.shippingInfo.street}, {order.shippingInfo.barangay}, {order.shippingInfo.munCity}, {order.shippingInfo.province}</span>
                              </div>
                          </div> */}
                           <div className="flex gap-2">
                          <span>Shipment Distance: </span>
                          <span className='font-semibold text-green-500'>{order.shipping_distance} km</span>
                      </div>
                          <div className="flex gap-2">
                              <span>Shipment Choice: </span>
                              <span className='font-semibold text-green-500'>{order.shippingMethod}</span>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="w-full pt-5 relative">
                  <div className="absolute bottom-0 left-0 right-0 flex justify-end px-2">
              <button onClick={initializeTransaction} className='bg-primaryDark px-4 py-1 rounded-sm font-bold flex justify-center items-center gap-2 hover:cursor-pointer group '>
                <FaChevronRight className="transition-transform duration-200 ease-in-out transform translate-x-[-5px] group-hover:translate-x-[3px]" />
                PROCEED
              </button>
            </div>
              </div>
    
             
    
              
          </div>
          
           
           }
  

    
        
         
    
          
        </div>
    // </div>
          )}
        </div>
   
  )
}

export default Review