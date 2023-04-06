import { combineReducers, configureStore } from "@reduxjs/toolkit";
import viewedUserReducer from './viewedUserSlice';

const rootReducer = combineReducers({
  viewedUsers: viewedUserReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;