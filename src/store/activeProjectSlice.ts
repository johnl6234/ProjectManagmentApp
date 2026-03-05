// store/activeProjectSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ActiveProjectState {
	id: string | null;
}

const initialState: ActiveProjectState = {
	id: null,
};

const activeProjectSlice = createSlice({
	name: 'activeProject',
	initialState,
	reducers: {
		setActiveProjectId(state, action: PayloadAction<string | null>) {
			state.id = action.payload;
		},
		clearActiveProject(state) {
			state.id = null;
		},
	},
});

export const { setActiveProjectId, clearActiveProject } = activeProjectSlice.actions;
export default activeProjectSlice.reducer;
