import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, signInWithCustomToken, signInWithRedirect } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYsA1Acby612nPLB_3gDEiFEDkoJtCVE0",
  authDomain: "songs-dd37b.firebaseapp.com",
  projectId: "songs-dd37b",
  storageBucket: "songs-dd37b.appspot.com",
  messagingSenderId: "107434964500",
  appId: "1:107434964500:web:a7f835058e2315862bd901"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth };

export const getSongs = async () => {
  const snapshot = await getDocs(collection(db, 'songs'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const voteForSong = async (id) => {
  const songRef = doc(db, 'songs', id);
  const songSnap = await getDoc(songRef);
  
  if (songSnap.exists()) {
    await updateDoc(songRef, { votes: increment(1) });
  } else {
    console.log(`No song with ID ${id} exists.`);
  }
};

export const signInWithToken = async (token) => {
  try {
    const userCredential = await signInWithCustomToken(auth, token);
    const user = userCredential.user;
    console.log("Signed in user:", user);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('Error signing in with custom token:', errorMessage);
  }
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error('Error signing in with Google:', error);
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};
