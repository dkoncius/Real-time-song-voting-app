import React from "react";
import { Vote } from "./Vote";
import { voteForSong } from '../firebase';

const SongCard = ({ song, votes, user, setVotes, rank }) => {
  const handleClick = async () => {
    if (user) {
      const success = await voteForSong(user.uid, song.id);
      if (success) {
        setVotes({ ...votes, [song.id]: (votes[song.id] || 0) + 1 });
      } else {
        console.log("Vote was not successful.");
      }
    } else {
      console.log("User is not signed in.");
    }
  };

  return (
    <div className="song-card" onClick={handleClick}>
      <div className="rank">{rank}</div>
      <div>
        <iframe src={song.src}></iframe>
      </div>
      <button className="votes-count">
        <Vote vote={votes[song.id] || 0}/>
      </button>
    </div>
  );
}

export default SongCard;
