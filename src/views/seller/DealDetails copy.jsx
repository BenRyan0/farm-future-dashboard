import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { messageClear,get_seller_order  } from '../../store/Reducers/OrderReducer'
import { Toaster } from 'react-hot-toast'
import dateFormat, { masks } from "dateformat";



const DealDetails = () => {
  const dispatch = useDispatch()
  const {dealId} = useParams()
  const [status, setStatus] = useState('')
  const {seller, totalSellers,} = useSelector(state=>state.seller)
  const {successMessage, errorMessage, order} = useSelector(state=>state.order)


  let orderId = dealId
//   useEffect(()=>{
//     dispatch(get_seller(sellerId))
// }, [sellerId])

console.log(orderId)

const submit = (e) => {
  e.preventDefault()
  // dispatch(seller_status_update({
  //     sellerId,
  //     status
  // }))
}

useEffect(() => {
  dispatch(get_seller_order(orderId))
}, [orderId])

// useEffect(() => {
//   if (successMessage) {
//       toast.success(successMessage)
//       dispatch(messageClear())
//   }else{
//       toast.error(errorMessage)
//       dispatch(messageClear())
//   }
// }, [successMessage])

useEffect(() => {
  if (seller) {
      setStatus(seller.status)
  }
}, [seller])

const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US').format(num);
};
  return (
    <div className='px-2 lg:px-7 pt-5'>
    <div className="w-full p-4 bg-[#283046] rounded-md">
       <div className="w-full flex flex-wrap text-text_color ">  
        <div className="w-full">
          <h2 className='uppercase font-semibold'>Offer Info</h2>
          <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md ">
                       <div className="flex gap-2">
                           <span>ID: </span>
                           <span>{order._id}</span>
                       </div>
                       <div className="flex gap-2">
                           <span>Email: </span>
                           <span>{order.dealId}</span>
                       </div>
                       {/* <div className="flex gap-2">
                           <span>Role: </span>
                           <span>{seller.role}</span>
                       </div>
                       <div className="flex gap-2">
                           <span>Status: </span>
                           <span className='font-semibold text-green-500'>{seller.status}</span>
                       </div>
                       <div className="flex gap-2">
                           <span>Payment Account: </span>
                           <span className='font-semibold text-green-500'>{seller.payment}</span>
                       </div> */}
        </div>
        </div> 
           <div className="w-full lg:w-4/12">
               <div className="px-0 md:px-5 py-2">
                   <div className="py-2 text-lg">
                       <h2>Listing Info</h2>
                   </div>

                   <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md ">
                       <div className="flex gap-2">
                           <span>Name: </span>
                           <span>{order.listing[0].name}</span>
                       </div>
                       <div className="flex gap-2">
                           <span>Cluster Name: </span>
                           <span>{order.listing[0].clusterName}</span>
                       </div>
                       <div className="flex flex-col border-y py-1 text-base">
                       {/* <h2>Pricing Info</h2> */}
                          <div className="pl-1">
                            <div className="">
                             <h2>Price: {order.listing[0].price}/{order.listing[0].unit} 
                                 <span className="">&#64;</span>
                                   {order.listing[0].expectedHarvestYield}{order.listing[0].yieldUnit}
                              </h2>
                            </div>

                            <div className="">
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
                                      <span className="px-1">&#8369;</span>
                                      {order.listing[0].shippingFee} 
                                  </h2> : ''
                                  }
                            </div>
                         
                          </div>
                           {/* <span>Cluster Name: </span>
                           <span>{order.listing[0].clusterName}</span> */}
                       </div>
                       <div className="flex gap-2">
                           <span>Harvest Start Date: </span>
                           <span>{dateFormat((order.listing[0].harvestStartDate), "yyyy-mm-dd")}</span>
                           {/* <span>{order.listing[0].harvestStartDate}</span> */}
                       </div>
                       <div className="flex gap-2">
                           <span>Harvest End Date: </span>
                           <span>{dateFormat((order.listing[0].harvestEndDate), "yyyy-mm-dd")}</span>
                           {/* <span>{order.listing[0].harvestStartDate}</span> */}
                       </div>
                      
                       <div className="flex gap-2">
                           <span>Payment Account: </span>
                           <span className='font-semibold text-green-500'>{seller.payment}</span>
                       </div>
                   </div>
               </div>
           </div>

           <div className="w-full md:w-4/12">
               <div className="px-0 md:px-5 py-2">
                   <div className="py-2 text-lg">
                       <h2>Trader Info</h2>
                   </div>

                   <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md ">
                       <div className="flex gap-2">
                           <span>Name: </span>
                           <span>{seller.firstName} {seller.middleName} {seller.lastName}</span>
                       </div>
                       <div className="flex gap-2">
                           <span>Email: </span>
                           <span>{seller.email}</span>
                       </div>
                       <div className="flex gap-2">
                           <span>Role: </span>
                           <span>{seller.role}</span>
                       </div>
                       <div className="flex gap-2">
                           <span>Status: </span>
                           <span className='font-semibold text-green-500'>{seller.status}</span>
                       </div>
                       <div className="flex gap-2">
                           <span>Payment Account: </span>
                           <span className='font-semibold text-green-500'>{seller.payment}</span>
                       </div>
                   </div>
               </div>
           </div>
           <div className="w-full md:w-4/12">
               <div className="px-0 md:px-5 py-2">
                   <div className="py-2 text-lg">
                       <h2>Shipping Info</h2>
                   </div>

                   <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md ">
                       <div className="flex gap-2">
                           <span>City: </span>
                           <span>City01 </span>
                       </div>
                       <div className="flex gap-2 ">
                           <span>Municipality:</span>
                           <span>{seller.associationloc_municipalitycity}</span>
                       </div>
                       <div className="flex gap-2">
                           <span>Barangay: </span>
                           <span>{seller.associationloc_barangay}</span>
                       </div>
                       <div className="flex gap-2">
                           <span>Street: </span>
                           <span>{seller.associationloc_street} </span>
                       </div>
                       <div className="flex gap-2">
                           <span>Province: </span>
                           <span>{seller.associationloc_province} </span>
                       </div>
                      
                   </div>
               </div>
           </div>
       </div>

       <div className="">
           <form action="" onSubmit={submit}>
               <div className="flex gap-4 py-3">
                   <select value={status} onChange={(e) => setStatus(e.target.value)}  className='px-4 py-1 focus:border-accent outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' typeof='file' name="" id="">
                       <option value="">--select status</option>
                       <option value="active">Accept</option>
                       <option value="deactive">Reject</option>
                   </select>
                   <button className='bg-accent w-[300px] hover:shadow-accent/50 hover:shadow-md text-[#161D31] rounded-md px-7 py-2 font-semibold'>Submit</button>
               </div>
           </form>
       </div>
    </div>
</div>
  )
}

export default DealDetails