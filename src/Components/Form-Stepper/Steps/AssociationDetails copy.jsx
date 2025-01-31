import React,{useContext, useState} from 'react'
import { StepperContext } from '../../context/StepperContext'
import { useSelector } from 'react-redux';
import { IoMdImages } from "react-icons/io";
import {FadeLoader} from 'react-spinners'
import { MdEdit } from "react-icons/md";
import { FiLoader } from "react-icons/fi";
import { FaUserCheck } from "react-icons/fa6";


const AssociationDetails = () => {
    const [imagePreview, setImagePreview] = useState();
    const {userData, setUserData} = useContext(StepperContext);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData({ ...userData, [name]: value})
    }
    const {loader} = useSelector(state=>state.auth)

     // Function to handle image selection and preview
     const associationImageHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            // setImagePreview(reader.result); // Set the image preview
            setUserData({ ...userData, associationImage: file }); // Keep this line intact
          };
          reader.readAsDataURL(file);
         
        }
      };
    

  return (
    <div className='flex flex-col'>
       <div className="w-full flex flex-col lg:flex-row justify-center items-start">
            <div className="w-full px-3 flex justify-center items-center">
                <div className="flex justify-center h-[250px] w-full rounded-sm">
                {
                    userData.associationImage ? (
                    <label htmlFor='img' className='h-full w-full relative cursor-pointer overflow-hidden rounded-md'>
                        <img className='w-full h-full object-scale-down rounded-sm ' src={URL.createObjectURL(userData.associationImage)} alt="Profile" />
                        {loader && (
                        <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                            <FadeLoader />
                        </div>
                        )}
                    </label>
                    ) : (
                    <label htmlFor="img" className='flex justify-center items-center flex-col h-[250px] w-[400px] cursor-pointer border-2 border-dashed hover:border-accent/40 border-text_color relative'>
                        <span><IoMdImages size='40px' color='#53596B' /></span>
                        <span className='text-slate-500'>Upload Association Profile</span>
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
                    name='associationImage'
                    onChange={associationImageHandler}
                    className='hidden w-full h-full object-cover'
                />
                </div>
            </div>

            <div className="px-3 w-full flex flex-col justify-start items-start">
                <div className="w-full">
                         <div className="font-bold h-3 text-gray-500 text-xs uppercase">
                          Association Name
                         </div>
                         <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                         <input
                             onChange={handleChange}
                             value={userData["associationName"] || ""}
                             name='associationName'
                             placeholder='Association Name'
                             className='p-1 px-2 appearance-none outline-none w-full text-gray-800 text-sm'
                             type="text" />
                    </div>
                </div>
                    <div className="font-bold text-gray-500 text-xs uppercase mb-2 pb-1 w-full border-b border-slate-500">
                        Location
                    </div>
               <div className="flex flex-row w-full gap-2">
                  <div className="w-full">
                            <div className="font-bold h-3 text-gray-500 text-[10px] uppercase">
                             Street No.
                            </div>
                            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                            <input
                                onChange={handleChange}
                                value={userData["associationloc_street"] || ""}
                                name='associationloc_street'
                                placeholder='Street No.'
                                className='p-1 px-2 appearance-none outline-none w-full text-gray-800 text-sm'
                                type="text" />
                        </div>
                  </div>
                  <div className="w-full">
                        <div className="font-bold h-3 text-gray-500 text-[10px] uppercase">
                            Barangay
                            </div>
                            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                            <input
                                onChange={handleChange}
                                value={userData["associationloc_barangay"] || ""}
                                name='associationloc_barangay'
                                placeholder='Barangay'
                                className='p-1 px-2 appearance-none outline-none w-full text-gray-800 text-sm'
                                type="text" />
                        </div>
                  </div>
               </div>
               <div className="flex flex-row w-full gap-2">
                  <div className="w-full">
                        <div className="font-bold h-3 text-gray-500 text-[10px] uppercase">
                              municipality/city
                            </div>
                            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                            <input
                                onChange={handleChange}
                                value={userData["associationloc_municipalitycity"] || ""}
                                name='associationloc_municipalitycity'
                                placeholder='Municipality/City'
                                className='p-1 px-2 appearance-none outline-none w-full text-gray-800 text-sm'
                                type="text" />
                        </div>
                  </div>
                  <div className="w-full">
                        <div className="font-bold h-3 text-gray-500 text-[10px] uppercase">
                           Province
                            </div>
                            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                            <input
                                onChange={handleChange}
                                value={userData["associationloc_province"] || ""}
                                name='associationloc_province'
                                placeholder='Province'
                                className='p-1 px-2 appearance-none outline-none w-full text-gray-800 text-sm'
                                type="text" />
                        </div>
                  </div>
               </div>
            </div>
       </div>
      </div>
  )
}

export default AssociationDetails


