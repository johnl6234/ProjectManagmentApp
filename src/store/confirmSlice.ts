import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ConfirmState = {
	isOpen: boolean;
	message: string;
	actionId: string | null;
};

const initialState: ConfirmState = {
	isOpen: false,
	message: '',
	actionId: null,
};

const confirmationSlice = createSlice({
	name: 'confirmation',
	initialState,
	reducers: {
		openConfirm(state, action: PayloadAction<{ message: string; actionId: string }>) {
			state.isOpen = true;
			state.message = action.payload.message;
			state.actionId = action.payload.actionId;
		},
		closeConfirm(state) {
			state.isOpen = false;
			state.message = '';
			state.actionId = null;
		},
	},
});

export const { openConfirm, closeConfirm } = confirmationSlice.actions;
export default confirmationSlice.reducer;
