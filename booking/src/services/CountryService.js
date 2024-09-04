import apiClient from './axiosConfig';

class CountryService {
  getAllCountries() {
    return apiClient.get('countries/');
  }

  getCountryById(countryId) {
    return apiClient.get(`countries/${countryId}/`);
  }

  createCountry(countryData) {
    return apiClient.post('countries/', countryData);
  }

  updateCountry(countryId, countryData) {
    return apiClient.put(`countries/${countryId}/`, countryData);
  }

  deleteCountry(countryId) {
    return apiClient.delete(`countries/${countryId}/`);
  }
}

export default new CountryService();
