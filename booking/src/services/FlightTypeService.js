import apiClient from './axiosConfig';

class FlightTypeService {
  getAllFlightTypes() {
    return apiClient.get('flighttypes/');
  }

  getFlightTypeById(flightTypeId) {
    return apiClient.get(`flighttypes/${flightTypeId}/`);
  }

  createFlightType(flightTypeData) {
    return apiClient.post('flighttypes/', flightTypeData);
  }

  updateFlightType(flightTypeId, flightTypeData) {
    return apiClient.put(`flighttypes/${flightTypeId}/`, flightTypeData);
  }

  deleteFlightType(flightTypeId) {
    return apiClient.delete(`flighttypes/${flightTypeId}/`);
  }
}

export default new FlightTypeService();
