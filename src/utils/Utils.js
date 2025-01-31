import io from 'socket.io-client';

// export const socket = io('https://harvestify-api.onrender.com')
export const socket = io('http://localhost:5000')
export const overRideStyle = {
  display: "flex",
  margin: "0",
  height: "24px",
  justifyContent: "center",
  alignItems: "center",
  color : "red"
};


