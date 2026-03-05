import type { TimeZone } from './timezones';

export type User = {
	id: string;
	name: string;
	email: string;

	avatarUrl?: string;
	bio?: string;

	createdAt: string;
	updatedAt: string;

	timezone: TimeZone;
	locale: 'en-US' | 'en-UK';
	theme: 'light' | 'dark' | 'system';

	notificationSettings?: NotificationSettings;
	preferences?: UserPreferences;

	deactivated?: boolean;
};
type NotificationSettings = {
	email: boolean;
	push: boolean;
	inApp: boolean;
	taskAssigned: boolean;
	taskMention: boolean;
	projectUpdates: boolean;
};

type UserPreferences = {
	defaultView?: 'list' | 'board' | 'calendar' | 'timeline';
	compactMode?: boolean;
	showCompletedTasks?: boolean;
};
