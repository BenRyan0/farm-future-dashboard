import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { get_seller, seller_status_update, messageClear,  } from '../../store/Reducers/sellerReducer'
import { Toaster } from 'react-hot-toast'



const SellerDetails = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {sellerId} = useParams()
    const [status, setStatus] = useState('')
    const {seller, totalSellers, successMessage, errorMessage} = useSelector(state=>state.seller)
    
    useEffect(()=>{
        dispatch(get_seller(sellerId))
    }, [sellerId])


    const submit = (e) => {
        e.preventDefault()
        dispatch(seller_status_update({
            sellerId,
            status
        }))

        navigate('/admin/dashboard/sellers')
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
            <div className="w-full flex flex-wrap text-text_color flex-col lg:flex-row ">
                <div className="lg:w-3/12 flex justify-center py-3">
                    <div className="">
                        <img className='w-full h-[230px] rounded-md object-cover' src={seller.profileImage} alt="" />
                    </div>
                </div>
                <div className="lg:w-4/12">
                    <div className="px-0 md:px-5 py-2">
                        <div className="py-2 text-lg">
                            <h2>Basic Info</h2>
                        </div>

                        <div className="flex justify-between text-base flex-col gap-2 p-4 bg-slate-800 rounded-md ">
                            <div className="flex gap-2">
                                <span>Name: </span>
                                <span>{seller.firstName} {seller.middleName} {seller.lastName}</span>
                            </div>
                            <div className="flex gap-2 text-wrap  flex-col">
                                <span>Email: </span>
                                <span className='w-full text-wrap'>{seller.email}</span>
                            </div>
                            <div className="flex gap-2">
                                <span>Role: </span>
                                <span>{seller.role}</span>
                            </div>
                            <div className="flex gap-2">
                                <span>Status: </span>
                                <span
                                    className={`font-semibold ${
                                        seller.status === 'pending' ? 'text-orange-500' : 'text-green-500'
                                    }`}
                                    >
                                    {seller.status}
                                    </span>
                            </div>
                           
                        </div>
                    </div>
                </div>
                <div className="lg:w-5/12">
                    <div className="px-0 md:px-5 py-2">
                        <div className="py-2 text-lg">  
                            <h2>Business Details: </h2>
                        </div>

                        <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md ">
                            <div className="flex gap-2 text-lg border-b-2">
                                <span>Business Name: </span>
                                <span>{seller.associationName} </span>
                            </div>
                            <div className="flex flex-col gap-1 ">
                                <div className="flex gap-2 text-lg border-b-2">
                                    <span>Address: </span>
                                </div>
                                <div className="flex gap-2 ">
                                    <span>Municipality/City: </span>
                                    <span>{seller.associationloc_municipalitycity}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span>Barangay: </span>
                                    <span>{seller.associationloc_barangay}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span>Street: </span>
                                    <span>{seller.associationloc_street} </span>
                                </div>
                                <div className="flex gap-2">
                                    <span>Province: </span>
                                    <span>{seller.associationloc_province} </span>
                                </div>

                            </div>
                           
                           
                        </div>
                    </div>
                </div>
                <div className="">
                    <h2 className='font-bold text-lg'>Credentials: </h2>
                </div>
              
                <div className="w-full px-3 flex justify-between gap-2 mt-2">
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
                                {seller.validId_img && (
                                    <div className="text-center">
                                    <img
                                        src={seller.validId_img}
                                        alt="Credential 1"
                                        className="cursor-pointer"
                                        onClick={() => openFullscreen(seller.validId_img)}
                                    />
                                    <p className="mt-1 text-base text-slate-200 font-bold">Business Registration Certificate</p>
                                    </div>
                                )}
                                {seller.credential_img01 && (
                                    <div className="text-center">
                                    <img
                                        src={seller.credential_img01}
                                        alt="Credential 2"
                                        className="cursor-pointer"
                                        onClick={() => openFullscreen(seller.credential_img01)}
                                    />
                                    <p className="mt-1 text-base text-slate-200 font-bold">Business Permit</p>
                                    </div>
                                )}
                                {seller.credential_img02 && (
                                    <div className="text-center">
                                    <img
                                        src={seller.credential_img02}
                                        alt="Credential 3"
                                        className="cursor-pointer"
                                        onClick={() => openFullscreen(seller.credential_img02)}
                                    />
                                    <p className="mt-1 text-base text-slate-200 font-bold">Valid ID</p>
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

export default SellerDetails