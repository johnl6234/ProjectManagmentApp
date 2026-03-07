import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { User } from '../types/user';
import { db } from './firebase';

export async function getUser(userId: string) {
	const ref = doc(db, 'users', userId);
	const snap = await getDoc(ref);
	return snap.exists() ? (snap.data() as User) : null;
}
export async function updateUser(userId: string, data: Partial<User>) {
	const ref = doc(db, 'users', userId);
	await updateDoc(ref, data);
}
export async function deleteUser(userId: string) {
	const ref = doc(db, 'users', userId);
	await deleteDoc(ref);
}
