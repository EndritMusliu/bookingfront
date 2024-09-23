import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/backendApi'; // Adjust the backend API URL as needed
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext for authentication

const BookingsPage = () => {
  const { authToken } = useAuth(); // Get the authentication token from context
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    room: '',
    final_price: '',
    bank_account: '',
    check_in: '',
    check_out: ''
  });
  const [editingBooking, setEditingBooking] = useState(null); // Store the booking being edited
  const [error, setError] = useState(null);
  const [rooms, setRooms] = useState([]); // Available rooms for selection
  const [bankAccounts, setBankAccounts] = useState([]); // Available bank accounts for selection

  useEffect(() => {
    // Fetch bookings for the logged-in user
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${API_URL}bookings/`, {
          headers: { Authorization: `Token ${authToken}` }
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to fetch bookings.');
      }
    };

    // Fetch rooms and bank accounts
    const fetchRoomsAndBankAccounts = async () => {
      try {
        const roomsResponse = await axios.get(`${API_URL}rooms/`, {
          headers: { Authorization: `Token ${authToken}` }
        });
        const bankAccountsResponse = await axios.get(`${API_URL}bankdetails/`, {
          headers: { Authorization: `Token ${authToken}` }
        });
        setRooms(roomsResponse.data);
        setBankAccounts(bankAccountsResponse.data);
      } catch (error) {
        console.error('Error fetching rooms or bank accounts:', error);
      }
    };

    fetchBookings();
    fetchRoomsAndBankAccounts();
  }, [authToken]);

  // Handle input change for adding or editing a booking
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingBooking) {
      setEditingBooking({ ...editingBooking, [name]: value });
    } else {
      setNewBooking({ ...newBooking, [name]: value });
    }
  };

  // Handle booking creation
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}bookings/`, newBooking, {
        headers: { Authorization: `Token ${authToken}` }
      });
      setBookings([...bookings, response.data]);
      setNewBooking({ room: '', final_price: '', bank_account: '', check_in: '', check_out: '' });
    } catch (error) {
      console.error('Error creating booking:', error);
      setError('Failed to create booking.');
    }
  };

  // Handle booking update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}bookings/${editingBooking.id}/`, editingBooking, {
        headers: { Authorization: `Token ${authToken}` }
      });
      setBookings(bookings.map((booking) => (booking.id === editingBooking.id ? editingBooking : booking)));
      setEditingBooking(null); // Clear the editing state
    } catch (error) {
      console.error('Error updating booking:', error);
      setError('Failed to update booking.');
    }
  };

  // Handle booking delete
  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`${API_URL}bookings/${bookingId}/`, {
        headers: { Authorization: `Token ${authToken}` }
      });
      setBookings(bookings.filter((booking) => booking.id !== bookingId));
    } catch (error) {
      console.error('Error deleting booking:', error);
      setError('Failed to delete booking.');
    }
  };

  // Render booking form
  const renderBookingForm = (booking = null) => (
    <form onSubmit={booking ? handleUpdate : handleCreate}>
      <div className="form-group">
        <label>Room</label>
        <select
          name="room"
          className="form-control"
          value={booking ? booking.room.id : newBooking.room}
          onChange={handleInputChange}
        >
          <option value="">Select Room</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.room_name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Final Price</label>
        <input
          type="number"
          className="form-control"
          name="final_price"
          value={booking ? booking.final_price : newBooking.final_price}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Bank Account</label>
        <select
          name="bank_account"
          className="form-control"
          value={booking ? booking.bank_account?.id : newBooking.bank_account}
          onChange={handleInputChange}
        >
          <option value="">Select Bank Account</option>
          {bankAccounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.account_name} - {account.account_number}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Check-in</label>
        <input
          type="date"
          className="form-control"
          name="check_in"
          value={booking ? booking.check_in : newBooking.check_in}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Check-out</label>
        <input
          type="date"
          className="form-control"
          name="check_out"
          value={booking ? booking.check_out : newBooking.check_out}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {booking ? 'Update Booking' : 'Add Booking'}
      </button>
      {booking && (
        <button className="btn btn-secondary ml-2" onClick={() => setEditingBooking(null)}>
          Cancel
        </button>
      )}
    </form>
  );

  return (
    <div className="container mt-5">
      <h2>Your Bookings</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="list-group mb-5">
        {bookings.map((booking) => (
          <div key={booking.id} className="list-group-item">
            {editingBooking && editingBooking.id === booking.id ? (
              renderBookingForm(editingBooking)
            ) : (
              <>
                <p><strong>Room:</strong> {booking.room.room_name}</p>
                <p><strong>Final Price:</strong> {booking.final_price}</p>
                <p><strong>Check-in:</strong> {new Date(booking.check_in).toLocaleDateString()}</p>
                <p><strong>Check-out:</strong> {new Date(booking.check_out).toLocaleDateString()}</p>
                <button className="btn btn-primary" onClick={() => setEditingBooking(booking)}>Edit</button>
                <button className="btn btn-danger ml-2" onClick={() => handleDelete(booking.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>

      <h3>Add New Booking</h3>
      {renderBookingForm()}
    </div>
  );
};

export default BookingsPage;
