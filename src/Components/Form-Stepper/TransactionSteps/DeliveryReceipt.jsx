import React, { useContext, useEffect, useState } from 'react';
import { StepperContextTransaction } from '../../context/StepperContextTransaction';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { get_seller_order, seller_order_status_update } from '../../../store/Reducers/OrderReducer';
import {add_transaction,messageClear,DeliveryHandoffProofAdd} from '../../../store/Reducers/transactionReducer';
// import { messageClear, get_seller_order, seller_order_status_update } from '../../store/Reducers/OrderReducer';
import dateFormat from 'dateformat';
import { FaPhoneSquare } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { BsImage } from 'react-icons/bs';
import { FaChevronLeft } from "react-icons/fa";

const DeliveryReceipt = () => {
   const dispatch = useDispatch();
      const { dealId } = useParams();
      const navigate = useNavigate();
      const [status, setStatus] = useState('');
      const [loading, setLoading] = useState(true); // New loading state
      const [loader, setLoader] = useState(false);
    
      const { transactionData, setTransactionData } = useContext(StepperContextTransaction);
      const { currentStep, setCurrentStep } = useContext(StepperContextTransaction);
      const { currentTransaction, setCurrentTransaction } = useContext(StepperContextTransaction);
    
      const { seller } = useSelector((state) => state.seller);
      const { userInfo } = useSelector((state) => state.auth);
      const { order} = useSelector((state) => state.order);
      const { transaction, errorMessage, successMessage } = useSelector((state) => state.transaction);
      let orderId = dealId;


      const [imageShow, setImage] = useState('')

      const [state, setState] = useState({
        transactionId: '',
        image: null, // Store the selected image here
      });

      useEffect(() => {
        if (currentTransaction && currentTransaction._id) {
          setState((prevState) => ({
            ...prevState,
            transactionId: currentTransaction._id,
          }));
        }
      }, [currentTransaction]);
    

      const imageHandler= (e)=>{
        let files = e.target.files
        console.log(files)
        if(files.length>0){
            setImage(URL.createObjectURL(files[0]))
            setState({
                ...state,
                image: files[0]
            })
    
        }
    }

    const inputHandle = (e)=>{
      setState({
          ...state,
          [e.target.name] : e.target.value
  
      })
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(Math.floor(num));
  };
  
  const addDeliveryHandoffProof = async (e) => {
    e.preventDefault();
    setLoader(true); // Show loader while the request is being processed
  
    try {
      // Dispatch the action and wait for its completion
      await dispatch(DeliveryHandoffProofAdd(state));
  
      // Check for success or error messages after the dispatch is resolved
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.success(successMessage);
        // Clear the form state and image preview after success
        setState({ transactionId: '', image: null });
        setImage('');
      }
    } catch (err) {
      // Handle unexpected errors
      console.error('An error occurred:', err);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      // Always clear messages and stop the loader
      window.location.reload()
      dispatch(messageClear());
      setLoader(false);
    }
  };
  

      // const addDeliveryHandoffProof = (e)=>{
      //   e.preventDefault()
      //   dispatch(DeliveryHandoffProofAdd(state))
      //   if (errorMessage) {
      //         toast.error(errorMessage);
      //         dispatch(messageClear());
      //         window.location.reload(); // Refresh the page
      //       } else {
      //         toast.success(successMessage);
      //         dispatch(messageClear());
      //         window.location.reload(); // Refresh the page
      //       }
      //  }

      //  useEffect(() => {
      //   if (errorMessage) {
      //     toast.error(errorMessage);
      //     dispatch(messageClear());
      //     window.location.reload(); // Refresh the page
      //   } else {
      //     toast.success(successMessage);
      //     dispatch(messageClear());
      //     window.location.reload(); // Refresh the page
      //   }
      // }, [successMessage, errorMessage]);
      
  return (
     <section className='w-full p-2'>
        <div className="w-full">
                <div className="w-full">
                  <div className="flex lg:flex-col-reverse gap-2 flex-row lg:justify-center ">
                    <div className="w-full">
                      <div className="flex justify-center items-center gap-2">
                      <form onSubmit={addDeliveryHandoffProof} className='md:w-6/12 w-full'>
                      
                     
                      <div className="">
                          <label htmlFor="image" className='flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-accent w-full border-text_color'>
                              {
                                  imageShow ? <img className='w-ful h-full bg-red-600 object-fill' src={imageShow} alt="" required/> : <>
                                      <span><BsImage size='40px'/></span>
                                     <span className='font-semibold'>Upload Handoff Proof Image</span>
                                  </>
                              }
                              
                          </label>
                      </div>
                      <input onChange={imageHandler} className='hidden' type="file" name='image' id='image' />

{/* 
                      <div className="w-full mt-3">
                              <label htmlFor="name">Message</label>
                              <textarea onChange={inputHandle} value={state.message} className='w-full h-[129px] px-4 py-2 focus:border-accent border-2 outline-none bg-transparent border-slate-700 rounded-md text-slate-800' type="text" placeholder='Listing Description'  name='message' id='message'></textarea>
                          </div> */}
               
                      <button disabled={loader ? true : false} className='bg-primaryDark w-full hover:shadow-[#6ED601]/10 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 font-bold mt-5'>
                          {
                                //  loader ? <PropagateLoader color='#fff'cssOverride = {overRideStyle}/> :'Add Category'
                                 loader ? 'loading...' :'Upload Handoff Proof'
                          }
                      </button>
                   </form>
                      </div>
                    </div>
                  </div>
                </div>
            
          
        </div>
      </section>
  )
}

export default DeliveryReceipt