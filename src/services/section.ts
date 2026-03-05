import { doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { Section } from '../types/section';
import { db } from './firebase';

export async function createSection(projectId: string, section: Section) {
	const ref = doc(db, 'projects', projectId, 'sections', section.id);
	await setDoc(ref, section);
	return section;
}
export async function updateSection(projectId: string, sectionId: string, data: Partial<Section>) {
	const ref = doc(db, 'projects', projectId, 'sections', sectionId);
	await updateDoc(ref, data);
}
export async function deleteSection(projectId: string, sectionId: string) {
	const ref = doc(db, 'projects', projectId, 'sections', sectionId);
	await deleteDoc(ref);
}
