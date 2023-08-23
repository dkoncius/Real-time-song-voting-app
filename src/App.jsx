import React, { useState, useEffect } from 'react';
import { auth, getSongs, handleUserByIP } from './firebase';
import Authentication from './components/Authentication';
import SongCard from './components/SongCard';
import Description from './components/Description';
import { Footer } from './components/Footer';

function App() {
  const [songs, setSongs] = useState([]);
  const [votes, setVotes] = useState({});
  const [user, setUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const fetchSongsAndUser = async () => {
      const fetchedSongs = await getSongs();
      setSongs(fetchedSongs);
      setVotes(fetchedSongs.reduce((votes, song) => ({ ...votes, [song.id]: song.votes }), {}));
      
      const authUser = auth.currentUser;
      if (authUser) {
        const user = await handleUserByIP(); // Fetch user by IP address
        setUser(user); // Set the user object that includes the IP address
      }
    };
  
    fetchSongsAndUser();
  
    // listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setIsAuthChecked(true);
    });
    // unsubscribe to the listener when unmounting
    return () => unsubscribe();
  }, []);
  

  const sortedSongs = [...songs].sort((a, b) => (votes[b.id] || 0) - (votes[a.id] || 0));

  return (
    <>
      {isAuthChecked && (
        <>
          <Description/>
          <Authentication user={user} setUser={setUser}/>
          
          {user &&  
          <div className="songs">
            <div className="songs-grid">
              {sortedSongs.map((song, index) => (
              <SongCard key={song.id} song={song} votes={votes} user={user} setVotes={setVotes} rank={index + 1} />
              ))}
            </div>
          </div>}

          <Footer/>
        </>
      )}
    </>
  );
}

export default App;
