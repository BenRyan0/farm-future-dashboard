import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api';
import axios from "axios";
import { baseURL } from "../../utils/config";

// export const get_seller_dashboard_index_data = createAsyncThunk(
//     'dashboardIndex/get_seller_dashboard_index_data',
//     async (id , { rejectWithValue, fulfillWithValue, getState }) => {
//         console.log("NGIIIIIIIIIIIIII")
//         console.log(id)
//         const {token} = getState().auth
//         const config = {
//         headers : {
//             Authorization: `Bearer ${token}`
//         }
//         }

//         try {
//             const { data } = await axios.get(`${baseURL}/api/seller/get-dashboard-index-data/${id}`,config)
//             // const { data } = await axios.get(`${baseURL}/api/seller/get-dashboard-index-data`,id ,config)
//             // const { data } = await axios.get(`/seller/get-dashboard-index-data`,config)
//             console.log("__________________________ >")
//             console.log(data)
//             return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )

export const get_commodity_statistics = createAsyncThunk(
  'dashboardIndex/get-commodity-statistics',
  async ({ id, filters = {} }, { rejectWithValue, fulfillWithValue, getState }) => {
    // Destructure filters for sorting and date range, default to empty object if no filters
    const { year, month, sortBy, sortOrder } = filters;
    console.log("----------------->")
    console.log(filters)

    const { token } = getState().auth; // Get the token from the state
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header
      },
    };

    try {
      // Build the query string with filters if provided
      const queryParams = new URLSearchParams();

      if (year) queryParams.append('year', year);
      if (month) queryParams.append('month', month);
      if (sortBy) queryParams.append('sortBy', sortBy);
      if (sortOrder) queryParams.append('sortOrder', sortOrder);

      // Make the API call with the id and query parameters, if any
      const { data } = await axios.get(
        `${baseURL}/api/commodity-statistics/${id}${queryParams.toString() ? '?' + queryParams.toString() : ''}`,
        config
      );

      console.log(data)
      // Return the fetched data
      return fulfillWithValue(data);
    } catch (error) {
      // Handle any errors during the API request
      return rejectWithValue(error.response.data);
    }
  }
);
// export const get_commodity_statistics = createAsyncThunk(
//     'dashboardIndex/get-commodity-statistics',
//     async (id, { rejectWithValue, fulfillWithValue, getState }) => {
//       console.log("NGIIIIIIIIIIIIII");
//       console.log(id);
//       const { token } = getState().auth;
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
  
//       try {
//         const { data } = await axios.get(`${baseURL}/api/commodity-statistics/${id}`, config);
//         console.log("__________________________ >");
//         console.log(data);
//         return fulfillWithValue(data);
//       } catch (error) {
//         return rejectWithValue(error.response.data);
//       }
//     }
//   );
// export const get_commodity_statistics = createAsyncThunk(
//     'dashboardIndex/get-commodity-statistics',
//     async (id, { rejectWithValue, fulfillWithValue, getState }) => {
//       console.log("NGIIIIIIIIIIIIII");
//       console.log(id);
//       const { token } = getState().auth;
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
  
//       try {
//         const { data } = await axios.get(`${baseURL}/api/commodity-statistics/${id}`, config);
//         console.log("__________________________ >");
//         console.log(data);
//         return fulfillWithValue(data);
//       } catch (error) {
//         return rejectWithValue(error.response.data);
//       }
//     }
//   );


