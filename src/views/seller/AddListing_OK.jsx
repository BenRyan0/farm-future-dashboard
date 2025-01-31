import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaList } from "react-icons/fa";
import DatePicker from '../../Components/DatePicker';
import { IoMdImages } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import { useSelector, useDispatch } from 'react-redux'
import { get_category } from '../../store/Reducers/categoryReducer'
import { add_listing } from '../../store/Reducers/listingReducer'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';

const AddListing = () => {
    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.category)

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
    })
    const [openDate, setOpenDate] = useState()
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            harvestStartDate: dateRange.startDate,
            harvestEndDate: dateRange.endDate,
        }));
    }, [dateRange]);

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const [showCategory, setShowCategory] = useState(false)
    const [category, setCategory] = useState('')
    const [allCategory, setAllCategory] = useState([])
    const [searchValue, setSearchValue] = useState('')

    const categorySearch = (e) => {
        const value = e.target.value
        setSearchValue(value)
        if (value) {
            let srchValue = allCategory.filter(c => c.name.toLowerCase().includes(value.toLowerCase()))
            setAllCategory(srchValue)
        } else {
            setAllCategory(categories)
        }
    }

    const [images, setImages] = useState([])
    const [imageShow, setImageShow] = useState([])
    const imageHandler = (e) => {
        const files = e.target.files;
        const length = files.length;

        if (length > 0) {
            setImages([...images, ...files])
            let imageUrl = []

            for (let i = 0; i < length; i++) {
                imageUrl.push({ url: URL.createObjectURL(files[i]) })
            }
            setImageShow([...imageShow, ...imageUrl])
        }
    }

    const changeImage = (img, index) => {
        if (img) {
            let tempUrl = imageShow
            let tempImages = images

            tempImages[index] = img
            tempUrl[index] = { url: URL.createObjectURL(img) }
            setImageShow([...tempUrl])
            setImages([...tempImages])
        }
    }

    const removeImage = (i) => {
        const filterImage = images.filter((img, index) => index !== i)
        const filterImageUrl = imageShow.filter((img, index) => index !== i)

        setImages(filterImage)
        setImageShow(filterImageUrl)
    }

    useEffect(() => {
        setAllCategory(categories)
    }, [categories])

    const add = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', state.name)
        formData.append('harvestStartDate', format(dateRange.startDate, "MMM dd yyyy"))
        formData.append('harvestEndDate', format(dateRange.endDate, "MMM dd yyyy"))
        formData.append('harvestDate', state.harvestDate)
        formData.append('harvestDuration', state.harvestDuration)
        formData.append('expectedHarvestYield', state.expectedHarvestYield)
        formData.append('DeliveryPickupOption', state.DeliveryPickupOption)
        formData.append('description', state.description)
        formData.append('price', state.price)
        formData.append('category', state.category)
        formData.append('sellerDelivery', state.sellerDelivery)
        formData.append('traderPickup', state.traderPickup)
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i])
        }

        dispatch(add_listing(formData))
    }

    const handleChange = (ranges) => {
        setDateRange(ranges.selection)
    }

    const handleClick = () => {
        setOpenDate((prev) => !prev)
    }

    return (
        <div className='px-2 lg:px-7 pt-5 pb-[90px]'>
            <div className="w-full p-4 bg-[#283046] rounded-md">
                <div className="flex justify-between items-center p-1">
                    <h1 className='font-semibold text-text_color text-base'>Add New Listing</h1>
                    <Link className='flex items-center justify-center gap-2 bg-accent/50 py-2 px-3 rounded-md font-semibold hover:bg-accent/30' to='/seller/dashboard/listings'>Listings <FaList size='19px' /></Link>
                </div>
                <div className="">
                    <form onSubmit={add}>
                        <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-text_color">
                            <div className="flex flex-col w-full gap-3">
                                <div className="w-full">
                                    <label htmlFor="name">Listing Name</label>
                                    <input onChange={inputHandle} value={state.name} className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Listing name' name='name' id='name' />
                                </div>
                                <div className="w-full flex flex-row justify-between gap-2">
                                    <div className="">
                                        <label htmlFor="price">Listing Price</label>
                                        <div className="flex flex-row items-center border-2 border-slate-700 rounded-md px-2 gap-1">
                                            <span className=''>&#8369;</span>
                                            <input onChange={inputHandle} value={state.price} className='w-full bg-transparent px-1 py-2 focus:border-accent outline-none bg-[#283046] text-[#d0d2d6]' type="number" placeholder='Listing price' name='price' id='price' min='0' />
                                        </div>
                                    </div>
                                    <div className="">
                                        <label htmlFor="unit" className="">Select unit</label>
                                        <select id="unit" name='unit' onChange={inputHandle} value={state.unit} className="w-full bg-[#283046] px-4 py-2 focus:border-accent outline-none border-2 border-slate-700 rounded-md text-[#d0d2d6]">
                                            <option selected value="">Select Unit</option>
                                            <option value="t">Metric Ton (t)</option>
                                            <option value="tn">Short Ton (tn)</option>
                                            <option value="lb">Pound (lb)</option>
                                            <option value="L">Liter (L)</option>
                                            <option value="m³">Cubic Meter (m³)</option>
                                            <option value="kg">Kilogram (kg)</option>
                                            <option value="ct">Count (ct)</option>
                                            <option value="bx">Box or Crate (bx)</option>
                                        </select>
                                    </div>
                                    <div className="">
                                        <label htmlFor="expectedHarvestYield">Expected Yield</label>
                                        <div className="flex flex-row items-center border-2 border-slate-700 rounded-md px-2 gap-1">
                                            <span className=''>{state.unit}</span>
                                            <input onChange={inputHandle} value={state.expectedHarvestYield} className='w-full bg-transparent px-1 py-2 focus:border-accent outline-none bg-[#283046] text-[#d0d2d6]' type="number" placeholder='Expected Yield' min='0' name='expectedHarvestYield' id='expectedHarvestYield' />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full relative">
                                    <label htmlFor="category">Listing Category</label>
                                    <input readOnly onClick={() => setShowCategory(!showCategory)} onChange={inputHandle} value={state.category} className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Listing Category' name='category' id='category' />
                                    <div className={`absolute top-12 left-0 h-48 py-1 flex-col w-full bg-[#283046] rounded-md shadow-xl shadow-black/40 ${showCategory ? 'flex' : 'hidden'}`}>
                                        <div className="relative h-full w-full">
                                            <input onChange={categorySearch} value={searchValue} className='sticky top-0 bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-b-2 border-slate-700 text-[#d0d2d6] w-full' type="text" placeholder='Search Category' name='category' id='category' />
                                            <div className="h-full overflow-y-auto">
                                                {
                                                    allCategory.map((cat, index) => <span onClick={() => {
                                                        setState({ ...state, category: cat.name })
                                                        setShowCategory(false)
                                                    }} key={index} className='cursor-pointer w-full py-2 px-4 hover:bg-accent/30'>{cat.name}</span>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col">
                                    <label htmlFor="description">Listing Description</label>
                                    <textarea onChange={inputHandle} value={state.description} rows="4" className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' placeholder='Listing Description' name='description' id='description'></textarea>
                                </div>
                            </div>
                            <div className="flex flex-col w-full gap-3">
                                <div className="w-full relative">
                                    <label htmlFor="harvestDate">Expected Harvest Date</label>
                                    <input onClick={handleClick} readOnly value={`${format(dateRange.startDate, 'MMM dd yyyy')} - ${format(dateRange.endDate, 'MMM dd yyyy')}`} className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Expected Harvest Date' name='harvestDate' id='harvestDate' />
                                    {openDate && <div className="absolute top-12 left-0 z-50"><DateRangePicker
                                        ranges={[dateRange]}
                                        onChange={handleChange}
                                        moveRangeOnFirstSelection={false}
                                        className="text-[#d0d2d6] bg-[#283046] rounded-md"
                                        rangeColors={['#3d91ff']}
                                    /></div>}
                                </div>
                                <div className="w-full flex flex-row justify-between gap-2">
                                    <div className="w-full">
                                        <label htmlFor="deliveryPickupOption">Delivery Option</label>
                                        <select onChange={inputHandle} value={state.DeliveryPickupOption} className='w-full bg-[#283046] px-4 py-2 focus:border-accent outline-none border-2 border-slate-700 rounded-md text-[#d0d2d6]' name="DeliveryPickupOption" id="deliveryPickupOption">
                                            <option selected value="">Delivery Option</option>
                                            <option value="seller">Seller Delivery</option>
                                            <option value="trader">Trader Pickup</option>
                                            <option value="seller&trader">Seller Delivery & Trader Pickup</option>
                                        </select>
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="quantity">Quantity</label>
                                        <input onChange={inputHandle} value={state.quantity} className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="number" placeholder='Quantity' name='quantity' id='quantity' min='0' />
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label htmlFor="images">Upload Listing Images</label>
                                    <div className="w-full grid grid-cols-2 gap-4">
                                        {imageShow.map((img, index) => <div key={index} className='w-full h-36 rounded-md relative border-2 overflow-hidden border-slate-700'>
                                            <input onChange={(e) => changeImage(e.target.files[0], index)} className='hidden' type="file" id={`img${index}`} />
                                            <label className='cursor-pointer w-full h-full' htmlFor={`img${index}`}>
                                                <img src={img.url} className='w-full h-full object-cover' alt="Listing" />
                                            </label>
                                            <button onClick={() => removeImage(index)} type='button' className='absolute top-3 right-3 w-7 h-7 rounded-full bg-accent/30 hover:bg-accent flex items-center justify-center'><CgClose className='text-lg' /></button>
                                        </div>)}
                                        <div className="w-full h-36 rounded-md overflow-hidden border-2 border-dashed border-slate-700">
                                            <input onChange={imageHandler} className='hidden' type="file" id='images' multiple />
                                            <label htmlFor="images" className='w-full h-full flex justify-center items-center text-4xl text-accent/50 cursor-pointer'><IoMdImages /></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end w-full">
                            <button className='bg-accent w-full py-2 rounded-md hover:bg-accent/80 transition-all duration-300 ease-in-out font-semibold text-[#283046]' type='submit'>Add New Listing</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddListing
