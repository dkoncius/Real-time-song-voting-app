import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  query,
  where,
  onSnapshot,
  increment,
  addDoc,
  collection,
  updateDoc,
  getDocs,
  setDoc,
  Timestamp 
} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';


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

export const handleUserByIP = async () => {
  try {
    const response = await fetch(`https://us-central1-songs-dd37b.cloudfunctions.net/getUserIP`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const ip = data.ip;

    // Query the 'ips' collection to find a document with the given IP address
    const ipsRef = collection(db, 'ips');
    const querySnapshot = await getDocs(query(ipsRef, where('ip', '==', ip)));
    const existingDoc = querySnapshot.docs[0];

    if (existingDoc) {
      return existingDoc.data(); // Return existing user data
    } else {
      const userId = uuidv4(); // Create a unique userId
      const votes = 5; // Set default votes

      // Create a new document with a unique ID, storing the IP address, userId, and votes
      const newDocRef = await addDoc(ipsRef, { ip, userId, votes });
      return { userId, votes }; // Return newly created user data
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: error.message };
  }
};

export const getSongs = async () => {
  const snapshot = await getDocs(collection(db, 'songs'));
  const songs = [];

  snapshot.forEach((doc) => {
    const songData = doc.data();
    const { id } = doc;

    songs.push({ id, ...songData });
  });

  return songs;
};

export const voteForSong = async (userId, songId) => {
  if (!userId || !songId) {
    return false;
  }

  // Query the 'ips' collection to find the document with the given userId
  const ipsRef = collection(db, 'ips');
  const querySnapshot = await getDocs(query(ipsRef, where('userId', '==', userId)));
  const ipDoc = querySnapshot.docs[0];

  // Check if there is no votes left today
  if (!ipDoc || ipDoc.data().votes <= 0) {
    alert("Išnaudojote dienos limitą. Penki balsai per dieną :)");
    return false;
  }

  // Check if the user's lastVoteTime is older than 24 hours
  const lastVoteTime = ipDoc.data().lastVoteTime.toMillis(); // Convert Firebase Timestamp to milliseconds
  const currentTime = Date.now(); // Current time in milliseconds
  const timeDiff = currentTime - lastVoteTime;
  const hoursPassed = timeDiff / (1000 * 60 * 60);

  // Reset votes if 24 hours passed
  if (hoursPassed >= 24) {
    // Reset user's vote count and update lastVoteTime
    await updateDoc(ipDoc.ref, { votes: 5, lastVoteTime: Timestamp.fromMillis(currentTime) });
  } else {
    const songRef = doc(db, 'songs', songId);
    const songSnap = await getDoc(songRef);

    if (songSnap.exists()) {
      // Increment votes for the song
      await updateDoc(songRef, { votes: increment(1) });

      // Decrement the user's vote count and update last vote time in the 'ips' collection
      await updateDoc(ipDoc.ref, { votes: increment(-1), lastVoteTime: Timestamp.fromMillis(currentTime) });

      return true;
    } else {
      console.log(`No song with ID ${songId} exists.`);
      return false;
    }
  }

  // Calculate the time left until the reset
  const hoursLeft = 24 - hoursPassed;
  console.log(`You can vote again in ${hoursLeft.toFixed(2)} hours.`);
};


export const getUserVotes = (userId, callback) => {
  // Query the 'ips' collection to find the document with the given userId
  const ipsRef = collection(db, 'ips');
  const queryRef = query(ipsRef, where('userId', '==', userId));

  const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
    const docSnapshot = querySnapshot.docs[0];
    if (docSnapshot) {
      const data = docSnapshot.data();
      callback(data.votes); // Call the callback with the updated votes
    } else {
      callback(0); // Call the callback with 0 if the document does not exist
    }
  });

  return unsubscribe; // Return the unsubscribe function to allow cleanup
};
