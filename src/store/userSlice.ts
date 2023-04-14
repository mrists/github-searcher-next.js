import { UserService } from '@/API/UserService';
import { IRepository, IUser } from '@/types/types';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FetchUserDetailsReturnType, userState } from './types';

export const fetchUsers = createAsyncThunk<IUser[], string, { rejectValue: string }>(
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

export const fetchUserDetails = createAsyncThunk<FetchUserDetailsReturnType, string, { rejectValue: string }>(
  'users/fetchUserDetails',
  async function (userID: string, { rejectWithValue }) {
    try {
      const { data: user } = await UserService.getUserByID(userID);
      const { data: repositories } = await UserService.getRepositories(user.login);

      return { user, repositories };
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message)
    }
  }
)

const UserSlice = createSlice({
  name: 'users',
  initialState: {
    users: [] as IUser[],
    user: {} as IUser | null,
    repositories: [] as IRepository[],
    fetched: false,
    usersError: null,
    userDetailsError: null,
  },
  reducers: {
    setUsers(state, action: PayloadAction<IUser[]>) {
      state.users = action.payload
    },
    setFetched(state, action: PayloadAction<boolean>) {
      state.fetched = action.payload
    },
    setError(state, action: PayloadAction<null>) {
      state.usersError = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.usersError = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.fetched = true;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state: userState, action) => {
        state.users = [];
        state.fetched = false;
        state.usersError = action.payload;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.userDetailsError = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.repositories = action.payload.repositories;
      })
      .addCase(fetchUserDetails.rejected, (state: userState, action) => {
        state.user = null;
        state.repositories = [];
        state.userDetailsError = action.payload;
      })
  }
});

export const { setUsers, setFetched, setError } = UserSlice.actions;

export default UserSlice.reducer;
