export type CustomField = {
	id: string;
	projectId: string;

	name: string;
	type: CustomFieldType;

	required?: boolean;
	options?: CustomFieldOption[]; // for dropdowns, multi-select, etc.

	defaultValue?: any;
	order?: number;

	createdAt: string;
	updatedAt: string;
};

type CustomFieldType =
	| 'text'
	| 'number'
	| 'date'
	| 'boolean'
	| 'singleSelect'
	| 'multiSelect'
	| 'user'
	| 'url';

type CustomFieldOption = {
	id: string;
	label: string;
	color?: string;
};
