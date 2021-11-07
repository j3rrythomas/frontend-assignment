import { configureStore } from '@reduxjs/toolkit';
import { persistStore,persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import dataReducer from './dataSlice';

const persistDataConfig = {
  key: "data",
  storage,
};
const persistedDataReducer = persistReducer(persistDataConfig,dataReducer);

export const store = configureStore({
  reducer: {
      data:persistedDataReducer
  },
});

export let persistor = persistStore(store);