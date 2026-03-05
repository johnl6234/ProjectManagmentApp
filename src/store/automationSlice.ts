import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { type RootState } from './index';
import type { AutomationRule } from '../types/automation';

const automationsAdapter = createEntityAdapter<AutomationRule>();

const automationSlice = createSlice({
	name: 'automations',
	initialState: automationsAdapter.getInitialState(),
	reducers: {
		setAutomationRules: automationsAdapter.setAll,
		upsertAutomationRule: automationsAdapter.upsertOne,
		removeAutomationRule: automationsAdapter.removeOne,
	},
});

export const { setAutomationRules, upsertAutomationRule, removeAutomationRule } =
	automationSlice.actions;

export const automationSelectors = automationsAdapter.getSelectors(
	(state: RootState) => state.automations
);
export default automationSlice.reducer;
