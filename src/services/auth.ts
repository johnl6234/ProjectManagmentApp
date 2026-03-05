import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';

import { db } from './firebase';
import { setDoc, doc } from 'firebase/firestore';

// LOGIN — Auth only, no Firestore reads
export const SignIn = async (email: string, password: string) => {
	const auth = getAuth();
	const userCredential = await signInWithEmailAndPassword(auth, email, password);
	return userCredential.user;
};

// REGISTER — Create user in Auth + Firestore
export const registerUser = async (name: string, email: string, password: string) => {
	const auth = getAuth();
	const userCredential = await createUserWithEmailAndPassword(auth, email, password);
	const user = userCredential.user;

	// Create Firestore user document
	await setDoc(doc(db, 'users', user.uid), {
		id: user.uid,
		name,
		email: user.email,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		avatarUrl: null,
		timezone: {
			label: 'Europe/London (GMT+00:00)',
			tzCode: 'Europe/London',
			name: '(GMT+00:00) London, Birmingham, Liverpool, Sheffield, Bristol',
			utc: '+00:00',
		},
		locale: 'en-GB',
		theme: 'system',
		notificationSettings: {
			email: true,
			push: true,
			inApp: true,
			taskAssigned: true,
			taskMention: true,
			projectUpdates: true,
		},
		preferences: {
			defaultView: 'list',
			compactMode: false,
			showCompletedTasks: true,
		},
	});

	return user;
};

// LOGOUT
export const SignOut = () => {
	const auth = getAuth();

	return signOut(auth);
};
