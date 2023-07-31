import React, { useState, useEffect, memo, useMemo } from 'react';
import { Vote } from "./Vote";
import { voteForSong } from '../firebase';
import { useInView } from 'react-intersection-observer';
import Iframe from 'react-iframe';

const SongCard = memo(({ song, votes, user, setVotes, rank }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const [iframeLoaded, setIframeLoaded] = useState(false);
  const songVotes = useMemo(() => votes[song.id] || 0, [votes, song.id]);

  const handleClick = async () => {
    if (user) {
      const success = await voteForSong(user.uid, song.id);
      if (success) {
        setVotes(prevVotes => ({ ...prevVotes, [song.id]: (prevVotes[song.id] || 0) + 1 }));
      } else {
        console.log("Vote was not successful.");
      }
    } else {
      console.log("User is not signed in.");
    }
  };

  return (
    <div className="song-card" onClick={handleClick} style={{opacity: inView ? 1 : 0.5}}>
      
      <div ref={ref}>
        {inView && 
        <div className="iframe-wrapper" style={{ opacity: iframeLoaded ? 1 : 0, transition: 'opacity 1s ease-in' }}>
          <div className="rank">{rank}</div>
          <Iframe url={song.src} 
            onLoad={() => setIframeLoaded(true)}
            className="iframe"
          />
          <button className="votes-count">
            <Vote vote={songVotes}/>
          </button>
        </div>
        }
      </div>
    </div>
  );
});

export default SongCard;
