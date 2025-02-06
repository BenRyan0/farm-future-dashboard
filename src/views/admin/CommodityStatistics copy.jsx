import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TbCurrencyPeso } from "react-icons/tb";
import { HiTemplate } from "react-icons/hi";
import { FaChartLine } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import {get_commodity_statistics } from '../../store/Reducers/dashboardIndexReducer';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye } from "react-icons/fa";
import Chart from 'react-apexcharts';
import moment from 'moment/moment';
import '../../Components/css/style.css';
import '../../Components/css/style.css';

const CommodityStatistics = () => {
  const {id} = useParams()
  const {priceTrendChartData1, successMessage, errorMessage,adminChartData,loader} = useSelector(state=>state.dashboardIndex)

  const dispatch = useDispatch();
  // const xaxis1 = priceTrendChartData1.options.xaxis?.categories && priceTrendChartData1.options.xaxis.categories.length > 0
  // ? { categories: priceTrendChartData1.options.xaxis.categories }
  // : {};



  const charState = {
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
        categories: adminChartData?.options?.xaxis?.categories || [] // safely accessing and defaulting to an empty array if undefined
      },
      legend: {
        position: 'top',
      },
      yaxis: {
        labels: {
          formatter: (value) => Math.round(value),
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
  
  // Utility function to calculate time difference

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(Math.floor(num));
  };

  useEffect(() => {
    dispatch(get_commodity_statistics(id));
  }, []);
  
  useEffect(() => {
    dispatch(get_commodity_statistics(id));
  }, [id]);

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
        <div className="w-full  lg:pr-3">
          <div className="w-full bg-[#283046] p-4 rounded-md">
            <h2 className='text-white'>Price Trends</h2>
            {adminChartData && (
                <Chart
                  id="barchart"
                  options={charState.options}
                  series={adminChartData.series}
                  type="area" height={350}
                />
              )}

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
      </div>

      {/* Commodity Comparison Chart */}
      <div className="w-full p-4 bg-[#283046] rounded-md mt-6">
        <h2 className='text-white'>Commodity Price Comparison</h2>
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
                <th scope='col' className='py-3 px-4'>Updated</th>
              </tr>
            </thead>
            <tbody>
              {/* {recentPriceUpdates.map((update, i) => (
                <tr key={i}>
                  <td className='py-3 px-4 font-medium whitespace-nowrap'>{update.commodity}</td>
                  <td className='py-3 px-4 font-medium whitespace-nowrap'><span className='pr-2 text-[#A5F17A]'>&#8369;</span>{update.price}/{update.unit}</td>
                  <td className={`py-3 px-4 font-medium whitespace-nowrap ${update.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{update.change}</td>
                  <td className='py-3 px-4 font-medium whitespace-nowrap'>{calculateTimeDifference(update.updatedAt)}</td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommodityStatistics;