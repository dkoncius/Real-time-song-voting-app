import React, { useState, useMemo, useEffect } from 'react';
import { voteForSong } from '../firebase';
import Iframe from 'react-iframe';
import { Loading } from './Loading';

const SongCard = ({ song, votes, user, setVotes, rank }) => {
  
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0); // Counter to track retries
  const songVotes = useMemo(() => votes[song.id] || 0, [votes, song.id]);

  const handleClick = async () => {
    console.log("Attempting to vote for song:", song.id, "by user:", user.userId); // Debug log

    const success = await voteForSong(user.userId, song.id);
    if (success) {
      setVotes(prevVotes => ({ ...prevVotes, [song.id]: (prevVotes[song.id] || 0) + 1 }));
    } else {
      console.log("Vote was not successful.");
    }
  };

  useEffect(() => {
    const delay = rank * 500; // Initial delay based on rank
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [rank]);

  useEffect(() => {
    if (isLoaded && !iframeLoaded && retryCount < 5) { // Limit to 5 retries
      const retryDelay = Math.pow(2, retryCount) * 1000; // Exponential back-off
      const retryTimer = setTimeout(() => {
        setRetryCount(retryCount + 1); // Increment retry counter
      }, retryDelay);

      return () => clearTimeout(retryTimer);
    }
  }, [isLoaded, iframeLoaded, retryCount]);

  return (
    <>
      {/* ... */}
      {!isLoaded ? (
        <Loading />
      ) : (
        <div
          className="song-card"
          onClick={user ? handleClick : () => console.log("User is not signed in.")}
          style={{ opacity: iframeLoaded ? 1 : 0.5 }}
        >
          <div
            className="iframe-wrapper"
            style={{ opacity: iframeLoaded ? 1 : 0, transition: "opacity 1s ease-in" }}
          >
            <div className="rank">{rank}</div>
            <Iframe
              url={song.src}
              onLoad={() => setIframeLoaded(true)}
              className="iframe"
            />
            <button className="votes-count">
              <i className="fa-solid fa-heart"></i>
              <p>{songVotes !== undefined ? songVotes : 0}</p> {/* Ensure songVotes is not undefined */}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SongCard;
