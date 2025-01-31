import React ,{useEffect, useState} from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import Pagination from '../Pagination';
import { BsImage } from 'react-icons/bs';
import { IoClose } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import {get_active_sellers} from '../../store/Reducers/sellerReducer'
import { useDispatch, useSelector } from 'react-redux';

const Sellers = () => {
    const dispatch= useDispatch()
    const {userInfo} = useSelector(state=>state.auth)
    const {sellers, totalSeller} = useSelector(state=>state.seller)
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
        dispatch(get_active_sellers(obj))
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
                                <th scope='col' className='py-3 px-4'>No</th>
                                <th scope='col' className='py-3 px-4'>Image</th>
                                <th scope='col' className='py-3 px-4'>Name</th>
                                <th scope='col' className='py-3 px-4'>Shop Name</th>
                                <th scope='col' className='py-3 px-4'>Status</th>
                                <th scope='col' className='py-3 px-4'>Email</th>
                                {/* <th scope='col' className='py-3 px-4'>Division</th>
                                <th scope='col' className='py-3 px-4'>District</th> */}
                                <th scope='col' className='py-3 px-4'>Action</th>
                            </tr>

                            </thead>
                            <tbody className='text-xs'>
                                {
                                    sellers.map((d,i)=> 
                                        <tr key={i}>
                                            <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'></td>
                                            <td  scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>
                                                <img className='h-[90px] w-[90px] rounded-md py-1 obj' src={d.profileImage} alt="" />
                                            </td>
                                            <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>
                                                <span>{d.firstName} {d.lastName}</span>
                                            </td>
                                            <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>
                                                <span>{d.associationName}</span>
                                            </td>
                                            <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>
                                                <span className='text-green-400 font-semibold`'>{d.status}</span>
                                            </td>
                                            <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>
                                                <span>{d.email}</span>
                                            </td>
                                            {/* <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>
                                                <span>Division02</span>
                                            </td>
                                            <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>
                                                <span>District02</span>
                                            </td> */}
                                            <td scope='row' className='py-1aaaaa px-4 font-medium whitespace-nowrap'>
                                               <div className="flex justify-start items-center gap-4">
                                                    <Link to={`/admin/dashboard/seller/details/${d._id}`} className='p-2 bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><IoEyeSharp /></Link>
                                                    {/* <Link className='p-2 bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'><FaTrash/></Link> */}
                                               </div>
                                            </td>
                                        </tr>
                                ) }
                            </tbody>
                        </table>
                    </div>   
                    <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                        {
                            totalSeller <= parPage ? "" :
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