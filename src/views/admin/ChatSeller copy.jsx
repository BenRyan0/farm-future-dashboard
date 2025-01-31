import React, { useEffect, useRef, useState } from 'react'
import { IoIosClose } from "react-icons/io";
import { FaList } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import {get_sellers, send_message_seller_admin,get_admin_message, messageClear, updateAdminMessage, updateSellerMessage} from '../../store/Reducers/chatReducer'
import { socket } from './../../utils/Utils';
import { Link, useParams } from 'react-router-dom';
import { BsEmojiSmile } from 'react-icons/bs'
import toast, { Toaster } from 'react-hot-toast';
// import {socket} from '../../utils/Utils'




const ChatSeller = () => {
    const scrollRef = useRef()
    const dispatch= useDispatch()
    const {sellers,activeSellers,seller_admin_message, currentSeller, successMessage} = useSelector(state=>state.chat)
    const [text, setText] = useState('')
    const [show,setShow] = useState(false)
    const {sellerId} = useParams()
    const [receivedMessage,setReceivedMessage]= useState('')



    useEffect(()=>{
        dispatch(get_sellers())
    },[])
 

    const send = (e) => {
        e.preventDefault()
        dispatch(send_message_seller_admin({
            senderId: '',
            receiverId: sellerId,
            message: text,
            senderName: 'Myshop support'
        }))
        setText('')
    }

    useEffect(()=>{
        if(sellerId){
            dispatch(get_admin_message(sellerId))
        }

    },[sellerId])

    useEffect(()=>{
        if(successMessage){
            socket.emit('send_message_admin_to_seller', seller_admin_message[seller_admin_message.length - 1])
            dispatch(messageClear())
        }

    },[successMessage])

    useEffect(()=>{
        socket.on('received_seller_message', msg =>{
            setReceivedMessage(msg)
        })
    },[])

    useEffect(()=>{
        if(receivedMessage){
            if(receivedMessage.senderId === sellerId && receivedMessage.receiverId === ''){
                dispatch(updateSellerMessage(receivedMessage))
            }else {
                toast.success(receivedMessage.senderName + ' sent a message')
            }
        }
    },[receivedMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [seller_admin_message])

  return (
    <div className='px-2 lg:px-7 py-5'>
        <div className="w-full bg-[#283046] px-4 py-4 rounded-md h-[calc(100vh-140px)]">
            <div className="flex w-full h-full relative">
                <div className={`w-[280px] h-full absolute z-10 ${show ? '-left-[16px]':'-left-[336px]'} md:left-0 md:relative transition-all`}>
                    <div className="w-full h-[calc(100vh-177px)] bg-[#252b3b] md:bg-transparent overflow-y-auto rounded-lg p-2">
                        <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-text_color">
                            <h2>Sellers</h2>
                            <span onClick={() => setShow(!show)} className='block cursor-pointer md:hidden'><IoIosClose /></span>
                        </div>

                        {
                            sellers.map((s,i)=>
                                <Link key={i} to={`/admin/dashboard/chat-sellers/${s._id}`} className={`h-[60px] flex justify-start gap-2 mt-1 items-center text-text_color px-2 py-2 cursor-pointer bg-slate-700 ${sellerId === s._id ? 'border-primary border-r-4' : ''}`}>
                                    <div className="relative">
                                        <img className='w-[45px] h-[45px] border-white border-2 max-w-[50px] p-[2px] rounded-full' src={s.profileImage} alt="" />
                                        {
                                            activeSellers.some(a=>a.sellerId === s._id) && 
                                            <div className="w-[13px] h-[13px] bg-green-500 rounded-full absolute right-0 bottom-0 border-white border-2"></div>
                                        }
                                       
                                    </div>

                                    <div className="flex justify-center items-start flex-col w-full">
                                        <div className="flex justify-between items-center w-full">
                                            <h2 className='text-base font-semibold'>{s.firstName} {s.lastName}</h2>
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
                            sellerId && <div className="flex justify-start items-center gap-3">
                                <div className="relative">
                                    <img className='w-[45px] h-[45px] border-green-500 border-2 max-w-[50px] p-[2px] rounded-full' src="/images/Ben_Ryan_0.jpg" alt="" />
                                    <div className="w-[13px] h-[13px] bg-green-500 rounded-full absolute right-0 bottom-0 border-white border-2"></div>
                                </div>
                                <div className="flex flex-col text-slate-300">
                                     <span className=' -mb-1 border-b'>{currentSeller?.firstName} {currentSeller?.lastName}</span>
                                     <span>{currentSeller?.role}</span>
                                </div>
                               
                            </div>
                        }
                          <div onClick={()=> setShow(!show)} className="w-[35px] flex md:hidden h-[35px] rounded-sm bg-accent shadow-md hover:shadow-accent/70 justify-center cursor-pointer items-center text-white">
                            <span><FaList /></span>
                        </div>
                    </div>
                    <div className="py-4">
                        <div className="bg-slate-800 h-[calc(100vh-310px)] rounded-md p-3 overflow-y-auto">


                        {
                                    sellerId ? seller_admin_message.map((m, i) => {
                                        if (m.senderId === sellerId) {
                                            return (
                                                <div ref={scrollRef} className='w-full flex justify-start items-center'>
                                                    <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                                                        <div>
                                                            {/* <img className='w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]' src={currentSeller?.image ? currentSeller?.image : sellerImage} alt="" /> */}
                                                        </div>
                                                        <div className='flex justify-center items-start flex-col w-full bg-slate-500 shadow-lg text-white py-1 px-4 rounded-sm'>
                                                            <span>{m.message}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div ref={scrollRef} className='w-full flex justify-end items-center'>
                                                    <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                                                        <div className='flex justify-center items-start flex-col w-full bg-primary shadow-lg text-white py-1 px-4 rounded-sm'>
                                                            <span>{m.message}</span>
                                                        </div>
                                                        <div>
                                                            {/* <img className='w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]' src={userInfo.image ? userInfo.image : adminImage} alt="" /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }) : <div className='w-full h-full flex justify-center items-center flex-col gap-2 text-white'>
                                        <span><BsEmojiSmile /></span>
                                        <span>Select seller</span>
                                    </div>
                                }
                        
                        </div>
                    </div>
                    <form onSubmit={send} className='flex gap-3'>
                        <textarea required value={text} onChange={(e) => setText(e.target.value)} readOnly={sellerId ? false : true}  type="text" className='w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-accent rounded-md outline-none bg-transparent text-text_color' placeholder='Input your message'></textarea>
                            {/* <input type="text" className='w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-accent rounded-md outline-none bg-transparent text-text_color' placeholder='Input your message' /> */}
                        <button  disabled={sellerId ? false : true} className='bg-accent/85 shadow-sm hover:shadow-accent/90 text-semibold w-[75px] h-[35px] rounded-md text-white flex items-center justify-center'>Send</button>
                    </form>

                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatSeller