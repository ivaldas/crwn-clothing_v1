import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);
	// check if user data exists
	if (!userSnapshot.exists()) {
		// if user data does not exists
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			// create / set the documentwith the data from userAuth in my collection
			await setDoc(userDocRef, { displayName, email, createdAt });
		} catch (error) {
			console.log('error creating the user', error.message);
		}
	}
	// if user data exists
	return userDocRef;
};
