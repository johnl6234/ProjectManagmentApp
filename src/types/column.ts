import type { TaskStatus } from './task';

export type Column = {
	id: string;
	projectId: string;

	name: string;

	status?: TaskStatus | null;

	order: number;

	color?: string | null;
	wipLimit?: number | null;
	archived?: boolean;

	createdAt: string;
	updatedAt: string;
};

export const DEFAULT_COLUMNS: { status: TaskStatus; name: string; color: string }[] = [
	{ status: 'todo', name: 'To Do', color: '#e62e04' },
	{
		status: 'in-progress',
		name: 'In Progress',
		color: '#1276e2',
	},
	{
		status: 'review',
		name: 'Review',
		color: '#5c47cd',
	},
	{
		status: 'completed',
		name: 'Completed',
		color: '#2c8c5e',
	},
];
