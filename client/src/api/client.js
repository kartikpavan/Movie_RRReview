import axios from "axios";

const client = axios.create({ baseURL: "https://movierrreview-production.up.railway.app/api" });

export default client;
