export type Checklist = {
	id: string;
	taskId: string;
	title: string;
	completed: boolean;
	createdAt: string;
	updatedAt: string;
};

export type Checkbox = {
	id: string;
	title: string;
	checkListId: string;
	checked: boolean;
	createdAt: string;
	updatedAt: string;
};
