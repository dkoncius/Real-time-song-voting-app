import { signInWithGoogle } from '../firebase';

const GoogleAuth = ({ setUser, setShowingForm }) => {
  const handleSignIn = () => {
    signInWithGoogle()
      .then((userCredential) => {
        setUser(userCredential.user);
        setShowingForm(false);
      })
      .catch((error) => {
        console.error("Error signing in with Google", error);
      });
  };
  
  return <button onClick={handleSignIn}>Prisijungti su Google</button>;
};

export default GoogleAuth;
