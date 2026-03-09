import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Views } from '../types/views';

type FilterState = {
	status?: string;
	assigneeId?: string;
	search?: string;
};

type UIState = {
	activeProjectId: string | null;
	activeTaskId: string | null;
	filters: FilterState;
	isTaskModalOpen: boolean;
	taskModalColumnId: string | null;
	isProjectModalOpen: boolean;
	isProjectSettingsModalOpen: boolean;
	isUserSettingsOpen: boolean;
	lastView: Views;
	sidebarCollapsed: boolean;
};

const initialState: UIState = {
	activeProjectId: null,
	activeTaskId: null,
	filters: {},
	isTaskModalOpen: false,
	taskModalColumnId: null,
	isProjectModalOpen: false,
	isProjectSettingsModalOpen: false,
	isUserSettingsOpen: false,
	lastView: 'board',
	sidebarCollapsed: false,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setActiveProject(state, action: PayloadAction<string | null>) {
			state.activeProjectId = action.payload;
		},
		setActiveTask(state, action: PayloadAction<string | null>) {
			state.activeTaskId = action.payload;
		},
		setFilters(state, action: PayloadAction<FilterState>) {
			state.filters = action.payload;
		},
		setTaskModalOpen(state, action: PayloadAction<{ open: boolean; columnId?: string }>) {
			state.isTaskModalOpen = action.payload.open;
			state.taskModalColumnId = action.payload.columnId ?? null;
		},
		setProjectModalOpen(state, action: PayloadAction<boolean>) {
			state.isProjectModalOpen = action.payload;
		},
		setProjectSettingsModalOpen(state, action: PayloadAction<boolean>) {
			state.isProjectSettingsModalOpen = action.payload;
		},
		setUserSettingsOpen(state, action: PayloadAction<boolean>) {
			state.isUserSettingsOpen = action.payload;
		},
		setLastView(state, action: PayloadAction<Views>) {
			state.lastView = action.payload;
		},
		setSidebarCollapsed(state, action: PayloadAction<boolean>) {
			state.sidebarCollapsed = action.payload;
		},
	},
});

export const {
	setActiveProject,
	setActiveTask,
	setFilters,
	setTaskModalOpen,
	setProjectModalOpen,
	setProjectSettingsModalOpen,
	setUserSettingsOpen,
	setLastView,
	setSidebarCollapsed,
} = uiSlice.actions;

export default uiSlice.reducer;
