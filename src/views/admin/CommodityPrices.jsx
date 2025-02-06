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
import { categoryDelete } from '../../store/Reducers/categoryReducer';
import { commodityAdd,get_commodity,messageClear,adminCommodityPriceAdd} from '../../store/Reducers/commodityReducer';
import {get_category,get_additionalFeatures} from '../../store/Reducers/categoryReducer'
import Search from './../components/Search';
import Modal from './../../Components/Modal/modal';
import { FaChevronRight } from "react-icons/fa";
import HonestWeekPicker from './../../Components/week-picker/HonestWeekPicker';
import reportWebVitals from './../../reportWebVitals';
import MonthPicker from './../../Components/month-picker/MonthPicker';
import WeekDisplay from './../../Components/week-picker/WeekDisplay';
import { IoAnalyticsSharp } from "react-icons/io5";



const CommodityPrices = () => {
    const dispatch = useDispatch()
    const {categories, loader0, loader_delete  } = useSelector(state=>state.category)
    const {loader, successMessage, errorMessage,commodities  } = useSelector(state=>state.commodity)
    
    const [week, setWeek] = useState({ firstDay: Date.now() });


    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParpage] = useState(5)
    const [show,setShow] = useState(false)
    const [showCategory, setShowCategory] = useState(false)
    const [allCategory, setAllCategory] = useState([])
    const [imageShow, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [state, setState] = useState({
        name: '',
        description: '',
        category: category,
        unit: '',
        image: ''
    });

    const [weeklyPrice, setWeeklyPrice] = useState({
        id : '',
        weekRange: '',
        price: ''
    })

    useEffect(() => {
        setState((prevState) => ({
            ...prevState, // Keep the previous state
            category: category // Update the category
        }));
    }, [category]);

    useEffect(()=>{
        console.log("asdasd")
      console.log(state)
      console.log(category)
    })


    //  useEffect(() => {
    //     if (errorMessage) {
    //         toast.error(errorMessage);
    //         dispatch(messageClear());
    //     } else if (successMessage) {
    //         toast.success(successMessage);
    //         dispatch(messageClear());
           
    //     }
    // }, [successMessage, errorMessage, dispatch]);
    

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

    const add_Commodity = (e)=>{
        e.preventDefault()
       
        console.log(state)
        dispatch(commodityAdd(state))
    }

    const inputHandle = (e)=>{
        setState({
            ...state,
            [e.target.name] : e.target.value

        })
    }
  
       
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
useEffect(()=>{
if(errorMessage){
    toast.error(errorMessage)
    dispatch(messageClear())

}else{
    toast.success(successMessage)
    dispatch(messageClear())
    setState({
        name:'',
        image : '',
        week: week
        // week: Object.values(week)
    })
    setImage('')
    const obj = {
        parPage : parseInt(parPage),
        page : parseInt(currentPage),
        searchValue : "",
        week: week
        // week: Object.values(week)

    }
    dispatch(get_commodity(obj))
}


},[successMessage, errorMessage,week])

   useState(()=>{
        dispatch(get_category({
            searchValue : '',
            parPage : '',
            page : ""
        }))
        dispatch(get_additionalFeatures({
            searchValue : '',
            parPage : '',
            page : ""
        }))
    },[dispatch])

      useEffect(()=>{
        setAllCategory(categories)
       },[categories])


useEffect(()=>{
    const obj = {
        parPage : parseInt(parPage),
        page : parseInt(currentPage),
        searchValue,
        week: week
        // week: Object.values(week)

    }
    console.log(obj)
    dispatch(get_commodity(obj))
}, [searchValue, currentPage, parPage,week])


const handleDelete = (id)=>{
    dispatch(categoryDelete({id}))
}

const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedCategoryId, setSelectedCategoryId] = useState(null);

const openModal = (categoryId) => {
  setSelectedCategoryId(categoryId);
  setIsModalOpen(true);
};

const closeModal = () => {
  setSelectedCategoryId(null);
  setIsModalOpen(false);
};

