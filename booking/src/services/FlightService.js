import apiClient from './axiosConfig';

class FlightService {
  getAllFlights() {
    return apiClient.get('flights/');
  }

  getFlightById(flightId) {
    return apiClient.get(`flights/${flightId}/`);
  }

  createFlight(flightData) {
    return apiClient.post('flights/', flightData);
  }

  updateFlight(flightId, flightData) {
    return apiClient.put(`flights/${flightId}/`, flightData);
  }

  deleteFlight(flightId) {
    return apiClient.delete(`flights/${flightId}/`);
  }
}

export default new FlightService();
