import type { JSX } from 'react/jsx-runtime';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUser } from '../store/userSlice';
import LoginPage from './auth/loginPage';
import { doc, getDoc } from 'firebase/firestore';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(s => s.user.currentUser);

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, async firebaseUser => {
			if (!firebaseUser) {
				dispatch(setUser(null));
				return;
			}
			await auth.authStateReady();
			const userRef = doc(db, 'users', firebaseUser.uid);
			const snap = await getDoc(userRef);
			if (!snap.exists()) {
				console.error('User doc missing!');
				return;
			}
			const dbUser = snap.data();
			dispatch(
				setUser({
					id: firebaseUser.uid,
					name: dbUser?.name ?? '',
					email: dbUser?.email ?? firebaseUser.email ?? '',
					createdAt: dbUser?.createdAt ?? '',
					updatedAt: dbUser?.updatedAt ?? '',
					avatarUrl: dbUser?.avatarUrl,
					bio: dbUser?.bio,
					timezone: dbUser?.timezone,
					locale: dbUser?.locale,
					theme: dbUser?.theme,
					notificationSettings: dbUser?.notificationSettings,
					preferences: dbUser?.preferences,
					deactivated: dbUser?.deactivated,
				})
			);
		});
		return () => unsub();
	}, [dispatch]);

	if (!user) return <LoginPage />;

	return children;
};

export default ProtectedRoute;
