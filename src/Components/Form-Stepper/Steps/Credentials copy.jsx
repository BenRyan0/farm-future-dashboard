import React, { useContext, useState } from 'react';
import { StepperContext } from '../../context/StepperContext';
import { useSelector } from 'react-redux';
import { IoMdImages } from 'react-icons/io';
import { FadeLoader } from 'react-spinners';

const Credentials = () => {
  const { userData, setUserData } = useContext(StepperContext);
  const { loader } = useSelector(state => state.auth);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserData({ ...userData, [name]: value });
  // };
  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, [key]: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, image: file }); // Keep this line intact
      };
      reader.readAsDataURL(file);
    }
  };

  const validIdHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, validId_img: file }); // Keep this line intact
      };
      reader.readAsDataURL(file);
    }
  };

  const credentialimageHandler01 = (e) => {
    const file_01 = e.target.files[0];
    if (file_01) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, cred1: file_01 }); // Keep this line intact
      };
      reader.readAsDataURL(file_01);
    }
  };
  const credentialimageHandler02 = (e) => {
    const file_02 = e.target.files[0];
    if (file_02) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, credential_img02: file_02 }); // Keep this line intact
      };
      reader.readAsDataURL(file_02);
    }
  };
  const credentialimageHandler03 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, credential_img03: file }); // Keep this line intact
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='flex flex-col'>
      <div className="w-full flex flex-col lg:grid lg:grid-cols-2 ">
        <div className="w-full px-2 flex flex-col gap-2">
          <div className="w-full">
            <div className="font-bold h-3 text-gray-500 text-xs uppercase mb-2">
              APPLICANT VALID ID
            </div>
            <div className="flex justify-center h-[200px] w-full rounded-sm">
              {userData.validId_img ? (
                <label htmlFor='validId_img' className='h-full w-full relative cursor-pointer overflow-hidden rounded-md'>
                  <img className='w-full h-full object-scale-down rounded-sm' src={URL.createObjectURL(userData.validId_img)} alt="Valid ID" />
                  {loader && (
                    <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <FadeLoader />
                    </div>
                  )}
                </label>
              ) : (
                <label htmlFor="validId_img" className='flex justify-center items-center flex-col h-full w-full cursor-pointer border-2 border-dashed hover:border-accent/40 border-text_color relative'>
                  <span><IoMdImages size='40px' color='#53596B' /></span>
                  <span className='text-slate-500'>Upload Association Profile</span>
                  {loader && (
                    <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <FadeLoader />
                    </div>
                  )}
                </label>
              )}
              <input
                id="validId_img"
                type='file'
                name='validId_img'
                onChange={(e) => handleFileChange(e, 'validId_img')}
                // onChange={validIdHandler}
                className='hidden w-full h-full object-cover'
              />
            </div>
          </div>

          <div className="w-full">
          <div className="font-bold h-3 text-gray-500 text-xs uppercase mb-2">
              APPLICANT VALID ID 02
            </div>
            <div className="flex justify-center h-[200px] w-full rounded-sm">
              {userData.credential_img02 ? (
                <label htmlFor='image' className='h-full w-full relative cursor-pointer overflow-hidden rounded-md'>
                  <img className='w-full h-full object-scale-down rounded-sm' src={URL.createObjectURL(userData.image)} alt="Profile" />
                  {loader && (
                    <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <FadeLoader />
                    </div>
                  )}
                </label>
              ) : (
                <label htmlFor="image" className='flex justify-center items-center flex-col h-full w-full cursor-pointer border-2 border-dashed hover:border-accent/40 border-text_color relative'>
                  <span><IoMdImages size='40px' color='#53596B' /></span>
                  <span className='text-slate-500'>Upload Profile Image</span>
                  {loader && (
                    <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <FadeLoader />
                    </div>
                  )}
                </label>
              )}
              <input
                id="image"
                type='file'
                name='image'
                onChange={credentialimageHandler02}
                className='hidden w-full h-full object-cover'
              />
            </div>
          </div>
        </div>
        <div className="w-full px-2 flex flex-col gap-2">
          <div className="w-full">
            <div className="font-bold h-3 text-gray-500 text-xs uppercase mb-2">
              APPLICANT VALID ID 01
            </div>
            <div className="flex justify-center h-[200px] w-full rounded-sm">
              {userData.cred1 ? (
                <label htmlFor='validId_img' className='h-full w-full relative cursor-pointer overflow-hidden rounded-md'>
                  <img className='w-full h-full object-scale-down rounded-sm' src={URL.createObjectURL(userData.cred1)} alt="Valid ID" />
                  {loader && (
                    <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <FadeLoader />
                    </div>
                  )}
                </label>
              ) : (
                <label htmlFor="validId_img" className='flex justify-center items-center flex-col h-full w-full cursor-pointer border-2 border-dashed hover:border-accent/40 border-text_color relative'>
                  <span><IoMdImages size='40px' color='#53596B' /></span>
                  <span className='text-slate-500'>Upload Association Profile</span>
                  {loader && (
                    <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <FadeLoader />
                    </div>
                  )}
                </label>
              )}
              <input
                id="cred1"
                type='file'
                name='cred1'
                onChange={credentialimageHandler01}
                className='hidden w-full h-full object-cover'
              />
            </div>
          </div>

          <div className="w-full">
          <div className="font-bold h-3 text-gray-500 text-xs uppercase mb-2">
              APPLICANT VALID ID 03
            </div>
            <div className="flex justify-center h-[200px] w-full rounded-sm">
              {userData.credential_img03 ? (
                <label htmlFor='image' className='h-full w-full relative cursor-pointer overflow-hidden rounded-md'>
                  <img className='w-full h-full object-scale-down rounded-sm' src={URL.createObjectURL(userData.credential_img03)} alt="Profile" />
                  {loader && (
                    <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <FadeLoader />
                    </div>
                  )}
                </label>
              ) : (
                <label htmlFor="image" className='flex justify-center items-center flex-col h-full w-full cursor-pointer border-2 border-dashed hover:border-accent/40 border-text_color relative'>
                  <span><IoMdImages size='40px' color='#53596B' /></span>
                  <span className='text-slate-500'>Upload Profile Image</span>
                  {loader && (
                    <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <FadeLoader />
                    </div>
                  )}
                </label>
              )}
              <input
                id="credential_img03"
                type='file'
                name='credential_img03'
                onChange={credentialimageHandler03}
                className='hidden w-full h-full object-cover'
              />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Credentials;
