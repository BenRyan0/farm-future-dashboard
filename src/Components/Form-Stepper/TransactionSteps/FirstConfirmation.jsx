import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MdPayment } from "react-icons/md";
import { confirmFirstPayment as confirmPaymentAction ,messageClear} from '../../../store/Reducers/transactionReducer';
import toast from 'react-hot-toast';
import dateFormat, { masks } from "dateformat";
import { MdFullscreen } from "react-icons/md";
const FirstConfirmation = () => {
    const dispatch = useDispatch();
    const { dealId } = useParams();
    const [isFullscreen, setIsFullscreen] = useState(false); // Track fullscreen state

    const { proof1, currentTransactions ,errorMessage,successMessage,Step1loader} = useSelector((state) => state.transaction);
 

    console.log(currentTransactions)
    // Handler for confirming the first payment
    const handleConfirmFirstPayment =  async (e) => {
        e.preventDefault();
        // Assuming currentTransactions is an array and we're confirming the first transaction
        try {
            // Dispatch the action and wait for it to complete
            await dispatch(confirmPaymentAction({transactionId : currentTransactions[0]._id})).unwrap(); // .unwrap() ensures you handle the promise correctly (if using Redux Toolkit)
            
            // Check for success or error messages
            if (errorMessage) {
              toast.error(errorMessage);
              dispatch(messageClear());
            } else {
              toast.success(successMessage);
              dispatch(messageClear());
            }
          } catch (err) {
            // Catch any unexpected errors
            toast.error("An unexpected error occurred!");
          } finally {
            // Refresh or reset the form
            window.location.reload(); // Alternatively, reset state manually if preferred
          }
    };
    // const handleConfirmFirstPayment = () => {
    //     // Assuming currentTransactions is an array and we're confirming the first transaction
    //     dispatch(confirmPaymentAction({transactionId : currentTransactions[0]._id}));
    //     if (errorMessage) {
    //       toast.error(errorMessage);
    //       dispatch(messageClear());
    //       window.location.reload(); // Refresh the page
    //     } else {
    //       toast.success(successMessage);
    //       dispatch(messageClear());
    //       window.location.reload(); // Refresh the page
    //     }
    // };

    const toggleFullscreen = () => {
        setIsFullscreen((prevState) => !prevState);
    };
    

    console.log("PROOF01")
    console.log(proof1)


    return (
        <div>
        {proof1 ? (
            <div className="w-full flex  md:flex-row flex-col gap-2 justify-center">
                {/* Image container with fullscreen toggle */}
                <div className="relative  w-[300px] flex justify-center items-center ">
                      {/* {proof1.imageUrl && (
                                     <img
                        className={`cursor-pointer ${
                            isFullscreen ? 'fixed top-0 left-0 w-full h-full object-contain bg-black z-[999999999999999999]' : 'w-[300px] '
                        }`}
                        src={proof1.imageUrl}
                        alt="Proof of Payment"
                        onClick={toggleFullscreen}
                    />
                                  )} */}
                                    <img
                        className={`cursor-pointer ${
                            isFullscreen ? 'fixed top-0 left-0 w-full h-full object-contain bg-black z-[999999999999999999]' : 'w-[300px] '
                        }`}
                        src={proof1.imageUrl}
                        alt="Proof of Payment"
                        onClick={toggleFullscreen}
                    />
                   
                    <div className="absolute bottom-2 right-2 text-[#283046] flex justify-center items-center">
                        <label htmlFor="">Click Image For Fullscreen View</label>
                        <MdFullscreen color='#283046' size={25}/>
                    </div>
                </div>
               
                {!isFullscreen && (
                    <div className="md:w-5/12 w-full text-slate-700 bg-slate-200 relative p-2 h-[300px] ">
                        <div className=" flex items-center justify-between text-end mb-6 border-b-2 border-primaryDark pb-3">
                        <h2 className='font-bold  text-primaryDark'>UPLOAD DATE: </h2>
                         <h2 className='bg-primaryDark font-semibold px-3 py-1 text-slate-100'> {dateFormat((proof1.uploadDate), "mmmm dS, yyyy")} </h2>
                        
                        </div>
                        <div className="w-full text-wrap ">
                            <label className="font-bold">Trader Message: </label>
                            <p className="px-3">{proof1.message}</p>
                        </div>
                        <div className="w-full absolute bottom-2 left-0 right-0 flex justify-center items-center">
                        <button
                                onClick={handleConfirmFirstPayment}
                                className="bg-primaryDark px-5 py-2 text-slate-200 rounded-md font-bold flex justify-center items-center gap-2"
                            >
                                CONFIRM TRADER DEPOSIT <MdPayment size={23} />
                            </button>
                        </div>

                    </div>
                    
                )}
              
            </div>
        ) : (
            <div className="w-full text-center text-primary py-10 flex justify-center items-center gap-2">
                <h2 className="font-bold text-xl uppercase">
                    Trader Has Not Uploaded A Proof of Deposit Yet
                </h2>
            </div>
        )}
    </div>
    );
}

export default FirstConfirmation;
