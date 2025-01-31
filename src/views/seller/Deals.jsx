import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"; // Import the up arrow
import { useDispatch, useSelector } from 'react-redux';
import { get_seller_orders } from '../../store/Reducers/OrderReducer';
import Pagination from '../Pagination';
import dateFormat, { masks } from "dateformat";
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { FaExclamation } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

const Deals = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const { myOrders, totalOrder } = useSelector(state => state.order);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [parPage, setParpage] = useState(5);
  const [show, setShow] = useState(null); // Track which order's details to display

  useEffect(() => {
    dispatch(get_seller_orders({
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
      sellerId: userInfo._id
    }));
  }, [searchValue, currentPage, parPage, dispatch, userInfo._id]);

  // useEffect(() =>{
  //   dispatch(get_seller_orders({
  //     parPage: parseInt(parPage),
  //     page: parseInt(currentPage),
  //     searchValue : '',
  //     sellerId: userInfo._id
  //   }));
  // })

  // Toggle order details visibility
  const toggleShow = (orderId) => {
    setShow(prevShow => (prevShow === orderId ? null : orderId)); // Toggle the visibility
  };

  return (
    <div className='px-2 lg:px-7 pt-5'>
      
      <div className="w-full p-4 bg-[#283046] rounded-md">
        {/* <input
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          className=' px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]'
          type="text"
          placeholder='search'
        /> */}
       {
        myOrders.length > 0 ?
        ( <div className="relative overflow-x-auto">
          {myOrders.map((order) => (
           
            <div key={order.listing._id} className='text-[#d0d2d6]'>
            {/* <h2>{order.listing._id}</h2> */}
              <div className='flex justify-between items-start border-b border-slate-700'>
                <div className='py-4 w-[80%] font-medium whitespace-nowrap flex md:flex-row justify-between gap-2 md:items-center flex-col items-start'>
                  <div className="w-full flex flex-row gap-2">
                    <span>{order.listing.name}</span>
                    <div className="">
                      <span>{order.listing.price}/{order.listing.unit}</span>
                      <span className='pl-2'>&#64;</span>
                      <span>{order.listing.expectedHarvestYield}{order.listing.yieldUnit}</span>
                    </div>

                  </div>
                  <div className="w-full flex flex-row gap-2  pl-0 md:pl-10 ">
                    <div className="bg-primaryDark px-3 py-1 rounded-sm">
                      <span>{dateFormat((order.listing.harvestStartDate), "yyyy-mm-dd")}  - {dateFormat((order.listing.harvestEndDate), "yyyy-mm-dd")}</span>
                    </div>
                  </div>
                  <div className="w-full flex flex-row gap-2  pl-0 md:pl-10 ">
                    {
                      order.listing.isAvailable? 
                      <div className="bg-orange-500 px-3 py-1 rounded-sm flex justify-center items-center gap-1">
                       <span><FaExclamation /></span>
                      <span>No offers Confirmed</span>
                    </div> 
                    : 
                     <div className="bg-primaryDark px-3 py-1 rounded-sm flex justify-center items-center gap-1">
                       <span><FaCheckCircle /></span>
                     <span>1 Offer Confirmed</span>
                   </div>
                    }
                   
                  </div>
               
                
                </div>

                
                {/* Arrow button to toggle order details visibility */}
                <div onClick={() => toggleShow(order.listing._id)} className='py-4 cursor-pointer w-[8%]'>
                  {show === order.listing._id ? (
                    <MdKeyboardArrowUp />  // Show up arrow when details are visible
                  ) : (
                    <MdKeyboardArrowDown />  // Show down arrow when details are hidden
                  )}

                </div>
              </div>
              {/* Render details for the clicked order only */}
              {show === order.listing._id && (
                <div className='border-b border-slate-700 bg-slate-800 '>
                    {/* <div className="btn-group pull-right {this.props.showBulkActions ? 'show' : 'hidden'}"> */}
                  {order.orders.map((so) => (
                    
                    <div className={
                      "flex justify-between items-center border-b border-slate-700 pl-2 gap-3 py-2 text-white " + 
                      (so.shipPickUpStatus === "pending" 
                        ? ' ' // Apply a different class for "delivered"
                        : ["confirmed", "delivered", "shipped"].includes(so.shipPickUpStatus) 
                          ? ' bg-primary/50 '
                          : ' text-slate-700') 
                      }>
                      
                      <div className="w-full flex gap-5">
                        <span>{so.shippingMethod}</span>
                        {
                          so.shipping_distance === 0? 
                          ''
                          :
                          <span>{so.shipping_distance} km</span>
                        }
                        
                   
                        <span className='hidden md:block'>{so.shippingInfo.name}</span>
                        <span  className='hidden md:block'>{so.shippingInfo.email}</span>
                        <span>{so.shipPickUpStatus}</span>
                      </div>
                     
                      <div className={"w-full flex justify-end pr-4 md:pr-20 " + 
                         (so.shipPickUpStatus === "pending" 
                          ? ' ' // Apply a different class for "delivered"
                          : ["delivered", "shipped"].includes(so.shipPickUpStatus) 
                            ? '  '
                            : ' hidden') 
                          
                      }>
                      {/* <div className={"w-full flex justify-end pr-4 md:pr-20 " + (["confirmed","completed", "shipped"].includes(so.shipPickUpStatus) ? '  ' : ' hidden')}> */}
                      <Link to={`/seller/dashboard/deals/details/${so._id}`} className='p-2 w-[80px] bg-accent/40 rounded hover:shadow-md hover:shadow-accent/20 flex justify-center items-center gap-1'> View <FaEye size='15px'/></Link>
                      </div>
                      <div className={"w-full flex justify-end pr-4 md:pr-20 " + 
                         (so.shipPickUpStatus === "confirmed" 
                          ? ' ' // Apply a different class for "delivered"
                          : ["confirmed","received"].includes(so.shipPickUpStatus) 
                            ? '  '
                            : ' hidden') 
                          
                      }>
                      {/* <div className={"w-full flex justify-end pr-4 md:pr-20 " + (["confirmed","completed", "shipped"].includes(so.shipPickUpStatus) ? '  ' : ' hidden')}> */}
                      <Link to={`/seller/dashboard/deal/transaction-progress/${so._id}/${so._id}`} className='py-2 px-6  bg-accent/40 rounded hover:shadow-md hover:shadow-accent/20 flex justify-center items-center gap-1'> PROCEED <FaChevronRight size='15px'/></Link>
                      {/* <Link to={`/seller/dashboard/deals/details/${so._id}`} className='py-2 px-6  bg-accent/40 rounded hover:shadow-md hover:shadow-accent/20 flex justify-center items-center gap-1'> PROCEED <FaChevronRight size='15px'/></Link> */}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>)
        :
        (
          <div className="w-full text-center py-10">
            <h2 className='text-xl font-semibold text-slate-100'>NO OFFERS MADE YET</h2>
          </div>
        )
       }
        <div className="w-full flex justify-end mt-4 bottom-4 right-4">
          {totalOrder <= parPage ? "" :
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={50}
              parPage={parPage}
              showItem={4}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default Deals;
