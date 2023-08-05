import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc, increment, getDoc, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification , signOut, sendPasswordResetEmail  } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_CUSTOM_API_KEY,
  authDomain: import.meta.env.VITE_APP_CUSTOM_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_CUSTOM_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_CUSTOM_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_CUSTOM_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_CUSTOM_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth };

export const getUserVotes = (userId, callback) => {
  const votesRef = collection(db, 'votes');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const unsubscribe = onSnapshot(query(votesRef, where("userId", "==", userId), where("timestamp", ">=", today)), (snapshot) => {
    callback(snapshot.size);
  });

  return unsubscribe;
};


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

export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Send verification email
    await sendEmailVerification(userCredential.user);
    
    return { user: userCredential.user };
  } catch (error) {
    return { error: error.message };
  }
};


export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user };
  } catch (error) {
    return { error: error.message };
  }
};


export const signOutUser = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
  }
};


export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: 'Password reset email sent!' };
  } catch (error) {
    return { error: error.message };
  }
};
