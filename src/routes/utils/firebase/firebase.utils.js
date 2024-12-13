import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword,
     signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
//import { getReactNativePersistenceReducer } from 'redux-persist-firebase';
//import { initializeAuth, getReactNativePersistenceTransform } from 'react-native-auth';
import{getFirestore, collection, doc, setDoc, getDoc} from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOxscFw4rPn2zPJxdbfeoMspHraOpzfD8",
    authDomain: "crwn-db-110da.firebaseapp.com",
    projectId: "crwn-db-110da",
    storageBucket: "crwn-db-110da.appspot.com",
    messagingSenderId: "313445207761",
    appId: "1:313445207761:web:95bf916efcb0f689fffff0"
  };
  
  // Initialize Firebase
 const firebaseApp = initializeApp(firebaseConfig);

const GoogleProvider = new GoogleAuthProvider();

GoogleProvider.setCustomParameters({
    prompt: 'select_account'
});

//Singletons
export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, GoogleProvider);

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, GoogleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (user, additionalInfo) => {
    if(!user) return;
    console.log('here now');
    const userDocRef = doc(db, 'users', user.uid);
    console.log('got userDocRef: ', userDocRef);
    const userDoc = await getDoc(userDocRef);
    console.log('got userDoc: ', userDoc);
    console.log('userDoc.exists(): ', userDoc.exists());
    if(!userDoc.exists()) {
        console.log('user does not exist');
        const {displayName, email} = user;
        const createdAt = new Date();
        try {
        setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInfo
        });
    }
    catch (error) {
        console.log('error creating user: ', error);
    }}
    else{
        console.log('user already exists');
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async ()=> signOut(auth);

export const onAuthStateChangedListener = (callback) => 
    onAuthStateChanged(auth, callback); 
