import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaCheck } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const StepperControlTrader = ({ handleClick, currentStep, steps, submitData, userData }) => {
  const [isToastShown, setIsToastShown] = useState(false);
  const {t} = useTranslation()
  const formValidation = () => {
    if (currentStep === 1) {
      console.log("Step 1");
    
      // Phone number validation - must be 11 digits starting with 09
      const phoneRegex = /^09\d{9}$/;
    
      // Password complexity validation - at least one uppercase, one lowercase, one number, and 8+ characters
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    
      // Check if all required fields for Step 1 are filled
      if (
        userData.firstName &&
        userData.lastName &&
        userData.email &&
        userData.phoneNumber &&
        userData.profileImage &&
        userData.sex &&
        userData.birthDate &&
        userData.password &&
        userData.confirmPassword
      ) {
        // Validate phone number format
        if (!phoneRegex.test(userData.phoneNumber)) {
          if (!isToastShown) {
            toast.error("Please enter a valid phone number (e.g., 09758975701)");
            setIsToastShown(true);
          }
          return;
        }
    
        // Password complexity check
        if (!passwordRegex.test(userData.password)) {
          if (!isToastShown) {
            toast.error(
              "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number."
            );
            setIsToastShown(true);
          }
          return;
        }
    
        // Password match check
        if (userData.password !== userData.confirmPassword) {
          if (!isToastShown) {
            toast.error("Passwords do not match. Please check and try again.");
            setIsToastShown(true);
          }
          return;
        }
    
        // Age validation: Ensure the user is 18 or more
        const birthDate = new Date(userData.birthDate);
        const age = calculateAge(birthDate);
    
        if (age < 18) {
          if (!isToastShown) {
            toast.error("You must be at least 18 years old to proceed.");
            setIsToastShown(true);
          }
          return;
        }
    
        handleClick("next");
      } else {
        if (!isToastShown) {
          toast.error("All fields are required for Step 1");
          setIsToastShown(true);
        }
      }
    }else if(currentStep === 2){
        console.log("02")
        if (
          userData.associationName &&
          userData.associationImage &&
          userData.associationloc_street &&
          userData.associationloc_barangay &&
          userData.associationloc_province &&
          userData.associationloc_municipalitycity
  
        ) {
          handleClick("next");
      } else {
         if (!isToastShown) {
                toast.error("All fields are required for Step 2");
                setIsToastShown(true);
              }
      }
        
      }else if(currentStep === 3){
        if (userData.credential_img01 &&
          userData.credential_img02 &&
          userData.validId_img
        ) {
          submitData()
          handleClick("next");
      } else {
       if (!isToastShown) {
               toast.error("All fields are required for Step 3");
               setIsToastShown(true);
            }
      }
        
       
      }
      else if(currentStep === 4){
        console.log("04")
      }
    }
    const calculateAge = (birthDate) => {
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
  
      // If birth month hasn't occurred yet this year, subtract 1 from age
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
  
      return age;
    };


     useEffect(()=>{
        setIsToastShown(false)
    }, [isToastShown])

  return (
   <div className="">
           {
               currentStep === steps.length ? 
               <div className=""></div>
   
               :
               <div className='container flex justify-around md:mt-6 mt-10 mb-8 '>
               {/* {back button} */}
               <button
               onClick={()=> handleClick("back")}
               className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700  hover:text-white transition duration-200 ease-in-out ${currentStep === 1 ? " opacity-20 cursor-not-allowed hover:bg-transparent hover:text-slate-400":""}`}> <p className='flex justify-center items-center gap-1'>{t("back")} <FaChevronLeft /></p></button>
             
               {/* {next button} */}
               <button
               onClick={formValidation}
               className={`bg-primary text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-primaryDark hover:border-primary hover:bg-primaryDark hover:text-white transition duration-200 ease-in-out`}>
                 {currentStep === steps.length -1 ? <p className='flex justify-center items-center gap-1'> <form onSubmit={submitData}><button type='submit'>{t("confirm")}</button></form> <FaCheck /></p> : <p className='flex justify-center items-center gap-1'><button onClick={formValidation}>{t("next")}</button><FaChevronRight /></p>}
               </button>
               </div>
             }
   
          
       </div>
  );
};

export default StepperControlTrader;
