import React from 'react'
import {Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

const Home = () => {
  const {role, userInfo} = useSelector(state=>state.auth)
  const {r} = useSelector(state=>state.auth)
  const asd = useSelector(state=>state.auth.role)

  console.log(asd)
  console.log(role)


  if(role === 'admin') return <Navigate to='admin/dashboard' replace/>
  else if(role === 'seller') return <Navigate to='seller/dashboard' replace/>
  else return <Navigate to='/login' replace/>
}

export default Home