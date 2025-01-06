import { configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

// const store = configureStore({
//     reducer:rootReducer})
// export default store;

const store = configureStore({
    reducer:rootReducer,
    preloadedState: undefined,
    devTools: true, 
     middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      })
  });
  export default store;