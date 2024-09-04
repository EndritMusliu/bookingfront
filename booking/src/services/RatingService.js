import apiClient from './axiosConfig';

class RatingService {
  getAllRatings() {
    return apiClient.get('ratings/');
  }

  getRatingById(ratingId) {
    return apiClient.get(`ratings/${ratingId}/`);
  }

  createRating(ratingData) {
    return apiClient.post('ratings/', ratingData);
  }

  updateRating(ratingId, ratingData) {
    return apiClient.put(`ratings/${ratingId}/`, ratingData);
  }

  deleteRating(ratingId) {
    return apiClient.delete(`ratings/${ratingId}/`);
  }
}

export default new RatingService();
