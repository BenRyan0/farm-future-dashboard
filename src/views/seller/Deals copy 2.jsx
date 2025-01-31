import React, { useEffect, useState } from 'react'
import Search from '../components/Search'
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa6";
import Pagination from '../Pagination'
import { useDispatch, useSelector, useStore } from 'react-redux'

import { get_seller_orders } from '../../store/Reducers/OrderReducer'

const Deals = () => {
const dispatch = useDispatch()
const {userInfo} = useSelector(state=>state.auth)
const {myOrders,totalOrder} = useSelector(state=>state.order)
const dealId = 10
const [currentPage, setCurrentPage] = useState(1)
const [searchValue, setSearchValue] = useState('')
const [parPage, setParpage] = useState(5)

useEffect(()=>{
  dispatch(get_seller_orders({
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
      sellerId : userInfo._id
  }))
},[searchValue, currentPage, parPage])


  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className="w-full p-4 bg-[#283046] rounded-md ">
         {/* <Search setParpage={setParpage} setSearchValue={setSearchValue} searchValue={searchValue}/> */}
         <input value={searchValue} onChange={e=>setSearchValue(e.target.value)} className=' px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='search' />
         <div className="relative overflow-x-auto">
                  <table className='w-full text-sm text-left text-[#d0d2d6]'>
                    <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
                      <tr>
                        <th scope='col' className='py-3 px-4'>Name</th>
                        <th scope='col' className='py-3 px-4'>Price</th>
                        <th scope='col' className='py-3 px-4'>Expected Yield</th>
                        <th scope='col' className='py-3 px-4'>Delivery Method</th>
                        <th scope='col' className='py-3 px-4'>Status</th>
                        <th scope='col' className='py-3 px-4'>Action</th>
                      </tr>
    
                    </thead>
                    <tbody>
                     {
                      myOrders.map((d,i)=> 
                      <tr key={i}>
                      <td className='py-3 px-4 font-medium whitespace-nowrap'>{d.listing[0].name}</td>
                      <td className='py-3 px-4 font-medium whitespace-nowrap'><span className='pr-2 text-[#A5F17A]'>&#8369;</span>{d.listing[0].price}/{d.listing[0].unit}</td>
                      <td className='py-3 px-4 font-medium whitespace-nowrap'><span className='pr-2 text-[#A5F17A]'>&#8369;</span>{d.listing[0].expectedHarvestYield}/{d.listing[0].yieldUnit}</td>
                      <td className='py-3 px-4 font-medium whitespace-nowrap'>{d.shippingChoice}</td>
                      <td className='py-3 px-4 font-medium whitespace-nowrap'>{d.shipPickUpStatus}</td>
                  
                      <td className='py-3 px-4 font-medium whitespace-nowrap '>
                           <Link to={`/seller/dashboard/deals/details/${d._id}`} className='p-2 w-[80px] bg-accent/40 rounded hover:shadow-md hover:shadow-accent/20 flex justify-center items-center gap-1'> View <FaEye size='15px'/></Link>
                      </td>
                    </tr>
                    ) }
                    </tbody>
    
                  </table> 
              </div>
              <div className="w-full flex justify-end mt-4 bottom-4 right-4">
              {
                            totalOrder <= parPage ? "" :
                            <Pagination
                            pageNumber = {currentPage}
                            setPageNumber = {setCurrentPage}
                            totalItem = {50}
                            parPage = {parPage}
                            showItem = {4}
                        />
                        }
                </div>
        </div>
    </div>
  )
}

export default Deals