import apiClient from './axiosConfig';

class StreetService {
  getAllStreets() {
    return apiClient.get('streets/');
  }

  getStreetById(streetId) {
    return apiClient.get(`streets/${streetId}/`);
  }

  createStreet(streetData) {
    return apiClient.post('streets/', streetData);
  }

  updateStreet(streetId, streetData) {
    return apiClient.put(`streets/${streetId}/`, streetData);
  }

  deleteStreet(streetId) {
    return apiClient.delete(`streets/${streetId}/`);
  }
}

export default new StreetService();
