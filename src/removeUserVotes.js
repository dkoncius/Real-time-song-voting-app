import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_CUSTOM_API_KEY,
  authDomain: import.meta.env.VITE_APP_CUSTOM_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_CUSTOM_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_CUSTOM_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_CUSTOM_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_CUSTOM_APP_ID
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

const resetUserVotes = async () => {
  const votesRef = collection(db, 'votes');
  const votesSnapshot = await getDocs(votesRef);

  for (const doc of votesSnapshot.docs) {
    await deleteDoc(doc.ref);
  }

  console.log('User votes have been reset');
};

resetUserVotes();
