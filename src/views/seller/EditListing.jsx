import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { get_category } from '../../store/Reducers/categoryReducer'
import { FaList } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import DatePicker from '../../Components/DatePicker';
import { IoMdImages } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import { useSelector, useDispatch } from 'react-redux'
import {PropagateLoader} from 'react-spinners'
import { overRideStyle } from './../../utils/Utils';

// DatePicker
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import '../../Components/custom-date-range-picker.css'
import { get_listing, messageClear,  update_listing, listing_image_update } from '../../store/Reducers/listingReducer';


const EditListing = () => {
    const { listingId } = useParams()
    console.log(listingId)
    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.category);
    const { listing , loader, errorMessage, successMessage} = useSelector(state => state.listing);

    const [openDate, setOpenDate] = useState(false);
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    

    useEffect(() => {
        dispatch(get_category({
            searchValue: '',
            parPage: '',
            page: ""
        }))
    }, [dispatch])

    const [state, setState] = useState({
        name: "",
        harvestStartDate: "",
        harvestEndDate: "",
        harvestDuration: "",
        expectedHarvestYield: "",
        DeliveryPickupOption: "",
        description: "",
        price: "",
        unit: "",
        category: "",
        quantity: "",
        sellerDelivery: "",
        traderPickup: "",
        startDate: ""
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        dispatch(get_listing(listingId))
    }, [listingId, dispatch])

    const [showCategory, setShowCategory] = useState(false)
    const [category, setCategory] = useState('')
    const [allCategory, setAllCategory] = useState([])
    const [searchValue, setSearchValue] = useState('')

    const categorySearch = (e) => {
        const value = e.target.value
        setSearchValue(value)
        if (value) {
            let srchValue = allCategory.filter(c => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1)
            setAllCategory(srchValue)
        } else {
            setAllCategory(categories)
        }
    }

    // const [images, setImages] = useState([])
    const [imageShow, setImageShow] = useState([])

    const changeImage = (img, files) => {
        if (files.length > 0) {     
            dispatch(listing_image_update({
                oldImage : img,
                newImage : files[0],
               listingId
            }))
        }

    }

    const handleChange = (ranges) => {
        setDateRange(ranges.selection)
    }

    const handleClick = () => {
        setOpenDate((prev) => !prev)
    }

    useEffect(() => {
        if (listing) {
            setDateRange({
                startDate: new Date(listing.harvestStartDate),
                endDate: new Date(listing.harvestEndDate),
                key: 'selection',
            })

            setState({
                name: listing.name,
                harvestStartDate: format(new Date(listing.harvestStartDate), "MMM dd yyyy"),
                harvestEndDate: format(new Date(listing.harvestEndDate), "MMM dd yyyy"),
                expectedHarvestYield: listing.expectedHarvestYield,
                description: listing.description,
                price: listing.price,
                clusterName: listing.clusterName,
                unit:listing.unit,
                yieldUnit:listing.yieldUnit,
                sellerDelivery: listing.sellerDelivery,
                traderPickup: listing.sellerDelivery,
            })

            setCategory(listing.category)
            setImageShow(listing.images)
        }
    }, [listing])
    
    useEffect(() => {
       if(categories.length>0){
        setAllCategory(categories)

       }
    }, [categories])



    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        } else if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
           
        } else {
            setState((prevState) => ({
                ...prevState,
                harvestStartDate: dateRange.startDate,
                harvestEndDate: dateRange.endDate,
            }));
        }
    }, [successMessage, errorMessage, dateRange, dispatch]);


    const update = (e)=>{
        e.preventDefault()
        const obj = {
                name:  state.name,
                harvestStartDate: state.harvestStartDate,
                harvestEndDate: state.harvestEndDate,
                expectedHarvestYield: state.expectedHarvestYield,
                description: state.description,
                price: state.price,
                clusterName: state.clusterName,
                unit:state.unit,
                yieldUnit:state.yieldUnit,
                sellerDelivery: state.sellerDelivery,
                traderPickup: state.traderPickup,
                listingId : listingId
          

        }
        dispatch(update_listing(obj))
    }

    return (
        <div className='px-2 lg:px-7 pt-5 pb-[90px]'>
            <div className="w-full p-4 bg-[#283046] rounded-md">
                <div className="flex justify-between items-center p-1">
                    <h1 className='font-semibold text-text_color text-base'>Edit Listing</h1>
                    {/* <Link className='flex items-center justify-center gap-2 bg-accent/50 py-2 px-3 rounded-md font-semibold hover:bg-accent/30' to='/seller/dashboard/listings'>Listings <FaList size='19px' /></Link> */}
                </div>
                <div className="">
                    <form onSubmit={update}>
                        <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-text_color">
                            <div className="flex flex-col w-full gap-3">
                                <div className="w-full">
                                    <label htmlFor="name">Listing Name</label>
                                    <input onChange={inputHandle} value={state.name} className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Listing name' name='name' id='name' />
                                </div>
                              

                            <div className="w-full flex justify-end items-end xl:flex-row flex-col gap-2">
                                {/* <label htmlFor="name">Listing Name</label>
                                <input  onChange={inputHandle} value={state.name} className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Listing name'  name='name' id='name'/> */}
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
                                            {openDate && <DateRangePicker className='custom-date-range-picker w-full absolute top-[40px] z-[999999]'
                                                ranges={[dateRange]}
                                                onChange={handleChange}
                                                moveRangeOnFirstSelection={false}
                                                rangeColors={['#3d91ff']} />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full ">
                                <div className="w-full">
                                    <label htmlFor="name">Listing Description</label>
                                    <textarea onChange={inputHandle} value={state.description} className='w-full h-[129px] bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Listing Description' name='description' id='description'></textarea>
                                </div>
                              
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 xs:gap-4 gap-3 w-full text-text_color mb-4 ">
                            {
                                imageShow.map((img, i) => <div key={i}>
                                    <label htmlFor={i}>
                                        <img className='h-full w-full object-cover' src={img} alt="" />
                                    </label>
                                    <input onChange={(e) => changeImage(img, e.target.files)} type="file" id={i} className='hidden' />
                                </div>)
                            }
                        </div>
                        <div className="flex w-full">
                        <button disabled={loader ? true : false} className='bg-accent/50  w-[50%] hover:shadow-[#6ED601]/10 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 font-bold mt-5'>
                                {
                                       loader ? <PropagateLoader color='#fff'cssOverride = {overRideStyle}/> :'Update Listing'
                                }
                            </button>
                            {/* <button className='bg-accent/40 w-[50%] hover:shadow-accent/40 hover:shadow-sm text-text_color rounded-sm px-7 py-2 my-2 font-semibold'>Update Listing</button> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditListing
