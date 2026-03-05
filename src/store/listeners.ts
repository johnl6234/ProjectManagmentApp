import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from '../services/firebase';
import { type AppDispatch } from '../store';
import { setProjects } from '../store/projectSlice';
import { setTasks } from '../store/taskSlice';
import type { Project } from '../types/project';
import type { Task } from '../types/task';

export function subscribeToProjects(userId: string, dispatch: AppDispatch) {
	if (!userId) return () => {};
	const q = query(collection(db, 'projects'), where('memberIds', 'array-contains', userId));

	return onSnapshot(q, snap => {
		const projects = snap.docs.map(d => d.data() as Project);
		dispatch(setProjects(projects));
	});
}

export function subscribeToTasks(projectId: string, dispatch: AppDispatch) {
	if (!projectId) return () => {};
	const col = collection(db, 'projects', projectId, 'tasks');
	return onSnapshot(col, snap => {
		const tasks = snap.docs.map(d => d.data() as Task);
		dispatch(setTasks(tasks));
	});
}
export function subscribeToUserProjects(userId: string, dispatch: AppDispatch) {
	if (!userId) return () => {};
	const q = query(collection(db, 'projects'), where('memberIds', 'array-contains', userId));

	return onSnapshot(q, snap => {
		const projects = snap.docs.map(d => d.data() as Project);
		dispatch(setProjects(projects));
	});
}
