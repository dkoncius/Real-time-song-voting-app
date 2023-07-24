import { useState, useEffect } from "react";
import { Vote } from "./components/Vote";
import { getSongs, voteForSong, signInWithToken, signInWithGoogle, signOutUser, auth } from './firebase';

function App() {
  const [songs, setSongs] = useState([]);
  const [votes, setVotes] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchSongsAndSignIn = async () => {
      // Fetch songs
      const fetchedSongs = await getSongs();
      setSongs(fetchedSongs);
      setVotes(fetchedSongs.reduce((votes, song) => ({ ...votes, [song.id]: song.votes }), {}));

      // Sign in user with custom token
      const token = import.meta.env.VITE_APP_CUSTOM_TOKEN;
      await signInWithToken(token);
    };
    
    fetchSongsAndSignIn();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => setUser(user));
    return () => unsubscribe();  // clean up on unmount
  }, []);

  const handleClick = async (id) => {
    await voteForSong(id);
    setVotes({ ...votes, [id]: votes[id] + 1 });
  };

  const handleSignOut = async () => {
    await signOutUser();
  };

  // Sort the songs by vote count
  const sortedSongs = [...songs].sort((a, b) => (votes[b.id] || 0) - (votes[a.id] || 0));

  if (!user) {
    return (
      <div>
        <button onClick={signInWithGoogle}>Sign In with Google</button>
      </div>
    );
  }

  return (
    <>
      <button onClick={handleSignOut}>Sign Out</button>  {/* Add sign out button */}
      <h1>Balsuokite už patikusias giesmes</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Balsai</th>
            <th>Giesmė</th>
            <th>Albumas</th>
            <th>Spotify</th>
          </tr>
        </thead>
        <tbody>
          {sortedSongs.map(song => (
            <tr key={song.id} onClick={() => handleClick(song.id)}>
              <td><Vote vote={votes[song.id] || 0}/></td>
              <td>{song.name}</td>
              <td>{song.album}</td>
              <td>
                <iframe src={song.src}></iframe>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
