import { IUser } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { viewedUserState } from './types';

const viewedUserSlice = createSlice({
	name: 'viewedUsers',
	initialState: {
		viewedUsers: [] as IUser[],
	},
	reducers: {
		addViewedUser(state: viewedUserState, action: PayloadAction<IUser>) {
			if (!state.viewedUsers.some(user => user.id === action.payload.id)) {
				state.viewedUsers = [...state.viewedUsers, action.payload]
			}
		},
		removeViewedUser(state: viewedUserState, action: PayloadAction<number>) {
			state.viewedUsers = state.viewedUsers.filter(
				(user: IUser) => user.id !== action.payload
			);
		},
	},
});

export const { addViewedUser, removeViewedUser } = viewedUserSlice.actions;

export default viewedUserSlice.reducer;
