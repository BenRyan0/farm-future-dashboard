import React, { forwardRef } from 'react'
import {FixedSizeList as List } from 'react-window'
function handleOnWheel({deltaY}){
    console.log(handleOnWheel, deltaY)
}

const outerElementType = forwardRef((props, ref) =>(
    <div ref={ref} onWheel={handleOnWheel} {...props}/>
))
const PaymentRequest = () => {
    const array = [1,2,3,4,5,6,7,8,9,111]

    const Row = ({index, style}) =>{
        return(
            <div style={style} className="flex text-sm">
                <div className='w-[10%] p-1 whitespace-nowrap'>{index + 1}</div>
                <div className='w-[25%] p-1 whitespace-nowrap'>
                    <span className='text-accent pr-1'>&#8369;</span>
                    1000
                </div>
                <div className='w-[25%] p-1 whitespace-nowrap'>
                    <span className='py-[1px] px-[1px] bg-slate-700 text-blue-500 rounded-md'>pending</span>
                </div>
                <div className='w-[25%] p-1 whitespace-nowrap'>09 jun 2024</div>
                <div className='w-[30%] p-1 whitespace-nowrap'>
                    <button className='bg-accent shadow-md hover:shadow-accent/50 cursor-pointer text-white rounded-sm text-sm py-1 px-2'>Confirm</button>
                </div>
            </div>
        )
    }
  return (
    <div className="px-2 lg:px-7 pt-5">
        <div className="w-full p-4 bg-[#283046] rounded-md text-text_color">
            <h2 className='text-xl font-medium pb-5 '>Withdraw Requests</h2>
            <div className="w-full">
                <div className="w-full overflow-x-auto">
                    <div className="flex bg-[#161d31] uppercase text-xs min-w-[340px]">
                        <div className="w-[10%] p-1">No</div>
                        <div className="w-[25%] p-1">Amount</div>
                        <div className="w-[25%] p-1">Status</div>
                        <div className="w-[25%] p-1">Date</div>
                        <div className="w-[30%] p-1">Action</div>
                    </div>
                    {
                        <List 
                        style={{minWidth : '340px', overflowX: 'hidden'}}
                        className='List'
                        height={350}
                        itemCount={10}
                        itemSize={35}
                        outerElementType={outerElementType}
                        >
                            {Row}
                        </List>             
                    }

                </div>

            </div>
        </div>
    </div>
  )
}

export default PaymentRequest