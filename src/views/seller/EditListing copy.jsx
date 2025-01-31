import React, { useEffect, useState } from 'react'
import {Link , useParams} from 'react-router-dom'
import {get_category} from '../../store/Reducers/categoryReducer'
import { FaList } from "react-icons/fa";
import DatePicker from '../../Components/DatePicker';
import { IoMdImages } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import {useSelector, useDispatch} from 'react-redux'


// DatePicker
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import '../../Components/custom-date-range-picker.css'
import { get_listing } from '../../store/Reducers/listingReducer';



const EditListing = () => {
    
const {listingId} = useParams()   
const dispatch = useDispatch()
const { categories } = useSelector(state => state.category);
const { listing } = useSelector(state => state.listing);


const [openDate, setOpenDate] = useState()
const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection', 
  });
  


useEffect(()=>{
    dispatch(get_category({
        searchValue : '',
        parPage : '',
        page : ""
    }))
},[dispatch])

const [state, setState] = useState({
    name: "",
    harvestStartDate: "",
    harvestEndDate: "",
    harvestDuration: "",
    expectedHarvestYield: "",
    DeliveryPickupOption: "",
    description: "",
    price : "",
    unit : "",
    category : "",
    quantity : "",
    sellerDelivery : "",
    traderPickup : "",
    startDate :""
})
const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value

    })
}

useEffect(()=>{
    dispatch(get_listing(listingId))
},[listingId])

const [showCategory, setShowCategory] = useState(false)
const [category, setCategory] = useState('')
const [allCategory, setAllCategory] = useState(categories)
const [searchValue, setSearchValue] = useState('')


const categorySearch = (e)=>{
    const value = e.target.value
    setSearchValue(value)
    if(value){
        let  srchValue = allCategory.filter(c => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1)
        setAllCategory(srchValue)
    }else{
        setAllCategory(categories)
    }
}

const [images, setImages] = useState([])
const [imageShow, setImageShow] = useState([])


const changeImage = (img, files)=>{
  if(files.length>0){}
  console.log(img)
  console.log(files[0])
}


// DatePicker - start
const handleChange = (ranges) => {
    setDateRange(ranges.selection)
}
const handleClick = () => { setOpenDate((prev) => !prev)}

