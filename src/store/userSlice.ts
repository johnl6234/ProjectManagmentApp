import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../types/user';
import type { RootState } from '.';

type UserState = {
	currentUser: User | null;
};

const initialState: UserState = {
	currentUser: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<User | null>) {
			state.currentUser = action.payload;
		},
	},
});

export const { setUser } = userSlice.actions;

export const selectCurrentUser = createSelector(
	(state: RootState) => state.user.currentUser,
	user => user
);
export const selectUserName = createSelector(
	(state: RootState) => state.user.currentUser,
	user => user?.name
);
export const selectUserAvatar = createSelector(
	(state: RootState) => state.user.currentUser,
	user => user?.avatarUrl
);
export default userSlice.reducer;
