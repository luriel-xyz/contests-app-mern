/**
 * API Client Module
 *
 * This module provides functions for making API requests to fetch contests and
 * individual contest data from the server using the Axios library. It uses the
 * API_SERVER_URL constant from the public-config module to construct the API URLs.
 */

import axios from "axios";
import { API_SERVER_URL } from "./public-config";
import { ContestType } from "./components/Contest";

/**
 * Fetch Contests
 *
 * Makes an API request to fetch all contests from the server.
 *
 * @returns {Promise<Array<ContestType>>} - A promise that resolves to the contests data.
 */
export const fetchContests = async (): Promise<Array<ContestType>> => {
  const { data } = await axios(`${API_SERVER_URL}/contests`);
  return data.contests;
};

/**
 * Fetch Contest
 *
 * Makes an API request to fetch a specific contest from the server.
 *
 * @param {string} contestId - The ID of the contest to fetch.
 * @returns {Promise<ContestType>} - A promise that resolves to the contest data.
 */
export const fetchContest = async (contestId): Promise<ContestType> => {
  const { data } = await axios(`${API_SERVER_URL}/contests/${contestId}`);
  return data.contest;
};

export const addNewNameToContest = async (
  contestId,
  newName
): Promise<ContestType> => {
  const { data } = await axios.post(`${API_SERVER_URL}/contests/${contestId}`, {
    name: newName,
  });

  return data.updatedContest;
};

export const addNewContest = async (contest): Promise<ContestType> => {
  const { data } = await axios.post(`${API_SERVER_URL}/contests`, contest);

  return data.contest;
};
