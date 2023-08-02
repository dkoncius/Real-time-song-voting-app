import { useState, useEffect } from 'react';
import { auth, signInWithEmail } from '../firebase';
import SignUpForm from './SignUpForm';

const LoginForm = ({ setShowingForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null); // new state to track the current user

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return unsubscribe; // make sure to unsubscribe on component unmount
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const response = await signInWithEmail(email, password);
    if(response.error) {
      setError(response.error);
    } else {
      setEmail('');
      setPassword('');
      setShowingForm(false);
    }
  };

  if (user) return null; // if a user is authenticated, don't show the form

  if (showSignUpForm) {
    return <SignUpForm setShowSignUpForm={setShowSignUpForm} />;
  }

  return (
    <form onSubmit={handleSignIn}>
      <input 
        type="email" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Enter password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        required 
      />
      <button type="submit">Prisijungti</button>
      {error && <p>{error}</p>}
      <p>Naujas vartotojas? <span onClick={() => setShowSignUpForm(true)}>Registruotis</span></p>
    </form>
  );
};

export default LoginForm;
