import { useState } from 'react'; // make sure to import useState
import { changeUserPassword } from '../firebase';

const ChangePasswordForm = ({ setShowChangePasswordForm }) => {
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    await changeUserPassword(newPassword);
    setNewPassword('');
    setShowChangePasswordForm(false); // Hide the form after the password has been changed
  };

  return (
    <form onSubmit={handleChangePassword}>
      <input 
        type="password" 
        placeholder="Enter new password" 
        value={newPassword} 
        onChange={e => setNewPassword(e.target.value)} 
        required 
      />
      <button type="submit">Change Password</button>
      <button onClick={() => setShowChangePasswordForm(false)}>Cancel</button> 
    </form>
  );
};

export default ChangePasswordForm;
