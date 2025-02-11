import { axios } from "./axios";

const ENDPOINT = "/content-page/home";

export async function getLanding() {
  const { data } = await axios.get(ENDPOINT);
  return data;
}
