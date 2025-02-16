import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {AiOutlineGooglePlus,AiFillGithub, AiFillTwitterSquare} from 'react-icons/ai'
import {FiFacebook} from 'react-icons/fi'
import {useDispatch, useSelector} from 'react-redux'
import {PropagateLoader} from 'react-spinners'
import { overRideStyle } from './../../utils/Utils';
import {messageClear, seller_register} from '../../store/Reducers/authReducer'
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import Stepper from './../../Components/Form-Stepper/Stepper';
import StepperControl from '../../Components/Form-Stepper/StepperControl'


// import Account from '../../Components/Form-Stepper/Steps/Account'
import PersonalDetails from '../../Components/Form-Stepper/Steps/PersonalDetails'
// import AssociationDetails from '../../Components/Form-Stepper/Steps/AssociationDetails'
// import CompanyDetails from '../../Components/Form-Stepper/Steps/CompanyDetails'
import BusinessDetails from '../../Components/Form-Stepper/Steps/BusinessDetails'
// import Details from '../../Components/Form-Stepper/Steps/Details'
import Final from '../../Components/Form-Stepper/Steps/Final'

import { StepperContext } from '../../Components/context/StepperContext'
import { StepperImagePrev } from '../../Components/context/StepperImagePrev'
import Credentials from '../../Components/Form-Stepper/Steps/Credentials'




const Register = () => {
// Stepper Form

const [currentStep, setCurrentStep] = useState(1)
const [userData, setUserData] = useState([])
const [finalData, setFinalData] = useState([])



const navigate = useNavigate()
const dispatch = useDispatch()
const {loader, errorMessage,  successMessage } = useSelector(state => state.auth)

useEffect(()=>{
    if(errorMessage){
        toast.error(errorMessage);
        dispatch(messageClear())
       
    }

    if(successMessage){
        toast.success(successMessage);
        dispatch(messageClear())  
    }
}, [errorMessage, successMessage])


// STEPPER FORM

const steps = [
    "personal Details",
    "business Details",
    "credentials Upload",
    "requestComplete",
   
];


const displayStep = (step)=>{
    switch(step){
        case 1:
            return <PersonalDetails/>
        case 2:
            return <BusinessDetails/>
        case 3:
            return <Credentials/>
        case 4:
            return <Final/>
        default:
    }
}

const handleClick = (direction)=>{
    let newStep = currentStep
    if(direction === "none"){

    }else{
        direction === "next"? newStep++ : newStep--;

        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    }

    

}


// const submitData = () => {
//     // setFinalData(prevFinalData => ({ ...prevFinalData, ...userData }));
    
//     console.log('Submit button pressed!');
//     console.log("Final Data:", finalData);

//     // Dispatch the updated finalData to the Redux action
//     dispatch(seller_register(userData));

//     // Clear userData after submission
//     setUserData('');
// };

const submitData = () => {
    console.log('Submit button pressed!');

    // Create a new FormData instance
    const formData = new FormData();

    // Append userData properties to the FormData object
    for (const key in userData) {
        if (userData.hasOwnProperty(key)) {
            // Check if the value is an array (e.g., multiple images)
            if (Array.isArray(userData[key])) {
                userData[key].forEach((file, index) => {
                    // Ensure that the file is a File object before appending
                    if (file instanceof File) {
                        formData.append(`${key}[${index}]`, file); // Append each file
                    }
                });
            } else if (userData[key] instanceof File) {
                // If it's a single file, append directly
                formData.append(key, userData[key]);
            } else {
                // Append all other types (strings, numbers, etc.)
                formData.append(key, userData[key]);
            }
        }
    }

    // Log the FormData for debugging
    console.log("Form Data:", formData);

    // Dispatch the updated formData to the Redux action
    dispatch(seller_register(formData));

    // Clear userData after submission
    setUserData({});
};

console.log(userData)

// console.log(finalData)
  return (
    <div className='min-w-screen min-h-screen bg-[#161d31] flex justify-center items-center py-2'>
         {/* <div className="mx-4 absolute top-1 right-2 text-slate-100 group flex items-center justify-center gap-1 text-sm cursor-pointer before:absolute before:h-[18px] before:w-[1px] before:bg-[#afafaf] before:-left-[16px] after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]">
                      <LanguageDropdown/>
                </div> */}
        <div className="md:w-9/12 w-11/12 mx-auto shadow-xl rounded-2xl pb-2 bg-[#283046] ">
            {/* { Stepper} */}
            <div className="container horizontal mt-5 px-6">
            <Stepper steps = {steps} currentStep={currentStep}/>
            
            {/* {Display Components} */}    
            <div className="my-1 py-10 md:px-10 px-3">
                <StepperContext.Provider value={{
                    userData,
                    setUserData,
                    finalData,
                    setFinalData,
                    loader
                }}>
                {displayStep(currentStep)}

                </StepperContext.Provider>
            </div>

        
            </div>
            <div className="w-full flex items-center justify-center text-md">
                <h2 className='font-base text-slate-300'>Already Have an Account? <Link to="/login" className='font-bold text-primaryDark'>Login</Link></h2>
            </div>


            {/* {Nav Controls} */}
            <StepperControl 
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
            submitData={submitData}
            userData={userData}
            />
        </div>
    </div>
  )
}

export default Register