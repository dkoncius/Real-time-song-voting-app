// SignUpForm.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOutUser, signUpWithEmail } from '../firebase';
import similar from 'string-similarity'; // new import

const SignUpForm = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Extracting the part of the email before the '@' symbol
    const emailPrefix = email.substring(0, email.indexOf('@'));

    // If the email prefix is too similar to the password, display an error
    const similarity = similar.compareTwoStrings(emailPrefix, password);
    if (similarity > 0.8) {
      setError('Jūsų el. paštas yra pernelyg panašus į jūsų slaptažodį');
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Slaptažodis turėtų būti bent 8 raidžių ir turėti bent vieną didžiąją raidę bei skaičių.');
      return;
    }

    const response = await signUpWithEmail(email, password);
    if (response.error) {
      setError(response.error);
      setSuccess('');
    } else {
      setEmail('');
      setPassword('');
      setSuccess('Sėkmingai užsiregistravote! Patvirtinkite registraciją savo pašte. Laiškas gali būti šiukledežėje arba spam aplankale :)');
      setError('');
      signOutUser();
    }
  };

  return (
    <form onSubmit={handleSignUp}>
    {!success && (
      <>
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
        <button type="submit">Registruotis</button>
        <p>Jau turite paskyrą? <Link to="/login">Prisijungti</Link></p>
      </>
    )}
      
    {error && <p className="userNotFound">{error}</p>}
    {success && <p className='success'>{success}</p>}
  </form>
  );
};

export default SignUpForm;
