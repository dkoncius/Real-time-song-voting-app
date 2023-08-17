import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, updateDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYsA1Acby612nPLB_3gDEiFEDkoJtCVE0",
  authDomain: "songs-dd37b.firebaseapp.com",
  projectId: "songs-dd37b",
  storageBucket: "songs-dd37b.appspot.com",
  messagingSenderId: "107434964500",
  appId: "1:107434964500:web:a7f835058e2315862bd901"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

const resetUserVotes = async () => {
  const ipsRef = collection(db, 'ips');
  const ipsSnapshot = await getDocs(ipsRef);

  for (const doc of ipsSnapshot.docs) {
    await updateDoc(doc.ref, { votes: 5 });
  }

  console.log('User votes in the ips collection have been reset');
};

resetUserVotes();
