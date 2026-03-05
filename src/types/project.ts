import type { AutomationRule } from './automation';
import type { ProjectBudget } from './budget';
import type { TaskPriority } from './task';
import type { StatusWorkflow } from './workflow';

export type Project = {
	id: string;
	name: string;
	description?: string;

	// Ownership & metadata
	ownerId: string;
	createdAt: string;
	updatedAt: string;

	// Apearence
	theme: Theme;

	// Structure
	sectionIds: string[];
	customFields?: Record<string, any>;
	tags?: string[];

	// Workflow & automation
	statusWorkflow?: StatusWorkflow;
	automationRules?: AutomationRule[];
	defaultAssigneeId?: string;
	defaultPriority?: TaskPriority;

	// Collaboration
	memberIds: string[];
	roles?: Record<string, ProjectRole>;
	watchers?: string[];

	// Time & tracking
	startDate?: string;
	endDate?: string;
	completedAt?: string;
	estimate?: number;
	actualTime?: number;
	budget?: ProjectBudget;

	// Visibility
	visibility?: 'public' | 'private' | 'restricted';
	allowedUsers?: string[];
	archived?: boolean;
};
type ProjectRole = {
	id: string;
	name: string;
	permissions: Permission[];
};

type Permission =
	| 'manageProject'
	| 'manageMembers'
	| 'manageWorkflow'
	| 'manageAutomations'
	| 'editTasks'
	| 'comment'
	| 'view';

export const SYSTEM_ROLES: Record<string, ProjectRole> = {
	owner: {
		id: 'owner',
		name: 'Owner',
		permissions: [
			'manageProject',
			'manageMembers',
			'manageWorkflow',
			'manageAutomations',
			'editTasks',
			'comment',
			'view',
		],
	},
	admin: {
		id: 'admin',
		name: 'Admin',
		permissions: [
			'manageProject',
			'manageMembers',
			'manageWorkflow',
			'manageAutomations',
			'editTasks',
			'comment',
			'view',
		],
	},
	editor: { id: 'editor', name: 'Editor', permissions: ['editTasks', 'comment', 'view'] },
	commenter: { id: 'commenter', name: 'Commenter', permissions: ['comment', 'view'] },
	viewer: { id: 'viewer', name: 'Viewer', permissions: ['view'] },
};

export type Theme = {
	name: string;
	color: string;
	backgroundColor: string;
};