const confirmDelete = () => {
  if (selectedCategoryId) {
    handleDelete(selectedCategoryId);
    closeModal();
  }
};



  const convertDate = (date) => {
    let dt = new Date(date);

    return `${dt.getDate()}.${dt.getMonth() + 1}.${dt.getFullYear()}`;
  };

  const onChange = (week) => {
    setWeek(week);
  };

  console.log(week)
//   console.log(weeklyPrice)

//   const submit_weekly_price =(e) =>{
//     e.preventDefault()
//     console.log(weeklyPrice)

//   }

const [weeklyPrices, setWeeklyPrices] = useState({}); 
 const handlePriceChange = (commodityId, value) => {
  setWeeklyPrices((prev) => ({
    ...prev,
    [commodityId]: {
      ...prev[commodityId],
      price: value,
    },
  }));
};

const submit_weekly_price = (e, commodityId) => {
    e.preventDefault();
  
    const weeklyPrice = weeklyPrices[commodityId] || {};
    const price = weeklyPrice.price;  // Get the price for this commodity
  
    console.log(`Submitting price for commodity ${commodityId}:`, price);
  
    // Dispatch action with price and week
    dispatch(adminCommodityPriceAdd({
      commodityId, 
      price, 
      week: week
    }));
  
    // Add your submission logic here
    // Reset the price for this commodity after submission
    setWeeklyPrices((prev) => ({
      ...prev,
      [commodityId]: { price: '' },  // Reset the price
    }));
  };


  
  return (
    <div className='px-2 lg:px-7 pt-5'>
        <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#283046] rounded-md">
                <h1 className='text-text_color font-semibold text-lg italic'>Commodities</h1>  
            <button onClick={()=> setShow(true)} className='bg-primaryDark uppercase shadow-lg hover:shadow-primaryDark/50 px-4 py-2 cursor-pointer text-white rounded-md text-sm font-semibold'>Set Week Range</button>
        </div>
        <div className="flex flex-wrap w-full ">
            <div className="w-full lg:w-9/12">
                <div className="w-full p-4 bg-[#283046] rounded-md ">
                    <Search setParpage={setParpage} setSearchValue={setSearchValue} searchValue={searchValue}/>
                    <div className="relative overflow-x-auto">
                        <div className="py-2">
                        <span>
                            {/* <WeekDisplay week={weekData}/> */}
                            {week && (
                                <WeekDisplay week={week} />
                            )}
                           
                        </span>
                        </div>
                  
                        <table className='w-full text-sm text-left text-[#d0d2d6]'>
                            
                            <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
                            <tr>
                                <th scope='col' className='py-3 px-4'>No</th>
                                {/* <th scope='col' className='py-3 px-4'>Image</th> */}
                                <th scope='col' className='py-3 px-4'>Name</th>
                                <th scope='col' className='py-3 px-4 hidden lg:block'>Price/Unit</th>
                                <th scope='col' className='py-3 px-4'>Action</th>
                            </tr>

                            </thead>
                            <tbody>
                                {
                                    loader_delete ? 
                                    (
                                    <div className="absolute bg-[#283046] top-0 bottom-0 left-0 right-0 w-full h-full text-center flex justify-center items-center ">
                                        <h2>Loading...</h2>
                                      </div>
                                    )
                                    :
                                    (
                                        <div className="">
                                            
                                        </div>
                                    )
                                }
                                 {commodities && commodities.length > 0 ? (
                                        commodities.map((commodity, i) => (
                                            <tr key={commodity._id || i}>
                                            <td className="py-1 px-4 font-medium whitespace-nowrap">{i + 1}</td>
                                            <td className="py-1 px-4 font-medium whitespace-nowrap">
                                                <span>{commodity.name}</span>
                                            </td>
                                            <td className="py-1 px-4 font-medium whitespace-nowrap hidden lg:table-cell ">
                                                    <span>{commodity.price}/{commodity.unit}</span>
                                            </td>

                                            <td className="py-1 px-4 font-medium">
                                                <div className="flex justify-start items-center gap-4">
                                                <form className='w-full flex gap-2 flex-col md:flex-row' onSubmit={(e) => submit_weekly_price(e, commodity._id)}>
                                                        <div className="relative text-slate-800  w-fit">
                                                            <input
                                                            value={weeklyPrices[commodity._id]?.price || ''}
                                                            onChange={(e) => handlePriceChange(commodity._id, e.target.value)}
                                                            id={`price-${commodity._id}`}
                                                            name="price"
                                                            className={`py-2 px-2 pr-1 lg:pr-5 rounded-sm outline-none ${commodity.done ? 'bg-slate-800' : ''}`}
                                                            type="number"
                                                            placeholder={commodity.done ? `${commodity.price}/${commodity.unit}` : 'Price'}
                                                            />
                                                            <button
                                                            disabled={commodity.done}
                                                            className={`px-2 py-1  absolute right-0 top-0 bottom-0 flex justify-center items-center gap-2 text-slate-200 font-semibold ${commodity.done ? 'bg-slate-800' : 'bg-primaryDark'}`}
                                                            >
                                                            {commodity.done ? 'DONE' : 'submit'} <FaChevronRight />
                                                            </button>
                                                            
                                                        </div>
                                                        <Link to={`/admin/dashboard/commodity-statistics/${commodity._id}`}  className={`py-2 px-3 rounded-sm outline-none flex justify-center items-center gap-1 ${commodity.done ? 'bg-slate-800' : 'hidden'}`}> 
                                                            analytics <IoAnalyticsSharp />
                                                        </Link>
                                                    </form>

                                                        
                                                </div>
                                            </td>
                                            </tr>
                                        ))
                                        ) : (
                                        <tr>
                                            <td colSpan="4" className="px-4 text-center font-medium py-5">
                                            No Commodities Available.
                                            </td>
                                        </tr>
                                        )}
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
                        {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-[300px]">
                        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                        <p className="mb-6">Are you sure you want to delete this category?</p>
                        <div className="flex justify-end gap-4">
                        <button
                            onClick={closeModal}
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDelete}
                            className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
                        >
                            Delete
                        </button>
                        </div>
                    </div>
                    </div>
                )}
                <div className={`w-[370px] lg:w-3/12 translate-x-100 lg:relative lg:right-0 fixed ${show ? 'right-0' : '-right-[370px]'} z-[9999] top-0 transition-all duration-500`}>
                <div className="w-full pl-5 ">
                    <div className="bg-[#283046] rounded-md h-screen lg:h-auto px-5 pt-2 pb-6 lg:rounded-md text-text_color">
                        <div className="flex justify-between items-center py-3">
                            <div className="flex w-full justify-between">
                            <h1 className='text-text_color font-semibold text-xl'>WEEK SELECTOR</h1>
                            {/* <button 
                                onClick={() => setWeek({ firstDay: Date.now()})} 
                                className="bg-primaryDark px-2 py-1 rounded-sm font-semibold"
                                >
                                Set to Current
                                </button> */}

                            </div>
                            <div onClick={()=> setShow(false)} className="block lg:hidden cursor-pointer"><IoClose className='text-text_color' size={25} color='red'/></div>
                        </div>
                        <form className=''>
                            <div className="flex flex-col w-full gap-1 mb-3">
                                {/* <label htmlFor="name">Commodity name</label> */}
                                <div className="">
                                     <HonestWeekPicker onChange={onChange}/>
                                     {/* <MonthPicker/>  */}
                                </div>
                                  
                                {/* <input value={state.name} onChange={(e)=>setState({...state, name: e.target.value})} id='name' name='name' className='px-4 py-2 focus:border-accent outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Commodity name' required/> */}
                            </div>
                            

                             
                            {/* <input onChange={imageHandler} className='hidden' type="file" name='image' id='image' /> */}
                     
                            {/* <button disabled={loader ? true : false} className='bg-accent/50 w-full hover:shadow-[#6ED601]/10 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 font-bold mt-5'>
                                {
                                       loader ? <PropagateLoader color='#fff'cssOverride = {overRideStyle}/> :'Add Commodity'
                                }
                            </button> */}
                         </form>
                        
                    </div> 
                   
                </div>
                      
            </div>

        </div>

    </div>
  )
}

export default CommodityPrices