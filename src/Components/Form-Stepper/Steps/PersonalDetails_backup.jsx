import React, {useContext,useState} from 'react'
import { StepperContext } from '../../context/StepperContext'
import { IoMdImages } from "react-icons/io";
import {FadeLoader} from 'react-spinners'
import { MdEdit } from "react-icons/md";
import { FiLoader } from "react-icons/fi";
import { FaUserCheck } from "react-icons/fa6";
import { useSelector } from 'react-redux';

const PersonalDetails = () => {
    const [imagePreview, setImagePreview] = useState();
    // console.log(imagePreview)
    const {userData, setUserData} = useContext(StepperContext);

    
    const handleChange= (e)=>{
      const {name, value} = e.target;
      setUserData({ ...userData, [name]: value})
    }


    const {loader} = useSelector(state=>state.auth)
  
    

     // Function to handle image selection and preview
     const imageHandler = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result); // Set the image preview
        };
        reader.readAsDataURL(file);
        setUserData({ ...userData, image: file }); // Keep this line intact
      }
    };
  
  
    return (
      <div className='flex flex-col'>
        <div className="w-full lg:grid lg:grid-cols-2 flex flex-col gap-2 px-1">
          <div className="">
              <div className="w-full flex flex-col lg:flex-row  justify-between gap-2">
                <div className="w-full">
                    <div className="font-bold h-3 text-gray-500 text-xs uppercase">
                      Fistname
                    </div>
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                      <input
                        onChange={handleChange}
                        value={userData["firstname"] || ""}
                        name='firstname'
                        placeholder='firstname'
                        className='p-1 px-2 appearance-none outline-none w-full text-gray-800 text-sm'
                        type="text" />
                    </div>
                </div>
                <div className="w-full">
                      <div className="font-bold h-3 text-gray-500 text-xs uppercase">
                        Middlename
                      </div>
                      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded ">
                        <input
                          onChange={handleChange}
                          value={userData["middlename"] || ""}
                          name='middlename'
                          placeholder='middlename'
                          className='p-1 px-2 appearance-none outline-none w-full text-gray-800 text-sm'
                          type="text" />
                      </div>
                </div>
                  
              </div>
              <div className="w-full flex justify-between gap-2">
                <div className="w-full">
                    <div className="font-bold h-3 text-gray-500 text-xs uppercase">
                      Lastname
                    </div>
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                      <input
                        onChange={handleChange}
                        value={userData["lastname"] || ""}
                        name='lastname'
                        placeholder='lastname'
                        className='p-1 px-2 appearance-none outline-none w-full text-gray-800 text-sm'
                        type="text" />
                    </div>
                </div>
                <div className="w-full">
                      <div className="font-bold h-3 text-gray-500 text-xs uppercase">
                        Birthdate
                      </div>
                      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded ">
                        <input
                          onChange={handleChange}
                          value={userData["birthdate"] || ""}
                          name='birthdate'
                          placeholder='birthdate'
                          className='p-1 px-2 appearance-none outline-none w-full text-gray-800 text-sm'
                          type="date" />
                      </div>
                </div>
                  
              </div>
              <div className="w-full flex justify-between gap-2">
              <div className="">
                      <div className="font-bold h-3 text-gray-500 text-xs uppercase">
                        Sex
                      </div>
                      <div class="w-32">
                        {/* <label for="sex" class="block text-sm font-medium text-gray-700">Sex</label> */}
                        <select
                         onChange={handleChange}
                         value={userData["sex"] || ""}
                         name='sex'
                         id="sex" 
                         class="mt-2 block w-full p-1 px-2 h-[40px] bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <option value="" disabled selected>Select sex</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                </div>
                <div className="w-full">
                    <div className="font-bold h-3 text-gray-500 text-xs uppercase">
                      Phone number
                    </div>
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                      <input
                        onChange={handleChange}
                        value={userData["phonenumber"] || ""}
                        name='phonenumber'
                        placeholder='#'
                        className='p-1 px-2 appearance-none outline-none w-full text-gray-800 text-sm'
                        type="number" />
                    </div>
                </div>  
              </div>
  
              <div className="w-ful">
                <div className="font-bold h-3 text-gray-500 text-xs  uppercase">
                  Email
                </div>
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                  <input
                    onChange={handleChange}
                    value={userData["email"] || ""}
                    name='email'
                    placeholder='email'
                    className='p-1 px-2 appearance-none outline-none w-full text-gray-800 text-sm'
                    type="email" />
                </div>
              </div>
            
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            {/* <h2 className='font-bold text-slate-500 text-start w-full text-sm'>Upload Profile</h2> */}
            <div className="flex justify-center h-[250px] w-[250px]  rounded-md">
            {
               imagePreview ? (
                  <label htmlFor='img' className='h-full w-full relative cursor-pointer overflow-hidden rounded-md'>
                    <img className='w-full h-full object-cover rounded-full' src={imagePreview} alt="Profile" />
                    {loader && (
                      <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                        <FadeLoader />
                      </div>
                    )}
                  </label>
                ) : (
                  <label htmlFor="img" className='flex justify-center items-center flex-col h-[250px] w-[400px] cursor-pointer border-2 border-dashed hover:border-accent/40 border-text_color relative'>
                    <span><IoMdImages size='40px' color='#53596B' /></span>
                    <span className='text-slate-500'>Upload Profile</span>
                    {loader && (
                      <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                        <FadeLoader />
                      </div>
                    )}
                  </label>
                )
              }
              <input
                id="img"
                type='file'
                name='image'
                onChange={imageHandler}
                className='hidden w-full h-full object-cover'
              />
            </div>
          </div>
        </div>
      </div>
    )
}

export default PersonalDetails