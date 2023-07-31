import React, { useState } from 'react';
import { Vote } from "./Vote";
import { voteForSong } from '../firebase';
import { useInView } from 'react-intersection-observer';
import Iframe from 'react-iframe'; // importing the react-iframe package

const SongCard = ({ song, votes, user, setVotes, rank }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const [iframeLoaded, setIframeLoaded] = useState(false); // new piece of state to track iframe loading

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
    <div className="song-card" onClick={handleClick} style={{opacity: inView && 1}}>
      <div className="rank">{rank}</div>
      
      <div ref={ref}>
        {inView && 
        <div className="iframe-wrapper" style={{ opacity: iframeLoaded ? 1 : 0, transition: 'opacity 1s ease-in' }}>
          <Iframe url={song.src} 
            onLoad={() => setIframeLoaded(true)}
            className="iframe"
          />
        </div>
        }
      </div>
      <button className="votes-count">
        <Vote vote={votes[song.id] || 0}/>
      </button>
    </div>
  );
}

export default SongCard;
