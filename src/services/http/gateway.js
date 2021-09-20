import axios from "axios";

let baseUrl = 'https://6146ef3865467e00173849be.mockapi.io/api';

const axiosInstance = axios.create({
  timeout: 10000
});

const ApiGet = (resource, config) =>
  axiosInstance.get(`${baseUrl}/${resource}`, {
    ...config
  })
  .then(({ data }) => data)
  .catch(function (err) {
    throw err;
});

export {
  ApiGet
};
