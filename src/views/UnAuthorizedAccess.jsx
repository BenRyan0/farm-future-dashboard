import React from 'react'


const UnAuthorizedAccess = () => {
  return (
    <div className='h-screen w-screen bg-slate-900'>
        <div className="w-full h-full flex justify-center gap-1 items-center flex-col text-text_color ">
            <h2 className='text-[100px] font-bold'>404</h2>
            <span className='text-xs'>Unauthorized Access</span>
        </div>
    </div>
  )
}

export default UnAuthorizedAccess