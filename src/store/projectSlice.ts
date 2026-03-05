import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';
import type { Project } from '../types/project';

const projectsAdapter = createEntityAdapter<Project>({
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const projectSlice = createSlice({
	name: 'projects',
	initialState: projectsAdapter.getInitialState(),
	reducers: {
		setProjects: projectsAdapter.setAll,
		upsertProject: projectsAdapter.upsertOne,
		removeProject: projectsAdapter.removeOne,
	},
});

export const { setProjects, upsertProject, removeProject } = projectSlice.actions;
export const projectSelectors = projectsAdapter.getSelectors((state: RootState) => state.projects);

export const selectUserProjects = (userId: string) =>
	createSelector(
		(state: RootState) => projectSelectors.selectAll(state),
		projects => projects.filter(p => p.memberIds.includes(userId))
	);

export const selectActiveProject = createSelector(
	[
		(state: RootState) => state.activeProject.id,
		(state: RootState) => projectSelectors.selectEntities(state),
	],
	(activeProjectId, projectEntities) => {
		if (!activeProjectId) return null;
		return projectEntities[activeProjectId] || null;
	}
);

export default projectSlice.reducer;
