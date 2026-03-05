import { collection, addDoc, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { Checkbox } from '../types/checklist';

export async function createCheckbox(projectId: string, taskId: string, checklistId: string) {
	const ref = collection(
		db,
		'projects',
		projectId,
		'tasks',
		taskId,
		'checklists',
		checklistId,
		'checkboxes'
	);

	await addDoc(ref, {
		taskId,
		checklistId,
		title: 'todo',
		checked: false,
		createdAt: Date.now().toString(),
		updatedAt: Date.now().toString(),
	});
}
export async function getCheckbox(
	projectId: string,
	taskId: string,
	checklistId: string,
	checkboxId: string
) {
	const ref = doc(
		db,
		'projects',
		projectId,
		'tasks',
		taskId,
		'checklists',
		checklistId,
		'checkboxes',
		checkboxId
	);

	const snap = await getDoc(ref);
	return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}
export async function updateCheckbox(
	projectId: string,
	taskId: string,
	checklistId: string,
	checkboxId: string,
	changes: Partial<Checkbox>
) {
	const ref = doc(
		db,
		'projects',
		projectId,
		'tasks',
		taskId,
		'checklists',
		checklistId,
		'checkboxes',
		checkboxId
	);

	await updateDoc(ref, {
		...changes,
		updatedAt: Date.now().toString(),
	});
}
export async function deleteCheckbox(
	projectId: string,
	taskId: string,
	checklistId: string,
	checkboxId: string
) {
	const ref = doc(
		db,
		'projects',
		projectId,
		'tasks',
		taskId,
		'checklists',
		checklistId,
		'checkboxes',
		checkboxId
	);

	await deleteDoc(ref);
}
