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
import { categoryAdd , get_category,  messageClear} from '../../store/Reducers/categoryReducer';
import Search from './../components/Search';

const Category = () => {
    const dispatch = useDispatch()
    const { loader, successMessage, errorMessage, categories } = useSelector(state=>state.category)
    console.log(categories)
    const category = categories
    // console.log("asdasd" +  categories.image)


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
        // console.log(state)
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

  return (
    <div className='px-2 lg:px-7 pt-5'>
        <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#283046] rounded-md">
                <h1 className='text-text_color font-semibold text-lg'>Categories</h1>  
            <button onClick={()=> setShow(true)} className='bg-accent shadow-lg hover:shadow-accent/50 px-4 py-2 cursor-pointer text-white rounded-md text-sm font-semibold'>Add Category</button>
        </div>
        <div className="flex flex-wrap w-full ">
            <div className="w-full lg:w-7/12">
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
                                   category.map((d,i)=> 
                                        <tr key={i}>
                                            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{i+1}</td>
                                            <td  scope='row' className='py-1aaaaa px-4 font-medium whitespace-nowrap'>
                                                <img className='h-[90px] w-[90px] py-1' src={d.image} alt="" />
                                                {/* <p>{d.image}</p> */}
                                            </td>
                                            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                                <span>{d.name}</span>
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
            <div className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${show ? 'right-0' : '-right-[340px]'} z-[9999] top-0 transition-all duration-500`}>
                <div className="w-full pl-5">
                    <div className="bg-[#283046] rounded-md h-screen lg:h-auto px-3 py-6 lg:rounded-md text-text_color">
                        <div className="flex justify-between items-center py-3">
                            <h1 className='text-text_color font-semibold text-xl'>Add Category</h1>
                            <div onClick={()=> setShow(false)} className="block lg:hidden cursor-pointer"><IoClose className='text-text_color' size={25} color='red'/></div>
                        </div>
                        <form onSubmit={add_Category} className=''>
                      
                     
                            <div className="flex flex-col w-full gap-1 mb-3">
                                <label htmlFor="name">Category name</label>
                                <input value={state.name} onChange={(e)=>setState({...state, name: e.target.value})} id='name' name='name' className='px-4 py-2 focus:border-accent outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='category name' required/>
                            </div>
                            <div className="">
                                <label htmlFor="image" className='flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-accent w-full border-text_color'>
                                    {
                                        imageShow ? <img className='w-ful h-full bg-red-600 object-fill' src={imageShow} alt="" required/> : <>
                                            <span><BsImage size='40px'/></span>
                                           <span className='font-semibold'>Select an Image</span>
                                        </>
                                    }
                                    
                                </label>
                            </div>
                            <input onChange={imageHandler} className='hidden' type="file" name='image' id='image' />
                     
                            <button disabled={loader ? true : false} className='bg-accent/50 w-full hover:shadow-[#6ED601]/10 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 font-bold mt-5'>
                                {
                                       loader ? <PropagateLoader color='#fff'cssOverride = {overRideStyle}/> :'Add Category'
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

export default Category
