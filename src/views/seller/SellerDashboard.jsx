import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import { TbCurrencyPeso } from "react-icons/tb";
import { HiTemplate } from "react-icons/hi";
import { GiFarmer } from "react-icons/gi";
import { FaHandshake } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { PiHandCoinsFill } from "react-icons/pi";
import { FaHandHoldingDollar } from "react-icons/fa6";
import {get_seller_dashboard_index_data} from '../../store/Reducers/dashboardIndexReducer'
import { FaEye } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import '../../Components/css/style.css';
import Chart from 'react-apexcharts'
import { BiCategory } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';

const SellerDashboard = () => {
  const dispatch = useDispatch()
const { totalSale,
  totalOrder,
  totalProduct,
  totalPendingOrder,
  totalSeller,
  recentOrders,
  recentMessage,  errorMessage, successMessage, chartData , loader,secondChartData} = useSelector(state=>state.dashboardIndex)

const {userInfo } = useSelector(state=>state.auth)
const {t} = useTranslation()

const [data, setData] = useState()




  // dateUtils.js
const calculateTimeDifference = (createdAt) => {
  const now = new Date();
  const createdDate = new Date(createdAt);

  const diffInMilliseconds = now - createdDate;

  const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
};

// useEffect(() => {
//   if (secondChartData.series) {
//     console.log(secondChartData)
//     // setData(Math.max(...secondChartData.series[0].data))
//   }else{
//     setData(Math.max(0))
//   } 
  
// }, [secondChartData]);



const state = {
  series : [
    {
      name : "Offers",
      data : [6]
    },
    {
      name : "Offers",
      data : [6]
    },
    {
      name : "Offers",
      data : [6]
    },
  
  ], 
  options: {
    colors: ['#28C76F', '#DE9D1F'],
    plotOptions: {
      radius: 30
    },
    chart: {
      background: 'transparent',
      foreColor: '#d0d2d6'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      lineCap: 'butt',
      colors: '#f0f0f0',
      width: 0.5,
      dashArray: 0
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    legend: {
      position: 'top'
    },
    // yaxis: {
    //   tickAmount: 10, // Controls the number of ticks
    //   labels: {
    //     formatter: (value) => Math.round(value), // Rounds all values to whole numbers
    //   }
    // },
    theme: {
      mode: 'dark', 
      palette: 'palette5', 
      monochrome: {
          enabled: false,
          color: '#255aee',
          shadeTo: 'light',
          shadeIntensity: 0.65
      },
  },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: {
              horizontal: true
            }
          },
          chart: {
            height: '550px'
          }
        }
      }
    ]
  }
}
const state1 = {
  series: [
    {
      name: "Offers",
      data: [6],
    },
    {
      name: "Offers",
      data: [6],
    },
    {
      name: "Offers",
      data: [6],
    },
  ],
  options: {
    colors: ['#28C76F', '#DE9D1F'],
    plotOptions: {
      radius: 30,
    },
    chart: {
      background: 'transparent',
      foreColor: '#d0d2d6',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      lineCap: 'butt',
      colors: '#f0f0f0',
      width: 0.5,
      dashArray: 0,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    legend: {
      position: 'top',
    },
    yaxis: {
      tickAmount: 5, // Controls the number of ticks
      // max: Math.max(...[].concat(...secondChartData.series.data.map(s => s.data))), // Get the max value from all series data
      // tickAmount : data,

      labels: {
        formatter: (value) => Math.round(value), // Rounds all values to whole numbers
      },
    },
    theme: {
      mode: 'dark',
      palette: 'palette5',
      monochrome: {
        enabled: false,
        color: '#255aee',
        shadeTo: 'light',
        shadeIntensity: 0.65,
      },
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          chart: {
            height: '550px',
          },
        },
      },
    ],
  },
};

 
console.log(chartData.series)
console.log(state.series)
  
      useEffect(()=>{
        console.log("NGO")
        dispatch(get_seller_dashboard_index_data(userInfo._id))
      }, [])
      if (loader) {
        return <div>Loading...</div>  // Or display a spinner/loading component
      }
    
      return (
       <div className="px-2 md:px-7 py-5">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
            <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
                <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
                  <h2 className='text-3xl font-bold'>
                    <span className='pr-1'>&#8369;</span>{totalSale}</h2>
                  <span className='text-md font-medium'>{t("totalSales")}</span>
    
                </div>
                <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-3xl">
                  <TbCurrencyPeso className='text-[#28c76f] shadow-lg' />
                </div>
    
            </div>
            <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
                <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
                  <h2 className='text-3xl font-bold'>{totalProduct}</h2>
                  <span className='text-md font-medium'>{t("products")}</span>
    
                </div>
                <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-3xl">
                <HiTemplate className='text-[#28c76f] shadow-lg' />
                </div>
    
            </div>
            <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
                <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
                  <h2 className='text-3xl font-bold'>{totalOrder}</h2>
                  <span className='text-md font-medium'>{t("deals")}</span>
    
                </div>
                <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-3xl">
                <FaHandshake className='text-[#28c76f] shadow-lg' />
                </div>
    
            </div>
           
            <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
                <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
                  <h2 className='text-3xl font-bold'>{totalPendingOrder}</h2>
                  <span className='text-md font-medium'>{t("pendingDeals")}</span>
    
                </div>
                <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-3xl">
                <FaHandHoldingDollar className='text-[#28c76f] shadow-lg' />
                </div>
            </div>
          </div>
          <div className="w-full flex flex-wrap mt-7">
              <div className="w-full lg:w-7/12 lg:pr-3">
                <div className="w-full bg-white p-4 rounded-md  box ">
                <h2>Offers and Successful Deals</h2>
                {state.options && chartData.series && (
                    <Chart id="barchart" className="text-white" options={state.options} series={chartData.series} type="area" height={350} />
                  )}
         
                </div>
              </div>
              <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
                <div className="w-full bg-[#283046] p-4 rounded-md ">
                  <div className="flex justify-between items-center">
                    <h2 className='font-semibold text-lg text-[#d0d2d6]'>{t("recentTradersMessages")}</h2>
                    <Link className='font-bold text-sm text-[#d0d2d6]'>{t("viewAll")}</Link>
                  </div>
                  <div className="flex flex-col gap-2 pt-6 text-[#d0d2d6]">
                    <ol className='relative border-0 border-slate-600 ml-4'>

                    {/* 6733ab4bc35bb4cafcd215f7 */}
                      {
                      recentMessage
                        .filter((m) => m.senderId !== userInfo._id) // Exclude messages where senderId equals userInfo._id
                        .map((m, i) => (
                          <Link key={i} to={`/seller/dashboard/chat-customer/${m.senderId}`} className="mb-3">
                            <div className="p-3 bg-slate-800 border-2 border-slate-600 shadow-sm rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <Link to="#" className="text-md font-normal">
                                  {m.senderName}
                                </Link>
                                <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                                  {calculateTimeDifference(m.createdAt)}
                                </time>
                              </div>
                              <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                                {m.message}
                              </div>
                            </div>
                          </Link>
                        ))
                    }


                    </ol>
    
                  </div>
    
                </div>
              </div>
          </div>
          <div className="w-full p-4 bg-[#283046] rounded-md mt-6">
            <h2>Categories Sold Per Month</h2>
          {state.options && secondChartData.series && (
                    <Chart id="barchart" className="text-white" options={state1.options} series={secondChartData.series} type="bar" height={350} />
                  )}
                
          </div>
          <div className="w-full p-4 bg-[#283046] rounded-md mt-6">
             <div className="flex justify-between items-center">
                  <h2 className='font-semibold text-lg text-[#d0d2d6]'>{t("recentOffers")}</h2>
                  <Link className='font-bold text-sm text-[#d0d2d6]'>View All</Link>
              </div>  
              <div className="relative overflow-x-auto">
                  <table className='w-full text-sm text-left text-[#d0d2d6]'>
                    <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
                      <tr>
                        <th scope='col' className='py-3 px-4'>{t("productName")}</th>
                        <th scope='col' className='py-3 px-4'>{t("price")}</th>
                        <th scope='col' className='py-3 px-4'>{t("expectedYield")}</th>
                        <th scope='col' className='py-3 px-4'>{t("shippingMethod")}</th>
                        <th scope='col' className='py-3 px-4'>{t("status")}</th>
                        <th scope='col' className='py-3 px-4'>{t("action")}</th>
                        {/* <th scope='col' className='py-3 px-4'>{t("")}</th>
                        <th scope='col' className='py-3 px-4'>Price</th>
                        <th scope='col' className='py-3 px-4'>Exp Yield</th>
                        <th scope='col' className='py-3 px-4'>Shipping Method</th>
                        <th scope='col' className='py-3 px-4'>Status</th>
                        <th scope='col' className='py-3 px-4'>Action</th> */}
                      </tr>
    
                    </thead>
                    <tbody>
                    {
                      recentOrders.map((d,i)=> 
                    <tr key={i}>
                      <td className='py-3 px-4 font-medium whitespace-nowrap'>{d.listing[0].name}</td>
                      <td className='py-3 px-4 font-medium whitespace-nowrap'><span className='pr-2 text-[#A5F17A]'>&#8369;</span>{d.listing[0].price}/{d.listing[0].unit}</td>
                      <td className='py-3 px-4 font-medium whitespace-nowrap'><span className='pr-2 text-[#A5F17A]'>&#8369;</span>{d.listing[0].expectedHarvestYield}/{d.listing[0].yieldUnit}</td>
                      <td className='py-3 px-4 font-medium whitespace-nowrap'>{d.shippingMethod}</td>
                      <td className='py-3 px-4 font-medium whitespace-nowrap'>{d.shipPickUpStatus}</td>
                  
                      <td className='py-3 px-4 font-medium whitespace-nowrap '>
                           <Link to={`/seller/dashboard/deals/details/${d._id}`} className='p-2 w-[80px] bg-accent/40 rounded hover:shadow-md hover:shadow-accent/20 flex justify-center items-center gap-1'> View <FaEye size='15px'/></Link>
                      </td>
                    </tr>
                    ) }
                    </tbody>
    
                  </table>
               
    
              </div>
          </div>
       </div>
      )
}

export default SellerDashboard