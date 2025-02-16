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
import { commodityAdd,get_commodities_seller,messageClear,commodityDelete,commodityAddToSellerListing,getSellerCommodities,removeCommodityFromSellerListing } from '../../store/Reducers/commodityReducer';
import {get_category,get_additionalFeatures} from '../../store/Reducers/categoryReducer'
import Search from './../components/Search';
import Modal from './../../Components/Modal/modal';
import { FaChevronRight } from "react-icons/fa";
import Search2 from './../components/Search2';

const Commodity = () => {
  const dispatch = useDispatch()
    const {categories, loader0, loader_delete  } = useSelector(state=>state.category)
    const {userInfo} = useSelector(state=>state.auth)
    const {loader, successMessage, errorMessage,commodities, sellerCommodities  } = useSelector(state=>state.commodity)

    const [currentPage, setCurrentPage] = useState(1)
    const [currentPage1, setCurrentPage1] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [searchValue1, setSearchValue1] = useState('')
    const [parPage, setParpage] = useState(5)
    const [parPage1, setParpage1] = useState(5)
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
        week: "",
        sellerId: userInfo._id
        // week: Object.values(week)
    })
    setImage('')
    const obj = {
        parPage : parseInt(parPage),
        page : parseInt(currentPage),
        searchValue : "",
        week: "",
        sellerId: userInfo._id
        // week: Object.values(week)

    }
    dispatch(get_commodities_seller(obj))


    const obj1 = {
        parPage: parseInt(parPage1),
        page: parseInt(currentPage1),
        searchValue: searchValue1, // Ensure you're using the correct state here
        sellerId: userInfo._id, // User's ID (sellerId)
      };
    
      dispatch(getSellerCommodities(obj1));
}


},[successMessage, errorMessage])

useEffect(() => {
    const obj = {
        parPage: parseInt(parPage1),
        page: parseInt(currentPage1),
        searchValue: searchValue1,
        sellerId: userInfo._id,
    };
    dispatch(getSellerCommodities(obj));
}, [searchValue1, currentPage1, parPage1, userInfo._id]);




useEffect(()=>{
    const obj = {
        parPage : parseInt(parPage),
        page : parseInt(currentPage),
        searchValue,
        week : '',
        sellerId: userInfo._id
        

    }
    console.log(obj)
    dispatch(get_commodities_seller(obj))
}, [searchValue, currentPage, parPage])

useEffect(() => {
    const obj = {
      parPage: parseInt(parPage1),
      page: parseInt(currentPage1),
      searchValue: searchValue1, // Ensure you're using the correct state here
      sellerId: userInfo._id, // User's ID (sellerId)
    };
  
    dispatch(getSellerCommodities(obj));
  }, [searchValue1, currentPage1, parPage1, userInfo._id]);
  

  

// useEffect(()=>{
//     const obj = {
//         parPage : parseInt(parPage1),
//         page : parseInt(currentPage1),
//         searchValue,
//         week : '',
//         sellerId: userInfo._id

//     }
//     dispatch(getSellerCommodities(obj))
//     // dispatch(getSellerCommodities({sellerId:userInfo._id}))
// }, [searchValue1, currentPage1, parPage1])





const handleDelete = ({sellerId, commodityId})=>{
    dispatch(removeCommodityFromSellerListing({sellerId, commodityId}))
}

const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedCommodityId, setSelectedCommodityId] = useState(null);
// const [selectedCategoryId, setSelectedCategoryId] = useState(null);

const openModal = (commodityId) => {
    setSelectedCommodityId(commodityId);
     setIsModalOpen(true);
};

const closeModal = () => {
    setSelectedCommodityId(null);
  setIsModalOpen(false);
};

const confirmDelete = () => {
  if (selectedCommodityId) {
    handleDelete({sellerId:userInfo._id, commodityId:selectedCommodityId});
    closeModal();
  }
};



// const handleAddToListing = ({id,comId})=>{
//     dispatch(commodityAddToSellerListing({id,comId}))
// }

