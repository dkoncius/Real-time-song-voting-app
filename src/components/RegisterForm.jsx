// RegisterForm.jsx
import { useState } from 'react';
import { addUser } from '../firebase'; 

const RegisterForm = ({ setShowingForm }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await addUser(email); 
      setEmail('');
      setShowingForm(false);
    } catch (error) {
      setError("Error registering with email. Please try again.");
      console.error("Error registering with email", error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input 
        type="email" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        required 
      />
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default RegisterForm;
