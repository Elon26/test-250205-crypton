import axios from "axios";

export default async function getUserData(token: string) {
  return axios.get('/profile', {
    headers: {
      Authorization: token,
    },
  });
}