import apiClient from './axiosConfig';

class FlightAgencyService {
  getAllFlightAgencies() {
    return apiClient.get('flightagencies/');
  }

  getFlightAgencyById(flightAgencyId) {
    return apiClient.get(`flightagencies/${flightAgencyId}/`);
  }

  createFlightAgency(flightAgencyData) {
    return apiClient.post('flightagencies/', flightAgencyData);
  }

  updateFlightAgency(flightAgencyId, flightAgencyData) {
    return apiClient.put(`flightagencies/${flightAgencyId}/`, flightAgencyData);
  }

  deleteFlightAgency(flightAgencyId) {
    return apiClient.delete(`flightagencies/${flightAgencyId}/`);
  }
}

export default new FlightAgencyService();
