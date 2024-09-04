import apiClient from './axiosConfig';

class RoomFeatureService {
  getAllRoomFeatures() {
    return apiClient.get('roomfeatures/');
  }

  getRoomFeatureById(roomFeatureId) {
    return apiClient.get(`roomfeatures/${roomFeatureId}/`);
  }

  createRoomFeature(roomFeatureData) {
    return apiClient.post('roomfeatures/', roomFeatureData);
  }

  updateRoomFeature(roomFeatureId, roomFeatureData) {
    return apiClient.put(`roomfeatures/${roomFeatureId}/`, roomFeatureData);
  }

  deleteRoomFeature(roomFeatureId) {
    return apiClient.delete(`roomfeatures/${roomFeatureId}/`);
  }
}

export default new RoomFeatureService();
