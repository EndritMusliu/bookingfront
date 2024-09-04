import apiClient from './axiosConfig';

class PropertyService {
  getAllProperties() {
    return apiClient.get('properties/');
  }

  getPropertyById(propertyId) {
    return apiClient.get(`properties/${propertyId}/`);
  }

  createProperty(propertyData) {
    return apiClient.post('properties/', propertyData);
  }

  updateProperty(propertyId, propertyData) {
    return apiClient.put(`properties/${propertyId}/`, propertyData);
  }

  deleteProperty(propertyId) {
    return apiClient.delete(`properties/${propertyId}/`);
  }
}

export default new PropertyService();
