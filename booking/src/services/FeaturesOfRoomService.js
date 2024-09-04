import apiClient from './axiosConfig';

class FeaturesOfRoomService {
  getAllFeaturesOfRoom() {
    return apiClient.get('featuresofroom/');
  }

  getFeaturesOfRoomById(featuresOfRoomId) {
    return apiClient.get(`featuresofroom/${featuresOfRoomId}/`);
  }

  createFeaturesOfRoom(featuresOfRoomData) {
    return apiClient.post('featuresofroom/', featuresOfRoomData);
  }

  updateFeaturesOfRoom(featuresOfRoomId, featuresOfRoomData) {
    return apiClient.put(`featuresofroom/${featuresOfRoomId}/`, featuresOfRoomData);
  }

  deleteFeaturesOfRoom(featuresOfRoomId) {
    return apiClient.delete(`featuresofroom/${featuresOfRoomId}/`);
  }
}

export default new FeaturesOfRoomService();
