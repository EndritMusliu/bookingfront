import apiClient from './axiosConfig';

class BookingService {
  getAllBookings() {
    return apiClient.get('bookings/');
  }

  getBookingById(bookingId) {
    return apiClient.get(`bookings/${bookingId}/`);
  }

  createBooking(bookingData) {
    return apiClient.post('bookings/', bookingData);
  }

  updateBooking(bookingId, bookingData) {
    return apiClient.put(`bookings/${bookingId}/`, bookingData);
  }

  deleteBooking(bookingId) {
    return apiClient.delete(`bookings/${bookingId}/`);
  }
}

export default new BookingService();
