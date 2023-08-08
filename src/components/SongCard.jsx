import React, { useState, useMemo, useEffect } from 'react';
import { voteForSong } from '../firebase';
import Iframe from 'react-iframe';
import { Loading } from './Loading';

const SongCard = ({ song, votes, user, setVotes, rank }) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const songVotes = useMemo(() => votes[song.id] || 0, [votes, song.id]);

  const handleClick = async () => {
    const success = await voteForSong(user.uid, song.id);
    if (success) {
      setVotes(prevVotes => ({ ...prevVotes, [song.id]: (prevVotes[song.id] || 0) + 1 }));
    } else {
      console.log("Vote was not successful.");
    }
  };

  useEffect(() => {
    const delay = rank * 500; // Delay based on rank
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);

    return () => clearTimeout(timer); // Clear timeout if the component is unmounted
  }, [rank]);

  return (
    <>
      {!isLoaded ? <Loading /> :
        <div className="song-card"
          onClick={user ? handleClick : () => console.log("User is not signed in.")}
          style={{ opacity: iframeLoaded ? 1 : 0.5 }}
        >
          <div className="iframe-wrapper" style={{ opacity: iframeLoaded ? 1 : 0, transition: 'opacity 1s ease-in' }}>
            <div className="rank">{rank}</div>
            <Iframe url={song.src}
              onLoad={() => setIframeLoaded(true)}
              className="iframe"
            />
            <button className="votes-count">
              <i className="fa-solid fa-heart"></i>
              <p>{songVotes}</p>
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default SongCard;
