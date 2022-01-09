import axios from 'axios';
import ApiEndpoint from '../helpers/apiEndpoint';
import {API_URL} from '../helpers/constants';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export default axiosInstance;

export const fetchCharacters = (pageUrl?: string) =>
  axiosInstance
    .get(pageUrl || ApiEndpoint.People)
    .then(response => response.data);

export const fetchFilms = () =>
  axiosInstance.get(ApiEndpoint.Films).then(response => response.data.results);

export const fetchSpecies = () =>
  axiosInstance
    .get(ApiEndpoint.Species)
    .then(response => response.data.results);

export const fetchAllCharacters = (alreadyFetched = [], pageUrl?: string) => {
  return fetchCharacters(pageUrl).then(data => {
    const newFetched = alreadyFetched.concat(data.results);

    if (data.next) return fetchAllCharacters(newFetched, data.next);
    else return newFetched;
  });
};
