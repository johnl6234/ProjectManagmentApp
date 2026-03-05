import { collection, addDoc, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { Checklist } from '../types/checklist';

export async function createChecklist(projectId: string, taskId: string) {
	const ref = collection(db, 'projects', projectId, 'tasks', taskId, 'checklists');

	await addDoc(ref, {
		taskId,
		title: 'Checklist',
		completed: false,
		createdAt: Date.now().toString(),
		updatedAt: Date.now().toString(),
	});
}
export async function getChecklist(projectId: string, taskId: string, checklistId: string) {
	const ref = doc(db, 'projects', projectId, 'tasks', taskId, 'checklists', checklistId);

	const snap = await getDoc(ref);
	return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}
export async function updateChecklist(
	projectId: string,
	taskId: string,
	checklistId: string,
	changes: Partial<Checklist>
) {
	const ref = doc(db, 'projects', projectId, 'tasks', taskId, 'checklists', checklistId);

	await updateDoc(ref, {
		...changes,
		updatedAt: Date.now().toString(),
	});
}
export async function deleteChecklist(projectId: string, taskId: string, checklistId: string) {
	const ref = doc(db, 'projects', projectId, 'tasks', taskId, 'checklists', checklistId);

	await deleteDoc(ref);
}
