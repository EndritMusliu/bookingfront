import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/backendApi'; // Adjust based on your setup
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext

const BankDetailsPage = () => {
  const { authToken } = useAuth();  // Get the auth token from the AuthContext
  const [bankDetails, setBankDetails] = useState(null);
  const [formData, setFormData] = useState({ account_name: '', account_number: '', account_cvc: '' });
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch bank details on load
  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}bankdetails/`, {
          headers: { Authorization: `Token ${authToken}` }
        });
        setBankDetails(response.data[0] || null);  // Assuming one bank detail per user
        if (response.data[0]) {
          setFormData(response.data[0]);  // Pre-fill form with existing bank details
        }
      } catch (err) {
        console.error('Error fetching bank details:', err);
        setError('Failed to fetch bank details.');
      }
    };

    fetchBankDetails();
  }, [authToken]);

  // Handle form submission for adding or updating bank details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (bankDetails) {
        // Update existing bank details
        await axios.put(`${API_URL}bankdetails/${bankDetails.id}/`, formData, {
          headers: { Authorization: `Token ${authToken}` }
        });
      } else {
        // Create new bank details
        await axios.post(`${API_URL}bankdetails/`, formData, {
          headers: { Authorization: `Token ${authToken}` }
        });
      }
      setIsEditing(false);
      setError(null);
      alert('Bank details saved successfully.');
    } catch (err) {
      console.error('Error saving bank details:', err);
      setError('Failed to save bank details.');
    }
  };

  // Handle delete action
  const handleDelete = async () => {
    if (!bankDetails) return;

    try {
      await axios.delete(`${API_URL}bankdetails/${bankDetails.id}/`, {
        headers: { Authorization: `Token ${authToken}` }
      });
      setBankDetails(null);
      setFormData({ account_name: '', account_number: '', account_cvc: '' });
      alert('Bank details deleted.');
    } catch (err) {
      console.error('Error deleting bank details:', err);
      setError('Failed to delete bank details.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Bank Details</h2>

      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="account_name" className="form-label">Account Name</label>
          <input
            type="text"
            className="form-control"
            id="account_name"
            name="account_name"
            value={formData.account_name}
            onChange={(e) => setFormData({ ...formData, account_name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="account_number" className="form-label">Account Number</label>
          <input
            type="text"
            className="form-control"
            id="account_number"
            name="account_number"
            value={formData.account_number}
            onChange={(e) => setFormData({ ...formData, account_number: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="account_cvc" className="form-label">CVC</label>
          <input
            type="text"
            className="form-control"
            id="account_cvc"
            name="account_cvc"
            value={formData.account_cvc}
            onChange={(e) => setFormData({ ...formData, account_cvc: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">{bankDetails ? 'Update' : 'Add'}</button>
      </form>

      {bankDetails && (
        <button className="btn btn-danger mt-3" onClick={handleDelete}>Delete Bank Details</button>
      )}
    </div>
  );
};

export default BankDetailsPage;
