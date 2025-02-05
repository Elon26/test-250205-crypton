import { DataToSend } from "@/models/DataToSend";
import axios from "axios";

export default async function sendAuthData(dataToSend:DataToSend) {
  return axios.post('/login', dataToSend);
}