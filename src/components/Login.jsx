import { useEffect, useState } from 'react';
import { signOutUser, auth, getUserVotes, signInWithGoogle } from '../firebase';
import LoginWithEmail from './LoginWithEmail';

const MAX_VOTES = 5;

const Login = ({ user, setUser }) => {
  const [votes, setVotes] = useState(0);
  const [unsubscribeVotes, setUnsubscribeVotes] = useState(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [showingForm, setShowingForm] = useState(false);

  const isAppleDevice = navigator.userAgent.match(/(Mac|iPhone|iPod|iPad)/i);

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

  const handleSignIn = () => {
    if (!isAppleDevice) {
      signInWithGoogle()
        .then((userCredential) => {
          setUser(userCredential.user);
          setShowingForm(false);
        })
        .catch((error) => {
          console.error("Error signing in with Google", error);
        });
    } else {
      setShowingForm(true);
    }
  };

  const handleSignOut = async () => {
    await signOutUser();
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
            <button onClick={handleSignIn}>{isAppleDevice ? 'Prisijungti' : 'Prisijungti su Google'}</button>}

            {showingForm && <LoginWithEmail setShowingForm={setShowingForm} />}
        </div>
    </header>
  );
};

export default Login;
