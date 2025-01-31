import React, {useState} from 'react'
import Search from '../components/Search'
import Pagination from '../Pagination'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { BsImage } from 'react-icons/bs';
import { IoClose } from "react-icons/io5";
import { FaEye } from "react-icons/fa6";

const DiscountedListings = () => {
const [currentPage, setCurrentPage] = useState(1)
const [searchValue, setSearchValue] = useState('')
const [parPage, setParpage] = useState(5)
  return (
    <div className='px-2 lg:px-7 pt-5'>
    <div className="w-full p-4 bg-[#283046] rounded-md ">
        <Search setParpage={setParpage} setSearchValue={setSearchValue} searchValue={searchValue}/>
        
        <div className="relative overflow-x-auto">
                    <table className='w-full text-sm text-left text-[#d0d2d6]'>
                        <thead className='text-sm font-semibold text-[#d0d2d6] uppercase border-b border-slate-700'>
                        <tr>
                            <th scope='col' className='py-3 px-4'>No</th>
                            <th scope='col' className='py-3 px-4'>Image</th>
                            <th scope='col' className='py-3 px-4'>Name</th>
                            <th scope='col' className='py-3 px-4'>Category</th>
                            <th scope='col' className='py-3 px-4'>price</th>
                            <th scope='col' className='py-3 px-4'>Unit</th>
                            <th scope='col' className='py-3 px-4'>Expected Yield</th>
                            <th scope='col' className='py-3 px-4'>Expected Harvest Date</th>
                            <th scope='col' className='py-3 px-4'>Delivery Options</th>
                            <th scope='col' className='py-3 px-4'>Description</th>
                        </tr>

                        </thead>
                        <tbody>
                            {
                                [1,2,3,4].map((d,i)=> 
                                    <tr key={i}>
                                        <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{d}</td>
                                        <td  scope='row' className='py-1aaaaa px-4 font-medium whitespace-nowrap'>
                                            <img className='h-[90px] w-[90px] py-1' src={`/images/category/${d}.jpg`} alt="" />
                                        </td>
                                        <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                            <span>160 Rice</span>
                                        </td>
                                        <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                            <span>Crops</span>
                                        </td>
                                        <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                            <span>30</span>
                                        </td>
                                        <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                            <span>kg</span>
                                        </td>
                                        <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                            <span>kg 1000</span>
                                        </td>
                                        <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                            <span>01/01/2024 - 02/02/2024</span>
                                        </td>
                                        <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                            <span>COD and COP</span>
                                        </td>
                                        <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                            <span>Description</span>
                                        </td>
                                        <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                           <div className="flex justify-start items-center gap-4">
                                                <Link className='p-2 bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit size='15px'/></Link>
                                                <Link className='p-2 bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><FaEye size='15px'/></Link>
                                                <Link className='p-2 bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'><FaTrash size='15px'/></Link>
                                           </div>
                                        </td>
                                    </tr>
                            ) }
                        </tbody>
                    </table>
                </div>   
                <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                     <Pagination
                        pageNumber = {currentPage}
                        setPageNumber = {setCurrentPage}
                        totalItem = {50}
                        parPage = {parPage}
                        showItem = {4}
                    />
                </div>
    </div>
</div>
  )
}

export default DiscountedListings