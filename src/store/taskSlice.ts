import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { RootState } from './index';
import type { Task } from '../types/task';

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
