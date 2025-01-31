import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { FaList } from "react-icons/fa";
import { toast } from 'react-hot-toast';
// import DatePicker from '../../Components/DatePicker';
import { IoMdImages } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import {useSelector, useDispatch} from 'react-redux'
import { overRideStyle } from './../../utils/Utils';
import {PropagateLoader, ClipLoader} from 'react-spinners'
import {get_category} from '../../store/Reducers/categoryReducer'
import { add_listing,messageClear } from '../../store/Reducers/listingReducer'

import { BiSolidDiscount } from "react-icons/bi";
// DatePicker
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import '../../Components/custom-date-range-picker.css'
import {StandaloneSearchBox } from '@react-google-maps/api'
import { useRef } from 'react';





const AddListing = () => {
  
    const inputref = useRef(null)
    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.category);
    const { userInfo } = useSelector(state => state.auth);
    const {successMessage,errorMessage, loader} = useSelector(state=>state.listing)
    const [res, setRes] = useState(false)

    const [state_, setState_] = useState({
        name: '',
        address: '',
        phone: '',
        street: '',
        barangay: '',
        munCity: '',
        province: '',
    })
    
    
    useState(()=>{
        dispatch(get_category({
            searchValue : '',
            parPage : '',
            page : ""
        }))
    },[dispatch])
 
    
   

    // const inputHandler =(e)=>{
      
    //     setState({
    //         ...state,
    //         [e.target.name] : e.target.value
    //     })
    // }

    const inputHandler = (e) => {
        const { name, value } = e.target;
    
        if (name.includes("locationInfo.")) {
            // Handle nested locationInfo updates
            const nestedKey = name.split(".")[1]; // Extract the specific key, e.g., "name"
            setState((prevState) => ({
                ...prevState,
                locationInfo: {
                    ...prevState.locationInfo,
                    [nestedKey]: value, // Update the specific key
                },
            }));
        } else {
            // Handle top-level updates
            setState((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    // const inputHandler = (e) => {
    //     const { name, value } = e.target;
    
    //     if (name.includes("locationInfo.")) {
    //         // Handle nested locationInfo updates
    //         const nestedKey = name.split(".")[1]; // Extract the specific key, e.g., "name"
    //         setState((prevState) => ({
    //             ...prevState,
    //             locationInfo: {
    //                 ...prevState.locationInfo,
    //                 [nestedKey]: value, // Update the specific key
    //             },
    //         }));
    //     } else {
    //         // Special handling for discount input to append '%'
    //         if (name === "discount") {
    //             const numericValue = value.replace("%", ""); // Remove any '%' for processing
    //             if (!isNaN(numericValue) && numericValue !== "") {
    //                 setState((prevState) => ({
    //                     ...prevState,
    //                     [name]: numericValue + "%", // Append '%'
    //                 }));
    //             } else if (numericValue === "") {
    //                 setState((prevState) => ({
    //                     ...prevState,
    //                     [name]: "", // Allow clearing the input
    //                 }));
    //             }
    //         } else {
    //             // Handle top-level updates for other inputs
    //             setState((prevState) => ({
    //                 ...prevState,
    //                 [name]: value,
    //             }));
    //         }
    //     }
    // };
    
    

   

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
        yieldUnit : "",
        category : "",
        quantity : "",
        sellerDelivery : "",
        traderPickup : "",
        startDate :"",
        clusterName : "",
        addressLocation: '',
        locationInfo: {
            name: '',
            address: '',
            phone: '',
            street: '',
            barangay: '',
            munCity: '',
            province: '',
            

        }
        
    })
    const [checkboxState, setCheckboxState] = useState({
        sellerDelivery: false,
        traderPickup: false,
      });
    
      // Step 2: Create the checkbox handler
      const checkboxHandler = (event) => {
        const { name, checked } = event.target;
        setCheckboxState((prevState) => ({
          ...prevState,
          [name]: checked, // update the corresponding checkbox state
        }));
      };
      console.log(checkboxState)


    const [openDate, setOpenDate] = useState()
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection', 
      });
      
    


    const inputHandle = (e)=>{
        setState({
            ...state,
            [e.target.name] : e.target.value

        })
    }
    const [showCategory, setShowCategory] = useState(false)
    const [category, setCategory] = useState('')
    const [allCategory, setAllCategory] = useState([])
    const [searchValue, setSearchValue] = useState('')
    

   
    const categorySearch = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        if (value) {
            let srchValue = allCategory?.filter(allCategory => allCategory.name.toLowerCase().indexOf(value.toLowerCase()) > -1) || [];
            setAllCategory(srchValue);
        } else {
            setAllCategory(categories);
        }
    };

    const [images, setImages] = useState([])
    const [imageShow, setImageShow] = useState([])
    const imageHandler = (e)=>{
    // console.log(e.target.files)
        const files = e.target.files;
        const length = files.length;

        if(length>0){
            setImages([...images, ...files])
            let imageUrl = []

            for(let i = 0; i < length; i++){
                imageUrl.push({ url: URL.createObjectURL(files[i])})
            }
            setImageShow([...imageShow, ...imageUrl])
        }
     }

   const changeImage = (img, index)=>{
    if(img){
        let tempUrl = imageShow
        let tempImages = images

        tempImages[index] = img
        tempUrl[index] = {url: URL.createObjectURL(img)}
        setImageShow([...tempUrl])
        setImages([...tempImages])
    }
   }

   const removeImage = (i)=>{
    const filterImage = images.filter((img, index)=>index !== i)
    const filterImageUrl = imageShow.filter((img, index)=>index !== i)

    setImages(filterImage)
    setImageShow(filterImageUrl)
    
   }

   useEffect(()=>{
    
    setAllCategory(categories)
   },[categories])

   const add = (e)=>{
    e.preventDefault()
    const formData = new FormData()
        formData.append('name', state.name)
        formData.append('harvestStartDate', format(dateRange.startDate, "MMM dd yyyy"))
        formData.append('harvestEndDate', format(dateRange.endDate, "MMM dd yyyy"))
        formData.append('expectedHarvestYield',state.expectedHarvestYield)
        formData.append('description', state.description)
        formData.append('price', state.price)
        formData.append('unit', state.unit)
        formData.append('yieldUnit', state.yieldUnit)
        formData.append('clusterName', userInfo.associationName)
        formData.append('category', category)
        formData.append('sellerDelivery', checkboxState.sellerDelivery)
        formData.append('traderPickup', checkboxState.traderPickup)
        for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i])
    }
    console.log(formData)
    dispatch(add_listing(formData))
   }