useEffect(()=>{
  setState({
    name: listing.name,
    harvestStartDate: format(dateRange.startDate, "MMM dd yyyy"),
    harvestEndDate: format(dateRange.endDate, "MMM dd yyyy"),
    expectedHarvestYield: listing.expectedHarvestYield,
    description: listing.description,
    price: listing.price,
    clusterName : listing.clusterName,
    unit : "kl",
    // category : listing.,
    sellerDelivery : listing.sellerDelivery,
    traderPickup : listing.sellerDelivery,
  })

  setCategory('crops')
  setImageShow(listing.images)
},[listing])


  return (
    <div className='px-2 lg:px-7 pt-5 pb-[90px]'>
    <div className="w-full p-4 bg-[#283046] rounded-md">
        <div className="flex justify-between items-center p-1">
            <h1 className='font-semibold text-text_color text-base'>Edit Listing</h1>
            <Link className='flex items-center justify-center gap-2 bg-accent/50 py-2 px-3 rounded-md font-semibold hover:bg-accent/30' to='/seller/dashboard/listings'>Listings <FaList size='19px'/></Link>
        </div>
        <div className="">
            <form>
                <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-text_color">
                    <div className="flex flex-col w-full gap-3">
                        <div className="w-full">
                            <label htmlFor="name">Listing Name</label>
                            <input  onChange={inputHandle} value={state.name} className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Listing name'  name='name' id='name'/>
                        </div>
                        <div className="w-full flex flex-row justify-between gap-2">
                            <div className="">
                                 <label htmlFor="name">Listing Price</label>
                                 <div className="flex flex-row items-center border-2 border-slate-700 rounded-md px-2 gap-1">
                                    <span className=''>&#8369;</span>
                                    <input  onChange={inputHandle} value={state.price} className='w-full bg-transparent px-1 py-2 focus:border-accent outline-none bg-[#283046]  text-[#d0d2d6]' type="number" placeholder='Listing price'  name='price' id='price' min='0'/>
                                 </div>
                            </div>
                            
                            <div className="">
                                 <label for="countries" class="">Select unit</label>
                                    <select id="unit" name='unit' onChange={inputHandle} value={state.unit} class="w-full bg-[#283046] px-4 py-2 focus:border-accent outline-none border-2 border-slate-700 rounded-md text-[#d0d2d6]">
                                        <option selected value="">Select Unit</option>
                                        <option value="t">Metric Ton (t)</option>
                                        <option value="tn">Short Ton (tn)</option>
                                        <option value="lb">Pound (lb)</option>
                                        <option value="L">Liter (L)</option>
                                        <option value="m³">Cubic Meter (m³)</option>
                                        <option value="kg">Kilogram (kg)</option>
                                        <option value="ct">Count (ct)</option>
                                        <option value="kg">Kilogram (kg)</option>
                                        <option value="bx">Box or Crate (bx)</option>
                                    </select>
                            </div>
                            <div className="">
                                 <label htmlFor="name">Expected Yield</label>
                                 <div className="flex flex-row items-center border-2 border-slate-700 rounded-md px-2 gap-1">
                                    <span className=''>{state.unit}</span>
                                    <input  onChange={inputHandle} value={state.expectedHarvestYield} className='w-full bg-transparent px-1 py-2 focus:border-accent outline-none bg-[#283046]  text-[#d0d2d6]' type="number" placeholder='Expected Yield' min='0' name='expectedHarvestYield' id='expectedHarvestYield'/>
                                 </div>
                            </div>
                         
                           
                            {/* <label htmlFor="name">Listing Name</label>
                            <input  onChange={inputHandle} value={state.name} className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Listing name'  name='name' id='name'/> */}
                        </div>

                        <div className="w-full relative">
                            <label htmlFor="category">Listing Category</label>
                            <input readOnly onClick={()=>setShowCategory(!showCategory)} onChange={inputHandle} value={category} className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Select Listing Category'  name='category' id='category'/>
                            <div className={`absolute top-[100%]  bg-slate-800 w-full transition-all z-[99999]  ${showCategory ? 'scale-100':'scale-0'}`}>
                                <div className="w-full px-4 py-2 fixed">
                                        <input value={searchValue} onChange={categorySearch}  className='w-full flex flex-col items-start justify-center px-3 py-1 overflow-hidden focus:border-accent outline-none bg-transparent border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='search' />
                                </div>
                                <div className="pt-14"></div>
                                <div className="flex justify-start items-start flex-col h-[200px] overflow-x-hidden">
                                        {
                                            allCategory.map((c,i) => 
                                            <span className={`px-4 py-2 hover:bg-accent/30 hover:text-text_color  w-full cursor-pointer ${category === c.name && 'bg-accent/30'}`} onClick={()=>{
                                                setShowCategory(false)
                                                setCategory(c.name)
                                                setSearchValue('')
                                                setAllCategory(categories)
                                            }}>{c.name}</span>)
                                        }
                                </div>
                            </div>
                        </div>




                        
                        <div className="w-full flex flex-col items-start justify-center ">
                            <label htmlFor="name">Expected Harvest Date Range</label>
                            <div className="w-full relative flex flex-col items-start justify-center px-3 py-1 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]">
                                     <div className='relative flex justify-center items-start py-1 w-full h-full transition-all duration-300 '>
                                            <div className="w-full flex justify-between">
                                                <span onClick={handleClick} className='px-3 py-1 rounded-sm bg-accent/40 font-semibold'>
                                                     Select Date Range
                                                </span>  
                                            <span className='font-semibold bg-accent/40 py-1 px-2 rounded-sm'>
                
                                            {`${format(dateRange.startDate, 'MMM dd yyyy')} - ${format(dateRange.endDate, 'MMM dd yyyy')}`}
                                            </span>
                                            </div>
                                        
                                            {openDate && <DateRangePicker className='custom-date-range-picker w-full absolute top-[40px] z-[999999] '
                                                ranges={[dateRange]}
                                                onChange={handleChange}
                                                moveRangeOnFirstSelection={false}
                                                rangeColors={['#3d91ff']} />
                                
                                            }
                                        </div>
                                     {/* TEMPORARY DATE RANGE PICKER */}
                                </div>
                           
                        </div>
                         
                    
                    </div>

                    <div className="flex flex-col w-full ">
                        <div className="w-full">
                            <label htmlFor="name">Listing Description</label>
                            <textarea onChange={inputHandle} value={state.description} className='w-full h-[129px] bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Listing Description'  name='description' id='description'></textarea>
                        </div>
                        <div className="w-full">
                            <label htmlFor="name" className='mb-3'>Delivery/Pickup Options</label>
                            <div className="w-full flex flex-col gap-2">
                                <div className="flex gap-2 flex-row-reverse items-center justify-end">
                                    <label htmlFor="name">Seller Delivery</label>
                                    <input id="sellerDelivery" name='sellerDelivery' type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>

                                </div>
                                <div className="flex gap-2 flex-row-reverse items-center justify-end">
                                    <label htmlFor="name">Trader Pickup</label>
                                    <input id="traderPickup" name='traderPickup' type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                </div>
                            
                            </div>
                        </div>
        
                    </div>
                </div>
                <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 xs:gap-4 gap-3 w-full text-text_color mb-4">
                    {
                      imageShow.map((img,i) => <div className="">
                        <label htmlFor={i}>
                          <img src={img} alt="" />
                        </label>
                        <input onChange={(e)=>changeImage(img, e.target.files)} type="file" name="" id={i} className='hidden' />
                      </div> )
                    }
                </div>
                <div className="flex w-full">
                    <button className='bg-accent/40 w-[50%] hover:shadow-accent/40 hover:shadow-sm text-text_color rounded-sm px-7 py-2 my-2 font-semibold'>Update Listing</button>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default EditListing