import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { MakeStore, createWrapper } from "next-redux-wrapper";
import usersReducer from './userSlice';
import viewedUserReducer from './viewedUserSlice';

const rootReducer = combineReducers({
  viewedUsers: viewedUserReducer,
  users: usersReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export type StoreType = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const makeStore: MakeStore<StoreType> = () => store;

export const wrapper = createWrapper<StoreType>(makeStore);

export default store;
