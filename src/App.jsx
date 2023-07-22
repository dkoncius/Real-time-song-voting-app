import { useState, useEffect } from "react"
import { Vote } from "./components/Vote"
import { getSongs, voteForSong } from './firebase';

function App() {
  const [songs, setSongs] = useState([])
  const [votes, setVotes] = useState({})

  useEffect(() => {
    const fetchSongs = async () => {
      const fetchedSongs = await getSongs();
      setSongs(fetchedSongs);
      setVotes(fetchedSongs.reduce((votes, song) => ({ ...votes, [song.id]: song.votes }), {}));
    };
    fetchSongs();
  }, []);

  const handleClick = async (id) => {
    await voteForSong(id);
    setVotes({ ...votes, [id]: votes[id] + 1 });
  }

  // Sort the songs by vote count
  const sortedSongs = [...songs].sort((a, b) => (votes[b.id] || 0) - (votes[a.id] || 0))

  return (
    <>
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
  )
}

export default App;
