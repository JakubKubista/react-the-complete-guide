export const logger = store => {
  return next => action => {
    console.log('[Middleware] Dispatching');
    console.log(action);
    const result = next(action);
    console.log('[Middleware] Next state');
    console.log(store.getState());
    return result;
  }
};