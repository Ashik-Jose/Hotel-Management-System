import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:2000/" });

export default API;