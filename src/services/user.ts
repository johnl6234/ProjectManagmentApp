import { doc, getDoc, updateDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import type { User } from '../types/user';
import { db } from './firebase';

export async function getAllUsers() {
	const ref = collection(db, 'users');
	const snap = await getDocs(ref);
	return snap.docs.map(doc => {
		const data = doc.data() as User;

		// Remove the id field from the data to avoid overwriting
		const { id: _ignored, ...rest } = data;

		return { id: doc.id, ...rest };
	});
}

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
