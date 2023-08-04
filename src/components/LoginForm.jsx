// LoginForm.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOutUser, auth, signInWithEmail } from '../firebase';

const LoginForm = ({ setUser, setShowingForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        navigate.push('/');
        setShowingForm(false);
      }
    });
    return unsubscribe;
  }, [setUser, setShowingForm, navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const response = await signInWithEmail(email, password);
    if (response.error) {
      switch (response.error) {
        case 'Firebase: Error (auth/user-not-found).':
          setError('Vartotojas nerastas');
          break;
        case 'Firebase: Error (auth/wrong-password).':
          setError('Neteisingas slaptažodis');
          break;
        case 'Prašome patvirtinti paštą prieš prisijungiant.':
          setError('Prašome patvirtinti paštą prieš prisijungiant.');
          break;
        default:
          setError(response.error);
      }
      signOutUser(); // Sign out the user
    } else if (!auth.currentUser.emailVerified) {
      setError('Prašome patvirtinti paštą prieš prisijungiant.');
      signOutUser(); // Sign out the user
    } else {
      setEmail('');
      setPassword('');
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <input
        type="email"
        placeholder="El. paštas"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Slaptažodis"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Prisijungti</button>
      {error && <p className="userNotFound">{error}</p>}
      <p>Naujas vartotojas? <Link to="/signup">Registruotis</Link></p>
    </form>
  );
};

export default LoginForm;
