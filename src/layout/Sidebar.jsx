import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getNavs } from '../navigation/index'
import { allNav } from './../navigation/allNav';
import { BiLogInCircle } from 'react-icons/bi';
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../store/Reducers/authReducer'
import { IoMdExit } from "react-icons/io";
// import InstallPWAButton from './../Components/Pwa/InstallPWAButton ';

const Sidebar = ({showSidebar, setShowSidebar}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {role} = useSelector(state=>state.auth)
  const data = useSelector(state=>state.auth)
  const { pathname } = useLocation()
  const [allNav, setAllNav] = useState([])


  console.log(data)

  useEffect(() => {
    const navs = getNavs(role)
    setAllNav(navs)

  }, [role])


  return (
    <div>
      <div onClick={()=>{setShowSidebar(false)}} className={`fixed duration-200 ${!showSidebar ? 'invisible' : 'visible' } w-screen h-screen bg-[#22292f80] top-0 left-0 z-10`}></div>

      <div className={`w-[260px] fixed bg-[#283046] z-[99999999] top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${showSidebar ? 'left-0':'-left-[260px] lg:left-0'}`}>
        <div className="h-[70px] flex justify-center items-center">
          <Link to='/' className='w-[180px] h-[50px]'>
            <img className='h-full w-full' src="/images/FarmFuture_LOGO.png" alt="" />
          </Link>
        </div>
        <div className="px-[16px]">

          <ul>
            {
              allNav.map((n, i) => <li key={i}>
                <Link to={n.path} className={`${pathname === n.path ? 'bg-slate-600 shadow-indigo-500/30 text-white' : 'text-[#d0d2d6] font-normal duration-200'}  px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-3 hover:pl-4 transition-all w-full z-[999999999999]`}>
                  <span>{n.icon}</span>
                  <span>{n.title}</span>
                </Link>
              </li>)
            }

            
            <li>
              {/* <button className='text-[#d0d2d6] font-normal duration-200 px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-3 hover:pl-4 transition-all w-full'> */}
              <button onClick={()=>dispatch(logout({navigate,role }))} className='text-[#d0d2d6] font-normal duration-200 px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-3 hover:pl-4 transition-all w-full'>
                <span><IoMdExit /></span>
                <span>Logout</span>
              </button>          
            </li>
          </ul>

        </div>
        <div className="absolute bottom-2 right-0 left-0">
          <div className="w-full flex items-center justify-center text-slate-200">
            {/* <InstallPWAButton/> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar