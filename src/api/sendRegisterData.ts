import { DataToSend } from "@/models/DataToSend";
import axios from "axios";

export default async function sendRegisterData(dataToSend:DataToSend) {
  return axios.post('/register', dataToSend);
}