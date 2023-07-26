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
  {id: '2', name: 'Nugalėtojas', album: 'Tu mane sukūrei (2017)', src: 'https://open.spotify.com/embed/track/7GNQmLMiFYgu7nJQsaPCgF?si=a683b04279de466a', votes: 0},
  {id: '3', name: 'Dieną kai man sunku', album: 'Tu mane sukūrei (2017)', src: 'https://open.spotify.com/embed/track/7aGNp1ieneOKfdtL1ppjQw?si=b3173e32478e4a6e', votes: 0},
  {id: '4', name: 'Pikta negyvens su tavim', album: 'Ateitis su Viltimi (2018)', src: 'https://open.spotify.com/embed/track/2U9wstjloFzb4yzzJh7CIg?si=473475c955b94d4d', votes: 0},
  {id: '5', name: 'Vienas Kūnas', album: 'Ateitis su Viltimi (2018)', src: 'https://open.spotify.com/embed/track/68UgdJ8QvKlopxr0VKWjNX?si=9e65e52c81804b2f', votes: 0},
  {id: '6', name: 'Tuštybė ir vėjo gaudymas', album: 'Ateitis su Viltimi (2018)', src: 'https://open.spotify.com/embed/track/4NelgfAQ1PuQC5uflykh5C?si=df1732dbb1a44f9b', votes: 0},
  {id: '7', name: 'Nieks jokiais būdais', album: 'Ateitis su Viltimi (2018)', src: 'https://open.spotify.com/embed/track/6rx8KJetFx5lpyFpgfwNSS?si=c71515107cef43c1', votes: 0},
  {id: '8', name: 'Mano dienų tiktai sprindis', album: 'Ateitis su Viltimi (2018)', src: 'https://open.spotify.com/embed/track/5pgpC8TBPnUQpWGL85z5C9?si=b49fbcc1b6344393', votes: 0},
  {id: '9', name: 'Pergalė prarijo mirtį', album: 'Meilė niekad nesibaigia (2021)', src: 'https://open.spotify.com/embed/track/7yC18wlmUqpxrHMSj6chqC?si=afb8002bf572487f', votes: 0},
  {id: '10', name: 'Meilė niekad nesibaigia', album: 'Meilė niekad nesibaigia (2021)', src: 'https://open.spotify.com/embed/track/4Es4h1zcI2kDJmDcHUpzwv?si=54500b1b296a411f', votes: 0},
  {id: '11', name: 'Kai Jo ieškojau', album: 'Meilė niekad nesibaigia (2021)', src: 'https://open.spotify.com/embed/track/4DnNMIE1ryBNy79D74mw9a?si=ffde124247594ccf', votes: 0},
  {id: '12', name: 'Dienos vis bėga', album: 'Meilė niekad nesibaigia (2021)', src: 'https://open.spotify.com/embed/track/0hnytNROPHADCKlZjQySSP?si=25a9b2b28e304032', votes: 0},
  {id: '13', name: 'Aš priklausau Jėzui', album: 'Meilė niekad nesibaigia (2021)', src: 'https://open.spotify.com/embed/track/5lyqXQBVDCs5Q8KFI5dF4x?si=767627359e354e85', votes: 0},
  {id: '14', name: 'Mano siela rami', album: 'Meilė niekad nesibaigia (2021)', src: 'https://open.spotify.com/embed/track/4xWxSrpLdHNrvK1qAKiNkT?si=fb3d9d3c75c94852', votes: 0},
  {id: '15', name: 'Naują širdį', album: 'Meilė niekad nesibaigia (2021)', src: 'https://open.spotify.com/embed/track/2zH8wg6I5toVTdl2NRN3cm?si=dac520b7d3c44b71', votes: 0},
  {id: '16', name: 'Kas gi mano artimas?', album: 'Meilė niekad nesibaigia (2021)', src: 'https://open.spotify.com/embed/track/3Gw3iuMrwz4bYvb9kEMqON?si=3ce75d9ab79b4a3b', votes: 0},
  {id: '17', name: 'Nebudinkit ir nežadinkite meilės', album: 'Aš tikiu (2022)', src: 'https://open.spotify.com/embed/track/5eyJZOLAIBbfLD6GIEQfXC?si=00228c02d8f14f50', votes: 0},
  {id: '18', name: 'Aukštumų ir slėnių Dievas', album: 'Aš tikiu (2022)', src: 'https://open.spotify.com/embed/track/3IYvtuVKrFtwNFAdXO5B8T?si=9fd8508a2cdb42e7', votes: 0},
  {id: '19', name: 'Pažadinki mus', album: 'Atgimimo vaikai - Mūsų laiškas Lietuvai (2021)', src: 'https://open.spotify.com/embed/track/4syogsNfmThqNRjp2D02el?si=24d28ced47ab47dd', votes: 0},
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
