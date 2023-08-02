import { useEffect, useState } from 'react';
import { signOutUser, auth, getUserVotes } from '../firebase';
import AnonymousAuth from './AnonymousAuth';

const MAX_VOTES = 5;

const Login = ({ setUser }) => {
  const [votes, setVotes] = useState(0);
  const [unsubscribeVotes, setUnsubscribeVotes] = useState(null);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(user => {
      setUser(user);
      if (user) {
        const unsubscribe = getUserVotes(user.uid, newVotes => {
          if (newVotes > votes) {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 1000);
          }
          setVotes(newVotes);
        });
        setUnsubscribeVotes(() => unsubscribe);
      } else {
        if (unsubscribeVotes) {
          unsubscribeVotes();
        }
        setVotes(0);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeVotes) {
        unsubscribeVotes();
      }
    };
  }, [setUser, unsubscribeVotes, votes]);

  const handleSignOut = async () => {
    await signOutUser();
  };

  return (
    <header>
        <div className="container">
          {
            auth.currentUser && 

            <h3 className={`header-votes ${isBlinking ? 'blink' : ''} ${votes >= MAX_VOTES ? 'no-votes-left' : ''}`}>
              BALSAI: <span>{auth.currentUser ? MAX_VOTES - votes : 0}</span>
            </h3>
          }
           
            {auth.currentUser ? 
            <button onClick={handleSignOut}>Atsijungti</button> : 
            <AnonymousAuth setUser={setUser} />}
        </div>
    </header>
  );
};

export default Login;
