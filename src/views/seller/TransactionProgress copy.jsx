import React, { useEffect, useState } from 'react'
import StepperTransaction from '../../Components/Form-Stepper/StepperTransaction'

import Review from '../../Components/Form-Stepper/TransactionSteps/Review';
import FirstPayment from '../../Components/Form-Stepper/TransactionSteps/FirstPayment';
import FirstConfirmation from '../../Components/Form-Stepper/TransactionSteps/FirstConfirmation';
import DeliveryReceipt from '../../Components/Form-Stepper/TransactionSteps/DeliveryReceipt';
import SecondPayment from '../../Components/Form-Stepper/TransactionSteps/SecondPayment';
import SecondConfirmation from '../../Components/Form-Stepper/TransactionSteps/SecondConfirmation';
import Complete from '../../Components/Form-Stepper/TransactionSteps/Complete';
import Initialization from '../../Components/Form-Stepper/TransactionSteps/Initialization';
import { StepperContextTransaction } from '../../Components/context/StepperContextTransaction';
import { useDispatch, useSelector } from 'react-redux';

import {add_transaction,messageClear,get_transaction_by_deal} from '../../store/Reducers/transactionReducer';
import { useParams } from 'react-router-dom';
import StepperControl from './../../Components/Form-Stepper/StepperControl';
import StepperControlTrader from './../../Components/Form-Stepper/StepperControlTrader';




const TransactionProgress = () => {
    
    const [currentStep, setCurrentStep] = useState(1)
    const { transaction, errorMessage, successMessage,currentTransactions } = useSelector((state) => state.transaction);
    const [currentTransaction, setCurrentTransaction] = useState([])
    const [transactionData, setTransactionData] = useState([])
    const [finalData, setFinalData] = useState([])
    const dispatch = useDispatch();
    const { dealId } = useParams();

    console.log(dealId)


    const steps = [
        "Review", // Buyer selects the product and sees the price and deposit required.
        "Initialization", // Buyer pays the deposit via an external method and uploads the proof of payment.
        // "Proof_Upload", // Buyer pays the deposit via an external method and uploads the proof of payment.
        "Confirmation", // Seller reviews and confirms the deposit proof.
        "Delivery/Receipt", // The product is delivered to the buyer.
        "Upload_Proof", // Buyer pays the remaining balance and uploads the proof of payment.
        "Confirmation", // Seller reviews and confirms the final payment proof.
        "Complete" // The transaction is marked as complete by the seller.
    ];


    // console.log("NGOIIII")
    // console.log(currentTransaction)
    // console.log("__________________________ >")
    const displaySteps = (step)=>{
        switch(step){
            case 1:
                return <Review/>
            case 2:
                return <Initialization/>
            case 3:
                return <FirstConfirmation/>
            case 4:
                return <DeliveryReceipt/>
            case 5:
                return <SecondPayment/>
            case 6:
                return <SecondConfirmation/>
            case 7:
                return <Complete/>
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

    // useEffect(()=>{
    //     console.log("get")
    //     get_transaction_by_deal({dealId})
    //     console.log("------------ GET")
    
    // },[dealId])
    useEffect(() => {
        console.log("Fetching transaction by deal...");
        dispatch(get_transaction_by_deal(dealId))
        //   .then((response) => {
        //     console.log("Transaction fetched successfully:", response);
        //   })
        //   .catch((error) => {
        //     console.error("Error fetching transaction:", error);
        //   });
      }, [dispatch, dealId]);

    useEffect(() => {
        let myStep = currentTransactions[0].buyerStep || 1
       setCurrentStep(myStep)
      }, [currentTransactions]);

    useEffect(()=>{
        let myStep = currentTransaction.buyerStep || 1
        setCurrentStep(myStep)
    },[currentTransaction])

  return (
    <div className='px-2 lg:px-7 pt-5 pb-[90px]'>
        <div className="w-full p-4 bg-[#283046] rounded-md text-slate-200">
        {/* <div className="w-full p-4 bg-[#283046] rounded-md text-slate-200"> */}
        <div className="horizontal mt-5 w-full">
            <StepperTransaction steps = {steps} currentStep={currentStep}/>
          {/* <Stepper steps = {steps} currentStep={currentStep}/> */}

          <div className="my-1 py-10 md:px-1 px-1">
            <StepperContextTransaction.Provider value={{
                    transactionData,
                    setTransactionData,
                    currentStep, 
                    setCurrentStep,
                    currentTransaction,
                     setCurrentTransaction,
                    finalData,
                    setFinalData,
                    
                }}>
                {displaySteps(currentStep)}
            </StepperContextTransaction.Provider>
          {/* <StepperContext.Provider value={{
                    userData,
                    setUserData,
                    finalData,
                    setFinalData,
                    
                }}>
                {displaySteps(currentStep)}

                </StepperContext.Provider> */}
          </div>
        </div>
        </div>
        <StepperControlTrader handleClick={handleClick}
            currentStep={currentStep} steps={steps} />
       
    </div>
  )
}

export default TransactionProgress