// DatePicker - start
const handleChange = (ranges) => {
    setDateRange(ranges.selection)
}

const handleClick = () => { setOpenDate((prev) => !prev)}

 // DatePicker - end
 useEffect(() => {
    if (errorMessage) {
        toast.error(errorMessage);
        dispatch(messageClear());
    } else if (successMessage) {
        toast.success(successMessage);
        dispatch(messageClear());
        setState({
            name: '',
            harvestStartDate: Date.now(),
            harvestEndDate: Date.now(),
            expectedHarvestYield: "",
            description: "",
            price: "",
            unit: "",
            yieldUnit: '',
            category: "",
            quantity: "",
            sellerDelivery: "",
            traderPickup: "",
            startDate: ""
        });
        setCheckboxState({
            sellerDelivery: false,
            traderPickup: false,
        })
        setImageShow([]);
        setImages([]);
        setCategory('');
    } else {
        setState((prevState) => ({
            ...prevState,
            harvestStartDate: dateRange.startDate,
            harvestEndDate: dateRange.endDate,
        }));
    }
}, [successMessage, errorMessage, dateRange, dispatch]);


// const save =(e)=>{
//     e.preventDefault()
//     const {name,address,phone,street,barangay,munCity,province} = state;
//     if(name && address && phone && street && barangay && munCity && province){
//         setRes(true)
//     }
// }


console.log(state)

