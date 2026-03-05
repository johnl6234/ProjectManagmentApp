// context/AuthContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { auth } from '../services/firebase';

interface AuthContextType {
	firebaseUser: FirebaseUser | null;
	loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
	firebaseUser: null,
	loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
			setFirebaseUser(firebaseUser);
			console.log('in context ', firebaseUser);
			if (!firebaseUser) {
				setLoading(false);
				return;
			}
		});

		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ firebaseUser, loading }}>{children}</AuthContext.Provider>
	);
};
