import apiClient from './axiosConfig';

class PropertyTypeService {
  getAllPropertyTypes() {
    return apiClient.get('propertytypes/');
  }

  getPropertyTypeById(propertyTypeId) {
    return apiClient.get(`propertytypes/${propertyTypeId}/`);
  }

  createPropertyType(propertyTypeData) {
    return apiClient.post('propertytypes/', propertyTypeData);
  }

  updatePropertyType(propertyTypeId, propertyTypeData) {
    return apiClient.put(`propertytypes/${propertyTypeId}/`, propertyTypeData);
  }

  deletePropertyType(propertyTypeId) {
    return apiClient.delete(`propertytypes/${propertyTypeId}/`);
  }
}

export default new PropertyTypeService();
