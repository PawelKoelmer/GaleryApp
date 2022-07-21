import {combineReducers, configureStore} from '@reduxjs/toolkit';
import imagesReducer from './images';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {key: 'root', storage: AsyncStorage};

export const rootReducer = combineReducers({images: imagesReducer});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof rootReducer>;
export const persistor = persistStore(store);
