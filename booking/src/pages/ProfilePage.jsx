import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';  // Assuming this is where your AuthContext is located
import axios from 'axios';
import { API_URL } from '../utils/backendApi';  // Adjust the API URL as needed

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  const { authToken, isAuthenticated, user } = useAuth();  // Get authToken from context

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!authToken) {
          throw new Error('User is not authenticated');
        }

        console.log("Auth token being used:", authToken);  // Add this line to log the token

        const response = await axios.get(`${API_URL}profile/`, {
          headers: {
            Authorization: `Token ${authToken}`,  // Use the token from the AuthContext
          }
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Failed to fetch profile data. Please log in.');
      }
    };

    if (isAuthenticated) {
      fetchProfileData();  // Fetch profile data if the user is authenticated
    } else {
      setError('User is not authenticated. Please log in.');
    }
  }, [authToken, isAuthenticated]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Profile Information</h2>

      <div className="card mb-4">
        <div className="card-body">
          <h4>User Information</h4>
          <p><strong>Username:</strong> {profileData.user_info.username}</p>
          <p><strong>Email:</strong> {profileData.user_info.email}</p>
          <p><strong>First Name:</strong> {profileData.user_info.first_name}</p>
          <p><strong>Last Name:</strong> {profileData.user_info.last_name}</p>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h4>Bank Details</h4>
          {profileData.bank_details.length > 0 ? (
            profileData.bank_details.map((bankDetail, index) => (
              <div key={index}>
                <p><strong>Account Name:</strong> {bankDetail.account_name}</p>
                <p><strong>Account Number:</strong> {bankDetail.account_number}</p>
              </div>
            ))
          ) : (
            <p>No bank details available.</p>
          )}
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h4>Bookings</h4>
          {profileData.bookings.length > 0 ? (
            profileData.bookings.map((booking, index) => (
              <div key={index}>
                <p><strong>Room:</strong> {booking.room}</p>
                <p><strong>Final Price:</strong> {booking.final_price}</p>
                <p><strong>Check-in:</strong> {new Date(booking.check_in).toLocaleDateString()}</p>
                <p><strong>Check-out:</strong> {new Date(booking.check_out).toLocaleDateString()}</p>
                <hr />
              </div>
            ))
          ) : (
            <p>No bookings available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
