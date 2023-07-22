import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

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

// Add songs to firebase
const songs = [
  {id: '1', name: 'Tu mane sukūrei', album: 'Tu mane sukūrei (2017)', src: 'https://open.spotify.com/embed/track/7ip5Gqd3DrY1YUnAyprKlT?utm_source=generator&theme=0', votes: 0},
  {id: '2', name: 'Vienas Kūnas', album: 'Ateitis su Viltimi (2018)', src: 'https://open.spotify.com/embed/track/68UgdJ8QvKlopxr0VKWjNX?utm_source=generator', votes: 0},
  {id: '3', name: 'Pergalė prarijo mirtį', album: 'Meilė niekad nesibaigia (2021)', src: 'https://open.spotify.com/embed/track/7yC18wlmUqpxrHMSj6chqC?utm_source=generator', votes: 0},
];

const addSongsToFirestore = async () => {
  const songCollection = collection(db, 'songs');
  
  songs.forEach(async (song) => {
    try {
      await setDoc(doc(songCollection, song.id), song);
      console.log(`Song ${song.name} added with ID: ${song.id}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  });
};

addSongsToFirestore();
