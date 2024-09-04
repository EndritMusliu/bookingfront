import apiClient from './axiosConfig';

class RoomService {
  getAllRooms() {
    return apiClient.get('rooms/');
  }

  getRoomById(roomId) {
    return apiClient.get(`rooms/${roomId}/`);
  }

  createRoom(roomData) {
    return apiClient.post('rooms/', roomData);
  }

  updateRoom(roomId, roomData) {
    return apiClient.put(`rooms/${roomId}/`, roomData);
  }

  deleteRoom(roomId) {
    return apiClient.delete(`rooms/${roomId}/`);
  }
}

export default new RoomService();