export const get_seller_dashboard_index_data = createAsyncThunk(
    'dashboardIndex/get_seller_dashboard_index_data',
    async (id, { rejectWithValue, fulfillWithValue, getState }) => {
      console.log("NGIIIIIIIIIIIIII");
      console.log(id);
      const { token } = getState().auth;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      try {
        const { data } = await axios.get(`${baseURL}/api/seller/get-dashboard-index-data/${id}`, config);
        console.log("__________________________ >");
        console.log(data);
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const get_admin_dashboard_index_data = createAsyncThunk(
    'dashboardIndex/get_admin_dashboard_index_data',
    async (_, { rejectWithValue, fulfillWithValue, getState }) => {
      const { token } = getState().auth;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      try {
        const { data } = await axios.get(`${baseURL}/api/admin/get-dashboard-index-data`, config);
        console.log("ADMIN DATA ---------------------------------")
        console.log(data);
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );


export const dashboardIndexReducer = createSlice({
    name: 'dashboardIndex',
    initialState: {
        loader : false,
        totalSale: 0,
        totalOrder: 0,
        totalProduct: 0,
        totalPendingOrder: 0,
        totalSeller: 0,
        recentOrders: [],
        recentMessage: [],
        chartData: [],
        secondChartData: [],
        adminChartData: [],
        secondAdminChartData: [],
        priceTrendChartData1: [],
        commodityChartData: [],
        commodityFluctuationData: [],
        years: [],
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: (builder)=> {

        // builder.addCase(get_seller_dashboard_index_data.fulfilled, (state, payload) => {
        //     state.totalSale = payload.payload.totalSales
        //     state.totalOrder = payload.payload.totalOrder
        //     state.totalProduct = payload.payload.totalProduct
        //     state.totalPendingOrder = payload.payload.totalPendingOrder
        //     state.recentOrders = payload.payload.recentOrders
        //     state.recentMessage = payload.payload.messages
        //   });
        builder.addCase(get_seller_dashboard_index_data.pending, (state, payload) => {
            state.loader = true
        })
        builder.addCase(get_seller_dashboard_index_data.rejected, (state, payload) => {
            state.loader = false
            state.errorMessage = payload.payload.error;
        })
        builder.addCase(get_seller_dashboard_index_data.fulfilled, (state, payload) => {
          // Check if payload and its data exist, otherwise fall back to default values
          const data = payload?.payload || {};
      
          state.totalSale = data.totalSales || 0;
          state.totalOrder = data.totalOrder || 0;
          state.totalProduct = data.totalProduct || 0;
          state.totalPendingOrder = data.totalPendingOrder || 0;
          state.recentOrders = data.recentOrders || [];
          state.recentMessage = data.messages || [];
      
          // Chart data check and fallback
          state.chartData = {
              series: [
                  {
                      name: "Offers",
                      data: data.chartData?.series?.[0]?.data || [],
                  },
                  {
                      name: "Successful Deals",
                      data: data.chartData?.series?.[1]?.data || [],
                  },
              ],
          };
      
          // state.secondChartData = {
          //     series: [
          //         {
          //             name: data.secondChartData?.[0]?.name || 'Default Name',
          //             data: data.secondChartData?.[0]?.data || [],
          //         },
          //     ],
          // };
          state.secondChartData = {
            series: data.secondChartData?.map(item => ({
              name: item.name || 'Default Name',
              data: item.data || [],
            })) || [],
          };
          
      
          state.loader = false;
      });
      
          
        //   totalOrder,
        //     totalSales,
        //     totalSeller,
        //     messages,
        //     recentOrders,
        //     totalProduct

        builder.addCase(get_admin_dashboard_index_data.pending, (state, payload) => {
            state.loader = true;
        })
        builder.addCase(get_admin_dashboard_index_data.rejected, (state, payload) => {
            state.loader = false;
        })
        builder.addCase(get_admin_dashboard_index_data.fulfilled, (state, payload) => {
            state.loader = false;
            const data = payload?.payload || {};
            state.totalSale = payload.payload.totalSales || 0;
            state.totalOrder = payload.payload.totalOrder || 0;
            state.totalSeller = payload.payload.totalSeller || 0;
            state.totalProduct = payload.payload.totalProduct || 0;
            // state.totalPendingOrder = payload.payload.totalPendingOrder;
            state.recentOrders = payload.payload.recentOrders || {};
            state.recentMessage = payload.payload.messages || {};
          
            // Fill the chart data
            state.adminChartData = {
              series: [
                {
                  name: "Offers",
                  data: payload.payload.chartData.series[0].data,
                },
                {
                  name: "Successful Deals",
                  data: payload.payload.chartData.series[1].data ,
                },
                // {
                //   name: "Revenue",
                //   data: payload.payload.chartData.series[2].data,
                // },
              ],
              
            };
            state.secondAdminChartData = {
              series: data.secondChartData?.map(item => ({
                name: item.name || 'Default Name',
                data: item.data || [],
              })) || [],
            };
          });



        builder.addCase(get_commodity_statistics.pending, (state, payload) => {
            state.loader = true;
        })
        builder.addCase(get_commodity_statistics.rejected, (state, payload) => {
            state.loader = false;
        })
        builder.addCase(get_commodity_statistics.fulfilled, (state, payload) => {
          state.loader = false;
          state.commodityChartData = payload.payload.chartData
          state.commodityFluctuationData = payload.payload.fluctuationData
          state.years = payload.payload.years
          
          
        });
        // builder.addCase(get_commodity_statistics.fulfilled, (state, payload) => {
        //   state.loader = false;
        //   const data = payload?.payload || {};
        //   state.averagePrice = data.averagePrice || 0;
        //   state.priceChange = data.priceChange || 0;
        //   state.totalCommodities = data.totalCommodities || 0;
        //   state.marketVolume = data.marketVolume || 0;
        //   state.recentPriceUpdates = data.recentPriceUpdates || [];
        //   state.marketNews = data.marketNews || [];
        //   state.errorMessage = data.errorMessage || "";
        //   state.successMessage = data.successMessage || "";
          
        //   // Fill the chart data
        //   state.priceTrendChartData1 = {
        //     series: data.priceTrendChartData?.series || [],
        //     options: data.priceTrendChartData?.options || {},
        //   }
        //   state.commodityComparisonChartData = {
        //     series: data.commodityComparisonChartData?.series || [],
        //     options: data.commodityComparisonChartData?.options || {},
        //   };
        // });
        

    }

})
export const { messageClear } = dashboardIndexReducer.actions
export default dashboardIndexReducer.reducer