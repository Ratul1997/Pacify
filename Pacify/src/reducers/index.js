import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import {persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import signUpReducers from './signUpReducers';
import userReducers from './userReducers';
import callingReducer from './callingReducer';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

const allReducers = combineReducers({
  signUpReducers,
  userReducers,
  callingReducer,
});
export const pReducer = persistReducer(persistConfig, allReducers);
export const store = createStore(pReducer, applyMiddleware(thunk));
