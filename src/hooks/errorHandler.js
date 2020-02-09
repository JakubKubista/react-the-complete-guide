import { useState, useEffect } from 'react';

export default httpsClient => {
  const [error, setError] = useState(null);

  const reqInterceptors = httpsClient.interceptors.request.use(request => {
    setError(null);
    return request;
  });

  const resInterceptors = httpsClient.interceptors.response.use(response =>
    response, resError => {
      setError(resError);
  });


  useEffect(() => {
    return () => {
      httpsClient.interceptors.request.eject(reqInterceptors);
      httpsClient.interceptors.response.eject(resInterceptors);
    };
  }, [httpsClient, reqInterceptors, resInterceptors])

  const errorConfirmedHandler = () => {
    setError(null);
  };

  const errorMessage = () => {
    let errorMessage = '';

    if (error.response.data.error.message) {
      errorMessage = error.response.data.error.message;
    } else if (error.response.data.error) {
      errorMessage = error.response.data.error;
    } else {
      errorMessage = error.message;
    }

    return errorMessage;
  };

  return [error, errorMessage, errorConfirmedHandler];
}