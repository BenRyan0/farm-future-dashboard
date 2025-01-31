import React ,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Pagination from '../Pagination';
import { FaEdit, FaTrash } from 'react-icons/fa'
import { BsImage } from 'react-icons/bs';
import { IoClose } from "react-icons/io5";
import voucher_codes from 'voucher-code-generator';
import {PropagateLoader} from 'react-spinners'
import { overRideStyle } from './../../utils/Utils';
import { toast } from 'react-hot-toast';

import {useSelector, useDispatch} from 'react-redux'
import { voucherAdd ,messageClear, get_category,get_vouchers,voucherDelete,voucherRemove } from '../../store/Reducers/voucherReducer';
// import { categoryAdd ,messageClear, get_category  } from '../../store/Reducers/categoryReducer';
import { BiSolidDiscount } from "react-icons/bi";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style fileDateRangePicker
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import '../../Components/custom-date-range-picker.css'
import Search from './../components/Search';
import { FaPercentage } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";
import { TbCurrencyPeso } from "react-icons/tb";
import { FaCheck } from "react-icons/fa";
import { FaX } from "react-icons/fa6";



const Voucher = () => {
    const dispatch = useDispatch()
    // const {categories, loader, successMessage, errorMessage  } = useSelector(state=>state.category)
    const { userInfo } = useSelector(state => state.auth);
    const {categories, loader, successMessage, errorMessage,totalVouchers ,vouchers } = useSelector(state=>state.voucher)

    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParpage] = useState(5)
    const [show,setShow] = useState(false)
    const [imageShow, setImage] = useState('')
    const [state,setState] = useState({
        code: '',
        discount: '',
        voucherStartDate: "",
        voucherEndDate: "",
        discountType : "",
        sellerId: userInfo._id
    })
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection', 
      });



      const [copiedIndex, setCopiedIndex] = useState(null); // Tracks which row was copied
 
useEffect(()=>{
if(errorMessage){
    toast.error(errorMessage)
    dispatch(messageClear())
}else{
    toast.success(successMessage)
    dispatch(messageClear())
   
    const obj = {
        parPage : parseInt(parPage),
        page : parseInt(currentPage),
        sellerId : userInfo._id,
        searchValue

    }
    dispatch(get_vouchers(obj))
}
},[successMessage, errorMessage])

useEffect(()=>{
    const obj = {
        parPage : parseInt(parPage),
        page : parseInt(currentPage),
        sellerId : userInfo._id,
        searchValue

    }
    dispatch(get_vouchers(obj))
}, [searchValue, currentPage, parPage])


// DatePicker - start
// const handleChange = (ranges) => {
//     setDateRange(ranges.selection)
//     setState((prevState) => ({
//         ...prevState,
//         voucherStartDate: format(dateRange.startDate, "MMM dd yyyy"),
//         voucherEndDate: format(dateRange.endDate, "MMM dd yyyy"),
//     }));

// }
const handleChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setDateRange(ranges.selection);
    setState((prevState) => ({
        ...prevState,
        voucherStartDate: format(startDate, "MMM dd yyyy"),
        voucherEndDate: format(endDate, "MMM dd yyyy"),
    }));
};

const handleClick = () => { setOpenDate((prev) => !prev)}

// const generateCode = () => {
//     const code_ = voucher_codes.generate({
//         length: 10,
//         count: 1
//     });

//     // Set the new state
//     setState(prevState => {
//         const newState = { code: code_ };
//         console.log("_____________________ >");
//         console.log(newState.code);
//         return newState;
//     });
// }
const generateCode = () => {
    const code_ = voucher_codes.generate({
        length: 10,
        count: 1
    });

    // Set the new state to an object with 'code' property
    setState(prevState => ({
        ...prevState, // Keep the previous state intact
        code: code_   // Update or add the 'code' property
    }));

    console.log("_____________________ >");
    console.log(code_);
}


