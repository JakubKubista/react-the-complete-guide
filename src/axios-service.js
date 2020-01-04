import axios from 'axios';
import { DATABASE } from './constants/urls';

const instance = axios.create({
  baseURL: DATABASE
});

export default instance;