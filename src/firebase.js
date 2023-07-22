import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYsA1Acby612nPLB_3gDEiFEDkoJtCVE0",
  authDomain: "songs-dd37b.firebaseapp.com",
  projectId: "songs-dd37b",
  storageBucket: "songs-dd37b.appspot.com",
  messagingSenderId: "107434964500",
  appId: "1:107434964500:web:a7f835058e2315862bd901"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const db = firebase.firestore();

export const getSongs = async () => {
  const snapshot = await db.collection('songs').orderBy('votes', 'desc').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const voteForSong = async (id) => {
  const songRef = db.collection('songs').doc(id);
  await songRef.update({ votes: firebase.firestore.FieldValue.increment(1) });
};
