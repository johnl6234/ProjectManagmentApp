import { doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { AutomationRule } from '../types/automation';
import { db } from './firebase';

export async function createAutomationRule(projectId: string, rule: AutomationRule) {
	const ref = doc(db, 'projects', projectId, 'automationRules', rule.id);
	await setDoc(ref, rule);
	return rule;
}
export async function updateAutomationRule(
	projectId: string,
	ruleId: string,
	data: Partial<AutomationRule>
) {
	const ref = doc(db, 'projects', projectId, 'automationRules', ruleId);
	await updateDoc(ref, data);
}
export async function deleteAutomationRule(projectId: string, ruleId: string) {
	const ref = doc(db, 'projects', projectId, 'automationRules', ruleId);
	await deleteDoc(ref);
}
