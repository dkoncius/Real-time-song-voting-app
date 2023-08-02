import { useState } from 'react';
import { signUpWithEmail } from '../firebase';

const SignUpForm = ({ setShowSignUpForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // checks for at least one letter, one number and minimum length of 6
    if (!passwordRegex.test(password)) {
      setError('Slaptažodis turėtų būti sudėtingesnis ir turėti bent vieną skaičių :)');
      return;
    }
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
      <button onClick={() => setShowSignUpForm(false)}>Cancel</button> {/* New Cancel button */}
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignUpForm;