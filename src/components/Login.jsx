import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOutUser, auth, getUserVotes } from '../firebase';

const MAX_VOTES = 5;

const Login = ({ user, setUser }) => {
  const [votes, setVotes] = useState(0);
  const [unsubscribeVotes, setUnsubscribeVotes] = useState(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false); // state to track email verification

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(user => {
      setUser(user);
      setEmailVerified(user ? user.emailVerified : false); // set email verification state when user logs in/out
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

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <header>
      <div className="container">
        {
          user && 

          <h3 className={`header-votes ${isBlinking ? 'blink' : ''} ${votes >= MAX_VOTES ? 'no-votes-left' : ''}`}>
            BALSAI: <span>{user ? MAX_VOTES - votes : 0}</span>
          </h3>
        }

        {user ? 
        <button onClick={handleSignOut}>Atsijungti</button> : 
        <button onClick={handleSignIn}>Prisijungti</button>}
      </div>
    </header>
  );
};

export default Login;
