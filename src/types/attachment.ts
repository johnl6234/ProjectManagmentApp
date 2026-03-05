export type Attachment = {
	id: string;
	taskId: string;
	uploaderId: string;

	name: string;
	type: string; // mime type
	size?: number;

	url: string; // storage or external link
	previewUrl?: string; // thumbnails, etc.

	createdAt: string;

	source?: 'upload' | 'link' | 'integration';
	metadata?: Record<string, any>;
};
