import React, { useContext, useEffect, useState } from 'react';
import { StepperContext } from '../../context/StepperContext';
import { IoMdImages } from "react-icons/io";
import { FadeLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import {messageClear, seller_register, trader_register,requestMessageClear} from '../../../store/Reducers/authReducer'
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";


const PersonalDetailsTrader = () => {
  const [imagePreview, setImagePreview] = useState();
  const { userData, setUserData } = useContext(StepperContext);
  const dispatch = useDispatch()


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(()=>{
    dispatch(requestMessageClear())  
}, [])

  const { loader } = useSelector((state) => state.auth);

  // Function to resize and handle image selection
  const profileImageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 250; // Maximum width for the resized image
          const maxHeight = 250; // Maximum height for the resized image

          let width = img.width;
          let height = img.height;

          // Calculate the new dimensions while maintaining the aspect ratio
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          // Set canvas dimensions to the new size
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Convert the canvas back to a base64 string or blob
          canvas.toBlob(
            (blob) => {
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });

              // Update the userData with the resized image
              setUserData({ ...userData, profileImage: resizedFile });

              // Generate a preview for the UI
              setImagePreview(URL.createObjectURL(resizedFile));
            },
            file.type,
            0.9 // Image quality (90%)
          );
        };

        img.src = reader.result;
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full lg:grid lg:grid-cols-2 flex flex-col gap-6">
        <div>
          {/* Other input fields remain unchanged */}
          <div className="w-full flex flex-col lg:flex-row justify-between gap-2">
            <div className="w-full">
              <div className="font-bold h-3 text-gray-500 text-xs uppercase">Firstname</div>
              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                <input
                  onChange={handleChange}
                  value={userData["firstName"] || ""}
                  name="firstName"
                  placeholder="First Name"
                  className="p-1 px-2 appearance-none outline-none w-full text-gray-800 text-sm"
                  type="text"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="font-bold h-3 text-gray-500 text-xs uppercase">Middlename (Optional)</div>
              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                <input
                  onChange={handleChange}
                  value={userData["middleName"] || ""}
                  name="middleName"
                  placeholder="Middle Name"
                  className="p-1 px-2 appearance-none outline-none w-full text-gray-800 text-sm"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center flex-col md:flex-row md:justify-between gap-2">
                <div className="w-full">
                    <div className="font-bold h-3 text-gray-500 text-xs uppercase">
                      Lastname
                    </div>
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                      <input
                        onChange={handleChange}
                        value={userData["lastName"] || ""}
                        name='lastName'
                        placeholder='lastName'
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
                          value={userData["birthDate"] || ""}
                          name='birthDate'
                          placeholder='birthDate'
                          className='p-1 px-2 appearance-none outline-none w-full text-gray-800 text-sm'
                          type="date" />
                      </div>
                </div>
                  
              </div>
              <div className="w-full flex flex-col md:flex-row justify-between gap-2">
              <div className="">
                      <div className="font-bold h-3 text-gray-500 text-xs uppercase">
                        Sex
                      </div>
                      <div class="md:w-32">
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
                        value={userData["phoneNumber"] || ""}
                        name='phoneNumber'
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
              <div className="w-full">
                  <div className="font-bold h-3 text-gray-500 text-xs uppercase">
                    Password
                  </div>
                  <div className="bg-white my-2 p-1 flex border border-gray-200 rounded items-center">
                    <input
                      onChange={handleChange}
                      value={userData["password"] || ""}
                      name="password"
                      placeholder="password"
                      className="p-1 px-2 appearance-none outline-none w-full text-gray-800 text-sm"
                      type={showPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="ml-2 text-gray-600 hover:text-gray-800 pr-2"
                    >
                      {showPassword ? <LuEye  size={16} /> : <LuEyeClosed size={16} />}
                      {/* {showPassword ? <LuEyeClosed  size={16} /> : <LuEye size={16} />} */}
                    </button>
                  </div>
                </div>
              <div className="w-full">
                  <div className="font-bold h-3 text-gray-500 text-xs uppercase">
                    Confirm Password
                  </div>
                  <div className="bg-white my-2 p-1 flex border border-gray-200 rounded items-center">
                    <input
                      onChange={handleChange}
                      value={userData["confirmPassword"] || ""}
                      name="confirmPassword"
                      placeholder="confirm Password"
                      className="p-1 px-2 appearance-none outline-none w-full text-gray-800 text-sm"
                      type={showConfirmPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="ml-2 text-gray-600 hover:text-gray-800 pr-2"
                    >
                      {showConfirmPassword ? <LuEye  size={16} /> : <LuEyeClosed size={16} />}
                      {/* {showPassword ? <LuEyeClosed  size={16} /> : <LuEye size={16} />} */}
                    </button>
                  </div>
                </div>
              {/* <div className="w-ful">
                <div className="font-bold h-3 text-gray-500 text-xs  uppercase">
                  Password
                </div>
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                  <input
                    onChange={handleChange}
                    value={userData["password"] || ""}
                    name='password'
                    placeholder='password'
                    className='p-1 px-2 appearance-none outline-none w-full text-gray-800 text-sm'
                    type="password" />
                </div>
              </div> */}

          {/* Other fields like Lastname, Birthdate, Phone Number, etc. */}
        </div>

        {/* Profile Image Upload Section */}
        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex justify-center h-[250px] w-[250px] rounded-md">
            {userData.profileImage ? (
              <label htmlFor="img" className="h-full w-full relative cursor-pointer overflow-hidden rounded-md">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={imagePreview || URL.createObjectURL(userData.profileImage)}
                  alt="Profile"
                />
                {loader && (
                  <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                    <FadeLoader />
                  </div>
                )}
              </label>
            ) : (
              <label
                htmlFor="img"
                className="flex justify-center items-center flex-col h-[250px] w-[400px] cursor-pointer border-2 border-dashed hover:border-accent/40 border-text_color relative"
              >
                <span>
                  <IoMdImages size="40px" color="#53596B" />
                </span>
                <span className="text-slate-500">Upload Profile</span>
                {loader && (
                  <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                    <FadeLoader />
                  </div>
                )}
              </label>
            )}
            <input
              id="img"
              type="file"
              name="profileImage"
              onChange={profileImageHandler}
              className="hidden w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsTrader;
