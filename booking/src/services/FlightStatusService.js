import apiClient from './axiosConfig';

class FlightStatusService {
  getAllFlightStatuses() {
    return apiClient.get('flightstatuses/');
  }

  getFlightStatusById(flightStatusId) {
    return apiClient.get(`flightstatuses/${flightStatusId}/`);
  }

  createFlightStatus(flightStatusData) {
    return apiClient.post('flightstatuses/', flightStatusData);
  }

  updateFlightStatus(flightStatusId, flightStatusData) {
    return apiClient.put(`flightstatuses/${flightStatusId}/`, flightStatusData);
  }

  deleteFlightStatus(flightStatusId) {
    return apiClient.delete(`flightstatuses/${flightStatusId}/`);
  }
}

export default new FlightStatusService();
