import apiClient from './axiosConfig';

class CategoryTypeService {
  getAllCategoryTypes() {
    return apiClient.get('categorytypes/');
  }

  getCategoryTypeById(categoryTypeId) {
    return apiClient.get(`categorytypes/${categoryTypeId}/`);
  }

  createCategoryType(categoryTypeData) {
    return apiClient.post('categorytypes/', categoryTypeData);
  }

  updateCategoryType(categoryTypeId, categoryTypeData) {
    return apiClient.put(`categorytypes/${categoryTypeId}/`, categoryTypeData);
  }

  deleteCategoryType(categoryTypeId) {
    return apiClient.delete(`categorytypes/${categoryTypeId}/`);
  }
}

export default new CategoryTypeService();
