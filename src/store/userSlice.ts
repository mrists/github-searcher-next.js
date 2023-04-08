import { UserService } from '@/API/UserService';
import { IRepository, IUser } from '@/types/types';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userState } from './types';

export const fetchUsers = createAsyncThunk<IUser[], string, {}>(
  'users/fetchUsers',
  async function (userLogin: string, { rejectWithValue }) {
    try {
      const { data } = await UserService.getUsers(userLogin);

      const { items } = data;

      return items;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const fetchUserByID = createAsyncThunk<IUser, string, {}>(
  'users/fetchUserByID',
  async function (userID: string, { rejectWithValue }) {
    try {
      const { data } = await UserService.getUserByID(userID);

      return data;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const fetchRepositories = createAsyncThunk<IRepository[], string, {}>(
  'users/fetchRepositories',
  async function (userLogin: string, { rejectWithValue }) {
    try {
      const { data } = await UserService.getRepositories(userLogin);

      return data;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message)
    }
  }
)

const UserSlice = createSlice({
  name: 'users',
  initialState: {
    users: [] as IUser[],
    repositories: [] as IRepository[],
    fetched: false,
    error: null,
  },
  reducers: {
    setUsers(state: userState, action: PayloadAction<IUser[]>) {
      state.users = action.payload
    },
    setFetched(state: userState, action: PayloadAction<boolean>) {
      state.fetched = action.payload
    },
    setError(state: userState, action: PayloadAction<null>) {
      state.error = null
    }
  },
  extraReducers: {
    [`${fetchUsers.pending}`]: (state: userState) => {
      state.error = null;
    },
    [`${fetchUsers.fulfilled}`]: (state: userState, action: PayloadAction<IUser[]>) => {
      state.fetched = true;
      state.users = action.payload;
    },
    [`${fetchUsers.rejected}`]: (state: userState, action: PayloadAction<string>) => {
      state.users = [];
      state.fetched = false;
      state.error = action.payload;
    },
    [`${fetchUserByID.pending}`]: (state: userState) => {
      state.error = null;
    },
    [`${fetchUserByID.fulfilled}`]: (state: userState, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    [`${fetchUserByID.rejected}`]: (state: userState, action: PayloadAction<string>) => {
      state.users = [];
      state.error = action.payload;
    },
    [`${fetchRepositories.pending}`]: (state: userState) => {
      state.error = null;
    },
    [`${fetchRepositories.fulfilled}`]: (state: userState, action: PayloadAction<IRepository[]>) => {
      state.repositories = action.payload;
    },
    [`${fetchRepositories.rejected}`]: (state: userState, action: PayloadAction<string>) => {
      state.users = [];
      state.repositories = [];
      state.error = action.payload;
    },
  }
});

export const { setUsers, setFetched, setError } = UserSlice.actions;

export default UserSlice.reducer;
