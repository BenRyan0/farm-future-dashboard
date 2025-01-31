import React, { useContext,useEffect } from 'react'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
// import Register from '../../views/auth/Register';
import { toast } from 'react-hot-toast';

const StepperControlTransaction = ({handleClick, currentStep, steps,submitData,userData}) => {
  console.log(currentStep + "current")
  console.log(steps + " steps")

 

  const formValidation =()=>{
    if(currentStep === 1){
      console.log("01")
      // if(!userData.firstName || !userData.middleName || !userData.lastName || !userData.email || !userData.phoneNumber || !userData.profileImage || !userData.sex ||!userData.birthDate ){
      //   toast.error("All Inputs are required")
      //   return
      // }else{
      //   handleClick("next")
      // }
      if (userData.firstName &&
        userData.lastName &&
        userData.email &&
        userData.phoneNumber &&
        userData.profileImage &&
        userData.sex &&
        userData.birthDate) {
      handleClick("next");
    } else {
      toast.error("All Inputs are required");
    }
     
    }else if(currentStep === 2){
      console.log("02")
      if (userData.firstName 
        // &&
        // userData.AssociationInfo.associationName &&
        // userData.AssociationInfo.associationImage &&
        // userData.AssociationInfo.associationloc_street &&
        // userData.AssociationInfo.associationloc_barangay &&
        // userData.AssociationInfo.associationloc_province &&
        // userData.AssociationInfo.associationloc_municipalitycity

      ) {
        handleClick("next");
    } else {
      toast.error("All Inputs are required");
    }
      
    }else if(currentStep === 3){
      if (userData.firstName 
        // &&
        // userData.AssociationInfo.associationName &&
        // userData.AssociationInfo.associationImage &&
        // userData.AssociationInfo.associationloc_street &&
        // userData.AssociationInfo.associationloc_barangay &&
        // userData.AssociationInfo.associationloc_province &&
        // userData.AssociationInfo.associationloc_municipalitycity

      ) {
        submitData()
        handleClick("next");
    } else {
      toast.error("All Inputs are required");
    }
      
     
    }
    else if(currentStep === 4){
      console.log("04")
    }
  }


  useEffect(()=>{
   
}, [steps])


  console.log(currentStep)
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
            className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700  hover:text-white transition duration-200 ease-in-out ${currentStep === 1 ? " opacity-20 cursor-not-allowed hover:bg-transparent hover:text-slate-400":""}`}> <p className='flex justify-center items-center gap-1'>Back <FaChevronLeft /></p></button>
          
            {/* {next button} */}
            <button
            onClick={formValidation}
            className={`bg-primary text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-primaryDark hover:border-primary hover:bg-primaryDark hover:text-white transition duration-200 ease-in-out`}>
              {currentStep === steps.length -1 ? <p className='flex justify-center items-center gap-1'> <form onSubmit={submitData}><button type='submit'>Confirm</button></form> <FaCheck /></p> : <p className='flex justify-center items-center gap-1'><button onClick={formValidation}>Next</button><FaChevronRight /></p>}
            </button>
            </div>
          }

       
    </div>

 
    
  )
}

export default StepperControlTransaction