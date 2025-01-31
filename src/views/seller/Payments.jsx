import React, {forwardRef} from 'react'
import {Link} from 'react-router-dom';
import { TbCurrencyPeso } from "react-icons/tb";
import { HiTemplate } from "react-icons/hi";
import { GiFarmer } from "react-icons/gi";
import { FaHandshake } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { PiHandCoinsFill } from "react-icons/pi";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FixedSizeList as List } from 'react-window'


function handleOnWheel({ deltaY }) {
    console.log('handleOnWheel', deltaY)
}

const outerElementType = forwardRef((props, ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props} />
))

const Payments = () => {


    const Row = ({ index, style }) => {
        return (
            <div style={style} className='flex text-sm'>
                <div className='w-[25%] p-2 whitespace-nowrap'>{index + 1}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>#123123</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>
                    <span className='py-[1px] px-[5px] bg-slate-700 text-blue-500 rounded-md text-xs'>pending</span>
                </div>
                <div className='w-[25%] p-2 whitespace-nowrap'>12 jun 2023</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>
                    <button className=''></button>
                </div>
            </div>
        )
    }
  return (
    <div className='px-2 lg:px-7 pt-5'>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
            <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
                <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
                  <h2 className='text-3xl font-bold'>
                    <span className='pr-1'>&#8369;</span>1000</h2>
                  <span className='text-md font-medium'>Total Sales</span>
    
                </div>
                <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-3xl">
                  <TbCurrencyPeso className='text-[#28c76f] shadow-lg' />
                </div>
    
            </div>
            <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
                <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
                  <h2 className='text-3xl font-bold'>100</h2>
                  <span className='text-md font-medium'>Available Amount</span>
    
                </div>
                <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-3xl">
                <TbCurrencyPeso className='text-[#28c76f] shadow-lg' />
                </div>
    
            </div>
            <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
                <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
                  <h2 className='text-3xl font-bold'>50</h2>
                  <span className='text-md font-medium'>Withdrawal Amount</span>
    
                </div>
                <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-3xl">
                <TbCurrencyPeso className='text-[#28c76f] shadow-lg' />
                </div>
    
            </div>
           
            <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
                <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
                  <h2 className='text-3xl font-bold'>100</h2>
                  <span className='text-md font-medium'>Pending Amount</span>
    
                </div>
                <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-3xl">
                <TbCurrencyPeso className='text-[#28c76f] shadow-lg' />
                </div>
            </div>
          </div>
          {/* <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-3 pb-4'>
                <div className='bg-[#283046]  text-[#d0d2d6] rounded-md p-5'>
                    <h2 className='text-lg'>Send withdrawal Request</h2>
                    <div className='py-5'>
                        <form>
                            <div className='flex gap-3 flex-wrap'>
                                <input  required min='0' type="number" className='px-3 md:w-[79%] py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' name='amount' />
                                <button disabled={loader} className='bg-indigo-500 hover:shadow-indigo-500/50 hover:shadow-lg text-white rounded-sm px-4 py-2 text-sm '>{loader ? 'loading..' : 'Submit'}</button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <h2 className='text-lg pb-4'>Pending withdrawal request</h2>
                        <div className='w-full overflow-x-auto'>
                            <div className='flex bg-[#161d31] uppercase text-xs min-w-[340px]'>
                                <div className='w-[25%] p-2'>No</div>
                                <div className='w-[25%] p-2'>Amount</div>
                                <div className='w-[25%] p-2'>status</div>
                                <div className='w-[25%] p-2'>date</div>
                            </div>
                            {
                                <List
                                    style={{ minWidth: '340px', overflowX: 'hidden' }}
                                    className='List'
                                    height={350}
                                    itemCount={pendingWithdrows.length}
                                    itemSize={35}
                                    outerElementType={outerElementType}
                                >
                                    {Row}
                                </List>
                            }
                        </div>
                    </div>
                </div>
                <div className='bg-[#283046]  text-[#d0d2d6] rounded-md p-5'>
                    <div>
                        <h2 className='text-lg pb-4'>Success Withdrawal</h2>
                        <div className='w-full overflow-x-auto'>
                            <div className='flex bg-[#161d31] uppercase text-xs min-w-[340px]'>
                                <div className='w-[25%] p-2'>No</div>
                                <div className='w-[25%] p-2'>Amount</div>
                                <div className='w-[25%] p-2'>status</div>
                                <div className='w-[25%] p-2'>date</div>
                            </div>
                            {
                                <List
                                    style={{ minWidth: '340px', overflowX: 'hidden' }}
                                    className='List'
                                    height={350}
                                    itemCount={successWithdrows.length}
                                    itemSize={35}
                                    outerElementType={outerElementType}
                                >
                                    {Rows}
                                </List>
                            }
                        </div>
                    </div>
                </div>
            </div> */}
    </div>
  )
}

export default Payments