import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import { BsArrowBarDown } from 'react-icons/bs'
import { FaSortDown } from "react-icons/fa6";
import { useDispatch, useSelector, useStore } from 'react-redux'
import Pagination from '../Pagination';

import { get_admin_orders } from '../../store/Reducers/OrderReducer'


function Offers() {
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const {orders,totalOrder} = useSelector(state=>state.order)
    const [parPage, setParpage] = useState(5)

    const state = true
    const [show,setShow] = useState(false)


    useEffect(()=>{
        dispatch(get_admin_orders({
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }))
    },[searchValue, currentPage, parPage])
  return (
    
    <div className="px-2 lg:px-7 pt-5 text-text_color">
        <div className="w-full p-4 bg-[#283046] rounded-md">
            <div className="flex justify-between items-center w-full">
                <select onChange={(e)=>setParpage(parseInt(e.target.value))} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]'>
                    <option value="5">5</option>
                    <option value="5">15</option>
                    <option value="5">25</option>
                </select>
                <input className='w-full px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='search' />
            </div>
            <div className="relative mt-5 overflow-auto">
                <div className="w-full text-sm text-left">
                    <div className="text-sm text-[#d0d2d6]  uppercase border-b-2 border-slate-700">
                        <div className="flex justify-between items-start ">
                            <div className="py-3 md:w-[25%]">Offer ID</div>
                            <div className="py-3 md:w-[13%]">Current Price</div>
                            <div className="py-3 md:w-[18%]">Deal Status</div>
                            <div className="py-3 hidden md:block md:w-[18%]">Shipment Options</div>
                            <div className="py-3 md:w-[18%] ">Action</div>
                            {/* <div className="py-3 md:w-[8%]">
                                <FaSortDown />  
                            </div> */}
                        </div>
                    </div>
                    <div className="">
                        {
                            orders.map((o,i)=>
                                <div key={i} className="flex justify-between items-start border-b border-slate-700">
                                    <div className="py-4 px-1 md:w-[25%] font-medium whitespace-nowrap">{o._id}</div>
                                    <div className="py-4 px-1 md:w-[13%] font-medium whitespace-nowrap"><span className='font-bold text-[#A9F072] pr-1'>&#8369;</span>{o.price}</div>
                                    <div className="py-4 px-1 md:w-[18%] font-medium whitespace-nowrap">{o.shipPickUpStatus}</div>
                                    <div className="py-4 px-1 hidden md:block md:w-[18%] font-medium whitespace-nowrap">{o.shippingChoice}</div>
                                    <div className="py-4 px-1 md:w-[18%] font-medium whitespace-nowrap">
                                    {/* <Link to='details/1'>view</Link> */}
                                    <Link to={`/admin/dashboard/offers/details/${o._id}`}>view</Link>
                                    </div>
                                    {/* <div onClick={(e)=>setShow(!show)} className="py-3 w-[8%]">
                                    <FaSortDown />  
                                </div> */}
                            </div>
                            
                            
                            )
                        }
                       
                    </div>
                </div>

            </div>
           <div className="w-full flex justify-end mt-4 bottom-4 right-4">

           {
                           totalOrder <= parPage ? "" :
                            <Pagination
                            pageNumber = {currentPage}
                            setPageNumber = {setCurrentPage}
                            totalItem = {totalOrder}
                            parPage = {parPage}
                            showItem = {4}
                        />
                        }
                {/* <Pagination
                        pageNumber = {currentPage}
                        setPageNumber = {setCurrentPage}
                        totalItem = {50}
                        parPage = {parPage}
                        showItem = {4}
                    /> */}
           </div>
       </div>
    </div>
  )
}

export default Offers