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
  axiosInstance.get(ApiEndpoint.Films).then(response => response.data);
