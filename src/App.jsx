// App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Description from "./components/Description";
import SongCard from "./components/SongCard";
import Login from "./components/Login";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { getSongs, auth } from './firebase';
import { Footer } from "./components/Footer";

function App() {
  const [songs, setSongs] = useState([]);
  const [votes, setVotes] = useState({});
  const [user, setUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false); // add this line

  useEffect(() => {
    const fetchSongs = async () => {
      const fetchedSongs = await getSongs();
      setSongs(fetchedSongs);
      setVotes(fetchedSongs.reduce((votes, song) => ({ ...votes, [song.id]: song.votes }), {}));
    };
    
    fetchSongs();

    // listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setIsAuthChecked(true); // add this line
    });
    // unsubscribe to the listener when unmounting
    return () => unsubscribe(); 
  }, []);

  const sortedSongs = [...songs].sort((a, b) => (votes[b.id] || 0) - (votes[a.id] || 0));

  return (
    <Router>
      <Login user={user} setUser={setUser}/>
      
      {isAuthChecked && (
        <>
          <Description/>

          <Routes>
            <Route path="/" element={
              <>
                {user &&  
                <div className="songs">
                  <div className="songs-grid">
                    {sortedSongs.map((song, index) => (
                    <SongCard key={song.id} song={song} votes={votes} user={user} setVotes={setVotes} rank={index + 1} />
                    ))}
                  </div>
                </div>}
              </>
            } />

            <Route path="/login" element={<LoginForm setUser={setUser} />} />
            <Route path="/signup" element={<SignUpForm setUser={setUser} />} />
          </Routes>

          <Footer/>
        </>
      )}
    </Router>
  );
}

export default App;
