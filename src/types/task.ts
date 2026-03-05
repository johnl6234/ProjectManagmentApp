export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'completed';
export type TaskPriority = 'low' | 'normal' | 'high' | 'urgent';
export const TaskPriorityList: TaskPriority[] = ['low', 'normal', 'high', 'urgent'];

export type Task = {
	id: string;
	title: string;
	description?: string;

	// Ownership & workflow
	status: TaskStatus;
	priority?: TaskPriority;
	assigneeId?: string;
	watchers?: string[];

	// Time & tracking
	createdAt: string;
	updatedAt: string;
	dueDate?: string;
	completedAt?: string;
	estimate?: number;
	actualTime?: number;

	// Structure
	projectId: string;
	columnId: string;
	order: number;
	sectionId?: string;
	tags?: string[];
	taskCost?: TaskCost;

	// Workflow logic
	parentId: string;
	dependencies?: string[];
	dependents?: string[];
	customFields?: TaskCustomFieldValue[];

	// Visibility
	visibility?: 'public' | 'private' | 'restricted';
	allowedUsers?: string[];

	archived?: boolean;
};

type TaskCustomFieldValue = {
	taskId: string;
	fieldId: string;
	value: any;
};

type TaskCost = {
	taskId: string;
	estimatedCost?: number;
	actualCost?: number;
	categoryId?: string;
};
