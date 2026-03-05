export {};
declare global {
	interface Window {
		__projectUnsubscribers?: Array<() => void>;
		__taskUnsubscribers?: Array<() => void>;
	}
}
