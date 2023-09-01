import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyChP5Abn8KWFslyA65pOguYEfxA0TjmWN8',
	authDomain: 'crwn-clothing-db-72397.firebaseapp.com',
	projectId: 'crwn-clothing-db-72397',
	storageBucket: 'crwn-clothing-db-72397.appspot.com',
	messagingSenderId: '1061256390146',
	appId: '1:1061256390146:web:2e8f1f8319662a0d46691b'
};
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, aditionalInfo = {}) => {
	if (!userAuth) return;
	const userDocRef = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);
	// check if user data exists
	if (!userSnapshot.exists()) {
		// if user data does not exists
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			// create / set the documentwith the data from userAuth in my collection
			await setDoc(userDocRef, { displayName, email, createdAt, ...aditionalInfo });
		} catch (error) {
			console.log('error creating the user', error.message);
		}
	}
	// if user data exists
	return userDocRef;
};
export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await signInWithEmailAndPassword(auth, email, password);
};
