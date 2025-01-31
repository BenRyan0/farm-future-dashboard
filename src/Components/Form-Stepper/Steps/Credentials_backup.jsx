// import React,{useContext, useState} from 'react'
// import { StepperContext } from '../../context/StepperContext'
// import { useSelector } from 'react-redux';
// import { IoMdImages } from "react-icons/io";
// import {FadeLoader} from 'react-spinners'
// import { MdEdit } from "react-icons/md";
// import { FiLoader } from "react-icons/fi";
// import { FaUserCheck } from "react-icons/fa6";



// const Credentials = () => {
//   const [imagePreview, setImagePreview] = useState();
//   const [validIDPreview, setValidIDPreview] = useState();
//   const {userData, setUserData} = useContext(StepperContext);
//   const {loader} = useSelector(state=>state.auth)


//   const handleChange = (e) => {
//     const {name, value} = e.target;
//     setUserData({ ...userData, [name]: value})
//   }

//     // Function to handle image selection and preview
//     const imageHandler = (e) => {
//       const file = e.target.files[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setValidIDPreview(reader.result); // Set the image preview
//         };
//         reader.readAsDataURL(file);
//         setUserData({ ...userData, image: file }); // Keep this line intact
//       }
//     };

//     const validIdHandler = (e) => {
//       const file = e.target.files[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setValidIDPreview(reader.result); // Set the image preview
//         };
//         reader.readAsDataURL(file);
//         setUserData({ ...userData, validId_img: file }); // Keep this line intact
//       }
//     };
  
//   return (
//     <div className='flex flex-col'>
//       <div className="w-full flex flex-col lg:grid lg:grid-cols-2 ">
//           <div className="w-full px-2 flex flex-col gap-2">
//               <div className="w-full">
//                 <div className="font-bold h-3 text-gray-500 text-xs uppercase mb-2">
//                   Association Name
//                 </div>
//                 <div className="flex justify-center h-[200px] w-full rounded-sm">
//                   {
//                  validIDPreview ? (
//                       <label htmlFor='img' className='h-full w-full relative cursor-pointer overflow-hidden rounded-md'>
//                           <img className='w-full h-full object-scale-down rounded-sm ' src={validIDPreview} alt="Profile" />
//                           {loader && (
//                           <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
//                               <FadeLoader />
//                           </div>
//                           )}
//                       </label>
//                       ) : (
//                       <label htmlFor="img" className='flex justify-center items-center flex-col h-full w-full cursor-pointer border-2 border-dashed hover:border-accent/40 border-text_color relative'>
//                           <span><IoMdImages size='40px' color='#53596B' /></span>
//                           <span className='text-slate-500'>Upload Association Profile</span>
//                           {loader && (
//                           <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
//                               <FadeLoader />
//                           </div>
//                           )}
//                       </label>
//                       )
//                   }
//                   <input
//                       id="img"
//                       type='file'
//                       name='validId_img'
//                       onChange={validIdHandler}
//                       className='hidden w-full h-full object-cover'
//                   />
//                 </div>
//               </div>
//               {/* <div className="w-full bg-red-500">
//                 <div className="flex justify-center h-[200px] w-full rounded-sm">
//                   {
//                   imagePreview ? (
//                       <label htmlFor='img' className='h-full w-full relative cursor-pointer overflow-hidden rounded-md'>
//                           <img className='w-full h-full object-scale-down rounded-sm ' src={imagePreview} alt="Profile" />
//                           {loader && (
//                           <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
//                               <FadeLoader />
//                           </div>
//                           )}
//                       </label>
//                       ) : (
//                       <label htmlFor="img" className='flex justify-center items-center flex-col h-full w-full cursor-pointer border-2 border-dashed hover:border-accent/40 border-text_color relative'>
//                           <span><IoMdImages size='40px' color='#53596B' /></span>
//                           <span className='text-slate-500'>Upload Association Profile</span>
//                           {loader && (
//                           <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
//                               <FadeLoader />
//                           </div>
//                           )}
//                       </label>
//                       )
//                   }
//                   <input
//                       id="img"
//                       type='file'
//                       name='image'
//                       onChange={imageHandler}
//                       className='hidden w-full h-full object-cover'
//                   />
//                 </div>
//               </div> */}
//               {/* <div className="w-full bg-red-500">
//                 <div className="flex justify-center h-[200px] w-full rounded-sm">
//                   {
//                   imagePreview ? (
//                       <label htmlFor='img' className='h-full w-full relative cursor-pointer overflow-hidden rounded-md'>
//                           <img className='w-full h-full object-scale-down rounded-sm ' src={imagePreview} alt="Profile" />
//                           {loader && (
//                           <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
//                               <FadeLoader />
//                           </div>
//                           )}
//                       </label>
//                       ) : (
//                       <label htmlFor="img" className='flex justify-center items-center flex-col h-full w-full cursor-pointer border-2 border-dashed hover:border-accent/40 border-text_color relative'>
//                           <span><IoMdImages size='40px' color='#53596B' /></span>
//                           <span className='text-slate-500'>Upload Association Profile</span>
//                           {loader && (
//                           <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
//                               <FadeLoader />
//                           </div>
//                           )}
//                       </label>
//                       )
//                   }
//                   <input
//                       id="img"
//                       type='file'
//                       name='image'
//                       onChange={imageHandler}
//                       className='hidden w-full h-full object-cover'
//                   />
//                 </div>
//               </div> */}
//           </div>
//           <div className="">

//           </div>
//       </div>

//     </div>
//   )
// }

// export default Credentials
