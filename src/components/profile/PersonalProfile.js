import React, { useState, useEffect } from 'react';
import { storage } from '../config/firebase-config';
import { getAuth, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ChangePassword from '../auth/ChangePassword';
import './PersonalProfile.css';

const UserProfile = ({ user, updateUserProfileInApp }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);

  // Effect to synchronize isUploaded state with user's photoURL presence
  useEffect(() => {
    if (user?.photoURL) {
      setIsUploaded(true);
    } else {
      setIsUploaded(false);
    }
  }, [user]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // In UserProfile.js
  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const fileRef = ref(storage, `profile_photos/${user.uid}_${selectedFile.name}`);
    try {
      await uploadBytes(fileRef, selectedFile);
      const downloadURL = await getDownloadURL(fileRef);

      const auth = getAuth();
      await updateProfile(auth.currentUser, {
        photoURL: downloadURL
      });
      console.log("Profile updated successfully.");

      setIsUploaded(true); // Local state to reflect upload success

      // Here you need to invoke a method passed from a parent component to update the global currentUser state.
      // This part is missing in your provided code snippet. It should look something like this:
      updateUserProfileInApp({ photoURL: downloadURL }); // This method should be provided as a prop to UserProfile.

    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };


  return (

    <>
        <div className="profileContainer">
      {!isUploaded && (
        <>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="fileInput"
          />
          <button onClick={handleUpload} className="uploadButton">
            Upload Photo
          </button>
        </>
      )}
      {isUploaded && user.photoURL && (
        <>
          <img
            src={user.photoURL}
            alt="Profile"
            className="profileImage"
          />
          <button onClick={() => setIsUploaded(false)} className="editButton">
            Edit Photo
          </button>
        </>
      )}
      
    </div>
    <ChangePassword />
    
    </>
  );
};

export default UserProfile;

