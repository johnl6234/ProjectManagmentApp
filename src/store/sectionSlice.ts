import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { type RootState } from './index';
import type { Section } from '../types/section';

const sectionsAdapter = createEntityAdapter<Section>({
	sortComparer: (a, b) => a.order - b.order,
});

const sectionSlice = createSlice({
	name: 'sections',
	initialState: sectionsAdapter.getInitialState(),
	reducers: {
		setSections: sectionsAdapter.setAll,
		upsertSection: sectionsAdapter.upsertOne,
		removeSection: sectionsAdapter.removeOne,
	},
});

export const { setSections, upsertSection, removeSection } = sectionSlice.actions;
export const sectionSelectors = sectionsAdapter.getSelectors((state: RootState) => state.sections);
export default sectionSlice.reducer;
