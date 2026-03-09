import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '.';
import type { Checklist } from '../types/checklist';
import { NONE } from './constants';

const checklistsAdapter = createEntityAdapter<Checklist>({
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const checklistsSlice = createSlice({
	name: 'checklists',
	initialState: checklistsAdapter.getInitialState(),
	reducers: {
		setChecklists: checklistsAdapter.setAll,
		upsertChecklist: checklistsAdapter.upsertOne,
		updateStoreChecklist: checklistsAdapter.updateOne,
		removeChecklist: checklistsAdapter.removeOne,
	},
});

export const { setChecklists, upsertChecklist, updateStoreChecklist, removeChecklist } =
	checklistsSlice.actions;

export const checklistSelectors = checklistsAdapter.getSelectors(
	(state: RootState) => state.checklists
);

export default checklistsSlice.reducer;

export const makeSelectChecklistsForTask = () =>
	createSelector(
		checklistSelectors.selectAll,
		(_: RootState, taskId: string) => taskId,
		(checklists, taskId) => (taskId === NONE ? [] : checklists.filter(c => c.taskId === taskId))
	);
