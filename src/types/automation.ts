export type AutomationRule = {
	id: string;
	name: string;
	description?: string;
	enabled: boolean;

	trigger: AutomationTrigger;
	condition?: AutomationCondition;
	actions: AutomationAction[];

	createdAt: string;
	updatedAt: string;
	createdBy: string;
};

type AutomationTrigger =
	| { type: 'taskCreated' }
	| { type: 'taskDeleted' }
	| { type: 'statusChanged'; from?: string; to?: string }
	| { type: 'fieldChanged'; field: string }
	| { type: 'taskOverdue' }
	| { type: 'dependencyResolved' }
	| { type: 'scheduled'; cron: string }; // optional advanced support

type AutomationCondition = {
	field?: string;
	equals?: any;
	notEquals?: any;
	contains?: any;
	greaterThan?: number;
	lessThan?: number;
	in?: any[];
	custom?: string; // store serialized logic for server evaluation
};

type AutomationAction =
	| { type: 'setField'; field: string; value: any }
	| { type: 'assignUser'; userId: string }
	| { type: 'addWatcher'; userId: string }
	| { type: 'moveToStatus'; status: string }
	| { type: 'addComment'; text: string }
	| { type: 'sendNotification'; userIds: string[]; message: string }
	| { type: 'createTask'; templateId?: string }
	| { type: 'triggerWebhook'; url: string; payload?: any };
