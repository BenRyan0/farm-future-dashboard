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
import { categoryAdd ,messageClear, get_category  } from '../../store/Reducers/categoryReducer';
import Search from './../components/Search';

const TraderAdd = () => {
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
        dispatch(categoryAdd(state))
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


const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value

    })
}


  return (
    <div className='px-2 lg:px-7 pt-5'>
        <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#283046] rounded-md">
                <h1 className='text-text_color font-semibold text-lg'>Categories</h1>  
            <button onClick={()=> setShow(true)} className='bg-accent shadow-lg hover:shadow-accent/50 px-4 py-2 cursor-pointer text-white rounded-md text-sm font-semibold'>Add Category</button>
        </div>
        <div className="flex flex-wrap w-full">
            <form action="">
                 <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-text_color">
                    <div className="flex flex-col w-full gap-3">
                            <div className="w-full">
                                <label htmlFor="name">Trader FirstName</label>
                                <input  onChange={inputHandle} value={state.firstName} className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Listing name'  name='name' id='name'/>
                            </div>
                            <div className="w-full">
                                <label htmlFor="name">Trader lastName</label>
                                <input  onChange={inputHandle} value={state.name} className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Listing name'  name='name' id='name'/>
                            </div>
                            <div className="w-full">
                                <label htmlFor="name">Trader Phone</label>
                                <input  onChange={inputHandle} value={state.name} className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Listing name'  name='name' id='name'/>
                            </div>
                            <div className="w-full">
                                <label htmlFor="name">Trader Email</label>
                                <input  onChange={inputHandle} value={state.name} className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Listing name'  name='name' id='name'/>
                            </div>
                            <div className="w-full">
                                <label htmlFor="name">Company Name</label>
                                <input  onChange={inputHandle} value={state.name} className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Listing name'  name='name' id='name'/>
                            </div>
                           
                    </div>

                </div>
            </form>
        {/* <form onSubmit={add}>
                    <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-text_color">
                        <div className="flex flex-col w-full gap-3">
                            <div className="w-full">
                                <label htmlFor="name">Listing Name</label>
                                <input  onChange={inputHandle} value={state.name} className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Listing name'  name='name' id='name'/>
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
                            
                    </div>
             </form> */}
        </div>

    </div>
  )
}

export default TraderAdd
