import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import projectReducer from './projectSlice';
import taskReducer from './taskSlice';
import sectionReducer from './sectionSlice';
import commentReducer from './commentSlice';
import automationReducer from './automationSlice';
import customFieldReducer from './customSlice';
import uiReducer from './uiSlice';
import activeProjectReducer from './activeProjectSlice';
import columnsReducer from './columnSlice';
import confirmReducer from './confirmSlice';
import checklistReducer from './checklistSlice';
import checkboxReducer from './checkboxSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		projects: projectReducer,
		tasks: taskReducer,
		sections: sectionReducer,
		comments: commentReducer,
		automations: automationReducer,
		customFields: customFieldReducer,
		ui: uiReducer,
		activeProject: activeProjectReducer,
		columns: columnsReducer,
		confirmation: confirmReducer,
		checklists: checklistReducer,
		checkbox: checkboxReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
