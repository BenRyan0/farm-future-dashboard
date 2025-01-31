import React ,{useEffect, useState} from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import Pagination from '../Pagination';
import { BsImage } from 'react-icons/bs';
import { IoClose } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import {get_active_traders} from '../../store/Reducers/adminReducer_'
import { useDispatch, useSelector } from 'react-redux';
import { FaEye } from "react-icons/fa";

const Sellers = () => {
    const dispatch= useDispatch()
    const {userInfo} = useSelector(state=>state.auth)
    const {traders, totalTraders} = useSelector(state=>state.admin)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParpage] = useState(4)
    // const [show,setShow] = useState(false)

    useEffect(()=>{
        const obj = {
            parPage : parseInt(parPage), 
            page : parseInt(currentPage), 
            searchValue
        }
        dispatch(get_active_traders(obj))
    },[searchValue, currentPage, parPage])

    
  return (
    <div className='px-2 lg:px-7 pt-5'>
         <div className="w-full p-4 bg-[#283046] rounded-md">
            <div className="flex justify-between items-center w-full">
                        <select onChange={(e)=>setParpage(parseInt(e.target.value))} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]'>
                            <option value="5">5</option>
                            <option value="5">15</option>
                            <option value="5">25</option>
                        </select>
                    <input value={searchValue} onChange={e=>setSearchValue(e.target.value)} className=' px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='search' />
            </div>

            <div className="relative overflow-x-auto">
                        <table className='w-full text-sm text-left text-[#d0d2d6]'>
                            <thead className='text-xs text-[#d0d2d6] uppercase border-b border-slate-700'>
                            <tr>
                                <th scope='col' className='py-3 px-4'>Name</th>
                                <th scope='col' className='py-3 px-4'>Email</th>
                                <th scope='col' className='py-3 px-4'>Phone</th>
                                <th scope='col' className='py-3 px-4'>Status</th>
                                <th scope='col' className='py-3 px-4'>Action</th>
                            </tr>

                            </thead>
                            <tbody className='text-xs'>
                            {
                            traders.map((t,i)=> 
                            <tr key={i}>
                            <td className='py-3 px-4 font-medium whitespace-nowrap'>{t.name}</td>
                            <td className='py-3 px-4 font-medium whitespace-nowrap'>{t.email}</td>
                            <td className='py-3 px-4 font-medium whitespace-nowrap'>{t.phone}</td>
                            <td className='py-3 px-4 font-medium whitespace-nowrap'>{t.status}</td>
                            {/* <td className='py-3 px-4 font-medium whitespace-nowrap'><span className='pr-2 text-[#A5F17A]'>&#8369;</span>{d.listing[0].price}/{d.listing[0].unit}</td> */}
                            {/* <td className='py-3 px-4 font-medium whitespace-nowrap'><span className='pr-2 text-[#A5F17A]'>&#8369;</span>{d.listing[0].expectedHarvestYield}/{d.listing[0].yieldUnit}</td> */}
                            {/* <td className='py-3 px-4 font-medium whitespace-nowrap'>{d.shippingMethod}</td> */}
                            {/* <td className='py-3 px-4 font-medium whitespace-nowrap'>{d.shipPickUpStatus}</td> */}
                        
                            <td className='py-3 px-4 font-medium whitespace-nowrap'>
                                {/* <Link to={`/admin/dashboard/trader/details/${t._id}`} className='p-2 bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><IoEyeSharp />view</Link> */}
                                <Link to={`/admin/dashboard/trader/details/${t._id}`} className='p-2 w-[80px] bg-accent/40 rounded hover:shadow-md hover:shadow-accent/20 flex justify-center items-center gap-1'> View <FaEye size='15px'/></Link>
                            </td>
                            </tr>
                            ) }
                            </tbody>
                        </table>
                    </div>   

                    <div className="mt-5">
                        {/* <span className='bg-primaryDark text-slate-100 px-3 py-2 rounded-md font-semibold'><Link to={`/admin/dashboard/traders/add-trader`}>Add A new Trader</Link></span> */}
                    </div>
                    <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                        {
                            totalTraders <= parPage ? "" :
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

export default Sellers