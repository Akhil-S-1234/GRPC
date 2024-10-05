import React, { useState } from 'react';
import './User.css';  // Import the CSS file for styling

const User = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator

  const fetchUser = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`);
      console.log(response)
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setUserData(data);
    } catch (err) {
        console.log(err)
      setError(err.message);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-container">
      <h2>Fetch User Data</h2>
      <input
        type="text"
        placeholder="Enter user ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="user-input"
      />
      <button onClick={fetchUser} className="fetch-button">Fetch User</button>

      {loading && <p className="loading-message">Loading...</p>}

      {error && <p className="error-message">{error}</p>}

      {userData && (
        <div className="user-details">
          <h3>User Details</h3>
          <p><strong>ID:</strong> {userData.userid}</p>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Age:</strong> {userData.age}</p>
        </div>
      )}
    </div>
  );
};

export default User;
