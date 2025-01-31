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
import {profile_image_upload , messageClear,change_password} from '../../store/Reducers/authReducer'


const ChangePassword = () => {
    const dispatch = useDispatch()
    const {userInfo, loader, successMessage, errorMessage} = useSelector(state => state.auth)
 const [isFormVisible, setFormVisible] = useState(false);


    const toggleFormVisibility = () => {
        setFormVisible(prevState => !prevState);
      };
        const [newPassword, setNewPassword] = useState('');
          const [confirmPassword, setConfirmPassword] = useState('');
      const [currentPassword, setCurrentPassword] = useState('');
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


              
              if(!confirmPassword === newPassword){
                toast.error("The new password and confirm password does not match")
                return
              }
          // console
              // Dispatch change password action
              dispatch(
                  change_password({
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
        <div className="w-full md:w-5/12">
            <div className="w-full p-4 bg-[#283046] rounded-md text-text_color">
                
                <div className="px-0 md:px-5 py-2">
                 
                    
                </div>
                <div>
                        <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-1 mb-2">
                          <label className="font-bold text-slate-500" htmlFor="current_password">
                            CURRENT PASSWORD
                          </label>
                          <div className="relative">
                            <input
                              className="outline-none w-full bg-transparent px-3 py-2 pr-[60px] border-2 border-slate-600 focus:border-primaryDark rounded-md text-slate-300"
                              type={showCurrentPassword ? 'text' : 'password'}
                              name="current_password"
                              id="current_password"
                              placeholder="Current Password"
                              // placeholder="CURRENT PASSWORD"
                              value={currentPassword}
                              onChange={handleChange}
                              required
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
                              className="outline-none w-full  bg-transparent px-3 py-2  rounded-md text-slate-300 border-2 border-slate-600 focus:border-primaryDark"
                              type={showNewPassword ? 'text' : 'password'}
                              name="new_password"
                              id="new_password"
                              // placeholder="NEW PASSWORD"
                              placeholder="New Password"
                              value={newPassword}
                              onChange={handleChange}
                              required
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
                              className=" w-full outline-none bg-transparent px-3 py-2  rounded-md text-slate-300 border-2 border-slate-600 focus:border-primaryDark"
                              type={showConfirmPassword ? 'text' : 'password'}
                              name="confirm_password"
                              id="confirm_password"
                              // placeholder="CONFIRM PASSWORD"
                              placeholder="Confirm Password"
                              value={confirmPassword}
                              onChange={handleChange}
                              required
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
                
                    </div>
                <div className="px-0 md:px-5 py-5">
                 
                </div>
                
            </div>
        </div>
       
    </div>

</div>
  )
}

export default ChangePassword