const [openDate, setOpenDate] = useState()
   
      const inputHandler_ = (e) => {
        setState({
            ...state,
            // [e.target.name] : e.target.value
            discountType: e.target.value,
        });
    };
    
    const inputHandle = (e)=>{
        setState({
            ...state,
            [e.target.name] : e.target.value

        })
    }
    useEffect(() => {
        console.log("Updated state in useEffect:", state);
    }, [state]);


    const add_voucher = (e) => {
        e.preventDefault();
        console.log(dateRange);
     
        // This will log the state after it's been updated.
        console.log("State after update:", state);
        setState((prevState) => ({
            ...prevState,
            voucherStartDate: format(dateRange.startDate, "MMM dd yyyy"),
            voucherEndDate: format(dateRange.endDate, "MMM dd yyyy"),
        }));
        dispatch(voucherAdd(state))

        const obj = {
            parPage : parseInt(parPage),
            page : parseInt(currentPage),
            sellerId : userInfo._id,
            searchValue
    
        }
        dispatch(get_vouchers(obj))
    };
    
    // You can also use useEffect to monitor the state change

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US').format(num);
      };
  

      const handleCopy = (code, index) => {
        navigator.clipboard.writeText(code); // Copy the code to clipboard
        setCopiedIndex(index); // Set the copied index to show feedback
    
        // Reset the copied message after 2 seconds
        setTimeout(() => {
          setCopiedIndex(null);
        }, 2000);
      };
    
      

  return (
    <div className='px-2 lg:px-7 pt-5'>
        <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#283046] rounded-md">
                <h1 className='text-text_color font-semibold text-lg'>Categories</h1>  
            <button onClick={()=> setShow(true)} className='bg-accent shadow-lg hover:shadow-accent/50 px-4 py-2 cursor-pointer text-white rounded-md text-sm font-semibold'>Add Voucher</button>
        </div>
        <div className="flex flex-wrap w-full flex-col-reverse gap-2">
            <div className="w-full lg:full">
                <div className="w-full p-4 bg-[#283046] rounded-md ">
                    <Search setParpage={setParpage} setSearchValue={setSearchValue} searchValue={searchValue}/>
                    <div className="relative overflow-x-auto">
                        <table className='w-full text-sm text-left text-[#d0d2d6]'>
                            <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
                            <tr>
                                {/* <th scope='col' className='py-3 px-4'>No</th> */}
                                <th scope='col' className='py-3 px-4'>Code</th>
                                <th scope='col' className='py-3 px-4'>Value</th>
                                <th scope='col' className='py-3 px-4'>Start date</th>
                                <th scope='col' className='py-3 px-4'>End date</th>
                                <th scope='col' className='py-3 px-4'>Status</th>
                                <th scope='col' className='py-3 px-4'>Action</th>
                            </tr>

                            </thead>
                            <tbody>
                                {
                                   vouchers.map((v,i)=> 
                                        <tr key={i}>
                                            {/* <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{i+1}</td> */}
                                            <td  scope='row' className='py-1 px-4 font-medium whitespace-nowrap flex justify-start items-center gap-2 '>
                                                <span>{v.code}</span>
                                                <div className="relative">
                                                    <button
                                                        onClick={() => handleCopy(v.code, i)}
                                                        className="p-2 rounded hover:shadow-lg text-white hover:text-primary"
                                                        >
                                                       <FaRegCopy />
                                                        </button>
                                                        {copiedIndex === i && (
                                                        <span className="text-green-500 font-medium absolute bottom-1">Copied!</span>
                                                        )}

                                                </div>
                                               
                                            </td>
                                            <td  scope='row' className='py-1aaaaa px-4 font-medium whitespace-nowrap'>
                                                {
                                                    v.discountType === "percentage" ? 
                                                    
                                                    <span>{formatNumber(v.value)} %</span>
                                                    // <span>{v.value}%</span>
                                                    :
                                                    <span>{formatNumber(v.value)} <span>&#8369;</span></span>
                                                    // <span>{v.value}<span>&#8369;</span></span>


                                                }
                                                
                                            </td>
                                            <td  scope='row' className='py-1aaaaa px-4 font-medium whitespace-nowrap'>
                                                 <span>{format(v.startDate, 'MM - dd - yy')}</span>
                                                {/* <span>{v.startDate}</span> */}
                                            </td>
                                            <td  scope='row' className='py-1aaaaa px-4 font-medium whitespace-nowrap'>
                                                <span>{format(v.expirationDate, 'MM - dd - yy')}</span>
                                                {/* <span>{v.expirationDate}</span> */}
                                            </td>
                                            <td  scope='row' className='py-1aaaaa px-4  whitespace-nowrap font-bold'>
                                                {
                                                    v.isRedeemed ? 
                                                    <div className="flex justify-start items-center gap-1 text-red-400">
                                                       Unavailable <FaX />
                                                    </div> : 
                                                    <div className="flex justify-start items-center gap-1 text-green-400">
                                                       Available <FaCheck />
                                                    </div>
                                                }
                                            {/* <span>{v.isRedeemed}</span> */}
                                            </td>
                                            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                               <div className="flex justify-start items-center gap-4">
                                                    {/* <Link className='p-2 bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit/></Link> */}
                                                    {/* <button onClick={() => dispatch(voucherDelete({ code: v.code, sellerId: userInfo._id }))} className='p-2 bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50 flex justify-center items-center'>DISABLE <FaTrash/></button> */}
                                                    <button onClick={() => dispatch(voucherRemove({ code: v.code, sellerId: userInfo._id }))} className='p-2 bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50 flex justify-center items-center gap-1'>DELETE<FaTrash/></button>
                                               </div>
                                            </td>
                                        </tr>
                                ) }
                            </tbody>
                        </table>
                    </div>   
                    <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                        {
                            totalVouchers <= parPage ? "" :
                            <Pagination
                            pageNumber = {currentPage}
                            setPageNumber = {setCurrentPage}
                            totalItem = {totalVouchers}
                            parPage = {parPage}
                            showItem = {4}
                        />
                        }
                         {/* <Pagination
                            pageNumber = {currentPage}
                            setPageNumber = {setCurrentPage}
                            totalItem = {50}
                            parPage = {parPage}
                            showItem = {4}
                        /> */}
                    </div>

                      {/* {
                                    totalOrder <= parPage ? "" :
                                    <Pagination
                                    pageNumber = {currentPage}
                                    setPageNumber = {setCurrentPage}
                                    totalItem = {50}
                                    parPage = {parPage}
                                    showItem = {4}
                                />
                                } */}

                </div>
            </div>
            <div className={`w-[450px] lg:w-9/12 translate-x-500 lg:relative  lg:right-3 fixed ${show ? 'right-0' : '-right-[440px]'} z-[9999] top-0 transition-all duration-500`}>
                <div className="w-full pl-5">
                    <div className="bg-[#283046] rounded-md h-screen lg:h-auto px-3 py-6 lg:rounded-md text-text_color">
                        <div className="flex justify-between items-center py-3">
                            <h1 className='text-text_color font-semibold text-xl'>Add Voucher</h1>
                            <div onClick={()=> setShow(false)} className="block lg:hidden cursor-pointer"><IoClose className='text-text_color' size={25} color='red'/></div>
                        </div>
                        <form onSubmit={add_voucher} className=''>
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

                        <div className="w-full flex-row flex relative justify-between">
                                    <div className="w-full">
                                        <label htmlFor="name">Discount</label>
                                        <div className="flex flex-row items-center border-2 border-slate-700 rounded-md px-2 gap-1">
                                            <input  onChange={inputHandle} value={state.discount} className='w-full bg-transparent px-1 py-2 focus:border-accent outline-none bg-[#283046]  text-[#d0d2d6]' type="number" placeholder='discount' min='0' name='discount' id='discount'/>
                                        </div>
                                    </div>
                                    <div className="absolute right-1 bottom-1 ">
                                        <div className="flex">
                                            <select 
                                                id="discount" 
                                                name="discount" 
                                                onChange={inputHandler_} 
                                                value={state.discountType} 
                                                className=" bg-[#283046] pr-4 pb-2 outline-none rounded-md text-[#d0d2d6] border-none w-full"
                                            >
                                                <option value="">TYPE</option>
                                                <option value="percentage">percentage % </option>
                                                <option value="fixed">fixed <TbCurrencyPeso /></option>
                                            </select>
                                         </div>
                                    </div>

                                   
                                    
                                </div>
                        <div className="w-full flex flex-col items-start justify-center ">
                                <label htmlFor="name">Voucher Date Range</label>
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
                

                        <button disabled={loader ? true : false} className='bg-accent/50 w-full hover:shadow-[#6ED601]/10 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 font-bold mt-5'>
                            {loader ? <PropagateLoader color='#fff' cssOverride={overRideStyle} /> : 'Add Voucher'}
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
