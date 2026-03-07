import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';
import type { Task } from '../types/task';
import { NONE } from './constants';

const tasksAdapter = createEntityAdapter<Task>({
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const taskSlice = createSlice({
	name: 'tasks',
	initialState: tasksAdapter.getInitialState(),
	reducers: {
		setTasks: tasksAdapter.setAll,
		upsertTask: tasksAdapter.upsertOne,
		removeTask: tasksAdapter.removeOne,
		updateTaskLocal: tasksAdapter.updateOne,
		updateStoreTask: (
			state,
			action: {
				payload: { id: string; changes: Partial<Task> };
			}
		) => {
			tasksAdapter.updateOne(state, {
				id: action.payload.id,
				changes: action.payload.changes,
			});
		},
	},
});

export const { setTasks, upsertTask, removeTask, updateTaskLocal, updateStoreTask } =
	taskSlice.actions;

export const taskSelectors = tasksAdapter.getSelectors((state: RootState) => state.tasks);

export default taskSlice.reducer;

export const makeSelectSubtasksForTask = () =>
	createSelector(
		taskSelectors.selectAll,
		(_: RootState, taskId: string) => taskId,
		(tasks, taskId) => (taskId === NONE ? [] : tasks.filter(t => t.parentId === taskId))
	);

export const makeSelectTasksForProject = () =>
	createSelector(
		taskSelectors.selectAll,
		(_: RootState, projectId: string) => projectId,
		(tasks, projectId) =>
			projectId === NONE ? [] : tasks.filter(t => t.projectId === projectId)
	);
