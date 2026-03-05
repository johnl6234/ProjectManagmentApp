import { doc, collection, setDoc } from 'firebase/firestore';
import { DEFAULT_COLUMNS, type Column } from '../types/column';
import type { Project } from '../types/project';
import { db } from './firebase';

export async function createDefaultColumns(project: Project) {
	const created: Column[] = [];

	for (const [index, col] of DEFAULT_COLUMNS.entries()) {
		const colRef = doc(collection(db, 'projects', project.id, 'columns'));

		const column: Column = {
			id: colRef.id,
			projectId: project.id,
			name: col.name,
			status: col.status,
			color: col.color,
			order: index,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		await setDoc(colRef, column);
		created.push(column);
	}

	return created;
}
