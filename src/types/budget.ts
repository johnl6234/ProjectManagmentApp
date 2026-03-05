export type ProjectBudget = {
	id: string;
	projectId: string;

	currency: string; // e.g., "USD", "GBP", "EUR"

	plannedTotal: number; // total planned budget
	actualTotal: number; // total spent so far
	forecastTotal?: number; // projected final cost

	categories?: BudgetCategory[]; // breakdown
	lineItems?: BudgetLineItem[]; // optional detailed items

	alerts?: BudgetAlert[]; // overspend, nearing limit, etc.

	createdAt: string;
	updatedAt: string;
};
type BudgetCategory = {
	id: string;
	name: string; // e.g., "Design", "Development", "Marketing"
	planned: number;
	actual: number;
	forecast?: number;
};
type BudgetLineItem = {
	id: string;
	categoryId: string;

	description: string;
	amount: number;
	date: string;

	createdBy: string;
	approvedBy?: string;

	metadata?: Record<string, any>; // invoice number, vendor, etc.
};
type BudgetAlert = {
	id: string;
	type: 'threshold' | 'overspend' | 'forecastRisk';
	message: string;

	threshold?: number; // e.g., 0.8 for 80% of planned
	triggeredAt?: string;
	resolved?: boolean;
};
