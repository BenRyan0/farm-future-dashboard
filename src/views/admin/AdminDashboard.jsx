import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TbCurrencyPeso } from "react-icons/tb";
import { HiTemplate } from "react-icons/hi";
import { FaChartLine } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { get_admin_dashboard_index_data } from '../../store/Reducers/dashboardIndexReducer';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye } from "react-icons/fa";
import Chart from 'react-apexcharts';
import moment from 'moment/moment';
import '../../Components/css/style.css';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const errorMessage = ""
  const successMessage = ""
  const {
    averagePrice,
    priceChange,
    totalCommodities,
    marketVolume,
    recentPriceUpdates,
    marketNews,
    loader,
    priceTrendChartData,
    commodityComparisonChartData
  } = {
    averagePrice: 50, // Average price per kg in ₱
    priceChange: 2.5, // Price change percentage
    totalCommodities: 10, // Total number of commodities being monitored
    marketVolume: 100000, // Total market volume in kg

    recentPriceUpdates: [
      {
        _id: 1,
        commodity: "Rice",
        price: 55,
        unit: "kg",
        change: "+2%",
        updatedAt: "2023-10-01T10:00:00Z"
      },
      {
        _id: 2,
        commodity: "Corn",
        price: 30,
        unit: "kg",
        change: "-1%",
        updatedAt: "2023-10-02T11:30:00Z"
      },
      {
        _id: 3,
        commodity: "Tomatoes",
        price: 25,
        unit: "kg",
        change: "+3%",
        updatedAt: "2023-10-03T09:15:00Z"
      }
    ],

    marketNews: [
      {
        id: 1,
        title: "Rice prices surge due to high demand",
        source: "Philippine Daily Inquirer",
        timestamp: "2023-10-01T10:00:00Z"
      },
      {
        id: 2,
        title: "Corn harvest expected to increase by 10%",
        source: "BusinessWorld",
        timestamp: "2023-10-02T11:30:00Z"
      },
      {
        id: 3,
        title: "Tomato prices drop as supply stabilizes",
        source: "Manila Bulletin",
        timestamp: "2023-10-03T09:15:00Z"
      }
    ],

    errorMessage: "Failed to load data. Please try again later.",
    successMessage: "Data loaded successfully!",
    loader: false, // Indicates if the data is still loading

    priceTrendChartData: {
      series: [
        {
          name: "Rice Price",
          data: [50, 52, 55, 53, 56, 58, 60]
        },
        {
          name: "Corn Price",
          data: [30, 31, 32, 31, 33, 34, 35]
        }
      ],
      options: {
        chart: {
          type: 'line',
          height: 350,
          toolbar: {
            show: false
          }
        },
        theme: {
          mode: 'dark', 
          palette: 'palette1', 
          monochrome: {
              enabled: false,
              color: '#283046',
              shadeTo: 'dark',
              shadeIntensity: 0.65
          }
        },
        colors: ['#28c76f', '#DE9D1F'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return "₱" + val.toLocaleString();
            }
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "₱" + val.toLocaleString();
            }
          }
        }
      }
    },

    commodityComparisonChartData: {
      series: [
        {
          name: "Price (₱)",
          data: [55, 30, 25, 40, 35, 50, 45]
        }
      ],
      options: {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false
          }
        },
        colors: ['#28c76f'],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          }
        },
        theme: {
          mode: 'dark', 
          palette: 'palette5', 
          monochrome: {
              enabled: false,
              color: '#255aee',
              shadeTo: 'light',
              shadeIntensity: 0.65
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ["Rice", "Corn", "Tomatoes", "Eggplant", "Potatoes", "Onions", "Garlic"]
        },
        yaxis: {
          title: {
            text: "Price (₱)"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "₱" + val.toLocaleString();
            }
          }
        }
      }
    }
  };

  // Utility function to calculate time difference
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

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(Math.floor(num));
  };

  useEffect(() => {
    dispatch(get_admin_dashboard_index_data());
  }, [dispatch]);

  if (loader) {
    return (
      <div className='w-full h-full bg-[#161D31] text-slate-200 text-center flex justify-center items-center'>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="px-2 md:px-7 py-5">
      {/* Metrics Section */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className='text-3xl font-bold'><span>&#8369;</span> {formatNumber(averagePrice)} </h2>
            <span className='text-md font-medium'>Average Price</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-3xl">
            <TbCurrencyPeso className='text-[#28c76f] shadow-lg' />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className='text-3xl font-bold'>{priceChange}%</h2>
            <span className='text-md font-medium'>Price Change</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-3xl">
            <FaChartLine className='text-[#28c76f] shadow-lg' />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className='text-3xl font-bold'>{totalCommodities}</h2>
            <span className='text-md font-medium'>Commodities</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-3xl">
            <HiTemplate className='text-[#28c76f] shadow-lg' />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className='text-3xl font-bold'>{formatNumber(marketVolume)}</h2>
            <span className='text-md font-medium'>Market Volume (kg)</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-3xl">
            <FaHandshake className='text-[#28c76f] shadow-lg' />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="w-full flex flex-wrap mt-7">
        <div className="w-full lg:w-7/12 lg:pr-3">
          <div className="w-full bg-[#283046] p-4 rounded-md">
            <h2 className='text-white'>Price Trends</h2>
            {priceTrendChartData.series && (
              <Chart id="barchart" options={priceTrendChartData.options} series={priceTrendChartData.series} type='line' height={350} />
            )}
          </div>
        </div>
        <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
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
        </div>
      </div>

      {/* Commodity Comparison Chart */}
      <div className="w-full p-4 bg-[#283046] rounded-md mt-6">
        <h2 className='text-white'>Commodity Price Comparison</h2>
        {commodityComparisonChartData.series && (
          <Chart options={commodityComparisonChartData.options} series={commodityComparisonChartData.series} type='bar' height={350} />
        )}
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
              {recentPriceUpdates.map((update, i) => (
                <tr key={i}>
                  <td className='py-3 px-4 font-medium whitespace-nowrap'>{update.commodity}</td>
                  <td className='py-3 px-4 font-medium whitespace-nowrap'><span className='pr-2 text-[#A5F17A]'>&#8369;</span>{update.price}/{update.unit}</td>
                  <td className={`py-3 px-4 font-medium whitespace-nowrap ${update.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{update.change}</td>
                  <td className='py-3 px-4 font-medium whitespace-nowrap'>{calculateTimeDifference(update.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;