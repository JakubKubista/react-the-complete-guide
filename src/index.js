import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

// global error service handling

const intRequest = axios.interceptors.request.use(request => {
  console.log(request)
  // edit configuration (request element)
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

const intResponse = axios.interceptors.response.use(response => {
  return response;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

//Removing Interceptors
[intRequest, intResponse].forEach(el => axios.interceptors.request.eject(el));

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
