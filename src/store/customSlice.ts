import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { RootState } from './index';
import type { CustomField } from '../types/customField';

const customFieldsAdapter = createEntityAdapter<CustomField>();

const customFieldSlice = createSlice({
	name: 'customFields',
	initialState: customFieldsAdapter.getInitialState(),
	reducers: {
		setCustomFields: customFieldsAdapter.setAll,
		upsertCustomField: customFieldsAdapter.upsertOne,
		removeCustomField: customFieldsAdapter.removeOne,
	},
});

export const { setCustomFields, upsertCustomField, removeCustomField } = customFieldSlice.actions;

export const customFieldSelectors = customFieldsAdapter.getSelectors(
	(state: RootState) => state.customFields
);
export default customFieldSlice.reducer;
