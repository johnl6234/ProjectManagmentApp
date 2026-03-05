import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '.';
import type { Checklist } from '../types/checklist';

const checklistsAdapter = createEntityAdapter<Checklist>({
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const checklistsSlice = createSlice({
	name: 'checklists',
	initialState: checklistsAdapter.getInitialState(),
	reducers: {
		setChecklists: checklistsAdapter.setAll,
		upsertChecklist: checklistsAdapter.upsertOne,
		updateChecklist: checklistsAdapter.updateOne,
		removeChecklist: checklistsAdapter.removeOne,
	},
});

export const { setChecklists, upsertChecklist, updateChecklist, removeChecklist } =
	checklistsSlice.actions;

export const checklistSelectors = checklistsAdapter.getSelectors(
	(state: RootState) => state.checklists
);

export default checklistsSlice.reducer;
