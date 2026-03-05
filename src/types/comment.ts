export type Comment = {
	id: string;
	taskId: string;
	authorId: string;

	body: string;
	createdAt: string;
	updatedAt: string;

	mentions?: string[]; // userIds
	//reactions?: Reaction[]; // 👍 ❤️ etc.
	parentCommentId?: string; // for threads

	system?: boolean; // true for auto-generated events
	metadata?: Record<string, any>;
};
