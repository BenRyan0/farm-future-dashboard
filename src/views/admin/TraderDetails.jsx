import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { get_seller, seller_status_update, messageClear, get_trader,trader_status_update  } from '../../store/Reducers/sellerReducer'
import { Toaster } from 'react-hot-toast'



const TraderDetails = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {traderId} = useParams()
    const [status, setStatus] = useState('')
    const {seller, totalSellers, successMessage, errorMessage,trader} = useSelector(state=>state.seller)
    
    useEffect(()=>{
        dispatch(get_trader(traderId))
    }, [traderId])


    const submit = (e) => {
        e.preventDefault()
        dispatch(trader_status_update({
            traderId,
            status
        }))

        navigate('/admin/dashboard/traders')
    }
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }else{
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    }, [successMessage])

    useEffect(() => {
        if (seller) {
            setStatus(seller.status)
        }
    }, [seller])


    const [fullscreenImage, setFullscreenImage] = useState(null);

    const openFullscreen = (imageSrc) => {
      setFullscreenImage(imageSrc);
    };
  
    const closeFullscreen = () => {
      setFullscreenImage(null);
    };

    


  return (
    <div className='px-2 lg:px-7 pt-5'>
         <div className="w-full p-4 bg-[#283046] rounded-md">
            <div className="w-full flex flex-wrap text-text_color ">
                <div className="w-3/12 flex justify-center py-3">
                    <div className="">
                        <img className='w-full h-[230px] rounded-md object-cover' src={trader.profileImage} alt="" />
                    </div>
                </div>
                <div className="w-4/12">
                    <div className="px-0 md:px-5 py-2">
                        <div className="py-2 text-lg">
                            <h2>Basic Info</h2>
                        </div>

                        <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md ">
                            <div className="flex gap-2">
                                <span>Name: </span>
                                <span>{trader.firstName} {trader.middleName} {trader.lastName}</span>
                            </div>
                            <div className="flex gap-2 text-wrap  flex-col">
                                <span>Email: </span>
                                <span className='w-full text-wrap'>{trader.email}</span>
                            </div>
                            <div className="flex gap-2">
                                <span>Role: </span>
                                <span>{trader.role}</span>
                            </div>
                            <div className="flex gap-2">
                                <span>Status: </span>
                                <span className='font-semibold text-green-500'>{trader.status}</span>
                            </div>
                            <div className="flex gap-2">
                                <span>Payment Account: </span>
                                <span className='font-semibold text-green-500'>{trader.payment}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-5/12">
                    <div className="px-0 md:px-5 py-2">
                        <div className="py-2 text-lg">
                            <h2>Address:</h2>
                        </div>

                        <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md ">
                            <div className="flex gap-2">
                                <span>City: </span>
                                <span>City01 </span>
                            </div>
                            <div className="flex gap-2 ">
                                <span>Municipality:</span>
                                <span>{trader.associationloc_municipalitycity}</span>
                            </div>
                            <div className="flex gap-2">
                                <span>Barangay: </span>
                                <span>{trader.associationloc_barangay}</span>
                            </div>
                            <div className="flex gap-2">
                                <span>Street: </span>
                                <span>{trader.associationloc_street} </span>
                            </div>
                            <div className="flex gap-2">
                                <span>Province: </span>
                                <span>{trader.associationloc_province} </span>
                            </div>
                           
                        </div>
                    </div>
                </div>
                {/* <div className="w-full px-3 flex justify-between gap-2">
                    {
                        trader.credential_img01 && <div className="">
                            <img src={`${trader.credential_img01}`} alt="" />
                        </div>
                    }
                    {
                        trader.credential_img02 && <div className="">
                            <img src={`${trader.credential_img02}`} alt="" />
                        </div>
                    }
                    {
                        trader.credential_img03 && <div className="">
                            <img src={`${trader.credential_img03}`} alt="" />
                        </div>
                    }
                    
                </div> */}
                 <div className="w-full px-3 flex justify-between gap-2">
      {/* Fullscreen Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[999999999]"
          onClick={closeFullscreen}
        >
          <img
            src={fullscreenImage}
            alt="Fullscreen"
            className="max-w-full max-h-full cursor-pointer z-[999999]"
          />
        </div>
      )}

      {/* Thumbnails */}
      {trader.credential_img01 && (
        <div>
          <img
            src={trader.credential_img01}
            alt="Credential 1"
            className="cursor-pointer"
            onClick={() => openFullscreen(trader.credential_img01)}
          />
        </div>
      )}
      {trader.credential_img02 && (
        <div>
          <img
            src={trader.credential_img02}
            alt="Credential 2"
            className="cursor-pointer"
            onClick={() => openFullscreen(trader.credential_img02)}
          />
        </div>
      )}
      {trader.credential_img03 && (
        <div>
          <img
            src={trader.credential_img03}
            alt="Credential 3"
            className="cursor-pointer"
            onClick={() => openFullscreen(trader.credential_img03)}
          />
        </div>
      )}
    </div>
            </div>

            <div className="">
                <form action="" onSubmit={submit}>
                    <div className="flex gap-4 py-3">
                        <select value={status} onChange={(e) => setStatus(e.target.value)}  className='px-4 py-1 focus:border-accent outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' typeof='file' name="" id="">
                            <option value="">--select status</option>
                            <option value="active">ACTIVATE ACCOUNT</option>
                            <option value="deactive">REJECT OR DEACTIVATE ACCOUNT</option>
                            {/* <option value="deactive">REJEC</option> */}
                        </select>
                        <button className='bg-accent w-[300px] hover:shadow-accent/50 hover:shadow-md text-[#161D31] rounded-md px-7 py-2 font-semibold'>Submit</button>
                    </div>
                </form>
            </div>
         </div>
    </div>
  )
}

export default TraderDetails