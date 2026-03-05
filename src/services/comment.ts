import { doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { Comment } from '../types/comment';

export async function createComment(projectId: string, comment: Comment) {
	const ref = doc(db, 'projects', projectId, 'comments', comment.id);
	await setDoc(ref, comment);
	return comment;
}
export async function updateComment(projectId: string, commentId: string, data: Partial<Comment>) {
	const ref = doc(db, 'projects', projectId, 'comments', commentId);
	await updateDoc(ref, data);
}
export async function deleteComment(projectId: string, commentId: string) {
	const ref = doc(db, 'projects', projectId, 'comments', commentId);
	await deleteDoc(ref);
}
