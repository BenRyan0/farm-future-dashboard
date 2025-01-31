import React ,{useEffect, useState} from 'react'
import Search from '../components/Search'
import Pagination from '../Pagination'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { BsImage } from 'react-icons/bs';
import { IoClose } from "react-icons/io5";
import { FaEye } from "react-icons/fa6";
import {useSelector, useDispatch} from 'react-redux'
import { get_listings,takedown_listing,messageClear} from '../../store/Reducers/listingReducer';
import DaysCounter from '../components/listings/DaysCounter'

import { FaHeart } from "react-icons/fa";
import { RiEyeFill } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { FaTruckLoading } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { RiPlayListAddFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { PiStackPlusFill } from "react-icons/pi";
import { BsBoxSeamFill } from "react-icons/bs";
import { FaHourglassStart } from "react-icons/fa6";
import dateFormat, { masks } from "dateformat";
import { RiEdit2Fill } from "react-icons/ri";
import { FaThList } from "react-icons/fa";
import toast from 'react-hot-toast'




const Listings = () => {
  const now = new Date();

const dispatch = useDispatch()

const { listings, totalListings,  errorMessage, successMessage } = useSelector(state=>state.listing)

const [harvest, setHarvest] = useState('')
const harvestStartDate = listings.harvestStartDate;

const [currentPage, setCurrentPage] = useState(1)
const [searchValue, setSearchValue] = useState('')
const [parPage, setParpage] = useState(6)


useEffect(()=>{
    const obj = {
        parPage : parseInt(parPage),
        page : parseInt(currentPage),
        searchValue

    }
    dispatch(get_listings(obj))
}, [searchValue, currentPage, parPage])


useEffect(() => {
  if (errorMessage) {
    toast.error(errorMessage);
    dispatch(messageClear());
  } else if (successMessage) {
    toast.success(successMessage);
    dispatch(messageClear());
    window.location.reload();  // This will reload the page
  }
}, [successMessage, errorMessage]);


  return (
   <div className='px-2 lg:px-7 pt-5'>
 
        <div className="w-full p-4 bg-[#283046] rounded-md ">
            <Search setParpage={setParpage} setSearchValue={setSearchValue} searchValue={searchValue}/>
            
            <div className="w-full grid grid-cols-1 md-lg:grid-cols-2 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 py-5">
        {
           listings.map((listings, i) => <div className="border group transition-all duration-500 hover:shadow-md hover:-translate-y-2 rounded-md bg-lightBeige/90">
            <div className="relative overflow-hidden">
              <div className="flex flex-col gap-2 justify-start items-start absolute w-[80px] h-[200px] font-semibold text-xs left-2 top-2 transition-all duration-700 z-50">
              <ul className='flex transition-all duration-700 left-1 top-6 justify-center items-center absolute w-[80px] opacity-0 group-hover:left-[66px] group-hover:w-[90px] group-hover:opacity-100'>
                <Link className='w-full py-2 px-0 z-0 cursor-pointer flex justify-end pr-1 items-center rounded-md text-primaryDark transition-all bg-white text-end'>
                  <h1>Till Harvest</h1>
                </Link>
              </ul>
                <DaysCounter 
                className="" 
                startDate={dateFormat((listings.harvestStartDate), "yyyy-mm-dd")}  
                endDate={dateFormat((listings.harvestEndDate), "yyyy-mm-dd")}  
                createdAt={dateFormat((listings.createdAt), "yyyy-mm-dd")}  
                currentDate={dateFormat((now), "yyyy-mm-dd")} 
                />
              
           

                {/* <DaysCounter className="" endDay={dateFormat((now), "d")} daysConsumed={dateFormat((listings.harvestStartDate), "d")} /> */}
            
                {/* <DaysCounter className="" endDay={endDay} daysConsumed={daysConsumed} /> */}
              </div>

              {/* <div className="flex justify-center items-center absolute w-[70px] h-[70px] rounded-full font-semibold text-xs left-2 top-24 bg-white/40">
              <DaysCounter className="" endDay={dateFormat((listings.harvestStartDate), "d")}  
                daysConsumed={dateFormat((listings.harvestEndDate), "d")} />
              </div>    */}
             
              {/* <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">asd</div> */}
              <img className='sm:w-full w-full h-[240px] rounded-lg p-1 object-cover ' src={listings.images[0]} alt="listing_image" />
              <ul className='flex transition-all duration-700 -bottom-12 justify-center items-center gap-2 absolute w-full group-hover:bottom-2'>
                {/* <Link className='w-[40px] h-[40px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-md hover:bg-primary hover:text-white hover:rotate-[720deg] transition-all'>
                  <FaEye size='20px'/>
                </Link> */}

                <Link to={`/seller/dashboard/edit-listing/${listings._id}`} className='w-[40px] h-[40px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-md hover:bg-primary hover:text-white hover:rotate-[720deg] transition-all' >
                  <RiEdit2Fill size='20px'/>
                </Link>
                <button
                onClick={() => dispatch(takedown_listing(listings._id))}
                className="w-[40px] h-[40px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-md hover:bg-primary hover:text-white hover:rotate-[720deg] transition-all"
              >
                <MdDelete size="20px" />
              </button>

              </ul>
            </div>
            <div className="py-3 text-slate-600 px-2">
              <div className="flex justify-between">
                <h2 className='' id='listing_name'>{listings.name}</h2>
                <div className="flex gap-3 text-xl">
                  <span><FaTruckLoading /></span>
                  <span><FaTruck /></span>
                </div>
              </div>

              <div className="flex justify-between flex-row items-center gap-[2pxz] text-sm">
                <div className="">
                  <span className='font-bold '>&#8369;</span>
                  <span className='text-base font-bold'>{listings.price}</span>
                  <span className='text-base font-bold'>/kg</span>  
                </div>
                <div className="flex items-center gap-1">
                  <BsBoxSeamFill />
                  <span className='text-base font-bold'>{listings.expectedHarvestYield}</span>
                  <span className='text-base font-bold'>kg</span>  
               

                </div>
             

              </div>
              <div className="flex gap-1">
                <img className='h-[50px]' src="/images/farmers/farmer_01.png" alt="" />
                <div className="w-full">
                  <div className="flex justify-between ">
                    <h1 className='text-sm font-semibold'>{listings.clusterName}</h1>
                    <div className="flex items-center">
                    
                    </div>
                  </div>
                  {/* <div className="flex gap-1 items-center">
                    <span><FaPhone /></span>
                    <span className='text-sm'>+63 9758975701</span>
                    
                  </div> */}
                </div>
              </div>

              <div className="flex justify-start gap-0 py-1 items-start flex-col border-y-2 ">
                <label htmlFor="" className='text-xs font-bold'>Harvest Schedule:</label>
                 <div className="flex justify-between w-full items-center">
                      <span className='text-[11px]'>{dateFormat((listings.harvestStartDate), "dddd, mmmm dS, yyyy")} </span>
                      <span>-</span>
                      <span className='text-[11px]'>{dateFormat((listings.harvestEndDate), "dddd, mmmm dS, yyyy")} </span>
                 </div>
              </div>

              <div className="flex justify-start gap-1 py-1 items-end">
                <span><IoLocationSharp size='20px' /></span>
                <span className='text-sm'>{listings.locationInfo}</span>
              </div>

              
            </div>
          </div>)}

       
          </div>
         {
            totalListings <= parPage ? "": 
            <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
               pageNumber = {currentPage}
               setPageNumber = {setCurrentPage}
               totalItem = {50}
               parPage = {parPage}
               showItem = {4}
           />
       </div>
         }
        </div>
   </div>
  )
}

export default Listings