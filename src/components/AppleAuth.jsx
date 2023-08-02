import { signInWithApple } from '../firebase';

const AppleAuth = ({ setUser, setShowingForm }) => {
  const handleSignIn = () => {
    signInWithApple()
      .then((userCredential) => {
        setUser(userCredential.user);
        setShowingForm(false);
      })
      .catch((error) => {
        console.error("Error signing in with Apple", error);
      });
  };
  
  return <button onClick={handleSignIn}>Prisijungti</button>;
};

export default AppleAuth;
