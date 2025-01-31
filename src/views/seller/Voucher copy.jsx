import React ,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Pagination from '../Pagination';
import { FaEdit, FaTrash } from 'react-icons/fa'
import { BsImage } from 'react-icons/bs';
import { IoClose } from "react-icons/io5";

import {PropagateLoader} from 'react-spinners'
import { overRideStyle } from './../../utils/Utils';
import { toast } from 'react-hot-toast';

import {useSelector, useDispatch} from 'react-redux'
import { voucherAdd ,messageClear, get_category  } from '../../store/Reducers/voucherReducer';
// import { categoryAdd ,messageClear, get_category  } from '../../store/Reducers/categoryReducer';
import { BiSolidDiscount } from "react-icons/bi";
import 'react-date-range/dist/styles.css'; // main style fileDateRangePicker
import Search from './../components/Search';

import { format } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style fileDateRangePicker
import 'react-date-range/dist/theme/default.css';
import voucher_codes from 'voucher-code-generator';


const Voucher = () => {
    const dispatch = useDispatch()
    const {categories, loader, successMessage, errorMessage  } = useSelector(state=>state.category)

    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParpage] = useState(5)
    const [show,setShow] = useState(false)
    const [imageShow, setImage] = useState('')
    const [state,setState] = useState({
        name: '',
        image: '',
        code: ''
    })

    const [openDate, setOpenDate] = useState()
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection', 
      });
      const handleChange = (ranges) => {
        setDateRange(ranges.selection)
    }

    
    

    const imageHandler= (e)=>{
        let files = e.target.files
        console.log(files)
        if(files.length>0){
            setImage(URL.createObjectURL(files[0]))
            setState({
                ...state,
                image: files[0]
            })

        }
    }

    const add_Category = (e)=>{
        e.preventDefault()
        console.log(state)
        dispatch(voucherAdd(state))
    }
useEffect(()=>{
if(errorMessage){
    toast.error(errorMessage)
    dispatch(messageClear())
}else{
    toast.success(successMessage)
    dispatch(messageClear())
    setState({
        name:'',
        image : ''
    })
    setImage('')
}
},[successMessage, errorMessage])

useEffect(()=>{
    const obj = {
        parPage : parseInt(parPage),
        page : parseInt(currentPage),
        searchValue

    }
    dispatch(get_category(obj))
}, [searchValue, currentPage, parPage])

const generateCode = () => {
    const code_ = voucher_codes.generate({
        length: 8,
        count: 1
    });

    // Set the new state
    setState(prevState => {
        const newState = { code: code_ };
        console.log("_____________________ >");
        console.log(newState.code);
        return newState;
    });
}

const handleClick = () => { setOpenDate((prev) => !prev)}


  return (
    <div className='px-2 lg:px-7 pt-5'>
        <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#283046] rounded-md">
                <h1 className='text-text_color font-semibold text-lg'>Categories</h1>  
            <button onClick={()=> setShow(true)} className='bg-accent shadow-lg hover:shadow-accent/50 px-4 py-2 cursor-pointer text-white rounded-md text-sm font-semibold'>Add Category</button>
        </div>
        <div className="flex flex-wrap w-full -order-1 flex-row-reverse">
            <div className="w-full lg:w-6/12">
                <div className="w-full p-4 bg-[#283046] rounded-md ">
                    <Search setParpage={setParpage} setSearchValue={setSearchValue} searchValue={searchValue}/>
                    <div className="relative overflow-x-auto">
                        <table className='w-full text-sm text-left text-[#d0d2d6]'>
                            <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
                            <tr>
                                <th scope='col' className='py-3 px-4'>No</th>
                                <th scope='col' className='py-3 px-4'>Image</th>
                                <th scope='col' className='py-3 px-4'>Name</th>
                                <th scope='col' className='py-3 px-4'>Action</th>
                            </tr>

                            </thead>
                            <tbody>
                                {
                                   categories.map((categories,i)=> 
                                        <tr key={i}>
                                            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{i+1}</td>
                                            <td  scope='row' className='py-1aaaaa px-4 font-medium whitespace-nowrap'>
                                                {/* <img className='h-[90px] w-[90px] py-1' src={d.image ? `${d.image}` : '/images/admin-img.png'} alt="" /> */}
                                                <img className='h-[90px] w-[90px] py-1' src={categories.image} alt="" />
                                                {/* <p>{d.image}</p> */}
                                            </td>
                                            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                                <span>{categories.name}</span>
                                            </td>
                                            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                               <div className="flex justify-start items-center gap-4">
                                                    <Link className='p-2 bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit/></Link>
                                                    <Link className='p-2 bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'><FaTrash/></Link>
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
            <div className={`w-[400px] lg:w-6/12 -translate-x-13 lg:relative lg:right-6 fixed ${show ? 'right-0' : '-right-[500px]'} z-[9999] top-0 transition-all duration-500`}>
                <div className="w-full pl-5">
                    <div className="bg-[#283046] rounded-md h-screen lg:h-auto px-3 py-6 lg:rounded-md text-text_color">
                        <div className="flex justify-between items-center py-3">
                            <h1 className='text-text_color font-semibold text-xl'>Add Voucher</h1>
                            <div onClick={()=> setShow(false)} className="block lg:hidden cursor-pointer"><IoClose className='text-text_color' size={25} color='red'/></div>
                        </div>
                        <form onSubmit={add_Category} className=''>
                        <div className="flex flex-col w-full gap-1 mb-3 relative">
                            <label htmlFor="name">Voucher</label>
                            <div className="relative"> 
                                <input
                                    value={state.code}
                                    onChange={(e) => setState({ ...state, code: e.target.code })}
                                    id='code'
                                    name='code'
                                    className='w-full px-4 py-2 focus:border-accent outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]'
                                    type="text"
                                    placeholder='voucher code'
                                    required
                                />
                                <div className="absolute top-0 right-0 bottom-0 h-full w-[15%] flex justify-center items-center">
                                    <button type="button" onClick={generateCode}>
                                        <BiSolidDiscount size={30} />
                                    </button>
                                </div>
                            </div>
                        </div>



                        <div className="flex flex-col w-full gap-1 mb-3">
                            <label htmlFor="name">voucher</label>
                            <input
                                value={state.name}
                                onChange={(e) => setState({ ...state, name: e.target.value })}
                                id='name'
                                name='name'
                                className='px-4 py-2 focus:border-accent outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]'
                                type="text"
                                placeholder='category name'
                                required
                            />
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
                                        
                                            {openDate && <DateRangePicker className='custom-date-range-picker w-full  absolute top-[40px] z-[999999] '
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

                        <div className="">
                            <label htmlFor="image" className='flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-accent w-full border-text_color'>
                                {
                                    imageShow ? <img className='w-full h-full bg-red-600 object-fill' src={imageShow} alt="" required /> : <>
                                        <span><BsImage size='40px' /></span>
                                        <span className='font-semibold'>Select an Image</span>
                                    </>
                                }
                            </label>
                        </div>
                        <input onChange={imageHandler} className='hidden' type="file" name='image' id='image' />

                        <button disabled={loader ? true : false} className='bg-accent/50 w-full hover:shadow-[#6ED601]/10 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 font-bold mt-5'>
                            {loader ? <PropagateLoader color='#fff' cssOverride={overRideStyle} /> : 'Add Category'}
                        </button>
                    </form>

                    </div> 
                   
                </div>
                      
            </div>

        </div>

    </div>
  )
}

export default Voucher
