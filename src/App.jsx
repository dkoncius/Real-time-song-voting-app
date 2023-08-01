import { useState, useEffect } from "react";
import Description from "./components/Description";
import SongCard from "./components/SongCard";
import Login from "./components/Login";
import { getSongs } from './firebase';

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

  const sortedSongs = [...songs].sort((a, b) => (votes[b.id] || 0) - (votes[a.id] || 0));

  return (
    <>
      <Login user={user} setUser={setUser}/> {/* Pass user state down as props */}
      
      <Description/>
     
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
