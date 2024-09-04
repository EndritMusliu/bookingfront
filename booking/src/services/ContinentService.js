import apiClient from './axiosConfig';

class ContinentService {
  getAllContinents() {
    return apiClient.get('continents/');
  }

  getContinentById(continentId) {
    return apiClient.get(`continents/${continentId}/`);
  }

  createContinent(continentData) {
    return apiClient.post('continents/', continentData);
  }

  updateContinent(continentId, continentData) {
    return apiClient.put(`continents/${continentId}/`, continentData);
  }

  deleteContinent(continentId) {
    return apiClient.delete(`continents/${continentId}/`);
  }
}

export default new ContinentService();