const handelonPlacesChanged = () =>{
    let address = inputref.current.getPlaces()
    console.log(address)
}


  return (
    <div className='px-2 lg:px-7 pt-5 pb-[90px]'>
        <div className="w-full p-4 bg-[#283046] rounded-md">
            <div className="flex justify-between items-center p-1">
                <h1 className='font-semibold text-text_color text-base'>Add New Listing</h1>
                {/* <Link className='flex items-center justify-center gap-2 bg-accent/50 py-2 px-3 rounded-md font-semibold hover:bg-accent/30' to='/seller/dashboard/listings'>Listings <FaList size='19px'/></Link> */}
            </div>
            <div className="">
                <form onSubmit={add}>
                    <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-text_color">
                        <div className="flex flex-col w-full gap-3">
                            <div className="w-full">
                                <label htmlFor="name">Listing Name</label>
                                <input  onChange={inputHandle} value={state.name} className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Listing name'  name='name' id='name'/>
                            </div>
                            <div className="w-full flex justify-end items-end xl:flex-row flex-col gap-2">
                                <div className="w-full flex-row flex relative">
                                    <div className="w-full">
                                        <label htmlFor="name">Price</label>
                                        <div className="flex flex-row items-center border-2 border-slate-700 rounded-md px-2 gap-1">
                                            <span className=''>&#8369;</span>
                                            <input onChange={inputHandle} value={state.price} className='w-full bg-transparent px-1 py-2 focus:border-accent outline-none bg-[#283046]  text-[#d0d2d6]' type="number" placeholder='Listing price'  name='price' id='price' min='0'/>
                                        </div>
                                    </div>
                                    
                                    <div className="absolute right-1 bottom-1">
                                        {/* <label htmlFor="countries" className="">Select unit</label> */}
                                        <div className="flex ">
                                            <h2>/</h2>
                                            <select 
                                                id="unit" 
                                                name="unit" 
                                                onChange={inputHandle} 
                                                value={state.unit} 
                                                className=" bg-[#283046] pr-4 pb-2 outline-none rounded-md text-[#d0d2d6] border-none w-[80px]"
                                            >
                                                <option value="">Unit</option>
                                                <option value="t">(t)</option>
                                                <option value="tn">(tn)</option>
                                                <option value="lb">(lb)</option>
                                                <option value="L">(L)</option>
                                                <option value="m³">(m³)</option>
                                                <option value="kg">(kg)</option>
                                                <option value="ct">(ct)</option>
                                                <option value="bx">(bx)</option>
                                            </select>
                                        </div>
                                       
                                    </div>
                                </div>
                              
                                <div className="w-1 h-full border-l-2 border-slate-600"></div>
                                
                                <div className="w-full flex-row flex relative justify-between">
                                    <div className="w-full">
                                        <label htmlFor="name">Yield</label>
                                        <div className="flex flex-row items-center border-2 border-slate-700 rounded-md px-2 gap-1">
                                            <input  onChange={inputHandle} value={state.expectedHarvestYield} className='w-full bg-transparent px-1 py-2 focus:border-accent outline-none bg-[#283046]  text-[#d0d2d6]' type="number" placeholder='Expected Yield' min='0' name='expectedHarvestYield' id='expectedHarvestYield'/>
                                        </div>
                                    </div>
                                    <div className="absolute right-1 bottom-1 ">
                                        <div className="flex">
                                            <select 
                                                id="yieldUnit" 
                                                name="yieldUnit" 
                                                onChange={inputHandle} 
                                                value={state.yieldUnit} 
                                                className=" bg-[#283046] pr-4 pb-2 outline-none rounded-md text-[#d0d2d6] border-none w-[80px]"
                                            >
                                                <option value="">Unit</option>
                                                <option value="t">(t)</option>
                                                <option value="tn">(tn)</option>
                                                <option value="lb">(lb)</option>
                                                <option value="L">(L)</option>
                                                <option value="m³">(m³)</option>
                                                <option value="kg">(kg)</option>
                                                <option value="ct">(ct)</option>
                                                <option value="bx">(bx)</option>
                                            </select>
                                         </div>
                                    </div>

                                   
                                    
                                </div>

                               
                               
                               
                             
                               
                                {/* <label htmlFor="name">Listing Name</label>
                                <input  onChange={inputHandle} value={state.name} className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Listing name'  name='name' id='name'/> */}
                            </div>

                            <div className="w-full relative">
                                <label htmlFor="category">Listing Category</label>
                                <input readOnly onClick={()=>setShowCategory(!showCategory)} onChange={inputHandle} value={category} className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Select Listing Category'  name='category' id='category'/>
                                <div className={`absolute top-[100%]  bg-slate-800 w-full transition-all z-[99999] px-4  ${showCategory ? 'scale-100':'scale-0'}`}>
                                    <div className="w-6/12 px-4 py-2 fixed right-1 top-1 ">
                                            <input value={searchValue} onChange={categorySearch}  className='w-full self-end flex flex-col items-start justify-center px-3 py-1 overflow-hidden focus:border-primary outline-none bg-transparent border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='search' />
                                    </div>
                                    <div className="py-8 border-b-2 border-slate-500 mb-2"></div>
                                    <div className="flex justify-start items-start flex-col h-[200px] overflow-x-hidden">
                                            {
                                                allCategory.map(( allCategory,i) => 
                                                <span key={i} className={`px-4 py-2 hover:bg-primary hover:text-text_color rounded-md w-full cursor-pointe my-1 ${category ===  allCategory.name && 'bg-primary'}`} onClick={()=>{
                                                    setShowCategory(false)
                                                    setCategory(allCategory.name)
                                                    setSearchValue('')
                                                    setAllCategory(categories)
                                                }}>{ allCategory.name}</span>)
                                            }
                                    </div>
                                </div>
                            </div>




                            
                            <div className="w-full flex flex-col items-start justify-center ">
                                <label htmlFor="name">Expected Harvest Date Range</label>
                                <div className="w-full relative flex flex-col items-start justify-center px-3 py-1 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]">
                                     {/* <DatePicker onChange={inputHandle} value={state.harvestDate} name="harvestDate" className=""/> */}
                                     {/* <DatePicker date={dateRange} setDate={setDateRange}  name="harvestDate"/> */}
                                     {/* TEMPORARY DATE RANGE PICKER */}
                                     <div className='relative flex justify-center items-start py-1 w-full h-full transition-all duration-300 '>
                                            <div className="w-full flex justify-between">
                                                <span onClick={handleClick} className='px-3 py-1 rounded-sm bg-accent/40 font-semibold'>
                                                     Select Date Range
                                                </span>  
                                            <span className='font-semibold bg-accent/40 py-1 px-2 rounded-sm'>
                                            {/* {
                                                `${format(date.startDate, "MMM dd yyyy")} - ${format(date.endDate, "MMM dd yyyy")}`
                                            } */}
                                            {`${format(dateRange.startDate, 'MMM dd yyyy')} - ${format(dateRange.endDate, 'MMM dd yyyy')}`}
                                            </span>
                                            </div>
                                        
                                            {openDate && <DateRangePicker className='custom-date-range-picker w-full absolute top-[40px] z-[999999] '
                                                ranges={[dateRange]}
                                                onChange={handleChange}
                                                moveRangeOnFirstSelection={false}
                                                // className="text-[#d0d2d6] bg-[#283046] rounded-md"
                                                rangeColors={['#3d91ff']} />
                                
                                            }
                                        </div>
                                     {/* TEMPORARY DATE RANGE PICKER */}
                                </div>
                            </div>


                            <div className="w-full flex flex-col items-start justify-center ">
                                <div className="w-full">
                                    <label htmlFor="name">Listing Description</label>
                                    <textarea onChange={inputHandle} value={state.description} className='w-full h-[129px] bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Listing Description'  name='description' id='description'></textarea>
                                </div>
                            </div>

                            <div className="w-full flex justify-between">
                              
                                    <div className="w-full">
                                        <label htmlFor="name">Listing Discount</label>
                                        <div className="w-10/12 relative">
                                             <input  onChange={inputHandle} value={state.discount} className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="number" placeholder='Listing discount'  name='discount' id='discount'/>
                                          
                                                <BiSolidDiscount className='absolute bottom-2 right-3' size={30}/>
                                            
                                        </div>
                                       
                                    </div>
                                    
                                <div className="w-full">
                                        {/* <label htmlFor="name" className='mb-3'>Delivery/Pickup Options</label> */}
                                        <div className="w-full flex flex-col gap-2">
                                            <div className="flex gap-2 flex-row-reverse items-center justify-end">
                                            <label htmlFor="sellerDelivery">Seller Delivery</label>
                                            <input 
                                                id="sellerDelivery" 
                                                name="sellerDelivery" 
                                                type="checkbox" 
                                                onChange={checkboxHandler} 
                                                checked={checkboxState.sellerDelivery} // bind the checked state
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            </div>
                                            <div className="flex gap-2 flex-row-reverse items-center justify-end">
                                            <label htmlFor="traderPickup">Trader Pickup</label>
                                            <input 
                                                id="traderPickup" 
                                                name="traderPickup" 
                                                type="checkbox" 
                                                onChange={checkboxHandler} 
                                                checked={checkboxState.traderPickup} // bind the checked state
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            </div>
                                        </div>
                                </div>
                            </div>

                            <div className="w-full">
                            <label htmlFor="name">Listing Address</label>
                                    {/* <StandaloneSearchBox onLoad={(ref) => inputref.current = ref} onPlacesChanged={handelonPlacesChanged} options={{
    componentRestrictions: { country: "PH" }
  }}>
                                      
                                        <input  onChange={inputHandle} value={state.location} className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Listing name'  name='location' id='location'/>
                                    </StandaloneSearchBox> */}

                                    {/* <StandaloneSearchBox
                                        onLoad={(ref) => {
                                            inputref.current = ref;
                                        }}
                                        onPlacesChanged={handelonPlacesChanged}
                                        options={{
                                            componentRestrictions: { country: "PH" }, // Restrict to the Philippines
                                        }}
                                        >
                                        <input
                                            onChange={inputHandle}
                                            value={state.location}
                                            className="w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]"
                                            type="text"
                                            placeholder="Listing name"
                                            name="location"
                                            id="location"
                                        />
                                        </StandaloneSearchBox> */}
                                
                                <StandaloneSearchBox
                                    onLoad={(ref) => {
                                        inputref.current = ref;
                                        // Debug: Check if restrictions are applied
                                        console.log("SearchBox loaded", ref);
                                    }}
                                    onPlacesChanged={handelonPlacesChanged}
                                    options={{
                                        componentRestrictions: { country: "PH" }, // Limit to the Philippines
                                    }}
                                    >
                                    <input
                                        onChange={inputHandle}
                                        value={state.location}
                                        className="w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]"
                                        type="text"
                                        placeholder="Search locations in the Philippines"
                                        name="location"
                                        id="location"
                                    />
                                    </StandaloneSearchBox>
                                
                            </div>
                            
            
                            {/* <div className="w-full flex flex-col items-start justify-center bg-transparent ">
                                <label htmlFor="name">Expected Harvest Duration Range</label>
                                <div className="w-full flex flex-col items-start justify-center bg-transparent px-3 py-1 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]">
                                
                                </div>
                            </div> */}
                        
                        </div>

                        <div className="flex flex-col w-full ">
                            <div className="">
                            <div className="bg-transparent p-6 shadow-sm rounded-md">
                                  {
                                    !res && 
                                    <>
                                        <h2 className='text-slate-600 font-semibold pb-5'>Listing Location</h2>
                                        {/* <form onSubmit={save}> */}
                                            <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                                            <div className="flex flex-col gap-1 mb-2 w-full">
                                                <label htmlFor="locationInfo.name">Name</label>
                                                <input 
                                                    onChange={inputHandler} 
                                                    value={state.locationInfo.name} 
                                                    className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' 
                                                    type="text" 
                                                    name="locationInfo.name" 
                                                    placeholder="Name" 
                                                    id="locationInfo.name" 
                                                />
                                            </div>
                                                <div className="flex flex-col gap-1 mb-2 w-full">
                                                    <label htmlFor="address">Address</label>
                                                    <input onChange={inputHandler} value={state.address} className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="email" name='address' 
                                                    placeholder='Address' id='address' />
                                                </div>
                                            
                                            </div>
                                            <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                                                <div className="flex flex-col gap-1 mb-2 w-full">
                                                    <label htmlFor="phone">Phone</label>
                                                    <input onChange={inputHandler} value={state.phone} className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" name='phone' placeholder='phone' id='phone' />
                                                </div>
                                                <div className="flex flex-col gap-1 mb-2 w-full">
                                                    <label htmlFor="street">Street No.</label>
                                                    <input onChange={inputHandler} value={state.street} className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" name='street' 
                                                    placeholder='street' id='street' />
                                                </div>
                                            
                                            </div>
                                            <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                                                <div className="flex flex-col gap-1 mb-2 w-full">
                                                    <label htmlFor="barangay">Barangay</label>
                                                    <input onChange={inputHandler} value={state.barangay} className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" name='barangay' placeholder='barangay' id='barangay' />
                                                </div>
                                                <div className="flex flex-col gap-1 mb-2 w-full">
                                                    <label htmlFor="munCity">Municipality/City</label>
                                                    <input onChange={inputHandler} value={state.munCity} className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" name='munCity' 
                                                    placeholder='Municipality/City' id='munCity' />
                                                </div>
                                            
                                            </div>
                                            <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                                                <div className="flex flex-col gap-1 mb-2 w-full">
                                                    <label htmlFor="province">Province</label>
                                                    <input onChange={inputHandler} value={state.province} className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" name='province' placeholder='province' id='province' />
                                                </div>
                                                <div className="flex flex-col gap-1 mb-2 w-full justify-end">
                                                    {/* <button type='submit' className='px-3 py-2 bg-primaryDark rounded-sm text-slate-100 hover:shadow-lg'>Save</button> */}
                                                </div>
                                            
                                            </div>
                                        {/* </form> */}
                                    </>
                                  }
                                  {
                                    res &&   
                                    <div className="flex flex-col gap-1">
                                    <h2 className='text-slate-600 font-semibold pb-2'>Deliver to {state.name}</h2>
                                    <p className=''>
                                        <span className='font-semibold bg-primaryDark text-slate-100 px-2 py-1 rounded-md text-sm'>Shipping Location</span>
                                        <span className='pl-2 text-slate-600 text-sm'>{state.street}, {state.barangay}, {state.munCity}, {state.province}</span>
                                        <span onClick={()=>setRes(false)} className=' pl-2 text-primary/70 font-semibold cursor-pointer'>Change</span>
                                       
                                    </p>
                                    <p className='text-slate-600 text-sm'>Email to bendover@gmail.com</p>

                                </div>
                                  }

                                </div>
                            </div>
                            
                           
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 xs:gap-4 gap-3 w-full text-text_color mb-4 bg-red-500">
                        {
                            imageShow.map((img,i)=>
                            <div className="h-[180px] relative">
                                <label  htmlFor={i}>
                                    <img className='w-full h-full rounded-md object-cover' src={img.url} alt="selected images"  />
                                </label>
                                <input onChange={(e)=>changeImage(e.target.files[0], i)} type="file" name='' id={i} className='hidden' />
                                <span onClick={()=>removeImage(i)} className='p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 text-white absolute top-1 right-1 rounded-md'><CgClose /></span>
                            </div>
                            ) 
                        }
                        <label htmlFor="image" className='flex justify-center items-center flex-col h-[180px] cursor-pointer border-2 border-dashed hover:border-accent w-full text-text_color'>
                            <span><IoMdImages size='40px'/></span>
                            <span>Select An Image</span>
                        </label>
                        <input multiple onChange={imageHandler} className='hidden' type="file" name='image' id='image' />
                    </div>
                    <div className="flex w-full">
                             <button disabled={loader ? true : false} className='flex justify-center items-center bg-accent/50  w-[50%] hover:shadow-[#6ED601]/10 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 font-bold mt-5'>
                                {
                                       loader ? 
                                       <ClipLoader
                                         color="#ffffff"
                                         cssOverride={{
                                           display: 'flex',
                                           justifyContent: 'center',
                                           alignItems: "center",
                                         }}
                                         size={20}
                                       /> :'Add Listing'
                                }
                            </button>
                             {/* <button disabled={loader ? true : false} className='bg-accent/50  w-[50%] hover:shadow-[#6ED601]/10 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 font-bold mt-5'>
                                {
                                       loader ? <ClipLoader color='#fff'cssOverride = {}/> :'Add Listing'
                                }
                            </button> */}
                        {/* <button className='bg-accent/40 w-[50%] hover:shadow-accent/40 hover:shadow-sm text-text_color rounded-sm px-7 py-2 my-2 font-semibold'>Add Category</button> */}
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddListing