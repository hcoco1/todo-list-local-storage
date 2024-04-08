import React, { useState } from 'react';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import './ChangePassword.css'; // Adjust the path as necessary


function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user || !user.email) {
      setError("User not found");
      return;
    }

    // Re-authenticate user
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    reauthenticateWithCredential(user, credential).then(() => {
      // User re-authenticated, proceed with password update
      updatePassword(user, newPassword).then(() => {
        alert("Password updated successfully.");
      }).catch((error) => {
        setError("Error updating password: " + error.message);
      });
    }).catch((error) => {
      setError("Re-authentication failed: " + error.message);
    });
  };

  return (
    <div className="change-password-container">
      <p className="text-center">Change Password</p>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="current-password">Current Password:</label>
          <input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="new-password">New Password:</label>
          <input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default ChangePassword;
