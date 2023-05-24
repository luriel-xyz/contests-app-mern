import axios from "axios";
import { API_SERVER_URL } from "./public-config";

export const fetchContests = async () => {
  const { data } = await axios(`${API_SERVER_URL}/contests`);
  return data.contests;
};
