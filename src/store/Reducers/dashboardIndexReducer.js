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
        secondAdminChartData: []
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

    }

})
export const { messageClear } = dashboardIndexReducer.actions
export default dashboardIndexReducer.reducer