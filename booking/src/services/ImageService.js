import apiClient from './axiosConfig';

class ImageService {
  getAllImages() {
    return apiClient.get('images/');
  }

  getImageById(imageId) {
    return apiClient.get(`images/${imageId}/`);
  }

  createImage(imageData) {
    return apiClient.post('images/', imageData);
  }

  updateImage(imageId, imageData) {
    return apiClient.put(`images/${imageId}/`, imageData);
  }

  deleteImage(imageId) {
    return apiClient.delete(`images/${imageId}/`);
  }
}

export default new ImageService();
