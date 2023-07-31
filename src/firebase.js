import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc, increment, getDoc, addDoc, query, where } from 'firebase/firestore';
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

export const voteForSong = async (userId, songId) => {
  const votesRef = collection(db, 'votes');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const votesSnapshot = await getDocs(query(votesRef, where("userId", "==", userId), where("timestamp", ">=", today)));
  if (votesSnapshot.size >= 5) {
    alert("Išnaudojote dienos limitą. Penki balsai per dieną :)")
    console.log("User has already voted 5 times today.");
    return false;
  }

  const songRef = doc(db, 'songs', songId);
  const songSnap = await getDoc(songRef);
  
  if (songSnap.exists()) {
    await updateDoc(songRef, { votes: increment(1) });
    await addDoc(votesRef, { userId, songId, timestamp: new Date() }); // Add vote record
    return true;
  } else {
    console.log(`No song with ID ${songId} exists.`);
    return false;
  }
};

export const signInWithGoogle = async () => {
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
