import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import StepperTransaction from '../../Components/Form-Stepper/StepperTransaction';
import Review from '../../Components/Form-Stepper/TransactionSteps/Review';
import Initialization from '../../Components/Form-Stepper/TransactionSteps/Initialization';
import FirstConfirmation from '../../Components/Form-Stepper/TransactionSteps/FirstConfirmation';
import DeliveryReceipt from '../../Components/Form-Stepper/TransactionSteps/DeliveryReceipt';
import SecondPayment from '../../Components/Form-Stepper/TransactionSteps/SecondPayment';
import SecondConfirmation from '../../Components/Form-Stepper/TransactionSteps/SecondConfirmation';
import Complete from '../../Components/Form-Stepper/TransactionSteps/Complete';
import StepperControlTrader from '../../Components/Form-Stepper/StepperControlTrader';
import { StepperContextTransaction } from '../../Components/context/StepperContextTransaction';

import { get_transaction_by_deal,messageClear } from '../../store/Reducers/transactionReducer';
import toast from 'react-hot-toast';
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

const TransactionProgress = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [currentTransaction, setCurrentTransaction] = useState([]);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [buyerInfo, setBuyerInfo] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const dispatch = useDispatch();
  const { dealId } = useParams();

  const [showProductInfo, setShowProductInfo] = useState(false);
  const [showBuyerInfo, setShowBuyerInfo] = useState(false);

  const { transaction, errorMessage, successMessage, currentTransactions } = useSelector(
    (state) => state.transaction
  );

  const steps = [
    'Review', // Buyer selects the product and sees the price and deposit required.
    'Initialization', // Buyer pays the deposit via an external method and uploads the proof of payment.
    'Confirmation', // Seller reviews and confirms the deposit proof.
    'Delivery/Receipt', // The product is delivered to the buyer.
    'Confirmation', // Buyer pays the remaining balance and uploads the proof of payment.
    'Confirmation', // Seller reviews and confirms the final payment proof.
    'Complete', // The transaction is marked as complete by the seller.
  ];

  const displaySteps = (step) => {
    switch (step) {
      case 1:
        return <Review />;
      case 2:
        return <Initialization />;
      case 3:
        return <FirstConfirmation />;
      case 4:
        return <DeliveryReceipt />;
      case 5:
        return <SecondPayment />;
      case 6:
        return <SecondConfirmation />;
      case 7:
        return <Complete />;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;
    if (direction === 'none') {
    } else {
      direction === 'next' ? newStep++ : newStep--;

      newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    }
  };


  useEffect(() => {
    setCurrentTransaction(currentTransactions[0])
  }, [currentTransactions]);

  
  
  useEffect(() => {
    let traderDealId = dealId
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(get_transaction_by_deal(traderDealId));
      } catch (error) {
        console.error('Error fetching transaction:', error);
      } finally {
        setLoading(false);
      }
    };

  

    fetchData();
  }, [dispatch, dealId]);

  useEffect(() => {
    if (currentTransactions && currentTransactions.length > 0) {
      let myStep = currentTransactions[0]?.sellerStep || 1;
      setCurrentStep(myStep);
    }
  }, [currentTransactions]);

  useEffect(() => {
    let myStep = currentTransaction?.sellerStep || 1;
    setCurrentStep(myStep);
  }, [currentTransaction]);

  useEffect(()=>{
    if(errorMessage){
        toast.error(errorMessage)
        dispatch(messageClear())
        // refreshPage
    }else{
        toast.success(successMessage)
        dispatch(messageClear())
        // refreshPage
    }
    },[successMessage, errorMessage])

  if (loading) {
    return (
      <div className="w-full p-4 bg-[#283046] text-slate-200 rounded-md">
        <p>Loading transaction data...</p>
      </div>
    );
  }

  return (
    <div className="px-2 lg:px-7 pt-5 pb-[90px]">
      <div className="w-full p-4 bg-[#283046] rounded-md text-slate-200">
        <div className="horizontal mt-5 w-full">
          <StepperTransaction steps={steps} currentStep={currentStep} />

          <div className="my-1 py-10 md:px-1 px-1">
            <StepperContextTransaction.Provider
              value={{
                transactionData,
                setTransactionData,
                currentStep,
                setCurrentStep,
                currentTransaction,
                setCurrentTransaction,
                currentProduct, 
                setCurrentProduct,
                buyerInfo, 
                setBuyerInfo
              }}
            >
              {displaySteps(currentStep)}
            </StepperContextTransaction.Provider>
          </div>
          {
            currentStep === 100? 
            <div className="">asdasd</div> 
            : 
            <div className="w-full px-2 lg:px-7 pt-5">
            {/* Buttons */}
            <div className="w-full flex justify-between">
              <div className=""></div>
              <div className="flex gap-3">
                <button
                  className="flex gap-2 justify-center items-center"
                  onClick={() => setShowProductInfo(!showProductInfo)}
                >
                  Product Info
                  <span
                    className={`transition-transform duration-300 ease-in-out ${
                      showProductInfo ? "rotate-360" : "rotate-0"
                    }`}
                  >
                    {showProductInfo ? <FaChevronUp size={20} /> : <FaChevronDown size={20}/>}
                  </span>
                </button>
                <button
                  className="flex gap-2 justify-center items-center"
                  onClick={() => setShowBuyerInfo(!showBuyerInfo)}
                >
                  Buyer Info
                  <span
                    className={`transition-transform duration-300 ease-in-out ${
                      showBuyerInfo ? "rotate-360" : "rotate-0"
                    }`}
                  >
                    {showBuyerInfo ? <FaChevronUp size={20}/> : <FaChevronDown size={20}/>}
                  </span>
                </button>
              </div>
            </div>
      
            {/* Product Info Section with Animation */}
            <div
              className={`bg-slate-500 mt-3 p-4 transition-all duration-300 ease-in-out overflow-hidden rounded-md ${
                showProductInfo ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 hidden"
              }`}
            >
              <h2>Product Info</h2>
              <p>Details about the product go here.</p>
            </div>
      
            {/* Buyer Info Section with Animation */}
            <div
              className={`bg-slate-500 mt-3 p-4 transition-all duration-300 ease-in-out overflow-hidden rounded-md ${
                showBuyerInfo ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 hidden"
              }`}
            >
              <h2>Buyer Info</h2>
              <p>Details about the buyer go here.</p>
            </div>
          </div>
          
          }
        </div>
       
      </div>
     
      {/* <StepperControlTrader handleClick={handleClick} currentStep={currentStep} steps={steps} /> */}
    </div>
  );
};

export default TransactionProgress;
