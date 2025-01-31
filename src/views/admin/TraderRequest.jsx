import React ,{useEffect, useState} from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import Pagination from '../Pagination';
import { BsImage } from 'react-icons/bs';
import { IoClose } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';


// import { useDispatch, useSelector } from 'react-redux';
import {get_seller_request,get_trader_request} from '../../store/Reducers/sellerReducer'
import Search from './../components/Search';



const TraderRequest = () => {
    const dispatch = useDispatch()
    const {userInfo} = useSelector(state=>state.auth)
    const {sellers, totalSellers, traders, totalTraders} = useSelector(state=>state.seller)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [parPage, setParpage] = useState(5)
  const [show,setShow] = useState(false)
  


  useEffect(()=>{
    dispatch(get_trader_request({
        parPage,
        searchValue,
        page: currentPage
    }))
  },[parPage, searchValue])
  return (
    <div className='px-2 lg:px-7 pt-5'>
    <div className="w-full p-4 bg-[#283046] rounded-md">
    <Search setParpage={setParpage} setSearchValue={setSearchValue} searchValue={searchValue}/>


       <div className="relative overflow-x-auto">
                   <table className='w-full text-sm text-left text-[#d0d2d6]'>
                       <thead className='text-xs text-[#d0d2d6] uppercase border-b border-slate-700'>
                       <tr>
                           <th scope='col' className='py-3 px-4'>No</th>
                           <th scope='col' className='py-3 px-4'>Name</th>
                           <th scope='col' className='py-3 px-4'>Email</th>
                           {/* <th scope='col' className='py-3 px-4'>Payments Status</th> */}
                           <th scope='col' className='py-3 px-4'>Status</th>
                           <th scope='col' className='py-3 px-4'>Action</th>
                          
                       </tr>

                       </thead>
                       <tbody className='text-xs'>
                           {
                              traders.map((d,i)=> 
                                   <tr className='border-b border-slate-700 py-1' key={i}>
                                       <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>{i + 1}</td>
                  
                                       <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>
                                           <span>{d.firstName} {d.lastName}</span>
                                       </td>
                                       <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>
                                           <span className='font-medium`'>{d.email}</span>
                                       </td>
                                       {/* <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>
                                           <span className='text-orange-400 font-semibold`'>{d.payment}</span>
                                       </td> */}
                                       <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>
                                           <span className='text-orange-400 font-semibold`'>{d.status}</span>
                                       </td>
                                       <td scope='row' className='py-1aaaaa px-4 font-medium whitespace-nowrap'>
                                          <div className="flex justify-start items-center gap-4">
                                               <Link to={`/admin/dashboard/trader/details/${d._id}`}  className='p-2 bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><IoEyeSharp /></Link>
                                               {/* <Link className='p-2 bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'><FaTrash/></Link> */}
                                          </div>
                                       </td>
                                   </tr>
                           ) }
                       </tbody>
                   </table>

               </div>
               
               {
                totalTraders > parPage && ( // Render only if totalSellers is greater than parPage
                    <div className="w-full flex justify-between mt-4 bottom-4 right-4 px-3">
                    {/* <a
                        href=""
                        className="bg-primaryDark px-2 py-1 text-center text-[15px] rounded-md text-md font-semibold text-white border-2"
                    >
                        Add a new Seller
                    </a> */}
                    <Pagination
                        pageNumber={currentPage}
                        setPageNumber={setCurrentPage}
                        totalItem={totalSellers}
                        parPage={parPage}
                        showItem={4}
                    />
                    </div>
                )
                }
   
              {/* {
                totalSellers <= parPage ? "" :
                <div className="w-full flex justify-between mt-4 bottom-4 right-4 px-3">
                <a href="" className='bg-primaryDark px-2 py-1 text-center text-[15px] rounded-md text-md font-semibold text-white border-2'>Add a new Seller</a>
                <Pagination
                        pageNumber = {currentPage}
                        setPageNumber = {setCurrentPage}
                        totalItem = {totalSellers}
                        parPage = {parPage}
                        showItem = {4}
                    />
                    </div>
              }
               */}
    </div>
</div>
  )
}

export default TraderRequest