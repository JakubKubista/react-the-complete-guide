import axios from 'axios';

// Can be called as axios for a special components etc. with different url/headers etc.
const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN INSTANCE';

export default instance;