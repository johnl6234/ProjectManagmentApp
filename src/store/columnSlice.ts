import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '.';
import { taskSelectors } from './taskSlice';
import { createEntityAdapter } from '@reduxjs/toolkit';
import type { Column } from '../types/column';
import { NONE } from './constants';

const columnsAdapter = createEntityAdapter<Column>({ sortComparer: (a, b) => a.order - b.order });

const columnsSlice = createSlice({
	name: 'columns',
	initialState: columnsAdapter.getInitialState(),
	reducers: {
		setColumns: columnsAdapter.setAll,
		addColumn: columnsAdapter.addOne,
		updateColumn: columnsAdapter.updateOne,
		removeColumn: columnsAdapter.removeOne,
		reorderColumns(state, action: PayloadAction<Column[]>) {
			columnsAdapter.setAll(state, action.payload);
		},
	},
});

export const { setColumns, addColumn, updateColumn, reorderColumns } = columnsSlice.actions;

export default columnsSlice.reducer;

export const columnSelectors = columnsAdapter.getSelectors((state: RootState) => state.columns);

export const makeSelectColumnsForProject = () =>
	createSelector(
		columnSelectors.selectAll,
		(_: RootState, projectId: string) => projectId,
		(columns, projectId) =>
			projectId === NONE ? [] : columns.filter(c => c.projectId === projectId)
	);

export const makeSelectTasksForProject = () =>
	createSelector(
		taskSelectors.selectAll,
		(_: RootState, projectId: string) => projectId,
		(tasks, projectId) =>
			projectId === NONE ? [] : tasks.filter(t => t.projectId === projectId)
	);
