// LoginForm.jsx
import { useState, useEffect } from 'react';
import { checkUserExists, confirmSignIn } from '../firebase';
import RegisterForm from './RegisterForm'; 

const LoginForm = ({ setShowingForm }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(false); 

  const handleSignIn = async (e) => {
    e.preventDefault();

    const userExists = await checkUserExists(email);
    if(userExists) {
      // Login user here
    } else {
      setShowRegisterForm(true);
    }
  };

  useEffect(() => {
    if (window.location.href.includes('firebaseauth')) {
      confirmSignIn(window.localStorage.getItem('emailForSignIn'))
      .then(() => setShowingForm(false))
      .catch((error) => {
        setError("Error signing in with email link. Please try again.");
        console.error("Error signing in with email link", error);
      });
    }
  }, []);

  if (showRegisterForm) {
    return <RegisterForm setShowingForm={setShowingForm} />
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
      <button type="submit">Prisijungti</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
