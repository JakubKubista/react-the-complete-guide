import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-guide-burger.firebaseio.com/'
});

export default instance;