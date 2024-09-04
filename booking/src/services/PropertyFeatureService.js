import apiClient from './axiosConfig';

class PropertyFeatureService {
  getAllPropertyFeatures() {
    return apiClient.get('propertyfeatures/');
  }

  getPropertyFeatureById(propertyFeatureId) {
    return apiClient.get(`propertyfeatures/${propertyFeatureId}/`);
  }

  createPropertyFeature(propertyFeatureData) {
    return apiClient.post('propertyfeatures/', propertyFeatureData);
  }

  updatePropertyFeature(propertyFeatureId, propertyFeatureData) {
    return apiClient.put(`propertyfeatures/${propertyFeatureId}/`, propertyFeatureData);
  }

  deletePropertyFeature(propertyFeatureId) {
    return apiClient.delete(`propertyfeatures/${propertyFeatureId}/`);
  }
}

export default new PropertyFeatureService();
