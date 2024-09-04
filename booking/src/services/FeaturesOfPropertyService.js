import apiClient from './axiosConfig';

class FeaturesOfPropertyService {
  getAllFeaturesOfProperty() {
    return apiClient.get('featuresofproperty/');
  }

  getFeaturesOfPropertyById(featuresOfPropertyId) {
    return apiClient.get(`featuresofproperty/${featuresOfPropertyId}/`);
  }

  createFeaturesOfProperty(featuresOfPropertyData) {
    return apiClient.post('featuresofproperty/', featuresOfPropertyData);
  }

  updateFeaturesOfProperty(featuresOfPropertyId, featuresOfPropertyData) {
    return apiClient.put(`featuresofproperty/${featuresOfPropertyId}/`, featuresOfPropertyData);
  }

  deleteFeaturesOfProperty(featuresOfPropertyId) {
    return apiClient.delete(`featuresofproperty/${featuresOfPropertyId}/`);
  }
}

export default new FeaturesOfPropertyService();
