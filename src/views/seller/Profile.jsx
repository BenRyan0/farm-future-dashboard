import React, { useEffect, useState} from 'react'
import { IoMdImages } from "react-icons/io";
import {FadeLoader} from 'react-spinners'
import { MdEdit } from "react-icons/md";
import { FiLoader } from "react-icons/fi";
import { FaUserCheck } from "react-icons/fa6";

import { format } from 'date-fns';
import dateFormat, { masks } from "dateformat";
import { FaChevronDown } from "react-icons/fa6";
// TOAST
// 
import toast from 'react-hot-toast'

import {useSelector, useDispatch} from 'react-redux'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


import {profile_image_upload , messageClear,change_password,change_password_seller} from '../../store/Reducers/authReducer'


const Profile = () => { 
    const [state, setState] = useState({
        division : '',
        district : '',
        shopName: '',
        sub_district : ''
    })
    const dispatch = useDispatch();
    const {userInfo, loader, successMessage, errorMessage} = useSelector(state => state.auth)
 const [isFormVisible, setFormVisible] = useState(false);
 const toggleFormVisibility = () => {
    setFormVisible(prevState => !prevState);
  };

    const add_image = (e)=>{
      
        if(e.target.files.length > 0){
            const formData = new FormData()
            console.log(e.target.files[0])

            formData.append('image', e.target.files[0]);
            // console.log([...formData]); // Log FormData content to ensure it’s correctly populated
            dispatch(profile_image_upload(formData));
        } 
    }


    useEffect(()=>{
        if(successMessage){
            toast.success(successMessage)
            messageClear()
        }
    },[successMessage])



    // const inputHandle = (e) =>{
    //     setState({
    //         ...state,
    //         [e.target.name] : e.target.value
    //     })
    // }
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'current_password') {
          setCurrentPassword(value);
        } else if (name === 'new_password') {
          setNewPassword(value);
        } else if (name === 'confirm_password') {
          setConfirmPassword(value);
        }
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        e.preventDefault();
        if(!confirmPassword === newPassword){
          toast.error("The new password and confirm password does not match")
          return
        }
    // console
        // Dispatch change password action
        dispatch(
            change_password_seller({
            confirmPassword,
            currentPassword,
            newPassword,
            id: userInfo._id,
          })
        );
      };

      const togglePasswordVisibility = (field) => {
        if (field === 'current') {
          setShowCurrentPassword(!showCurrentPassword);
        } else if (field === 'new') {
          setShowNewPassword(!showNewPassword);
        } else if (field === 'confirm') {
          setShowConfirmPassword(!showConfirmPassword);
        }
      };

      useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    }, [successMessage, errorMessage])
  return (
    <div className='px-2 lg:px-7 py-5'>
        <div className="w-full flex flex-wrap">
            <div className="w-full md:w-6/12">
                <div className="w-full p-4 bg-[#283046] rounded-md text-text_color">
                    <div className="flex justify-center items-center py-3">
                        {
                        userInfo.profileImage? <label htmlFor='img' className='h-[250px] w-[400px] relative p-3 cursor-pointer overflow-hidden'>
                                    <img className='w-full h-full object-scale-down rounded-md' src={userInfo.profileImage} alt="" />
                                    {/* <img className='w-full h-full object-cover' src="/images/cluster/MatiUnifiedFarmersAssociation.jpg" alt="" /> */}
                                    {
                                        loader && <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                                          <span>
                                              <FadeLoader/>
                                          </span>
                                      </div>
                                    }
                            </label> : <label htmlFor="img" className='flex justify-center items-center flex-col h-[250px] w-[400px] cursor-pointer border-2 border-dashed hover:border-accent/40 border-text_color relative'>
                                 <span><IoMdImages size='40px'/></span>
                                 <span>Select An Image</span>
                                 {
                                    loader && <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                                        <span>
                                            <FadeLoader/>
                                        </span>
                                    </div>
                                 }
                            </label>
                        }
                        <input onChange={add_image} type="file" className='hidden w-full h-full object-cover' name="img" id="img" />
                    </div>
                    <div className="px-0 md:px-5 py-2">
                        <div className="flex justify-between text-sm flex-col gap-2 p-2 bg-slate-800 rounded-md relative">
                            {/* <span className='p-[6px] bg-accent/50 rounded-md hover:shadow-sm hover:shadow-accent/40 absolute right-2 top-2'><MdEdit /></span> */}
                            <div className="flex gap-2">
                                <span>Name: </span>
                                <span>{userInfo.firstName} {userInfo.middleName}. {userInfo.lastName}</span>
                                {/* <span>{userInfo.firstName} {userInfo.middleName.charAt(0)}. {userInfo.lastName}</span> */}
                                {/* <span>{userInfo.firstName} {userInfo.middleName ? `${userInfo.middleName.charAt(0)}.` : ' '} {userInfo.lastName}</span> */}
                            </div>
                            <div className="flex gap-2">
                                <span>Email: </span>
                                <span>{userInfo.email}</span>
                            </div>
                            <div className="flex gap-2">
                                <span>Role: </span>
                                <span>{userInfo.role}</span>
                            </div>
                            <div className="flex gap-2">
                                <span>Phone: </span>
                                <span>{userInfo.phoneNumber}</span>
                            </div>
                            <div className="flex gap-2">
                                <span>BirthDate: </span>
                                <span>{dateFormat((userInfo.birhtDate), "dddd, mmmm dS, yyyy")}</span>
                            </div>
                            {/* <div className="flex gap-2">
                                <span>BirthDate: </span>
                                <span>Mati</span>
                            </div> */}
                            {/* <div className="flex gap-2">
                                <span>Name: </span>
                                <span>Mati Unified Farmers Association</span>
                            </div> */}
                            <div className="flex gap-2">
                                <span>Account: </span>
                                <p>
                                    {
                                       userInfo.status === 'active' ?  <span className='flex gap-1 justify-center items-center bg-accent/50 text-white text-xs cursor-pointer font-semibold ml-2 px-2 py-1 rounded'>
                                          {userInfo.status} <FaUserCheck size='15px'/>
                                       </span> :
                                       <span className='flex gap-1 justify-center items-center bg-red-500/60 text-white text-xs cursor-pointer font-semibold ml-2 px-2 py-1 rounded'> {userInfo.status} <FiLoader /></span>
                                    //    userInfo.status === 'active' ? <span className='flex gap-1 justify-center items-center bg-red-500/60 text-white text-xs cursor-pointer font-semibold ml-2 px-2 py-1 rounded'> {userInfo.status} <FiLoader /></span> 
                                    //    : <span className='flex gap-1 justify-center items-center bg-accent/50 text-white text-xs cursor-pointer font-semibold ml-2 px-2 py-1 rounded'>
                                    //       {userInfo.status} <FaUserCheck size='15px'/>
                                    //    </span>
                                    }
                                </p>
                             
                            </div>
                        </div>
                        
                    </div>
                    <div>
                        <div className="">
                            <button 
                            className='bg-primaryDark font-bold px-3 py-1 rounded-sm flex justify-center items-center gap-1'
                            onClick={toggleFormVisibility}
                            >
                            CHANGE PASSWORD <FaChevronDown size={20} className='pb-1' />
                            </button>
                        </div>
                        
                        {isFormVisible && (
                            <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-1 mb-2">
                              <label className="font-bold text-slate-500" htmlFor="current_password">
                                CURRENT PASSWORD
                              </label>
                              <div className="relative">
                                <input
                                  className="outline-none w-full bg-transparent px-3 py-2 pr-[60px] border rounded-md text-slate-200"
                                  type={showCurrentPassword ? 'text' : 'password'}
                                  name="current_password"
                                  id="current_password"
                                  placeholder="CURRENT PASSWORD"
                                  value={currentPassword}
                                  onChange={handleChange}
                                />
                                <button
                                  type="button"
                                  onClick={() => togglePasswordVisibility('current')}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-200"
                                >
                                  {!showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                              </div>
                            </div>
                    
                            <div className="flex flex-col gap-1 mb-2">
                              <label className="font-bold text-slate-500" htmlFor="new_password">
                                NEW PASSWORD
                              </label>
                              <div className="relative">
                                <input
                                  className="outline-none w-full  bg-transparent px-3 py-2 border rounded-md text-slate-200"
                                  type={showNewPassword ? 'text' : 'password'}
                                  name="new_password"
                                  id="new_password"
                                  placeholder="NEW PASSWORD"
                                  value={newPassword}
                                  onChange={handleChange}
                                />
                                <button
                                  type="button"
                                  onClick={() => togglePasswordVisibility('new')}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-200"
                                >
                                  {!showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                              </div>
                            </div>
                    
                            <div className="flex flex-col gap-1 mb-2">
                              <label className="w-full font-bold text-slate-500" htmlFor="confirm_password">
                                CONFIRM PASSWORD
                              </label>
                              <div className="relative">
                                <input
                                  className=" w-full outline-none bg-transparent px-3 py-2 border rounded-md text-slate-200"
                                  type={showConfirmPassword ? 'text' : 'password'}
                                  name="confirm_password"
                                  id="confirm_password"
                                  placeholder="CONFIRM PASSWORD"
                                  value={confirmPassword}
                                  onChange={handleChange}
                                />
                                <button
                                  type="button"
                                  onClick={() => togglePasswordVisibility('confirm')}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-200"
                                >
                                  {!showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                              </div>
                            </div>
                    
                            {errorMessage && (
                              <div className="text-red-600 text-sm">
                                <p>{errorMessage}</p>
                              </div>
                            )}
                    
                            {successMessage && (
                              <div className="text-green-600 text-sm">
                                <p>{successMessage}</p>
                              </div>
                            )}
                    
                            <div className="">
                              <button
                                type="submit"
                                className="px-5 py-2 w-full bg-primaryDark font-bold text-slate-200 rounded-md hover:shadow-md"
                                disabled={loader}
                              >
                                {loader ? 'Updating...' : 'UPDATE'}
                              </button>
                            </div>
                          </form>
                        )}
                        </div>
                    <div className="px-0 md:px-5 py-5">
                     
                    </div>
                    
                </div>
            </div>
            <div className="w-full px-0 md:px-2 md:w-6/12">
                 <div className="w-full p-4 mt-6 md:mt-0 bg-[#283046] rounded-md text-text_color">
                 <div className="flex justify-center items-center py-3">
                        {
                        userInfo.associationImage? <label htmlFor='img' className='h-[250px] w-[400px] relative p-3 cursor-pointer overflow-hidden'>
                                    <img className='w-full h-full object-cover rounded-md' src={userInfo.associationImage} alt="" />
                                    {/* <img className='w-full h-full object-cover' src="/images/cluster/MatiUnifiedFarmersAssociation.jpg" alt="" /> */}
                                    {
                                        loader && <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                                          <span>
                                              <FadeLoader/>
                                          </span>
                                      </div>
                                    }
                            </label> : <label htmlFor="img" className='flex justify-center items-center flex-col h-[250px] w-[400px] cursor-pointer border-2 border-dashed hover:border-accent/40 border-text_color relative'>
                                 <span><IoMdImages size='40px'/></span>
                                 <span>Select An Image</span>
                                 {
                                    loader && <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                                        <span>
                                            <FadeLoader/>
                                        </span>
                                    </div>
                                 }
                            </label>
                        }
                        <input onChange={add_image} type="file" className='hidden w-full h-full object-cover' name="img" id="img" />
                    </div>
                    {
                            userInfo?.shopInfo ? <form action=''>
                                <div className="flex flex-col w-full gap-3">
                                    <div className="w-full">
                                        <label htmlFor="associationName">Association</label>
                                        <input className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Association Name'  name='associationName' id='associationName'/>
                                    </div>
                                 </div>
                                <div className="flex flex-col w-full gap-3">
                                    <div className="w-full">
                                        <label htmlFor="location">Location</label>
                                        <input className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Location'  name='location' id='location'/>
                                    </div>
                                 </div>
                                {/* <div className="flex flex-col w-full gap-3">S
                                    <div className="w-full">
                                        <label htmlFor="name">Listing Name</label>
                                        <input className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Listing name'  name='name' id='name'/>
                                    </div>
                                 </div> */}

                                <button className='bg-accent/40  hover:shadow-accent/40 hover:shadow-sm text-text_color rounded-sm px-10 py-2 my-2 font-semibold'>Add</button>
               

                            </form> : 

                             <div className="flex justify-between text-sm flex-col gap-2 p-2 bg-slate-800 rounded-md relative">
                             {/* <span className='p-[6px] bg-accent/50 rounded-md hover:shadow-sm hover:shadow-accent/40 absolute right-2 top-2'><MdEdit /></span> */}
                             <div className="flex gap-2">
                                 <span>Association Name: </span>
                                 <span>{userInfo.associationName}</span>
                             </div>
                             <div className="flex gap-2">
                                 <span>Location: </span>
                                 {/* <span>{userInfo.associationloc_street}</span> */}
                                 <div className="w-full flex lg:flex-row gap-2 flex-col">
                                    <div className="flex flex-col text-start">
                                        <p className='border-b text-start'>{userInfo.associationloc_street}</p>
                                        <p className='text-[10px]'>Street</p>
                                    </div>
                                    <div className="flex flex-col text-start">
                                        <p className='border-b text-start'>{userInfo.associationloc_barangay}</p>
                                        <p className='text-[10px]'>Barangay</p>
                                    </div>
                                    <div className="flex flex-col text-start">
                                        <p className='border-b text-start'>{userInfo.associationloc_municipalitycity}</p>
                                        <p className='text-[10px]'>Municipality/City</p>
                                    </div>
                                    
                                    <div className="flex flex-col text-start">
                                        <p className='border-b text-start'>{userInfo.associationloc_province}</p>
                                        <p className='text-[10px]'>Province</p>
                                    </div>
                                    
                                 </div>
                             </div>
                         </div>
                        }
                      

                 </div>
                 
            </div>
        </div>

    </div>
  )
}

export default Profile