import { doc, setDoc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { Project } from '../types/project';
import { createDefaultColumns } from './column';
import type { AppDispatch } from '../store';
import { setColumns } from '../store/columnSlice';

export async function createProject(project: Project, dispatch: AppDispatch) {
	const ref = doc(db, 'projects', project.id);
	await setDoc(ref, project);
	const columns = await createDefaultColumns(project);
	dispatch(setColumns(columns));
	return project;
}

export async function getProject(projectId: string) {
	const ref = doc(db, 'projects', projectId);
	const snap = await getDoc(ref);
	return snap.exists() ? (snap.data() as Project) : null;
}

export async function updateProject(projectId: string, data: Partial<Project>) {
	const ref = doc(db, 'projects', projectId);
	await updateDoc(ref, data);
}

export async function deleteProject(projectId: string) {
	const ref = doc(db, 'projects', projectId);
	await deleteDoc(ref);
}
