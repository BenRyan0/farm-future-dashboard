import axios from "axios";
// const local = "http://192.168.254.105:5000";
const local = "http://localhost:5000";
const production1 = "https://harvestify-api.onrender.com";

let baseURL = ''
let mode = 'pro1'
// let mode = 'pro'


if(mode === 'pro'){
  baseURL = production1
}else{
  baseURL = local
}

export {baseURL};
