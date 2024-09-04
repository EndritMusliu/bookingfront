import apiClient from './axiosConfig';

class BookedFlightService {
  getAllBookedFlights() {
    return apiClient.get('bookedflights/');
  }

  getBookedFlightById(bookedFlightId) {
    return apiClient.get(`bookedflights/${bookedFlightId}/`);
  }

  createBookedFlight(bookedFlightData) {
    return apiClient.post('bookedflights/', bookedFlightData);
  }

  updateBookedFlight(bookedFlightId, bookedFlightData) {
    return apiClient.put(`bookedflights/${bookedFlightId}/`, bookedFlightData);
  }

  deleteBookedFlight(bookedFlightId) {
    return apiClient.delete(`bookedflights/${bookedFlightId}/`);
  }
}

export default new BookedFlightService();
