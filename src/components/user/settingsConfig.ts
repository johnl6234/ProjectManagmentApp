import GeneralSettings from './settings/GeneralSettings';

export const settingsPages = [
	{
		id: 'general',
		label: 'General',
		component: GeneralSettings,
	},
	// {
	// 	id: 'billing',
	// 	label: 'Billing',
	// 	component: BillingSettings,
	// },
	// {
	// 	id: 'plan',
	// 	label: 'Plan',
	// 	component: PlanSettings,
	// },
	// {
	// 	id: 'notifications',
	// 	label: 'Notifications',
	// 	component: NotificationsSettings,
	// },
] as const;

export type SettingsTab = (typeof settingsPages)[number]['id'];
