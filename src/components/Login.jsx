import React, { useEffect, useState } from 'react';
import { handleUserByIP, getUserVotes } from '../firebase';

const NO_VOTES_LEFT = 5;

const Login = ({ user, setUser }) => {
  const [votes, setVotes] = useState(null);

  useEffect(() => {
    const handleUser = async () => {
      const userObject = await handleUserByIP();
      if (userObject) {
        setUser(userObject);
        setVotes(userObject.votes); // Set initial votes

        // Subscribe to real-time updates for the votes
      const unsubscribe = getUserVotes(userObject.userId, newVotes => {
        setVotes(newVotes);
      });


        return () => unsubscribe(); // Clean up the subscription on unmount
      }
    };

    handleUser();
  }, [setUser]);

  return (
    <header>
      <div className="container">
        {user && (
          <h3 className={`header-votes ${votes <= NO_VOTES_LEFT ? 'no-votes-left' : ''}`}>
            likę balsai: <span>{votes}</span>
          </h3>
        )}
      </div>
    </header>
  );
};

export default Login;
