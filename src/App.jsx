import { useState, useEffect } from "react";
import SongCard from "./components/SongCard";
import { getSongs, signInWithGoogle, signOutUser, auth } from './firebase';

function App() {
  const [songs, setSongs] = useState([]);
  const [votes, setVotes] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      const fetchedSongs = await getSongs();
      setSongs(fetchedSongs);
      setVotes(fetchedSongs.reduce((votes, song) => ({ ...votes, [song.id]: song.votes }), {}));
    };
    
    fetchSongs();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => setUser(user));
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOutUser();
  };

  const sortedSongs = [...songs].sort((a, b) => (votes[b.id] || 0) - (votes[a.id] || 0));

  return (
    <>
      {user ? <button onClick={handleSignOut}>Atsijungti</button> : <button onClick={signInWithGoogle}>Prisijungti su Google</button>}
      
      <div className="description">
        <h1>Balsuokite už patikusias giesmes</h1>
        <p>Gražiausių Gabrielės Gvazdikaitės giesmių rinkimai
        2024 metų vasarą šiuolaikinės krikščioniškos muzikos dainininkė Gabrielė Gvazdikaitė ruošia malonų siurprizą savo klausytojams - tai gražiausių atlikėjos giesmių koncertai su orkestru ir Berklee muzikos koledžą baigusiu pianistu Domu Žeromsku.</p>

        <p>Kokie Gabrielės kūriniai skambės šiuose išskirtiniuose koncertuose - gali nuspręsti ir tu! Balsuok už mėgstamiausias Gabrielės Gvazdikaitės giesmes ir rugpjūčio 31 dieną radijo stoties XFM Pavakario eteryje sužinok kokias 7 koncertuose su orkestru skambėsiančias giesmes išrinks klausytojai, o kokius 5 kūrinius - Gabrielė ir jos komanda!</p>

        <p>Nepraleiskite progos ir dalyvaukite balsavime, o radijo stoties XFM klausytojų laukia malonūs prizai!</p>
      </div>
     

      {user &&  
       <div className="songs-grid">
        {sortedSongs.map((song, index) => (
          <SongCard key={song.id} song={song} votes={votes} user={user} setVotes={setVotes} rank={index + 1} />
        ))}
      </div>}

    
    </>
  );
}

export default App;
