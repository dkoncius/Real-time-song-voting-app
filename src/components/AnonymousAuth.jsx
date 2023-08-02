import { useState, useEffect } from 'react';
import { signInAnonymouslyUser, signOutUser, observeAuth } from '../firebase.js';

const AnonymousAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const existingUserId = localStorage.getItem('userId');

    if (!existingUserId) {
      signInAnonymouslyUser();
    }

    const unsubscribe = observeAuth((user) => {
      if (user) {
        localStorage.setItem('userId', user.uid);
        setUser(user);
      } else {
        localStorage.removeItem('userId');
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await signOutUser();
  };

  const handleSignIn = async () => {
    await signInAnonymouslyUser();
  };

  return (
    <div>
      { user ? (
        <button onClick={handleSignOut}>Log Out</button>
      ) : (
        <button onClick={handleSignIn}>Anonymous Log In</button>
      )}
    </div>
  );
};

export default AnonymousAuth;
