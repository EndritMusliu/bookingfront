import apiClient from './axiosConfig';

class CategoryService {
  getAllCategories() {
    return apiClient.get('categories/');
  }

  getCategoryById(categoryId) {
    return apiClient.get(`categories/${categoryId}/`);
  }

  createCategory(categoryData) {
    return apiClient.post('categories/', categoryData);
  }

  updateCategory(categoryId, categoryData) {
    return apiClient.put(`categories/${categoryId}/`, categoryData);
  }

  deleteCategory(categoryId) {
    return apiClient.delete(`categories/${categoryId}/`);
  }
}

export default new CategoryService();
