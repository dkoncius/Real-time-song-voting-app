import { useState } from 'react';
import { signInWithEmail } from '../firebase';
import SignUpForm from './SignUpForm';

const LoginForm = ({ setShowingForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [error, setError] = useState('');

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
