import React, { useEffect, useRef, useState } from 'react'
import { IoIosClose } from "react-icons/io";
import { FaList } from "react-icons/fa6";
import {Link, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {get_customers, get_customer_message,send_message,messageClear,updateMessage} from '../../store/Reducers/chatReducer'
import { BsEmojiSmile } from 'react-icons/bs'
import {socket} from '../../utils/Utils'
import toast, { Toaster } from 'react-hot-toast';


const SellerToCustomer = () => {
    const scrollRef = useRef()
    const {userInfo} = useSelector(state=>state.auth)
    const {customers,messages,currentCustomer,successMessage, activeSellers ,activeCustomer} = useSelector(state=>state.chat)
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const {customerId} = useParams()
    const [receivedMessage,setReceivedMessage] = useState('')


   
    const [show,setShow] = useState(false)
    

    useEffect(()=>{
     dispatch(get_customers(userInfo._id))
    },[])

    useEffect(() => {
        if (customerId) {
            dispatch(get_customer_message(customerId))
        }
    }, [customerId])

    const send = (e) => {
        e.preventDefault()
        dispatch(send_message({
            senderId: userInfo._id,
            receiverId: customerId,
            text,
            name: userInfo?.clusterInfo?.clusterName
        }))
        setText('')
    }


    // WORKING
    useEffect(() => {
        // Ensure dependencies are valid
        if (successMessage && messages.length > 0) {
            const lastMessage = messages[messages.length - 1];

            // Check if socket is connected
            if (socket && socket.connected) {
                socket.emit('send_seller_message', lastMessage);

                // Clear the success message via Redux
                dispatch(messageClear());
            } else {
                console.error("Socket is not connected");
            }
        }
    }, [successMessage, messages, socket, dispatch]); 
   
    // WORKING
   
   
   
   
    useEffect(() => {
        socket.on('customer_message', msg => {
            setReceivedMessage(msg)
        })
    }, [])
    useEffect(() => {
        // socket.on('customer_message', msg => {
        //     setReceverMessage(msg)
        // })
    }, [])

    useEffect(() => {

        if (receivedMessage) {
            if (customerId === receivedMessage.senderId && userInfo._id === receivedMessage.receiverId) {
                dispatch(updateMessage(receivedMessage))
            }
            else {
                toast.success(receivedMessage.senderName + " " + "sent a message")
                dispatch(messageClear())
            }
        }
    }, [receivedMessage])

    console.log(receivedMessage)

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])
  return (
    <div className='px-2 lg:px-7 py-5'>
        <div className="w-full bg-[#283046] px-4 py-4 rounded-md h-[calc(100vh-140px)]">
            <div className="flex w-full h-full relative">
                <div className={`w-[280px] h-full absolute z-10 ${show ? '-left-[16px]':'-left-[336px]'} md:left-0 md:relative transition-all`}>
                    <div className="w-full h-[calc(100vh-177px)] bg-[#252b3b] md:bg-transparent overflow-y-auto rounded-lg p-2">
                        <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-text_color">
                            <h2>Customers</h2>
                            <span onClick={() => setShow(!show)} className='block cursor-pointer md:hidden'><IoIosClose /></span>
                        </div>
                        {
                            customers.map((c,i)=>
                                
                                <Link key={i} to={`/seller/dashboard/chat-customer/${c.fdId}`}  className={`h-[60px] flex justify-start gap-2 items-center text-text_color px-2 py-2 rounded-md cursor-pointer bg-slate-700`}>
                                    <div className="relative">
                                        <img className='w-[45px] h-[45px] border-white border-2 max-w-[50px] p-[2px] rounded-full' src="/images/Ben_Ryan_0.jpg" alt="" />
                                        {
                                            activeCustomer.some((a => a.customerId === c.fdId)) && 
                                            <div className="w-[13px] h-[13px] bg-green-500 rounded-full absolute right-0 bottom-0 border-white border-2"></div>
                                        }
                                        {/* <div className="w-[13px] h-[13px] bg-green-500 rounded-full absolute right-0 bottom-0 border-white border-2"></div> */}
                                    </div>

                                    <div className="flex justify-center items-start flex-col w-full">
                                        <div className="flex justify-between items-center w-full">
                                            <h2 className='text-base font-semibold'>{c.name}</h2>
                                        </div>
                                        {/* <span className='text-xs font-normal'>2 min</span> */}
                                    </div>
                                </Link>
                            )
                        }
                    </div>
                </div>

                <div className="w-full md:w-[calc(100%-200px)] md:pl-4">
                    <div className="flex justify-between items-center">
                        {
                            customerId && <div className="flex justify-start items-center gap-3">
                                <div className="relative">
                                    <img className='w-[45px] h-[45px] border-green-500 border-2 max-w-[50px] p-[2px] rounded-full' src="/images/Ben_Ryan_0.jpg" alt="" />
                                    {
                                            activeSellers.some((a => a.customerId === currentCustomer.fdId)) && 
                                            <div className="w-[13px] h-[13px] bg-green-500 rounded-full absolute right-0 bottom-0 border-white border-2"></div>
                                        }
                                </div>
                                <h2 className='text-text_color text-base font-semibold'>{currentCustomer.name}</h2>
                            </div>
                        }
                          <div onClick={()=> setShow(!show)} className="w-[35px] flex md:hidden h-[35px] rounded-sm bg-accent shadow-md hover:shadow-accent/70 justify-center cursor-pointer items-center text-white">
                            <span><FaList /></span>
                        </div>
                    </div>
                    <div className="py-4">
                        <div className="bg-slate-800 h-[calc(100vh-310px)] rounded-md p-3 overflow-y-auto">

{
                                    customerId ? messages.map((m, i) => {
                                        console.log(m)
                                        if (m.senderId === customerId) {
                                            return (
                                                <div ref={scrollRef} key={i} className='w-full flex justify-start items-center'>
                                                    <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                                                        <div>
                                                            <img className='w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]' src="http://localhost:3001/images/admin.jpg" alt="" />
                                                        </div>
                                                        <div className="flex justify-center items-start flex-col w-full bg-[#334155] shadow-md shadow-[#334155]/50 text-white py-1 px-2 rounded-sm">
                                                            <span>{m.message}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div ref={scrollRef} key={i} className='w-full flex justify-end items-center'>
                                                    <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                                                        <div className="flex justify-center items-start flex-col w-full rounded-md bg-primaryDark/80 shadow-md shadow-[#334155]/50 text-white py-1 px-2 rounded-sm">
                                                            <span>{m.message}</span>
                                                        </div>
                                                        <div>
                                                            <img className='w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]' src="http://localhost:3001/images/admin.jpg" alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }) : <div className='w-full h-full flex justify-center items-center flex-col gap-2 text-white'>
                                        <span><BsEmojiSmile /></span>
                                        <span>Select Customer</span>
                                    </div>
                                }
                        </div>
                    </div>
                    <form onSubmit={send} action="" className='flex gap-3'>
                        <textarea  readOnly={customerId ? false : true} onChange={(e) => setText(e.target.value)} value={text} type="text" className='w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-accent rounded-md outline-none bg-transparent text-text_color' placeholder='Input your message'></textarea>
                            {/* <input type="text" className='w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-accent rounded-md outline-none bg-transparent text-text_color' placeholder='Input your message' /> */}
                        <button disabled={customerId ? false : true} className='bg-accent/85 shadow-sm hover:shadow-accent/90 text-semibold w-[75px] h-[35px] rounded-md text-white flex items-center justify-center'>Send</button>
                    </form>

                </div>
            </div>
        </div>
    </div>
  )
}

export default SellerToCustomer