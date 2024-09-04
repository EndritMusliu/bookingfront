import apiClient from './axiosConfig';

class UserTypeService {
  getAllUserTypes() {
    return apiClient.get('usertypes/');
  }

  getUserTypeById(typeId) {
    return apiClient.get(`usertypes/${typeId}/`);
  }

  createUserType(userTypeData) {
    return apiClient.post('usertypes/', userTypeData);
  }

  updateUserType(typeId, userTypeData) {
    return apiClient.put(`usertypes/${typeId}/`, userTypeData);
  }

  deleteUserType(typeId) {
    return apiClient.delete(`usertypes/${typeId}/`);
  }
}

export default new UserTypeService();
