import axios from "axios";

const client = axios.create({ baseURL: "https://movie-rrreview.onrender.com/api" });

export default client;
