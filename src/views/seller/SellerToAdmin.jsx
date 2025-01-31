import React, { useEffect, useRef, useState } from 'react'
import { IoIosClose } from "react-icons/io";
import { FaList } from "react-icons/fa6";
import {get_sellers,send_message_seller_admin,get_admin_message, get_seller_message, updateAdminMessage, messageClear} from '../../store/Reducers/chatReducer'
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../utils/Utils';

const SellerToAdmin = () => {
    const scrollRef = useRef()
    const dispatch = useDispatch()
    const {sellers,activeSellers,seller_admin_message, currentSeller, successMessage, activeAdmin} = useSelector(state=>state.chat);
    const [text, setText] = useState('')

    const {userInfo} = useSelector(state=> state.auth)

    useEffect(()=>{
        dispatch(get_seller_message())
    },[])



    const send = (e) => {
        e.preventDefault()
        dispatch(send_message_seller_admin({
            senderId: userInfo._id,
            receiverId: '',
            message: text,
            senderName: userInfo.firstName + " " + userInfo.lastName
        }))
        setText('')
    }

    useEffect(()=>{
        socket.on('received_admin_message', msg =>{
            dispatch(updateAdminMessage(msg))
        })
    },[])
    useEffect(()=>{
        if(successMessage){
            socket.emit('send_message_seller_to_admin', seller_admin_message[seller_admin_message.length - 1])
            dispatch(messageClear())
        }

    },[successMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [seller_admin_message])
  return (
    <div className='px-2 lg:px-7 py-5'>
        <div className="w-full bg-[#283046] px-4 py-4 rounded-md h-[calc(100vh-140px)]">
            <div className="flex w-full h-full relative">
                <div className="w-full md:pl-4">
                    <div className="flex justify-between items-center">
                        <div className="flex justify-start items-center gap-3">
                                <div className="relative">
                                    <img className={`w-[45px] h-[45px] border-green-500 border-2 max-w-[50px] p-[2px] rounded-full ${
                                        activeAdmin ? "border-green-500 border-2" : "border-gray-500 border-2"
                                        }`} src="/images/Ben_Ryan_0.jpg" alt="" />
                                    {
                                        activeAdmin && <div className="w-[13px] h-[13px] bg-green-500 rounded-full absolute right-0 bottom-0 border-white border-2"></div>

                                    }
                                </div>
                                <h2 className='text-base text-white font-semibold'>Support</h2>
                        </div>
                    </div>
                    <div className="py-4">
                        <div className="bg-slate-800 h-[calc(100vh-310px)] rounded-md p-3 overflow-y-auto">
                            {
                                seller_admin_message.map((m,i) =>{
                                    if(userInfo._id !== m.senderId){
                                        
                                        return (
                                            <div ref={scrollRef} key={i} className="w-full flex justify-start items-center">
                                                <div className="flex justify-start items-end gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                                                    <div className="flex justify-center items-start flex-col w-full bg-[#334155] shadow-md shadow-[#334155]/50 text-white py-1 px-2 rounded-sm">
                                                     <span>{m.message}</span>
                                                    </div>
                                                    <div className="">
                                                        <img className='w-[38px] h-[38px] border-2 border-white rounded-full max-w-[36px] p-[3px]' src="/images/Ben_Ryan_0.jpg" alt="" />
                                                    </div>
                                                </div>
                                            </div> 
                                            
                                        )
                                    }else{
                                        return(
                                            <div ref={scrollRef}  key={i} className="w-full flex justify-end items-center">
                                            <div className="flex justify-start items-end gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                                                <div className="flex justify-center items-start flex-col w-full bg-[#334155] shadow-md shadow-[#334155]/50 text-white py-1 px-2 rounded-sm">
                                                     <span>{m.message}</span>
                                                </div>
                                                <div className="">
                                                    <img className='w-[38px] h-[38px] border-2 border-white rounded-full max-w-[36px] p-[3px]' src="/images/Ben_Ryan_0.jpg" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                               

                                        )
                                    }
                                })
                            }
                            

                            {/* <div className="w-full flex justify-end items-center">
                                <div className="flex justify-start items-end gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                                    <div className="flex justify-center items-start flex-col w-full bg-[#334155] shadow-md shadow-[#334155]/50 text-white py-1 px-2 rounded-sm">
                                        <span>Howdy!</span>
                                    </div>
                                    <div className="">
                                        <img className='w-[38px] h-[38px] border-2 border-white rounded-full max-w-[36px] p-[3px]' src="/images/Ben_Ryan_0.jpg" alt="" />
                                    </div>
                                </div>
                            </div> */}

                            
                        </div>
                    </div>
                    <form onSubmit={send} className='flex gap-3'>
                        <textarea required value={text} onChange={(e) => setText(e.target.value)}  type="text" className='w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-accent rounded-md outline-none bg-transparent text-text_color' placeholder='Input your message'></textarea>
                            {/* <input type="text" className='w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-accent rounded-md outline-none bg-transparent text-text_color' placeholder='Input your message' /> */}
                        <button className='bg-accent/85 shadow-sm hover:shadow-accent/90 text-semibold w-[75px] h-[35px] rounded-md text-white flex items-center justify-center'>Send</button>
                    </form>

                </div>
            </div>
        </div>
    </div>
  )
}

export default SellerToAdmin