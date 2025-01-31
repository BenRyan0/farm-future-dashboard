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
import { messageClear, get_category ,categoryDelete } from '../../store/Reducers/categoryReducer';
import { commodityAdd } from '../../store/Reducers/commodityReducer';
import Search from './../components/Search';
import Modal from './../../Components/Modal/modal';

const Commodity = () => {
  const dispatch = useDispatch()
    const {categories, loader, successMessage, errorMessage, loader_delete  } = useSelector(state=>state.category)

    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParpage] = useState(5)
    const [show,setShow] = useState(false)
    const [imageShow, setImage] = useState('')
    const [state,setState] = useState({
        name: '',
        image: '',
        price: '',
    })

    useEffect(()=>{
      console.log(state)
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

    const add_Category = (e)=>{
        e.preventDefault()
        console.log(state)
        dispatch(commodityAdd(state))
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
    const obj = {
        parPage : parseInt(parPage),
        page : parseInt(currentPage),
        searchValue : ""

    }
    dispatch(get_category(obj))
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
  return (
    <div className='px-2 lg:px-7 pt-5'>
        <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#283046] rounded-md">
                <h1 className='text-text_color font-semibold text-lg'>Categories</h1>  
            <button onClick={()=> setShow(true)} className='bg-accent shadow-lg hover:shadow-accent/50 px-4 py-2 cursor-pointer text-white rounded-md text-sm font-semibold'>Add Category</button>
        </div>
        <div className="flex flex-wrap w-full ">
            <div className="w-full lg:w-8/12">
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
                            {categories && categories.length > 0 ? (
                                    categories.map((category, i) => (
                                    <tr key={i}>
                                        <td className="py-1 px-4 font-medium whitespace-nowrap">{i + 1}</td>
                                        <td className="py-1 px-4 font-medium whitespace-nowrap">
                                        <img className="h-[90px] w-[90px] py-1" src={category.image || "/images/admin-img.png"} alt="Category" />
                                        </td>
                                        <td className="py-1 px-4 font-medium whitespace-nowrap">
                                        <span>{category.name}</span>
                                        </td>
                                        <td className="py-1 px-4 font-medium whitespace-nowrap">
                                        <div className="flex justify-start items-center gap-4">
                                            <button
                                            onClick={() => openModal(category._id)}
                                            className={`p-2 rounded flex justify-center items-center gap-1 font-bold ${
                                                loader_delete === category._id
                                                ? "bg-gray-500 cursor-not-allowed"
                                                : "bg-red-500 hover:shadow-lg hover:shadow-red-500/50"
                                            }`}
                                            disabled={loader_delete === category._id}
                                            >
                                            {loader_delete === category._id ? (
                                                <span className="flex items-center gap-2">
                                                Deleting... <span className="loader"></span>
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                REMOVE <FaTrash />
                                                </span>
                                            )}
                                            </button>
                                        </div>
                                        </td>
                                    </tr>
                                    ))
                                ) : (
                                    <tr>
                                    <td colSpan="4" className="px-4 text-center font-medium py-5">No categories available.</td>
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
                  <div className={`w-[320px] lg:w-4/12 translate-x-100 lg:relative lg:right-0 fixed ${show ? 'right-0' : '-right-[340px]'} z-[9999] top-0 transition-all duration-500`}>
                <div className="w-full pl-5 ">
                    <div className="bg-[#283046] rounded-md h-screen lg:h-auto px-5 py-6 lg:rounded-md text-text_color">
                        <div className="flex justify-between items-center py-3">
                            <h1 className='text-text_color font-semibold text-xl'>Add Commodity</h1>
                            <div onClick={()=> setShow(false)} className="block lg:hidden cursor-pointer"><IoClose className='text-text_color' size={25} color='red'/></div>
                        </div>
                        <form onSubmit={add_Category} className=''>
                      
                            <div className="flex flex-col w-full gap-1 mb-3">
                                <label htmlFor="name">Commodity name</label>
                                <input value={state.name} onChange={(e)=>setState({...state, name: e.target.value})} id='name' name='name' className='px-4 py-2 focus:border-accent outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Commodity name' required/>
                            </div>
                            <div className="flex flex-col w-full gap-1 mb-3">
                                <label htmlFor="name">Commodity Price</label>
                                <input value={state.price} onChange={(e)=>setState({...state, price: e.target.value})}  id='price' name='price' className='px-4 py-2 focus:border-accent outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' type="number" placeholder='Commodity Price' required/>
                            </div>
                            <div className="">
                                <label htmlFor="image" className='flex justify-center items-center flex-col h-[238px] rounded-md cursor-pointer border border-dashed hover:border-accent w-full border-text_color'>
                                    {
                                        imageShow ? <img className='w-ful h-full object-fill' src={imageShow} alt="" required/> : <>
                                            <span><BsImage size='40px'/></span>
                                           <span className='font-semibold'>Select an Image</span>
                                        </>
                                    }
                                    
                                </label>
                            </div>
                            <input onChange={imageHandler} className='hidden' type="file" name='image' id='image' />
                     
                            <button disabled={loader ? true : false} className='bg-accent/50 w-full hover:shadow-[#6ED601]/10 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 font-bold mt-5'>
                                {
                                       loader ? <PropagateLoader color='#fff'cssOverride = {overRideStyle}/> :'Add Commodity'
                                }
                            </button>
                         </form>
                        
                    </div> 
                   
                </div>
                      
            </div>

        </div>

    </div>
  )
}

export default Commodity