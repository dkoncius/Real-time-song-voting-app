import { useEffect, useState } from 'react';
import { signInWithGoogle, signOutUser, auth, getUserVotes } from '../firebase';

const MAX_VOTES = 5;

const Login = ({ user, setUser }) => {
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      if (user) {
        getUserVotes(user.uid).then(setVotes);
      }
    });
    return () => unsubscribe();
  }, [setUser]);

  const handleSignOut = async () => {
    await signOutUser();
  };

  return (
    <header>
        <div className="container">
            <h3 className="header-votes">
                BALSAI: <span>{user ? MAX_VOTES - votes : 0}</span>
            </h3>
           
            {user ? 
            <button onClick={handleSignOut}>Atsijungti</button> : 
            <button onClick={signInWithGoogle}>Prisijungti su Google</button>}
        </div>
    </header>
  );
};

export default Login;
