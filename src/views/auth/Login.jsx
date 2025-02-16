import React, {useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineGooglePlus,AiFillGithub, AiFillTwitterSquare} from 'react-icons/ai'
import {FiFacebook} from 'react-icons/fi'
import {useDispatch, useSelector} from 'react-redux'
import {PropagateLoader} from 'react-spinners'
import { overRideStyle } from './../../utils/Utils';
import {messageClear, seller_register, seller_login} from '../../store/Reducers/authReducer'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu"
// import InstallPWAButton from './../../Components/Pwa/InstallPWAButton ';
// import LanguageDropdown from '../../src/Components/LanguageModule/LanguageDropdown';
// import LanguageDropdown from '../../../src/Components/LanguageModule/LanguageDropdown';
import { useLocation } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';



const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loader = false;
    const {errorMessage , successMessage} = useSelector(state=>state.auth)
    // const { loader, errorMessage , successMessage} = useSelector(state=>state.auth)

     const [showPassword, setShowPassword] = useState(false);


    const [state, setState] = useState({
        email: '',
        password : ''
    })
    
    const inputHandle = (e)=>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const submit = (e)=>{
        e.preventDefault()
        dispatch(seller_login(state))
    
    }

    useEffect(()=>{
        if(errorMessage){
            toast.error(errorMessage.error);
            dispatch(messageClear())
        }
    
        if(successMessage){
            toast.success(successMessage.message);
            dispatch(messageClear())    
            navigate('/')
           
        }
    }, [errorMessage, successMessage])
    // const {t} = useTranslation()

    
    
  return (
    <div className='min-w-screen min-h-screen bg-[#161d31] flex justify-center items-center relative'>
         {/* <div className="mx-4 absolute top-1 right-2 text-slate-100 group flex items-center justify-center gap-1 text-sm cursor-pointer before:absolute before:h-[18px] before:w-[1px] before:bg-[#afafaf] before:-left-[16px] after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]">
                      <LanguageDropdown/>
                </div> */}
        <div className="w-[350px] lg:w-[400px] text-[#d0d2d6] p-2">
            <div className="bg-[#283046] p-4 rounded-md">
                <h2 className='text-lg mb-1 text-center'>Welcome to <Link to={'/admin/login'} className='font-extrabold text-accent italic'>farmFuture</Link></h2>
                <p className='text-[10px] px-3 text-center'>Please sign in to your account</p>
                {/* <p className='text-[10px] px-3 text-center'>{t("signInPrompt")}</p> */}
                <form onSubmit={submit} className='py-4'>
                    <div className="flex flex-col w-full gap-1 mb-3">
                        <label htmlFor="email">Email</label>
                        <input onChange={inputHandle} value={state.email} className='px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-accent overflow-hidden' type="email" name='email' placeholder='email' id='email' required/>
                    </div>

                    <div className="relative">
                        <div className="flex flex-col w-full gap-1 mb-3">
                            <label htmlFor="password">Password</label>
                            <input onChange={inputHandle} value={state.password} className='px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-accent overflow-hidden'    type={showPassword ? "text" : "password"} name='password' placeholder='password' id='password' required/>
                        </div>

                          <button
                              type="button"
                               onClick={() => setShowPassword(!showPassword)}
                               className="ml-2 text-gray-200 hover:text-gray-100 pr-2 absolute right-2 top-6 bottom-0"
                          >
                            {showPassword ? <LuEye  size={19} /> : <LuEyeClosed size={16} />}
                            {/* {showPassword ? <LuEyeClosed  size={16} /> : <LuEye size={16} />} */}
                          </button>

                    </div>
                  
                    
                    {/* <div className="flex flex-col w-full gap-1 mb-3">
                        <label htmlFor="password">Password</label>
                        <input onChange={inputHandle} value={state.password} className='px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-accent overflow-hidden' type="password" name='password' placeholder='password' id='password' required/>
                    </div> */}
                   

                    <button disabled={loader ? true : false} className='bg-accent/50 w-full hover:shadow-[#6ED601]/10 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 font-bold mt-5'>
                                    {
                                        loader ? (
                                            <PropagateLoader color="#fff" cssOverride={overRideStyle} />
                                        ) : (
                                            "login"
                                        )
                                        }

                    </button>
                    <div className="flex flex-col text-center justify-center text-xs mt-2">
                        <p>No Account?</p>
                        <Link to='/register' className='font-semibold text-[10px]'>Fill up an application</Link>
                    </div>
                  
                </form>
            </div>
        </div>

        {/* <div className="absolute bottom-0 text-slate-300">
            <InstallPWAButton/>
        </div> */}
    </div>
  )
}

export default Login