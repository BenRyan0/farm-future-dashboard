import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TbCurrencyPeso } from "react-icons/tb";
import { HiTemplate } from "react-icons/hi";
import { FaChartLine } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import {get_commodity_statistics } from '../../store/Reducers/dashboardIndexReducer';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye } from "react-icons/fa";
// import Chart from 'react-apexcharts';
import moment from 'moment/moment';
import '../../Components/css/style.css';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';


// import revenueData from "./data/revenueData.json";
import sourceData from "../Data/sourceData.json";

const CommodityStatistics = () => {
  const {id} = useParams()
  const {priceTrendChartData1, successMessage, errorMessage,adminChartData,loader, commodityChartData,commodityFluctuationData,years} = useSelector(state=>state.dashboardIndex,)
  const [state, setState] = useState({
    year: '',
    month: '',
    sortBy: '', 
    sortOrder: ''
  })

  const dispatch = useDispatch();
  // const xaxis1 = priceTrendChartData1.options.xaxis?.categories && priceTrendChartData1.options.xaxis.categories.length > 0
  // ? { categories: priceTrendChartData1.options.xaxis.categories }
  // : {};

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
  //   return date.toLocaleDateString(undefined, options);
  // };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    // Get the weekday (abbreviated), month (2 digits), day (2 digits), and year (4 digits)
    const weekday = date.toLocaleString('en-us', { weekday: 'short' });  // 'Thu'
    const month = String(date.getMonth() + 1).padStart(2, '0');  // '02'
    const day = String(date.getDate()).padStart(2, '0');  // '06'
    const year = date.getFullYear();  // '2025'
  
    return `${weekday}-${month}-${day}-${year}`;
  };

  
  // Utility function to calculate time difference

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(Math.floor(num));
  };

  useEffect(() => {
    const filters = { year: state.year, month: '', sortBy: '', sortOrder: '' };
    dispatch(get_commodity_statistics({id,filters}));
  }, [state]); // Add `id` as a dependency, or include other dependencies if needed
  
  
  // useEffect(() => {
  //   dispatch(get_commodity_statistics(id));
  // }, [id]);

  const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value

    })
}


