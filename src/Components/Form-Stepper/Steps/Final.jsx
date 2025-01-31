import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { FaCheckCircle } from "react-icons/fa";
import { StepperContext } from '../../context/StepperContext';

import { overRideStyle } from './../../../utils/Utils';
import {PropagateLoader, ClipLoader, HashLoader} from 'react-spinners'
import PrevPageButton from './../../PrevPageButton';



const Final = () => {
    // const { requestMessage, setRequestMessage } = useContext(StepperContext);

  const {loader, errorMessage,  successMessage, requestMessage,requestMessageError} = useSelector(state => state.auth)
  return (
    <div className='container md:mt-10 text-center'>
   {
    loader ? 
    <div className="">
      
      <div className="text-green-400 flex justify-center items-center">
      <HashLoader
        color="#22C55E"
        cssOverride={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: "center",
        }}
        size={70}
      />
      {/* SVG */}
      </div>
      <div className="mt-3 text-xl font-semibold uppercase text-green-500">Submitting Your Request</div>
      <div className="text-xs font-semibold uppercase text-gray-500">Please Wait for Conformation</div>
      <a className='' href="/login">
        <button className='mt-10 h-10 px-5 text-primary font-bold transition-colors duration-150 border-2 border-gray-300 rounded-lg focus:shadow-outline hover:bg-green-500 hover:text-white'>Cancel</button>
      </a>
    </div>
    :
    <div className="">
      <div className="">
        {/* {
          requestMessage? 
          <div className="">{requestMessage}asd</div>
          :
          <div className="">{requestMessage}asd</div>
        } */}
        {
          requestMessageError? <div className="">
             <div className="text-green-400 flex justify-center items-center">
      <FaCheckCircle color='' size={60} />

      </div>
      <div className="mt-3 text-xl font-semibold uppercase text-green-500">{requestMessageError}</div>
      {/* <div className="text-xs font-semibold uppercase text-gray-500">Please try again</div> */}
      <a className='' href="/login">
        <button className='mt-10 h-10 px-5 text-primary font-bold transition-colors duration-150 border-2 border-gray-300 rounded-lg focus:shadow-outline hover:bg-green-500 hover:text-white'>Close</button>

      </a>
          </div> : <div className="">
          <div className="text-green-400 flex justify-center items-center">
      <FaCheckCircle color='' size={60} />

      </div>
      <div className="mt-3 text-xl font-semibold uppercase text-green-500">{requestMessage}</div>
      <div className="text-xs font-semibold uppercase text-gray-500">Your Request is up for review</div>
      <a className='' href="/login">
        <button className='mt-10 h-10 px-5 text-primary font-bold transition-colors duration-150 border-2 border-gray-300 rounded-lg focus:shadow-outline hover:bg-green-500 hover:text-white'>Close</button>

      </a>
          </div>
        }
      </div>
      
     
    </div>
   }

   <PrevPageButton/>
      
    </div>
  )
}

export default Final