const handleAddToListing = async ({sellerId, commodityId}) => {
    console.log("__________________________________")
    console.log(commodityId)
    try {
      await dispatch(commodityAddToSellerListing({sellerId: userInfo._id, commodityId }));
  
      // Fetch the updated seller commodities
      await dispatch(getSellerCommodities({ sellerId: userInfo._id }));
    } catch (error) {
      console.error("Error adding commodity:", error);
    }
  };
  
  return (
    <div className='px-2 lg:px-7 pt-5'>
        <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#283046] rounded-md">
                <h1 className='text-text_color font-semibold text-lg italic'>Commodities</h1>  
            <button onClick={()=> setShow(true)} className='bg-accent shadow-lg hover:shadow-accent/50 px-4 py-2 cursor-pointer text-white rounded-md text-sm font-semibold'>Add Commodity</button>
        </div>
        <div className="flex flex-wrap w-full xl:gap-0 gap-3">
            <div className="w-full xl:w-6/12 pr-1">
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
                                    <tr key={i}>
                                        <td className="py-1 px-4 font-medium whitespace-nowrap">{i + 1}</td>
                                        <td className="py-1 px-4 font-medium whitespace-nowrap">
                                            {
                                                commodity.image && (
                                                    <img className="h-[90px] w-[90px] py-1" src={commodity.image || "/images/admin-img.png"} alt="Category" />

                                                )
                                            }
                                        </td>
                                        <td className="py-1 px-4 font-medium text-wrap">
                                        <span>{commodity.name}</span>
                                        </td>
                                        <td className="py-1 font-medium whitespace-nowrap">
                                        <div className="flex justify-start items-center gap-4">
                                            <button
                                            onClick={() => handleAddToListing({sellerId:userInfo._id , commodityId :commodity._id})}
                                            className={`p-2 rounded flex justify-center items-center gap-1 font-bold ${
                                                loader_delete === commodity._id
                                                ? "bg-gray-500 cursor-not-allowed"
                                                : "bg-orange-500 hover:shadow-lg hover:shadow-orange-500/50"
                                            }`}
                                            disabled={loader_delete === commodity._id}
                                            >
                                            {loader_delete === commodity._id ? (
                                                <span className="flex items-center gap-2">
                                                ADDING... <span className="loader"></span>
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                IM SELLING THIS <FaChevronRight size={15} />
                                                </span>
                                            )}
                                            </button>
                                           
                                        </div>
                                        </td>
                                    </tr>
                                    ))
                                ) : (
                                    <tr>
                                    <td colSpan="4" className="px-4 text-center font-medium py-5">No Commodities yet to be Added</td>
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

            <div className="w-full xl:w-6/12 pl-1">
                <div className="w-full p-4 bg-[#283046] rounded-md ">
                    <Search2 setParpage1={setParpage1} setSearchValue1={setSearchValue1} searchValue1={searchValue1}/>
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
                            {sellerCommodities && sellerCommodities.length > 0 ? (
                                  sellerCommodities.map((commodity, i) => (
                                    <tr key={i}>
                                        <td className="py-1 px-4 font-medium whitespace-nowrap">{i + 1}</td>
                                        <td className="py-1 px-4 font-medium whitespace-nowrap">
                                            {
                                                commodity.image && (
                                                    <img className="h-[90px] w-[90px] py-1" src={commodity.image || "/images/admin-img.png"} alt="Category" />

                                                )
                                            }
                                        {/* <img className="h-[90px] w-[90px] py-1" src={commodity.image || "/images/admin-img.png"} alt="Category" /> */}
                                        </td>
                                        <td className="py-1 px-4 font-medium text-wrap">
                                        <span>{commodity.name}</span>
                                        </td>
                                        <td className="py-1 font-medium whitespace-nowrap">
                                        <div className="flex justify-start items-center gap-4">
                                            <button
                                            onClick={() => openModal(commodity._id)}
                                            className={`p-2 rounded flex justify-center items-center gap-1 font-bold ${
                                                loader_delete === commodity._id
                                                ? "bg-gray-500 cursor-not-allowed"
                                                : "bg-red-500 hover:shadow-lg hover:shadow-red-500/50"
                                            }`}
                                            disabled={loader_delete === commodity._id}
                                            >
                                            {loader_delete === commodity._id ? (
                                                <span className="flex items-center gap-2">
                                                Deleting... <span className="loader"></span>
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                REMOVE <FaTrash />
                                                </span>
                                            )}
                                            </button>
                                        
                                            <button className='bg-green-500 flex justify-center items-center px-3 py-2 rounded-md gap-2'>
                                                <Link to={`/admin/dashboard/commodity/${commodity._id}`}> Prices</Link>
                                                <FaChevronRight size={15} />
                                            </button>
                                        </div>
                                        </td>
                                    </tr>
                                    ))
                                ) : (
                                    <tr>
                                    <td colSpan="4" className="px-4 text-center font-medium py-5">No Commodities Available.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>   
                    <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                         <Pagination
                            pageNumber = {currentPage1}
                            setPageNumber = {setCurrentPage1}
                            totalItem = {50}
                            parPage = {parPage1}
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
             

        </div>

    </div>
  )
}

export default Commodity