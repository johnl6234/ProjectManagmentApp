import { collection, doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { Task } from '../types/task';
import { db } from './firebase';

export async function createTask(projectId: string, task: Task) {
	const ref = doc(collection(db, 'projects', projectId, 'tasks'), task.id);
	await setDoc(ref, task);
	return task;
}
export async function getTask(projectId: string, taskId: string) {
	const ref = doc(db, 'projects', projectId, 'tasks', taskId);
	const snap = await getDoc(ref);
	return snap.exists() ? (snap.data() as Task) : null;
}
export async function updateTask(projectId: string, taskId: string, data: Partial<Task>) {
	const ref = doc(db, 'projects', projectId, 'tasks', taskId);
	await updateDoc(ref, data);
}
export async function deleteTask(projectId: string, taskId: string) {
	const ref = doc(db, 'projects', projectId, 'tasks', taskId);
	await deleteDoc(ref);
}
