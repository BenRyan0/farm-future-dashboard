import React, { useContext, useEffect, useState } from 'react';
import { StepperContextTransaction } from '../../context/StepperContextTransaction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { messageClear, get_seller_order, seller_order_status_update } from '../../../store/Reducers/OrderReducer';
import {add_transaction} from '../../../store/Reducers/transactionReducer';
// import { messageClear, get_seller_order, seller_order_status_update } from '../../store/Reducers/OrderReducer';
import dateFormat from 'dateformat';
import { FaPhoneSquare } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";



const Initialization = () => {
    const dispatch = useDispatch();
    const { dealId } = useParams();
    const navigate = useNavigate()
      const [status, setStatus] = useState('');
      const [loading, setLoading] = useState(true); // New loading state
    
    const {transactionData, setTransactionData} = useContext(StepperContextTransaction);
    const {currentStep, setCurrentStep} = useContext(StepperContextTransaction);
  
     const { seller } = useSelector((state) => state.seller);
      const { userInfo } = useSelector(state => state.auth)
      const { order,errorMessage,successMessage } = useSelector((state) => state.order);
      let orderId = dealId;
  
      console.log(order)
        useEffect(() => {
          // Fetch order data and set loading
          setLoading(true);
          dispatch(get_seller_order(orderId)).then(() => setLoading(false));
          // dispatch(get_trader(orderId)).then(() => setLoading(false));
        }, [dispatch, orderId]);
      
        useEffect(() => {
          if (seller) {
            setStatus(seller.status);
          }
        }, [seller]);
  
  
        useEffect(()=>{
          if(errorMessage){
              toast.error(errorMessage)
              dispatch(messageClear())
            
              
          }else{
              toast.success(successMessage)
          dispatch(messageClear())
               
      
          }
          },[successMessage, errorMessage])


          const [state, setState] = useState({
                depositAmount: ""
              })
      
  
  
        const formatNumber = (num) => {
          return new Intl.NumberFormat('en-US').format(Math.floor(num));
        };
      
  
  
  
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setTransactionData({ ...transactionData, [name]: value });
    };
  
  
    const initializeTransaction = () =>{
      setCurrentStep(2)
      // dispatch(
      //   add_transaction({traderId: userInfo.id, sellerId: userInfo.id, listingId: userInfo.id, listingName: userInfo.id, listingPrice: userInfo.id, depositAmount: userInfo.id})
      // )
    }

    const inputHandle = (e)=>{
        setState({
            ...state,
            [e.target.name] : e.target.value

        })
    }

    
      
  return (
     <div className="px-2 lg:px-7 pt-5">
          {loading ? (
            // Loader section
            <div className="flex justify-center items-center min-h-screen">
              <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent text-primary"></div>
            </div>
          ) : (
          <div className='flex flex-col gap-3'>
          <div className="bg-slate-500 px-3 py-2">
            <div className="w-full flex lg:flex-row flex-col justify-between">
              <div className="w-full">asd</div>
              <div className="w-full">
                <h2 className='uppercase'><span >SELECTED:</span> {order.shippingMethod}</h2>
              </div>
            </div>
          </div>
          <div className="bg-slate-500  py-2">
            <div className="w-full flex lg:flex-row flex-col justify-between">
              <div className="w-full px-2">
                <h2 className='font-bold'>LISTING</h2>
                <div className="border-t-2 pt-3">
                  <div className=""><h2>Name: {order.listing[0].name}</h2></div>
                  <div className=""><h2>Category: {order.listing[0].category}</h2></div>
                  <div className=""><h2>ClusterName: {order.listing[0].clusterName}</h2></div>
                </div>
              </div>
              <div className="w-full relative px-2 pb-[200px]">
                <h2 className='font-bold'>LOGISTICS</h2>
                <div className="border-t-2 pt-3">
                  <div className=""><h2>Name: {order.listing[0].name}</h2></div>
                  <div className=""><h2>Category: {order.listing[0].category}</h2></div>
                  <div className=""><h2>ClusterName: {order.listing[0].clusterName}</h2></div>
                  <div className=""><h2>Category: {order.listing[0].category}</h2></div>
                  <div className=""><h2>ClusterName: {formatNumber(order.price)}</h2></div>
                  {/* <div className=""><h2>ClusterName: {order.listing[0].price}</h2></div> */}
                </div>
    
                <div className="absolute bottom-0 left-0 right-0 flex justify-end px-2">
                    <div className="w-full h-full flex flex-col gap-1">
                        <div className="w-full">
                            <label className='uppercase font-bold' htmlFor="name">deposit Amount</label>
                        </div>
                    
                        <div className="w-full h-full flex flex-row justify-center items-center gap-1 ">
                            <div className="w-full">
                                {/* <label htmlFor="name">Yield</label> */}
                                <div className="flex flex-row items-center border-2 border-slate-700 rounded-md px-2 gap-1">
                                    <input  onChange={inputHandle} value={state.depositAmount} className='w-full bg-transparent px-1 py-2 focus:border-accent outline-none bg-[#283046]  text-[#d0d2d6]' type="number" placeholder='DepositAmount' min='0' name='depositAmount' id='depositAmount'/>
                                </div>
                            </div>

                            <div className="w-full h-full flex flex-row justify-start items-center ">
                                {/* Dropdown for predefined percentages */}
                                <select
                                    id="yieldPercentage"
                                    name="yieldPercentage"
                                    onChange={inputHandle}
                                    value={state.manualEnabled ? "" : state.yieldPercentage}
                                    disabled={state.manualEnabled} // Disable dropdown if manual input is enabled
                                    className={`bg-[#283046] pr-4 pb-2 outline-none rounded-md text-[#d0d2d6] border-none w-[70px] h-[45px] mx-1 ${
                                    state.manualEnabled ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                >
                                    <option value="">%</option>
                                    {Array.from({ length: 5 }, (_, i) => (i + 1) * 10).map((value) => (
                                    <option key={value} value={value}>
                                        {value}%
                                    </option>
                                    ))}
                                </select>

                                {/* Checkbox to enable manual input */}
                                <label className="flex items-center space-x-2">
                                    <input
                                    type="checkbox"
                                    id="manualEnabled"
                                    name="manualEnabled"
                                    onChange={(e) =>
                                        inputHandle({
                                        target: { name: "manualEnabled", value: e.target.checked },
                                        })
                                    }
                                    checked={state.manualEnabled}
                                    className="h-4 w-4"
                                    />
                                    <span className="text-[#d0d2d6] w-[60px]">custom (≤ 50%)</span>
                                </label>

                                {/* Input field for manual percentage */}
                                {state.manualEnabled && (
                                    <input
                                    type="number"
                                    id="manualPercentage"
                                    name="manualPercentage"
                                    min="1"
                                    max="50"
                                    onChange={(e) => {
                                        if (e.target.value <= 50) {
                                        inputHandle({
                                            target: {
                                            name: "yieldPercentage",
                                            value: e.target.value,
                                            },
                                        });
                                        }
                                    }}
                                    value={state.yieldPercentage}
                                    placeholder=""
                                    className="bg-[#283046] mx-1 px-1 outline-none rounded-md text-[#d0d2d6] text-xl border-none w-[50px] h-[45px] text-center"
                                    />
                                )}
                            </div>
                        </div>


                <button onClick={initializeTransaction} className='w-full bg-primaryDark px-4 py-1 rounded-sm font-bold flex justify-center items-center gap-2 hover:cursor-pointer group '>
                  <FaChevronRight className="transition-transform duration-200 ease-in-out transform translate-x-[-5px] group-hover:translate-x-[3px]" />
                  PROCEED
                </button>
                </div>
               
              </div>

              </div>
              
            </div>
          </div>
        </div>
          )}
            </div>
       
  )
}

export default Initialization