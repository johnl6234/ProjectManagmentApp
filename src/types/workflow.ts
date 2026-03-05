export type StatusWorkflow = {
	id: string;
	name: string;

	statuses: WorkflowStatus[];
	transitions: Record<string, string[]>;

	initialStatus: string;
	terminalStatuses?: string[];

	requiredFields?: Record<string, string[]>;
	roleRestrictions?: Record<string, string[]>;

	createdAt: string;
	updatedAt: string;
};

type WorkflowStatus = {
	id: string;
	label: string;
	color?: string; // UI hint
	category?: 'todo' | 'inProgress' | 'review' | 'done';
};
