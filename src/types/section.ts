export type Section = {
	id: string;
	projectId: string;

	name: string;
	description?: string;

	order: number; // for drag-and-drop ordering
	statusMapping?: string; // optional: link section to a workflow status

	createdAt: string;
	updatedAt: string;

	archived?: boolean;
	customFields?: Record<string, any>;
};
