// confirmationActions.ts
const actions: Record<string, () => void | Promise<void>> = {};

export function registerConfirmAction(id: string, fn: () => void | Promise<void>) {
	actions[id] = fn;
}

export function getConfirmAction(id: string) {
	return actions[id];
}

export function unregisterConfirmAction(id: string) {
	delete actions[id];
}
