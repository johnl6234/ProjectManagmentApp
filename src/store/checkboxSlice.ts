import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '.';
import type { Checkbox } from '../types/checklist';

const checkboxAdapter = createEntityAdapter<Checkbox>({
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const checkboxSlice = createSlice({
	name: 'checkbox',
	initialState: checkboxAdapter.getInitialState(),
	reducers: {
		setCheckboxes: checkboxAdapter.setAll,
		upsertStoreCheckbox: checkboxAdapter.upsertOne,
		updateStoreCheckbox: checkboxAdapter.updateOne,
		removeStoreCheckbox: checkboxAdapter.removeOne,
	},
});

export const { setCheckboxes, upsertStoreCheckbox, updateStoreCheckbox, removeStoreCheckbox } =
	checkboxSlice.actions;

export const checkboxSelectors = checkboxAdapter.getSelectors((state: RootState) => state.checkbox);

export default checkboxSlice.reducer;
