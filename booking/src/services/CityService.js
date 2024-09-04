import apiClient from './axiosConfig';

class CityService {
  getAllCities() {
    return apiClient.get('cities/');
  }

  getCityById(cityId) {
    return apiClient.get(`cities/${cityId}/`);
  }

  createCity(cityData) {
    return apiClient.post('cities/', cityData);
  }

  updateCity(cityId, cityData) {
    return apiClient.put(`cities/${cityId}/`, cityData);
  }

  deleteCity(cityId) {
    return apiClient.delete(`cities/${cityId}/`);
  }
}

export default new CityService();
