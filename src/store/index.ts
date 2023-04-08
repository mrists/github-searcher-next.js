import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from './UserSlice';
import viewedUserReducer from './viewedUserSlice';

const rootReducer = combineReducers({
  viewedUsers: viewedUserReducer,
  users: usersReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;