import { getLSItem } from "@/utils/localStorageHelper";
import axios from "axios";

export default async function getQueryUserData() {
  const token = getLSItem("crypton-test-token")

  if (!token) return null;

  return axios.get('/profile', {
    headers: {
      Authorization: token,
    },
  });
}