useEffect(()=>{
  console.log(state)
})
  if (loader || !adminChartData) {
    return (
      <div className='w-full h-full bg-[#161D31] text-slate-200 text-center flex justify-center items-center'>
        <h2>Loading...</h2>
      </div>
    );
  }
  
  return (
    <div className="px-2 md:px-7 py-5">
      {/* Charts Section */}
      <div className="w-full flex flex-wrap mt-1">
        <div className="w-full ">
          <div className="w-full bg-[#283046] p-4 rounded-md">
            <h2 className='text-white'>Price Trends</h2>
            <div className="">
            <div className="flex justify-end items-center text-center gap-2">
              <h2>Year Filter</h2>
                 {
                  years && (
                    <select
                    id="year"
                    name="year"
                    onChange={inputHandle}
                    value={state.year}
                    className="bg-[#283046] text-center py-1 px-2 outline-none rounded-md text-[#d0d2d6] border-none w-[80px]"
                  >
                    <option value="">Year</option>
                    {years.map((y, i) => (
                      <option key={i} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                  )
                 }
                </div>

              </div>
          </div>
        </div>
        {/* <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
          <div className="w-full bg-[#283046] p-4 rounded-md">
            <div className="flex justify-between items-center">
              <h2 className='font-semibold text-lg text-[#d0d2d6]'>Market News</h2>
              <Link className='font-bold text-sm text-[#d0d2d6]'>View All</Link>
            </div>
            <div className="flex flex-col gap-2 pt-6 text-[#d0d2d6]">
              <ol className='relative border-0 border-slate-600 ml-4'>
                {marketNews.map((news, i) => (
                  <div key={i} className="p-3 bg-slate-800 border-2 border-slate-600 shadow-sm rounded-lg mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <Link to="#" className="text-md font-normal">
                        {news.title}
                      </Link>
                      <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                        {calculateTimeDifference(news.timestamp)}
                      </time>
                    </div>
                    <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                      Source: {news.source}
                    </div>
                  </div>
                ))}
              </ol>
            </div>
          </div>
        </div> */}

{/* {
  commodityChartData && (
    <div className='bg-[#283046] mt-3 w-full'
      style={{
        backgroundColor: "", // Set background to red
        padding: "20px", // Add padding to the container for better appearance
        borderRadius: "10px", // Add some border-radius for styling
      }}
    >
      <Chart
        type="line"
        data={{
          labels: commodityChartData.map((data) => data.label),
          datasets: [
            {
              label: "Price",
              data: commodityChartData.map((data) => data.value),
              backgroundColor: "rgb(40, 48, 70)", // Dataset background color
              borderRadius: 5,
              borderColor: "rgb(75, 192, 192)", // Line border color
              borderWidth: 2,
              pointBackgroundColor: "rgb(75, 192, 192)", // Point color
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Price Line Graph ",
              color: "white", // Change title text color
              font: {
                size: 18,
              },
            },
            legend: {
              labels: {
                color: "white", // Change legend text color
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: "white", // Change x-axis labels color
              },
              grid: {
                color: "rgba(255, 255, 255, 0.2)", // Change x-axis gridline color
              },
            },
            y: {
              ticks: {
                color: "white", // Change y-axis labels color
              },
              grid: {
                color: "rgba(255, 255, 255, 0.2)", // Change y-axis gridline color
              },
            },
          },
          maintainAspectRatio: false, // Allow responsive resizing
        }}
      />
    </div>
  )
} */}

{
  commodityChartData && (
    <div 
      className="bg-[#283046] mt-3 w-full"
      style={{
        backgroundColor: "", // Set background to red
        padding: "20px", // Add padding to the container for better appearance
        borderRadius: "10px", // Add some border-radius for styling
        width: "100%", // Ensure the container takes up full width
        height: "400px", // Set a specific height or use any desired height
      }}
    >
      <Chart
        type="line"
        data={{
          labels: commodityChartData.map((data) => data.label),
          datasets: [
            {
              label: "Price",
              data: commodityChartData.map((data) => data.value),
              backgroundColor: "rgb(40, 48, 70)", // Dataset background color
              borderRadius: 5,
              borderColor: "rgb(75, 192, 192)", // Line border color
              borderWidth: 2,
              pointBackgroundColor: "rgb(75, 192, 192)", // Point color
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Price Line Graph ",
              color: "white", // Change title text color
              font: {
                size: 18,
              },
            },
            legend: {
              labels: {
                color: "white", // Change legend text color
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: "white", // Change x-axis labels color
              },
              grid: {
                color: "rgba(255, 255, 255, 0.2)", // Change x-axis gridline color
              },
            },
            y: {
              ticks: {
                color: "white", // Change y-axis labels color
              },
              grid: {
                color: "rgba(255, 255, 255, 0.2)", // Change y-axis gridline color
              },
            },
          },
          maintainAspectRatio: false, // Allow responsive resizing
        }}
      />
    </div>
  )
}

      </div>

      {/* Commodity Comparison Chart */}
      <div className="w-full p-4 bg-[#283046] rounded-md mt-6">
        {/* <h2 className='text-white'>Commodity Price Comparison</h2> */}
        {/* {commodityComparisonChartData.series && (
          <Chart id="barchart" options={commodityComparisonChartData.options} series={commodityComparisonChartData.series} type='bar' height={350} />
        )} */}
      </div>

      {/* Recent Price Updates */}
      <div className="w-full p-4 bg-[#283046] rounded-md mt-6">
        <div className="flex justify-between items-center">
          <h2 className='font-semibold text-lg text-[#d0d2d6]'>Recent Price Updates</h2>
          <Link className='font-bold text-sm text-[#d0d2d6]'>View All</Link>
        </div>
        <div className="relative overflow-x-auto">
          <table className='w-full text-sm text-left text-[#d0d2d6]'>
            <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
              <tr>
                <th scope='col' className='py-3 px-4'>Commodity</th>
                <th scope='col' className='py-3 px-4'>Price (₱)</th>
                <th scope='col' className='py-3 px-4'>Change</th>
                <th scope='col' className='py-3 px-4'>Date</th>
              </tr>
            </thead>
            <tbody>
              {commodityFluctuationData.map((update, i) => (
                <tr key={i}>
                  <td className='py-3 px-4 font-medium whitespace-nowrap'>{update.commodity}</td>
                  <td className='py-3 px-4 font-medium whitespace-nowrap'><span className='pr-2 text-[#A5F17A]'>&#8369;</span>{update.price}/{update.unit}</td>
                  <td className={`py-3 px-4 font-medium whitespace-nowrap ${update.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{update.change}</td>
                  <td className='py-3 px-4 font-medium whitespace-nowrap'>{update.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommodityStatistics;