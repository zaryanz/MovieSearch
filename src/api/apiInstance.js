import axios from 'axios';

export const apiInstance = axios.create({
  baseURL: 'http://omdbapi.com/',
});
