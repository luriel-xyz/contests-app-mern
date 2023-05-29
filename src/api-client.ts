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
export const fetchContest = async (contestId: string): Promise<ContestType> => {
  const { data } = await axios(`${API_SERVER_URL}/contests/${contestId}`);
  return data.contest;
};

/**
 * Add New Name to Contest
 *
 * Makes an API request to add a new name to a specific contest on the server.
 *
 * @param {string} contestId - The ID of the contest to add the name to.
 * @param {string} newName - The new name to add to the contest.
 * @returns {Promise<ContestType>} - A promise that resolves to the updated contest data.
 */
export const addNewNameToContest = async (
  contestId: string,
  newName: string
): Promise<ContestType> => {
  const { data } = await axios.post(`${API_SERVER_URL}/contests/${contestId}`, {
    name: newName,
  });

  return data.updatedContest;
};

/**
 * Add New Contest
 *
 * Makes an API request to add a new contest to the server.
 *
 * @param {ContestType} contest - The contest data to add.
 * @returns {Promise<ContestType>} - A promise that resolves to the added contest data.
 */
export const addNewContest = async (
  contest: ContestType
): Promise<ContestType> => {
  const { data } = await axios.post(`${API_SERVER_URL}/contests`, contest);

  return data.contest;
};
