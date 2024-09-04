import apiClient from './axiosConfig';

class UserService {
  getAllUsers() {
    return apiClient.get('users/');
  }

  getUserById(userId) {
    return apiClient.get(`users/${userId}/`);
  }

  createUser(userData) {
    return apiClient.post('users/', userData);
  }

  updateUser(userId, userData) {
    return apiClient.put(`users/${userId}/`, userData);
  }

  deleteUser(userId) {
    return apiClient.delete(`users/${userId}/`);
  }
}

export default new UserService();
