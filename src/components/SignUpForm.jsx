import { useState } from 'react';
import { signUpWithEmail } from '../firebase';

const SignUpForm = ({ setShowSignUpForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    const response = await signUpWithEmail(email, password);
    if(response.error) {
      setError(response.error);
    } else {
      setEmail('');
      setPassword('');
      setShowSignUpForm(false);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
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
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignUpForm;
