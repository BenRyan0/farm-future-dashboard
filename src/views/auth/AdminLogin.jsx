import React, { useEffect, useState } from 'react'
import {PropagateLoader} from 'react-spinners'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {admin_login, messageClear} from '../../store/Reducers/authReducer'

import toast from 'react-hot-toast'

const AdminLogin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loader, errorMessage , successMessage} = useSelector(state=>state.auth)
    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const submit = (e) => {
        e.preventDefault()
       dispatch(admin_login(state))

    }

    const overRideStyle = {
        display: 'flex',
        margin: '0',
        height: '24px',
        justifyContent : 'center',
        alignItems: 'center'
    }

    useEffect(()=>{
        if(errorMessage){
            toast.error(errorMessage.error);
            // dispatch(messageClear())
        }

        if(successMessage){
            toast.success(successMessage.message);
            // dispatch(messageClear())
            navigate('/')
            
           
        }
    }, [errorMessage, successMessage])
    return (
        <div className='min-w-screen min-h-screen bg-[#161d31] flex justify-center items-center'>
            <div className="w-[350px] text-[#d0d2d6] p-2">
                <div className="bg-transparent p-4 rounded-md">
                    <div className="h-[70px] flex justify-center flex-col items-center">
                        <div className="w-[180px] h-[50px">
                            <img className='w-full h-full' src="/images/FarmFuture_LOGO.png" alt="Logo" />
                        </div>
                        <h2 className='font-normal text-[13px]'>Welcome Back Admin!</h2>
                    </div>

                    <form onSubmit={submit}>
                        <div className="flex flex-col w-full gap-1 mb-3">
                            <label htmlFor="email" className='font-semibold'>Email</label>
                            <input onChange={inputHandle} value={state.email} className='px-3 py-2 outline-none border-2 border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-[#6ED601] overflow-hidden text-sm' type="email" name='email' placeholder='email' id='email' required />
                        </div>
                        <div className="flex flex-col w-full gap-1 mb-3">
                            <label htmlFor="password" className='semibold'>Password</label>
                            <input onChange={inputHandle} value={state.password} className='px-3 py-2 outline-none border-2 border-slate-700 bg-transparent rounded-md text-[#d0dyy2d6] focus:border-[#6ED601] overflow-hidden text-sm' type="password" name='password' placeholder='password' id='password' required />
                        </div>
                     
                        <button disabled={loader ? true : false} className='bg-[#05E04B]/60 w-full hover:shadow-[#6ED601]/10 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 font-bold'>
                            {
                                loader ? <PropagateLoader color='#fff'cssOverride = {overRideStyle}/> :'Login'
                            }
                        </button>
                      
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin