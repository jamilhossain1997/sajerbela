import axios from "axios";

const token = localStorage.getItem('token');
export default axios.create({
  baseURL: "https://admin.sajerbela.com/api/",
  // withCredentials: true,
  headers: {
    "Content-type": "application/json",
    'Access-Control-Allow-Credentials': false,
    "Access-Control-Allow-Origin": "*",
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    "Authorization": `Bearer ${token}`
  }
});