import { useState } from "react"
import { Vote } from "./components/Vote"

function App() {
  // Create a list of songs with unique IDs
  const songs = [
    {id: '1', name: 'Tu mane sukūrei', album: 'Tu mane sukūrei (2017)', src: 'https://open.spotify.com/embed/track/7ip5Gqd3DrY1YUnAyprKlT?utm_source=generator&theme=0'},
    {id: '2', name: 'Vienas Kūnas', album: 'Ateitis su Viltimi (2018)', src: 'https://open.spotify.com/embed/track/68UgdJ8QvKlopxr0VKWjNX?utm_source=generator'},
    {id: '3', name: 'Pergalė prarijo mirtį', album: 'Meilė niekad nesibaigia (2021)', src: 'https://open.spotify.com/embed/track/7yC18wlmUqpxrHMSj6chqC?utm_source=generator'},
  ]

  // Initialize votes as an object where keys are song IDs and values are vote counts
  const [votes, setVotes] = useState({})

  const handleClick = (id) => {
    // Increment the vote count for the clicked song
    setVotes({...votes, [id]: (votes[id] || 0) + 1})
    console.log("clicked")
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

export default App
