import React, { Suspense } from 'react'
import {useSelector} from 'react-redux'
import { Navigate } from 'react-router-dom'


const ProtectedRoutes = ({route,children}) => {
  const {role, userInfo} = useSelector(state=>state.auth)
  const data = useSelector(state=>state.auth)
  console.log(data)
if(role){
  if(userInfo){
    if(route.role){
      if(userInfo.role === route.role ){
        if(route.status){
            if(route.status === userInfo.status){
                return <Suspense fallback={null}>{children}</Suspense>
            }else{
              if(userInfo.status === 'pending'){
                return <Navigate to='/seller/account-pending' replace/>
              }else{
                return <Navigate to='/seller/account-deactivated' replace/>
              }
  
            }
        }else{
            if(route.visibility){
              if(route.visibility.some(r=>r === userInfo.status)){
                return <Suspense fallback={null}>{children}</Suspense>
              }else{
                return <Navigate to='/seller/account-pending' replace/>
              }
            }else{
              return <Suspense fallback={null}>{children}</Suspense>
            }
        }
      
      }else{
        return <Navigate to='/unauthorized-access' replace/>
      }
    }else{
      if(route.ability === 'seller'){
        return <Suspense fallback={null}>{children}</Suspense>
      }
    }
  }

} else{
  return <Navigate to='/login' replace/>
}
}

export default ProtectedRoutes