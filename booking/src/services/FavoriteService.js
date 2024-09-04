import apiClient from './axiosConfig';

class FavoriteService {
  getAllFavorites() {
    return apiClient.get('favorites/');
  }

  getFavoriteById(favoriteId) {
    return apiClient.get(`favorites/${favoriteId}/`);
  }

  createFavorite(favoriteData) {
    return apiClient.post('favorites/', favoriteData);
  }

  updateFavorite(favoriteId, favoriteData) {
    return apiClient.put(`favorites/${favoriteId}/`, favoriteData);
  }

  deleteFavorite(favoriteId) {
    return apiClient.delete(`favorites/${favoriteId}/`);
  }
}

export default new FavoriteService();
