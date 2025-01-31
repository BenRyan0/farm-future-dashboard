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
import { get_seller_order, seller_order_status_update } from '../../store/Reducers/OrderReducer';

import { get_transaction_by_deal,messageClear } from '../../store/Reducers/transactionReducer';
import toast from 'react-hot-toast';
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import dateFormat, { masks } from "dateformat";
const TransactionProgress = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [currentTransaction, setCurrentTransaction] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const dispatch = useDispatch();
  const { dealId } = useParams();
  const [currentProduct, setCurrentProduct] = useState([]);
  const [buyerInfo, setBuyerInfo] = useState([]);
  const { order} = useSelector((state) => state.order);
  let orderId = dealId;

   // const {buyerInfo, setBuyerInfo} = useContext(StepperContextTransaction);
  // const {currentProduct, setCurrentProduct} = useContext(StepperContextTransaction);
  const [showProductInfo, setShowProductInfo] = useState(false);
  const [showBuyerInfo, setShowBuyerInfo] = useState(false);

  const { transaction, errorMessage, successMessage, currentTransactions,loader } = useSelector(
    (state) => state.transaction
  );
   

  console.log("-------------------------------- >")
  console.log(orderId)
  useEffect(() => {
        setLoading(true);
        dispatch(get_seller_order(orderId)).then(() => setLoading(false));

      }, [dispatch, orderId]);


      
    

  const steps = [
    'Review', // Buyer selects the product and sees the price and deposit required.
    'Initialization', // Buyer pays the deposit via an external method and uploads the proof of payment.
    '1st Payment Confirmation', // Seller reviews and confirms the deposit proof.
    'Delivery/Receipt', // The product is delivered to the buyer.
    'Handoff Confirmation', // Buyer pays the remaining balance and uploads the proof of payment.
    '2nd Payment Confirmation', // Seller reviews and confirms the final payment proof.
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

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(Math.floor(num));
  };  

  useEffect(() => {
    setCurrentTransaction(currentTransactions[0])
  }, [currentTransactions]);

  useEffect(() => {
    setCurrentTransaction(currentTransactions[0])
  });

  

  console.log("currentTransactions:-------------->")
  console.log(currentTransaction)
  console.log("currentProduct:")
  console.log(currentProduct)
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(get_transaction_by_deal(dealId));
        // Assuming you update `currentTransaction` here or it gets updated via Redux
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
    // setCurrentStep(2);
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

    const [copiedText, setCopiedText] = useState(null); // To track the copied text

    const handleCopy = (text) => {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedText(text); // Set the copied text
        setTimeout(() => setCopiedText(null), 2000); // Clear the confirmation after 2 seconds
      });
    };

  if (loader) {
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
                currentProduct, setCurrentProduct,
                buyerInfo, setBuyerInfo
              }}
            >
              {displaySteps(currentStep)}
            </StepperContextTransaction.Provider>
          </div>
          {
            currentStep === 1? 
            <div className=""></div> 
            : 
            <div className="w-full px-2 lg:px-7 pt-5">
              
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
                  logistics Info
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

            <div
              className={`bg-slate-500 mt-3 p-4 transition-all duration-300 ease-in-out overflow-hidden rounded-md ${
                showProductInfo ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 hidden"
              }`}
            >
              <h2>Product Info</h2>
              {
                currentProduct? 
                (
                  <div className="px-2 flex justify-between lg:flex-row flex-col gap-1">
                  <div className="w-full">
                     <h2><span className='font-bold uppercase pr-1'>Name: </span > {currentProduct.listing[0].name}</h2>
                     <h2><span className='font-bold uppercase pr-1'>price: </span> <span>&#8369;</span> {currentProduct.listing[0].price}/{currentProduct.listing[0].unit}</h2>
                     <h2><span className='font-bold uppercase pr-1'>expectedHarvestYield: </span> {currentProduct.listing[0].expectedHarvestYield} {currentProduct.listing[0].yieldUnit}</h2>
                     <h2><span className='font-bold uppercase pr-1'>totalPrice: </span> {formatNumber(currentProduct.listing[0].totalPrice)}</h2>
                     <h2><span className='font-bold uppercase pr-1'>description: </span> {currentProduct.listing[0].description}</h2>
                     <h2><span className='font-bold uppercase pr-1'>harvestStartDate: </span> {dateFormat((currentProduct.listing[0].harvestStartDate), "yyyy-mm-dd")}</h2>
                     <h2><span className='font-bold uppercase pr-1'>harvestEndDate: </span>{dateFormat((currentProduct.listing[0].harvestEndDate), "yyyy-mm-dd")}</h2>
                     <h2><span className='font-bold uppercase pr-1'>locationInfo: </span> {currentProduct.listing[0].locationInfo}</h2>
                     <h2 className='py-1'>
                      <span className="font-bold uppercase pr-1">mapsLink: </span>
                      <a 
                        href={currentProduct.listing[0].mapsLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 bg-slate-100 rounded-sm font-bold px-2 py-[2px] underline"
                      >
                        Open in Google Maps
                      </a>
                    </h2>
                     
                     <h2><span className='font-bold uppercase pr-1'>pricePerUnit: </span> {currentProduct.listing[0].pricePerUnit} <span>&#8369;</span> /{currentProduct.listing[0].unit}/KM</h2>
                     <h2 className='flex justify-start items-center'><span className='font-bold uppercase pr-1 '>sellerDelivery: </span> 
                      {currentProduct.listing[0].sellerDelivery === true? <span className="text-primary font-semibold bg-slate-100 py-[1px] px-3 my-[1px] ">Available</span> : <span className="text-red-600 font-semibold bg-slate-100 py-1 px-3 ">Unavailable</span> }
                     </h2>
                     <h2 className='flex justify-start items-center'><span className='font-bold uppercase pr-1'>traderPickup: </span> 
                      {currentProduct.listing[0].sellerDelivery === true? <span className="text-primary font-semibold bg-slate-100 py-[1px] px-3 my-[1px]">Available</span> : <span className="text-red-600 font-semibold bg-slate-100 py-1 px-3 ">Unavailable</span> }  
                      </h2>
                      {
                        currentProduct.listing[0].shippingFee === 0?
                        (
                          <div className=""></div>
                        )
                        :
                        (
                          <h2><span className='font-bold uppercase pr-1'>shippingFee: </span> {currentProduct.listing[0].shippingFee}</h2>

                        )
                      }
                     
                  </div>
                  <div className="w-full">
                     <h2><span className='font-bold uppercase pr-1'>discount: </span> {currentProduct.listing[0].discount} %</h2>
                     <h2><span className='font-bold uppercase pr-1'>category: </span> {currentProduct.listing[0].category}</h2>
                     <h2><span className='font-bold uppercase pr-1'>clusterName: </span> {currentProduct.listing[0].clusterName}</h2>
                  </div>
                 </div> 
                  
                )
                :
                ( <div className=""></div> )
              }
             
             
            </div>
      
           
          { 
            currentProduct.shippingMethod === "traderPickup" ? 
            (  <div
              className={`bg-slate-500 mt-3 p-4 transition-all duration-300 ease-in-out overflow-hidden rounded-md ${
                showBuyerInfo ? "max-h-[500px] opacity-100 text-base" : "max-h-0 opacity-0 hidden"
              }`}
            >
              <div className="flex  flex-col">
                <h2 className='font-semibold text-lg'>logistics Info</h2>
                <div className="flex flex-col gap-1">
                    <h2><span className='font-bold uppercase'>Trader Name : </span> {currentProduct.shippingInfo.name}</h2>
                    <h2>
                      <span className="font-bold uppercase">Phone: </span>
                      {currentProduct.shippingInfo.phone}
                      <button 
                        className="ml-2 bg-blue-500 text-white px-2 py-1 rounded lg:hidden" 
                        onClick={() => window.location.href = `tel:${currentProduct.shippingInfo.phone}`}>
                        Call
                      </button>
                      <button
                        className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
                        onClick={() => handleCopy(currentProduct.shippingInfo.phone)}
                      >
                        Copy
                      </button>
                      {copiedText === currentProduct.shippingInfo.phone && (
                        <span className="ml-2 text-green-500 font-semibold ">Copied!</span>
                      )}

                    </h2>
                    <h2>
                    <span className="font-bold uppercase">Email: </span>
                    {currentProduct.shippingInfo.email}
                    <button 
                      className="ml-2 bg-blue-500 text-white px-2 py-1 rounded lg:hidden" 
                      onClick={() => window.location.href = `mailto:${currentProduct.shippingInfo.email}`}>
                      Email
                    </button>
                    <button
                        className="ml-2 bg-green-500 text-white px-2 py-1 rounded "
                        onClick={() => handleCopy(currentProduct.shippingInfo.email)}
                      >
                        Copy
                      </button>
                      {copiedText === currentProduct.shippingInfo.email && (
                        <span className="ml-2 text-green-500 font-semibold ">Copied!</span>
                      )}

                  </h2>
                </div>
               
              </div>
           
              <div className="px-2">
            
              </div>
            </div>)
            :
            (  <div
              className={`bg-slate-500 mt-3 p-4 transition-all duration-300 ease-in-out overflow-hidden rounded-md ${
                showBuyerInfo ? "max-h-[500px] opacity-100 text-base" : "max-h-0 opacity-0 hidden"
              }`}
            >
              <h2>My logistics Info</h2>
              <div className="px-2">
                 <h2><span className='font-bold uppercase'>Trader Name : </span> {currentProduct.shippingInfo.name}</h2>
                 <h2>
                  <span className="font-bold uppercase">Phone: </span>
                  {currentProduct.shippingInfo.phone}
                  <button 
                    className="ml-2 bg-blue-500 text-white px-2 py-1 rounded" 
                    onClick={() => window.location.href = `tel:${currentProduct.shippingInfo.phone}`}>
                    Call
                  </button>
                </h2>
                <h2>
                <span className="font-bold uppercase">Email: </span>
                {currentProduct.shippingInfo.address}
                <button 
                  className="ml-2 bg-green-500 text-white px-2 py-1 rounded" 
                  onClick={() => window.location.href = `mailto:${currentProduct.shippingInfo.address}`}>
                  Email
                </button>
              </h2>
                 <h2><span className='font-bold uppercase'>locationInfo : </span> {currentProduct.shippingInfo.locationInfo}</h2>
                 <h2><span className='font-bold uppercase'>additionalLocationInfo : </span> {currentProduct.shippingInfo.additionalLocationInfo}</h2>
                 <h2 className='py-1'>
                      <span className="font-bold uppercase pr-1">mapsLink: </span>
                      <a 
                        href={currentProduct.shippingInfo.mapsLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 bg-slate-100 rounded-sm font-bold px-2 py-[2px] underline"
                      >
                        Open in Google Maps
                      </a>
                    </h2>
              </div>
            </div>)
          }
          </div>
          
          }
        </div>
       
      </div>
     
      {/* <StepperControlTrader handleClick={handleClick} currentStep={currentStep} steps={steps} /> */}
    </div>
  );
};

export default TransactionProgress;
